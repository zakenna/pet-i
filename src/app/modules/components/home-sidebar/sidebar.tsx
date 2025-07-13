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
  Calendar,
  HelpCircle
} from "lucide-react";

// 메뉴 아이템들을 정의
const menuItems = [
  {
    title: "홈",
    url: "/",
    icon: Home,
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
    url: "/profile",
    icon: User,
  },
  {
    title: "설정",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "도움말",
    url: "/help",
    icon: HelpCircle,
  },
];

const SidebarLayout = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-orange-500 text-white">
            🐾
          </div>
          <div>
            <p className="text-sm font-medium">Pet-I</p>
            <p className="text-xs text-muted-foreground">반려동물 관리</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        {/* 메인 메뉴 */}
        <SidebarGroup>
          <SidebarGroupLabel>메인 메뉴</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* 설정 메뉴 */}
        <SidebarGroup>
          <SidebarGroupLabel>설정</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="px-4 py-2">
          <p className="text-xs text-muted-foreground">
            © 2024 Pet-I. All rights reserved.
          </p>
        </div>
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  );
};

export default SidebarLayout;