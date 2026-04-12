import { CTAButton } from "@/components/CTAButton";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-normal text-foreground tracking-tight mb-4">404</h1>
        <p className="text-[17px] text-muted-foreground mb-8">This page doesn't exist.</p>
        <CTAButton href="/">
          Go home
        </CTAButton>
      </div>
    </div>
  );
}
