import React, { useEffect, useState } from 'react';

interface AtomicBombExplosionProps {
  x?: string | number; // Detonation center coordinate (e.g. "42%")
  y?: string | number; // Detonation center coordinate (e.g. "58%")
  onComplete?: () => void;
}

export const AtomicBombExplosion: React.FC<AtomicBombExplosionProps> = ({
  x = '42%',
  y = '58%',
  onComplete
}) => {
  const [stage, setStage] = useState<'flash' | 'mushroom' | 'dissipate'>('flash');

  useEffect(() => {
    // Stage timings matching the video
    const tFlash = setTimeout(() => setStage('mushroom'), 120);
    const tDissipate = setTimeout(() => setStage('dissipate'), 2600);
    const tComplete = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3400);

    return () => {
      clearTimeout(tFlash);
      clearTimeout(tDissipate);
      clearTimeout(tComplete);
    };
  }, [onComplete]);

  const centerX = typeof x === 'number' ? `${x}px` : x;
  const centerY = typeof y === 'number' ? `${y}px` : y;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 9998,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      <style>{`
        /* Full-screen blinding detonation flash */
        @keyframes nuke-screen-flash {
          0% {
            opacity: 0;
          }
          10% {
            opacity: 1;
            background-color: rgba(255, 255, 240, 0.95);
          }
          35% {
            opacity: 0.7;
            background-color: rgba(255, 220, 150, 0.6);
          }
          100% {
            opacity: 0;
            background-color: transparent;
          }
        }

        /* Sudden sharp golden starburst explosion spike */
        @keyframes nuke-starburst-blast {
          0% {
            transform: translate(-50%, -50%) scale(0.1);
            opacity: 0;
          }
          20% {
            transform: translate(-50%, -50%) scale(1.15);
            opacity: 1;
            filter: drop-shadow(0 0 35px #ffe033) drop-shadow(0 0 60px #ff9800);
          }
          55% {
            transform: translate(-50%, -50%) scale(1.35);
            opacity: 0.95;
          }
          85% {
            transform: translate(-50%, -50%) scale(1.45);
            opacity: 0.3;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.55);
            opacity: 0;
          }
        }

        /* Expanding white & golden shockwave ring */
        @keyframes nuke-water-shockwave {
          0% {
            transform: translate(-50%, -50%) scale(0.1);
            opacity: 1;
            border-width: 14px;
          }
          60% {
            opacity: 0.85;
            border-width: 8px;
          }
          100% {
            transform: translate(-50%, -50%) scale(2.8);
            opacity: 0;
            border-width: 2px;
          }
        }

        /* Massive billowing cartoon mushroom cloud expansion */
        @keyframes nuke-mushroom-growth {
          0% {
            transform: translate(-50%, -40%) scale(0.2);
            opacity: 0.4;
          }
          18% {
            transform: translate(-50%, -48%) scale(1.05);
            opacity: 1;
          }
          35% {
            transform: translate(-50%, -54%) scale(1.22);
            opacity: 1;
          }
          70% {
            transform: translate(-50%, -58%) scale(1.35);
            opacity: 0.95;
          }
          100% {
            transform: translate(-50%, -64%) scale(1.42);
            opacity: 0;
          }
        }

        /* Fiery boiling core inside the cloud */
        @keyframes nuke-fire-pulse {
          0% {
            opacity: 1;
            transform: scale(0.9);
            filter: brightness(2.2);
          }
          50% {
            opacity: 0.95;
            transform: scale(1.1);
            filter: brightness(1.6);
          }
          100% {
            opacity: 0.4;
            transform: scale(1.25);
            filter: brightness(1.0);
          }
        }

        /* Rising smoke billows in the upper canopy */
        @keyframes nuke-billow-roll {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(3deg) scale(1.04);
          }
          100% {
            transform: rotate(-2deg) scale(1.08);
          }
        }
      `}</style>

      {/* 1. Detonation Flash Layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          animation: 'nuke-screen-flash 0.9s ease-out forwards',
          pointerEvents: 'none',
        }}
      />

      {/* 2. Expanding Water Shockwave Ring */}
      <div
        style={{
          position: 'absolute',
          left: centerX,
          top: centerY,
          width: '280px',
          height: '140px',
          borderRadius: '50%',
          border: '10px solid #ffffff',
          boxShadow: '0 0 45px #ffe082, inset 0 0 35px #ff9800',
          animation: 'nuke-water-shockwave 1.6s cubic-bezier(0.12, 0.85, 0.28, 1) forwards',
          pointerEvents: 'none',
        }}
      />

      {/* 3. Sharp Comic Starburst Explosion Spikes (0 to 0.7s) */}
      <div
        style={{
          position: 'absolute',
          left: centerX,
          top: centerY,
          width: '320px',
          height: '320px',
          animation: 'nuke-starburst-blast 0.75s ease-out forwards',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          viewBox="0 0 300 300"
          width="320"
          height="320"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <radialGradient id="starburstGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="30%" stopColor="#fff799" />
              <stop offset="70%" stopColor="#ffe033" />
              <stop offset="100%" stopColor="#ff9800" />
            </radialGradient>
          </defs>
          {/* Jagged cartoon explosion spike matching video frame 00:08 */}
          <polygon
            points="
              150,15 
              166,95 
              235,50 
              190,118 
              285,125 
              205,160 
              270,225 
              185,198 
              170,285 
              142,205 
              85,270 
              112,185 
              25,185 
              100,140 
              35,75 
              122,105
            "
            fill="url(#starburstGrad)"
            stroke="#ffffff"
            strokeWidth="3"
            filter="drop-shadow(0 0 16px rgba(255,224,51,0.9))"
          />
          {/* Extra tall central blast flare pointing upward */}
          <polygon
            points="150,5 162,110 138,110"
            fill="#ffffff"
            filter="drop-shadow(0 0 12px #fff)"
          />
        </svg>
      </div>

      {/* 4. Colossal Cartoon Mushroom Cloud Covering the Sea & Ships */}
      <div
        style={{
          position: 'absolute',
          left: centerX,
          top: centerY,
          width: '560px',
          maxWidth: '100vw',
          height: '560px',
          animation: 'nuke-mushroom-growth 3.3s cubic-bezier(0.12, 0.88, 0.22, 1) forwards',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          viewBox="0 0 500 500"
          width="100%"
          height="100%"
          style={{
            overflow: 'visible',
            animation: 'nuke-billow-roll 3.0s ease-in-out infinite alternate',
            filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.65))',
          }}
        >
          <defs>
            {/* Upper ash cloud gradient */}
            <linearGradient id="ashGradTop" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ede8e3" />
              <stop offset="45%" stopColor="#d5cdc5" />
              <stop offset="85%" stopColor="#a79c92" />
              <stop offset="100%" stopColor="#675a50" />
            </linearGradient>

            {/* Shaded bottom/side billows */}
            <linearGradient id="ashGradDark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#b5aba0" />
              <stop offset="60%" stopColor="#685a4f" />
              <stop offset="100%" stopColor="#3d332b" />
            </linearGradient>

            {/* Fireball core gradient */}
            <radialGradient id="nukeFireGlow" cx="50%" cy="85%" r="65%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="25%" stopColor="#fff375" />
              <stop offset="55%" stopColor="#ff9800" />
              <stop offset="85%" stopColor="#d84315" />
              <stop offset="100%" stopColor="#4e342e" />
            </radialGradient>

            {/* Inner cloud shadow filter */}
            <filter id="cloudShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#2e241c" floodOpacity="0.45" />
            </filter>
          </defs>

          {/* LOWER VOLUMETRIC STEM (Rising pillar connecting water to cloud) */}
          <g id="mushroom-stem">
            {/* Stem base fiery glow */}
            <ellipse cx="250" cy="430" rx="90" ry="25" fill="#ff9800" opacity="0.8" filter="blur(6px)" />
            <path
              d="M 195,440 C 215,360 215,260 200,210 L 300,210 C 285,260 285,360 305,440 Z"
              fill="url(#ashGradDark)"
            />
            {/* Inner fiery column core */}
            <path
              d="M 220,435 C 232,350 235,270 230,215 L 270,215 C 265,270 268,350 280,435 Z"
              fill="url(#nukeFireGlow)"
              opacity="0.9"
            />
          </g>

          {/* BASE WATER SPLASH & SMOKE RING */}
          <g id="base-ring">
            <circle cx="170" cy="435" r="28" fill="url(#ashGradDark)" filter="url(#cloudShadow)" />
            <circle cx="215" cy="445" r="32" fill="url(#ashGradTop)" filter="url(#cloudShadow)" />
            <circle cx="250" cy="448" r="35" fill="#f5ede6" filter="url(#cloudShadow)" />
            <circle cx="285" cy="445" r="32" fill="url(#ashGradTop)" filter="url(#cloudShadow)" />
            <circle cx="330" cy="435" r="28" fill="url(#ashGradDark)" filter="url(#cloudShadow)" />
          </g>

          {/* GIANT MUSHROOM CAP - MULTI-LOBED BILLOWING CUMULUS CLOUDS */}
          <g id="mushroom-cap">
            {/* Dark under-shadow background lobes */}
            <circle cx="140" cy="210" r="58" fill="url(#ashGradDark)" />
            <circle cx="360" cy="210" r="58" fill="url(#ashGradDark)" />
            <circle cx="100" cy="165" r="65" fill="url(#ashGradDark)" />
            <circle cx="400" cy="165" r="65" fill="url(#ashGradDark)" />
            <circle cx="160" cy="115" r="70" fill="url(#ashGradDark)" />
            <circle cx="340" cy="115" r="70" fill="url(#ashGradDark)" />

            {/* Mid-tier billowing cloud lobes (Rich volumetric depth) */}
            <circle cx="130" cy="180" r="55" fill="url(#ashGradTop)" filter="url(#cloudShadow)" />
            <circle cx="370" cy="180" r="55" fill="url(#ashGradTop)" filter="url(#cloudShadow)" />
            <circle cx="180" cy="170" r="68" fill="url(#ashGradTop)" filter="url(#cloudShadow)" />
            <circle cx="320" cy="170" r="68" fill="url(#ashGradTop)" filter="url(#cloudShadow)" />
            <circle cx="250" cy="180" r="72" fill="url(#ashGradTop)" filter="url(#cloudShadow)" />

            {/* Lower boiling fiery billow under-cap */}
            <path
              d="M 170,225 Q 250,250 330,225 Q 250,210 170,225 Z"
              fill="#ffe082"
              filter="blur(4px)"
              opacity="0.85"
            />

            {/* Top crown billowing lobes (Light cream/ash highlight on top) */}
            <circle cx="135" cy="120" r="56" fill="#f0eae4" filter="url(#cloudShadow)" />
            <circle cx="365" cy="120" r="56" fill="#f0eae4" filter="url(#cloudShadow)" />
            <circle cx="190" cy="85" r="65" fill="#f5ede6" filter="url(#cloudShadow)" />
            <circle cx="310" cy="85" r="65" fill="#f5ede6" filter="url(#cloudShadow)" />
            <circle cx="250" cy="70" r="75" fill="#ffffff" filter="url(#cloudShadow)" />

            {/* Accent puff billows for natural puffy outline */}
            <circle cx="85" cy="135" r="42" fill="url(#ashGradTop)" filter="url(#cloudShadow)" />
            <circle cx="415" cy="135" r="42" fill="url(#ashGradTop)" filter="url(#cloudShadow)" />
            <circle cx="225" cy="50" r="50" fill="#ffffff" filter="url(#cloudShadow)" />
            <circle cx="275" cy="50" r="50" fill="#ffffff" filter="url(#cloudShadow)" />

            {/* Inner cloud core fiery heat illumination */}
            <ellipse
              cx="250"
              cy="165"
              rx="90"
              ry="50"
              fill="url(#nukeFireGlow)"
              opacity="0.85"
              style={{ animation: 'nuke-fire-pulse 1.8s ease-in-out infinite alternate' }}
            />
          </g>

          {/* FLYING BURNING ASH PARTICLES & EMBER SPARKS */}
          <g id="embers">
            <circle cx="120" cy="90" r="3.5" fill="#ffe082" filter="drop-shadow(0 0 4px #ff9800)" />
            <circle cx="380" cy="100" r="4" fill="#fff59d" filter="drop-shadow(0 0 5px #ff9800)" />
            <circle cx="160" cy="45" r="3" fill="#ffb74d" filter="drop-shadow(0 0 4px #f57c00)" />
            <circle cx="330" cy="40" r="3.5" fill="#ffe082" filter="drop-shadow(0 0 4px #ff9800)" />
            <circle cx="250" cy="25" r="4.5" fill="#ffffff" filter="drop-shadow(0 0 6px #ffe082)" />
            <circle cx="80" cy="180" r="3" fill="#ff9800" />
            <circle cx="420" cy="185" r="3.5" fill="#ff9800" />
          </g>
        </svg>
      </div>
    </div>
  );
};
export default AtomicBombExplosion;
