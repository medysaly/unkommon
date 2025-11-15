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
import ChatWidget from "@/components/ChatWidget";

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
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href={createPageUrl("Home")} data-testid="link-logo">
              <div className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">BA</span>
                </div>
                <span className="text-lg font-semibold">Business Automated</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} data-testid={`link-nav-${item.name.toLowerCase().replace(' ', '-')}`}>
                  <span
                    className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                      isActive(item.href) ? "text-primary" : "text-muted-foreground"
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
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground"
                    data-testid="button-featured-agents"
                  >
                    Solutions
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => window.location.href = createPageUrl("AIReceptionist")}
                    data-testid="dropdown-ai-receptionist"
                  >
                    AI Receptionist
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => window.location.href = createPageUrl("SpeedToLead")}
                    data-testid="dropdown-speed-to-lead"
                  >
                    Speed-to-Lead
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => window.location.href = createPageUrl("AIBookingSystem")}
                    data-testid="dropdown-ai-booking"
                  >
                    AI Booking System
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => window.location.href = createPageUrl("SocialMediaBot")}
                    data-testid="dropdown-social-media"
                  >
                    Social Media Automation
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                size="sm"
                data-testid="button-get-started"
                onClick={() => window.location.href = createPageUrl("Contact")}
              >
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-accent transition-colors"
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
            <div className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href} data-testid={`link-mobile-nav-${item.name.toLowerCase().replace(' ', '-')}`}>
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

                {/* Featured Agents - Mobile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between text-muted-foreground"
                      data-testid="button-mobile-featured-agents"
                    >
                      Solutions
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[calc(100vw-2rem)]">
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        window.location.href = createPageUrl("AIReceptionist");
                      }}
                      data-testid="dropdown-mobile-ai-receptionist"
                    >
                      AI Receptionist
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        window.location.href = createPageUrl("SpeedToLead");
                      }}
                      data-testid="dropdown-mobile-speed-to-lead"
                    >
                      Speed-to-Lead
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        window.location.href = createPageUrl("AIBookingSystem");
                      }}
                      data-testid="dropdown-mobile-ai-booking"
                    >
                      AI Booking System
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        window.location.href = createPageUrl("SocialMediaBot");
                      }}
                      data-testid="dropdown-mobile-social-media"
                    >
                      Social Media Automation
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  className="w-full"
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
      <footer className="border-t border-border mt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">BA</span>
                </div>
                <span className="text-lg font-semibold">Business Automated</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md text-sm">
                Transform your business with intelligent AI solutions.
              </p>
              <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>contact@businessautomated.com</span>
                </div>
              </div>
            </div>

            {/* Solutions */}
            <div>
              <h3 className="font-semibold mb-3 text-sm">Solutions</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href={createPageUrl("AIReceptionist")} data-testid="link-footer-ai-receptionist">
                    <span className="hover:text-primary transition-colors cursor-pointer">
                      AI Receptionist
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href={createPageUrl("SpeedToLead")} data-testid="link-footer-speed-to-lead">
                    <span className="hover:text-primary transition-colors cursor-pointer">
                      Speed-to-Lead
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href={createPageUrl("AIBookingSystem")} data-testid="link-footer-ai-booking">
                    <span className="hover:text-primary transition-colors cursor-pointer">
                      AI Booking System
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href={createPageUrl("SocialMediaBot")} data-testid="link-footer-social-media">
                    <span className="hover:text-primary transition-colors cursor-pointer">
                      Social Media Automation
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
                  <Link href={createPageUrl("AgentLibrary")} data-testid="link-footer-agent-library">
                    <span className="hover:text-primary transition-colors cursor-pointer">
                      Agent Library
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
                <li>
                  <Link href={createPageUrl("Sources")} data-testid="link-footer-sources">
                    <span className="hover:text-primary transition-colors cursor-pointer">
                      Research & Sources
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Business Automated. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* AI Chatbot Widget - Appears on all pages */}
      <ChatWidget />
    </div>
  );
}
