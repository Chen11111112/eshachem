"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const INK = 0x0a1218;
const BRASS = 0xc9a35a;
const BRASS_SOFT = 0xe0c58d;
const PAPER = 0xf3eee4;

function uniqueVertices(geo: THREE.BufferGeometry) {
  const pos = geo.attributes.position;
  const seen = new Set<string>();
  const out: THREE.Vector3[] = [];
  for (let i = 0; i < pos.count; i++) {
    const v = new THREE.Vector3().fromBufferAttribute(pos, i);
    const key = `${v.x.toFixed(3)},${v.y.toFixed(3)},${v.z.toFixed(3)}`;
    if (!seen.has(key)) {
      seen.add(key);
      out.push(v);
    }
  }
  return out;
}

/** A geodesic molecular lattice: atoms on the vertices, bonds on the edges. */
function buildShell(radius: number, detail: number, atom: number, opacity: number) {
  const group = new THREE.Group();
  const geo = new THREE.IcosahedronGeometry(radius, detail);

  const bonds = new THREE.LineSegments(
    new THREE.WireframeGeometry(geo),
    new THREE.LineBasicMaterial({ color: BRASS, transparent: true, opacity }),
  );
  group.add(bonds);

  const verts = uniqueVertices(geo);
  const atoms = new THREE.InstancedMesh(
    new THREE.SphereGeometry(1, 20, 20),
    new THREE.MeshStandardMaterial({ metalness: 0.3, roughness: 0.35, emissive: 0x3a2a10, emissiveIntensity: 0.6 }),
    verts.length,
  );
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const c = new THREE.Color();
  verts.forEach((v, i) => {
    const accent = i % 7 === 0;
    const s = atom * (accent ? 2.1 : 0.7 + ((i * 37) % 10) / 16);
    m.compose(v, q, new THREE.Vector3(s, s, s));
    atoms.setMatrixAt(i, m);
    atoms.setColorAt(i, c.set(accent ? PAPER : i % 3 === 0 ? BRASS_SOFT : BRASS));
  });
  atoms.instanceMatrix.needsUpdate = true;
  if (atoms.instanceColor) atoms.instanceColor.needsUpdate = true;
  group.add(atoms);

  geo.dispose();
  return group;
}

export default function HeroScene() {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mount.current;
    if (!el) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return; // no WebGL: the hero still reads fine without the scene
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(INK, 0);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(INK, 6, 12.5);
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 60);
    camera.position.set(0, 0, 9);

    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const key = new THREE.DirectionalLight(0xfff1d6, 2.6);
    key.position.set(4, 5, 6);
    scene.add(key);
    const rim = new THREE.PointLight(BRASS, 40, 30);
    rim.position.set(-6, -3, 2);
    scene.add(rim);

    const lattice = new THREE.Group();
    const outer = buildShell(2.35, 2, 0.045, 0.3);
    const inner = buildShell(1.25, 1, 0.07, 0.5);
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.62, 0),
      new THREE.MeshStandardMaterial({ color: 0x1c3140, metalness: 0.85, roughness: 0.25, flatShading: true }),
    );
    lattice.add(outer, inner, core);
    scene.add(lattice);

    // drifting dust
    const DUST = 900;
    const dustPos = new Float32Array(DUST * 3);
    for (let i = 0; i < DUST; i++) {
      const r = 3.2 + Math.random() * 7;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      dustPos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      dustPos[i * 3 + 1] = r * Math.cos(ph) * 0.7;
      dustPos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th) - 2;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dust = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({
        color: BRASS_SOFT,
        size: 0.028,
        transparent: true,
        opacity: 0.7,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    scene.add(dust);

    let baseX = 0;
    let baseY = 0;
    let baseScale = 1;
    const resize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      const wide = w >= 1024;
      baseX = wide ? Math.min(2.6, camera.aspect * 1.45) : 0;
      baseY = wide ? 0.1 : 1.35;
      baseScale = wide ? 1 : 0.72;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    const pointer = { x: 0, y: 0, sx: 0, sy: 0 };
    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);

    const start = performance.now();
    let raf = 0;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const t = reduced ? 8 : (performance.now() - start) / 1000;
      const intro = reduced ? 1 : 1 - Math.pow(1 - Math.min(t / 2.2, 1), 3);
      const scroll = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);

      pointer.sx += (pointer.x - pointer.sx) * 0.04;
      pointer.sy += (pointer.y - pointer.sy) * 0.04;

      lattice.position.set(baseX + pointer.sx * 0.15, baseY - scroll * 1.2 - pointer.sy * 0.1, 0);
      lattice.scale.setScalar(baseScale * (0.55 + 0.45 * intro) * (1 + scroll * 0.45));
      lattice.rotation.y = t * 0.1 + pointer.sx * 0.5 + (1 - intro) * -1.6;
      lattice.rotation.x = 0.28 + pointer.sy * 0.3 + scroll * 0.5;
      inner.rotation.y = -t * 0.32;
      inner.rotation.z = t * 0.12;
      core.rotation.x = t * 0.4;
      core.rotation.y = t * 0.25;
      const breathe = 1 + Math.sin(t * 0.9) * 0.025;
      outer.scale.setScalar(breathe);

      dust.rotation.y = t * 0.015 + pointer.sx * 0.05;
      dust.position.y = scroll * 1.5;
      camera.position.z = 9 - scroll * 1.6;

      renderer.render(scene, camera);
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        mesh.geometry?.dispose();
        const mat = mesh.material;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else mat?.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mount} className="absolute inset-0 [&>canvas]:h-full [&>canvas]:w-full" aria-hidden />;
}
