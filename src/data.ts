import { MenuItem, BrandPersona, CompetitorComparison, KPIMetric, UserReview } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // COFFEE
  {
    id: 'c1',
    name: 'Classic Cardamom Latte',
    description: 'Fresh espresso pulled over organic milk infused with aromatic fresh cardamom. Warm, comforting, and local.',
    price: 180,
    category: 'Coffee',
    imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600',
    tags: ['Aromatic', 'Warm', 'Best Seller'],
    isPopular: true,
    calories: 145
  },
  {
    id: 'c2',
    name: 'Dark Chocolate Macchiato',
    description: 'Double shot of signature roast layered over steamed milk and artisanal single-origin dark chocolate sauce.',
    price: 190,
    category: 'Coffee',
    imageUrl: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&q=80&w=600',
    tags: ['Rich', 'Savoury', 'Chocolaty'],
    calories: 190
  },
  {
    id: 'c3',
    name: 'Spiced Vanilla Flat White',
    description: 'Velvety micro-foam poured over short ristretto shots, sweetened with real madagascar vanilla bean paste.',
    price: 175,
    category: 'Coffee',
    imageUrl: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&q=80&w=600',
    tags: ['Smooth', 'Vanilla', 'Cozy'],
    isPopular: true,
    calories: 120
  },
  {
    id: 'c4',
    name: 'Mocha Cortado',
    description: 'Perfectly balanced 1:1 ratio of strong espresso and steamed cocoa milk. Strong kick with a sweet finish.',
    price: 160,
    category: 'Coffee',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600',
    tags: ['Strong', 'Cocoa'],
    calories: 90
  },

  // COLD COFFEE
  {
    id: 'cc1',
    name: 'Brew Inn Double Blended Frappé',
    description: 'Ultra-creamy, velvety blended shaker cold coffee. Double shot kick, whipped high, served icy cold.',
    price: 220,
    category: 'Cold Coffee',
    imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=600',
    tags: ['Icy', 'Super Creamy', 'Cult Classic'],
    isPopular: true,
    calories: 280
  },
  {
    id: 'cc2',
    name: 'Salted Butterscotch Cold Brew',
    description: 'Our slow 18-hour cold brew coffee topped with a thick, decadent salted butterscotch cold foam.',
    price: 240,
    category: 'Cold Coffee',
    imageUrl: 'https://images.unsplash.com/photo-1461023717666-51f6d636bcfd?auto=format&fit=crop&q=80&w=600',
    tags: ['Sweet-Salty', 'Cold Foam', 'Slow Brewed'],
    calories: 110
  },
  {
    id: 'cc3',
    name: 'Rose Pistachio Cold Latte',
    description: 'A layered botanical surprise: double espresso poured over pastel rose-milk and crushed raw pistachios.',
    price: 240,
    category: 'Cold Coffee',
    imageUrl: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&q=80&w=600',
    tags: ['Instagrammable', 'Nutty', 'Florals'],
    isPopular: true,
    calories: 195
  },
  {
    id: 'cc4',
    name: 'Iced Hazelnut Shakeout',
    description: 'Espresso shaken hard with ice, oat milk, and premium toasted hazelnut syrup. Light and frothy.',
    price: 210,
    category: 'Cold Coffee',
    imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600',
    tags: ['Oat Milk Available', 'Light', 'Nutty'],
    calories: 140
  },

  // SIGNATURE DRINKS
  {
    id: 's1',
    name: 'Popcorn Toffee Crunch Latte',
    description: 'Playful hot double shot espresso drink topped with buttery toffee drizzle and dynamic caramelized popcorn crumbs.',
    price: 250,
    category: 'Signature Drinks',
    imageUrl: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=600',
    tags: ['Playful', 'Toffee Crunchy', 'Gen Z Favorite'],
    isPopular: true,
    calories: 320
  },
  {
    id: 's2',
    name: 'Smoked Vanilla Espresso Tonic',
    description: 'Craft sparkling tonic water spiked with chilled espresso, custom smoked orange vanilla syrup, and rosemary sprig.',
    price: 230,
    category: 'Signature Drinks',
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600',
    tags: ['Sparkling', 'Smoky', 'Refreshing'],
    calories: 85
  },
  {
    id: 's3',
    name: 'Layered Coconut Matcha Cloud',
    description: 'Vibrant Japanese stone-ground green tea layered over iced sweetened coconut milk, topped with rich velvet cream.',
    price: 270,
    category: 'Signature Drinks',
    imageUrl: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=600',
    tags: ['No Espresso', 'Matcha', 'Velvet Cloud'],
    isPopular: true,
    calories: 180
  },

  // BOWLS
  {
    id: 'b1',
    name: 'Mumbai Berry Acai Bowl',
    description: 'Antioxidant-thick dark acai berry blend topped with local fresh strawberries, hemp seeds, organic honey, and house granola.',
    price: 310,
    category: 'Bowls',
    imageUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80&w=600',
    tags: ['Healthy', 'Crunchy', 'Superfood'],
    isPopular: true,
    calories: 340
  },
  {
    id: 'b2',
    name: 'Nutella Espresso Yogurt Bowl',
    description: 'Thick Greek yogurt swirled with organic dark cocoa, espresso, raw chopped almonds, and fresh dark berries.',
    price: 290,
    category: 'Bowls',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=600',
    tags: ['Rich Protein', 'Coffee Swirl'],
    calories: 390
  },

  // DESSERTS
  {
    id: 'd1',
    name: 'Lava-Salted Espresso Brownie',
    description: 'Fudgy, warm, molten-centered Belgian chocolate brownie baked with coffee grinds and sprinkled with Maldon salt crystals.',
    price: 190,
    category: 'Desserts',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600',
    tags: ['Warm', 'Belgian Chocolate', 'Indulgent'],
    isPopular: true,
    calories: 420
  },
  {
    id: 'd2',
    name: 'New York Espresso Cheesecake',
    description: 'Silky, dense cream cheese combined with an espresso ripple over a butter-rich dark chocolate graham crumb crust.',
    price: 220,
    category: 'Desserts',
    imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=600',
    tags: ['Cold', 'New York Style', 'Coffee Swirl'],
    calories: 380
  },
  {
    id: 'd3',
    name: 'Warm Toasted Pecan Cinnamon Roll',
    description: 'Gooey, fresh, oven-baked cinnamon roll drizzled with dynamic brown butter icing and roasted pecans.',
    price: 160,
    category: 'Desserts',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
    tags: ['Oven Warm', 'Nutty Cinnamon'],
    calories: 310
  }
];

export const BRAND_PERSONAS: BrandPersona[] = [
  {
    id: 'p1',
    num: '01',
    name: 'Riya Sen',
    role: 'College Student (KC College)',
    age: 22,
    tagline: 'Wants aesthetic cafe vibes that don\'t break her monthly allowance.',
    goal: 'Meet friends between classes, study in a high-energy artistic spot, and post beautiful latte art photos on Instagram.',
    painPoint: 'Specialty roasteries feel highly gatekept and charge ₹350+ for a standard beverage. She feels intimidated ordering there.',
    brewInnSolution: 'Delivers creative, flavor-rich premium drinks at an average price of ₹180-₹220 with gorgeous social-media photogenic presentation.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    imageUrl: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&q=80&w=400',
    preferredDrinks: ['Classic Cardamom Latte', 'Rose Pistachio Cold Latte']
  },
  {
    id: 'p2',
    num: '02',
    name: 'Kabir Mehta',
    role: 'Freelance UI/UX Designer',
    age: 29,
    tagline: 'Demands comfortable seating, fast WiFi, and high-integrity cold brew.',
    goal: 'Wants a vibrant space to sit with his laptop for 3-hour sprints, enjoy double cold coffee, and meet other creative professionals.',
    painPoint: 'Most cafes are either overly loud, have unstable internet, or feel stuffy and formal. Blue Tokai feels focused on strict coffee experts, lacking a casual lifestyle workspace vibe.',
    brewInnSolution: 'A welcoming custom remote-work culture with charging portals, premium ergonomic lounge seating, and creative brain-boost espresso tonic tonics.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400',
    preferredDrinks: ['Salted Butterscotch Cold Brew', 'Mocha Cortado']
  },
  {
    id: 'p3',
    num: '03',
    name: 'Ananya Sharma',
    role: 'Digital Content Creator',
    age: 24,
    tagline: 'Always hunting for unique sensory culinary experiences to share.',
    goal: 'Publish engaging reels, find high-novelty signature drinks to review, and organize local community creator meetups.',
    painPoint: 'Traditional "old school" cafes serve boring dark roast milk. Specialty shops focus on bean origin education and criticize sweet, creative flavor profiles.',
    brewInnSolution: 'The "Popcorn Toffee Crunch Latte" and experimental cold foam blends provide perfect aesthetic ASMR visual items for viral community reels.',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    imageUrl: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80&w=400',
    preferredDrinks: ['Popcorn Toffee Crunch Latte', 'Layered Coconut Matcha Cloud']
  }
];

export const BRAND_COMPARISON: CompetitorComparison[] = [
  {
    feature: 'Core Philosophy',
    brewInn: 'Everyday lifestyle, creative coffee escape',
    blueTokai: 'Technical coffee expertise, origin authority',
    winner: 'Tie',
    rational: 'Brew Inn creates friendly community rituals; Blue Tokai caters to technical coffee connoisseurs. Different but vital.'
  },
  {
    feature: 'Average Price Point',
    brewInn: '₹150 – ₹250 (Highly Premium yet Affordable)',
    blueTokai: '₹300 – ₹450+ (High Barrier to Entry)',
    winner: 'Brew Inn',
    rational: 'Brew Inn offers everyday retention with a 40% lower price tag, yielding high-frequency morning and evening visits.'
  },
  {
    feature: 'Gen Z Alignment',
    brewInn: 'High: ASMR content, aesthetic custom drinks, community spaces',
    blueTokai: 'Low-Medium: Educational focus, minimal style can feel intimidating',
    winner: 'Brew Inn',
    rational: 'Brew Inn speaks to Gen Z through self-expression, creative flavors, and social media lifestyle alignment.'
  },
  {
    feature: 'Product Range',
    brewInn: 'Flavor-forward, experimental, signature dessert-pairings',
    blueTokai: 'Single-origins, standard roasts, strict manual pour-overs',
    winner: 'Tie',
    rational: 'Specialty purists prefer Blue Tokai, but 85% of broader urban coffee consumers choose experimental beverage options.'
  },
  {
    feature: 'Space Ambience',
    brewInn: 'Warm, cozy lounge space, social community hubs',
    blueTokai: 'Minimalist industrial interiors, functional retail bays',
    winner: 'Brew Inn',
    rational: 'Brew Inn focuses on remote workers and social cafe hoppers wanting warm comfort rather than stark minimalist steel.'
  }
];

export const SWOT_ANALYSIS = {
  strengths: [
    { title: 'Local Agility', desc: 'Can implement trendy products, custom events, and local elements within 48 hours without corporate delay.' },
    { title: 'Visual Novelty', desc: 'Stunning layered creations (Rose Pistachio, Cardamom Latte) custom engineered for high Instagram shareability.' },
    { title: 'Community Appeal', desc: 'Built around hyper-local creators, warm community meetups, and comfortable workspace lounges.' }
  ],
  weaknesses: [
    { title: 'Lower Initial Awareness', desc: 'Smaller marketing footprint compared to national players with deeper backing and capital.' },
    { title: 'Trust Layer Maturity', desc: 'Lacks the multi-decade legacy reputation of old-school chains, requiring proactive, highly visible transparency.' }
  ],
  opportunities: [
    { title: 'Hyperlocal Programs', desc: 'Loyalty programs tailored to Mumbai college zones and co-working remote pods.' },
    { title: 'Subscription Model', desc: 'Introduces repeat daily habit loops through prepaid loyalty cards or student drink packages.' },
    { title: 'Interactive Events', desc: 'Weekly Open-Mics, Design Sprints, and Brewing-ASMR workshops for urban students.' }
  ],
  threats: [
    { title: 'Competitor Encroachment', desc: 'Blue Tokai launching high-sweetness beverage ranges or smaller express outlets.' },
    { title: 'Market Saturation', desc: 'Rapid duplication of creative drink menus by competing coffee houses in hot Mumbai sectors.' }
  ]
};

export const KPI_METRICS: KPIMetric[] = [
  {
    id: 'kpi1',
    name: 'Customer Retention Rate',
    value: '38.2',
    unit: '%',
    target: '> 35%',
    status: 'meeting',
    description: 'Percentage of clients ordering again within 30 days. Driven by targeted local loyalty credits and comfortable interiors.',
    historicalData: [
      { month: 'Jan', value: 31.2 },
      { month: 'Feb', value: 33.5 },
      { month: 'Mar', value: 34.1 },
      { month: 'Apr', value: 35.8 },
      { month: 'May', value: 37.0 },
      { month: 'Jun', value: 38.2 }
    ]
  },
  {
    id: 'kpi2',
    name: 'Instagram Save/Share Rate',
    value: '9.4',
    unit: '%',
    target: '> 8%',
    status: 'meeting',
    description: 'Ratio of Instagram interactions that are saves or direct shares. Prompted by creative visual presentation and ASMR cafe-reels styling.',
    historicalData: [
      { month: 'Jan', value: 5.2 },
      { month: 'Feb', value: 6.8 },
      { month: 'Mar', value: 7.5 },
      { month: 'Apr', value: 8.3 },
      { month: 'May', value: 9.0 },
      { month: 'Jun', value: 9.4 }
    ]
  },
  {
    id: 'kpi3',
    name: 'Website Conversion Rate',
    value: '4.6',
    unit: '%',
    target: '> 4%',
    status: 'meeting',
    description: 'Fraction of unique web interactions pulling up the order menu or driving local WhatsApp table booking actions.',
    historicalData: [
      { month: 'Jan', value: 2.8 },
      { month: 'Feb', value: 3.1 },
      { month: 'Mar', value: 3.5 },
      { month: 'Apr', value: 3.9 },
      { month: 'May', value: 4.2 },
      { month: 'Jun', value: 4.6 }
    ]
  },
  {
    id: 'kpi4',
    name: 'Average Order Value (AOV)',
    value: '₹285',
    unit: 'val',
    target: '₹220-₹300',
    status: 'meeting',
    description: 'Average ticket price. Supported by the menu upsell strategy: ordering a Signature Drink (₹250) + adding a Salted Espresso Brownie (₹190) with easy combo discounts.',
    historicalData: [
      { month: 'Jan', value: 240 },
      { month: 'Feb', value: 255 },
      { month: 'Mar', value: 260 },
      { month: 'Apr', value: 275 },
      { month: 'May', value: 280 },
      { month: 'Jun', value: 285 }
    ]
  },
  {
    id: 'kpi5',
    name: 'Weekly Footfall Growth',
    value: '18.4',
    unit: '%',
    target: '> 15%',
    status: 'meeting',
    description: 'Weekly growth in physical storefront check-ins and remote-work study group table bookings.',
    historicalData: [
      { month: 'Jan', value: 8.5 },
      { month: 'Feb', value: 11.2 },
      { month: 'Mar', value: 13.0 },
      { month: 'Apr', value: 14.8 },
      { month: 'May', value: 16.5 },
      { month: 'Jun', value: 18.4 }
    ]
  }
];

export const USER_REVIEWS: UserReview[] = [
  {
    id: 'r1',
    name: 'Sneha Patel',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    comment: 'The Popcorn Toffee Crunch Latte is an absolute dream! It literally feels like a luxury movie afternoon in a warm espresso cup. Also, the staff did not judge me when I spent 3 hours writing my college assignments with local Mumbai cardamom latte next to me.',
    drink: 'Popcorn Toffee Crunch Latte',
    date: 'Yesterday'
  },
  {
    id: 'r2',
    name: 'Devansh Roy',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    comment: 'Finally a Mumbai coffee shop that takes comfort seriously. Excellent high-speed WiFi, plenty of sockets, and actual ergonomic seats. The Salted Butterscotch Cold Brew foam was incredibly thick. Highly recommended for remote remote work sessions!',
    drink: 'Salted Butterscotch Cold Brew',
    date: '3 days ago'
  },
  {
    id: 'r3',
    name: 'Meera Deshmukh',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=150',
    rating: 4.8,
    comment: 'Super photogenic drinks! Layering this matcha with coconut milk is so smart. Highly aesthetic spot. Affordable pricing (unlike other specialty roaster brands that feel like a financial statement error). I posted a reel that got 12k views already!',
    drink: 'Layered Coconut Matcha Cloud',
    date: 'Last week'
  }
];
