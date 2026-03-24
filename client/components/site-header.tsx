"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeartHandshakeIcon, Menu } from "lucide-react";

export default function Header() {
	const navLinkStyle =
		"group relative px-3 py-2 text-sm font-medium tracking-wide text-red-700 transition-colors duration-300";
	return (
		// Sticky header: use defined z-scale "sticky header: z-20" to replace arbitrary values
		<header className="w-full bg-white sticky top-0 z-99 shadow-md p-2">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-14">
					<div className="flex items-center gap-3">
						<Link
							href="/"
							aria-label="QuakeAlert home"
							className="inline-flex items-center"
						>
							<Image
								src="/quakealertlogo.png"
								alt="QuakeAlert logo"
								width={200}
								height={100}
								className="object-contain p-2"
								priority
							/>
						</Link>
					</div>
					<nav
						aria-label="Primary navigation"
						className="hidden sm:flex items-center gap-6"
					>
						<Link href="/" className={navLinkStyle}>
							Home
							<span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-red-700 transition-all duration-300 group-hover:w-full" />
						</Link>

						<Link href="/quakefeed" className={navLinkStyle}>
							Quake Feed
							<span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-red-700 transition-all duration-300 group-hover:w-full" />
						</Link>

						<Link href="/about" className={navLinkStyle}>
							About
							<span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-red-700 transition-all duration-300 group-hover:w-full" />
						</Link>

						<Button
							size="lg"
							className="bg-red-600 hover:bg-red-700 text-white"
						>
							Donate
							<HeartHandshakeIcon className="ml-2 h-4 w-4" />
						</Button>
					</nav>
				</div>
			</div>
		</header>
	);
}
