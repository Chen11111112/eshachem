export const FOUNDED = 1978;

export const company = {
  name: "益協實業有限公司",
  short: "益協實業",
  en: "E Sha Chemical Co.",
  motto: "益事興隆四季春，協力共創百年業。",
  address: "台北市建國北路二段33號8樓之一",
  tel: "(02) 2506-1838",
  telHref: "tel:+886225061838",
  fax: "(02) 2507-6484",
  email: "esha@ms8.hinet.net",
};

export const nav = [
  { href: "#about", label: "關於益協" },
  { href: "#history", label: "公司沿革" },
  { href: "#partners", label: "代理產品" },
  { href: "#catalog", label: "產品目錄" },
  { href: "#contact", label: "聯絡我們" },
];

export const values = [
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
];

export const history = [
  { year: 1978, title: "創立於迪化街", body: "益協實業有限公司成立，自台北最老的商業街區起步。" },
  { year: 1984, title: "設立進口部", body: "設立進口部並遷址伊通街，開始直接與海外原廠往來。" },
  { year: 1985, title: "成立關係企業", body: "成立關係企業：源皓企業有限公司。" },
  { year: 1989, title: "自購辦公室", body: "遷入建國北路辦公大樓自購辦公室，於此服務至今。" },
  { year: 1993, title: "香港分公司", body: "成立香港分公司，拓展海外採購與服務據點。" },
];

export type Region = {
  id: string;
  name: string;
  en: string;
  lat: number;
  lon: number;
  makers: { maker?: string; items: string }[];
};

export const TAIPEI = { lat: 25.03, lon: 121.56 };

export const regions: Region[] = [
  {
    id: "jp",
    name: "日本",
    en: "Japan",
    lat: 36.2,
    lon: 138.2,
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
  {
    id: "de",
    name: "德國",
    en: "Germany",
    lat: 51.2,
    lon: 10.4,
    makers: [{ maker: "BAYER", items: "氫氧化鈉（CP 級）、80% 聯胺" }],
  },
  {
    id: "eu",
    name: "歐洲",
    en: "Europe",
    lat: 46.5,
    lon: 4.5,
    makers: [{ items: "赤磷、己二酸、磷酸一鉀、磷酸二鉀、甲醇鈉" }],
  },
  {
    id: "us",
    name: "美國",
    en: "United States",
    lat: 39.5,
    lon: -98.3,
    makers: [{ items: "醋酸酐" }],
  },
  {
    id: "in",
    name: "印度",
    en: "India",
    lat: 21,
    lon: 78.9,
    makers: [{ items: "碘片、碘化鉀" }],
  },
  {
    id: "my",
    name: "馬來西亞",
    en: "Malaysia",
    lat: 4.2,
    lon: 102,
    makers: [{ items: "甘油" }],
  },
  {
    id: "id",
    name: "印尼",
    en: "Indonesia",
    lat: -2.5,
    lon: 113,
    makers: [{ items: "60% 漂白粉" }],
  },
  {
    id: "cn",
    name: "中國大陸",
    en: "China",
    lat: 33,
    lon: 108,
    makers: [
      {
        items:
          "硫脲、過錳酸鉀、過碳酸鈉（SPC）、鋁粉、赤血鹽、苯代三聚氰胺、氫氧化鋰、高純度氯化鈣（94% 以上）、五氧化二釩",
      },
    ],
  },
];

export const marquee = [
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
];
