import FinTrack from '@/components/logos/fintrack';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';

import SignOutButton from '../dashboard/_components/sign-out-button';
import { AppSidebarMenu } from './app-sidebar-menu';

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-6">
        <FinTrack />
      </SidebarHeader>
      <SidebarContent>
        <AppSidebarMenu />
      </SidebarContent>
      <SidebarFooter>
        <SignOutButton />
      </SidebarFooter>
    </Sidebar>
  );
}
