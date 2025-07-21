"use client";

import {Button} from "@/components/ui/button";
import {UserButton, SignInButton, SignedOut, SignedIn} from "@clerk/nextjs";

import { ClapperboardIcon, UserCircleIcon } from 'lucide-react';

export const AuthButton = () => {
  // TODO: 다른 로그인 상태 추가
  return (
    <>
      <SignedIn>
        <UserButton>
        {/* 사용자 프로필에 대한 메뉴 항목 추가 */}
          <UserButton.MenuItems>
            <UserButton.Link href="/studio" label="Studio" labelIcon={<ClapperboardIcon className="size-4" />} />
          </UserButton.MenuItems>
        </UserButton>
        {/* 유저 메뉴 위치 변경 1. 스튜디오 2. manageAccount 3. 로그아웃 */}
        <UserButton.Action label="manageAccount" />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal" >
          <Button
            variant="outline"
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500 border-blue-500/20 rounded-full shadow-none"
          >
            <UserCircleIcon />
            로그인
          </Button>
        </SignInButton>
      </SignedOut>
    </>
  )
}