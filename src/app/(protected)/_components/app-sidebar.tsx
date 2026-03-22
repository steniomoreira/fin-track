import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';

import SignOutButton from '../dashboard/_components/sign-out-button';

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SignOutButton />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
