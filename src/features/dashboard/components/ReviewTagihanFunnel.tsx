import React from "react";
import ChartCard from "./ChartCard";

export default function ReviewTagihanFunnel() {
  return (
    <ChartCard title="Review Tagihan">
      <div className="flex flex-col sm:flex-row items-center justify-center py-6 px-2 min-h-[320px]">
        {/* SVG Funnel Shape */}
        <div className="relative w-full max-w-[420px] flex items-center justify-center">
          <svg
            viewBox="0 0 400 300"
            className="w-full h-auto drop-shadow-xs"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Top Funnel Trapezoid (Blue) - Tagihan */}
            <polygon
              points="10,20 310,20 230,170 90,170"
              fill="#63a4e9"
              className="transition-opacity hover:opacity-90"
            />

            {/* Bottom Funnel Rectangle (Green) - Lunas */}
            <polygon
              points="90,170 230,170 230,260 90,260"
              fill="#82e175"
              className="transition-opacity hover:opacity-90"
            />

            {/* Pointer Line 1: Tagihan */}
            <line
              x1="270"
              y1="95"
              x2="330"
              y2="95"
              stroke="#60a5fa"
              strokeWidth="1.5"
            />
            <text
              x="335"
              y="99"
              fontSize="12"
              fill="#1e293b"
              fontWeight="500"
              fontFamily="sans-serif"
            >
              Tagihan: 29.68 M
            </text>

            {/* Pointer Line 2: Jatuh Tempo */}
            <line
              x1="230"
              y1="170"
              x2="310"
              y2="170"
              stroke="#cbd5e1"
              strokeWidth="1.5"
            />
            <text
              x="315"
              y="174"
              fontSize="12"
              fill="#1e293b"
              fontWeight="500"
              fontFamily="sans-serif"
            >
              Jatuh Tempo: 190 Juta
            </text>

            {/* Pointer Line 3: Lunas */}
            <line
              x1="230"
              y1="215"
              x2="280"
              y2="215"
              stroke="#86efac"
              strokeWidth="1.5"
            />
            <text
              x="285"
              y="219"
              fontSize="12"
              fill="#1e293b"
              fontWeight="500"
              fontFamily="sans-serif"
            >
              Lunas: 17.19 M
            </text>

            {/* Pointer Line 4: Batal */}
            <line
              x1="230"
              y1="260"
              x2="290"
              y2="260"
              stroke="#fed7aa"
              strokeWidth="1.5"
            />
            <text
              x="295"
              y="264"
              fontSize="12"
              fill="#1e293b"
              fontWeight="500"
              fontFamily="sans-serif"
            >
              Batal: 0 Rupiah
            </text>
          </svg>
        </div>
      </div>
    </ChartCard>
  );
}
