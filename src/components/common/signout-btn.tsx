"use client"
import React from 'react'
import IconSolarLogout from '../icons/icon-logout';
import { signOut } from 'next-auth/react';

const SignoutBtn = () => {
  return (
    <button
      className="right-10 bottom-10 fixed flex gap-2.25 cursor-pointer"
      type="button"
      onClick={() => signOut()}
    >
      <IconSolarLogout className="size-6 text-secondary-900" />
      <span className="font-medium text-6 text-secondary-900">logout</span>
    </button>
  );
}

export default SignoutBtn