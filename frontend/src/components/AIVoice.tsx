import { Mic } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function AIVoice() {
  const [submitted, setSubmitted] = useState(false);
  const [time, setTime] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isDemo, setIsDemo] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (submitted) {
      intervalId = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    } else {
      setTime(0);
    }

    return () => clearInterval(intervalId);
  }, [submitted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    if (!isDemo) return;

    let timeoutId: NodeJS.Timeout;
    const runAnimation = () => {
      setSubmitted(true);
      timeoutId = setTimeout(() => {
        setSubmitted(false);
        timeoutId = setTimeout(runAnimation, 1000);
      }, 3000);
    };

    const initialTimeout = setTimeout(runAnimation, 100);
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(initialTimeout);
    };
  }, [isDemo]);

  const handleClick = () => {
    if (isDemo) {
      setIsDemo(false);
      setSubmitted(false);
    } else {
      setSubmitted((prev) => !prev);
    }
  };

  return (
    <div className="w-full py-8">
      <div className="relative max-w-xl w-full mx-auto flex items-center flex-col gap-4">
        <button
          className={cn(
            "group w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300",
            submitted
              ? "bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/50"
              : "bg-gradient-to-br from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 shadow-lg"
          )}
          type="button"
          onClick={handleClick}
        >
          {submitted ? (
            <div
              className="w-8 h-8 rounded-lg animate-spin bg-white cursor-pointer pointer-events-auto"
              style={{ animationDuration: "3s" }}
            />
          ) : (
            <Mic className="w-8 h-8 text-white" />
          )}
        </button>

        <span
          className={cn(
            "font-mono text-lg font-semibold transition-opacity duration-300",
            submitted
              ? "text-blue-400"
              : "text-gray-500"
          )}
        >
          {formatTime(time)}
        </span>

        <div className="h-24 w-full max-w-md flex items-center justify-center gap-1">
          {[...Array(48)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-1 rounded-full transition-all duration-300",
                submitted
                  ? "bg-gradient-to-t from-blue-500 to-purple-500 animate-pulse"
                  : "bg-gray-700 h-2"
              )}
              style={
                submitted && isClient
                  ? {
                      height: `${20 + Math.random() * 80}%`,
                      animationDelay: `${i * 0.05}s`,
                    }
                  : undefined
              }
            />
          ))}
        </div>

        <p className="text-base font-medium text-gray-300">
          {submitted ? "AI is listening..." : "Click microphone to speak"}
        </p>
      </div>
    </div>
  );
}
