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
    url: "/register", // 페이지 경로로 변경
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
  }
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
        border-r border-orange-200/30 bg-gradient-to-b from-slate-50 via-blue-50/30 to-indigo-50/40 backdrop-blur-sm transition-all duration-300 ease-in-out shadow-lg
        ${isCollapsed ? 'w-16' : 'w-64'}
        h-screen flex-shrink-0
      `}
    >
      {/* 헤더 - 브랜딩 영역 (헤더 높이만큼 여백 추가) */}
      <SidebarHeader className="border-b border-slate-200/50 bg-gradient-to-r from-slate-100/80 to-blue-100/60 pt-20 pb-4 backdrop-blur-sm">
        <div className={`flex items-center w-full ${isCollapsed ? 'justify-center px-4' : 'gap-2 px-4'}`}>
          {!isCollapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-slate-700 truncate">대시보드</p>
              <p className="text-xs text-slate-500 truncate">반려동물 관리</p>
            </div>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full flex items-center justify-center shadow-sm">
              <Home className="h-4 w-4 text-slate-600" />
            </div>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-gradient-to-b from-transparent via-slate-50/20 to-blue-50/30">
        {/* 메인 메뉴 */}
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-slate-600 font-medium px-4 py-2">
              메인 메뉴
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className="hover:bg-blue-50/50 hover:text-slate-700 transition-colors group"
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
                      <item.icon className="h-4 w-4 flex-shrink-0 group-hover:text-blue-600 text-slate-600" />
                      {!isCollapsed && <span className="truncate text-slate-700">{item.title}</span>}
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
            <SidebarGroupLabel className="text-slate-600 font-medium px-4 py-2">
              설정
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className="hover:bg-blue-50/50 hover:text-slate-700 transition-colors group"
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
                      <item.icon className="h-4 w-4 flex-shrink-0 group-hover:text-blue-600 text-slate-600" />
                      {!isCollapsed && <span className="truncate text-slate-700">{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-slate-200/50 bg-gradient-to-r from-slate-100/60 to-blue-100/40 backdrop-blur-sm">
        <div className="px-4 py-3">
          {!isCollapsed && (
            <p className="text-xs text-slate-400 text-center">
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