"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { 
  Home,
  Settings,
  User,
  Heart,
  Activity,
  MapPin,
  Bell,
  Mic,
  HelpCircle,
  PlusCircle
} from "lucide-react";
import Link from "next/link";

// 메뉴 아이템들을 정의
const menuItems = [
  {
    title: "홈",
    url: "/",
    icon: Home,
  },
  {
    title: "반려동물 등록",
    url: "/api/register",
    icon: PlusCircle,
  },
  {
    title: "음성 기록",
    url: "/voice",
    icon: Mic,
  },
  {
    title: "활동 기록",
    url: "/activity",
    icon: Activity,
  },
  {
    title: "건강 관리",
    url: "/health",
    icon: Heart,
  },
  {
    title: "위치 정보",
    url: "/location",
    icon: MapPin,
  },
  {
    title: "알림",
    url: "/notifications",
    icon: Bell,
  },
];

// 설정 메뉴들
const settingsItems = [
  {
    title: "프로필",
    url: "/setting/profile",
    icon: User,
  },
  {
    title: "설정",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "도움말",
    url: "/setting/help",
    icon: HelpCircle,
  },
];

const SidebarLayout = () => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar 
      collapsible="icon"
      className={`
        border-r border-orange-100 bg-white/80 backdrop-blur-sm transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-16' : 'w-64'}
      `}
    >
      {/* 헤더 - 헤더와 정확히 같은 높이 */}
      <SidebarHeader className="h-[64px] border-b border-orange-100 bg-white/50 flex items-center justify-center">
        <div className={`flex items-center w-full ${isCollapsed ? 'justify-center' : 'gap-2 px-4'}`}>
          {!isCollapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-orange-800 truncate">Pet-I™</p>
              <p className="text-xs text-orange-600 truncate">반려동물 관리</p>
            </div>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-white/30">
        {/* 메인 메뉴 */}
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-orange-700 font-medium px-4 py-2">
              메인 메뉴
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className="hover:bg-orange-50 hover:text-orange-700 transition-colors group"
                    tooltip={isCollapsed ? item.title : undefined}
                  >
                    <Link 
                      href={item.url} 
                      className={`
                        flex items-center py-2 rounded-md
                        ${isCollapsed 
                          ? 'justify-center mx-auto h-10 w-10' 
                          : 'gap-3 px-3 mx-2'
                        }
                      `}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0 group-hover:text-orange-600" />
                      {!isCollapsed && <span className="truncate">{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* 설정 메뉴 */}
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-orange-700 font-medium px-4 py-2">
              설정
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className="hover:bg-orange-50 hover:text-orange-700 transition-colors group"
                    tooltip={isCollapsed ? item.title : undefined}
                  >
                    <Link 
                      href={item.url} 
                      className={`
                        flex items-center py-2 rounded-md
                        ${isCollapsed 
                          ? 'justify-center mx-auto h-10 w-10' 
                          : 'gap-3 px-3 mx-2'
                        }
                      `}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0 group-hover:text-orange-600" />
                      {!isCollapsed && <span className="truncate">{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-orange-100 bg-white/50">
        <div className="px-4 py-3">
          {!isCollapsed && (
            <p className="text-xs text-orange-500 text-center">
              © 2025 Pet-I. All rights reserved.
            </p>
          )}
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default SidebarLayout;