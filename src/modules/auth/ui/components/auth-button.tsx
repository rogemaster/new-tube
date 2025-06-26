"use client";

import {Button} from "@/components/ui/button";
import {UserButton, SignInButton, SignedOut, SignedIn} from "@clerk/nextjs";

import {UserCircleIcon} from "lucide-react";

export const AuthButton = () => {
  // TODO: 다른 로그인 상태 추가
  return (
    <>
      <SignedIn>
        <UserButton />
        {/* 스튜디오와 사용자 프로필에 대한 메뉴 항목 추가 */}
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