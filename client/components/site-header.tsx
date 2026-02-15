"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full bg-white sticky top-0 z-999 shadow-md p-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <Link href="/" aria-label="QuakeAlert home" className="inline-flex items-center">
              <Image src="/quakealertlogo.png" alt="QuakeAlert logo" width={180} height={100} className="object-contain p-2" priority />
            </Link>
          </div>

          <nav aria-label="Primary navigation" className="hidden sm:flex items-center gap-6">
            <Link href="/" className="text-sm bg-white text-red-700 hover:bg-red-700 hover:text-white rounded-2xl p-2">Home</Link>
            <Link href="/maps" className="text-sm bg-white text-red-700 hover:bg-red-700 hover:text-white rounded-2xl p-2">Maps</Link>
            <Link href="/about" className="text-sm bg-white text-red-700 hover:bg-red-700 hover:text-white rounded-2xl p-2">About</Link>
            <Button variant="ghost" size="sm" className="ml-2"> <Menu className=" bg-white text-red-700  hover:bg-red-700 hover:text-white rounded-2xl h-4 w-4" /> </Button>
          </nav>

          <div className="sm:hidden">
            <button aria-label="Open menu" className="p-2 rounded-md hover:bg-muted/40">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="sm:hidden px-4 pb-4">
        <nav className="flex flex-row gap-5">
          <Link href="/" className="text-sm">Home</Link>
          <Link href="/maps" className="text-sm">Map</Link>
          <Link href="/about" className="text-sm">About</Link>
        </nav>
      </div>
    </header>
  );
}
