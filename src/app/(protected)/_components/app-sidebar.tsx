import { ArrowLeftRight, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

import FinTrack from '@/components/logos/fintrack';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import SignOutButton from '../dashboard/_components/sign-out-button';

const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Trasações',
    url: '/transactions',
    icon: ArrowLeftRight,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-6">
        <FinTrack />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SignOutButton />
      </SidebarFooter>
    </Sidebar>
  );
}
