import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "dark" | "light";
  className?: string;
}

export function CTAButton({ href, children, variant = "dark", className }: CTAButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-3 text-[14px] font-normal pl-8 pr-2 py-2 rounded-full transition-colors no-underline",
        variant === "dark"
          ? "bg-foreground text-white hover:bg-foreground/80"
          : "bg-white text-black hover:bg-gray-200",
        className
      )}
    >
      {children}
      <span
        className={cn(
          "w-7 h-7 rounded-full flex items-center justify-center",
          variant === "dark" ? "bg-white" : "bg-black"
        )}
      >
        <ArrowRight
          className={cn(
            "w-3.5 h-3.5",
            variant === "dark" ? "text-foreground" : "text-white"
          )}
        />
      </span>
    </Link>
  );
}
