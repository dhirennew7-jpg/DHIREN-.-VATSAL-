import React from 'react';
import { Coffee, ShieldCheck, Heart, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentTab: 'website' | 'strategy';
  setCurrentTab: (tab: 'website' | 'strategy') => void;
  cartCount: number;
  openCart: () => void;
}

export default function Navbar({ currentTab, setCurrentTab, cartCount, openCart }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-coffee-900/10 bg-coffee-50/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-8 lg:px-12">
        
        {/* LOGO MATCHING EDITORIAL SPEC */}
        <div 
          onClick={() => setCurrentTab('website')} 
          className="flex cursor-pointer items-center space-x-3 group"
          id="logo-container"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-coffee-900 text-coffee-900 transition-transform group-hover:scale-105">
            <Coffee className="h-4.5 w-4.5" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter uppercase text-coffee-900 leading-none">
              Brew <span className="text-accent-amber">Inn</span>
            </h1>
            <span className="font-mono text-[9px] tracking-[0.25em] text-coffee-600 uppercase font-bold">
              Lifestyle Series
            </span>
          </div>
        </div>

        {/* EDITORIAL VIEW SWITCHER */}
        <div className="flex items-center space-x-1.5 rounded-full border border-coffee-900/15 p-1 bg-coffee-150/50">
          <button
            onClick={() => setCurrentTab('website')}
            id="nav-btn-website"
            className={`flex items-center space-x-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all ${
              currentTab === 'website'
                ? 'bg-coffee-900 text-white shadow-xs'
                : 'text-coffee-700 hover:text-coffee-900 hover:bg-coffee-200/50'
            }`}
          >
            <Sparkles className="h-3 w-3" />
            <span>Café Room</span>
          </button>
          
          <button
            onClick={() => setCurrentTab('strategy')}
            id="nav-btn-strategy"
            className={`flex items-center space-x-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all ${
              currentTab === 'strategy'
                ? 'bg-coffee-900 text-white shadow-xs'
                : 'text-coffee-700 hover:text-coffee-900 hover:bg-coffee-200/50'
            }`}
          >
            <ShieldCheck className="h-3 w-3" />
            <span>HQ Deck</span>
          </button>
        </div>

        {/* RIGHT ACTION CONTROLS */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-coffee-600 bg-[#EFECE7] px-3.5 py-1.5 rounded-full border border-coffee-900/5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-amber"></span>
            <span>Mumbai Native</span>
          </div>

          <button
            onClick={openCart}
            id="nav-cart-btn"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-coffee-900 text-coffee-900 transition-colors hover:bg-coffee-900 hover:text-white"
            aria-label="Selection bag"
          >
            <Heart className="h-4.5 w-4.5 fill-current text-accent-amber" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent-amber text-[10px] font-bold text-white shadow-xs ring-2 ring-coffee-50 animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
