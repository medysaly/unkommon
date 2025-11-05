import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import { useState } from "react";
import { createPageUrl } from "@/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: createPageUrl("Home") },
    { name: "About", href: createPageUrl("About") },
    { name: "Contact", href: createPageUrl("Contact") },
  ];

  const isActive = (href: string) => location === href;

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href={createPageUrl("Home")} data-testid="link-logo">
              <div className="flex items-center space-x-2 hover-elevate active-elevate-2 px-2 py-1 rounded-md transition-colors cursor-pointer">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">BA</span>
                </div>
                <span className="text-xl font-bold">Business Automated</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} data-testid={`link-nav-${item.name.toLowerCase().replace(' ', '-')}`}>
                  <span
                    className={`text-sm font-medium transition-colors hover:text-blue-400 cursor-pointer ${
                      isActive(item.href) ? "text-blue-400" : "text-gray-300"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                    data-testid="button-featured-agents"
                  >
                    Featured Agents
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-slate-800 border-slate-700">
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-slate-700 focus:bg-slate-700 text-gray-300"
                    onClick={() => window.location.href = createPageUrl("AIReceptionist")}
                    data-testid="dropdown-ai-receptionist"
                  >
                    AI Receptionist
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-slate-700 focus:bg-slate-700 text-gray-300"
                    onClick={() => window.location.href = createPageUrl("SpeedToLead")}
                    data-testid="dropdown-speed-to-lead"
                  >
                    Speed-to-Lead
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-slate-700 focus:bg-slate-700 text-gray-300"
                    onClick={() => window.location.href = createPageUrl("AIBookingSystem")}
                    data-testid="dropdown-ai-booking"
                  >
                    AI Booking System
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-slate-700 focus:bg-slate-700 text-gray-300"
                    onClick={() => window.location.href = createPageUrl("SocialMediaBot")}
                    data-testid="dropdown-social-media"
                  >
                    Social Media Bot
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                data-testid="button-get-started"
                onClick={() => window.location.href = createPageUrl("Contact")}
              >
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden hover-elevate active-elevate-2 p-2 rounded-md"
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

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-800">
              <div className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href} data-testid={`link-mobile-nav-${item.name.toLowerCase().replace(' ', '-')}`}>
                    <span
                      className={`text-sm font-medium transition-colors hover:text-blue-400 cursor-pointer ${
                        isActive(item.href) ? "text-blue-400" : "text-gray-300"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </span>
                  </Link>
                ))}
                
                {/* Featured Agents - Mobile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full border-blue-500/50 text-blue-400 hover:bg-blue-500/10 justify-between"
                      data-testid="button-mobile-featured-agents"
                    >
                      Featured Agents
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[calc(100vw-2rem)] bg-slate-800 border-slate-700">
                    <DropdownMenuItem
                      className="cursor-pointer hover:bg-slate-700 focus:bg-slate-700 text-gray-300"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        window.location.href = createPageUrl("AIReceptionist");
                      }}
                      data-testid="dropdown-mobile-ai-receptionist"
                    >
                      AI Receptionist
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer hover:bg-slate-700 focus:bg-slate-700 text-gray-300"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        window.location.href = createPageUrl("SpeedToLead");
                      }}
                      data-testid="dropdown-mobile-speed-to-lead"
                    >
                      Speed-to-Lead
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer hover:bg-slate-700 focus:bg-slate-700 text-gray-300"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        window.location.href = createPageUrl("AIBookingSystem");
                      }}
                      data-testid="dropdown-mobile-ai-booking"
                    >
                      AI Booking System
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer hover:bg-slate-700 focus:bg-slate-700 text-gray-300"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        window.location.href = createPageUrl("SocialMediaBot");
                      }}
                      data-testid="dropdown-mobile-social-media"
                    >
                      Social Media Bot
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.location.href = createPageUrl("Contact");
                  }}
                  data-testid="button-mobile-get-started"
                >
                  Get Started
                </Button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-16">{children}</main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">BA</span>
                </div>
                <span className="text-xl font-bold">Business Automated</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Transform your business with intelligent AI solutions. We design and deploy custom automation that streamlines operations and drives growth.
              </p>
              <div className="flex flex-col space-y-2 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>contact@businessautomated.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>

            {/* Solutions */}
            <div>
              <h3 className="text-white font-semibold mb-4">Solutions</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href={createPageUrl("AIReceptionist")} data-testid="link-footer-ai-receptionist">
                    <span className="hover:text-blue-400 transition-colors cursor-pointer">
                      AI Receptionist
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href={createPageUrl("SpeedToLead")} data-testid="link-footer-speed-to-lead">
                    <span className="hover:text-blue-400 transition-colors cursor-pointer">
                      Speed-to-Lead
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href={createPageUrl("AIBookingSystem")} data-testid="link-footer-ai-booking">
                    <span className="hover:text-blue-400 transition-colors cursor-pointer">
                      AI Booking System
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href={createPageUrl("SocialMediaBot")} data-testid="link-footer-social-media">
                    <span className="hover:text-blue-400 transition-colors cursor-pointer">
                      Social Media Bot
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href={createPageUrl("About")} data-testid="link-footer-about">
                    <span className="hover:text-blue-400 transition-colors cursor-pointer">
                      About Us
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href={createPageUrl("AgentLibrary")} data-testid="link-footer-agent-library">
                    <span className="hover:text-blue-400 transition-colors cursor-pointer">
                      Agent Library
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href={createPageUrl("Contact")} data-testid="link-footer-contact">
                    <span className="hover:text-blue-400 transition-colors cursor-pointer">
                      Contact
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Business Automated. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
