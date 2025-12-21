"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "This library has saved me countless hours of work and helped me deliver stunning designs to my clients faster than ever before.",
    author: "Sofia Davis",
    role: "Lead Designer, Acme Inc",
  },
  {
    quote:
      "The flexibility and scalability of this platform are unmatched. It has completely transformed how we build and deploy our applications.",
    author: "James Wilson",
    role: "CTO, TechFlow",
  },
  {
    quote:
      "I was blown away by the attention to detail and the polished aesthetic. It truly feels like a premium product from day one.",
    author: "Elena Rodriguez",
    role: "Product Manager, CreativeStudio",
  },
];

export function TestimonialSlider({ className }: { className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={cn("relative z-20 mt-auto", className)}>
      <blockquote className="space-y-2">
        <div className="relative h-24 overflow-hidden">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000 ease-in-out flex flex-col justify-end",
                index === currentIndex ? "opacity-100" : "opacity-0"
              )}
            >
              <p className="text-lg text-foreground mb-2 leading-relaxed">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="text-sm text-muted-foreground">
                {item.author},{" "}
                <span className="text-muted-foreground/80">{item.role}</span>
              </footer>
            </div>
          ))}
        </div>
      </blockquote>

      {/* Dots Indicator */}
      <div className="flex gap-1.5 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "h-1 rounded-full transition-all duration-300",
              index === currentIndex
                ? "w-6 bg-primary"
                : "w-1.5 bg-muted-foreground/30 hover:bg-primary/50"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
