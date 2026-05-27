import { useState } from "react";

/* ─────────────────────────────────────────────────────────────
   KHMER LUNAR CALENDAR — React Native Screen Library v2
   Aesthetic: Warm Night · Lotus Gold · Khmer Heritage
───────────────────────────────────────────────────────────── */

const K = {
  night:   "#0D0A0F",
  deep:    "#120E16",
  surface: "#1A1520",
  card:    "#221C2A",
  border:  "#2E2538",
  muted:   "#3D3349",
  text:    "#F5EDD8",
  sub:     "#9B8E7A",
  dim:     "#5A5060",
  gold:    "#C8973A",
  goldL:   "#E8B84B",
  crimson: "#C0392B",
  lotus:   "#E8768A",
  jade:    "#4DAF7C",
  moon:    "#F2E8C6",
  sky:     "#7BA7BC",
};

/* ── Khmer month names ── */
const KH_MONTHS = ["មករា","កុម្ភៈ","មីនា","មេសា","ឧសភា","មិថុនា","កក្កដា","សីហា","កញ្ញា","តុលា","វិច្ឆិកា","ធ្នូ"];
const KH_DAYS   = ["អា","ច","អ","ព","ព្រ","សុ","ស"];
const EN_DAYS   = ["Su","Mo","Tu","We","Th","Fr","Sa"];
const KH_LUNAR_MONTHS = ["មាឃ","ផល្គុន","ចេត្រ","ពិសាខ","ជេស្ឋ","អាសាឍ","ស្រាពណ៍","ភទ្របទ","អស្សុជ","កត្តិក","មិគសិរ","បុស្ស"];

/* ── Moon phase glyphs ── */
const MOON = { new:"🌑", wax1:"🌒", half:"🌓", wax2:"🌔", full:"🌕", wan1:"🌖", halfW:"🌗", wan2:"🌘" };

/* ─── SHARED PRIMITIVES ───────────────────────────────────── */
const Txt = ({ s=11, w=400, c=K.text, style={}, children }) => (
  <div style={{ fontSize:s, fontWeight:w, color:c, fontFamily:"'Battambang', serif", lineHeight:1.5, ...style }}>{children}</div>
);
const Mono = ({ s=9, c=K.sub, style={}, children }) => (
  <div style={{ fontSize:s, color:c, fontFamily:"'DM Mono', monospace", lineHeight:1.4, ...style }}>{children}</div>
);
const KhmerTxt = ({ s=11, w=400, c=K.text, style={}, children }) => (
  <div style={{ fontSize:s, fontWeight:w, color:c, fontFamily:"'Noto Serif Khmer', serif", lineHeight:1.8, ...style }}>{children}</div>
);

const GoldLine = ({ accent=K.gold }) => (
  <div style={{ height:1, background:`linear-gradient(90deg, ${accent}60, transparent)`, margin:"8px 0" }} />
);

const Btn = ({ label, accent=K.gold, outline, full, s=11 }) => (
  <div style={{
    padding:"9px 18px", borderRadius:10, textAlign:"center",
    background: outline ? "transparent" : `linear-gradient(135deg, ${accent}, ${accent}CC)`,
    border: outline ? `1px solid ${accent}70` : "none",
    color: outline ? accent : K.night,
    fontWeight:700, fontSize:s, fontFamily:"'Battambang', serif",
    width: full ? "100%" : "auto",
    boxShadow: outline ? "none" : `0 4px 16px ${accent}40`,
  }}>{label}</div>
);

const Tag = ({ label, accent=K.gold, filled }) => (
  <span style={{
    padding:"3px 9px", borderRadius:20, fontSize:9, fontWeight:600,
    background: filled ? accent : `${accent}18`,
    color: filled ? K.night : accent,
    border:`1px solid ${accent}40`,
    fontFamily:"'DM Mono', monospace", whiteSpace:"nowrap",
  }}>{label}</span>
);

const Avatar = ({ size=30, seed=0, img }) => {
  const colors = [K.gold, K.crimson, K.jade, K.lotus, K.sky, K.goldL];
  const initials = ["ស","ច","ម","ន"," រ","ដ"];
  return (
    <div style={{
      width:size, height:size, borderRadius:"50%", flexShrink:0,
      background:`radial-gradient(circle at 30% 30%, ${colors[seed%6]}EE, ${colors[seed%6]}88)`,
      display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:size*0.38, fontFamily:"'Noto Serif Khmer', serif",
      color:K.night, fontWeight:700,
      border:`1.5px solid ${colors[seed%6]}50`,
      boxShadow:`0 2px 8px ${colors[seed%6]}30`,
    }}>{initials[seed%6]}</div>
  );
};

const InputBox = ({ label, val, type="text", accent=K.gold }) => (
  <div style={{ marginBottom:10 }}>
    <Mono s={8} c={K.dim} style={{ marginBottom:4, letterSpacing:"0.08em" }}>{label}</Mono>
    <div style={{
      padding:"9px 12px", borderRadius:10,
      border:`1px solid ${accent}40`,
      background:K.surface,
      fontSize:11, color: type==="password" ? K.sub : K.text,
      fontFamily:"'Battambang', serif",
      display:"flex", alignItems:"center", justifyContent:"space-between",
    }}>
      <span>{val}</span>
      {type==="password" && <span style={{fontSize:10, color:K.dim}}>👁</span>}
    </div>
  </div>
);

const TabBar = ({ active }) => {
  const tabs = [["🏠","ទំព័រដើម","Home"],["📅","ប្រតិទិន","Calendar"],["🔍","រកមើល","Explore"],["👤","គណនី","Profile"]];
  return (
    <div style={{
      position:"absolute", bottom:0, left:0, right:0,
      background:K.deep,
      borderTop:`1px solid ${K.border}`,
      display:"flex", padding:"6px 0 18px",
    }}>
      {tabs.map(([ic,kh,en]) => {
        const isActive = en===active || kh===active;
        return (
          <div key={en} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:2, opacity:isActive?1:0.35 }}>
            <span style={{ fontSize:15 }}>{ic}</span>
            <KhmerTxt s={7} c={isActive?K.gold:K.sub}>{kh}</KhmerTxt>
            {isActive && <div style={{ width:16, height:2, background:K.gold, borderRadius:1 }} />}
          </div>
        );
      })}
    </div>
  );
};

const StatusBar = () => (
  <div style={{
    position:"absolute", top:6, left:16, right:16,
    display:"flex", justifyContent:"space-between", alignItems:"center", zIndex:9,
  }}>
    <Mono s={8} c={`${K.text}60`}>9:41</Mono>
    <Mono s={8} c={`${K.text}60`}>●●● ▲ 🔋</Mono>
  </div>
);

/* ─── PHONE FRAME ─────────────────────────────────────────── */
function Phone({ accent=K.gold, label, stack, children }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:10 }}>
      <div style={{
        width:222, height:444,
        background:K.night,
        borderRadius:38,
        border:`1.5px solid ${accent}60`,
        boxShadow:`0 0 0 1px ${K.border}, 0 8px 40px ${accent}20, 0 2px 12px #00000090`,
        overflow:"hidden", position:"relative", flexShrink:0,
      }}>
        {/* Notch */}
        <div style={{
          position:"absolute", top:0, left:"50%", transform:"translateX(-50%)",
          width:80, height:22, background:K.night,
          borderBottomLeftRadius:14, borderBottomRightRadius:14, zIndex:10,
        }}/>
        <StatusBar />
        <div style={{ position:"absolute", inset:0, overflow:"hidden", borderRadius:37 }}>
          {children}
        </div>
        {/* Home bar */}
        <div style={{
          position:"absolute", bottom:6, left:"50%", transform:"translateX(-50%)",
          width:56, height:3, background:`${K.text}25`, borderRadius:2, zIndex:10,
        }}/>
      </div>
      <div style={{ textAlign:"center" }}>
        <Mono s={10} c={accent} style={{ fontWeight:700, letterSpacing:"0.05em" }}>{label}</Mono>
        <Mono s={9} c={K.dim} style={{ marginTop:2 }}>{stack}</Mono>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   AUTH SCREENS
══════════════════════════════════════════════════════════ */

function SplashScreen() {
  return (
    <div style={{
      height:"100%", background:`radial-gradient(ellipse at 50% 40%, #2A1F3A 0%, ${K.night} 70%)`,
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:0,
    }}>
      {/* Decorative ring */}
      <div style={{
        width:110, height:110, borderRadius:"50%",
        border:`1px solid ${K.gold}30`,
        display:"flex", alignItems:"center", justifyContent:"center",
        marginBottom:6, position:"relative",
      }}>
        <div style={{
          width:88, height:88, borderRadius:"50%",
          border:`1px solid ${K.gold}60`,
          display:"flex", alignItems:"center", justifyContent:"center",
          background:`radial-gradient(circle, ${K.gold}18, transparent)`,
        }}>
          <span style={{ fontSize:38 }}>🌙</span>
        </div>
        {/* Orbiting dot */}
        <div style={{
          position:"absolute", top:8, right:14,
          width:8, height:8, borderRadius:"50%",
          background:K.gold, boxShadow:`0 0 10px ${K.gold}`,
        }}/>
      </div>
      <KhmerTxt s={22} w={700} c={K.moon} style={{ letterSpacing:"0.04em", marginBottom:4 }}>ប្រតិទិនខ្មែរ</KhmerTxt>
      <Mono s={9} c={K.gold} style={{ letterSpacing:"0.14em", marginBottom:24 }}>KHMER LUNAR CALENDAR</Mono>
      {/* Progress */}
      <div style={{ width:80, height:2, background:K.surface, borderRadius:2, overflow:"hidden" }}>
        <div style={{ width:"60%", height:"100%", background:`linear-gradient(90deg, ${K.gold}, ${K.goldL})`, borderRadius:2 }}/>
      </div>
      <Mono s={8} c={K.dim} style={{ marginTop:8 }}>កំពុងផ្ទុក…</Mono>
      {/* Corner ornaments */}
      <div style={{ position:"absolute", top:28, left:12, fontSize:10, color:`${K.gold}30` }}>❁</div>
      <div style={{ position:"absolute", top:28, right:12, fontSize:10, color:`${K.gold}30` }}>❁</div>
      <div style={{ position:"absolute", bottom:28, left:12, fontSize:10, color:`${K.gold}30` }}>❁</div>
      <div style={{ position:"absolute", bottom:28, right:12, fontSize:10, color:`${K.gold}30` }}>❁</div>
    </div>
  );
}

function OnboardingScreen() {
  const slides = [
    { emoji:"🌙", kh:"ប្រតិទិនចន្ទគតិ", en:"Khmer Lunar Calendar", desc:"Convert any date to the traditional Khmer lunar calendar instantly." },
  ];
  return (
    <div style={{ height:"100%", background:K.night, display:"flex", flexDirection:"column" }}>
      {/* Decorative header band */}
      <div style={{ height:4, background:`linear-gradient(90deg, ${K.crimson}, ${K.gold}, ${K.lotus})` }}/>
      <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"30px 20px 0" }}>
        <div style={{
          width:108, height:108, borderRadius:28,
          background:`radial-gradient(135deg, ${K.gold}25, ${K.crimson}10)`,
          border:`1px solid ${K.gold}40`,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:50, marginBottom:20,
          boxShadow:`0 8px 32px ${K.gold}20`,
        }}>🌕</div>
        <KhmerTxt s={16} w={700} c={K.moon} style={{ textAlign:"center", marginBottom:6 }}>ប្រតិទិនចន្ទគតិ</KhmerTxt>
        <Mono s={10} c={K.gold} style={{ marginBottom:10, letterSpacing:"0.06em" }}>KHMER LUNAR CALENDAR</Mono>
        <Txt s={10} c={K.sub} style={{ textAlign:"center", lineHeight:1.7, paddingHorizontal:10 }}>
          Track Khmer lunar dates, auspicious days, moon phases, and traditional holidays — all in one place.
        </Txt>
      </div>
      <div style={{ padding:"16px 20px 32px" }}>
        <div style={{ display:"flex", justifyContent:"center", gap:6, marginBottom:16 }}>
          {[1,2,3].map(i=><div key={i} style={{ width:i===1?24:6, height:6, borderRadius:3, background:i===1?K.gold:K.muted }}/>)}
        </div>
        <Btn label="បន្ត →" accent={K.gold} full />
        <div style={{ textAlign:"center", marginTop:10 }}>
          <Mono s={9} c={K.dim}>រំលង</Mono>
        </div>
      </div>
    </div>
  );
}

function LoginScreen() {
  return (
    <div style={{ height:"100%", background:K.night, overflow:"hidden" }}>
      <div style={{ height:4, background:`linear-gradient(90deg, ${K.crimson}, ${K.gold})` }}/>
      <div style={{ padding:"30px 18px 0" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
          <span style={{ fontSize:24 }}>🌙</span>
          <div>
            <KhmerTxt s={16} w={700} c={K.moon}>ចូលគណនី</KhmerTxt>
            <Mono s={9} c={K.dim}>Sign in to continue</Mono>
          </div>
        </div>
        <InputBox label="អ៊ីមែល / EMAIL" val="user@example.com" accent={K.gold} />
        <InputBox label="ពាក្យសម្ងាត់ / PASSWORD" val="••••••••••" type="password" accent={K.gold} />
        <div style={{ textAlign:"right", marginBottom:16 }}>
          <Mono s={9} c={K.gold}>ភ្លេចពាក្យសម្ងាត់?</Mono>
        </div>
        <Btn label="ចូល" accent={K.gold} full />
        <div style={{ display:"flex", alignItems:"center", gap:8, margin:"14px 0" }}>
          <div style={{ flex:1, height:1, background:K.border }}/>
          <Mono s={9} c={K.dim}>ឬ</Mono>
          <div style={{ flex:1, height:1, background:K.border }}/>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          {[["G","Google"],["🍎","Apple"],["𝕏","Twitter"]].map(([ic,lb])=>(
            <div key={lb} style={{ flex:1, padding:"7px 0", borderRadius:9, border:`1px solid ${K.border}`, background:K.surface, textAlign:"center", fontSize:13 }}>{ic}</div>
          ))}
        </div>
        <div style={{ textAlign:"center", marginTop:14 }}>
          <Mono s={9} c={K.sub}>មិនទាន់មានគណនី? <span style={{color:K.gold}}>ចុះឈ្មោះ</span></Mono>
        </div>
      </div>
    </div>
  );
}

function RegisterScreen() {
  return (
    <div style={{ height:"100%", background:K.night, overflow:"hidden" }}>
      <div style={{ height:4, background:`linear-gradient(90deg, ${K.gold}, ${K.lotus})` }}/>
      <div style={{ padding:"28px 18px 0" }}>
        <div style={{ marginBottom:16 }}>
          <KhmerTxt s={15} w={700} c={K.moon}>ចុះឈ្មោះ</KhmerTxt>
          <Mono s={9} c={K.dim}>Create your account</Mono>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <div style={{ flex:1 }}><InputBox label="នាមខ្លួន" val="ចន្ទ" accent={K.gold}/></div>
          <div style={{ flex:1 }}><InputBox label="នាមត្រកូល" val="ដារ៉ា" accent={K.gold}/></div>
        </div>
        <InputBox label="អ៊ីមែល" val="chanda@example.com" accent={K.gold}/>
        <InputBox label="ឈ្មោះអ្នកប្រើ" val="@chandada" accent={K.gold}/>
        <InputBox label="ពាក្យសម្ងាត់" val="••••••••" type="password" accent={K.gold}/>
        <div style={{ display:"flex", gap:8, alignItems:"flex-start", marginBottom:14 }}>
          <div style={{ width:13, height:13, borderRadius:3, border:`1.5px solid ${K.gold}`, marginTop:2, flexShrink:0, background:`${K.gold}20` }}/>
          <Mono s={8} c={K.sub} style={{ lineHeight:1.6 }}>យល់ព្រមតាម <span style={{color:K.gold}}>លក្ខខណ្ឌ</span> និង <span style={{color:K.gold}}>គោលការណ៍</span></Mono>
        </div>
        <Btn label="ចុះឈ្មោះ" accent={K.gold} full />
      </div>
    </div>
  );
}

function ForgotScreen() {
  return (
    <div style={{ height:"100%", background:K.night, display:"flex", flexDirection:"column" }}>
      <div style={{ height:4, background:`linear-gradient(90deg, ${K.crimson}, ${K.gold})` }}/>
      <div style={{ padding:"28px 18px" }}>
        <Mono s={11} c={K.gold} style={{ marginBottom:18 }}>← ត្រឡប់ក្រោយ</Mono>
        <div style={{ padding:16, borderRadius:14, background:`${K.gold}10`, border:`1px solid ${K.gold}30`, marginBottom:20, textAlign:"center" }}>
          <span style={{ fontSize:32, display:"block", marginBottom:8 }}>🔒</span>
          <KhmerTxt s={13} w={700} c={K.moon} style={{ marginBottom:6 }}>ភ្លេចពាក្យសម្ងាត់?</KhmerTxt>
          <Txt s={9} c={K.sub}>បញ្ចូលអ៊ីមែលរបស់អ្នក ហើយយើងនឹងផ្ញើតំណភ្ជាប់ដើម្បីកំណត់ពាក្យសម្ងាត់ឡើងវិញ។</Txt>
        </div>
        <InputBox label="អ៊ីមែល" val="user@example.com" accent={K.gold}/>
        <Btn label="ផ្ញើតំណភ្ជាប់" accent={K.gold} full />
      </div>
    </div>
  );
}

function OTPScreen() {
  return (
    <div style={{ height:"100%", background:K.night, display:"flex", flexDirection:"column" }}>
      <div style={{ height:4, background:`linear-gradient(90deg, ${K.gold}, ${K.lotus})` }}/>
      <div style={{ padding:"28px 18px" }}>
        <Mono s={11} c={K.gold} style={{ marginBottom:18 }}>← ត្រឡប់ក្រោយ</Mono>
        <KhmerTxt s={15} w={700} c={K.moon} style={{ marginBottom:6 }}>បញ្ជាក់លេខកូដ</KhmerTxt>
        <Txt s={9} c={K.sub} style={{ marginBottom:24, lineHeight:1.7 }}>
          យើងបានផ្ញើលេខកូដ ៦ ខ្ទង់ទៅ <span style={{color:K.gold}}>+855 •••• 4521</span>
        </Txt>
        <div style={{ display:"flex", gap:8, justifyContent:"center", marginBottom:24 }}>
          {[8,4,"_","_","_","_"].map((d,i)=>(
            <div key={i} style={{
              width:32, height:42, borderRadius:10,
              border:`1.5px solid ${i<2 ? K.gold : K.border}`,
              background:i<2 ? `${K.gold}15` : K.surface,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:16, fontWeight:700,
              color:i<2 ? K.gold : K.dim, fontFamily:"monospace",
            }}>{d}</div>
          ))}
        </div>
        <Btn label="បញ្ជាក់" accent={K.gold} full />
        <div style={{ textAlign:"center", marginTop:14 }}>
          <Mono s={9} c={K.sub}>មិនទទួលបាន? <span style={{color:K.gold}}>ផ្ញើម្តងទៀត (42s)</span></Mono>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   HOME SCREENS
══════════════════════════════════════════════════════════ */

function HomeScreen() {
  /* The main home screen — today's Khmer date, moon, quick actions */
  const today = { greg:"25 May 2026", khmer:"ថ្ងៃចន្ទ ១៥ ខែពិសាខ ឆ្នាំមមែ", lunar:"ខែពិសាខ ១៥ កើត", moon:MOON.full, be:"ព.ស. ២៥៧០" };
  return (
    <div style={{ height:"100%", background:K.night, overflow:"hidden" }}>
      {/* Hero date card */}
      <div style={{
        background:`linear-gradient(160deg, #2A1A3A 0%, #1A1020 60%, ${K.night} 100%)`,
        padding:"30px 16px 16px",
        borderBottom:`1px solid ${K.border}`,
        position:"relative", overflow:"hidden",
      }}>
        <div style={{ position:"absolute", top:-20, right:-20, fontSize:80, opacity:0.06 }}>🌕</div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
          <div>
            <Mono s={8} c={K.dim} style={{ letterSpacing:"0.1em", marginBottom:4 }}>TODAY · ថ្ងៃនេះ</Mono>
            <KhmerTxt s={11} c={K.moon}>{today.khmer}</KhmerTxt>
          </div>
          <span style={{ fontSize:28 }}>{today.moon}</span>
        </div>
        <div style={{ display:"flex", gap:6 }}>
          <Tag label={today.be} accent={K.gold} filled />
          <Tag label={today.lunar} accent={K.lotus} />
        </div>
      </div>

      <div style={{ padding:"12px 14px", overflow:"hidden", paddingBottom:60 }}>
        {/* Quick actions */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:14 }}>
          {[
            { ic:"📅", kh:"ប្រតិទិន", en:"Calendar", col:K.gold },
            { ic:"🌙", kh:"ថ្ងៃមង្គល", en:"Auspicious", col:K.jade },
            { ic:"🎉", kh:"ថ្ងៃបុណ្យ", en:"Holidays", col:K.lotus },
            { ic:"🔄", kh:"បំលែង", en:"Convert", col:K.sky },
          ].map(item=>(
            <div key={item.en} style={{
              padding:"10px 12px", borderRadius:12,
              background:K.card, border:`1px solid ${item.col}30`,
              display:"flex", alignItems:"center", gap:8,
            }}>
              <span style={{ fontSize:20 }}>{item.ic}</span>
              <div>
                <KhmerTxt s={10} w={600} c={K.text}>{item.kh}</KhmerTxt>
                <Mono s={8} c={K.dim}>{item.en}</Mono>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming */}
        <Mono s={8} c={K.dim} style={{ letterSpacing:"0.1em", marginBottom:8 }}>UPCOMING · ខាងមុខ</Mono>
        {[
          { date:"🌕 ១៥ ពិសាខ", name:"ថ្ងៃវិសាខបូជា", en:"Visak Bochea", days:3 },
          { date:"🌑 ១ ជេស្ឋ", name:"ខែជេស្ឋ", en:"New Lunar Month", days:15 },
        ].map((ev,i)=>(
          <div key={i} style={{
            display:"flex", alignItems:"center", gap:10,
            padding:"9px 0", borderBottom:`1px solid ${K.border}`,
          }}>
            <div style={{ width:36, height:36, borderRadius:10, background:`${K.gold}15`, border:`1px solid ${K.gold}30`, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <KhmerTxt s={7} c={K.gold}>{ev.date}</KhmerTxt>
            </div>
            <div style={{ flex:1 }}>
              <KhmerTxt s={10} w={600} c={K.text}>{ev.name}</KhmerTxt>
              <Mono s={8} c={K.sub}>{ev.en}</Mono>
            </div>
            <Tag label={`${ev.days}d`} accent={K.gold} />
          </div>
        ))}
      </div>
      <TabBar active="Home" />
    </div>
  );
}

/* ─── CALENDAR SCREEN (the new key screen) ─────────────────── */
function CalendarScreen() {
  const [selDay, setSelDay] = useState(15);
  /* May 2026 starts on Friday (idx 5) */
  const startDay = 5;
  const daysInMonth = 31;

  /* Fake lunar data overlay */
  const lunarMap = {1:"១",2:"២",3:"៣",4:"៤",5:"៥",6:"៦",7:"៧",8:"៨",9:"៩",10:"១០",
    11:"១១",12:"១២",13:"១៣",14:"១៤",15:"១៥",16:"១",17:"២",18:"៣",19:"៤",20:"៥",
    21:"៦",22:"៧",23:"៨",24:"៩",25:"១០",26:"១១",27:"១២",28:"១៣",29:"១៤",30:"១៥",31:"១",
  };
  const moonMap = { 1:MOON.wax1,7:MOON.half,14:MOON.wax2,15:MOON.full,22:MOON.halfW,29:MOON.new };
  const holidays = { 15:"វិសាខ", 24:"ចូលឆ្នាំ" };
  const auspicious = [3,7,12,19,26];

  const cells = [...Array(startDay).fill(null), ...Array(daysInMonth).fill(0).map((_,i)=>i+1)];
  const selInfo = {
    greg:`${selDay} ឧសភា ២០២៦`,
    lunar:`${lunarMap[selDay]} ${selDay<=15?"កើត":"រោច"} ខែពិសាខ`,
    moon: moonMap[selDay] || "🌙",
    holiday: holidays[selDay],
    auspicious: auspicious.includes(selDay),
  };

  return (
    <div style={{ height:"100%", background:K.night, display:"flex", flexDirection:"column", overflow:"hidden" }}>
      {/* Month header */}
      <div style={{
        padding:"28px 14px 10px",
        background:`linear-gradient(180deg, #1E1428 0%, ${K.night} 100%)`,
      }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
          <span style={{ fontSize:14, color:K.gold }}>‹</span>
          <div style={{ textAlign:"center" }}>
            <KhmerTxt s={13} w={700} c={K.moon}>ខែឧសភា ២០២៦</KhmerTxt>
            <Mono s={8} c={K.gold} style={{ letterSpacing:"0.08em" }}>ខែពិសាខ–ជេស្ឋ · ព.ស. ២៥៧០</Mono>
          </div>
          <span style={{ fontSize:14, color:K.gold }}>›</span>
        </div>
        {/* Day labels */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", marginBottom:4 }}>
          {KH_DAYS.map((d,i)=>(
            <div key={d} style={{ textAlign:"center" }}>
              <KhmerTxt s={8} c={i===0||i===6 ? K.crimson : K.dim}>{d}</KhmerTxt>
            </div>
          ))}
        </div>
        {/* Calendar grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:"2px 0" }}>
          {cells.map((day,i)=>{
            if(!day) return <div key={i}/>;
            const isSel = day===selDay;
            const isHol = !!holidays[day];
            const isAusp = auspicious.includes(day);
            const moon = moonMap[day];
            const col = i%7;
            const isWeekend = col===0||col===6;
            return (
              <div key={i} onClick={()=>setSelDay(day)} style={{
                display:"flex", flexDirection:"column", alignItems:"center",
                padding:"3px 1px",
                borderRadius:8,
                background: isSel ? `${K.gold}25` : "transparent",
                border: isSel ? `1px solid ${K.gold}60` : "1px solid transparent",
                cursor:"pointer", position:"relative",
              }}>
                {moon && <span style={{ fontSize:7, lineHeight:1 }}>{moon}</span>}
                <KhmerTxt s={10} w={isSel?700:400} c={isSel ? K.gold : isHol ? K.lotus : isWeekend ? K.crimson : K.text}>
                  {day}
                </KhmerTxt>
                <KhmerTxt s={6} c={K.dim}>{lunarMap[day]}</KhmerTxt>
                {isAusp && <div style={{ width:3, height:3, borderRadius:2, background:K.jade, marginTop:1 }}/>}
                {isHol && !isSel && <div style={{ width:3, height:3, borderRadius:2, background:K.lotus, marginTop:1 }}/>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected day detail */}
      <div style={{ flex:1, padding:"10px 14px", overflow:"hidden" }}>
        <div style={{ padding:"10px 12px", borderRadius:12, background:K.card, border:`1px solid ${K.gold}30`, marginBottom:8 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
            <KhmerTxt s={11} w={700} c={K.moon}>ថ្ងៃទី {selDay}</KhmerTxt>
            <span style={{ fontSize:18 }}>{selInfo.moon}</span>
          </div>
          <Mono s={9} c={K.sub} style={{ marginBottom:4 }}>{selInfo.greg}</Mono>
          <KhmerTxt s={9} c={K.gold}>{selInfo.lunar}</KhmerTxt>
          {selInfo.holiday && (
            <div style={{ marginTop:6, display:"flex", gap:6 }}>
              <Tag label={selInfo.holiday} accent={K.lotus} filled />
            </div>
          )}
          {selInfo.auspicious && <Tag label="ថ្ងៃមង្គល" accent={K.jade} />}
        </div>

        {/* Legend */}
        <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
          {[[K.jade,"ថ្ងៃមង្គល"],[K.lotus,"ថ្ងៃបុណ្យ"],[K.gold,"ថ្ងៃ​ជ្រើស"],[K.crimson,"ថ្ងៃ​ឈប់"]].map(([c,l])=>(
            <div key={l} style={{ display:"flex", alignItems:"center", gap:4 }}>
              <div style={{ width:6, height:6, borderRadius:3, background:c }}/>
              <KhmerTxt s={8} c={K.sub}>{l}</KhmerTxt>
            </div>
          ))}
        </div>
      </div>
      <TabBar active="Calendar" />
    </div>
  );
}

function AuspiciousScreen() {
  const days = [
    { date:"ថ្ងៃពុធ ០៣ ឧសភា", lunar:"៣ កើត ពិសាខ", moon:MOON.wax1, tags:["ពិធីមង្គលការ","ចូលផ្ទះ"] },
    { date:"ថ្ងៃសៅរ៍ ០៧ ឧសភា", lunar:"៧ កើត ពិសាខ", moon:MOON.half, tags:["ធ្វើដំណើរ","ឈ្មួញ"] },
    { date:"ថ្ងៃអង្គារ ១២ ឧសភា", lunar:"១២ កើត ពិសាខ", moon:MOON.wax2, tags:["ការសិក្សា"] },
    { date:"ថ្ងៃពុធ ១៩ ឧសភា", lunar:"៤ រោច ពិសាខ", moon:MOON.wan1, tags:["ពិធីមង្គលការ","ចូលផ្ទះ","ឈ្មួញ"] },
  ];
  return (
    <div style={{ height:"100%", background:K.night, overflow:"hidden" }}>
      <div style={{ padding:"28px 14px 10px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
          <div>
            <KhmerTxt s={15} w={700} c={K.moon}>ថ្ងៃមង្គល</KhmerTxt>
            <Mono s={8} c={K.dim}>Auspicious Days · ឧសភា ២០២៦</Mono>
          </div>
          <span style={{ fontSize:20, color:K.jade }}>🌿</span>
        </div>
        <div style={{ display:"flex", gap:6, marginBottom:12, flexWrap:"wrap" }}>
          {["ទាំងអស់","ពិធីមង្គលការ","ចូលផ្ទះ","ឈ្មួញ","ធ្វើដំណើរ"].map((t,i)=>(
            <Tag key={t} label={t} accent={K.jade} filled={i===0} />
          ))}
        </div>
      </div>
      <div style={{ overflow:"hidden", padding:"0 14px", paddingBottom:20 }}>
        {days.map((d,i)=>(
          <div key={i} style={{
            padding:"10px 12px", borderRadius:12, marginBottom:8,
            background:K.card, border:`1px solid ${K.jade}25`,
          }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
              <div>
                <KhmerTxt s={10} w={600} c={K.text}>{d.date}</KhmerTxt>
                <KhmerTxt s={9} c={K.gold}>{d.lunar}</KhmerTxt>
              </div>
              <span style={{ fontSize:18 }}>{d.moon}</span>
            </div>
            <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
              {d.tags.map(t=><Tag key={t} label={t} accent={K.jade} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HolidaysScreen() {
  const holidays = [
    { date:"14–16 មេសា", kh:"ចូលឆ្នាំថ្មី", en:"Khmer New Year", moon:MOON.wax2, type:"national" },
    { date:"15 ឧសភា", kh:"វិសាខបូជា", en:"Visak Bochea", moon:MOON.full, type:"buddhist" },
    { date:"1–15 កញ្ញា", kh:"ភ្ជុំបិណ្ឌ", en:"Pchum Ben", moon:MOON.full, type:"buddhist" },
    { date:"13–15 តុលា", kh:"បុណ្យអុំទូក", en:"Water Festival", moon:MOON.full, type:"national" },
  ];
  return (
    <div style={{ height:"100%", background:K.night, overflow:"hidden" }}>
      <div style={{ padding:"28px 14px 10px" }}>
        <KhmerTxt s={15} w={700} c={K.moon} style={{ marginBottom:4 }}>ថ្ងៃបុណ្យ</KhmerTxt>
        <Mono s={8} c={K.dim} style={{ marginBottom:12 }}>Holidays · ២០២៦</Mono>
        <div style={{ display:"flex", gap:6, marginBottom:14 }}>
          {["ទាំងអស់","ជាតិ","ព្រះពុទ្ធ"].map((t,i)=>(
            <Tag key={t} label={t} accent={K.lotus} filled={i===0} />
          ))}
        </div>
      </div>
      <div style={{ padding:"0 14px", overflow:"hidden" }}>
        {holidays.map((h,i)=>(
          <div key={i} style={{
            display:"flex", gap:12, padding:"10px 0",
            borderBottom:`1px solid ${K.border}`,
          }}>
            <div style={{
              width:40, height:40, borderRadius:12,
              background:`${K.lotus}15`, border:`1px solid ${K.lotus}30`,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:20, flexShrink:0,
            }}>{h.moon}</div>
            <div style={{ flex:1 }}>
              <KhmerTxt s={11} w={600} c={K.text}>{h.kh}</KhmerTxt>
              <Mono s={8} c={K.sub}>{h.en}</Mono>
              <KhmerTxt s={9} c={K.gold}>{h.date}</KhmerTxt>
            </div>
            <Tag label={h.type==="buddhist"?"ព្រះពុទ្ធ":"ជាតិ"} accent={h.type==="buddhist"?K.gold:K.lotus} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ConvertScreen() {
  return (
    <div style={{ height:"100%", background:K.night, display:"flex", flexDirection:"column" }}>
      <div style={{ padding:"28px 14px 10px" }}>
        <KhmerTxt s={15} w={700} c={K.moon} style={{ marginBottom:4 }}>បំលែងថ្ងៃខែ</KhmerTxt>
        <Mono s={8} c={K.dim} style={{ marginBottom:14 }}>Date Converter</Mono>
        <div style={{ padding:"12px 14px", borderRadius:12, background:K.card, border:`1px solid ${K.border}`, marginBottom:12 }}>
          <Mono s={8} c={K.dim} style={{ marginBottom:6, letterSpacing:"0.08em" }}>ថ្ងៃខែ​ គ្រីស្ដសករាជ</Mono>
          <div style={{ display:"flex", gap:6 }}>
            {["25","ឧសភា","2026"].map((v,i)=>(
              <div key={i} style={{ flex:1, padding:"8px 0", borderRadius:8, background:K.surface, border:`1px solid ${K.gold}40`, textAlign:"center" }}>
                <KhmerTxt s={i===2?10:11} w={600} c={K.gold}>{v}</KhmerTxt>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display:"flex", justifyContent:"center", marginBottom:12 }}>
          <div style={{ width:28, height:28, borderRadius:14, background:`${K.gold}20`, border:`1px solid ${K.gold}40`, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontSize:14 }}>⇅</span>
          </div>
        </div>
        {/* Result card */}
        <div style={{
          padding:"14px", borderRadius:14,
          background:`linear-gradient(135deg, ${K.gold}18, ${K.crimson}08)`,
          border:`1px solid ${K.gold}40`,
        }}>
          <Mono s={8} c={K.gold} style={{ letterSpacing:"0.1em", marginBottom:8 }}>ថ្ងៃខែ​ ចន្ទគតិ</Mono>
          <KhmerTxt s={13} w={700} c={K.moon} style={{ marginBottom:4 }}>ថ្ងៃចន្ទ ១០ ខែពិសាខ</KhmerTxt>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            <Tag label="ព.ស. ២៥៧០" accent={K.gold} filled />
            <Tag label="ឆ្នាំមមែ" accent={K.lotus} />
            <Tag label={`${MOON.wax2} ១០ កើត`} accent={K.sky} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   EXPLORE / SEARCH SCREENS
══════════════════════════════════════════════════════════ */

function SearchScreen() {
  return (
    <div style={{ height:"100%", background:K.night, overflow:"hidden" }}>
      <div style={{ padding:"28px 14px 10px" }}>
        <KhmerTxt s={15} w={700} c={K.moon} style={{ marginBottom:10 }}>រកមើល</KhmerTxt>
        <div style={{
          display:"flex", gap:8, padding:"8px 12px",
          borderRadius:10, background:K.surface,
          border:`1px solid ${K.gold}35`, marginBottom:12,
        }}>
          <span style={{ fontSize:12 }}>🔎</span>
          <Txt s={10} c={K.dim}>ស្វែងរក…</Txt>
        </div>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:14 }}>
          {["ថ្ងៃបុណ្យ","ថ្ងៃមង្គល","ពិធី","ប្រវត្តិ"].map((t,i)=>(
            <Tag key={t} label={t} accent={K.gold} filled={i===0} />
          ))}
        </div>
      </div>
      <Mono s={8} c={K.dim} style={{ padding:"0 14px", letterSpacing:"0.1em", marginBottom:8 }}>ពេញនិយម</Mono>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, padding:"0 14px" }}>
        {[["🌕","ព្រះចន្ទពេញ","Moon Phases"],["🎊","ថ្ងៃបុណ្យ","Holidays"],["🏮","ប្រពៃណី","Traditions"],["📜","ប្រវត្តិ","History"]].map(([ic,kh,en])=>(
          <div key={en} style={{ padding:10, borderRadius:10, background:K.card, border:"1px solid " + K.border }}>
            <span style={{ fontSize:20 }}>{ic}</span>
            <KhmerTxt s={10} w={600} style={{ marginTop:4 }}>{kh}</KhmerTxt>
            <Mono s={8} c={K.dim}>{en}</Mono>
          </div>
        ))}
      </div>
      <TabBar active="Explore" />
    </div>
  );
}

function ArticleScreen() {
  return (
    <div style={{ height:"100%", background:K.night, overflow:"hidden" }}>
      <div style={{ height:100, background:`linear-gradient(160deg, #2A1A38, #1A0F20)`, display:"flex", alignItems:"flex-end", padding:"0 14px 10px", position:"relative" }}>
        <Mono s={11} c={K.gold} style={{ position:"absolute", top:30, left:14 }}>←</Mono>
        <span style={{ position:"absolute", top:28, right:14, fontSize:14 }}>🔖</span>
        <div>
          <Tag label="ព្រះពុទ្ធសាសនា" accent={K.lotus} filled />
          <KhmerTxt s={12} w={700} c={K.moon} style={{ marginTop:4 }}>ថ្ងៃវិសាខបូជា</KhmerTxt>
        </div>
      </div>
      <div style={{ padding:"12px 14px", overflow:"hidden" }}>
        <Mono s={8} c={K.sub} style={{ marginBottom:8 }}>15 ឧសភា ២០២៦ · ១៥ កើត ខែពិសាខ {MOON.full}</Mono>
        <Txt s={10} c={K.sub} style={{ lineHeight:1.7, marginBottom:12 }}>
          វិសាខបូជា ជាថ្ងៃបុណ្យព្រះពុទ្ធសាសនា ដែលប្រារព្ធដើម្បីរំឭកដល់ ការប្រសូត ការត្រាស់ដឹង និងការបរិនិព្វានរបស់ព្រះសម្មាសម្ពុទ្ធ។
        </Txt>
        <GoldLine />
        <div style={{ display:"flex", gap:12, marginTop:8 }}>
          {[["🌕","ព្រះចន្ទ","Full Moon"],["📅","ខែ","Visak"],["🕯️","ប្រពៃណី","Buddhist"]].map(([ic,kh,en])=>(
            <div key={en} style={{ flex:1, textAlign:"center", padding:6, borderRadius:8, background:K.card }}>
              <span style={{ fontSize:16 }}>{ic}</span>
              <KhmerTxt s={8} c={K.gold} style={{ marginTop:2 }}>{kh}</KhmerTxt>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CategoryScreen() {
  return (
    <div style={{ height:"100%", background:K.night, overflow:"hidden" }}>
      <div style={{ padding:"28px 14px 8px", display:"flex", gap:8, alignItems:"center", marginBottom:8 }}>
        <Mono s={11} c={K.gold}>←</Mono>
        <KhmerTxt s={13} w={700} c={K.moon}>ពិធីទំនៀម</KhmerTxt>
      </div>
      <div style={{ display:"flex", gap:6, padding:"0 14px", marginBottom:10, flexWrap:"wrap" }}>
        {["ទាំងអស់","ព្រះពុទ្ធ","ជាតិ","គ្រួសារ"].map((t,i)=><Tag key={t} label={t} accent={K.gold} filled={i===0} />)}
      </div>
      <div style={{ overflow:"hidden", padding:"0 14px" }}>
        {["ពិធីបុណ្យភ្ជុំ","ពិធីចូលឆ្នាំ","ពិធីអុំទូក","ពិធីបេីតបាយ"].map((name,i)=>(
          <div key={i} style={{ display:"flex", gap:10, padding:"9px 0", borderBottom:`1px solid ${K.border}` }}>
            <div style={{ width:38, height:38, borderRadius:10, background:`${K.lotus}15`, border:`1px solid ${K.lotus}25`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>
              {["🏮","🎊","🚣","🍚"][i]}
            </div>
            <div style={{ flex:1 }}>
              <KhmerTxt s={10} w={600}>{name}</KhmerTxt>
              <Mono s={8} c={K.sub}>{["Pchum Ben","Khmer New Year","Water Festival","Rice Ceremony"][i]}</Mono>
            </div>
            <Mono s={10} c={K.dim}>›</Mono>
          </div>
        ))}
      </div>
    </div>
  );
}

function MapScreen() {
  const pins = [{x:38,y:42,n:"ភ្នំពេញ"},{x:62,y:30,n:"សៀមរាប"},{x:55,y:64,n:"ក្រចេះ"},{x:28,y:70,n:"កំពត"}];
  return (
    <div style={{ height:"100%", background:K.night, display:"flex", flexDirection:"column" }}>
      <div style={{ padding:"28px 14px 10px", display:"flex", gap:8, alignItems:"center" }}>
        <Mono s={11} c={K.gold}>←</Mono>
        <KhmerTxt s={13} w={700} c={K.moon}>ព្រឹត្តការណ៍ក្បែរ</KhmerTxt>
      </div>
      <div style={{ flex:1, position:"relative", background:"#100C18", overflow:"hidden" }}>
        {[...Array(7)].map((_,i)=>(
          <div key={i} style={{ position:"absolute", left:0, right:0, top:`${i*16}%`, height:1, background:"#1E1828" }}/>
        ))}
        {[...Array(7)].map((_,i)=>(
          <div key={i} style={{ position:"absolute", top:0, bottom:0, left:`${i*16}%`, width:1, background:"#1E1828" }}/>
        ))}
        {pins.map((p,i)=>(
          <div key={i} style={{ position:"absolute", left:`${p.x}%`, top:`${p.y}%`, transform:"translate(-50%,-50%)" }}>
            <div style={{ width:30, height:30, borderRadius:15, background:K.gold, display:"flex", alignItems:"center", justifyContent:"center", border:`2px solid ${K.night}`, boxShadow:`0 2px 8px ${K.gold}50`, fontSize:12 }}>🏮</div>
            <KhmerTxt s={7} c={K.gold} style={{ textAlign:"center", marginTop:2 }}>{p.n}</KhmerTxt>
          </div>
        ))}
        <div style={{ position:"absolute", left:"50%", top:"52%", transform:"translate(-50%,-50%)" }}>
          <div style={{ width:12, height:12, borderRadius:6, background:K.lotus, border:"2px solid #fff", boxShadow:`0 0 0 6px ${K.lotus}30` }}/>
        </div>
      </div>
      <div style={{ padding:"10px 14px 18px", background:K.deep, borderTop:`1px solid ${K.border}` }}>
        <KhmerTxt s={11} w={600} c={K.text} style={{ marginBottom:6 }}>ព្រឹត្តការណ៍ ៤ ក្បែរ</KhmerTxt>
        <div style={{ display:"flex", gap:8, overflow:"hidden" }}>
          {["វត្តភ្នំ","វត្តអង្គរ","ព្រះវិហារ"].map((p,i)=>(
            <div key={p} style={{ padding:"6px 10px", borderRadius:8, background:K.card, border:`1px solid ${K.border}`, whiteSpace:"nowrap" }}>
              <KhmerTxt s={9} w={600}>{p}</KhmerTxt>
              <Mono s={7} c={K.dim}>{[0.3,1.2,1.8][i]}km</Mono>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   ACTIVITY SCREENS
══════════════════════════════════════════════════════════ */

function ActivityFeedScreen() {
  return (
    <div style={{ height:"100%", background:K.night, overflow:"hidden" }}>
      <div style={{ padding:"28px 14px 10px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <KhmerTxt s={15} w={700} c={K.moon}>សកម្មភាព</KhmerTxt>
          <Mono s={8} c={K.dim}>Activity</Mono>
        </div>
        <span style={{ fontSize:14 }}>⚙️</span>
      </div>
      <div style={{ display:"flex", gap:6, padding:"0 14px 10px" }}>
        {["ថ្ងៃនេះ","សប្ដាហ៍","ខែ"].map((t,i)=><Tag key={t} label={t} accent={K.sky} filled={i===0} />)}
      </div>
      {[
        {ic:"📅",txt:"អ្នកបានបន្ថែមព្រឹត្តការណ៍ ពិធីភ្ជុំ",time:"10m"},
        {ic:"🔄",txt:"បំលែង ០៥/០৫/২০২৬ → ២ ខែពិសាខ",time:"1h"},
        {ic:"🌕",txt:"ព្រះចន្ទពេញ ១៥ ខែពិសាខ ខាងមុខ ៣ ថ្ងៃ",time:"3h"},
        {ic:"🔖",txt:"រក្សាទុកអត្ថបទ: ប្រវត្តិចូលឆ្នាំ",time:"5h"},
      ].map((a,i)=>(
        <div key={i} style={{ display:"flex", gap:10, padding:"10px 14px", borderBottom:`1px solid ${K.border}` }}>
          <div style={{ width:32, height:32, borderRadius:16, background:`${K.sky}20`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, flexShrink:0 }}>{a.ic}</div>
          <div style={{ flex:1 }}>
            <KhmerTxt s={9} c={K.text}>{a.txt}</KhmerTxt>
            <Mono s={8} c={K.dim}>{a.time} ago</Mono>
          </div>
        </div>
      ))}
      <TabBar active="Profile" />
    </div>
  );
}

function StatsScreen() {
  const bars = [30,50,70,45,90,60,80];
  return (
    <div style={{ height:"100%", background:K.night, overflow:"hidden" }}>
      <div style={{ padding:"28px 14px 10px" }}>
        <Mono s={11} c={K.gold} style={{ marginBottom:8 }}>←</Mono>
        <KhmerTxt s={14} w={700} c={K.moon} style={{ marginBottom:10 }}>ស្ថិតិ</KhmerTxt>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:14 }}>
          {[["📅","128","ថ្ងៃបានមើល"],["🔄","34","ការបំលែង"],["🔖","12","រក្សាទុក"],["🎉","8","ព្រឹត្តការណ៍"]].map(([ic,v,l])=>(
            <div key={l} style={{ padding:10, borderRadius:10, background:K.card, border:`1px solid ${K.border}` }}>
              <span style={{ fontSize:16 }}>{ic}</span>
              <KhmerTxt s={18} w={800} c={K.gold} style={{ marginTop:4 }}>{v}</KhmerTxt>
              <KhmerTxt s={8} c={K.sub}>{l}</KhmerTxt>
            </div>
          ))}
        </div>
        <Mono s={8} c={K.dim} style={{ letterSpacing:"0.1em", marginBottom:8 }}>VIEWS THIS WEEK</Mono>
        <div style={{ display:"flex", gap:3, alignItems:"flex-end", height:60, marginBottom:4 }}>
          {bars.map((h,i)=>(
            <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center" }}>
              <div style={{ width:"100%", height:`${h}%`, borderRadius:"3px 3px 0 0", background:i===4?K.gold:`${K.gold}35` }}/>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:3 }}>
          {KH_DAYS.map((d,i)=>(
            <div key={i} style={{ flex:1, textAlign:"center" }}>
              <KhmerTxt s={7} c={i===4?K.gold:K.dim}>{d}</KhmerTxt>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HistoryScreen() {
  return (
    <div style={{ height:"100%", background:K.night, overflow:"hidden" }}>
      <div style={{ padding:"28px 14px 10px" }}>
        <Mono s={11} c={K.gold} style={{ marginBottom:8 }}>←</Mono>
        <KhmerTxt s={14} w={700} c={K.moon} style={{ marginBottom:14 }}>ប្រវត្តិ</KhmerTxt>
      </div>
      <div style={{ padding:"0 14px", overflow:"hidden" }}>
        {[
          { date:"ថ្ងៃនេះ", items:[{t:"មើល: ១៥ ខែពិសាខ",time:"11:24"},{t:"បំលែង: 25 May 2026",time:"09:15"}] },
          { date:"ម្សិលមិញ", items:[{t:"រក្សាទុក: ថ្ងៃវិសាខបូជា",time:"18:40"},{t:"មើល: ថ្ងៃមង្គល ខែ ៥",time:"14:22"}] },
        ].map(s=>(
          <div key={s.date} style={{ marginBottom:14 }}>
            <KhmerTxt s={9} w={600} c={K.gold} style={{ marginBottom:8 }}>{s.date}</KhmerTxt>
            {s.items.map((item,i)=>(
              <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:`1px solid ${K.border}` }}>
                <KhmerTxt s={9} c={K.sub}>{item.t}</KhmerTxt>
                <Mono s={8} c={K.dim}>{item.time}</Mono>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PROFILE SCREENS
══════════════════════════════════════════════════════════ */

function ProfileScreen() {
  return (
    <div style={{ height:"100%", background:K.night, overflow:"hidden" }}>
      <div style={{ height:80, background:`linear-gradient(160deg, #2A1A38, #1A0F20)`, position:"relative" }}>
        <div style={{ position:"absolute", bottom:-24, left:14 }}>
          <div style={{ width:50, height:50, borderRadius:25, background:`linear-gradient(135deg, ${K.gold}, ${K.crimson})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, border:`3px solid ${K.night}`, boxShadow:`0 4px 16px ${K.gold}40` }}>ស</div>
        </div>
      </div>
      <div style={{ padding:"30px 14px 0" }}>
        <div style={{ display:"flex", justifyContent:"flex-end", gap:6, marginBottom:12 }}>
          <Tag label="កែប្រែ" accent={K.gold} />
        </div>
        <KhmerTxt s={14} w={700} c={K.moon}>សុខ ចន្ទ​ដារ៉ា</KhmerTxt>
        <Mono s={9} c={K.dim} style={{ marginBottom:4 }}>@sokchanda · ចូល ២០២៤</Mono>
        <KhmerTxt s={9} c={K.sub} style={{ marginBottom:10, lineHeight:1.7 }}>ចូលចិត្តប្រតិទិនខ្មែរ និងវប្បធម៌ប្រពៃណី</KhmerTxt>
        <div style={{ display:"flex", gap:20, marginBottom:14, paddingBottom:12, borderBottom:`1px solid ${K.border}` }}>
          {[["128","ថ្ងៃ"],["24","ព្រឹត្ត"],["8","ផែន"]].map(([v,l])=>(
            <div key={l} style={{ textAlign:"center" }}>
              <KhmerTxt s={14} w={700} c={K.gold}>{v}</KhmerTxt>
              <KhmerTxt s={8} c={K.dim}>{l}</KhmerTxt>
            </div>
          ))}
        </div>
        <Mono s={8} c={K.dim} style={{ letterSpacing:"0.1em", marginBottom:8 }}>ព្រឹត្តការណ៍ខាងមុខ</Mono>
        {[{kh:"ភ្ជុំបិណ្ឌ",en:"Pchum Ben",date:"កញ្ញា"},{kh:"បុណ្យអុំទូក",en:"Water Festival",date:"តុលា"}].map((ev,i)=>(
          <div key={i} style={{ display:"flex", gap:8, padding:"7px 0", borderBottom:`1px solid ${K.border}` }}>
            <span style={{ fontSize:16 }}>{["🏮","🚣"][i]}</span>
            <div style={{ flex:1 }}>
              <KhmerTxt s={10} w={600}>{ev.kh}</KhmerTxt>
              <Mono s={8} c={K.dim}>{ev.en} · {ev.date}</Mono>
            </div>
          </div>
        ))}
      </div>
      <TabBar active="Profile" />
    </div>
  );
}

function EditProfileScreen() {
  return (
    <div style={{ height:"100%", background:K.night, overflow:"hidden" }}>
      <div style={{ height:4, background:`linear-gradient(90deg, ${K.gold}, ${K.crimson})` }}/>
      <div style={{ padding:"28px 16px 0" }}>
        <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:18 }}>
          <Mono s={11} c={K.gold}>←</Mono>
          <KhmerTxt s={14} w={700} c={K.moon}>កែប្រែប្រវត្តិ</KhmerTxt>
        </div>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", marginBottom:18 }}>
          <div style={{ width:56, height:56, borderRadius:28, background:`linear-gradient(135deg, ${K.gold}, ${K.crimson})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, marginBottom:8, position:"relative" }}>
            ស
            <div style={{ position:"absolute", bottom:0, right:0, width:18, height:18, borderRadius:9, background:K.card, border:`2px solid ${K.gold}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:8 }}>✏️</div>
          </div>
          <Mono s={9} c={K.gold}>ផ្លាស់ប្ដូររូបថត</Mono>
        </div>
        <InputBox label="ឈ្មោះ​ពេញ" val="សុខ ចន្ទ​ដារ៉ា" accent={K.gold} />
        <InputBox label="ឈ្មោះអ្នកប្រើ" val="@sokchanda" accent={K.gold} />
        <InputBox label="ជីវប្រវត្តិ" val="ចូលចិត្តប្រតិទិនខ្មែរ" accent={K.gold} />
        <InputBox label="ទំព័រ​គេហ" val="khmerdate.app" accent={K.gold} />
        <Btn label="រក្សាទុក" accent={K.gold} full />
      </div>
    </div>
  );
}

function SettingsScreen() {
  const sections = [
    { title:"ភាសា", items:[["🌐","ភាសា","Language"],["🕐","ទ្រង់ទ្រាយ","Date Format"]] },
    { title:"ការជូនដំណឹង", items:[["🔔","ថ្ងៃបុណ្យ","Holidays"],["🌙","ព្រះចន្ទ","Moon Phases"]] },
    { title:"ទូទៅ", items:[["🎨","រូបរាង","Appearance"],["🔒","ឯកជនភាព","Privacy"],["❓","ជំនួយ","Help"]] },
  ];
  return (
    <div style={{ height:"100%", background:K.night, overflow:"hidden" }}>
      <div style={{ padding:"28px 14px 10px" }}>
        <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:14 }}>
          <Mono s={11} c={K.gold}>←</Mono>
          <KhmerTxt s={14} w={700} c={K.moon}>ការកំណត់</KhmerTxt>
        </div>
        {sections.map(s=>(
          <div key={s.title} style={{ marginBottom:14 }}>
            <KhmerTxt s={9} c={K.dim} style={{ marginBottom:6 }}>{s.title}</KhmerTxt>
            <div style={{ borderRadius:10, overflow:"hidden", border:`1px solid ${K.border}` }}>
              {s.items.map(([ic,kh,en],i)=>(
                <div key={en} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"9px 12px", background:K.card, borderBottom:i<s.items.length-1?`1px solid ${K.border}`:"none" }}>
                  <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                    <span style={{ fontSize:14 }}>{ic}</span>
                    <div>
                      <KhmerTxt s={10}>{kh}</KhmerTxt>
                      <Mono s={7} c={K.dim}>{en}</Mono>
                    </div>
                  </div>
                  <Mono s={11} c={K.dim}>›</Mono>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div style={{ textAlign:"center", marginTop:4 }}>
          <KhmerTxt s={10} c={K.crimson}>ចាកចេញ</KhmerTxt>
        </div>
      </div>
    </div>
  );
}

function NotifSettingsScreen() {
  const prefs = [["ថ្ងៃបុណ្យជាតិ",true],["ថ្ងៃព្រះចន្ទពេញ",true],["ថ្ងៃមង្គល",false],["ចូលខែថ្មី",true],["ព្រឹត្តការណ៍ផ្ទាល់",false]];
  return (
    <div style={{ height:"100%", background:K.night, overflow:"hidden" }}>
      <div style={{ padding:"28px 14px 10px" }}>
        <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:14 }}>
          <Mono s={11} c={K.gold}>←</Mono>
          <KhmerTxt s={14} w={700} c={K.moon}>ការជូនដំណឹង</KhmerTxt>
        </div>
        <div style={{ borderRadius:10, overflow:"hidden", border:`1px solid ${K.border}` }}>
          {prefs.map(([lb,on],i)=>(
            <div key={lb} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 12px", background:K.card, borderBottom:i<prefs.length-1?`1px solid ${K.border}`:"none" }}>
              <KhmerTxt s={10}>{lb}</KhmerTxt>
              <div style={{ width:34, height:20, borderRadius:10, background:on?K.gold:K.muted, padding:"2px", display:"flex", alignItems:"center", justifyContent:on?"flex-end":"flex-start", transition:"all 0.2s" }}>
                <div style={{ width:16, height:16, borderRadius:8, background:"#fff", boxShadow:"0 1px 3px #0006" }}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PrivacyScreen() {
  return (
    <div style={{ height:"100%", background:K.night, overflow:"hidden" }}>
      <div style={{ padding:"28px 14px 10px" }}>
        <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:14 }}>
          <Mono s={11} c={K.gold}>←</Mono>
          <KhmerTxt s={14} w={700} c={K.moon}>ឯកជនភាព</KhmerTxt>
        </div>
        <div style={{ padding:10, borderRadius:10, background:`${K.jade}10`, border:`1px solid ${K.jade}30`, marginBottom:14 }}>
          <KhmerTxt s={9} c={K.sub} style={{ lineHeight:1.7 }}>🛡️ ទិន្នន័យរបស់អ្នកត្រូវបានការពារ ហើយមិនត្រូវបានលក់ដល់ភាគីទីបី</KhmerTxt>
        </div>
        {[["ភាពមើលឃើញ","សាធារណៈ"],["ការចូលប្រើប្រាស់","ភ្ញៀវវូ"],["ប្រវត្តិការស្វែងរក","ឯកជន"]].map(([lb,val],i)=>(
          <div key={lb} style={{ display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom:`1px solid ${K.border}` }}>
            <KhmerTxt s={10}>{lb}</KhmerTxt>
            <div style={{ display:"flex", gap:4, alignItems:"center" }}>
              <KhmerTxt s={9} c={K.gold}>{val}</KhmerTxt>
              <Mono s={10} c={K.dim}>›</Mono>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HelpScreen() {
  return (
    <div style={{ height:"100%", background:K.night, overflow:"hidden" }}>
      <div style={{ padding:"28px 14px 10px" }}>
        <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:12 }}>
          <Mono s={11} c={K.gold}>←</Mono>
          <KhmerTxt s={14} w={700} c={K.moon}>ជំនួយ</KhmerTxt>
        </div>
        <div style={{ display:"flex", gap:8, padding:"7px 10px", borderRadius:10, background:K.surface, border:`1px solid ${K.gold}35`, marginBottom:14 }}>
          <span style={{ fontSize:12 }}>🔎</span>
          <KhmerTxt s={9} c={K.dim}>ស្វែងរក…</KhmerTxt>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:14 }}>
          {[["💬","ជជែក","Chat"],["📧","អ៊ីមែល","Email"],["📖","មគ្គុទ្ទេស","Guide"],["🐛","រាយការណ៍","Report"]].map(([ic,kh,en])=>(
            <div key={en} style={{ padding:10, borderRadius:10, background:K.card, border:`1px solid ${K.border}`, display:"flex", gap:8 }}>
              <span style={{ fontSize:16 }}>{ic}</span>
              <div>
                <KhmerTxt s={9} w={600}>{kh}</KhmerTxt>
                <Mono s={7} c={K.dim}>{en}</Mono>
              </div>
            </div>
          ))}
        </div>
        <Mono s={8} c={K.dim} style={{ letterSpacing:"0.1em", marginBottom:8 }}>FAQ</Mono>
        {["តើប្រតិទិនចន្ទគតិដំណើរការយ៉ាងដូចម្តេច?","តើខ្ញុំអាចបន្ថែមព្រឹត្តការណ៍ផ្ទាល់ខ្លួនបានទេ?","ភាសាខ្មែរ–អង់គ្លេស?","ការជូនដំណឹងដំណើរការដូចម្តេច?"].map((q,i)=>(
          <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"9px 0", borderBottom:`1px solid ${K.border}` }}>
            <KhmerTxt s={9} c={K.sub}>{q}</KhmerTxt>
            <Mono s={10} c={K.dim}>›</Mono>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   SCREEN REGISTRY
══════════════════════════════════════════════════════════ */
const SCREENS = [
  /* AUTH */
  { id:"splash",      stack:"Auth",     accent:K.gold,    label:"Splash",        render:()=><SplashScreen/> },
  { id:"onboarding",  stack:"Auth",     accent:K.gold,    label:"Onboarding",    render:()=><OnboardingScreen/> },
  { id:"login",       stack:"Auth",     accent:K.gold,    label:"Login",         render:()=><LoginScreen/> },
  { id:"register",    stack:"Auth",     accent:K.goldL,   label:"Register",      render:()=><RegisterScreen/> },
  { id:"forgot",      stack:"Auth",     accent:K.crimson, label:"ForgotPassword",render:()=><ForgotScreen/> },
  { id:"otp",         stack:"Auth",     accent:K.lotus,   label:"OTPVerify",     render:()=><OTPScreen/> },
  /* HOME */
  { id:"home",        stack:"Home",     accent:K.gold,    label:"Home",          render:()=><HomeScreen/> },
  { id:"calendar",    stack:"Home",     accent:K.goldL,   label:"Calendar",      render:()=><CalendarScreen/> },
  { id:"auspicious",  stack:"Home",     accent:K.jade,    label:"AuspiciousDays",render:()=><AuspiciousScreen/> },
  { id:"holidays",    stack:"Home",     accent:K.lotus,   label:"Holidays",      render:()=><HolidaysScreen/> },
  { id:"convert",     stack:"Home",     accent:K.sky,     label:"DateConvert",   render:()=><ConvertScreen/> },
  /* EXPLORE */
  { id:"search",      stack:"Explore",  accent:K.gold,    label:"Search",        render:()=><SearchScreen/> },
  { id:"article",     stack:"Explore",  accent:K.lotus,   label:"ArticleDetail", render:()=><ArticleScreen/> },
  { id:"category",    stack:"Explore",  accent:K.goldL,   label:"Category",      render:()=><CategoryScreen/> },
  { id:"map",         stack:"Explore",  accent:K.jade,    label:"MapNearby",     render:()=><MapScreen/> },
  /* ACTIVITY */
  { id:"actfeed",     stack:"Activity", accent:K.sky,     label:"ActivityFeed",  render:()=><ActivityFeedScreen/> },
  { id:"stats",       stack:"Activity", accent:K.gold,    label:"Stats",         render:()=><StatsScreen/> },
  { id:"history",     stack:"Activity", accent:K.dim,     label:"History",       render:()=><HistoryScreen/> },
  /* PROFILE */
  { id:"profile",     stack:"Profile",  accent:K.gold,    label:"Profile",       render:()=><ProfileScreen/> },
  { id:"editprofile", stack:"Profile",  accent:K.goldL,   label:"EditProfile",   render:()=><EditProfileScreen/> },
  { id:"settings",    stack:"Profile",  accent:K.gold,    label:"Settings",      render:()=><SettingsScreen/> },
  { id:"notifsett",   stack:"Profile",  accent:K.lotus,   label:"NotifSettings", render:()=><NotifSettingsScreen/> },
  { id:"privacy",     stack:"Profile",  accent:K.jade,    label:"Privacy",       render:()=><PrivacyScreen/> },
  { id:"help",        stack:"Profile",  accent:K.sky,     label:"Help",          render:()=><HelpScreen/> },
];

const STACKS = ["All","Auth","Home","Explore","Activity","Profile"];
const STACK_ACCENT = { Auth:K.crimson, Home:K.gold, Explore:K.lotus, Activity:K.sky, Profile:K.jade };

/* ══════════════════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════════════════ */
export default function KhmerScreenLibrary() {
  const [filter, setFilter] = useState("All");
  const [focusId, setFocusId] = useState(null);

  const filtered = filter==="All" ? SCREENS : SCREENS.filter(s=>s.stack===filter);
  const focused  = SCREENS.find(s=>s.id===focusId);

  return (
    <div style={{ minHeight:"100vh", background:K.night, color:K.text, fontFamily:"'Battambang', serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Battambang:wght@400;700&family=Noto+Serif+Khmer:wght@400;600;700&family=DM+Mono:wght@400;500;700&display=swap');
        * { box-sizing:border-box; }
        ::-webkit-scrollbar { width:4px; background:#0D0A0F; }
        ::-webkit-scrollbar-thumb { background:#2E2538; border-radius:4px; }
      `}</style>

      {/* Top accent bar */}
      <div style={{ height:3, background:`linear-gradient(90deg, ${K.crimson}, ${K.gold}, ${K.lotus}, ${K.jade})` }}/>

      {/* Header */}
      <div style={{ padding:"32px 30px 0", marginBottom:24 }}>
        <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:8 }}>
          <div style={{
            width:44, height:44, borderRadius:14,
            background:`linear-gradient(135deg, ${K.gold}, ${K.crimson})`,
            display:"flex", alignItems:"center", justifyContent:"center", fontSize:22,
            boxShadow:`0 4px 20px ${K.gold}40`,
          }}>🌙</div>
          <div>
            <KhmerTxt s={20} w={700} c={K.moon} style={{ letterSpacing:"0.02em" }}>ប្រតិទិនខ្មែរ</KhmerTxt>
            <Mono s={10} c={K.sub} style={{ letterSpacing:"0.1em" }}>KHMER LUNAR CALENDAR · SCREEN LIBRARY v2</Mono>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginTop:16 }}>
          {[
            [SCREENS.length,"📱","Screens",K.gold],
            [6,"🗂️","Stacks",K.lotus],
            [1,"📅","Calendar",K.jade],
            [6,"🔐","Auth",K.crimson],
          ].map(([v,ic,l,c])=>(
            <div key={l} style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 14px", background:K.surface, border:`1px solid ${c}25`, borderRadius:9 }}>
              <span style={{ fontSize:14 }}>{ic}</span>
              <span style={{ fontSize:16, fontWeight:800, color:c, fontFamily:"'DM Mono', monospace" }}>{v}</span>
              <Mono s={10} c={K.sub}>{l}</Mono>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginTop:16 }}>
          {STACKS.map(s=>{
            const acc = STACK_ACCENT[s] || K.gold;
            const active = filter===s;
            const count = s==="All" ? SCREENS.length : SCREENS.filter(sc=>sc.stack===s).length;
            return (
              <button key={s} onClick={()=>setFilter(s)} style={{
                padding:"6px 14px", borderRadius:20,
                border:`1px solid ${active ? acc : K.border}`,
                background: active ? `${acc}20` : "transparent",
                color: active ? acc : K.sub,
                fontSize:11, fontWeight:600, cursor:"pointer",
                fontFamily:"'DM Mono', monospace", transition:"all 0.15s",
              }}>
                {s} <span style={{ opacity:0.6, fontSize:9 }}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Screen grid */}
      <div style={{ padding:"0 30px 80px", display:"flex", flexWrap:"wrap", gap:28 }}>
        {filtered.map(screen=>(
          <div key={screen.id} onClick={()=>setFocusId(screen.id)} style={{ cursor:"zoom-in" }}>
            <Phone accent={screen.accent} label={screen.label} stack={screen.stack}>
              {screen.render()}
            </Phone>
          </div>
        ))}
      </div>

      {/* Zoom overlay */}
      {focused && (
        <div
          onClick={()=>setFocusId(null)}
          style={{
            position:"fixed", inset:0, background:"#000000D0",
            display:"flex", alignItems:"center", justifyContent:"center",
            zIndex:1000, cursor:"zoom-out", backdropFilter:"blur(10px)",
          }}
        >
          <div onClick={e=>e.stopPropagation()} style={{ cursor:"default" }}>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16 }}>
              {/* Large phone */}
              <div style={{
                width:338, height:676,
                background:K.night,
                borderRadius:54,
                border:`2px solid ${focused.accent}80`,
                boxShadow:`0 0 0 1px ${K.border}, 0 24px 80px ${focused.accent}35, 0 4px 24px #00000080`,
                overflow:"hidden", position:"relative",
              }}>
                {/* Top bar */}
                <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:120, height:30, background:K.night, borderBottomLeftRadius:18, borderBottomRightRadius:18, zIndex:10 }}/>
                <div style={{ position:"absolute", top:8, left:20, right:20, display:"flex", justifyContent:"space-between", zIndex:9 }}>
                  <Mono s={10} c={`${K.text}60`}>9:41</Mono>
                  <Mono s={10} c={`${K.text}60`}>●●● ▲ 🔋</Mono>
                </div>
                {/* Scaled content */}
                <div style={{ position:"absolute", inset:0, overflow:"hidden", borderRadius:53, transform:"scale(1.52)", transformOrigin:"top left", width:"65.8%", height:"65.8%" }}>
                  {focused.render()}
                </div>
                <div style={{ position:"absolute", bottom:10, left:"50%", transform:"translateX(-50%)", width:88, height:4, background:`${K.text}20`, borderRadius:2, zIndex:10 }}/>
              </div>
              <div style={{ textAlign:"center" }}>
                <Mono s={14} c={focused.accent} style={{ fontWeight:700, letterSpacing:"0.05em" }}>{focused.label}</Mono>
                <Mono s={11} c={K.dim} style={{ marginTop:4 }}>{focused.stack} Stack · click outside to close</Mono>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
