import {
  Briefcase,
  Car,
  Clapperboard,
  Gift,
  GraduationCap,
  HeartPulse,
  Home,
  Lightbulb,
  LucideIcon,
  PawPrint,
  PiggyBank,
  Plane,
  Shirt,
  SoapDispenserDroplet,
  Tag,
  Utensils,
} from 'lucide-react';

export const ICON_MAP: Record<string, LucideIcon> = {
  Home,
  Utensils,
  Car,
  HeartPulse,
  GraduationCap,
  Briefcase,
  Clapperboard,
  Plane,
  Shirt,
  PawPrint,
  Lightbulb,
  PiggyBank,
  Gift,
  SoapDispenserDroplet,
  Tag,
};

export type IconName = keyof typeof ICON_MAP;
export const ICON_NAMES = Object.keys(ICON_MAP) as IconName[];
