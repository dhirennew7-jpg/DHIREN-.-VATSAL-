import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, Search, Star, MapPin, Send, MessageCircle, Gift, 
  Users, Calendar, Sparkles, Check, ChevronRight, Eye, RefreshCw, X, Heart,
  Play, Pause, Flame, RotateCcw, Volume2, Coffee, Gauge
} from 'lucide-react';
import { MenuItem, CartItem, UserReview } from '../types';
import { MENU_ITEMS, USER_REVIEWS } from '../data';

interface ConsumerSiteProps {
  onAddToBag: (item: MenuItem, customization: { size: 'Regular' | 'Grande', milkOption: string, sweetnessOption: string }) => void;
  openCart: () => void;
  scrollToSection: string;
}

const DRIP_VIDEOS = [
  {
    name: 'Latte Art Pour',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-barista-pouring-milk-into-a-hot-coffee-cup-39906-large.mp4',
    desc: 'Intricate micro-foam milk pour art'
  },
  {
    name: 'Espresso Extraction',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-dripping-espresso-from-a-coffee-machine-coffee-maker-41566-large.mp4',
    desc: 'Thick golden hazelnut extraction'
  },
  {
    name: 'Pour-Over Craft',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-coffee-brewing-in-a-glass-chemex-pot-for-barista-43093-large.mp4',
    desc: 'Slow-drip clarity with Chemex'
  }
];

export default function ConsumerSite({ onAddToBag, openCart, scrollToSection }: ConsumerSiteProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  
  // Interactive brewing video index
  const [activeVideoIndex, setActiveVideoIndex] = useState<number>(0);
  
  // Cinema video flow
  const cinemaVideoRef = useRef<HTMLVideoElement | null>(null);
  const [cinemaSpeed, setCinemaSpeed] = useState<number>(1.0);
  
  // Virtual Brew simulator states
  const [brewRecipe, setBrewRecipe] = useState<'Espresso' | 'Lavender Pour Over' | 'Pistachio Cloud Latte'>('Espresso');
  const [brewStep, setBrewStep] = useState<number>(0); // 0: Start, 1: Grinding, 2: Heating, 3: Extracting, 4: Done!
  const [grindPercent, setGrindPercent] = useState<number>(0);
  const [tempHeat, setTempHeat] = useState<number>(75);
  const [tempSuccess, setTempSuccess] = useState<boolean | null>(null);
  const [extractProgress, setExtractProgress] = useState<number>(0);
  const [isTempRunning, setIsTempRunning] = useState<boolean>(false);
  
  // Customization choices
  const [chosenSize, setChosenSize] = useState<'Regular' | 'Grande'>('Regular');
  const [chosenMilk, setChosenMilk] = useState<string>('Oat Milk');
  const [chosenSweetness, setChosenSweetness] = useState<string>('Natural Sweet');

  // Loyalty System state
  const [loyaltyEmail, setLoyaltyEmail] = useState<string>('');
  const [loyaltyAccount, setLoyaltyAccount] = useState<{ email: string; points: number; tier: string; referrals: string[] } | null>(null);
  const [referralName, setReferralName] = useState<string>('');
  const [referralSuccess, setReferralSuccess] = useState<boolean>(false);
  const [isJoinedLoyalty, setIsJoinedLoyalty] = useState<boolean>(false);

  // Newsletter
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<boolean>(false);

  // Filter items
  const filteredMenuItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  // Categories simple list
  const categories = ['All', 'Coffee', 'Cold Coffee', 'Signature Drinks', 'Bowls', 'Desserts'];

  // Handle opening customizer
  const handleOpenCustomizer = (item: MenuItem) => {
    setCustomizingItem(item);
    // Reset defaults
    setChosenSize('Regular');
    setChosenMilk(item.category === 'Bowls' || item.category === 'Desserts' ? 'No Milk' : 'Standard Creamy');
    setChosenSweetness('Natural Sweet');
  };

  // Add customized item to bag
  const handleConfirmCustomization = () => {
    if (customizingItem) {
      onAddToBag(customizingItem, {
        size: chosenSize,
        milkOption: chosenMilk,
        sweetnessOption: chosenSweetness
      });
      setCustomizingItem(null);
    }
  };

  // Handle Loyalty join
  const handleLoyaltyLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loyaltyEmail) return;

    // Simulate an account
    setLoyaltyAccount({
      email: loyaltyEmail,
      points: 150,
      tier: 'Gold Discoverer',
      referrals: ['arjun_v@live.com', 'tanvi.sen@outlook.com']
    });
    setIsJoinedLoyalty(true);
    setReferralSuccess(false);
  };

  // Handle Referral
  const handleAddReferral = (e: React.FormEvent) => {
    e.preventDefault();
    if (!referralName || !loyaltyAccount) return;

    // Award points
    setLoyaltyAccount(prev => {
      if (!prev) return null;
      return {
        ...prev,
        points: prev.points + 50,
        referrals: [...prev.referrals, `${referralName.toLowerCase().replace(/\s+/g, '')}@gmail.com`]
      };
    });
    setReferralName('');
    setReferralSuccess(true);
    setTimeout(() => setReferralSuccess(false), 4000);
  };

  // Handle Newsletter subscribe
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubscribed(false), 5000);
    }
  };

  // Virtual Brew Bar Sim Handlers
  const handleSetCinemaSpeed = (speed: number) => {
    setCinemaSpeed(speed);
    if (cinemaVideoRef.current) {
      cinemaVideoRef.current.playbackRate = speed;
    }
  };

  const tempIntervalRef = useRef<any>(null);

  const triggerGrindTick = () => {
    setGrindPercent(prev => {
      const next = prev + 15;
      if (next >= 100) {
        setBrewStep(1); // Go to heating water (Step 1)
        startHeating();
        return 100;
      }
      return next;
    });
  };

  const startHeating = () => {
    setIsTempRunning(true);
    setTempHeat(60);
    setTempSuccess(null);
    
    if (tempIntervalRef.current) clearInterval(tempIntervalRef.current);
    
    tempIntervalRef.current = setInterval(() => {
      setTempHeat(prev => {
        if (prev >= 110) {
          if (tempIntervalRef.current) clearInterval(tempIntervalRef.current);
          setIsTempRunning(false);
          setTempSuccess(false);
          setBrewStep(2); // Go to extraction (Step 2)
          triggerExtraction();
          return 110;
        }
        return prev + 2;
      });
    }, 120);
  };

  const latchTemperature = () => {
    if (tempIntervalRef.current) {
      clearInterval(tempIntervalRef.current);
    }
    setIsTempRunning(false);
    
    // Check if within 91-97 ideal zone
    const isIdeal = tempHeat >= 91 && tempHeat <= 97;
    setTempSuccess(isIdeal);
    setBrewStep(2); // Go to extraction (Step 2)
    triggerExtraction();
  };

  const triggerExtraction = () => {
    setExtractProgress(0);
    let current = 0;
    const interval = setInterval(() => {
      current += 10;
      setExtractProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setBrewStep(3); // Go to complete/done (Step 3)
      }
    }, 200);
  };

  const resetBrewSimulator = () => {
    if (tempIntervalRef.current) {
      clearInterval(tempIntervalRef.current);
    }
    setBrewStep(0);
    setGrindPercent(0);
    setTempHeat(75);
    setTempSuccess(null);
    setExtractProgress(0);
    setIsTempRunning(false);
  };

  // Quick jump helper
  const handleScrollToMenu = () => {
    const el = document.getElementById('menu-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToLoyalty = () => {
    const el = document.getElementById('loyalty-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative">
      
      {/* 1. HERO SECTION WITH EDITORIAL THEME */}
      <section className="relative overflow-hidden bg-[#FDFBF7] text-coffee-900 py-16 lg:py-24 px-4 sm:px-8 lg:px-12 border-b border-coffee-900/10">
        
        {/* Ambient background accent subtle hints */}
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-accent-amber/5 blur-3xl pointer-events-none"></div>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Branding Column (7 cols wide) */}
            <div className="flex flex-col justify-center lg:col-span-7 relative z-10 text-left">
              <div className="mb-4 inline-block">
                <span className="px-3.5 py-1 border border-coffee-900 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-coffee-900">
                  Affordable Premium
                </span>
              </div>
              
              <h2 className="text-[54px] sm:text-[76px] lg:text-[102px] leading-[0.85] font-serif italic mb-8 -ml-1 text-coffee-900">
                Your Daily<br/>
                <span className="not-italic font-sans font-black uppercase tracking-tighter text-coffee-950 block sm:inline">Coffee Escape</span>
              </h2>
              
              <p className="text-base sm:text-lg max-w-md leading-relaxed text-coffee-900/85">
                Welcome to your daily ritual. We deliver creative coffee experiences in a welcoming lifestyle space designed for the urban explorer.
              </p>

              {/* Tagline descriptors from PRD */}
              <div className="mt-6 flex flex-wrap gap-2">
                {['Everyday Café Lifestyle', 'Gen Z Discovery', 'No Intimidation'].map((tag, idx) => (
                  <span key={idx} className="bg-coffee-200/50 text-coffee-800 border border-coffee-900/5 rounded-full px-3 py-1 text-xs font-semibold">
                    # {tag}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleScrollToMenu}
                  id="hero-order-now"
                  className="bg-coffee-900 text-white px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-accent-amber transition-colors shadow-xs transform active:scale-95"
                >
                  View Our Menu
                </button>
                <button
                  onClick={handleScrollToLoyalty}
                  id="hero-join-loyalty"
                  className="border border-coffee-900 text-coffee-900 px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-coffee-900 hover:text-white transition-all transform active:scale-95"
                >
                  Join Rewards
                </button>
              </div>

              {/* Stats Counters corresponding with design HTML */}
              <div className="mt-16 grid grid-cols-3 gap-6 sm:gap-8 border-t border-coffee-900/10 pt-8 max-w-md">
                <div>
                  <div className="text-2xl sm:text-3xl font-serif italic mb-1 text-coffee-900">₹220</div>
                  <div className="text-[9px] sm:text-[10px] font-bold uppercase opacity-60 tracking-tight text-coffee-850">Avg. Order Value</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-serif italic mb-1 text-coffee-900">08</div>
                  <div className="text-[9px] sm:text-[10px] font-bold uppercase opacity-60 tracking-tight text-coffee-850">Mumbai Outlets</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-serif italic mb-1 text-coffee-900">15k+</div>
                  <div className="text-[9px] sm:text-[10px] font-bold uppercase opacity-60 tracking-tight text-coffee-850">Club Members</div>
                </div>
              </div>
            </div>

            {/* Right Visual Column (5 cols wide) */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="relative mx-auto w-full max-w-sm rounded-[40px] lg:rounded-[60px] overflow-hidden bg-coffee-200/60 p-8 sm:p-10 border border-coffee-900/5 shadow-xs">
                
                {/* Abstract Visual Box wrapper with live high-definition coffee video inside */}
                <div className="w-full aspect-[3/4] bg-[#2C1B18] rounded-[30px] lg:rounded-[50px] relative overflow-hidden shadow-2xl">
                  {/* High Quality baristas coffee brewing video */}
                  <video 
                    key={activeVideoIndex}
                    src={DRIP_VIDEOS[activeVideoIndex].src}
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-700 hover:scale-105"
                  />
                  
                  {/* Content overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-coffee-950 via-coffee-900/20 to-transparent"></div>
                  
                  {/* Rating Stars */}
                  <div className="absolute top-6 left-6 bg-white/95 text-coffee-950 text-[9px] font-bold tracking-widest px-3 py-1 rounded-full shadow-sm flex items-center space-x-1 border border-coffee-900/5">
                    <span className="h-2 w-2 rounded-full bg-accent-green animate-pulse"></span>
                    <span>LIVE ARTISAN LAB</span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 text-left">
                    <div className="text-white font-serif text-xl sm:text-2xl italic leading-tight">
                      "Crafting daily escapes, one pour at a time."
                    </div>
                    <div className="text-accent-amber text-[9px] font-extrabold uppercase tracking-widest mt-2">
                      — BARISTA THEATRE LIVE
                    </div>
                  </div>
                </div>

                {/* Video Scene Controller Selector */}
                <div className="mt-5 relative z-10 flex flex-col gap-2">
                  <div className="text-[9px] uppercase tracking-widest font-black text-coffee-900/60 flex items-center justify-between px-1">
                    <span>Barista Brew Loop Toggle</span>
                    <span className="text-accent-amber animate-pulse">● PLAYING</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-1 bg-white p-1 rounded-full border border-coffee-900/10 shadow-3xs">
                    {DRIP_VIDEOS.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveVideoIndex(idx)}
                        className={`py-2 rounded-full text-[8.5px] font-semibold uppercase tracking-wider transition-all ${
                          activeVideoIndex === idx
                            ? 'bg-coffee-900 text-white font-bold shadow-xs'
                            : 'text-coffee-600 hover:bg-coffee-100 hover:text-coffee-900'
                        }`}
                      >
                        {item.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>

                  <div className="bg-coffee-900/5 rounded-2xl px-4 py-2.5 border border-coffee-900/5 text-center mt-1">
                    <p className="text-[10px] text-coffee-800 font-sans font-semibold tracking-wide">
                      ⚡ {DRIP_VIDEOS[activeVideoIndex].desc}
                    </p>
                  </div>
                </div>

                {/* Rotating Vertical Sidebar Label from layout */}
                <div className="absolute -right-16 top-1/2 -rotate-90 text-[9px] font-bold tracking-[0.4em] uppercase text-coffee-900/25 pointer-events-none hidden sm:block">
                  Brew Inn Lifestyle Series 2026
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* BOTTOM FEATURE BAR FROM SPEC */}
      <div className="border-b border-coffee-900/10 flex flex-col md:flex-row items-center px-4 sm:px-8 lg:px-12 py-6 bg-white gap-6">
        <div className="w-full md:w-1/4 text-left">
          <span className="text-[10px] font-bold uppercase tracking-widest block mb-1 opacity-50">Current Drop</span>
          <span className="text-sm font-black uppercase text-coffee-900 tracking-tight font-sans">The Pistachio Cloud Latte</span>
        </div>
        
        <div className="flex-1 flex flex-wrap gap-8 items-center justify-start py-1">
          <div className="flex items-center gap-3 whitespace-nowrap">
            <div className="w-2 h-2 rounded-full bg-accent-amber"></div>
            <span className="text-xs font-serif italic text-coffee-800 font-semibold tracking-wide">Freshly Roasted</span>
          </div>
          <div className="flex items-center gap-3 whitespace-nowrap">
            <div className="w-2 h-2 rounded-full bg-accent-amber"></div>
            <span className="text-xs font-serif italic text-coffee-800 font-semibold tracking-wide">Community Focused</span>
          </div>
          <div className="flex items-center gap-3 whitespace-nowrap">
            <div className="w-2 h-2 rounded-full bg-accent-amber"></div>
            <span className="text-xs font-serif italic text-coffee-800 font-semibold tracking-wide">Mumbai Native</span>
          </div>
          <div className="flex items-center gap-3 whitespace-nowrap">
            <div className="w-2 h-2 rounded-full bg-accent-amber"></div>
            <span className="text-xs font-serif italic text-coffee-800 font-semibold tracking-wide">Creative Spirit</span>
          </div>
        </div>
        
        <div className="w-full md:w-1/4 text-left md:text-right">
           <button onClick={handleScrollToLoyalty} className="text-xs font-bold border-b-2 border-accent-amber pb-1 uppercase tracking-wider text-coffee-900 hover:text-accent-amber transition-colors">
             Join Rewards Program
           </button>
        </div>
      </div>

      {/* 2. THE MENU & CATALOG CATALOG SECTION */}
      <section id="menu-section" className="py-24 px-4 sm:px-8 lg:px-12 bg-coffee-50">
        <div className="mx-auto max-w-7xl">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-coffee-600 block mb-2">
              FLAVOR-FORWARD DISCOVERY
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl italic text-coffee-900 font-extrabold">
              The Artisan <span className="not-italic font-sans font-black uppercase text-coffee-950">Catalogue</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-coffee-700 leading-relaxed">
              Hand-picked ingredients with sophisticated aesthetics. Each cup custom crafted. Select any premium item to customize your size, plant milks, and sweetness levels.
            </p>
          </div>

          {/* SEARCH & FILTERS CONTROLS */}
          <div className="mb-12 flex flex-col md:flex-row gap-6 items-center justify-between border-b border-coffee-900/10 pb-8">
            
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider transition-all border rounded-full ${
                    selectedCategory === cat
                      ? 'bg-coffee-900 border-coffee-900 text-white shadow-xs'
                      : 'bg-white text-coffee-800 hover:bg-coffee-150 border-coffee-900/15'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Live Search */}
            <div className="relative w-full max-w-xs">
              <input
                type="text"
                placeholder="Search catalog... (e.g. Cardamom)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-coffee-900/15 bg-white px-5 py-2.5 pl-11 text-xs text-coffee-900 focus:border-coffee-900 focus:outline-none tracking-wide"
              />
              <Search className="absolute left-4 top-3 h-4 w-4 text-coffee-400" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-3 text-coffee-500 hover:text-coffee-900 text-xs font-bold uppercase tracking-wider"
                >
                  Clear
                </button>
              )}
            </div>

          </div>

          {/* MENU GRID */}
          <AnimatePresence mode="popLayout">
            {filteredMenuItems.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filteredMenuItems.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={item.id}
                    className="group relative flex flex-col overflow-hidden rounded-[30px] border border-coffee-900/10 bg-white p-4 transition-all hover:border-coffee-900/30 hover:shadow-xs"
                  >
                    
                    {/* Item Image */}
                    <div className="relative h-56 w-full overflow-hidden rounded-[20px] bg-coffee-200">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      {/* Interactive Tags badge */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[80%]">
                        {item.tags.map((tag, idx) => (
                          <span key={idx} className="bg-coffee-900 text-[8px] font-bold tracking-widest text-white px-2.5 py-0.5 rounded-full uppercase">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {item.isPopular && (
                        <div className="absolute bottom-3 right-3 bg-accent-amber text-white text-[8px] font-black tracking-widest uppercase px-2.5 py-1 rounded shadow-xs">
                          ⭐ BEST SELLER
                        </div>
                      )}
                    </div>

                    {/* Content text */}
                    <div className="flex flex-1 flex-col justify-between pt-5">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif italic text-lg sm:text-xl font-bold text-coffee-900 group-hover:text-accent-amber transition-colors">
                            {item.name}
                          </h4>
                          <span className="font-mono text-sm font-black text-coffee-950 shrink-0">
                            ₹{item.price}
                          </span>
                        </div>
                        
                        <p className="mt-3 text-xs text-coffee-700 leading-relaxed font-sans font-medium">
                          {item.description}
                        </p>
                      </div>

                      {/* Customize and Order bottom trigger */}
                      <div className="mt-5 pt-4 border-t border-coffee-900/5 flex items-center justify-between">
                        <span className="font-mono text-[9px] text-coffee-500 uppercase tracking-wider">
                          {item.calories ? `${item.calories} Calories` : 'Artisan Blend'}
                        </span>
                        
                        <button
                          onClick={() => handleOpenCustomizer(item)}
                          className="flex items-center space-x-1.5 rounded-full bg-coffee-900 hover:bg-accent-amber text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all transform active:scale-95 shadow-xs"
                        >
                          <Plus className="h-3 w-3" />
                          <span>Add to Bag</span>
                        </button>
                      </div>

                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-16 rounded-[35px] bg-[#FDFBF7] border border-dashed border-coffee-900/20">
                <h4 className="text-base font-serif italic font-bold text-coffee-800">No delicious recipe found</h4>
                <p className="text-xs text-coffee-500 mt-1">Try resetting your category filters or search query.</p>
                <button 
                  onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                  className="mt-4 inline-flex items-center text-xs font-bold uppercase tracking-wider text-accent-amber"
                >
                  <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                  Reset all filters
                </button>
              </div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* BEYOND THE CUP — BARISTA BREWING REEL & INTERACTIVE EXTRACTION ENGINE */}
      <section className="bg-[#1C1210] py-24 px-4 sm:px-8 lg:px-12 border border-coffee-950 text-white relative overflow-hidden">
        {/* Abstract absolute graphics */}
        <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-accent-amber/5 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-coffee-800/10 blur-3xl pointer-events-none"></div>

        <div className="mx-auto max-w-7xl relative z-10 animate-fade-in">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-bold tracking-[0.25em] text-accent-amber uppercase block mb-2">
              SENSORY EXPERIENTIAL BARISTA THEATRE
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl italic text-white font-extrabold leading-tight">
              Watch Coffee <span className="not-italic font-sans font-black uppercase text-accent-amber">In The Making</span>
            </h2>
            <p className="mt-4 text-xs sm:text-sm text-coffee-300 max-w-xl mx-auto leading-relaxed">
              Explore true barista mechanics. Control our slow-motion cinematic brewing reel speed or interactive-extract your custom recipe in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            
            {/* COLUMN 1: CINEMATIC SLOW-MOTION BREWING REEL (5 columns) */}
            <div className="lg:col-span-5 bg-[#140E0D] border border-white/5 rounded-[30px] p-6 sm:p-8 flex flex-col justify-between shadow-xl relative">
              <span className="absolute top-5 right-5 bg-accent-amber/10 border border-accent-amber/20 text-accent-amber text-[9px] font-mono tracking-widest uppercase px-3 py-1 rounded-full">
                📽️ LIVE STAGE
              </span>

              <div>
                <span className="text-[9px] font-mono text-coffee-400 uppercase tracking-widest block mb-1">Interactive Slow-Mo Loop</span>
                <h3 className="font-serif italic text-xl font-bold mb-4">Precision Barista Chemex Drip</h3>
                
                {/* Widescreen Video Box Container */}
                <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black/40 border border-white/10 relative shadow-inner">
                  <video
                    ref={cinemaVideoRef}
                    src="https://assets.mixkit.co/videos/preview/mixkit-coffee-brewing-in-a-glass-chemex-pot-for-barista-43093-large.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-90"
                  />
                  
                  {/* Real-time Overlay speed indicator */}
                  <div className="absolute bottom-3 left-3 bg-[#1C1210]/95 backdrop-blur-md text-[9px] font-mono px-2.5 py-1 rounded-md text-white border border-white/10 flex items-center space-x-1.5 shadow-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-green animate-pulse"></span>
                    <span>Speed Rate: {cinemaSpeed}x</span>
                  </div>
                </div>

                {/* Slow-Motion Speed Controller Buttons */}
                <div className="mt-6">
                  <div className="text-[10px] uppercase font-bold text-coffee-400 tracking-wider block mb-2">Adjust Playback Mechanics:</div>
                  <div className="grid grid-cols-3 gap-2 bg-[#251D1C] p-1 rounded-full border border-white/5">
                    {[
                      { label: '0.5x Slow', val: 0.5 },
                      { label: '1.0x Real', val: 1.0 },
                      { label: '1.7x ASMR', val: 1.7 }
                    ].map((sp) => (
                      <button
                        key={sp.val}
                        onClick={() => handleSetCinemaSpeed(sp.val)}
                        className={`py-2 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all ${
                          cinemaSpeed === sp.val
                            ? 'bg-accent-amber text-white font-black shadow-md'
                            : 'text-coffee-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {sp.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Ambient Audio simulation note */}
              <div className="mt-8 pt-5 border-t border-white/5 flex items-center justify-between text-xs text-coffee-400">
                <div className="flex items-center space-x-2">
                  <Volume2 className="h-4 w-4 text-accent-amber" />
                  <span className="font-mono text-[9px] uppercase tracking-wide">Ambient Coffee House White Noise</span>
                </div>
                <span className="text-[9px] bg-accent-amber/10 text-accent-amber px-2.5 py-1 rounded font-mono font-bold">MUTED LOOP</span>
              </div>
            </div>

            {/* COLUMN 2: THE INTERACTIVE VIRTUAL BARISTA BREW LAB (7 columns) */}
            <div className="lg:col-span-7 bg-[#140E0D] border border-white/5 rounded-[30px] p-6 sm:p-8 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                  <div>
                    <span className="text-[9px] font-mono text-accent-amber uppercase tracking-widest block font-bold">Barista Simulator</span>
                    <h3 className="font-serif italic text-xl font-bold">Virtual Extraction Engine</h3>
                  </div>
                  <div>
                    <button
                      onClick={resetBrewSimulator}
                      className="text-[10px] text-coffee-400 hover:text-white flex items-center gap-1.5 uppercase tracking-wider font-bold border border-white/10 px-4 py-2 rounded-full transition-colors bg-white/5"
                    >
                      <RotateCcw className="h-3 w-3" />
                      Reset Bar
                    </button>
                  </div>
                </div>

                {/* STEP INDICATOR DOTS */}
                <div className="grid grid-cols-4 gap-3 mb-8">
                  {[
                    { step: 0, label: 'Grind Beans' },
                    { step: 1, label: 'Water Heat' },
                    { step: 2, label: 'Extraction' },
                    { step: 3, label: 'Cup Ready' }
                  ].map((s) => {
                    const isPassed = brewStep >= s.step;
                    const isActive = brewStep === s.step;
                    return (
                      <div key={s.step} className="flex flex-col gap-1.5">
                        <div className={`h-1.5 w-full rounded-full transition-all ${
                          isPassed ? 'bg-accent-amber' : 'bg-white/10'
                        } ${isActive ? 'ring-2 ring-accent-amber ring-offset-2 ring-offset-[#140E0D]' : ''}`}></div>
                        <span className={`text-[8.5px] font-bold uppercase tracking-widest text-left ${
                          isActive ? 'text-accent-amber font-black' : isPassed ? 'text-white' : 'text-coffee-500'
                        }`}>{s.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* ACTION STAGE SWITCHER */}
                <div className="bg-[#1C1514] border border-white/5 rounded-2xl p-6 relative min-h-[250px] flex flex-col justify-center">
                  
                  {/* STEP 0: GRINDING */}
                  {brewStep === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-4">
                      <div className="flex justify-center">
                        <motion.div animate={{ rotate: grindPercent > 0 ? [0, 6, -6, 0] : 0 }} transition={{ repeat: Infinity, duration: 0.12 }} className="h-16 w-16 bg-[#2C1E1C] rounded-2xl flex items-center justify-center border border-white/10 shadow">
                          <Coffee className="h-8 w-8 text-accent-amber" />
                        </motion.div>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white font-sans uppercase tracking-wider">1. Select Blend & Grind Coffee</h4>
                        <p className="text-xs text-coffee-300 mt-1.5 max-w-sm mx-auto">We use premium single-origin beans. Repeatedly click the trigger to simulate grinding coarse vs fine espresso particles.</p>
                      </div>

                      {/* Grind selector */}
                      <div className="flex items-center justify-center gap-3 bg-black/20 p-2 rounded-xl max-w-xs mx-auto border border-white/5">
                        <span className="text-[10px] text-coffee-400 font-bold uppercase tracking-wider">Select Brew:</span>
                        <select
                          value={brewRecipe}
                          onChange={(e: any) => setBrewRecipe(e.target.value)}
                          className="bg-[#2A1F1D] border border-white/10 rounded-lg text-xs px-2.5 py-1.5 focus:outline-none text-white font-black"
                        >
                          <option value="Espresso">House Espresso Blend</option>
                          <option value="Lavender Pour Over">Lavender Infusion Pour-Over</option>
                          <option value="Pistachio Cloud Latte">Pistachio Cloud Latte Blend</option>
                        </select>
                      </div>

                      {/* Grind Progression */}
                      <div className="w-full max-w-xs mx-auto space-y-1.5">
                        <div className="flex justify-between text-[10px] text-coffee-500">
                          <span className="uppercase tracking-wider font-bold">Grind Density Target</span>
                          <span className="font-mono font-bold text-white">{grindPercent}% Done</span>
                        </div>
                        <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                          <div className="bg-accent-amber h-full rounded-full transition-all duration-150" style={{ width: `${grindPercent}%` }}></div>
                        </div>
                      </div>

                      <button
                        onClick={triggerGrindTick}
                        className="bg-white text-coffee-950 font-black uppercase tracking-widest text-[10px] px-8 py-3 rounded-full hover:bg-accent-amber hover:text-white transition-all active:scale-95 shadow-md flex items-center space-x-1.5 mx-auto animate-pulse"
                      >
                        <Coffee className="h-3.5 w-3.5 animate-bounce" />
                        <span>PRESS TO GRIND BEANS (+15%)</span>
                      </button>
                    </motion.div>
                  )}

                  {/* STEP 1: WATER HEATING THERMOSTAT */}
                  {brewStep === 1 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-4">
                      <div className="flex justify-center items-center space-x-3 zoom-in">
                        <Flame className={`h-8 w-8 text-accent-amber ${isTempRunning ? 'animate-pulse text-amber-500' : ''}`} />
                        <span className="font-mono text-4xl font-black text-white">{tempHeat}°C</span>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">2. Heating Water & Thermostat Latch</h4>
                        <p className="text-xs text-coffee-300 mt-1 max-w-md mx-auto">
                          Water must be between <span className="text-accent-amber font-bold">91°C and 97°C</span> for perfect specialty extraction. Click "LOCK THERMOSTAT" as close to 94°C as possible as it heats!
                        </p>
                      </div>

                      <div className="w-full max-w-xs mx-auto">
                        <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden border border-white/10 relative p-0.5">
                          {/* Perfect extraction hot-zone block overlay */}
                          <div className="absolute top-0 bottom-0 left-[82%] right-[10%] bg-accent-green/25 border-l border-r border-accent-green/40"></div>
                          <div 
                            className="bg-accent-amber h-full rounded-full transition-all duration-75" 
                            style={{ width: `${Math.min(100, (tempHeat / 110) * 100)}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-[8px] text-coffee-500 font-mono mt-1.5 px-1 uppercase tracking-wide font-bold">
                          <span>60°C Warm</span>
                          <span className="text-accent-green font-bold text-[9px]">91°C - 97°C Gold Spot</span>
                          <span>110°C Scorched</span>
                        </div>
                      </div>

                      <div className="flex justify-center gap-3">
                        <button
                          onClick={latchTemperature}
                          className="bg-accent-amber text-[#1C1210] font-black uppercase tracking-widest text-[10px] px-8 py-3.5 rounded-full hover:bg-white hover:text-coffee-950 transition-all shadow-lg active:scale-95"
                        >
                          🔒 LOCK THERMOSTAT AT {tempHeat}°C
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: INFUSION DANCE */}
                  {brewStep === 2 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-4">
                      
                      {/* Interactive miniature video overlay */}
                      <div className="h-28 w-48 mx-auto rounded-2xl overflow-hidden border border-white/10 relative shadow">
                        <video 
                          autoPlay 
                          loop 
                          muted 
                          playsInline
                          src="https://assets.mixkit.co/videos/preview/mixkit-dripping-espresso-from-a-coffee-machine-coffee-maker-41566-large.mp4" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-[#2C1B18]/50 flex items-center justify-center">
                          <span className="text-[10px] tracking-[0.2em] font-black text-white animate-pulse">● EXTRACTING...</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-white">3. High-Pressure Extraction Process</h4>
                        <p className="text-xs text-coffee-300 mt-1 font-medium text-center">Water is infusing with ground bean chemistry under constant 9-bars atmosphere.</p>
                      </div>

                      <div className="w-full max-w-xs mx-auto space-y-1.5">
                        <div className="flex justify-between text-[10px] text-coffee-500">
                          <span className="font-bold uppercase tracking-wider">Brewhouse Chamber level</span>
                          <span className="font-mono font-bold text-white">{extractProgress}%</span>
                        </div>
                        <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                          <div className="bg-accent-green h-full rounded-full transition-all duration-200" style={{ width: `${extractProgress}%` }}></div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: DONE CUP REVEAL */}
                  {brewStep === 3 && (
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-4 py-2">
                      <div className="flex justify-center">
                        <div className="h-16 w-16 bg-accent-green/15 border border-accent-green/30 rounded-full flex items-center justify-center text-accent-green text-3xl animate-bounce">
                          ☕
                        </div>
                      </div>

                      <div className="space-y-2">
                        {tempSuccess ? (
                          <div className="inline-flex items-center space-x-1.5 border border-accent-green/30 bg-accent-green/10 text-accent-green font-mono text-[9px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-1 shadow-2xs">
                            <Sparkles className="h-3.5 w-3.5 text-accent-amber" />
                            <span>🏆 GOLD MEDAL COFFEE EXTRACTION (PERFECT {tempHeat}°C)</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center space-x-1.5 border border-amber-500/25 bg-amber-500/5 text-amber-400 font-mono text-[9px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-1">
                            <span>⚠️ COFFEE EXTRACTED OUTSIDE GOLD BOUNDS ({tempHeat}°C)</span>
                          </div>
                        )}

                        <h4 className="text-xl font-serif italic text-white font-bold">Your Custom-Vetted {brewRecipe} is Complete!</h4>
                        <p className="text-xs text-coffee-300 max-w-md mx-auto leading-relaxed font-sans">
                          Clean, sensory-rich flavor compounds extracted. Our South Mumbai outlets can recreate this exact level of temperature precision for your physical palate!
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                        <button
                          onClick={resetBrewSimulator}
                          className="w-full sm:w-auto border border-white/10 hover:border-white/25 text-white font-bold uppercase tracking-widest text-[9px] px-6 py-3.5 rounded-full transition-all bg-white/5 hover:bg-white/10"
                        >
                          🔄 RE-BREW ANOTHER STREAM
                        </button>
                        
                        <button
                          onClick={() => {
                            const corresponding = MENU_ITEMS.find(item => item.name.toLowerCase().includes('espresso') || item.name.toLowerCase().includes('pistachio')) || MENU_ITEMS[0];
                            handleOpenCustomizer(corresponding);
                          }}
                          className="w-full sm:w-auto bg-accent-amber text-[#1C1210] font-black uppercase tracking-widest text-[9px] px-6 py-3.5 rounded-full shadow-lg hover:bg-white transition-colors flex items-center justify-center space-x-1.5"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          <span>Customise & Reserve in Bag</span>
                        </button>
                      </div>
                    </motion.div>
                  )}

                </div>
              </div>

              {/* BARISTA PRO TIP BOX */}
              <div className="mt-6 bg-[#1D1413] rounded-2xl p-4.5 border border-white/5 text-left text-xs text-coffee-400 leading-relaxed">
                <span className="font-mono text-[9px] text-accent-amber uppercase font-bold block mb-1">PRO-TIP COFFEE EXTRACTION PHYSICS:</span>
                <span>Our elite baristas pre-heat every hand-turned ceramic cup to exactly 60°C prior to espresso extraction to prevent temperature divergence when coffee streams touch the vessel.</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. ITEM CUSTOMIZATION MODAL (MODAL SCREEN) */}
      <AnimatePresence>
        {customizingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white border border-coffee-200 shadow-2xl p-6"
            >
              
              <button 
                onClick={() => setCustomizingItem(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-coffee-100 text-coffee-500 hover:text-coffee-900 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-start gap-4">
                <img 
                  src={customizingItem.imageUrl} 
                  alt={customizingItem.name} 
                  className="h-20 w-20 rounded-xl object-cover border border-coffee-200" 
                />
                <div>
                  <span className="text-[10px] font-bold text-coffee-500 tracking-wider uppercase">{customizingItem.category}</span>
                  <h3 className="font-display text-lg font-extrabold text-coffee-900">{customizingItem.name}</h3>
                  <span className="font-mono text-sm font-bold text-coffee-800">Base: ₹{customizingItem.price}</span>
                </div>
              </div>

              <p className="mt-3 text-xs text-coffee-600 leading-relaxed bg-coffee-50 p-2.5 rounded-lg border border-coffee-100 italic">
                "{customizingItem.description}"
              </p>

              {/* CUSTOMIZATION LOGIC */}
              <div className="mt-4 space-y-4">
                
                {/* Size options */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-coffee-500 block mb-1.5">
                    Select Size
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: 'Regular', desc: 'Standard cup', price: 0 },
                      { key: 'Grande', desc: 'Large cup (+₹40)', price: 40 }
                    ].map((entry) => (
                      <button
                        key={entry.key}
                        type="button"
                        onClick={() => setChosenSize(entry.key as 'Regular' | 'Grande')}
                        className={`p-2.5 rounded-xl text-left border transition-all text-xs flex flex-col ${
                          chosenSize === entry.key
                            ? 'border-accent-amber bg-amber-50/50 text-coffee-900 ring-1 ring-accent-amber'
                            : 'border-coffee-200 bg-white hover:bg-coffee-50'
                        }`}
                      >
                        <span className="font-bold">{entry.key}</span>
                        <span className="text-[10px] text-coffee-500">{entry.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Milk Options (hide for pure desserts / bowls) */}
                {customizingItem.category !== 'Bowls' && customizingItem.category !== 'Desserts' && (
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-coffee-500 block mb-1.5">
                      Milk Type
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {['Standard Creamy', 'Oat Milk (+₹30)', 'Almond Milk (+₹30)'].map((milk) => (
                        <button
                          key={milk}
                          type="button"
                          onClick={() => setChosenMilk(milk)}
                          className={`p-2 rounded-xl text-center border text-[10px] font-medium transition-all ${
                            chosenMilk === milk
                              ? 'border-accent-amber bg-amber-50/50 text-coffee-900 font-bold'
                              : 'border-coffee-200 bg-white hover:bg-coffee-50'
                          }`}
                        >
                          {milk}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sweetness Preference */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-coffee-500 block mb-1.5">
                    Sweetness Level
                  </label>
                  <div className="grid grid-cols-4 gap-1">
                    {['Sugar-free', 'Mild Sweet', 'Natural Sweet', 'Sweet Delight'].map((sweet) => (
                      <button
                        key={sweet}
                        type="button"
                        onClick={() => setChosenSweetness(sweet)}
                        className={`py-2 px-1 rounded-xl text-center border text-[9px] font-medium transition-all ${
                          chosenSweetness === sweet
                            ? 'border-accent-amber bg-amber-50/50 text-coffee-900 font-bold'
                            : 'border-coffee-200 bg-white hover:bg-coffee-50'
                        }`}
                      >
                        {sweet}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Total Calculation & Action */}
              <div className="mt-6 pt-4 border-t border-coffee-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-coffee-400 block">Total Price</span>
                  <span className="font-mono text-lg font-extrabold text-coffee-900">
                    ₹{customizingItem.price + (chosenSize === 'Grande' ? 40 : 0) + (chosenMilk.includes('+₹30') ? 30 : 0)}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => setCustomizingItem(null)}
                    className="px-4 py-2 text-xs font-semibold text-coffee-700 hover:bg-coffee-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmCustomization}
                    id="confirm-customization-btn"
                    className="px-5 py-2.5 bg-coffee-800 hover:bg-accent-amber text-white font-bold text-xs rounded-xl transition-all shadow"
                  >
                    Confirm & Add
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. LOYALTY CLUB & LOYALTY LOUNGE SECTION */}
      <section id="loyalty-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-coffee-900 text-coffee-100 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-accent-amber opacity-15 blur-3xl"></div>
        
        <div className="mx-auto max-w-7xl relative">
          
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center">
            
            {/* Left intro text */}
            <div className="lg:col-span-5">
              <span className="flex items-center space-x-1 font-mono text-xs text-accent-amber uppercase font-semibold">
                <Gift className="h-4 w-4 mr-1 text-accent-amber" />
                <span>Hyperlocal Loyalty Network</span>
              </span>
              <h2 className="mt-2 font-display text-3xl font-extrabold text-white sm:text-4xl">
                Brew Inn Loyalty Lounge
              </h2>
              <p className="mt-4 text-sm text-coffee-300 leading-relaxed">
                Join our casual loyalty ritual designed around everyday habits. Earn instantly on every cup and unlock real rewards (not just keychains). 
              </p>
              
              <ul className="mt-6 space-y-3.5 text-xs text-coffee-200">
                <li className="flex items-center gap-2">
                  <span className="h-5 w-5 rounded-full bg-accent-amber text-coffee-900 flex items-center justify-center font-bold text-[10px]">1</span>
                  <span>10 Points earned per ₹100 spent inside the website or cafe.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-5 w-5 rounded-full bg-accent-amber text-coffee-900 flex items-center justify-center font-bold text-[10px]">2</span>
                  <span>Refer neighbors + Mumbai college mates to unlock <b className="text-white">+50 bonus points</b> instantly.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-5 w-5 rounded-full bg-accent-amber text-coffee-900 flex items-center justify-center font-bold text-[10px]">3</span>
                  <span>Claim free signature desserts once you accumulate 200 points.</span>
                </li>
              </ul>

              {/* Free cup teaser */}
              <div className="mt-8 bg-coffee-800/80 border border-coffee-700/50 p-4 rounded-xl flex items-center gap-3">
                <div className="bg-amber-500/10 p-2.5 rounded-lg border border-accent-amber/20">
                  <Sparkles className="h-5 w-5 text-accent-amber" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">Exclusive Promo Offer</h4>
                  <p className="text-[10px] text-coffee-300">Use coupon code <code className="bg-coffee-900 text-[11px] px-1 py-0.5 rounded text-accent-amber font-mono font-bold">BREWNEW</code> in cart for <b className="text-white">15% off</b> on your checkout!</p>
                </div>
              </div>
            </div>

            {/* Right Interactive Dashboard */}
            <div className="mt-12 lg:mt-0 lg:col-span-7">
              <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8">
                
                {!isJoinedLoyalty ? (
                  <div>
                    <h3 className="text-base font-bold text-white mb-2">Check or Create Loyalty Account</h3>
                    <p className="text-xs text-coffee-300 mb-6">Enter your email block to simulate points earning, view reward claim options and copy referral invites.</p>
                    
                    <form onSubmit={handleLoyaltyLookup} className="space-y-4">
                      <div>
                        <label className="text-[11px] text-coffee-300 uppercase font-bold tracking-widest block mb-1.5">Enter Email Coordinate</label>
                        <div className="relative">
                          <input 
                            type="email"
                            required
                            placeholder="e.g. riya.sen@gmail.com"
                            value={loyaltyEmail}
                            onChange={(e) => setLoyaltyEmail(e.target.value)}
                            className="w-full bg-coffee-950/70 border border-coffee-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-accent-amber"
                          />
                        </div>
                      </div>
                      
                      <button
                        type="submit"
                        className="w-full bg-accent-amber hover:bg-accent-amber/90 text-white font-bold py-3 text-xs rounded-xl shadow-lg transition-all"
                      >
                        Enter Loyalty Portal
                      </button>
                    </form>
                  </div>
                ) : (
                  <div>
                    {/* Welcome Screen logged in */}
                    <div className="flex items-center justify-between border-b border-coffee-800 pb-5 mb-5">
                      <div>
                        <span className="text-[10px] font-bold text-accent-amber uppercase tracking-wider">MEMBER ACCOUNT</span>
                        <h4 className="font-display text-sm font-bold text-white mt-0.5">{loyaltyAccount?.email}</h4>
                        <span className="inline-block mt-1 bg-accent-green text-[9px] text-coffee-100 font-bold px-2 py-0.5 rounded uppercase">
                          📍 {loyaltyAccount?.tier}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-coffee-400 block uppercase font-mono">Current points</span>
                        <span className="font-mono text-3xl font-extrabold text-accent-amber">{loyaltyAccount?.points}</span>
                      </div>
                    </div>

                    {/* Refer a Friend Simulator */}
                    <div className="bg-coffee-950/60 p-4 rounded-xl border border-coffee-800 mb-5">
                      <h4 className="text-xs font-bold text-white flex items-center justify-between">
                        <span>🚀 Refer a Friend (Get +50 pts)</span>
                        {referralSuccess && <span className="text-accent-green text-[10px]">✓ Referred Successfully!</span>}
                      </h4>
                      <p className="text-[11px] text-coffee-300 mt-1 mb-3">Simulate inviting your colleague or friend and watch your live points grow.</p>
                      
                      <form onSubmit={handleAddReferral} className="flex gap-2">
                        <input 
                          type="text"
                          required
                          placeholder="Friend full name (e.g., Kabir)"
                          value={referralName}
                          onChange={(e) => setReferralName(e.target.value)}
                          className="flex-1 bg-coffee-900 border border-coffee-700/80 rounded-lg px-3 py-2 text-xs text-white placeholder-coffee-500 focus:outline-none"
                        />
                        <button
                          type="submit"
                          className="bg-accent-amber hover:bg-accent-amber/90 text-white text-xs font-semibold px-4 py-2 rounded-lg"
                        >
                          Send Invite
                        </button>
                      </form>
                    </div>

                    {/* Reward milestones */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-bold text-coffee-200">Unlockable Loyalty Milestones</h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {[
                          { item: 'Free Fresh Cardamom Cappuccino', pts: 100 },
                          { item: 'Aesthetic Lava-Salted Espresso Brownie', pts: 200 },
                          { item: 'Signature Layered Coconut Matcha', pts: 300 }
                        ].map((reward) => {
                          const met = (loyaltyAccount?.points ?? 0) >= reward.pts;
                          return (
                            <div 
                              key={reward.pts}
                              className={`p-2.5 rounded-lg border text-xs flex flex-col justify-between ${
                                met 
                                  ? 'bg-accent-green/10 border-accent-green/30 text-white' 
                                  : 'bg-coffee-950/20 border-coffee-800 text-coffee-400'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-1">
                                <span className="font-bold">{reward.item}</span>
                                {met && <Check className="h-3.5 w-3.5 text-accent-green shrink-0" />}
                              </div>
                              <div className="mt-2 flex items-center justify-between text-[10px]">
                                <span className="font-mono">{reward.pts} pts required</span>
                                {met ? (
                                  <button 
                                    onClick={() => {
                                      alert(`Success! Generated mock code to redeem free item at counter. points deducted. Enjoy!`);
                                      setLoyaltyAccount(p => p ? { ...p, points: p.points - reward.pts } : null);
                                    }}
                                    className="bg-accent-green hover:bg-accent-green/90 text-white font-bold px-2 py-0.5 rounded text-[9px]"
                                  >
                                    Claim Now
                                  </button>
                                ) : (
                                  <span className="text-coffee-500 font-medium">Locked</span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Reset mock account link */}
                    <button 
                      onClick={() => {
                        setIsJoinedLoyalty(false);
                        setLoyaltyEmail('');
                      }} 
                      className="mt-4 text-[10px] text-coffee-500 hover:text-coffee-300 underline block"
                    >
                      Login with different email
                    </button>

                  </div>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. COMMUNITY HERO & COMIC HIGHLIGHT EVENTS */}
      <section className="py-24 px-4 sm:px-8 lg:px-12 bg-white border-t border-b border-coffee-900/10">
        <div className="mx-auto max-w-7xl">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-coffee-600 block mb-2">
              MUMBAI COFFEE CULTURE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl italic font-extrabold text-coffee-900 leading-tight">
              The Creator <span className="not-italic font-sans font-black uppercase text-coffee-950">Commons</span>
            </h2>
            <p className="mt-4 text-sm text-coffee-750 max-w-xl mx-auto leading-relaxed">
              Brew Inn is more than caffeine. We are a dynamic workspace and canvas for local creators, remote professionals, and college study groups. Join our upcoming community sessions.
            </p>
          </div>

          {/* EVENTS ROW */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: 'ASMR Brewing Masterclass',
                badge: 'Brew Inn Workshop',
                date: 'June 24, Saturday • 4:00 PM',
                desc: 'Slow drips, smooth pours, and texturing milk. Learn the sensory joy of creative cold foams.',
                img: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=300'
              },
              {
                title: 'Creators Meet & Collab',
                badge: 'Community Meetup',
                date: 'June 28, Wednesday • 5:30 PM',
                desc: 'A relaxed networking mixer for Mumbai based graphic designers, UI experts, copywriters, and content creators.',
                img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=300'
              },
              {
                title: 'Acoustic Open Mic Night',
                badge: 'Live Session',
                date: 'July 01, Saturday • 7:00 PM',
                desc: 'Enjoy experimental signature pop toffee lattes and local acoustics from regional indie singers.',
                img: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&q=80&w=300'
              }
            ].map((ev, idx) => (
              <div key={idx} className="bg-[#FDFBF7] rounded-[30px] border border-coffee-900/10 overflow-hidden transition-all hover:border-coffee-900/25">
                <div className="h-40 w-full bg-coffee-800 relative">
                  <img src={ev.img} alt={ev.title} className="w-full h-full object-cover opacity-85" referrerPolicy="no-referrer" />
                  <span className="absolute top-4 left-4 bg-white text-coffee-950 font-bold text-[8px] tracking-widest uppercase px-3 py-1 rounded-full border border-coffee-900/10">
                    {ev.badge}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 text-accent-amber text-[10px] font-mono font-bold mb-2">
                    <Calendar className="h-3 w-3" />
                    <span>{ev.date}</span>
                  </div>
                  <h4 className="font-serif italic text-base sm:text-lg font-bold text-coffee-900">{ev.title}</h4>
                  <p className="mt-2.5 text-xs text-coffee-700 leading-relaxed font-sans">{ev.desc}</p>
                  
                  <button 
                    onClick={() => alert(`Simulated booking for: "${ev.title}". We have locked a seat for your email context. Look forward to seeing you!`)}
                    className="mt-5 text-[10px] font-bold uppercase tracking-wider text-coffee-900 hover:text-accent-amber flex items-center space-x-1 border-b border-coffee-900/15 pb-0.5 transition-colors"
                  >
                    <span>RSVP Free Slot</span>
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* INSTAGRAM MOCK SHIELD */}
          <div className="bg-coffee-50 border border-coffee-900/10 p-8 rounded-[35px] text-center">
            <span className="text-[9px] font-bold tracking-[0.2em] text-coffee-500 uppercase block">Share Your Aesthetic Moment</span>
            <p className="text-xs text-coffee-700 mt-2 mb-6">Tag <b className="text-coffee-900">@BrewInnCafeMumbai</b> and use hashtag <span className="text-accent-amber font-serif italic font-bold">#MyPremiumDailyEscape</span> to be featured on our screen!</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Layered Lavender', img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=200' },
                { label: 'Oat Flat White', img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=200' },
                { label: 'Rose Latte Art', img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=200' },
                { label: 'Lounge Vibe Study', img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=200' }
              ].map((ig, i) => (
                <div key={i} className="group relative rounded-[20px] overflow-hidden aspect-square bg-coffee-800 border border-coffee-900/5">
                  <img src={ig.img} alt={ig.label} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-[#2C1B18]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[10px] text-white font-serif italic tracking-wide uppercase font-bold">{ig.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 6. VERIFIED USER REVIEWS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-coffee-50">
        <div className="mx-auto max-w-7xl">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="text-xs font-mono font-bold tracking-widest text-coffee-600 uppercase">
              WORDS ON THE STREET
            </h3>
            <h2 className="mt-1 font-display text-2xl font-extrabold text-coffee-900 sm:text-3xl">
              Our Community Writes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {USER_REVIEWS.map((review: UserReview) => (
              <div 
                key={review.id}
                className="bg-white border border-coffee-200/80 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-1.5 text-yellow-500 mb-3">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-coffee-600 leading-relaxed italic">
                    "{review.comment}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-coffee-100 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <img 
                      src={review.avatar} 
                      alt={review.name} 
                      className="h-8 w-8 rounded-full object-cover border border-coffee-200" 
                    />
                    <div>
                      <h4 className="text-xs font-bold text-coffee-900">{review.name}</h4>
                      <p className="text-[10px] text-coffee-500">Mumbai Native</p>
                    </div>
                  </div>
                  <span className="bg-coffee-100 text-[9px] text-coffee-700 font-bold px-2 py-0.5 rounded-full uppercase">
                    ☕ {review.drink}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. CONTACT, DETAILS & VISUAL MAP */}
      <section id="contact-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-coffee-900 text-coffee-100 border-t border-coffee-800">
        <div className="mx-auto max-w-7xl">
          
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            
            {/* Left information list */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="font-display text-2xl font-extrabold text-white">
                  Brew Inn Cafe — Head Quarters
                </h2>
                <p className="mt-2 text-xs text-coffee-300">
                  Located right in the heart of urban Mumbai, near popular colleges and active remote work hubs. Stop by for the smells and visual space!
                </p>
              </div>

              <div className="space-y-4 text-xs text-coffee-300">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 text-accent-amber shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white">Cafe Address:</h4>
                    <p className="mt-0.5">Plot 12, Veer Nariman Road, Churchgate Sector, South Mumbai, MH, 400020.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MessageCircle className="h-4 w-4 text-accent-amber shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white">WhatsApp & Calling Desk:</h4>
                    <p className="mt-0.5">+91 98204-XXXXX (Available 7 AM to 11 PM daily)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="h-4 w-4 text-accent-amber shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white">Store Operating hours:</h4>
                    <p className="mt-0.5">Weekdays: 7:30 AM – 10:30 PM <br />Weekends: 7:00 AM – 11:30 PM</p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp connector from PRD */}
              <div className="bg-coffee-800 border border-coffee-700/60 p-4 rounded-xl">
                <h4 className="text-xs font-bold text-white">Need a Table for remote work?</h4>
                <p className="text-[11px] text-coffee-300 mt-0.5 mb-3">Shoot us a lightning WhatsApp message to lock pre-booking with charging socket access.</p>
                <a 
                  href="https://wa.me/919820400000?text=I%20want%20to%20pre-book%20a%20study%20table%20at%20Brew%20Inn"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center bg-accent-green hover:bg-accent-green/90 text-white rounded-lg text-xs font-bold px-4 py-2"
                >
                  <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
                  Message on WhatsApp
                </a>
              </div>
            </div>

            {/* Right Map layout simulation */}
            <div className="mt-12 lg:mt-0 lg:col-span-7 bg-coffee-800 rounded-2xl p-4 border border-coffee-700/50 relative overflow-hidden flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-wider font-bold text-accent-amber uppercase block mb-2">STORE LOCATION FINDER</span>
                <h4 className="text-sm font-bold text-white">Southern Coast Mumbai Central</h4>
              </div>

              {/* Visual Map Simulator */}
              <div className="my-4 h-64 rounded-xl bg-slate-900 border border-slate-800 relative z-10 flex flex-col items-center justify-center p-6 text-center">
                
                {/* Background grid representing city blocks */}
                <div className="absolute inset-0 bg-slate-950 opacity-40 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px]"></div>
                
                {/* Simulated navigation route */}
                <div className="absolute h-1 w-24 bg-accent-amber/40 rounded blur-xs rotate-12"></div>
                
                <div className="relative flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-accent-amber/20 border border-accent-amber flex items-center justify-center animate-bounce mb-3 shadow-lg shadow-accent-amber/20">
                    <MapPin className="h-6 w-6 text-accent-amber" />
                  </div>
                  
                  <h5 className="text-xs font-bold text-white">Brew Inn Cafe (Main Branch)</h5>
                  <p className="text-[10px] text-slate-400 mt-1 max-w-xs">Churchgate Central. Just 450 meters walk from the South Coast Station terminal building.</p>
                </div>

                <div className="absolute bottom-3 right-3 bg-slate-800/80 border border-slate-700 rounded-lg py-1 px-2.5 text-[8px] font-mono text-slate-200">
                  Lat: 18.932° N / Lon: 72.825° E
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-coffee-400">
                <span>Looking for deliveries? We partner with Swiggy & Zomato too.</span>
                <span className="mt-1 sm:mt-0 text-white font-bold hover:underline cursor-pointer" onClick={() => alert('Deliveries managed by Zomato/Swiggy. Pre-booking online saves platform margins.')}>
                  Order via Delivery Partners →
                </span>
              </div>
            </div>

          </div>

          {/* About us footer column story snippet */}
          <div className="mt-16 pt-8 border-t border-coffee-800 flex flex-col md:flex-row justify-between items-center text-xs text-coffee-400 gap-4">
            <div>
              <p className="font-bold text-coffee-200">The Brew Inn Mission Statement:</p>
              <p className="max-w-2xl mt-0.5">"To prove premium does not mean exclusive. We engineer coffee with playfulness and love, giving Mumbai's students and creators a digital and physical cozy oasis they can call home daily."</p>
            </div>
            <div className="text-right">
              <p>© 2026 Brew Inn Cafe. All rights reserved.</p>
              <p className="mt-0.5">Designed with absolute brand integrity.</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
