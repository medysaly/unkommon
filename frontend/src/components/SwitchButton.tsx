/**
 * @description: Dark Mode Switch Button
 * @version: 2.0.0
 * @design: Uiverse.io by Yaya12085
 */

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import "@/styles/dark-mode-switch.css";

interface SwitchButtonProps {
  className?: string;
}

export default function SwitchButton({ className }: SwitchButtonProps) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <div className={className}>
        <div className="theme-switch-container">
          <label className="theme-switch-label"></label>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="theme-switch-container">
        <input
          type="checkbox"
          id="theme-checkbox"
          checked={theme === "dark"}
          onChange={handleThemeToggle}
        />
        <label htmlFor="theme-checkbox" className="theme-switch-label"></label>
      </div>
    </div>
  );
}
