"use client"

import {HistoryIcon, ListVideoIcon, ThumbsUpIcon} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import Link from "next/link";

const items = [
  {
    title: '시청 기록',
    url: '/playlist/history',
    icon: HistoryIcon,
    auth: true
  },
  {
    title: '좋아요',
    url: '/playlist/liked',
    icon: ThumbsUpIcon,
    auth: true
  },
  {
    title: '재생 목록',
    url: '/playlist',
    icon: ListVideoIcon,
    auth: true
  },
];

export const PersonalSection = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>You</SidebarGroupLabel>
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