import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Menu, X } from 'lucide-react';

const links = [
  { label: 'Explore', href: '/#explore' },
  { label: 'My Paths', href: '/#my-paths' },
  { label: 'Resources', href: '/#resources' },
  { label: 'Community', href: '/#community' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => navigate('/begin');

  return (
    <nav className="sticky top-0 z-40 bg-paper/90 backdrop-blur border-b border-card-line">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 shrink-0"
        >
          <span className="font-display text-[1.4rem] font-semibold tracking-tight text-ink">
            Pathwise <span className="text-forest">AI</span>
          </span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[15px] text-ink-soft hover:text-ink transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-5">
          <button
            aria-label="Notifications"
            className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-paper-soft transition-colors"
          >
            <Bell className="w-[18px] h-[18px] text-ink-soft" />
          </button>
          <button
            aria-label="Profile"
            className="w-9 h-9 rounded-full bg-sage-bg flex items-center justify-center text-sage-ink font-display font-semibold text-sm"
          >
            P
          </button>
          <button
            onClick={handleGetStarted}
            className="bg-forest hover:bg-forest-dark text-paper px-5 py-2.5 rounded-full font-medium text-[15px] transition-colors cursor-pointer"
          >
            Get Started
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-ink" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden px-6 pb-6 space-y-4 border-t border-card-line pt-4">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="block text-ink-soft">
              {l.label}
            </a>
          ))}
          <button
            onClick={handleGetStarted}
            className="w-full bg-forest text-paper px-4 py-3 rounded-full font-medium"
          >
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
}
