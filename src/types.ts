export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Coffee' | 'Cold Coffee' | 'Signature Drinks' | 'Bowls' | 'Desserts';
  imageUrl: string;
  tags: string[];
  isPopular?: boolean;
  calories?: number;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  size: 'Regular' | 'Grande';
  milkOption?: string;
  sweetnessOption?: string;
}

export interface BrandPersona {
  id: string;
  num: string;
  name: string;
  role: string;
  age: number;
  tagline: string;
  goal: string;
  painPoint: string;
  brewInnSolution: string;
  avatarUrl: string;
  imageUrl: string;
  preferredDrinks: string[];
}

export interface CompetitorComparison {
  feature: string;
  brewInn: string;
  blueTokai: string;
  winner: 'Brew Inn' | 'Blue Tokai' | 'Tie';
  rational: string;
}

export interface KPIMetric {
  id: string;
  name: string;
  value: string;
  unit: string;
  target: string;
  status: 'meeting' | 'approaching' | 'needs_work';
  description: string;
  historicalData: { month: string; value: number }[];
}

export interface LoyaltyPointsHistory {
  id: string;
  date: string;
  action: string;
  points: number;
  type: 'earn' | 'redeem';
}

export interface ReferralHistory {
  id: string;
  name: string;
  status: 'Pending' | 'Completed';
  date: string;
  pointsEarned: number;
}

export interface UserReview {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  drink: string;
  date: string;
}
