'use client';

import {
  ArrowLeftRight,
  CreditCard,
  LayoutDashboard,
  Shapes,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Transações',
    url: '/transactions',
    icon: ArrowLeftRight,
  },
  {
    title: 'Cartões de crédito',
    url: '/credit-cards',
    icon: CreditCard,
  },
  {
    title: 'Categorias',
    url: '/categories',
    icon: Shapes,
  },
];

export function AppSidebarMenu() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.url}>
          <SidebarMenuButton asChild isActive={pathname.startsWith(item.url)}>
            <Link href={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
