"use client";
import React from "react";
import { Card, CardTitle, CardDescription, CardSkeletonContainer } from "./tech-card";

export function AnimatedPinDemo() {
  return (
    <Card>
      <CardTitle>Aceternity UI</CardTitle>
      <CardDescription>
        Customizable Tailwind CSS and Framer Motion Components.
      </CardDescription>
      <CardSkeletonContainer showGradient={false}>
        <div className="flex items-center justify-center h-full p-8">
          <div className="w-full max-w-[200px] h-full max-h-[400px] rounded-2xl bg-gradient-to-b from-violet-500 via-purple-500 to-blue-500" />
        </div>
      </CardSkeletonContainer>
    </Card>
  );
}
