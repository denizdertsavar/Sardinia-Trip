import { useState, useEffect } from "react";

/* ───────────────────── DATA (unchanged) ───────────────────── */
const DAYS = [
  {
    date: "May 23",
    weekday: "Sat",
    title: "Alghero - Arrival",
    tag: "Solo",
    tagColor: "teal",
    icon: "✈️",
    summary: "Evening arrival, settle in, first taste of Sardinia",
    anchor: [
      { time: "Evening", text: "Arrive 21:20. Bus to centro (~25 min, €1). Check into Piccolo Catalunya Hostel. Stroll the bastions if you have energy - they're beautiful at night." },
    ],
    spots: [
      { type: "eat", name: "Trattoria Maristella", note: "Fregola con arselle, local seafood" },
      { type: "eat", name: "Trattoria Lo Romaní", note: "Via Maiorca - spaghetti ai ricci if in season" },
      { type: "drink", name: "Bastioni Marco Polo", note: "Sunset aperitivo along the sea walls" },
    ],
    logistics: "ALFA bus runs from airport every hour until ~23:00",
    bookAhead: null,
    overnightAt: "Alghero",
  },
  {
    date: "May 24",
    weekday: "Sun",
    title: "Alghero to Olbia to Santa Teresa",
    tag: "Travel Day",
    tagColor: "terracotta",
    icon: "🚗",
    summary: "Morning exploring, scenic drive east, meet Carlo",
    anchor: [
      { time: "Morning", text: "Free in Alghero - the centro storico, the bastions, the port. The big optional excursion is Capo Caccia & Grotta di Nettuno (20 min drive): sea cliffs, 654 steps carved into rock, caves at sea level. Allow ~2 hrs." },
      { time: "Afternoon", text: "Drive to Olbia (~1h45 via SS291/SS729). Optional stop: Basilica di Saccargia near Codrongianos - striking Romanesque church alone in open countryside, 15 min off the highway." },
      { time: "Evening", text: "Arrive Olbia with a few hours before Carlo lands (~22:30–23:00). Walk Corso Umberto, eat. Pick up Carlo, drive 1h north to Santa Teresa. Arrive ~midnight." },
    ],
    spots: [
      { type: "coffee", name: "Bar Mirò", note: "Piazza Civica - cornetto & cappuccino" },
      { type: "eat", name: "Ristorante Gallura", note: "Corso Umberto, Olbia - classic Sardinian" },
      { type: "drink", name: "Piazza Matteotti bars", note: "Olbia - aperitivo while waiting" },
    ],
    logistics: "Pick up rental car Alghero morning. Alghero to Olbia ~1h45. Olbia to Santa Teresa ~1h.",
    bookAhead: "Bus: Alghero Airport to city centre, then intercity bus or shuttle to Olbia",
    overnightAt: "Santa Teresa Gallura",
  },
  {
    date: "May 25",
    weekday: "Mon",
    title: "Capo Testa + Pick Up Elli",
    tag: "With Carlo",
    tagColor: "teal",
    icon: "🏖️",
    summary: "Lunar landscapes at your doorstep, then south for Elli",
    anchor: [
      { time: "Morning", text: "Capo Testa - 10 min from the house. One of the most extraordinary headlands in the Mediterranean. Granite formations, hidden coves, Corsica visible across the strait. Walk into Valle della Luna for Cala Spinosa (~20 min on foot). Bring snorkel gear." },
      { time: "Afternoon", text: "Leave ~13:30 for Olbia. Pick up Elli at 15:25. Return via Porto Cervo - the marina is worth seeing once, late May is still quiet." },
      { time: "Evening", text: "First evening together as a group back in Santa Teresa." },
    ],
    spots: [
      { type: "eat", name: "La Casetta di Iris", note: "Deli-style, try zuppa gallurese" },
      { type: "eat", name: "Panineria Dal Re", note: "Giant Sardinian sandwiches - good on the go" },
      { type: "eat", name: "PeMa", note: "Best creative Sardinian in town - book ahead" },
      { type: "eat", name: "Millo Ristorante", note: "Solid dinner alternative" },
      { type: "drink", name: "Groove Cocktail Bar", note: "Via XX Settembre" },
    ],
    logistics: "Santa Teresa to Olbia Airport: 1h. Porto Cervo detour adds ~25 min.",
    bookAhead: "PeMa restaurant for dinner",
    overnightAt: "Santa Teresa Gallura",
  },
  {
    date: "May 26",
    weekday: "Tue",
    title: "Porto Pollo + La Maddalena",
    tag: "Full Group",
    tagColor: "terracotta",
    icon: "🪁",
    summary: "Kitesurfing in the morning, island-hopping in the afternoon",
    anchor: [
      { time: "Morning", text: "Drive 40 min to Porto Pollo near Palau. One of Europe's top kite & windsurf spots - venturi effect delivers 15–25 knots most days. Wind Porto Pollo and MB Pro Center for gear. If no wind: Porto Liscia/Sciumara catches swell." },
      { time: "Afternoon", text: "Palau to La Maddalena ferry (every 15–30 min, ~20 min, ~€16 foot / ~€40 with car). Drive to Caprera for Cala Coticcio (\"Tahiti beach\" - 20 min walk in). Or half-day boat tour to Spargi, Budelli & Santa Maria (~€40 pp)." },
      { time: "Evening", text: "Back in Santa Teresa for sunset and dinner." },
    ],
    spots: [
      { type: "eat", name: "Da Thomas", note: "Palau - fresh fish, spaghetti alla bottarga" },
      { type: "eat", name: "Il Capriccio", note: "Sea-view terrace near Porto Pollo" },
      { type: "eat", name: "Ristorante Azzurra", note: "Santa Teresa - local seafood, unpretentious" },
      { type: "drink", name: "Bar Stazione", note: "Sunset aperitivo" },
    ],
    logistics: "Santa Teresa to Porto Pollo: 40 min. Wind builds midday - mornings flatter, afternoons stronger.",
    bookAhead: "Kite gear/lesson - book day before by phone/WhatsApp",
    overnightAt: "Santa Teresa Gallura",
  },
  {
    date: "May 27",
    weekday: "Wed",
    title: "Bonifacio, Corsica",
    tag: "Day Trip",
    tagColor: "teal",
    icon: "⛴️",
    summary: "50-minute ferry to the Mediterranean's most dramatic cliff city",
    anchor: [
      { time: "Morning", text: "Ferry from Santa Teresa port (5 min from house) to Bonifacio. Foot passengers only. Explore the Haute Ville citadel on white limestone cliffs. Walk the Escalier du Roi d'Aragon - 187 steps carved into the cliff face." },
      { time: "Afternoon", text: "Boat tour to Îles Lavezzi (~€35 pp, 30 min by zodiac) - granite archipelago, crystal water. Or cliffs & sea caves tour (1.5 hrs) to see Bonifacio from below." },
      { time: "Evening", text: "Last ferry back late afternoon. Dinner in Santa Teresa." },
    ],
    spots: [
      { type: "eat", name: "Le Voilier", note: "Bonifacio marina - fish, Corsican wines" },
      { type: "eat", name: "Cantina Doria", note: "Upper town - rustic Corsican charcuterie" },
      { type: "eat", name: "L'Antica Isola", note: "Back in Santa Teresa for dinner" },
      { type: "drink", name: "Marina bars", note: "Try Patrimonio rosé" },
    ],
    logistics: "Ferry: ~50 min, €35–50 pp round trip. First ~09:00, last return ~18:30–19:00. Bring passport/ID.",
    bookAhead: "Ferry tickets - mobylines.com or ichnusalines.com",
    overnightAt: "Santa Teresa Gallura",
  },
  {
    date: "May 28",
    weekday: "Thu",
    title: "Interior & Wine Country",
    tag: "Last Full Day",
    tagColor: "terracotta",
    icon: "🍷",
    summary: "Go inland - mountains, villages, agriturismo feast, wine",
    anchor: [
      { time: "Morning", text: "Two directions:\n\nOption A - Castelsardo (1h15 west): Medieval hill town on a rock above the sea, castle, basket-weaving. Return via Isola Rossa.\n\nOption B - Tempio Pausania + Aggius (45 min south): Granite mountain towns, cooler air. Aggius is spectacular and nearly unknown. Interior \"Valle della Luna\" nearby." },
      { time: "Afternoon", text: "Agriturismo lunch if going Option B - porceddu, sheep cheese, wine, mirto. Stop at Cantina Surrau on return (between Arzachena & Porto Cervo) - Vermentino DOCG tastings." },
      { time: "Evening", text: "Last evening in Santa Teresa. Pack tonight - tomorrow is 08:00 departure." },
    ],
    spots: [
      { type: "eat", name: "Agriturismo Il Muto di Gallura", note: "Near Aggius - fixed menu ~€40, call ahead" },
      { type: "eat", name: "Agriturismo Li Nalboni", note: "Alternative near Santa Teresa" },
      { type: "eat", name: "Il Cormorano", note: "Castelsardo - fish ravioli, local catch" },
      { type: "drink", name: "Cantina Surrau", note: "Free Vermentino tastings" },
      { type: "eat", name: "Goblet Wine Bar", note: "Santa Teresa - excellent wine, last dinner" },
    ],
    logistics: "Cantina Surrau closes ~18:30 - time it on the way back.",
    bookAhead: "Agriturismo - call the day before",
    overnightAt: "Santa Teresa Gallura",
  },
  {
    date: "May 29",
    weekday: "Fri",
    title: "Departure - Olbia",
    tag: "Travel Day",
    tagColor: "terracotta",
    icon: "✈️",
    summary: "Early morning, straight to airport, no detours",
    anchor: [
      { time: "Morning", text: "Flight at 11:05 from Olbia. Check-in closes ~09:35. Drive is 1 hour.\n\nLeave Santa Teresa by 08:00. No beach stops, no detours. Return car at Olbia Airport by ~09:15.\n\nPack the night before. Coffee to go from the first bar open in town." },
    ],
    spots: [],
    logistics: "Leave by 08:00. Drive 1h. Return car. Check in by 09:30.",
    bookAhead: null,
    overnightAt: null,
  },
];

const DONT_MISS = [
  { icon: "🤿", cat: "wind", title: "Cala Spinosa at golden hour", text: "Almost no one on Capo Testa late afternoon in May. Bring a mask - the snorkeling is pristine." },
  { icon: "🍷", cat: "food", title: "Vermentino at a cantina", text: "Sardinia's only DOCG wine, world-class within 30km of your base. Surrau, Gallura, or Capichera." },
  { icon: "🐷", cat: "food", title: "Stazzu agriturismo feast", text: "Fixed menu, porceddu, sheep cheese, wine, mirto - all included. Always too much food." },
  { icon: "🪁", cat: "wind", title: "Porto Pollo secret window", text: "Late May has the wind without the summer kite-school crowds. Locals call this the best time." },
  { icon: "🪨", cat: "culture", title: "Aggius - the other Valle della Luna", text: "Boulder-strewn inland valley. Almost no foreign tourists. Pair with a village lunch." },
  { icon: "🌿", cat: "food", title: "Mirto bianco", text: "Everyone drinks red mirto. The white (from leaves, not berries) is drier, rarer, better." },
  { icon: "🌙", cat: "culture", title: "Nightlife in late May", text: "Porto Cervo clubs open mid-June. Phi Beach (Baja Sardinia) may be open - check @phibeach." },
  { icon: "🌊", cat: "wind", title: "Wind sport conditions", text: "Wind builds midday. Mornings flatter for beginners. Pack 3/2 wetsuit, water ~17–18°C." },
];

const CHECKLIST = [
  { text: "Bus or shuttle: Alghero Airport to Olbia, May 24 - check ARST or FlixBus routes", urgent: true },
  { text: "Ferry tickets - Santa Teresa to Bonifacio, May 27", urgent: true },
  { text: "PeMa restaurant - dinner May 25", urgent: false },
  { text: "Agriturismo Il Muto di Gallura - lunch May 28, call day before", urgent: false },
  { text: "Kite gear / lesson Porto Pollo - May 26, book day before", urgent: false },
  { text: "Phi Beach - check @phibeach for late May opening", urgent: false },
];

const spotIcons = { eat: "🍽️", drink: "🥂", coffee: "☕" };

/* ───────────────────── DARK THEME ───────────────────── */
const C = {
  bg: "#0d1117",
  bgGrad: "linear-gradient(175deg, #1a1f2e 0%, #12161f 40%, #0d1117 100%)",
  card: "rgba(255,255,255,0.05)",
  cardBorder: "rgba(255,255,255,0.07)",
  cardHover: "rgba(255,255,255,0.08)",
  primary: "#EEECEA",
  secondary: "rgba(255,255,255,0.55)",
  tertiary: "rgba(255,255,255,0.32)",
  teal: "#5CB8B2",
  terracotta: "#D4845A",
  amber: "#E8C07A",
  sand: "rgba(255,255,255,0.1)",
  success: "#7EBF8E",
  bookBg: "rgba(232,192,122,0.06)",
  bookBorder: "rgba(232,192,122,0.18)",
  heroGrad: "linear-gradient(180deg, rgba(107,140,174,0.1) 0%, transparent 100%)",
  bottomNav: "rgba(13,17,23,0.88)",
};

const catColors = {
  wind: C.teal,
  food: C.terracotta,
  culture: C.amber,
};

/* ───────────────────── COMPONENTS ───────────────────── */

function DayCard({ day, isOpen, onToggle }) {
  const borderColor = day.tagColor === "teal" ? C.teal : C.terracotta;
  const tagBg = day.tagColor === "teal" ? "rgba(92,184,178,0.1)" : "rgba(212,132,90,0.1)";

  return (
    <div style={{
      marginBottom: 12, borderRadius: 12,
      background: C.card, border: `1px solid ${C.cardBorder}`,
      borderLeft: `2px solid ${borderColor}`,
      overflow: "hidden", transition: "all 0.3s ease",
    }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%", padding: "16px 16px",
          display: "flex", alignItems: "flex-start", gap: 12,
          background: "none", border: "none", cursor: "pointer",
          textAlign: "left", color: "inherit", fontFamily: "inherit",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 3 }}>
            <span style={{ fontSize: 11, letterSpacing: "0.06em", color: C.tertiary, fontWeight: 500 }}>
              {day.weekday}
            </span>
            <span style={{
              fontSize: 10, letterSpacing: "0.05em", textTransform: "uppercase",
              padding: "1px 8px", borderRadius: 20,
              background: tagBg, color: borderColor, fontWeight: 600,
            }}>
              {day.tag}
            </span>
          </div>
          <div style={{
            fontFamily: "'Fraunces', Georgia, serif", fontSize: 22, fontWeight: 700,
            color: C.primary, lineHeight: 1.2, marginBottom: 3,
          }}>
            {day.title}
          </div>
          <div style={{ fontSize: 14, color: C.secondary, lineHeight: 1.4 }}>
            {day.summary}
          </div>
        </div>
        <span style={{
          fontSize: 16, color: C.tertiary,
          transition: "transform 0.3s ease",
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          flexShrink: 0, marginTop: 8, opacity: 0.5,
        }}>
          ▾
        </span>
      </button>

      <div style={{
        maxHeight: isOpen ? 2000 : 0,
        opacity: isOpen ? 1 : 0,
        overflow: "hidden",
        transition: "max-height 0.3s ease, opacity 0.2s ease",
      }}>
        <div style={{ padding: "0 16px 20px 16px" }}>
          {/* Timeline */}
          <div style={{ position: "relative", paddingLeft: 24, marginBottom: day.spots.length > 0 ? 20 : 0 }}>
            <div style={{
              position: "absolute", left: 5, top: 8, bottom: 8, width: 1,
              borderLeft: `1px dashed ${C.sand}`,
            }} />
            {day.anchor.map((block, bi) => (
              <div key={bi} style={{ position: "relative", marginBottom: bi < day.anchor.length - 1 ? 18 : 0 }}>
                <div style={{
                  position: "absolute", left: -24, top: 6, width: 11, height: 11,
                  borderRadius: "50%", border: `2px solid ${borderColor}`,
                  background: bi === 0 ? borderColor : "transparent",
                }} />
                <div style={{
                  fontSize: 11, fontWeight: 600, letterSpacing: "0.06em",
                  textTransform: "uppercase", color: borderColor, marginBottom: 4,
                }}>
                  {block.time}
                </div>
                <div style={{
                  fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.72)",
                  whiteSpace: "pre-line", fontWeight: 300,
                }}>
                  {block.text}
                </div>
              </div>
            ))}
          </div>

          {/* Food & Drink pills */}
          {day.spots.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{
                fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase",
                color: C.tertiary, marginBottom: 8, fontWeight: 600,
              }}>
                Places to eat & drink
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {day.spots.map((s, i) => (
                  <a
                    key={i}
                    title={s.note}
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.name + ' Sardinia')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="spot-link"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 5,
                      fontSize: 12, padding: "5px 10px", borderRadius: 20,
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: C.primary, fontWeight: 400, cursor: "pointer",
                      textDecoration: "none",
                    }}
                  >
                    <span style={{ fontSize: 13 }}>{spotIcons[s.type]}</span>
                    <span style={{ fontWeight: 500 }}>{s.name}</span>
                    <span style={{ color: C.tertiary, fontSize: 11 }}>— {s.note}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Logistics */}
          {day.logistics && (
            <div style={{
              fontSize: 12, color: C.secondary,
              background: "rgba(255,255,255,0.03)", borderRadius: 8,
              padding: "8px 12px", marginBottom: day.bookAhead ? 8 : 0, lineHeight: 1.5,
            }}>
              🚗 {day.logistics}
            </div>
          )}

          {/* Book ahead */}
          {day.bookAhead && (
            <div style={{
              fontSize: 12, color: C.amber,
              background: C.bookBg, borderRadius: 8,
              padding: "8px 12px", border: `1px solid ${C.bookBorder}`, lineHeight: 1.5,
            }}>
              📌 {day.bookAhead}
            </div>
          )}

          {day.overnightAt && (
            <div style={{
              fontSize: 11, color: C.tertiary, marginTop: 10,
              textTransform: "uppercase", letterSpacing: "0.08em",
            }}>
              🛏️ Night in {day.overnightAt}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DontMissCard({ item }) {
  const color = catColors[item.cat] || C.teal;
  return (
    <div style={{
      padding: "16px",
      background: C.card,
      borderRadius: 12,
      borderTop: `2px solid ${color}`,
      border: `1px solid ${C.cardBorder}`,
      borderTopColor: color,
      display: "flex", flexDirection: "column", gap: 6,
    }}>
      <div style={{ fontSize: 22 }}>{item.icon}</div>
      <div style={{
        fontFamily: "'Fraunces', Georgia, serif",
        fontSize: 15, fontWeight: 700, color: C.primary, lineHeight: 1.3,
      }}>
        {item.title}
      </div>
      <div style={{ fontSize: 13, color: C.secondary, lineHeight: 1.55 }}>
        {item.text}
      </div>
    </div>
  );
}

function CheckItem({ item, checked, onToggle }) {
  return (
    <button
      onClick={onToggle}
      style={{
        display: "flex", gap: 12, alignItems: "center",
        width: "100%", padding: "14px 16px",
        background: C.card, borderRadius: 12,
        marginBottom: 8, cursor: "pointer", textAlign: "left",
        color: "inherit", fontFamily: "inherit",
        border: checked ? `1px solid rgba(126,191,142,0.2)` : `1px solid ${C.cardBorder}`,
        transition: "all 0.2s ease",
      }}
    >
      <div style={{
        width: 22, height: 22, borderRadius: 6, flexShrink: 0,
        border: checked ? `2px solid ${C.success}` : "2px solid rgba(255,255,255,0.15)",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: checked ? "rgba(126,191,142,0.1)" : "transparent",
        transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}>
        {checked && <span style={{ color: C.success, fontSize: 13, fontWeight: 700 }}>✓</span>}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: 14, fontWeight: 400, lineHeight: 1.45,
          color: checked ? C.tertiary : C.primary,
          textDecoration: checked ? "line-through" : "none",
          transition: "all 0.2s ease",
        }}>
          {item.text}
        </div>
        {item.urgent && !checked && (
          <span style={{
            display: "inline-block", marginTop: 3,
            fontSize: 10, fontWeight: 600, letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: C.amber, background: C.bookBg,
            padding: "1px 6px", borderRadius: 4,
            border: `1px solid ${C.bookBorder}`,
          }}>
            Book now
          </span>
        )}
      </div>
    </button>
  );
}

/* ───────────────────── MAIN ───────────────────── */

export default function SardiniaItinerary() {
  const [openDay, setOpenDay] = useState(null);
  const [activeTab, setActiveTab] = useState("itinerary");
  const [checkedItems, setCheckedItems] = useState({});
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 400);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isDesktop = width >= 768;
  const toggleCheck = (i) => setCheckedItems((prev) => ({ ...prev, [i]: !prev[i] }));

  const tabs = [
    { key: "itinerary", label: "Day by Day", icon: "📅" },
    { key: "essentials", label: "Don't Miss", icon: "⭐" },
    { key: "checklist", label: "To Book", icon: "📌" },
  ];

  const renderContent = () => {
    if (activeTab === "itinerary") {
      return (
        <div style={{ animation: "fadeIn 0.2s ease" }}>
          {DAYS.map((day, i) => (
            <DayCard key={i} day={day} isOpen={openDay === i}
              onToggle={() => setOpenDay(openDay === i ? null : i)} />
          ))}
        </div>
      );
    }
    if (activeTab === "essentials") {
      return (
        <div style={{ animation: "fadeIn 0.2s ease" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
          }}>
            {DONT_MISS.map((item, i) => (
              <DontMissCard key={i} item={item} />
            ))}
          </div>
        </div>
      );
    }
    if (activeTab === "checklist") {
      return (
        <div style={{ animation: "fadeIn 0.2s ease" }}>
          {CHECKLIST.map((item, i) => (
            <CheckItem key={i} item={item}
              checked={!!checkedItems[i]}
              onToggle={() => toggleCheck(i)} />
          ))}
        </div>
      );
    }
  };

  const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700;9..144,800&family=Inter:wght@300;400;500;600;700&display=swap');
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    * { box-sizing: border-box; -webkit-font-smoothing: antialiased; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
    .spot-link:hover { text-decoration: underline !important; border-color: rgba(255,255,255,0.18) !important; }
  `;

  if (isDesktop) {
    return (
      <div style={{
        minHeight: "100vh", background: C.bgGrad,
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
        color: C.primary, display: "flex", justifyContent: "center",
      }}>
        <style>{globalStyles}</style>

        <div style={{ display: "flex", maxWidth: 1060, width: "100%", minHeight: "100vh" }}>
          {/* Sidebar */}
          <div style={{
            width: 260, flexShrink: 0, padding: "48px 28px",
            position: "sticky", top: 0, height: "100vh",
            borderRight: `1px solid rgba(255,255,255,0.06)`,
            display: "flex", flexDirection: "column",
          }}>
            <div style={{
              fontFamily: "'Fraunces', Georgia, serif", fontSize: 12,
              letterSpacing: "0.15em", textTransform: "uppercase",
              color: C.tertiary, marginBottom: 8, fontWeight: 500,
            }}>
              May 23 – 29, 2026
            </div>
            <h1 style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: 32, fontWeight: 800, lineHeight: 1.1,
              margin: 0, color: C.primary, letterSpacing: "-0.02em",
            }}>
              Sardinia
            </h1>
            <div style={{ fontSize: 13, color: C.secondary, marginTop: 8, lineHeight: 1.5 }}>
              Santa Teresa · Gallura · Corsica
            </div>

            {/* Avatars */}
            <div style={{ display: "flex", marginTop: 20 }}>
              {["DD", "CR", "EC"].map((initial, i) => (
                <div key={i} style={{
                  width: 30, height: 30, borderRadius: "50%",
                  background: [C.teal, C.terracotta, C.amber][i],
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontWeight: 600, color: "#fff",
                  border: "2px solid #12161f",
                  marginLeft: i > 0 ? -6 : 0, zIndex: 3 - i,
                }}>
                  {initial}
                </div>
              ))}
            </div>

            <div style={{
              width: "100%", height: 1,
              background: "rgba(255,255,255,0.06)", margin: "28px 0",
            }} />

            {/* Tab nav */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "10px 12px", borderRadius: 8,
                    background: activeTab === tab.key ? "rgba(255,255,255,0.06)" : "transparent",
                    border: "none", cursor: "pointer",
                    fontSize: 14, fontWeight: activeTab === tab.key ? 600 : 400,
                    color: activeTab === tab.key ? C.primary : C.secondary,
                    fontFamily: "inherit", textAlign: "left",
                    transition: "all 0.15s ease",
                  }}
                >
                  <span style={{ fontSize: 15 }}>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div style={{
            flex: 1, padding: "48px 36px 80px",
            maxWidth: 680, overflowY: "auto",
          }}>
            {renderContent()}
          </div>
        </div>
      </div>
    );
  }

  // ─── Mobile ───
  return (
    <div style={{
      minHeight: "100vh", background: C.bgGrad,
      fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
      color: C.primary, paddingBottom: 72,
    }}>
      <style>{globalStyles}</style>

      {/* Hero */}
      <div style={{ padding: "44px 20px 24px", background: C.heroGrad }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: 12,
        }}>
          <div style={{
            fontFamily: "'Fraunces', Georgia, serif", fontSize: 11,
            letterSpacing: "0.15em", textTransform: "uppercase",
            color: C.tertiary, fontWeight: 500,
          }}>
            May 23 – 29, 2026
          </div>
          <div style={{ display: "flex" }}>
            {["DD", "CR", "EC"].map((initial, i) => (
              <div key={i} style={{
                width: 26, height: 26, borderRadius: "50%",
                background: [C.teal, C.terracotta, C.amber][i],
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 9, fontWeight: 600, color: "#fff",
                border: "2px solid #1a1f2e",
                marginLeft: i > 0 ? -6 : 0, zIndex: 3 - i,
              }}>
                {initial}
              </div>
            ))}
          </div>
        </div>
        <h1 style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontSize: 36, fontWeight: 800, lineHeight: 1.05,
          margin: 0, color: C.primary, letterSpacing: "-0.02em",
        }}>
          Sardinia
        </h1>
        <div style={{ fontSize: 13, color: C.secondary, marginTop: 8, lineHeight: 1.5 }}>
          Santa Teresa Gallura · Gallura · Corsica
        </div>
        <div style={{
          width: "100%", height: 1,
          background: "rgba(255,255,255,0.06)", marginTop: 20,
        }} />
      </div>

      {/* Content */}
      <div style={{ padding: "12px 16px 24px" }}>
        {renderContent()}
      </div>

      {/* Bottom nav */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: C.bottomNav,
        backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex", justifyContent: "space-around",
        padding: "8px 0 max(8px, env(safe-area-inset-bottom))",
        zIndex: 100,
      }}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              gap: 2, padding: "6px 20px",
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "inherit",
              color: activeTab === tab.key ? C.primary : C.tertiary,
              transition: "color 0.15s ease",
            }}
          >
            <span style={{ fontSize: 18 }}>{tab.icon}</span>
            <span style={{
              fontSize: 10, fontWeight: activeTab === tab.key ? 600 : 400,
              letterSpacing: "0.04em",
            }}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}