import { useState } from "react";

const DAYS = [
  {
    date: "May 23",
    weekday: "Friday",
    title: "Alghero — Arrival",
    tag: "Solo",
    tagColor: "#D4A574",
    icon: "✈️",
    summary: "Evening arrival, settle in, first taste of Sardinia",
    anchor: "Arrive 21:20. Bus to centro (~25 min, €1). Check into Piccolo Catalunya Hostel. Stroll the bastions if you have energy — they're beautiful at night.",
    spots: [
      { type: "eat", name: "Trattoria Maristella", note: "Fregola con arselle, local seafood" },
      { type: "eat", name: "Trattoria Lo Romaní", note: "Via Maiorca — spaghetti ai ricci if in season" },
      { type: "drink", name: "Bastioni Marco Polo", note: "Sunset aperitivo along the sea walls" },
    ],
    logistics: "ALFA bus runs from airport every hour until ~23:00",
    bookAhead: null,
    overnightAt: "Alghero",
  },
  {
    date: "May 24",
    weekday: "Saturday",
    title: "Alghero → Olbia → Santa Teresa",
    tag: "Travel Day",
    tagColor: "#7A9E7E",
    icon: "🚗",
    summary: "Morning exploring, scenic drive east, meet Carlo",
    anchor: "Morning free in Alghero — the centro storico, the bastions, the port. The big optional excursion is Capo Caccia & Grotta di Nettuno (20 min drive): sea cliffs, 654 steps carved into rock, caves at sea level. Allow ~2 hrs.\n\nDrive to Olbia early-to-mid afternoon (~1h45 via SS291/SS729). Optional stop: Basilica di Saccargia near Codrongianos — striking Romanesque church alone in open countryside, 15 min off the highway.\n\nArrive Olbia with a few hours before Carlo lands (~22:30–23:00). Walk Corso Umberto, eat. Pick up Carlo, drive 1h north to Santa Teresa. Arrive ~midnight.",
    spots: [
      { type: "coffee", name: "Bar Mirò", note: "Piazza Civica, Alghero — cornetto & cappuccino" },
      { type: "eat", name: "Ristorante Gallura", note: "Corso Umberto, Olbia — classic Sardinian" },
      { type: "drink", name: "Piazza Matteotti bars", note: "Olbia — aperitivo while waiting for Carlo" },
    ],
    logistics: "Pick up rental car in Alghero morning. Drive: Alghero → Olbia ~1h45. Olbia → Santa Teresa ~1h.",
    bookAhead: "🚗 Rental car: one-way Alghero → Olbia Airport",
    overnightAt: "Santa Teresa Gallura",
  },
  {
    date: "May 25",
    weekday: "Sunday",
    title: "Capo Testa + Pick Up Elli",
    tag: "With Carlo",
    tagColor: "#6B8CAE",
    icon: "🏖️",
    summary: "Lunar landscapes at your doorstep, then south for Elli",
    anchor: "Morning at Capo Testa — 10 min from the house, one of the most extraordinary headlands in the Mediterranean. Granite formations, hidden coves, Corsica visible across the strait.\n\nMain beaches: Rena di Ponente & Rena di Levante flanking the isthmus. For something wilder, walk into Valle della Luna and find Cala Spinosa (~20 min on foot). Bring snorkel gear.\n\nLeave ~13:30–14:00 for Olbia. Pick up Elli at 15:25. Return via Porto Cervo — the marina is worth seeing once, late May is still quiet.\n\nFirst evening together as a group back in Santa Teresa.",
    spots: [
      { type: "eat", name: "La Casetta di Iris", note: "Deli-style, try zuppa gallurese" },
      { type: "eat", name: "Panineria Dal Re", note: "Giant Sardinian sandwiches — good on the go" },
      { type: "eat", name: "PeMa", note: "Best creative Sardinian in town — book ahead" },
      { type: "eat", name: "Millo Ristorante", note: "Solid alternative for dinner" },
      { type: "drink", name: "Groove Cocktail Bar", note: "Via XX Settembre" },
    ],
    logistics: "Santa Teresa → Olbia Airport: 1h. Detour through Porto Cervo adds ~25 min on return.",
    bookAhead: "🍽️ PeMa restaurant for dinner",
    overnightAt: "Santa Teresa Gallura",
  },
  {
    date: "May 26",
    weekday: "Monday",
    title: "Porto Pollo + La Maddalena",
    tag: "Full Group",
    tagColor: "#C4785B",
    icon: "🪁",
    summary: "Kitesurfing in the morning, island-hopping in the afternoon",
    anchor: "Drive 40 min to Porto Pollo near Palau. One of Europe's top kite & windsurf spots — the venturi effect through the Strait of Bonifacio delivers 15–25 knots most days. Flat water on the lagoon side. Wind Porto Pollo and MB Pro Center for gear rental.\n\nIf no wind: Porto Liscia/Sciumara catches swell.\n\nAfternoon: Palau → La Maddalena ferry (every 15–30 min, ~20 min, ~€16 foot / ~€40 with car). Drive across to Caprera for Cala Coticcio (\"Tahiti beach\" — 20 min walk in, extraordinary). Or take a half-day boat tour to Spargi, Budelli & Santa Maria (~€40 pp).",
    spots: [
      { type: "eat", name: "Da Thomas", note: "Palau — fresh fish, spaghetti alla bottarga" },
      { type: "eat", name: "Il Capriccio", note: "Sea-view terrace near Porto Pollo" },
      { type: "eat", name: "Ristorante Azzurra", note: "Santa Teresa — local seafood, unpretentious" },
      { type: "drink", name: "Bar Stazione", note: "Sunset aperitivo" },
    ],
    logistics: "Santa Teresa → Porto Pollo: 40 min. Porto Pollo → Palau ferry: 5 min. Wind builds from midday — mornings flatter, afternoons stronger.",
    bookAhead: "🪁 Kite gear/lesson at Porto Pollo — book day before by phone/WhatsApp",
    overnightAt: "Santa Teresa Gallura",
  },
  {
    date: "May 27",
    weekday: "Tuesday",
    title: "Bonifacio, Corsica",
    tag: "Day Trip",
    tagColor: "#8B6BAE",
    icon: "⛴️",
    summary: "50-minute ferry to one of the Mediterranean's most dramatic cities",
    anchor: "Ferry from Santa Teresa port (5 min from the house) to Bonifacio. Foot passengers only — leave the car.\n\nExplore the Haute Ville citadel perched on white limestone cliffs. Walk the Escalier du Roi d'Aragon — 187 steps carved into the cliff face. Rampart walk with views back to Sardinia.\n\nAfternoon option: boat tour to Îles Lavezzi (~€35 pp, 30 min by zodiac) — granite archipelago, crystal water, almost no one there. Or a cliffs & sea caves boat tour (1.5 hrs) to see Bonifacio from below.\n\nLast ferry back late afternoon.",
    spots: [
      { type: "eat", name: "Le Voilier", note: "Bonifacio marina — fish, Corsican wines" },
      { type: "eat", name: "Cantina Doria", note: "Upper town — rustic Corsican charcuterie" },
      { type: "eat", name: "L'Antica Isola", note: "Back in Santa Teresa for dinner" },
      { type: "drink", name: "Marina bars, Bonifacio", note: "Try Patrimonio rosé" },
    ],
    logistics: "Ferry: ~50 min, €35–50 pp round trip. Earliest ~09:00, last return ~18:30–19:00. Bring passport/ID.",
    bookAhead: "⛴️ Ferry tickets — mobylines.com or ichnusalines.com",
    overnightAt: "Santa Teresa Gallura",
  },
  {
    date: "May 28",
    weekday: "Wednesday",
    title: "Interior & Wine Country",
    tag: "Last Full Day",
    tagColor: "#B5838D",
    icon: "🍷",
    summary: "Go inland — mountains, villages, agriturismo feast, wine",
    anchor: "Two directions worth considering:\n\nOption A — Castelsardo (1h15 west): Medieval hill town on a rock above the sea, castle, basket-weaving tradition. Return via Isola Rossa for a different coastal feel.\n\nOption B — Tempio Pausania + Aggius (45 min south): Granite mountain towns, cooler air, totally different character. Aggius is spectacular and nearly unknown to tourists. The interior \"Valle della Luna\" (distinct from Capo Testa's) is nearby. A fixed-menu agriturismo lunch is one of the best meals of the trip — porceddu, sheep cheese, wine, mirto, everything.\n\nEither direction, stop at Cantina Surrau on the return (between Arzachena and Porto Cervo) — Vermentino di Gallura DOCG tastings, buy a few bottles.\n\nLast evening in Santa Teresa. Pack tonight — tomorrow is an 08:00 departure.",
    spots: [
      { type: "eat", name: "Agriturismo Il Muto di Gallura", note: "Near Aggius — fixed menu ~€40, call ahead" },
      { type: "eat", name: "Agriturismo Li Nalboni", note: "Alternative near Santa Teresa" },
      { type: "eat", name: "Il Cormorano", note: "Castelsardo — fish ravioli, local catch" },
      { type: "drink", name: "Cantina Surrau", note: "Free Vermentino tastings between Arzachena & Porto Cervo" },
      { type: "eat", name: "Goblet Wine Bar", note: "Santa Teresa — excellent wine, last dinner" },
    ],
    logistics: "Cantina Surrau closes ~18:30 — time it on the way back.",
    bookAhead: "🍽️ Agriturismo — call the day before",
    overnightAt: "Santa Teresa Gallura",
  },
  {
    date: "May 29",
    weekday: "Thursday",
    title: "Departure — Olbia",
    tag: "Travel Day",
    tagColor: "#7A9E7E",
    icon: "✈️",
    summary: "Early morning, straight to airport, no detours",
    anchor: "Flight at 11:05 from Olbia. Check-in closes ~09:35. Drive is 1 hour.\n\nLeave Santa Teresa by 08:00. No beach stops, no detours. Return car at Olbia Airport by ~09:15.\n\nPack the night before. Coffee to go from the first bar open in town.",
    spots: [],
    logistics: "Leave by 08:00. Drive 1h. Return car. Check in by 09:30.",
    bookAhead: null,
    overnightAt: null,
  },
];

const DONT_MISS = [
  { title: "Cala Spinosa at golden hour", text: "Almost no one on Capo Testa late afternoon in May. Bring a mask — the snorkeling is pristine." },
  { title: "Vermentino at a cantina", text: "Sardinia's only DOCG wine, world-class within 30km of your base. Skip supermarket bottles — go to Surrau, Gallura, or Capichera." },
  { title: "Stazzu cuisine at an agriturismo", text: "Fixed menu, porceddu, sheep cheese, wine, mirto — all included. Il Muto di Gallura or La Cerra. Always too much food." },
  { title: "Porto Pollo in the secret window", text: "Late May has the wind without the summer kite-school crowds. Locals call this the best time." },
  { title: "Aggius — the other Valle della Luna", text: "Boulder-strewn inland valley near Aggius. Almost no foreign tourists. Pair with a village lunch." },
  { title: "Mirto bianco", text: "Everyone drinks red mirto. The white (from leaves, not berries) is drier, rarer, and better. Ask for it specifically." },
];

const CHECKLIST = [
  { text: "Rental car — one-way Alghero → Olbia Airport, May 24 morning", urgent: true },
  { text: "Ferry tickets — Santa Teresa ↔ Bonifacio, May 27", urgent: true },
  { text: "PeMa restaurant — dinner May 25", urgent: false },
  { text: "Agriturismo Il Muto di Gallura — lunch May 28, call day before", urgent: false },
  { text: "Kite gear / lesson Porto Pollo — May 26, book day before", urgent: false },
  { text: "Phi Beach — check @phibeach for late May opening", urgent: false },
];

const spotIcons = { eat: "🍽️", drink: "🥂", coffee: "☕" };

function DayCard({ day, isOpen, onToggle }) {
  return (
    <div
      style={{
        marginBottom: 16,
        borderRadius: 16,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.08)",
        overflow: "hidden",
        transition: "all 0.3s ease",
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          padding: "20px 20px",
          display: "flex",
          alignItems: "flex-start",
          gap: 14,
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          color: "inherit",
        }}
      >
        <span style={{ fontSize: 28, lineHeight: 1, marginTop: 2, flexShrink: 0 }}>{day.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>
              {day.weekday}
            </span>
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>•</span>
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>
              {day.date}
            </span>
            {day.tag && (
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "2px 8px",
                  borderRadius: 20,
                  background: day.tagColor + "22",
                  color: day.tagColor,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                {day.tag}
              </span>
            )}
          </div>
          <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: "#fff", lineHeight: 1.25, marginBottom: 4 }}>
            {day.title}
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.4 }}>
            {day.summary}
          </div>
        </div>
        <span
          style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.3)",
            transition: "transform 0.3s ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            flexShrink: 0,
            marginTop: 6,
          }}
        >
          ▾
        </span>
      </button>

      {isOpen && (
        <div
          style={{
            padding: "0 20px 20px 62px",
            animation: "fadeIn 0.25s ease",
          }}
        >
          <div
            style={{
              fontSize: 14,
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.75)",
              whiteSpace: "pre-line",
              marginBottom: day.spots.length > 0 ? 20 : 0,
            }}
          >
            {day.anchor}
          </div>

          {day.spots.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                  marginBottom: 10,
                  fontWeight: 600,
                }}
              >
                Food & Drink Options
              </div>
              {day.spots.map((s, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                    padding: "7px 0",
                    borderBottom: i < day.spots.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  }}
                >
                  <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>{spotIcons[s.type]}</span>
                  <div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{s.name}</span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginLeft: 6 }}>— {s.note}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {day.logistics && (
            <div
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.5)",
                background: "rgba(255,255,255,0.04)",
                borderRadius: 10,
                padding: "10px 14px",
                marginBottom: day.bookAhead ? 10 : 0,
                lineHeight: 1.5,
              }}
            >
              🚗 {day.logistics}
            </div>
          )}

          {day.bookAhead && (
            <div
              style={{
                fontSize: 12,
                color: "#E8C07A",
                background: "rgba(232,192,122,0.08)",
                borderRadius: 10,
                padding: "10px 14px",
                border: "1px solid rgba(232,192,122,0.15)",
                lineHeight: 1.5,
              }}
            >
              {day.bookAhead}
            </div>
          )}

          {day.overnightAt && (
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 12, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              🛏️ Night in {day.overnightAt}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function SardiniaItinerary() {
  const [openDay, setOpenDay] = useState(null);
  const [activeTab, setActiveTab] = useState("itinerary");
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (i) => setCheckedItems((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(175deg, #1a1f2e 0%, #12161f 40%, #0d1117 100%)",
        color: "#fff",
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        maxWidth: 520,
        margin: "0 auto",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; -webkit-font-smoothing: antialiased; }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Hero */}
      <div
        style={{
          padding: "48px 24px 32px",
          position: "relative",
          background: "linear-gradient(180deg, rgba(107,140,174,0.12) 0%, transparent 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.04,
            backgroundImage: `radial-gradient(circle at 30% 20%, #6B8CAE 0%, transparent 50%),
                              radial-gradient(circle at 80% 60%, #C4785B 0%, transparent 40%)`,
          }}
        />
        <div style={{ position: "relative" }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
              marginBottom: 12,
              fontWeight: 500,
            }}
          >
            May 23 – 29, 2026
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 38,
              fontWeight: 800,
              lineHeight: 1.1,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Northern
            <br />
            Sardinia
          </h1>
          <div
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.5)",
              marginTop: 12,
              lineHeight: 1.5,
            }}
          >
            Santa Teresa Gallura · Gallura · Costa Smeralda
            <br />
            Corsica · La Maddalena Archipelago
          </div>
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 20,
              fontSize: 12,
              color: "rgba(255,255,255,0.45)",
            }}
          >
            <span>🏠 Base: Carlo's, Santa Teresa</span>
            <span>🚗 Car from May 24</span>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          gap: 0,
          padding: "0 24px",
          marginBottom: 20,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {["itinerary", "essentials", "checklist"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "12px 16px",
              fontSize: 12,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: activeTab === tab ? 600 : 400,
              color: activeTab === tab ? "#fff" : "rgba(255,255,255,0.35)",
              background: "none",
              border: "none",
              borderBottom: activeTab === tab ? "2px solid #C4785B" : "2px solid transparent",
              cursor: "pointer",
              transition: "all 0.2s ease",
              fontFamily: "inherit",
            }}
          >
            {tab === "itinerary" ? "Day by Day" : tab === "essentials" ? "Don't Miss" : "To Book"}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "0 16px 100px" }}>
        {activeTab === "itinerary" && (
          <div>
            {DAYS.map((day, i) => (
              <DayCard
                key={i}
                day={day}
                isOpen={openDay === i}
                onToggle={() => setOpenDay(openDay === i ? null : i)}
              />
            ))}
          </div>
        )}

        {activeTab === "essentials" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <div
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 22,
                fontWeight: 700,
                marginBottom: 6,
                padding: "0 4px",
              }}
            >
              Don't Miss
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 24, padding: "0 4px" }}>
              Late May specifics most tourists overlook
            </div>
            {DONT_MISS.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "16px 18px",
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: 14,
                  marginBottom: 12,
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 6 }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
                  {item.text}
                </div>
              </div>
            ))}

            <div
              style={{
                marginTop: 32,
                padding: "18px",
                background: "rgba(196,120,91,0.08)",
                borderRadius: 14,
                border: "1px solid rgba(196,120,91,0.15)",
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 600, color: "#C4785B", marginBottom: 8 }}>
                Nightlife in Late May
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
                Porto Cervo clubs open mid-June. What's alive now: Phi Beach at Forte Cappellini (Baja Sardinia, 35 min south) — check @phibeach for opening dates. Santa Teresa itself is bars and piazza at this time of year.
              </div>
            </div>

            <div
              style={{
                marginTop: 16,
                padding: "18px",
                background: "rgba(107,140,174,0.08)",
                borderRadius: 14,
                border: "1px solid rgba(107,140,174,0.12)",
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 600, color: "#6B8CAE", marginBottom: 8 }}>
                Wind Sports
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
                Porto Pollo wind builds midday — mornings are flatter (beginners/foiling), stronger from 12:00–17:00. Pack a 3/2 wetsuit, water ~17–18°C. Have a plan for no-wind days (La Maddalena boat trip swaps perfectly).
              </div>
            </div>

            <div
              style={{
                marginTop: 16,
                padding: "18px",
                background: "rgba(122,158,126,0.08)",
                borderRadius: 14,
                border: "1px solid rgba(122,158,126,0.12)",
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 600, color: "#7A9E7E", marginBottom: 8 }}>
                Eating in Gallura
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
                Zuppa gallurese (baked bread & cheese), pulicioni (ricotta ravioli w/ lemon), bottarga, local sausage. Vermentino di Gallura DOCG — Sardinia's only DOCG wine. Best cold as aperitivo or with fish.
              </div>
            </div>
          </div>
        )}

        {activeTab === "checklist" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <div
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 22,
                fontWeight: 700,
                marginBottom: 6,
                padding: "0 4px",
              }}
            >
              Book Ahead
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 24, padding: "0 4px" }}>
              Tap to check off as you go
            </div>
            {CHECKLIST.map((item, i) => (
              <button
                key={i}
                onClick={() => toggleCheck(i)}
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                  width: "100%",
                  padding: "16px 18px",
                  background: checkedItems[i] ? "rgba(122,158,126,0.08)" : "rgba(255,255,255,0.04)",
                  borderRadius: 14,
                  marginBottom: 10,
                  border: checkedItems[i] ? "1px solid rgba(122,158,126,0.2)" : "1px solid rgba(255,255,255,0.06)",
                  cursor: "pointer",
                  textAlign: "left",
                  color: "inherit",
                  transition: "all 0.2s ease",
                  fontFamily: "inherit",
                }}
              >
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 7,
                    border: checkedItems[i] ? "2px solid #7A9E7E" : "2px solid rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 1,
                    transition: "all 0.2s ease",
                    background: checkedItems[i] ? "rgba(122,158,126,0.15)" : "transparent",
                  }}
                >
                  {checkedItems[i] && <span style={{ color: "#7A9E7E", fontSize: 13, fontWeight: 700 }}>✓</span>}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: checkedItems[i] ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.85)",
                      textDecoration: checkedItems[i] ? "line-through" : "none",
                      transition: "all 0.2s ease",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.text}
                  </div>
                  {item.urgent && !checkedItems[i] && (
                    <span style={{ fontSize: 10, color: "#E8C07A", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>
                      Book now
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Group badge */}
      <div
        style={{
          position: "relative",
          padding: "0 24px 32px",
          marginTop: -60,
        }}
      >
      </div>
    </div>
  );
}