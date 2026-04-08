import {
  Briefcase,
  Car,
  Folder,
  GraduationCap,
  HeartPulse,
  Home,
  LucideIcon,
  Plane,
  ShoppingCart,
  Utensils,
  Zap,
} from 'lucide-react';

export const ICON_MAP: Record<string, LucideIcon> = {
  Home,
  Utensils,
  ShoppingCart,
  Car,
  HeartPulse,
  GraduationCap,
  Zap,
  Briefcase,
  Plane,
  Folder,
};

export type IconName = keyof typeof ICON_MAP;
export const ICON_NAMES = Object.keys(ICON_MAP) as IconName[];
