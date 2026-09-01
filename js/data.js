// Template data — duplicate this object for new clients/cases
window.DASHBOARD_DATA = {
  client: "Holmbladshus",
  period: "Maj–Juni 2026",
  campaignYear: "Kampagnestatus 2026",

  overview: {
    title: "HVOR STÅR VI?",
    subtitle: "Markedsføringen skaber dokumenteret synlighed, interesse og research",
    kpis: [
      { label: "Annonceeksponeringer", value: "409.783" },
      { label: "Klik fra kampagner", value: "8.585" },
      { label: "Når 75% gennem siden", value: "~40%" },
      { label: "Lokalebasen-visninger", value: "5.111" },
      { label: "Telefon/mail-handlinger", value: "11" },
      { label: "Prospekt-downloads", value: "2" },
    ],
    summary:
      "Holmbladshus bliver set. Annoncerne bliver klikket på. Brugerne researcher ejendommen. Kampagnerne gør deres arbejde — vi skaber høj synlighed og betydelig trafik.",
    conclusion:
      "Den største udfordring er overgangen fra interesse til konkret henvendelse. Næste opgave: få mere af den eksisterende interesse omsat til lejerdialoger.",
  },

  channels: {
    title: "BLIVER HOLMBLADSHUS SET?",
    subtitle: "Ja — markant. Alene i maj og juni har annonceringen genereret 409.783 eksponeringer.",
    rows: [
      { name: "Meta", exposures: 70567, clicks: 7791, color: "#4AEADC", note: "Skaber den største mængde interesse og trafik." },
      { name: "Google Search", exposures: 3749, clicks: 172, color: "#FCB900", note: "Opsamler personer, der aktivt søger efter kontorlejemål." },
      { name: "Google Display", exposures: 304000, clicks: 545, color: "#0693E3", note: "Sikrer bred markedssynlighed i Københavnsområdet." },
      { name: "LinkedIn", exposures: 31467, clicks: 77, color: "#9B51E0", note: "Professionel synlighed mod virksomheder og beslutningstagere." },
    ],
    total: { exposures: 409783, clicks: 8585 },
    assessment: "Meta performer fortsat stærkt og er vurderet over gennemsnittet for sammenlignelige cases.",
  },

  engagement: {
    title: "ER DER REEL INTERESSE — ELLER BARE KLIK?",
    subtitle: "Data peger på reel researchadfærd",
    percentage: 40,
    description:
      "Ca. 40% af de målte brugere når mindst 75% ned gennem Holmbladshus.dk. Siden er en one-pager, og 75%-punktet ligger umiddelbart før indretningsforslagene på desktop.",
    insight:
      "Vi ser: Annonce → klik → aktiv research på Holmbladshus.dk. Det understøtter, at trafikken har reel relevans.",
  },

  portals: {
    title: "INTERESSEN SES OGSÅ UDEN FOR KAMPAGNERNE",
    subtitle: "Potentielle lejere researcher markedet på tværs af platforme",
    items: [
      {
        name: "Lokalebasen",
        periods: [
          { label: "Januar–april", views: 9532, actions: 18 },
          { label: "Maj–juni", views: 5111, actions: 11 },
          { label: "Januar–juni", views: 14643, actions: 29 },
        ],
        note: "Telefon/mail-handlinger ligger tættere på konkret kontaktintention end annoncevisninger.",
      },
      {
        name: "Ejendomstorvet",
        periods: [
          { label: "Januar–april", visits: 161, clicks: 26 },
          { label: "Maj–juni", visits: 50, clicks: 17 },
          { label: "Januar–juni", visits: 211, clicks: 43 },
        ],
        note: "Antallet der klikker videre stiger, selvom besøg falder lidt i juni.",
      },
      {
        name: "RED.dk",
        periods: [{ label: "Januar–juni", views: 164, downloads: "Registreret" }],
        note: "Fungerer som research- og konverteringspunkt i den samlede brugerrejse.",
      },
    ],
  },

  funnel: {
    title: "DET SAMLEDE BILLEDE",
    subtitle: "Brugerrejsen på tværs af kanaler og platforme",
    stages: [
      { label: "Annonceeksponeringer", value: "409.783" },
      { label: "Kampagneklik", value: "8.585" },
      { label: "Research på Holmbladshus.dk", value: "~40% når 75%" },
      { label: "Portalresearch", value: "15.018 visninger" },
      { label: "High-intent handlinger", value: "29 telefon/mail" },
      { label: "Konkrete leads", value: "2 verificerede" },
    ],
    leads: [
      { name: "Liva Nielsen", org: "CBRE Lejerrådgivning", period: "Maj–juni" },
      { name: "Frederik Klausen", org: "CBRE Lejerrådgivning", period: "Maj–juni" },
    ],
    challenge:
      "Vi kan dokumentere synlighed, klik, trafik, website-engagement og portalresearch. Volumen bliver væsentligt mindre ved: Research → konkret henvendelse.",
  },

  recommendations: {
    title: "NÆSTE SKRIDT",
    subtitle: "Vores anbefalinger fremadrettet",
    items: [
      "Fasthold den overordnede kampagnestruktur — data giver ikke grundlag for en fundamental ændring.",
      "Introducer nye Meta-kreativer — frekvensen er omkring 4,8 i maj-juni.",
      "Fasthold Google Search — CTR på 4,59% i maj-juni (172 klik fra 3.749 eksponeringer).",
      "Optimer konverteringen — landingpage, budskaber og CTA'er med fokus på research → henvendelse.",
      "Brug REDs markedsfeedback aktivt — sammenhold digital performance med henvendelser og fremvisninger.",
    ],
    workModel: [
      "Annoncering",
      "Trafik",
      "Engagement",
      "Leads",
      "Mæglerdialog",
      "Udfald",
    ],
    closing:
      "Målet er ikke kun at skabe mere trafik. Målet er at få mere forretningsmæssig effekt ud af den interesse, vi allerede skaber.",
  },
};
