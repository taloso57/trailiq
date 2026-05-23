"use client";

import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import { useMemo } from "react";
import { useLang } from "@/lib/LanguageProvider";

interface Destination {
  key: keyof ReturnType<typeof useLang>["t"]["destinations"];
  lat: number;
  lng: number;
  query_en: string;
  query_he: string;
}

const DESTINATIONS: Destination[] = [
  {
    key: "israelNationalTrail",
    lat: 31.0,
    lng: 34.85,
    query_en: "Israel National Trail southern section in spring, 14 days, water-scarce desert",
    query_he: "שביל ישראל בקטע הדרומי באביב, 14 ימים, מדבר עם מעט מים",
  },
  {
    key: "montBlanc",
    lat: 45.83,
    lng: 6.86,
    query_en: "Mont Blanc summit climb in late July, 7 days, technical mountaineering kit",
    query_he: "פסגת מון בלאן בסוף יולי, 7 ימים, ציוד טיפוס הרים טכני",
  },
  {
    key: "tourDuMontBlanc",
    lat: 46.03,
    lng: 7.12,
    query_en: "Tour du Mont Blanc in August, 11 days hut-to-hut, ultralight",
    query_he: "טור דה מון בלאן באוגוסט, 11 ימים מבקתה לבקתה, אולטרא-לייט",
  },
  {
    key: "annapurna",
    lat: 28.5,
    lng: 83.9,
    query_en: "Annapurna Circuit in October, 16 days, high altitude trekking",
    query_he: "סובב אנפורנה באוקטובר, 16 ימים, טרק בגובה רב",
  },
  {
    key: "everestBaseCamp",
    lat: 28.0,
    lng: 86.85,
    query_en: "Everest Base Camp trek in October, 14 days, mid-budget",
    query_he: "טרק לבסיס האוורסט באוקטובר, 14 ימים, תקציב בינוני",
  },
  {
    key: "machuPicchu",
    lat: -13.16,
    lng: -72.55,
    query_en: "Inca Trail to Machu Picchu in May, 4 days, mixed terrain",
    query_he: "שביל האינקה למאצ'ו פיצ'ו במאי, 4 ימים, שטח משתנה",
  },
  {
    key: "grandCanyon",
    lat: 36.1,
    lng: -112.1,
    query_en: "Grand Canyon rim-to-rim in spring, 3 days, extreme heat",
    query_he: "חציית גרנד קניון משפה לשפה באביב, 3 ימים, חום קיצוני",
  },
  {
    key: "appalachianTrail",
    lat: 37.5,
    lng: -80.5,
    query_en: "Appalachian Trail section hike in fall, 14 days, wet east-coast forest",
    query_he: "קטע משביל האפלצ'ים בסתיו, 14 ימים, יער רטוב בחוף המזרחי",
  },
  {
    key: "johnMuirTrail",
    lat: 37.2,
    lng: -118.7,
    query_en: "John Muir Trail in August, 21 days thru-hike, ultralight Sierra",
    query_he: "שביל ג'ון מיור באוגוסט, 21 ימים תרו-הייק, סיירה אולטרא-לייט",
  },
  {
    key: "banff",
    lat: 51.5,
    lng: -116.0,
    query_en: "Banff National Park backpacking in August, 7 days, bear country",
    query_he: "טרק בבאנף באוגוסט, 7 ימים, אזור דובים",
  },
  {
    key: "westHighlandWay",
    lat: 56.5,
    lng: -4.7,
    query_en: "West Highland Way in May, 7 days, wet Scottish weather",
    query_he: "וסט היילנד וויי במאי, 7 ימים, מזג אוויר סקוטי רטוב",
  },
  {
    key: "atlas",
    lat: 31.06,
    lng: -7.92,
    query_en: "Mount Toubkal climb in the Atlas in spring, 4 days, budget-friendly",
    query_he: "עלייה לטובקאל בהרי האטלס באביב, 4 ימים, תקציב נמוך",
  },
  {
    key: "kilimanjaro",
    lat: -3.07,
    lng: 37.35,
    query_en: "Kilimanjaro Machame route in January, 7 days",
    query_he: "קילימנג'רו במסלול מצ'אמה בינואר, 7 ימים",
  },
  {
    key: "mountFuji",
    lat: 35.36,
    lng: 138.73,
    query_en: "Mount Fuji Yoshida trail in July, 2 days, summit overnight",
    query_he: "עלייה להר פוג'י בשביל יושידה ביולי, יומיים, לינה בפסגה",
  },
  {
    key: "milford",
    lat: -44.79,
    lng: 167.92,
    query_en: "Milford Track in November, 4 days, premium kit",
    query_he: "מסלול מילפורד בנובמבר, 4 ימים, ציוד פרימיום",
  },
  {
    key: "laugavegur",
    lat: 64.0,
    lng: -19.0,
    query_en: "Laugavegur trail in July, 5 days, wet conditions",
    query_he: "מסלול לאוגאוגור ביולי, 5 ימים, תנאי רטיבות",
  },
  {
    key: "trolltunga",
    lat: 60.12,
    lng: 6.74,
    query_en: "Trolltunga day hike in August, all-weather shell",
    query_he: "טיול יום לטרולטונגה באוגוסט, ז'קט עמיד למזג אוויר",
  },
  {
    key: "overlandTrack",
    lat: -41.65,
    lng: 145.95,
    query_en: "Overland Track Tasmania in February, 6 days, wet alpine",
    query_he: "אוברלנד טראק בטסמניה בפברואר, 6 ימים, אלפיני רטוב",
  },
  {
    key: "wadiRum",
    lat: 29.58,
    lng: 35.42,
    query_en: "Wadi Rum desert trek in November, 4 days, cold nights",
    query_he: "טרק במדבר ואדי רם בנובמבר, 4 ימים, לילות קרים",
  },
  {
    key: "patagonia",
    lat: -49.3,
    lng: -73.0,
    query_en: "10 days in Patagonia, late summer, light pack",
    query_he: "10 ימים בפטגוניה בסוף הקיץ, חשוב לי משקל קל",
  },
  {
    key: "dolomites",
    lat: 46.41,
    lng: 11.85,
    query_en: "Alta Via 1 in the Dolomites in September, 9 days, hut-to-hut",
    query_he: "אלטה ויה 1 בדולומיטים בספטמבר, 9 ימים, מבקתה לבקתה",
  },
  {
    key: "lycianWay",
    lat: 36.3,
    lng: 30.2,
    query_en: "Lycian Way in October, 10 days, coastal Mediterranean",
    query_he: "שביל ליקיה באוקטובר, 10 ימים, חוף ים תיכוני",
  },
  {
    key: "caminoSantiago",
    lat: 42.88,
    lng: -8.54,
    query_en: "Camino Francés in May, 30 days, light pack and comfort",
    query_he: "קמינו פרנסה במאי, 30 ימים, תיק קל ונוחות",
  },
  {
    key: "snowdonia",
    lat: 53.07,
    lng: -4.07,
    query_en: "Snowdonia traverse in April, 3 days, rainy Welsh hills",
    query_he: "חציית סנודוניה באפריל, 3 ימים, גבעות וולשיות גשומות",
  },
  {
    key: "ladakh",
    lat: 34.15,
    lng: 77.58,
    query_en: "Markha Valley trek in Ladakh in August, 9 days, high desert",
    query_he: "טרק עמק מארקה בלדאק באוגוסט, 9 ימים, מדבר בגובה רב",
  },
  {
    key: "pacificCrestTrail",
    lat: 42.0,
    lng: -121.5,
    query_en: "PCT Oregon section in August, 30 days, thru-hike resupply",
    query_he: "קטע PCT באורגון באוגוסט, 30 ימים, תרו-הייק עם חידוש מלאי",
  },
  {
    key: "drakensberg",
    lat: -29.45,
    lng: 29.27,
    query_en: "Drakensberg traverse in May, 6 days, South African alpine",
    query_he: "חציית דרקנסברג במאי, 6 ימים, אלפיני דרום אפריקני",
  },
];

function glowingIcon() {
  return L.divIcon({
    className: "trailiq-marker",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    tooltipAnchor: [0, -14],
    html: `<span class="block w-[28px] h-[28px] rounded-full relative">
      <span class="absolute -inset-1 rounded-full bg-[#00D4FF] opacity-50 animate-ping"></span>
      <span class="absolute inset-0 rounded-full bg-[#00D4FF]/40 blur-[8px]"></span>
      <span class="absolute inset-[7px] rounded-full bg-[#00D4FF] shadow-[0_0_28px_8px_rgba(0,212,255,1)]"></span>
      <span class="absolute inset-[11px] rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,1)]"></span>
    </span>`,
  });
}

export default function WorldMap({
  onSelect,
}: {
  onSelect: (query: string) => void;
}) {
  const { lang, t } = useLang();
  const icon = useMemo(() => glowingIcon(), []);

  return (
    <MapContainer
      center={[20, 10]}
      zoom={2}
      minZoom={2}
      maxZoom={6}
      worldCopyJump
      scrollWheelZoom={false}
      className="w-full h-full rounded-2xl"
      style={{ background: "#050912" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
      />
      {DESTINATIONS.map((d) => (
        <Marker
          key={d.key}
          position={[d.lat, d.lng]}
          icon={icon}
          eventHandlers={{
            click: () => onSelect(lang === "he" ? d.query_he : d.query_en),
          }}
        >
          <Tooltip
            direction="top"
            offset={[0, -6]}
            opacity={1}
            className="trailiq-tooltip"
          >
            {t.destinations[d.key]}
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}
