"use client"
import React from 'react'
import IconSolarLogout from '../icons/icon-logout';
import { signOut } from 'next-auth/react';
import { cn } from "@/lib/utils";

const SignoutBtn = ({ className }: { className?: string }) => {
  return (
    <button
      className={cn("flex gap-2.25 cursor-pointer items-center", className)}
      type="button"
      onClick={() => signOut()}
    >
      <IconSolarLogout className="size-6 text-secondary-900" />
      <span className="font-medium text-secondary-900">logout</span>
    </button>
  );
};

export default SignoutBtn