import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { createPageUrl } from "@/lib/utils";
import { CTAButton } from "@/components/CTAButton";
import ChatWidget from "@/components/ChatWidget";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Solutions", href: createPageUrl("Solutions") },
    { name: "How It Works", href: createPageUrl("HowItWorks") },
    { name: "About", href: createPageUrl("About") },
    { name: "Book a Call", href: createPageUrl("BookACall") },
  ];

  const isActive = (href: string) => location === href;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Skip to content */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-foreground focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:text-sm"
      >
        Skip to content
      </a>

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <nav className="max-w-[1400px] mx-auto px-6 lg:px-10" aria-label="Main navigation">
          <div className="flex items-center justify-between h-[68px]">
            {/* Logo */}
            <Link href={createPageUrl("Home")}>
              <div className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity">
                <img
                  src="/new_logo.png"
                  alt="Unkommon"
                  className="w-7 h-7 object-contain invert"
                  width={28}
                  height={28}
                />
                <span className="text-[15px] font-semibold tracking-tight uppercase text-foreground">
                  Unkommon
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Center */}
            <div className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span
                    className={`text-[14px] font-normal transition-colors cursor-pointer hover:text-foreground ${
                      isActive(item.href) ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <CTAButton href={createPageUrl("BookACall")}>
                Let's talk
              </CTAButton>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-foreground/5 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-6 border-t border-border">
              <div className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <span
                      className={`text-[15px] font-normal transition-colors cursor-pointer block ${
                        isActive(item.href) ? "text-foreground" : "text-muted-foreground"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </span>
                  </Link>
                ))}
                <div className="mt-2" onClick={() => setMobileMenuOpen(false)}>
                  <CTAButton href={createPageUrl("BookACall")}>
                    Let's talk
                  </CTAButton>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main id="main">{children}</main>

      {/* Footer */}
      <footer className="bg-black text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left Side - CTA */}
            <div>
              <p className="text-white/60 text-sm mb-2">Work with us</p>
              <h3 className="text-2xl md:text-3xl font-normal tracking-tight leading-snug mb-8">
                Start with a free, thirty minute
                <br />
                architecture review call.
              </h3>
              <CTAButton href={createPageUrl("BookACall")} variant="light">
                Let's talk
              </CTAButton>
            </div>

            {/* Right Side - Links */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/60 mb-4">
                  Social
                </h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="https://www.linkedin.com/company/unkommon-ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[14px] text-white/80 hover:text-white transition-colors"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/unkommon.ai/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[14px] text-white/80 hover:text-white transition-colors"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:contact@unkommon.ai"
                      className="text-[14px] text-white/80 hover:text-white transition-colors"
                    >
                      Email
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/60 mb-4">
                  Company
                </h4>
                <ul className="space-y-3">
                  <li>
                    <Link href={createPageUrl("About")}>
                      <span className="text-[14px] text-white/80 hover:text-white transition-colors cursor-pointer">
                        About
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href={createPageUrl("BookACall")}>
                      <span className="text-[14px] text-white/80 hover:text-white transition-colors cursor-pointer">
                        Book a Call
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/sources">
                      <span className="text-[14px] text-white/80 hover:text-white transition-colors cursor-pointer">
                        Sources
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy">
                      <span className="text-[14px] text-white/80 hover:text-white transition-colors cursor-pointer">
                        Privacy Policy
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms">
                      <span className="text-[14px] text-white/80 hover:text-white transition-colors cursor-pointer">
                        Terms of Service
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img
                src="/new_logo.png"
                alt="Unkommon"
                className="w-10 h-10 object-contain"
                width={40}
                height={40}
              />
            </div>
            <p className="text-[13px] text-white/40">
              &copy; {new Date().getFullYear()} Unkommon. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* AI Chatbot Widget */}
      <ChatWidget />
    </div>
  );
}
