import { ChevronRight, Moon, Sun, Trash } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { useTheme } from "../../providers/theme-provider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { useFavoriteCitiesStore } from "@/state/favorite-city-store"
import { Button } from "../ui/button"
import { NavLink } from "react-router"

export function AppSidebar() {
  const { setTheme } = useTheme()
  const { favoriteCities, removeFavorite } = useFavoriteCitiesStore()

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <NavLink to="/">
              Alnawettura
            </NavLink>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to={'search'}>
                    <span>Suche</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <Collapsible className="group/collapsible" >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton title="Favoriten">
                      Favoriten
                      {favoriteCities.length > 0 && <ChevronRight />}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {favoriteCities.map((city) => (
                        <SidebarMenuSubItem key={city.name} className="flex justify-between items-center">
                          <NavLink to={`/weather-detail/${city.name}`}>
                            {city.name}
                          </NavLink>
                          <Button variant={"link"} onClick={() => removeFavorite(city)}> <Trash className="h-4" /></Button>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="">Theme</span>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              className="w-[--radix-popper-anchor-width]"
            >
              <DropdownMenuItem className="px-2" onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem className="px-2" onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem className="px-2" onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
