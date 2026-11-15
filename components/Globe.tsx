"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { feature } from "topojson-client";
import landTopo from "world-atlas/land-110m.json";
import { regions, TAIPEI } from "@/lib/data";

const R = 1.5;
const INK = 0x0a1218;
const BRASS = 0xc9a35a;
const BRASS_SOFT = 0xe0c58d;
const SEAL = 0xd9503f;
const DEG = Math.PI / 180;

function toVec(lat: number, lon: number, r = R) {
  const phi = (90 - lat) * DEG;
  const theta = (lon + 180) * DEG;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

type Ring = [number, number][];
type Geometry =
  | { type: "Polygon"; coordinates: Ring[] }
  | { type: "MultiPolygon"; coordinates: Ring[][] };

function landRings(): Ring[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const topo = landTopo as any;
  const fc = feature(topo, topo.objects.land) as unknown as
    | { type: "FeatureCollection"; features: { geometry: Geometry }[] }
    | { type: "Feature"; geometry: Geometry };
  const geoms = fc.type === "FeatureCollection" ? fc.features.map((f) => f.geometry) : [fc.geometry];
  const rings: Ring[] = [];
  for (const g of geoms) {
    if (g.type === "Polygon") rings.push(...g.coordinates);
    else for (const poly of g.coordinates) rings.push(...poly);
  }
  return rings;
}

function arcPoints(a: THREE.Vector3, b: THREE.Vector3, steps = 64) {
  const ua = a.clone().normalize();
  const ub = b.clone().normalize();
  const ang = ua.angleTo(ub);
  const lift = 0.06 + ang * 0.16;
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const s = Math.sin(ang);
    const p = ua
      .clone()
      .multiplyScalar(Math.sin((1 - t) * ang) / s)
      .add(ub.clone().multiplyScalar(Math.sin(t * ang) / s));
    pts.push(p.multiplyScalar(R * (1.01 + Math.sin(Math.PI * t) * lift)));
  }
  return pts;
}

export default function Globe({ active }: { active: number }) {
  const mount = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const el = mount.current;
    if (!el) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
    camera.position.set(0, 0, 6.2);

    const globe = new THREE.Group();
    scene.add(globe);

    // occluder so the far side stays hidden
    globe.add(new THREE.Mesh(new THREE.SphereGeometry(R * 0.985, 64, 64), new THREE.MeshBasicMaterial({ color: INK })));

    // halo
    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(R * 1.16, 48, 48),
      new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.BackSide,
        depthWrite: false,
        uniforms: { c: { value: new THREE.Color(BRASS) } },
        vertexShader: `varying vec3 n; void main(){ n = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragmentShader: `uniform vec3 c; varying vec3 n; void main(){ gl_FragColor = vec4(c, pow(abs(n.z), 1.6) * 0.55); }`,
      }),
    );
    scene.add(halo);

    // graticule
    const grat: number[] = [];
    const pushLine = (a: THREE.Vector3, b: THREE.Vector3) => grat.push(a.x, a.y, a.z, b.x, b.y, b.z);
    for (let lat = -60; lat <= 60; lat += 20)
      for (let lon = -180; lon < 180; lon += 4) pushLine(toVec(lat, lon), toVec(lat, lon + 4));
    for (let lon = -180; lon < 180; lon += 20)
      for (let lat = -80; lat < 80; lat += 4) pushLine(toVec(lat, lon), toVec(lat + 4, lon));
    const gratGeo = new THREE.BufferGeometry();
    gratGeo.setAttribute("position", new THREE.Float32BufferAttribute(grat, 3));
    globe.add(
      new THREE.LineSegments(gratGeo, new THREE.LineBasicMaterial({ color: BRASS, transparent: true, opacity: 0.12 })),
    );

    // coastlines
    const coast: number[] = [];
    for (const ring of landRings()) {
      for (let i = 0; i < ring.length - 1; i++) {
        const a = toVec(ring[i][1], ring[i][0], R * 1.002);
        const b = toVec(ring[i + 1][1], ring[i + 1][0], R * 1.002);
        coast.push(a.x, a.y, a.z, b.x, b.y, b.z);
      }
    }
    const coastGeo = new THREE.BufferGeometry();
    coastGeo.setAttribute("position", new THREE.Float32BufferAttribute(coast, 3));
    globe.add(
      new THREE.LineSegments(
        coastGeo,
        new THREE.LineBasicMaterial({ color: BRASS_SOFT, transparent: true, opacity: 0.75 }),
      ),
    );

    // Taipei
    const home = toVec(TAIPEI.lat, TAIPEI.lon, R * 1.01);
    const homeDot = new THREE.Mesh(new THREE.SphereGeometry(0.035, 16, 16), new THREE.MeshBasicMaterial({ color: SEAL }));
    homeDot.position.copy(home);
    globe.add(homeDot);
    const rings = [0, 1].map((k) => {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.05, 0.058, 48),
        new THREE.MeshBasicMaterial({ color: SEAL, transparent: true, side: THREE.DoubleSide, depthWrite: false }),
      );
      ring.position.copy(home);
      ring.lookAt(home.clone().multiplyScalar(2));
      ring.userData.offset = k * 0.5;
      globe.add(ring);
      return ring;
    });

    // sources, routes and shipments travelling to Taipei
    const routes = regions.map((r) => {
      const from = toVec(r.lat, r.lon, R * 1.01);
      const pts = arcPoints(from, home);
      const mat = new THREE.LineBasicMaterial({ color: BRASS, transparent: true, opacity: 0.35 });
      const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat);
      const dotMat = new THREE.MeshBasicMaterial({ color: BRASS_SOFT });
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.026, 12, 12), dotMat);
      dot.position.copy(from);
      const ship = new THREE.Mesh(new THREE.SphereGeometry(0.02, 10, 10), new THREE.MeshBasicMaterial({ color: 0xffffff }));
      globe.add(line, dot, ship);
      return { pts, mat, dot, ship, speed: 0.16 + 0.5 / pts[0].distanceTo(home) / 12, offset: Math.random() };
    });

    const resize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);

    const first = regions[activeRef.current] ?? regions[0];
    globe.rotation.y = -(((first.lon + TAIPEI.lon) / 2 + 90) * DEG) - 0.9;
    const start = performance.now();
    let raf = 0;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const t = (performance.now() - start) / 1000;
      const idx = activeRef.current;
      const r = regions[idx] ?? regions[0];

      // face the midpoint of the active route so both ends stay in view
      const mid = toVec(r.lat, r.lon, 1).add(toVec(TAIPEI.lat, TAIPEI.lon, 1)).normalize();
      const lon = Math.atan2(mid.z, -mid.x) / DEG - 180;
      const lat = Math.asin(mid.y) / DEG;
      const targetY = -(lon + 90) * DEG;
      const targetX = lat * DEG * 0.75;
      let dy = (targetY - globe.rotation.y) % (Math.PI * 2);
      if (dy > Math.PI) dy -= Math.PI * 2;
      if (dy < -Math.PI) dy += Math.PI * 2;
      const k = reduced ? 1 : 0.045;
      globe.rotation.y += dy * k;
      globe.rotation.x += (targetX - globe.rotation.x) * k;

      routes.forEach((route, i) => {
        const on = i === idx;
        route.mat.opacity += ((on ? 1 : 0.22) - route.mat.opacity) * 0.1;
        route.mat.color.set(on ? BRASS_SOFT : BRASS);
        route.dot.scale.setScalar(on ? 1.5 + Math.sin(t * 4) * 0.2 : 1);
        const p = reduced ? 0.5 : (t * route.speed + route.offset) % 1;
        const f = p * (route.pts.length - 1);
        const a = route.pts[Math.floor(f)];
        const b = route.pts[Math.min(Math.floor(f) + 1, route.pts.length - 1)];
        route.ship.position.lerpVectors(a, b, f % 1);
        route.ship.scale.setScalar(on ? 1.5 : 0.8);
      });

      rings.forEach((ring) => {
        const p = reduced ? 0.4 : (t * 0.5 + ring.userData.offset) % 1;
        ring.scale.setScalar(1 + p * 3.2);
        (ring.material as THREE.MeshBasicMaterial).opacity = 0.9 * (1 - p);
      });

      renderer.render(scene, camera);
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
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
