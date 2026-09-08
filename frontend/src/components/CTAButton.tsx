import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "dark" | "light" | "outline";
  className?: string;
}

export function CTAButton({ href, children, variant = "dark", className }: CTAButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-3 text-[14px] font-normal pl-8 pr-2 py-2 rounded-full transition-colors no-underline",
        variant === "dark" && "bg-foreground text-white hover:bg-foreground/80",
        variant === "light" && "bg-white text-black hover:bg-gray-200",
        variant === "outline" &&
          "bg-transparent text-foreground border border-foreground/25 hover:border-foreground/60 hover:bg-foreground/5",
        className
      )}
    >
      {children}
      <span
        className={cn(
          "w-7 h-7 rounded-full flex items-center justify-center",
          variant === "light" ? "bg-black" : "bg-foreground"
        )}
      >
        <ArrowRight className="w-3.5 h-3.5 text-white" />
      </span>
    </Link>
  );
}
