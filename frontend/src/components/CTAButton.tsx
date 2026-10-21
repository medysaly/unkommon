import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "dark" | "light" | "outline";
  className?: string;
}

export function CTAButton({ href, children, variant = "dark", className }: CTAButtonProps) {
  return (
    <LiquidMetalButton href={href} variant={variant} className={className}>
      {children}
    </LiquidMetalButton>
  );
}
