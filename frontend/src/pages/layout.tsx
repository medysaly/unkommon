import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { createPageUrl } from "@/lib/utils";
import ChatWidget from "@/components/ChatWidget";
import SwitchButton from "@/components/SwitchButton";
import SocialMediaIcons from "@/components/SocialMediaIcons";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: createPageUrl("Home") },
    { name: "Solutions", href: createPageUrl("Solutions") },
    { name: "How It Works", href: createPageUrl("HowItWorks") },
    { name: "Contact", href: createPageUrl("Contact") },
  ];

  const isActive = (href: string) => location === href;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-foreground transition-colors">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4">
        <nav className="max-w-7xl mx-auto">
          <div className="flex items-center h-16 px-6 bg-zinc-50/80 dark:bg-white/5 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-full shadow-lg">
            {/* Logo - Left */}
            <div className="flex-1">
              <Link href={createPageUrl("Home")} data-testid="link-logo">
                <div className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer">
                  <img src="/favicon.svg" alt="Unkommon" className="w-10 h-10 rounded-xl object-contain" />

                  <span className="text-xl font-black tracking-tight uppercase text-foreground">Unkommon</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation - Center */}
            <div className="hidden md:flex items-center space-x-8 flex-shrink-0">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} data-testid={`link-nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  <span
                    className={`text-sm font-medium transition-colors hover:text-foreground cursor-pointer ${
                      isActive(item.href) ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
              <Button
                size="sm"
                data-testid="button-get-started"
                onClick={() => window.location.href = createPageUrl("Contact")}
                className="bg-black hover:bg-zinc-900 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-black"
              >
                Book AI Audit
              </Button>
            </div>

            {/* Theme Switch - Right */}
            <div className="flex-1 flex justify-end items-center gap-4">
              <div className="hidden md:block">
                <SwitchButton size="sm" showLabel={false} />
              </div>

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors text-foreground"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-2 py-4 px-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-2xl shadow-lg">
              <div className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href} data-testid={`link-mobile-nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <span
                      className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                        isActive(item.href) ? "text-primary" : "text-muted-foreground"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </span>
                  </Link>
                ))}

                <SwitchButton size="default" showLabel={true} className="w-full" />
                <Button
                  className="w-full"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.location.href = createPageUrl("Contact");
                  }}
                  data-testid="button-mobile-get-started"
                >
                  Book AI Audit
                </Button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-16">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border mt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="mb-3">
                <span className="text-lg font-semibold">Unkommon</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md text-sm">
                AI systems that drive revenue, reduce overhead, and scale your operations.
              </p>
              <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+1 (203) 680-9629</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>contact@unkommon.ai</span>
                </div>
              </div>
            </div>

            {/* Solutions */}
            <div>
              <h3 className="font-semibold mb-3 text-sm">Solutions</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href={createPageUrl("Solutions")} data-testid="link-footer-solutions">
                    <span className="hover:text-primary transition-colors cursor-pointer">
                      All Solutions
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href={createPageUrl("HowItWorks")} data-testid="link-footer-how-it-works">
                    <span className="hover:text-primary transition-colors cursor-pointer">
                      How It Works
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold mb-3 text-sm">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href={createPageUrl("About")} data-testid="link-footer-about">
                    <span className="hover:text-primary transition-colors cursor-pointer">
                      About Us
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href={createPageUrl("Contact")} data-testid="link-footer-contact">
                    <span className="hover:text-primary transition-colors cursor-pointer">
                      Contact
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-6 text-center">
            <div className="flex justify-center mb-6">
              <SocialMediaIcons />
            </div>
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Unkommon. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* AI Chatbot Widget - Appears on all pages */}
      <ChatWidget />
    </div>
  );
}
