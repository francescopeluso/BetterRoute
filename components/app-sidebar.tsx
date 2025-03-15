import { Calendar, Home, FileWarningIcon, Sparkles, MapIcon, Truck, ChartArea } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
 
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Statistiche",
    url: "/stats",
    icon: ChartArea,
  },
  {
    title: "Gestisci consegne",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Pianifica rotte",
    url: "/route-planner",
    icon: MapIcon,
  },
  {
    title: "Flotta mezzi",
    url: "/fleet",
    icon: Truck,
  },
  {
    title: "Report errori",
    url: "/reports",
    icon: FileWarningIcon,
  }
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="flex items-center justify-center">
              <span className="text-3xl font-bold mt-4">
                🚚 BetterRoute
              </span>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Pagine</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroupLabel className="mt-4">Funzioni AI</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key="Parla con Guido!">
                <SidebarMenuButton asChild>
                  <a href="/chatbot">
                    <Sparkles />
                    <span>Parla con Guido!</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}