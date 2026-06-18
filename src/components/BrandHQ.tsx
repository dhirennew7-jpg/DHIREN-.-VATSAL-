import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  BarChart, Bar, CartesianGrid, Legend 
} from 'recharts';
import { 
  TrendingUp, Users, Instagram, Heart, ShoppingBag, ShieldCheck, 
  Compass, Award, RefreshCw, Layers, Sparkles, Plus, Trash2, Volume2, Flame, Play, Info
} from 'lucide-react';
import { BRAND_PERSONAS, BRAND_COMPARISON, SWOT_ANALYSIS, KPI_METRICS } from '../data';
import { BrandPersona, CompetitorComparison } from '../types';

export default function BrandHQ() {
  const [activePersonaIdx, setActivePersonaIdx] = useState<number>(0);
  const [comparisonItems, setComparisonItems] = useState<CompetitorComparison[]>(BRAND_COMPARISON);
  
  // SWOT dynamic stickies
  const [swotStickies, setSwotStickies] = useState<{
    id: string;
    category: 'strengths' | 'weaknesses' | 'opportunities' | 'threats';
    text: string;
    author: string;
  }[]>([
    { id: '1', category: 'strengths', text: 'Viral photogenic milk-layering technique looks incredible on reels', author: 'Social Lead' },
    { id: '2', category: 'opportunities', text: 'Set up weekend study groups discount coupons for KC College students', author: 'Founder' },
    { id: '3', category: 'threats', text: 'Local rents rising near Churchgate station', author: 'Finance Manager' }
  ]);
  const [newStickyText, setNewStickyText] = useState<string>('');
  const [newStickyCategory, setNewStickyCategory] = useState<'strengths' | 'weaknesses' | 'opportunities' | 'threats'>('opportunities');

  // ASMR Reels Content Simulator state
  const [reelTheme, setReelTheme] = useState<'drinks' | 'lifestyle' | 'community' | 'offers'>('drinks');
  const [cinematicSpeed, setCinematicSpeed] = useState<number>(1); // slider 0.5x to 2x speed
  const [asmrAudioText, setAsmrAudioText] = useState<string>('Press Play to hear description');
  const [isPlayingReel, setIsPlayingReel] = useState<boolean>(true);

  // Growth KPI Simulator parameters
  const [simRetentionBoost, setSimRetentionBoost] = useState<number>(35); // target > 35
  const [simInstagramSaveBoost, setSimInstagramSaveBoost] = useState<number>(8); // target > 8
  const [simOutreachBudgetValue, setSimOutreachBudgetValue] = useState<number>(20000); // 10k to 100k rupees

  // Derived growth projections
  const projectedWeeklyConversion = (simInstagramSaveBoost * 0.4 + (simRetentionBoost / 10)).toFixed(1);
  const projectedMonthlyRevenueVal = Math.round(
    250000 + (simRetentionBoost * 4500) + (simInstagramSaveBoost * 8000) + (simOutreachBudgetValue * 2.8)
  );
  
  const handleAddSticky = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStickyText) return;
    const item = {
      id: Date.now().toString(),
      category: newStickyCategory,
      text: newStickyText,
      author: 'Strategy Board User'
    };
    setSwotStickies([...swotStickies, item]);
    setNewStickyText('');
  };

  const handleDeleteSticky = (id: string) => {
    setSwotStickies(swotStickies.filter(s => s.id !== id));
  };

  // ASMR themes descriptors
  const reelThemesData = {
    drinks: {
      percentage: '40% of Content',
      title: 'Drinks First: Aesthetic ASMR',
      description: 'Slow motion, rich chocolate swirls, dripping caramel, dense pistachio crumbles falling, cardamom pouring.',
      caption: 'When cardamom latte matches the winter rain coffee mood... 🌧️☕✨ #BrewInnMumbai #ASMR',
      music: '🎵 Cinematic Lo-fi Coffeehouse Beat (115 bpm)',
      animationDuration: (6 / cinematicSpeed).toFixed(1),
      visualPlaceholderGradient: 'from-amber-700 via-yellow-950 to-amber-900',
      soundText: '🔊 [ASMR SOUND]: Deep velvet espresso extraction popping with subtle steam gasps'
    },
    lifestyle: {
      percentage: '25% of Content',
      title: 'Everyday Escape Lifestyle',
      description: 'A cozy cardigan, opening a laptop, satisfying mouse clicks, a golden sunbeam reflecting off the wooden table top.',
      caption: 'Your laptop, high-speed WiFi, and a classic flat white. Workspace lounge unlocked. 💻🍂 #DailyRitual',
      music: '🎵 Warm Chill Jazzhop Vibes',
      animationDuration: (8 / cinematicSpeed).toFixed(1),
      visualPlaceholderGradient: 'from-orange-850 via-amber-950 to-orange-950',
      soundText: '🔊 [ASMR SOUND]: Page flipping, keyboards ticking, coffee cup resting softly on wood'
    },
    community: {
      percentage: '20% of Content',
      title: 'Vibrant Campus Community',
      description: 'Smiles, graphic designers collaborating, students laughing, Polaroid photo strings hanging in background.',
      caption: 'Spotted at the weekly Creator Meetup at Brew Inn. Creative minds + signature brews. 🎨👋 #Hyperlocal',
      music: '🎵 Energetic indie electric piano chords',
      animationDuration: (5 / cinematicSpeed).toFixed(1),
      visualPlaceholderGradient: 'from-amber-800 via-amber-900 to-yellow-900',
      soundText: '🔊 [ASMR SOUND]: Soft chatter, glasses clinking, warm laughter reverberations'
    },
    offers: {
      percentage: '15% of Content',
      title: 'Playful Loyalty Offers',
      description: 'A point multiplier tracker ticking up, free cortado coupon code shining, high energy graphic popups.',
      caption: 'Get a free Lava salt brownie when you refer your study group buddy. No gatekeeping here! 🎟️🍫 #FreeDessert',
      music: '🎵 Fun Upbeat Quirky Pop',
      animationDuration: (4 / cinematicSpeed).toFixed(1),
      visualPlaceholderGradient: 'from-yellow-800 via-orange-900 to-amber-950',
      soundText: '🔊 [ASMR SOUND]: Point counter "ding!", wrapper unfolding, happy stamps tapping'
    }
  };

  const activeReelData = reelThemesData[reelTheme];

  const handlePlaySound = () => {
    setAsmrAudioText(activeReelData.soundText);
    setTimeout(() => {
      setAsmrAudioText('Press Play to hear description');
    }, 4500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-coffee-50">
      
      {/* BRAND INN BOARD TITLE SECTION */}
      <div className="border-b border-coffee-900/10 pb-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 rounded-full border border-coffee-900/15 bg-white text-coffee-900 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] shadow-2xs">
              <ShieldCheck className="h-3.5 w-3.5 text-accent-amber" />
              <span>BREW INN BRAND DECK</span>
            </div>
            <h1 className="mt-3 font-serif text-3xl sm:text-5xl italic font-extrabold text-coffee-900 leading-tight">
              The Strategy <span className="not-italic font-sans font-black uppercase tracking-tighter text-coffee-950">Companion</span>
            </h1>
            <p className="mt-2 text-sm text-coffee-750 max-w-2xl leading-relaxed">
              Interactive strategic benchmarking compared to <span className="font-bold text-coffee-900">Blue Tokai</span>. Built for regional agility, Gen Z demographic exploration, and real-time performance simulation.
            </p>
          </div>
          <div className="flex items-center gap-2.5 text-[10px] uppercase tracking-wider font-bold bg-white text-coffee-800 px-5 py-3 rounded-full border border-coffee-900/10 shadow-xs shrink-0 self-start md:self-center">
            <span className="h-2.5 w-2.5 rounded-full bg-accent-green"></span>
            <span>Focus: <b className="text-coffee-950 font-black">Coffee Escape</b> v/s "Intimidation"</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: SYSTEM EXECUTIVE SUMMARY */}
      <div className="bg-[#2C1B18] text-coffee-100 rounded-[35px] p-6 sm:p-10 mb-12 shadow-xl border border-coffee-900 relative overflow-hidden">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-accent-amber/10 blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl">
          <span className="text-[10px] font-mono tracking-[0.3em] font-bold uppercase text-accent-amber block mb-2">SECTION 01 — EXECUTIVE BRIEF</span>
          <h2 className="text-2xl sm:text-4xl font-serif italic text-white mt-1 leading-tight">
            How Brew Inn <span className="not-italic font-sans font-black uppercase">Wins</span> the City
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-coffee-200 leading-relaxed max-w-3xl">
            We do not compete on technical specialty roasting jargon. Brew Inn wins the hyper-growth urban demographic through <span className="text-accent-amber font-extrabold">Affordable Premium Pricing (35% average savings)</span>, visual trend discovery on Reels, spacious layout design, and a zero-pressure lifestyle zone.
          </p>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-coffee-800/80">
            <div>
              <span className="text-[9px] font-mono uppercase tracking-wider text-coffee-400 block">Competitor Focus</span>
              <span className="font-serif italic font-bold text-base text-white">Roastery Expertise</span>
            </div>
            <div>
              <span className="text-[9px] font-mono uppercase tracking-wider text-coffee-400 block">Brew Inn Focus</span>
              <span className="font-serif italic font-bold text-base text-accent-amber">Daily Café Escape</span>
            </div>
            <div>
              <span className="text-[9px] font-mono uppercase tracking-wider text-coffee-400 block">Brand Persona</span>
              <span className="font-serif italic font-bold text-base text-white">The Lifestyle Explorer</span>
            </div>
            <div>
              <span className="text-[9px] font-mono uppercase tracking-wider text-coffee-400 block">Average Order</span>
              <span className="font-serif italic font-bold text-base text-accent-amber">₹150 – ₹250</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: BRAND POSITIONING MATRIX */}
      <div className="mb-12">
        <div className="mb-6">
          <span className="text-[9px] font-mono font-bold text-coffee-500 uppercase tracking-widest block">SECTION 02 — POSITIONING MATRIX</span>
          <h3 className="font-serif text-2xl italic font-bold text-coffee-900 mt-1">Brand Mapping & Archetypes</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          {/* Brew Inn Card */}
          <div className="bg-white border rounded-[30px] border-coffee-900/10 p-8 shadow-xs relative hover:border-coffee-900/20 transition-all">
            <div className="absolute top-6 right-6 bg-amber-500/10 text-accent-amber text-[9px] font-black tracking-widest px-3 py-1 rounded-full border border-amber-500/20 uppercase flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              <span>THE EXPLORER / CREATOR</span>
            </div>

            <span className="text-[9px] font-mono font-bold text-coffee-400 uppercase tracking-widest">BREW INN BRAND PROFILE</span>
            <h4 className="font-serif text-xl italic font-bold text-coffee-900 mt-2">"Creative escapism and friendly daily habits"</h4>
            
            <p className="mt-4 text-xs text-coffee-700 leading-relaxed italic border-l-2 border-accent-amber pl-4 bg-coffee-50/50 py-3 rounded-r-[15px]">
              "For young active students who want premium cafe warmth without corporate pressure, Brew Inn is an accessible escape that matches Mumbai’s forward-moving rhythm."
            </p>

            <div className="mt-6 space-y-2.5 text-xs">
              <div className="flex items-center justify-between border-b border-coffee-900/5 pb-2">
                <span className="text-coffee-500">Personality Style:</span>
                <span className="font-bold text-coffee-900">Warm, Youthful, Trend-aware, Relaxed</span>
              </div>
              <div className="flex items-center justify-between border-b border-coffee-900/5 pb-2">
                <span className="text-coffee-500">Aesthetic Values:</span>
                <span className="text-accent-amber font-bold">Creative • Fun Pours • Clean Grids</span>
              </div>
              <div className="flex items-center justify-between border-b border-coffee-900/5 pb-2">
                <span className="text-coffee-500">Primary Audience:</span>
                <span className="font-bold text-coffee-950">Age 18–32 (Digital Creators, Students)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-coffee-500">Visual Outreach:</span>
                <span className="text-accent-green font-bold uppercase tracking-wider text-[10px]">High-fidelity ASMR Reels</span>
              </div>
            </div>
          </div>

          {/* Blue Tokai Card */}
          <div className="bg-white border rounded-[30px] border-coffee-900/10 p-8 shadow-xs relative hover:border-coffee-900/20 transition-all">
            <div className="absolute top-6 right-6 bg-coffee-100 text-coffee-600 text-[9px] font-black tracking-widest px-3 py-1 rounded-full border border-coffee-200 uppercase flex items-center gap-1">
              <Layers className="h-3 w-3" />
              <span>THE SAGE / EXPERT</span>
            </div>

            <span className="text-[10px] font-bold text-coffee-500 uppercase tracking-widest font-mono">BLUE TOKAI (BENCHMARK)</span>
            <h4 className="font-serif text-xl italic font-bold text-coffee-900 mt-2">"The Specialty Coffee Origin Authority"</h4>
            
            <p className="mt-4 text-xs text-coffee-700 leading-relaxed italic border-l-2 border-coffee-400 pl-4 bg-coffee-50/50 py-3 rounded-r-[15px]">
              "For consumers who appreciate origin, roasting, and craft coffee, Blue Tokai delivers authentic specialty coffee experiences."
            </p>

            <div className="mt-6 space-y-2.5 text-xs">
              <div className="flex items-center justify-between border-b border-coffee-900/5 pb-2">
                <span className="text-coffee-500">Brand Personality:</span>
                <span className="font-bold text-coffee-800">Educated, Precise, Consistent, Technical</span>
              </div>
              <div className="flex items-center justify-between border-b border-coffee-900/5 pb-2">
                <span className="text-coffee-500">Brand Keywords:</span>
                <span className="text-coffee-700 font-semibold">Roastery • Precision • Education • Craft</span>
              </div>
              <div className="flex items-center justify-between border-b border-coffee-900/5 pb-2">
                <span className="text-coffee-500">Demographic Tier:</span>
                <span className="font-medium text-coffee-800">24–40 (Older Enthusiasts, Coffee Purists)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-coffee-500">Motion Style:</span>
                <span className="text-coffee-500 font-semibold">Slow, Educational, Process-first</span>
              </div>
            </div>
          </div>

        </div>

        {/* Feature win analysis details */}
        <div className="bg-white border border-coffee-200 rounded-2xl overflow-hidden p-5">
          <h4 className="text-xs font-bold text-coffee-900 mb-3 flex items-center gap-1">
            <Layers className="h-4 w-4 text-accent-amber" />
            <span>Interactive Win-Vector Drill Down</span>
          </h4>
          <div className="overflow-x-auto text-xs">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr className="border-b border-coffee-200 text-[10px] uppercase text-coffee-400 font-mono">
                  <th className="py-2 text-left">Vector Dimension</th>
                  <th className="py-2 text-left">Brew Inn Strategy</th>
                  <th className="py-2 text-left">Blue Tokai Strategy</th>
                  <th className="py-2 text-left">Winner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-coffee-100">
                {comparisonItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-coffee-50/50">
                    <td className="py-3 font-bold text-coffee-900">{item.feature}</td>
                    <td className="py-3 text-coffee-600">{item.brewInn}</td>
                    <td className="py-3 text-coffee-600">{item.blueTokai}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.winner === 'Brew Inn' 
                          ? 'bg-amber-100 text-amber-800' 
                          : item.winner === 'Blue Tokai' 
                          ? 'bg-stone-100 text-stone-700' 
                          : 'bg-coffee-100 text-coffee-700'
                      }`}>
                        {item.winner}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* SECTION 3 & 4: TARGET AUDIENCE PSYCHOGRAPHICS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        
        {/* Left segment specs */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
          <div>
            <span className="text-[11px] font-mono font-bold text-coffee-600 block">SECTION 03 & 04 — DEMOGRAPHICS</span>
            <h3 className="font-display text-xl font-extrabold text-coffee-900">Demographics & Insights</h3>
            <p className="text-xs text-coffee-600 mt-2 leading-relaxed">
              Brew Inn primarily focuses on active, mobile-first students and creators with high-frequency social lifestyles looking for reward moments.
            </p>
          </div>

          <div className="bg-white border border-coffee-200 p-5 rounded-2xl relative overflow-hidden">
            <h4 className="text-xs font-bold text-coffee-900 mb-2">Primary Segment (18–30)</h4>
            <div className="space-y-2 text-xs">
              <p className="text-coffee-600">Students, young startup professionals, and casual creators in Mumbai Core.</p>
              <div className="flex items-center justify-between border-t border-coffee-100 pt-2">
                <span className="text-coffee-400">Order Spend:</span>
                <span className="font-bold font-mono">₹150 – ₹350 Avg</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-coffee-400">Interacts:</span>
                <span className="font-bold text-amber-700">Instagram, Cafe Hopping</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-coffee-400">Values:</span>
                <span className="font-bold">Affordability, Self-Expression</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-coffee-200 p-5 rounded-2xl relative overflow-hidden">
            <h4 className="text-xs font-bold text-coffee-900 mb-2">Secondary Segment (30–40)</h4>
            <div className="space-y-2 text-xs">
              <p className="text-coffee-600">Remote workers, creative directors, and casual workspace seekers.</p>
              <div className="flex items-center justify-between border-t border-coffee-100 pt-2">
                <span className="text-coffee-400">Main Focus:</span>
                <span className="font-bold text-coffee-800">WiFi speed, comfort, table space</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-coffee-400">Triggers:</span>
                <span className="font-bold">Repeat work sessions, quiet evenings</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right slider customer personas */}
        <div className="lg:col-span-8 bg-white border border-coffee-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-coffee-100 pb-3 mb-4">
              <div>
                <span className="text-[10px] font-mono text-coffee-400 block font-bold uppercase">SECTION 06 — STRATEGIC PERSONAS</span>
                <h4 className="text-sm font-bold text-coffee-900">Interactive Persona Browser</h4>
              </div>

              {/* Persona navigation buttons */}
              <div className="flex items-center space-x-1.5">
                {BRAND_PERSONAS.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setActivePersonaIdx(idx)}
                    className={`h-7 px-3 rounded-full text-[10px] font-bold ${
                      idx === activePersonaIdx 
                        ? 'bg-coffee-900 text-white' 
                        : 'bg-coffee-100 text-coffee-700 hover:bg-coffee-200'
                    }`}
                  >
                    Persona {p.num}
                  </button>
                ))}
              </div>
            </div>

            {/* Persona card presentation animation */}
            <AnimatePresence mode="wait">
              {BRAND_PERSONAS.map((persona: BrandPersona, index: number) => {
                if (index !== activePersonaIdx) return null;
                return (
                  <motion.div
                    key={persona.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-6"
                  >
                    
                    {/* Persona portrait */}
                    <div className="md:col-span-4 flex flex-col items-center text-center">
                      <img 
                        src={persona.avatarUrl} 
                        alt={persona.name} 
                        className="h-20 w-20 rounded-full object-cover border-2 border-accent-amber mb-3 bg-coffee-100 shadow" 
                        referrerPolicy="no-referrer"
                      />
                      <h5 className="font-display text-sm font-bold text-coffee-900 leading-tight">{persona.name}</h5>
                      <span className="text-[10px] text-coffee-500">{persona.role} • Age {persona.age}</span>
                      
                      <div className="mt-4 bg-coffee-50 p-2 rounded-xl text-[10px] text-coffee-600 italic">
                        "{persona.tagline}"
                      </div>
                    </div>

                    {/* Persona details */}
                    <div className="md:col-span-8 space-y-3.5 text-xs text-coffee-700">
                      <div>
                        <span className="font-bold text-coffee-900 block font-mono text-[9px] uppercase tracking-wider">Demographic Goal</span>
                        <p className="mt-0.5 leading-relaxed text-coffee-600">{persona.goal}</p>
                      </div>

                      <div className="border-t border-coffee-100 pt-2">
                        <span className="font-bold text-red-600 block font-mono text-[9px] uppercase tracking-wider">Pain Points with Competitors</span>
                        <p className="mt-0.5 leading-relaxed text-coffee-600">{persona.painPoint}</p>
                      </div>

                      <div className="border-t border-coffee-100 pt-2 bg-amber-500/5 p-2.5 rounded-lg border border-amber-500/10">
                        <span className="font-bold text-accent-amber block font-mono text-[9px] uppercase tracking-wider">Brew Inn Solution Mapping</span>
                        <p className="mt-0.5 leading-relaxed text-coffee-800 font-medium">{persona.brewInnSolution}</p>
                      </div>

                      <div className="pt-1.5 flex flex-wrap items-center gap-1.5">
                        <span className="text-[9px] font-mono uppercase text-coffee-400">Fav Drinks:</span>
                        {persona.preferredDrinks.map((dr, dIdx) => (
                          <span key={dIdx} className="bg-coffee-900/10 text-coffee-800 rounded font-semibold text-[10px] px-2 py-0.5">
                            {dr}
                          </span>
                        ))}
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>

          </div>

          <div className="border-t border-coffee-100 pt-4 mt-6 text-[10.5px] text-coffee-500 text-center">
            Emotional Need: <b className="text-coffee-800">“I want a premium looking Cafe escape without the financial and social pressure.”</b>
          </div>
        </div>

      </div>

      {/* SECTION 5: INTERACTIVE ASMR CONTENT REEL SIMULATOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        
        {/* Left Control descriptors */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <span className="text-[11px] font-mono font-bold text-coffee-600 block">SECTION 05 — ANIMATION PSYCHOGRAPHY</span>
            <h3 className="font-display text-xl font-extrabold text-coffee-900">ASMR Reels Studio</h3>
            <p className="text-xs text-coffee-600 mt-2 leading-relaxed">
              Brew Inn Cafe markets through <b>high energy, fast cuts, smooth pours, closeups and lifestyle ASMR</b> audio. 
              Contrast this with Blue Tokai's slow, educational focus. Click themes below to preview content recipes:
            </p>
          </div>

          {/* Theme selectors */}
          <div className="space-y-2">
            {(['drinks', 'lifestyle', 'community', 'offers'] as const).map((theme) => {
              const active = theme === reelTheme;
              const meta = reelThemesData[theme];
              return (
                <button
                  key={theme}
                  onClick={() => {
                    setReelTheme(theme);
                    setIsPlayingReel(true);
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex justify-between items-center ${
                    active 
                      ? 'bg-coffee-900 border-coffee-800 text-white shadow-md' 
                      : 'bg-white border-coffee-200 text-coffee-700 hover:bg-coffee-100'
                  }`}
                >
                  <div>
                    <h5 className="text-xs font-bold capitalize">{theme} Theme</h5>
                    <p className={`text-[10px] ${active ? 'text-coffee-300' : 'text-coffee-500'}`}>{meta.title}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                    active ? 'bg-accent-amber text-white' : 'bg-coffee-100 text-coffee-700'
                  }`}>
                    {meta.percentage}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Cinematic Slo-mo controller */}
          <div className="bg-white border border-coffee-200 p-4 rounded-xl">
            <div className="flex items-center justify-between text-xs font-bold text-coffee-800 mb-1">
              <span>Cinematic Slow-Motion:</span>
              <span className="font-mono text-accent-amber font-bold">{cinematicSpeed}x speed</span>
            </div>
            <input 
              type="range"
              min="0.5"
              max="2"
              step="0.25"
              value={cinematicSpeed}
              onChange={(e) => setCinematicSpeed(parseFloat(e.target.value))}
              className="w-full accent-accent-amber"
            />
            <p className="text-[10px] text-coffee-400 mt-1 leading-snug">
              Adjust slow-mo factor to stretch or speed up the overlay keyframes matching the ASMR tempo.
            </p>
          </div>

          <div className="p-3 bg-amber-500/5 rounded-xl border border-accent-amber/20 text-[11px] text-coffee-700 flex items-start gap-2">
            <Volume2 className="h-4 w-4 text-accent-amber shrink-0 mt-0.5" />
            <div>
              <b>Audio Focus:</b> Clean high-fidelity sounds over standard corporate voiceovers. Click <b>"Hear Description"</b> inside the smartphone skeleton!
            </div>
          </div>
        </div>

        {/* Right Smartphone Simulator */}
        <div className="lg:col-span-7 flex justify-center">
          
          <div className="relative w-full max-w-[320px] rounded-[36px] border-8 border-stone-800 bg-stone-950 p-2 shadow-2xl overflow-hidden aspect-[9/16] flex flex-col justify-between">
            
            {/* Phone speaker mesh notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 h-4 w-28 bg-stone-800 rounded-full z-30 flex items-center justify-center">
              <span className="h-1 w-8 bg-stone-550 rounded-full"></span>
            </div>

            {/* Video Canvas screen */}
            <div className={`absolute inset-0 bg-gradient-to-b ${activeReelData.visualPlaceholderGradient} flex flex-col justify-end p-4 pb-6`}>
              
              {/* Play symbol pulse water overlay represent */}
              <div className="absolute inset-x-0 top-16 bottom-24 flex flex-col items-center justify-center p-6 text-center text-white">
                <motion.div 
                  animate={isPlayingReel ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  onClick={() => setIsPlayingReel(!isPlayingReel)}
                  className="h-14 w-14 rounded-full bg-black/45 backdrop-blur-sm border border-white/20 flex items-center justify-center cursor-pointer hover:bg-black/60 shadow"
                >
                  <Play className="h-6 w-6 fill-current text-white ml-0.5" />
                </motion.div>
                <span className="text-[9px] uppercase tracking-widest text-coffee-200 mt-2 font-mono">ASMR reels loop</span>
                <span className="text-[10px] font-bold text-white mt-1 leading-snug italic px-4">
                  "{activeReelData.description}"
                </span>
              </div>

              {/* Live Overlay tags and caption details */}
              <div className="relative z-10 space-y-2 select-none">
                
                {/* Playing ASMR dynamic subtitles */}
                <div className="bg-black/40 backdrop-blur-md rounded-lg p-2.5 border border-white/10">
                  <span className="text-[8px] font-mono text-accent-amber block uppercase font-bold tracking-widest">ASMR Subtitles</span>
                  <motion.p 
                    animate={isPlayingReel ? { opacity: [0.6, 1, 0.6] } : {}}
                    transition={{ repeat: Infinity, duration: activeReelData.animationDuration }}
                    className="text-[11px] text-white font-medium"
                  >
                    {activeReelData.caption}
                  </motion.p>
                </div>

                {/* Simulated metadata labels */}
                <div className="space-y-1 text-white">
                  <div className="flex items-center space-x-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping"></span>
                    <span className="text-[9px] font-bold tracking-widest uppercase text-coffee-200">Reel Length: {activeReelData.animationDuration}s</span>
                  </div>
                  <p className="text-[10px] text-coffee-200 truncate">{activeReelData.music}</p>
                </div>

                {/* Direct audio simulator trigger inside phone */}
                <button
                  type="button"
                  onClick={handlePlaySound}
                  className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg py-1.5 text-center text-[10px] font-bold text-white transition-all flex items-center justify-center space-x-1"
                >
                  <Volume2 className="h-3 w-3" />
                  <span>Hear Sound Description</span>
                </button>

                <p className="text-[9px] text-stone-300 text-center italic">{asmrAudioText}</p>

              </div>
            </div>

            {/* Simulated smartphone bottom bar */}
            <div className="relative z-20 h-1.5 w-24 bg-stone-700 rounded-full mx-auto self-end mb-1"></div>

          </div>
          
        </div>

      </div>

      {/* SECTION 7: SWOT ANALYSIS PLANNER & STICKY NOTE BOARD */}
      <div id="swot-board" className="mb-10 bg-white border border-coffee-200 rounded-3xl p-6 shadow-sm">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-coffee-100 pb-4">
          <div>
            <span className="text-[11px] font-mono font-bold text-coffee-600 block">SECTION 07 — STRATEGIC SWOT SANDBOX</span>
            <h3 className="font-display text-xl font-extrabold text-coffee-900">SWOT Analysis Board</h3>
            <p className="text-xs text-coffee-600 mt-1">
              Add custom sticky notes onto the grid to brainstorm hyperlocal community pivots or defend catalog positions.
            </p>
          </div>
          
          {/* Add custom note quick trigger */}
          <form onSubmit={handleAddSticky} className="flex flex-wrap gap-2">
            <input 
              type="text"
              required
              placeholder="Type strategy note..."
              value={newStickyText}
              onChange={(e) => setNewStickyText(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-xl border border-coffee-200 focus:outline-none"
            />
            
            <select
              value={newStickyCategory}
              onChange={(e) => setNewStickyCategory(e.target.value as any)}
              className="px-2 py-1.5 text-xs rounded-xl border border-coffee-200 bg-white"
            >
              <option value="strengths">Strength</option>
              <option value="weaknesses">Weakness</option>
              <option value="opportunities">Opportunity</option>
              <option value="threats">Threat</option>
            </select>

            <button
              type="submit"
              className="bg-coffee-900 text-white rounded-xl px-3 py-1.5 text-xs font-bold flex items-center space-x-1 hover:bg-accent-amber transition"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Stick Note</span>
            </button>
          </form>
        </div>

        {/* SWOT GRID BOX */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* STRENGTHS */}
          <div className="bg-emerald-50/40 p-5 rounded-2xl border border-emerald-100 min-h-[220px] flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-emerald-900 uppercase font-mono tracking-wide border-b border-emerald-100 pb-2 mb-3 flex items-center justify-between">
                <span>🟢 Strengths</span>
                <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Core Assets</span>
              </h4>
              <ul className="space-y-2 text-xs text-emerald-850">
                {SWOT_ANALYSIS.strengths.map((str, i) => (
                  <li key={i} className="leading-relaxed">
                    <b>{str.title}:</b> {str.desc}
                  </li>
                ))}
              </ul>
            </div>

            {/* Custom Strengths Stickies */}
            <div className="mt-4 pt-3 border-t border-emerald-100 grid grid-cols-1 gap-1.5">
              {swotStickies.filter(s => s.category === 'strengths').map(s => (
                <div key={s.id} className="bg-emerald-100/60 p-2 rounded-lg text-emerald-900 text-[11px] flex justify-between items-center shadow-xs">
                  <span>📌 {s.text} <b className="text-[9px] opacity-70">({s.author})</b></span>
                  <button onClick={() => handleDeleteSticky(s.id)} className="text-emerald-700 hover:text-red-600"><Trash2 className="h-3 w-3" /></button>
                </div>
              ))}
            </div>
          </div>

          {/* WEAKNESSES */}
          <div className="bg-yellow-50/40 p-5 rounded-2xl border border-yellow-200/50 min-h-[220px] flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-amber-900 uppercase font-mono tracking-wide border-b border-yellow-200/50 pb-2 mb-3 flex items-center justify-between">
                <span>🟡 Weaknesses</span>
                <span className="text-[9px] font-bold text-amber-700 bg-yellow-100 px-2 py-0.5 rounded">Defense gaps</span>
              </h4>
              <ul className="space-y-2 text-xs text-yellow-850">
                {SWOT_ANALYSIS.weaknesses.map((w, i) => (
                  <li key={i} className="leading-relaxed">
                    <b>{w.title}:</b> {w.desc}
                  </li>
                ))}
              </ul>
            </div>

            {/* Custom Weaknesses Stickies */}
            <div className="mt-4 pt-3 border-t border-yellow-200/50 grid grid-cols-1 gap-1.5">
              {swotStickies.filter(s => s.category === 'weaknesses').map(s => (
                <div key={s.id} className="bg-yellow-100/60 p-2 rounded-lg text-amber-900 text-[11px] flex justify-between items-center shadow-xs">
                  <span>📌 {s.text} <b className="text-[9px] opacity-70">({s.author})</b></span>
                  <button onClick={() => handleDeleteSticky(s.id)} className="text-amber-700 hover:text-red-600"><Trash2 className="h-3 w-3" /></button>
                </div>
              ))}
            </div>
          </div>

          {/* OPPORTUNITIES */}
          <div className="bg-blue-50/40 p-5 rounded-2xl border border-blue-100 min-h-[220px] flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-blue-900 uppercase font-mono tracking-wide border-b border-blue-100 pb-2 mb-3 flex items-center justify-between">
                <span>🔵 Opportunities</span>
                <span className="text-[9px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">Growth Paths</span>
              </h4>
              <ul className="space-y-2 text-xs text-blue-850">
                {SWOT_ANALYSIS.opportunities.map((o, i) => (
                  <li key={i} className="leading-relaxed">
                    <b>{o.title}:</b> {o.desc}
                  </li>
                ))}
              </ul>
            </div>

            {/* Custom Opportunities Stickies */}
            <div className="mt-4 pt-3 border-t border-blue-100 grid grid-cols-1 gap-1.5">
              {swotStickies.filter(s => s.category === 'opportunities').map(s => (
                <div key={s.id} className="bg-blue-100/60 p-2 rounded-lg text-blue-900 text-[11px] flex justify-between items-center shadow-xs">
                  <span>📌 {s.text} <b className="text-[9px] opacity-70">({s.author})</b></span>
                  <button onClick={() => handleDeleteSticky(s.id)} className="text-blue-700 hover:text-red-600"><Trash2 className="h-3 w-3" /></button>
                </div>
              ))}
            </div>
          </div>

          {/* THREATS */}
          <div className="bg-red-50/40 p-5 rounded-2xl border border-red-100 min-h-[220px] flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-red-900 uppercase font-mono tracking-wide border-b border-red-100 pb-2 mb-3 flex items-center justify-between">
                <span>🔴 Threats</span>
                <span className="text-[9px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">Market Risk</span>
              </h4>
              <ul className="space-y-2 text-xs text-red-850">
                {SWOT_ANALYSIS.threats.map((t, i) => (
                  <li key={i} className="leading-relaxed">
                    <b>{t.title}:</b> {t.desc}
                  </li>
                ))}
              </ul>
            </div>

            {/* Custom Threats Stickies */}
            <div className="mt-4 pt-3 border-t border-red-100 grid grid-cols-1 gap-1.5">
              {swotStickies.filter(s => s.category === 'threats').map(s => (
                <div key={s.id} className="bg-red-100/60 p-2 rounded-lg text-red-900 text-[11px] flex justify-between items-center shadow-xs">
                  <span>📌 {s.text} <b className="text-[9px] opacity-70">({s.author})</b></span>
                  <button onClick={() => handleDeleteSticky(s.id)} className="text-red-700 hover:text-red-600"><Trash2 className="h-3 w-3" /></button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* SECTION 9: KPI DASHBOARD & PROGRESSIVE RECHARTS CHARTS */}
      <div className="mb-10">
        <div className="mb-6">
          <span className="text-[11px] font-mono font-bold text-coffee-600 block">SECTION 09 — KPI TRACKER</span>
          <h3 className="font-display text-xl font-extrabold text-coffee-900">Performance Metrics & Interactive Simulator</h3>
          <p className="text-xs text-coffee-600">
            Real time progress demonstrating Brew Inn target metrics: <b>Retention &gt; 35%, Instagram Save Rate &gt; 8%, Website Conversion &gt; 4%</b>.
          </p>
        </div>

        {/* CHARTS CAROUSEL LIST */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {KPI_METRICS.slice(0, 3).map((kpi) => (
            <div key={kpi.id} className="bg-white p-5 rounded-2xl border border-coffee-200 flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-mono font-bold text-coffee-400 block uppercase">KPI Tracker</span>
                <h4 className="text-xs font-bold text-coffee-950 mt-1">{kpi.name}</h4>
                
                {/* Value statistics */}
                <div className="mt-2.5 flex items-baseline gap-1.5">
                  <span className="font-mono text-2xl font-extrabold text-coffee-900">{kpi.value}{kpi.unit === '%' ? '%' : ''}</span>
                  <span className="text-[10px] text-accent-green font-bold bg-green-50 px-2 py-0.5 rounded">Target: {kpi.target}</span>
                </div>
                
                <p className="mt-2 text-[11px] text-coffee-500 leading-snug">
                  {kpi.description}
                </p>
              </div>

              {/* Sparkline chart of history */}
              <div className="mt-4 h-24 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={kpi.historicalData} margin={{ left: 0, right: 0, top: 5, bottom: 5 }}>
                    <defs>
                      <linearGradient id={`grad-${kpi.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#d4a773" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#d4a773" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" tick={{ fontSize: 9 }} stroke="#a17042" axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ fontSize: 10, background: '#2a1608', color: '#fff', borderRadius: 8 }} />
                    <Area type="monotone" dataKey="value" stroke="#b47f43" strokeWidth={1.8} fillOpacity={1} fill={`url(#grad-${kpi.id})`} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>

        {/* THE KPI INTERACTIVE SIMULATOR CARD */}
        <div className="bg-coffee-900 text-white rounded-3xl p-6 sm:p-8 border border-coffee-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-accent-orange opacity-5 blur-3xl"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Play sliders */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-accent-amber font-bold">FOUNDER SCENARIO PLAYBOOK</span>
                <h4 className="text-base font-bold text-white font-display mt-1">Growth & Conversions Forecaster</h4>
                <p className="text-xs text-coffee-300 mt-1">
                  Drag the sliders below to simulate local loyalty programs, content marketing reach, and paid outreach budgets. See the derived outcome projection.
                </p>
              </div>

              {/* Slider 1 */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5 text-coffee-200">
                  <span>Loyalty Program Retention Effort:</span>
                  <span className="text-accent-amber font-bold">{simRetentionBoost}% Retention</span>
                </div>
                <input 
                  type="range"
                  min="20"
                  max="60"
                  value={simRetentionBoost}
                  onChange={(e) => setSimRetentionBoost(parseInt(e.target.value))}
                  className="w-full accent-accent-amber"
                />
                <div className="flex justify-between text-[9px] text-coffee-400">
                  <span>20% (Stale)</span>
                  <span>Target: &gt; 35%</span>
                  <span>60% (Maximum Fanaticism)</span>
                </div>
              </div>

              {/* Slider 2 */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5 text-coffee-200">
                  <span>Instagram Save/Share Conversion Rate:</span>
                  <span className="text-accent-amber font-bold">{simInstagramSaveBoost}% Interactions</span>
                </div>
                <input 
                  type="range"
                  min="4"
                  max="16"
                  value={simInstagramSaveBoost}
                  onChange={(e) => setSimInstagramSaveBoost(parseInt(e.target.value))}
                  className="w-full accent-accent-amber"
                />
                <div className="flex justify-between text-[9px] text-coffee-400">
                  <span>4% (Generic)</span>
                  <span>Target: &gt; 8%</span>
                  <span>16% (Viral ASMR Sensation)</span>
                </div>
              </div>

              {/* Slider 3 */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5 text-coffee-200">
                  <span>Hyperlocal Paid Ad Spend (Mumbai College Zones):</span>
                  <span className="text-accent-amber font-bold">₹{simOutreachBudgetValue.toLocaleString()} monthly</span>
                </div>
                <input 
                  type="range"
                  min="5000"
                  max="80000"
                  step="5000"
                  value={simOutreachBudgetValue}
                  onChange={(e) => setSimOutreachBudgetValue(parseInt(e.target.value))}
                  className="w-full accent-accent-amber"
                />
                <div className="flex justify-between text-[9px] text-coffee-400">
                  <span>₹5,000</span>
                  <span>Optimal: ₹20k - ₹40k</span>
                  <span>₹80,000 max</span>
                </div>
              </div>

            </div>

            {/* Derived Projection Box */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 text-center space-y-4">
              <span className="inline-block bg-accent-amber text-coffee-950 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                Derived Live Projections
              </span>
              
              <div>
                <span className="text-[10px] text-coffee-300 block uppercase font-mono">Simulated Web Conversion</span>
                <span className="font-mono text-3xl font-extrabold text-white mt-1 block">
                  {projectedWeeklyConversion}%
                </span>
                <p className="text-[10px] text-coffee-400 leading-none mt-1">Target is &gt; 4% website conversion</p>
              </div>

              <div className="border-t border-white/10 pt-4">
                <span className="text-[10px] text-coffee-300 block uppercase font-mono">Projected Monthly Revenue</span>
                <span className="font-mono text-2xl font-extrabold text-accent-green mt-1 block">
                  ₹{projectedMonthlyRevenueVal.toLocaleString()}
                </span>
                <p className="text-[9px] text-coffee-400 leading-none mt-1">Based on retention, viral reach, and zone footfalls</p>
              </div>

              <div className="pt-2">
                <span className="inline-flex items-center text-[10px] text-accent-amber bg-accent-amber/10 border border-accent-amber/20 px-2 py-1 rounded">
                  <Flame className="h-3.5 w-3.5 mr-1" />
                  <span>Agile culture scales faster than specialty lectures!</span>
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* FOOTER STRATEGY ACCENT */}
      <div className="text-center text-xs text-coffee-500 py-6 border-t border-coffee-200 mt-12 bg-white rounded-2xl p-4">
        <p className="font-mono text-[10px] tracking-widest uppercase">© BREW INN BRAND ADVISORY REPORT</p>
        <p className="mt-1">"The major capability of server-side Gemini intelligence advises to maintain current pricing integrity (average check ₹150–₹350) to retain maximum Gen Z recurring volume."</p>
      </div>

    </div>
  );
}
