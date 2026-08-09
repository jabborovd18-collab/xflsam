'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky top-0 z-50 glass-card mx-4 my-2 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-xfl-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
          <path d="M2 12h20"></path>
        </svg>
        <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-xfl-primary-light to-xfl-accent">
          XFL
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <Link href="/" className="text-xfl-text hover:text-xfl-accent transition-colors font-medium relative group">
          Bosh sahifa
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-xfl-accent transition-all group-hover:w-full"></span>
        </Link>
        <Link href="/klublar" className="text-xfl-text hover:text-xfl-accent transition-colors font-medium relative group">
          Klublar
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-xfl-accent transition-all group-hover:w-full"></span>
        </Link>
        <Link href="/transferlar" className="text-xfl-text hover:text-xfl-accent transition-colors font-medium relative group">
          Transferlar
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-xfl-accent transition-all group-hover:w-full"></span>
        </Link>
        <Link href="/stadionlar" className="text-xfl-text hover:text-xfl-accent transition-colors font-medium relative group">
          Stadionlar
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-xfl-accent transition-all group-hover:w-full"></span>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-4">
        <button className="text-xfl-text-dim hover:text-xfl-text transition-colors">UZ / RU</button>
        <button className="px-5 py-2 rounded-full bg-gradient-to-r from-xfl-primary to-xfl-primary-light text-white font-medium hover:scale-105 transition-transform shadow-[0_0_15px_rgba(27,94,32,0.5)]">
          Kirish
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-xfl-text" onClick={toggleMenu}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-card p-4 flex flex-col gap-4 md:hidden">
          <Link href="/" className="text-xfl-text hover:text-xfl-accent transition-colors" onClick={toggleMenu}>Bosh sahifa</Link>
          <Link href="/klublar" className="text-xfl-text hover:text-xfl-accent transition-colors" onClick={toggleMenu}>Klublar</Link>
          <Link href="/transferlar" className="text-xfl-text hover:text-xfl-accent transition-colors" onClick={toggleMenu}>Transferlar</Link>
          <Link href="/stadionlar" className="text-xfl-text hover:text-xfl-accent transition-colors" onClick={toggleMenu}>Stadionlar</Link>
          <hr className="border-xfl-border" />
          <button className="text-left text-xfl-text-dim hover:text-xfl-text transition-colors">UZ / RU</button>
          <button className="px-5 py-2 rounded-full bg-gradient-to-r from-xfl-primary to-xfl-primary-light text-white font-medium w-full text-center">
            Kirish
          </button>
        </div>
      )}
    </nav>
  );
}
