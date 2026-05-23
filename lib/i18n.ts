export type Lang = "he" | "en";

interface Dict {
  brand: string;
  tagline: string;
  nav: { home: string; browse: string; compare: string; about: string };
  hero: { title: string; subtitle: string; chatPlaceholder: string; send: string };
  features: { title: string; items: { title: string; body: string }[] };
  destinations: {
    israelNationalTrail: string;
    montBlanc: string;
    tourDuMontBlanc: string;
    annapurna: string;
    everestBaseCamp: string;
    machuPicchu: string;
    grandCanyon: string;
    appalachianTrail: string;
    johnMuirTrail: string;
    banff: string;
    westHighlandWay: string;
    atlas: string;
    kilimanjaro: string;
    mountFuji: string;
    milford: string;
    laugavegur: string;
    trolltunga: string;
    overlandTrack: string;
    wadiRum: string;
    patagonia: string;
    dolomites: string;
    lycianWay: string;
    caminoSantiago: string;
    snowdonia: string;
    ladakh: string;
    pacificCrestTrail: string;
    drakensberg: string;
  };
  common: { loading: string; language: string; error: string };
}

export type { Dict };

export const translations: Record<Lang, Dict> = {
  he: {
    brand: "TrailIQ",
    tagline: "הציוד הנכון. כל הרפתקה.",
    nav: {
      home: "בית",
      browse: "קטגוריות",
      compare: "השוואה",
      about: "אודות",
    },
    hero: {
      title: "תכנן את ההרפתקה הבאה שלך",
      subtitle: "בינה מלאכותית שמתאימה לך את הציוד המושלם לכל יעד.",
      chatPlaceholder: "לאן אתה נוסע? ספר לי על הטיול שלך...",
      send: "התאם לי ציוד",
    },
    features: {
      title: "איך זה עובד",
      items: [
        {
          title: "ספר לנו על הטיול",
          body: "ציין יעד, משך, תקציב והעדפות במשפט אחד — בעברית או באנגלית.",
        },
        {
          title: "ה-AI מנתח",
          body: "Claude קורא את הבקשה, מבין אקלים, משקל וצרכים טכניים.",
        },
        {
          title: "מקבלים 6 המלצות מותאמות",
          body: "ציוד אמיתי ממותגים מובילים, עם הסבר למה הוא מתאים בדיוק לך.",
        },
      ],
    },
    destinations: {
      israelNationalTrail: "שביל ישראל",
      montBlanc: "מון בלאן",
      tourDuMontBlanc: "טור דה מון בלאן",
      annapurna: "סובב אנפורנה",
      everestBaseCamp: "בסיס האוורסט",
      machuPicchu: "מאצ'ו פיצ'ו",
      grandCanyon: "גרנד קניון",
      appalachianTrail: "שביל האפלצ'ים",
      johnMuirTrail: "שביל ג'ון מיור",
      banff: "באנף",
      westHighlandWay: "וסט היילנד וויי",
      atlas: "הרי האטלס",
      kilimanjaro: "קילימנג'רו",
      mountFuji: "הר פוג'י",
      milford: "מסלול מילפורד",
      laugavegur: "לאוגאוגור",
      trolltunga: "טרולטונגה",
      overlandTrack: "אוברלנד טראק",
      wadiRum: "ואדי רם",
      patagonia: "פטגוניה",
      dolomites: "הדולומיטים",
      lycianWay: "שביל ליקיה",
      caminoSantiago: "קמינו דה סנטיאגו",
      snowdonia: "סנודוניה",
      ladakh: "לדאק",
      pacificCrestTrail: "פסיפיק קרסט טרייל",
      drakensberg: "דרקנסברג",
    },
    common: {
      loading: "ה-AI חושב...",
      language: "EN",
      error: "אופס, משהו השתבש. נסה שוב.",
    },
  },
  en: {
    brand: "TrailIQ",
    tagline: "The Right Gear. Every Adventure.",
    nav: {
      home: "Home",
      browse: "Browse",
      compare: "Compare",
      about: "About",
    },
    hero: {
      title: "Plan your next adventure",
      subtitle: "AI that matches you with the perfect gear for any destination.",
      chatPlaceholder: "Where are you going? Tell me about your trip...",
      send: "Match my gear",
    },
    features: {
      title: "How it works",
      items: [
        {
          title: "Tell us about the trip",
          body: "Destination, duration, budget and preferences — one sentence, in Hebrew or English.",
        },
        {
          title: "The AI analyzes",
          body: "Claude reads your request and understands climate, weight and technical needs.",
        },
        {
          title: "Get 6 tailored picks",
          body: "Real gear from top brands, with an explanation of why each fits you.",
        },
      ],
    },
    destinations: {
      israelNationalTrail: "Israel National Trail",
      montBlanc: "Mont Blanc",
      tourDuMontBlanc: "Tour du Mont Blanc",
      annapurna: "Annapurna Circuit",
      everestBaseCamp: "Everest Base Camp",
      machuPicchu: "Machu Picchu",
      grandCanyon: "Grand Canyon",
      appalachianTrail: "Appalachian Trail",
      johnMuirTrail: "John Muir Trail",
      banff: "Banff National Park",
      westHighlandWay: "West Highland Way",
      atlas: "Atlas Mountains",
      kilimanjaro: "Kilimanjaro",
      mountFuji: "Mount Fuji",
      milford: "Milford Track",
      laugavegur: "Laugavegur Trail",
      trolltunga: "Trolltunga",
      overlandTrack: "Overland Track",
      wadiRum: "Wadi Rum",
      patagonia: "Patagonia",
      dolomites: "The Dolomites",
      lycianWay: "Lycian Way",
      caminoSantiago: "Camino de Santiago",
      snowdonia: "Snowdonia",
      ladakh: "Ladakh / Markha Valley",
      pacificCrestTrail: "Pacific Crest Trail",
      drakensberg: "Drakensberg",
    },
    common: {
      loading: "AI is thinking...",
      language: "עב",
      error: "Oops, something went wrong. Try again.",
    },
  },
};
