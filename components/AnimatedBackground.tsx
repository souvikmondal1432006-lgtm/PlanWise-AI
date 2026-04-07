"use client";

import { useEffect } from "react";

export default function AnimatedBackground() {
  useEffect(() => {
    let requestId: number;
    let mouseX = 0;
    let mouseY = 0;

    const updateMousePos = () => {
      document.documentElement.style.setProperty("--mouse-x", mouseX.toString());
      document.documentElement.style.setProperty("--mouse-y", mouseY.toString());
      requestId = requestAnimationFrame(updateMousePos);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) - 0.5;
      mouseY = (e.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener("mousemove", handleMouseMove);
    requestId = requestAnimationFrame(updateMousePos);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] bg-[#0e0e0f] overflow-hidden">
      {/* Container for parallax shift */}
      <div 
        className="absolute inset-[-10%] w-[120%] h-[120%] transition-transform duration-[1000ms] ease-out flex items-center justify-center p-32"
        style={{ transform: "translate(calc(var(--mouse-x, 0) * -15px), calc(var(--mouse-y, 0) * -15px))" }}
      >
        {/* Blob 1: Primary Dim */}
        <div className="absolute top-1/4 left-1/4 w-[45vw] h-[45vw] bg-[#adb7e0]/10 rounded-full blur-[120px] animate-blob1" />
        
        {/* Blob 2: Secondary Dim */}
        <div className="absolute bottom-1/4 right-1/4 w-[55vw] h-[55vw] bg-[#9093ff]/05 rounded-full blur-[140px] animate-blob2" />
        
        {/* Blob 3: Tertiary Dim */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vw] bg-[#c1d0e6]/08 rounded-full blur-[110px] animate-blob1" style={{ animationDelay: '-8s' }} />
      </div>

      {/* SVG Noise Overlay @ 1% opacity for ultra-performance grain */}
      <div 
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%221%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      ></div>
    </div>
  );
}
