export const FOUNDED = 1978;
export const TAIPEI = { lat: 25.03, lon: 121.56 };

export type Locale = "zh" | "en";

const TEL = "(02) 2506-1838";
const TEL_HREF = "tel:+886225061838";
const FAX = "(02) 2507-6484";
const EMAIL = "esha@ms8.hinet.net";

const GEO = {
  jp: { lat: 36.2, lon: 138.2 },
  de: { lat: 51.2, lon: 10.4 },
  eu: { lat: 46.5, lon: 4.5 },
  us: { lat: 39.5, lon: -98.3 },
  in: { lat: 21, lon: 78.9 },
  my: { lat: 4.2, lon: 102 },
  id: { lat: -2.5, lon: 113 },
  cn: { lat: 33, lon: 108 },
} as const;

export type Region = {
  id: keyof typeof GEO;
  name: string;
  /** label shown in the route caption, always Latin */
  en: string;
  lat: number;
  lon: number;
  makers: { maker?: string; items: string }[];
};

type RegionText = Omit<Region, "lat" | "lon">;
const withGeo = (list: RegionText[]): Region[] => list.map((r) => ({ ...r, ...GEO[r.id] }));

export type Content = {
  locale: Locale;
  htmlLang: string;
  meta: { title: string; description: string };
  company: {
    name: string;
    short: string;
    sub: string;
    motto: string;
    address: string;
    mapQuery: string;
    tel: string;
    telHref: string;
    fax: string;
    email: string;
  };
  nav: { href: string; label: string }[];
  ui: { menu: string; openMenu: string; closeMenu: string; footerNav: string; home: string };
  langSwitch: { href: string; label: string; lang: string };
  hero: { eyebrow: string; title: [string, string]; titleSize: string; lead: string; primary: string; secondary: string };
  stats: { years: string; makers: string; sources: string; items: string; units: [string, string, string, string] };
  about: { title: [string, string]; quote: [string, string]; body: [string, string] };
  values: { char: string; title: string; en: string; body: string }[];
  history: { title: string; lead: string; items: { year: number; title: string; body: string }[] };
  partners: {
    title: [string, string];
    lead: string;
    tablist: string;
    itemsLabel: string;
    cta: { title: string; body: string; button: string };
  };
  regions: Region[];
  catalog: {
    title: string;
    lead: string;
    searchLabel: string;
    placeholder: string;
    all: string;
    other: string;
    count: string;
    empty: string;
    expand: string;
  };
  thanks: { lines: [string, string]; sign: string };
  contact: { title: string; tel: string; address: string; email: string; fax: string };
  marquee: string[];
};

const zh: Content = {
  locale: "zh",
  htmlLang: "zh-Hant-TW",
  meta: {
    title: "益協實業有限公司｜E Sha Chemical Co. — 自 1978 年的化學品進口行銷",
    description:
      "益協實業自 1978 年創立於台北迪化街，專營各行業化學品進口與行銷，代理德國、日本、歐美等原廠化工原料，並提供特殊化學原料代尋與代辦進口服務。",
  },
  company: {
    name: "益協實業有限公司",
    short: "益協實業",
    sub: "E Sha Chemical Co.",
    motto: "益事興隆四季春，協力共創百年業。",
    address: "台北市建國北路二段33號8樓之一",
    mapQuery: "台北市建國北路二段33號8樓之一",
    tel: TEL,
    telHref: TEL_HREF,
    fax: FAX,
    email: EMAIL,
  },
  nav: [
    { href: "#about", label: "關於益協" },
    { href: "#history", label: "公司沿革" },
    { href: "#partners", label: "代理產品" },
    { href: "#catalog", label: "產品目錄" },
    { href: "#contact", label: "聯絡我們" },
  ],
  ui: { menu: "主選單", openMenu: "開啟選單", closeMenu: "關閉選單", footerNav: "頁尾選單", home: "/" },
  langSwitch: { href: "/en", label: "EN", lang: "en" },
  hero: {
    eyebrow: "Since 1978 · Taipei, Taiwan",
    title: ["益協", "實業"],
    titleSize: "text-[19vw] sm:text-8xl lg:text-[9.5rem]",
    lead: "自 1978 年創立於台北迪化街，專營各行業化學品的進口與行銷。近半世紀，以誠信串起世界原廠與台灣產業。",
    primary: "產品目錄",
    secondary: "聯絡我們",
  },
  stats: {
    years: "深耕台灣化工業界",
    makers: "德、日具名代理原廠",
    sources: "進口來源國家與地區",
    items: "目錄常備化學品",
    units: ["年", "家", "地", "項"],
  },
  about: {
    title: ["頂級的品質，", "只為您"],
    quote: ["誠信相待，商業長青；", "平實守道，客源廣進。"],
    body: [
      "經過數十年的辛勤耕耘，益協得以在化工業界佔有一席之地。這都要感謝所有往來的客戶願意給予我們服務的機會，也感謝所有供應商的鼎力相助，讓我們有更強的競爭力，取得客戶的信任與愛護。",
      "未來仍將秉持「誠信」、「平實」、「謙和」的傳統精神，努力加強新產品的開發，並以全力達成客戶要求為目標，與客戶共創美好的未來。",
    ],
  },
  values: [
    {
      char: "誠",
      title: "誠信",
      en: "Integrity",
      body: "誠信相待，商業長青。報價、交期、品質，說到做到——這是我們近半世紀沒有變過的做事方法。",
    },
    {
      char: "實",
      title: "平實",
      en: "Steadiness",
      body: "平實守道，客源廣進。不追逐一時的行情，只把每一筆進口、每一張單據踏實做好。",
    },
    {
      char: "謙",
      title: "謙和",
      en: "Humility",
      body: "以謙和的態度服務每一位客戶，全力達成客戶的要求，並持續開發新產品。",
    },
  ],
  history: {
    title: "從迪化街出發",
    lead: "1978 年，益協在台北迪化街掛上招牌。從一間商行到自有辦公室與海外據點，每一步都走得踏實。",
    items: [
      { year: 1978, title: "創立於迪化街", body: "益協實業有限公司成立，自台北最老的商業街區起步。" },
      { year: 1984, title: "設立進口部", body: "設立進口部並遷址伊通街，開始直接與海外原廠往來。" },
      { year: 1985, title: "成立關係企業", body: "成立關係企業：源皓企業有限公司。" },
      { year: 1989, title: "自購辦公室", body: "遷入建國北路辦公大樓自購辦公室，於此服務至今。" },
      { year: 1993, title: "香港分公司", body: "成立香港分公司，拓展海外採購與服務據點。" },
    ],
  },
  partners: {
    title: ["連接世界，", "提供卓越"],
    lead: "數十年來與世界各國原廠建立穩固的合作關係。各種化工原料代理報價、經銷，現貨、期貨皆可洽詢。",
    tablist: "進口來源",
    itemsLabel: "進口品項",
    cta: {
      title: "代辦進口・代理報價",
      body: "各種特殊化學原料代尋或代辦進口，歡迎來電洽詢。",
      button: "聯絡我們",
    },
  },
  regions: withGeo([
    {
      id: "jp",
      name: "日本",
      en: "Japan",
      makers: [
        { maker: "TORAY", items: "DMSO（二甲基亞楓）" },
        { maker: "日本化學", items: "次亞磷酸鈉、五氧化二釩" },
        { maker: "東海", items: "過硫酸銨（APS）、過硫酸鈉（SPS）、過碳酸鈉" },
        { maker: "三井", items: "四氯化鈦" },
        { maker: "四國", items: "SDIC 60%、DICD 55%、TICA 90% 漂白劑（細顆粒、錠劑、粉狀）、THEIC（賽克）" },
        { maker: "東曹", items: "48% 氫溴酸、氫氧化鈉（粒鹼）、70% 漂白粉（粒狀、錠劑）" },
        { maker: "本州", items: "粉狀 PAC（多元氯化鋁）、甲醇鈉、丙二酸" },
        { maker: "東亞", items: "銀系抗菌劑" },
      ],
    },
    { id: "de", name: "德國", en: "Germany", makers: [{ maker: "BAYER", items: "氫氧化鈉（CP 級）、80% 聯胺" }] },
    { id: "eu", name: "歐洲", en: "Europe", makers: [{ items: "赤磷、己二酸、磷酸一鉀、磷酸二鉀、甲醇鈉" }] },
    { id: "us", name: "美國", en: "United States", makers: [{ items: "醋酸酐" }] },
    { id: "in", name: "印度", en: "India", makers: [{ items: "碘片、碘化鉀" }] },
    { id: "my", name: "馬來西亞", en: "Malaysia", makers: [{ items: "甘油" }] },
    { id: "id", name: "印尼", en: "Indonesia", makers: [{ items: "60% 漂白粉" }] },
    {
      id: "cn",
      name: "中國大陸",
      en: "China",
      makers: [
        {
          items:
            "硫脲、過錳酸鉀、過碳酸鈉（SPC）、鋁粉、赤血鹽、苯代三聚氰胺、氫氧化鋰、高純度氯化鈣（94% 以上）、五氧化二釩",
        },
      ],
    },
  ]),
  catalog: {
    title: "專注於每個細節",
    lead: "追求卓越的品質。以下為常備與可供應的化學品目錄，可依品名或編號查詢；未列出的品項也歡迎洽詢代尋。",
    searchLabel: "搜尋產品",
    placeholder: "搜尋中文、英文品名或編號…",
    all: "全部",
    other: "其他",
    count: "{n} / {total} 品項",
    empty: "目錄中找不到「{q}」。我們也提供特殊化學原料代尋與代辦進口，歡迎直接來電洽詢。",
    expand: "展開全部 {n} 項",
  },
  thanks: {
    lines: ["感謝所有往來的客戶，願意給予我們服務的機會；", "感謝所有供應商的鼎力相助，使我們走得更遠。"],
    sign: "—— 益協全體人員 致上最高的感謝",
  },
  contact: { title: "聯絡我們", tel: "電話（代表號）", address: "地址", email: "電子郵件", fax: "傳真" },
  marquee: [
    "氫氧化鈉",
    "DMSO",
    "次亞磷酸鈉",
    "過硫酸銨",
    "四氯化鈦",
    "氫溴酸",
    "多元氯化鋁",
    "甲醇鈉",
    "赤磷",
    "己二酸",
    "醋酸酐",
    "甘油",
    "碘化鉀",
    "過錳酸鉀",
    "氫氧化鋰",
    "五氧化二釩",
  ],
};

const en: Content = {
  locale: "en",
  htmlLang: "en",
  meta: {
    title: "E Sha Chemical Co. — Chemical import & distribution in Taiwan since 1978",
    description:
      "Founded on Dihua Street, Taipei in 1978, E Sha Chemical imports and distributes industrial chemicals from manufacturers in Germany, Japan, Europe and the US, and sources specialty chemicals on request.",
  },
  company: {
    name: "E Sha Chemical Co.",
    short: "E Sha Chemical",
    sub: "益協實業有限公司",
    motto: "Prospering through every season, building a century together.",
    address: "8F-1, No. 33, Sec. 2, Jianguo N. Rd., Taipei City, Taiwan",
    mapQuery: "台北市建國北路二段33號8樓之一",
    tel: TEL,
    telHref: TEL_HREF,
    fax: FAX,
    email: EMAIL,
  },
  nav: [
    { href: "#about", label: "About" },
    { href: "#history", label: "History" },
    { href: "#partners", label: "Agency Products" },
    { href: "#catalog", label: "Catalog" },
    { href: "#contact", label: "Contact" },
  ],
  ui: { menu: "Main menu", openMenu: "Open menu", closeMenu: "Close menu", footerNav: "Footer menu", home: "/en" },
  langSwitch: { href: "/", label: "中文", lang: "zh-Hant-TW" },
  hero: {
    eyebrow: "Since 1978 · Taipei, Taiwan",
    title: ["E Sha", "Chemical"],
    titleSize: "text-[16vw] sm:text-7xl lg:text-[8rem]",
    lead: "Founded on Taipei's Dihua Street in 1978, we import and distribute chemicals for every industry. For nearly half a century, integrity has been the link between the world's manufacturers and Taiwan's industry.",
    primary: "Product Catalog",
    secondary: "Contact Us",
  },
  stats: {
    years: "Years in Taiwan's chemical industry",
    makers: "Named German & Japanese principals",
    sources: "Source countries and regions",
    items: "Chemicals in our catalog",
    units: ["", "", "", ""],
  },
  about: {
    title: ["Premium quality,", "exclusively for you"],
    quote: ["Integrity keeps a business evergreen;", "steadiness keeps customers coming."],
    body: [
      "After decades of diligent work, E Sha has secured its place in the chemical industry. We owe this to every client who has given us the opportunity to serve them, and to every supplier whose strong support has made us more competitive and earned our customers' trust.",
      "We will continue to uphold our traditional spirit of Integrity, Steadiness and Humility, keep developing new products, and do everything we can to meet our customers' requirements — building a bright future together.",
    ],
  },
  values: [
    {
      char: "誠",
      title: "Integrity",
      en: "誠信",
      body: "Prices, lead times and quality — we do what we say. It is how we have worked for nearly half a century, and it has not changed.",
    },
    {
      char: "實",
      title: "Steadiness",
      en: "平實",
      body: "We do not chase short-term markets. We handle every shipment and every document carefully and by the book.",
    },
    {
      char: "謙",
      title: "Humility",
      en: "謙和",
      body: "We serve every customer with humility, work hard to meet each request, and keep adding new products.",
    },
  ],
  history: {
    title: "It began on Dihua Street",
    lead: "In 1978 E Sha opened its doors on Dihua Street in Taipei. From a trading house to our own office and an overseas branch, every step has been a steady one.",
    items: [
      {
        year: 1978,
        title: "Founded on Dihua Street",
        body: "E Sha Chemical Co., Ltd. is established in Taipei's oldest commercial district.",
      },
      {
        year: 1984,
        title: "Import Department",
        body: "The Import Department is set up and the company moves to Yitong Street, dealing directly with overseas manufacturers.",
      },
      { year: 1985, title: "Affiliated company", body: "Yuan Hao Enterprise Co., Ltd. is founded as an affiliated company." },
      {
        year: 1989,
        title: "Our own office",
        body: "The company moves into its self-owned office on Jianguo N. Rd., where it still operates today.",
      },
      { year: 1993, title: "Hong Kong branch", body: "A branch office is established in Hong Kong." },
    ],
  },
  partners: {
    title: ["Connecting the world,", "offering excellence"],
    lead: "Decades of strong partnerships with manufacturers worldwide. Agency quotations and distribution for a wide range of chemical raw materials — spot and forward.",
    tablist: "Import sources",
    itemsLabel: "Products",
    cta: {
      title: "Import handling · Agency quotations",
      body: "We source and handle imports of specialty chemical raw materials. Please feel free to contact us.",
      button: "Contact Us",
    },
  },
  regions: withGeo([
    {
      id: "jp",
      name: "Japan",
      en: "Japan",
      makers: [
        { maker: "TORAY", items: "DMSO (Dimethyl Sulfoxide)" },
        { maker: "Nippon Chemical", items: "Sodium Hypophosphite, Vanadium Pentoxide" },
        { maker: "Tokai", items: "Ammonium Persulfate (APS), Sodium Persulfate (SPS), Sodium Percarbonate" },
        { maker: "Mitsui", items: "Titanium Tetrachloride" },
        {
          maker: "Shikoku",
          items: "SDIC 60%, DICD 55% and TICA 90% bleach (granular, tablet, powder), THEIC",
        },
        {
          maker: "Tosoh",
          items: "48% Hydrobromic Acid, Sodium Hydroxide (pellets), 70% Bleaching Powder (granular, tablet)",
        },
        { maker: "Honshu", items: "Powder PAC (Polyaluminum Chloride), Sodium Methoxide, Malonic Acid" },
        { maker: "Toa", items: "Silver-based Antibacterial Agent" },
      ],
    },
    {
      id: "de",
      name: "Germany",
      en: "Germany",
      makers: [{ maker: "BAYER", items: "Sodium Hydroxide (CP grade), 80% Hydrazine" }],
    },
    {
      id: "eu",
      name: "Europe",
      en: "Europe",
      makers: [
        { items: "Red Phosphorus, Adipic Acid, Monopotassium Phosphate, Dipotassium Phosphate, Sodium Methoxide" },
      ],
    },
    { id: "us", name: "USA", en: "United States", makers: [{ items: "Acetic Anhydride" }] },
    { id: "in", name: "India", en: "India", makers: [{ items: "Iodine, Potassium Iodide" }] },
    { id: "my", name: "Malaysia", en: "Malaysia", makers: [{ items: "Glycerin" }] },
    { id: "id", name: "Indonesia", en: "Indonesia", makers: [{ items: "60% Bleaching Powder" }] },
    {
      id: "cn",
      name: "China",
      en: "China",
      makers: [
        {
          items:
            "Thiourea, Potassium Permanganate, Sodium Percarbonate (SPC), Aluminum Powder, Potassium Ferricyanide, Benzoguanamine, Lithium Hydroxide, High-purity Calcium Chloride (94%+), Vanadium Pentoxide",
        },
      ],
    },
  ]),
  catalog: {
    title: "Focused on every detail",
    lead: "In pursuit of exceptional quality. Search our catalog of stocked and available chemicals by name or code — and ask us about anything that is not listed.",
    searchLabel: "Search products",
    placeholder: "Search by name or code…",
    all: "All",
    other: "Other",
    count: "{n} / {total} items",
    empty: "Nothing in the catalog matches “{q}”. We also source specialty chemicals on request — please call us.",
    expand: "Show all {n} items",
  },
  thanks: {
    lines: [
      "To every client who has given us the opportunity to serve —",
      "and to every supplier whose support has carried us further.",
    ],
    sign: "— With our highest gratitude, the entire team of E Sha",
  },
  contact: { title: "Contact Us", tel: "Telephone (main line)", address: "Address", email: "Email", fax: "Fax" },
  marquee: [
    "Sodium Hydroxide",
    "DMSO",
    "Sodium Hypophosphite",
    "Ammonium Persulfate",
    "Titanium Tetrachloride",
    "Hydrobromic Acid",
    "Polyaluminum Chloride",
    "Sodium Methoxide",
    "Red Phosphorus",
    "Adipic Acid",
    "Acetic Anhydride",
    "Glycerin",
    "Potassium Iodide",
    "Potassium Permanganate",
    "Lithium Hydroxide",
    "Vanadium Pentoxide",
  ],
};

export const content: Record<Locale, Content> = { zh, en };
