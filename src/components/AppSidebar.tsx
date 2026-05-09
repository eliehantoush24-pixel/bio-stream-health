import {
  Activity, Heart, Users, Bell, Cpu, MessageCircle, User, LogOut, LayoutDashboard, Key, Mail,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import { useI18n } from "@/hooks/useI18n";

const patientItems = [
  { titleKey: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { titleKey: "My Profile", url: "/profile", icon: User },
  { titleKey: "Device", url: "/device", icon: Cpu },
  { titleKey: "API Keys", url: "/api-keys", icon: Key },
  { titleKey: "Chat", url: "/chat", icon: MessageCircle },
  { titleKey: "Contact Us", url: "/contact", icon: Mail },
];

const doctorItems = [
  { titleKey: "Doctor View", url: "/doctor", icon: Users },
  { titleKey: "Alerts", url: "/alerts", icon: Bell },
  { titleKey: "Chat", url: "/chat", icon: MessageCircle },
  { titleKey: "My Profile", url: "/profile", icon: User },
  { titleKey: "Contact Us", url: "/contact", icon: Mail },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { t } = useI18n();
  const role = (typeof window !== "undefined" && localStorage.getItem("userRole")) === "doctor" ? "doctor" : "patient";
  const mainItems = role === "doctor" ? doctorItems : patientItems;

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center gap-2 px-3 py-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Activity className="h-4 w-4 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="text-sm font-semibold text-sidebar-accent-foreground font-display">{t("HealthLink")}</h2>
                <p className="text-[10px] text-sidebar-foreground">{t("Health Monitor")}</p>
              </div>
            )}
          </div>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>{t("Navigation")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.titleKey}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <NavLink to={item.url} end activeClassName="bg-sidebar-accent text-sidebar-primary">
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{t(item.titleKey)}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/" activeClassName="" onClick={() => localStorage.removeItem("userRole")}>
                <LogOut className="h-4 w-4" />
                {!collapsed && <span>{t("Logout")}</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
