"use client"

import {FlameIcon, HomeIcon, PlaySquareIcon} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import Link from "next/link";

const items = [
  {
    title: '홈',
    url: '/',
    icon: HomeIcon
  },
  {
    title: '구독',
    url: '/feed/subscriptions',
    icon: PlaySquareIcon,
    auth: true
  },
  {
    title: '인기 급상승',
    url: '/feed/trending',
    icon: FlameIcon
  },
];

export const MainSection = () => {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                asChild
                isActive={false}  // TODO: 현재 경로 변경 추가
                onClick={() => {}} // TODO: 현재 경로 변경 추가
              >
                <Link href={item.url} className="flex items-center gap-4">
                  <item.icon />
                  <span className="text-sm">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}