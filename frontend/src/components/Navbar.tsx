"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onSearch?: (query: string) => void;
  debounceMs?: number;
}

export default function Navbar({ onSearch, debounceMs = 200 }: NavbarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Debounce the search input
  useEffect(() => {
    if (!onSearch) return;
    const id = setTimeout(() => {
      onSearch(query.trim());
    }, debounceMs);
    return () => clearTimeout(id);
  }, [query, onSearch, debounceMs]);

  // ✅ Show placeholder only on homepage
  const placeholderText = pathname === "/" ? "Search Experience" : "";

  return (
    <nav className="bg-[#F9F9F9] shadow-[0_2px_16px_0_#0000001A]">
      <div className="max-w-[1440px] mx-auto h-[87px] flex justify-between items-center py-4 px-6 md:px-[124px]">
        {/* ---------- Logo ---------- */}
        <Link href="/" className="flex items-center">
          <img
            src="/images/attachment.png"
            alt="Highway Delite"
            className="w-[100px] h-[55px] object-contain cursor-pointer"
          />
        </Link>

        {/* ---------- Desktop Search Bar ---------- */}
        <div className="hidden md:flex items-center gap-2.5">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholderText}
            className="w-[340px] h-[42px] rounded-lg py-3 px-5 text-gray-700 bg-[#EDEDED] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-200"
          />
          <button
            className="w-[87px] h-[42px] rounded-lg bg-[#FFD643] font-inter font-medium text-[14px] leading-[18px] text-black hover:bg-[#ffcd1c] transition"
          >
            Search
          </button>
        </div>

        {/* ---------- Mobile Hamburger ---------- */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-yellow-100"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ---------- Mobile Dropdown ---------- */}
      {menuOpen && (
        <div className="flex flex-col items-center gap-3 pb-4 md:hidden">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholderText}
            className="w-[85%] h-[42px] rounded-lg py-3 px-5 text-gray-700 bg-[#EDEDED] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
          <button
            className="w-[85%] h-[42px] rounded-lg bg-[#FFD643] font-inter font-medium text-[14px] leading-[18px] text-black hover:bg-[#ffcd1c] transition"
          >
            Search
          </button>
        </div>
      )}
    </nav>
  );
}
