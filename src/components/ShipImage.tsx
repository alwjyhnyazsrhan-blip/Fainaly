import React from 'react';

interface ShipImageProps {
  level: number;
  width?: number;
  plain?: boolean;
  fill?: boolean;
}

export interface CardRect {
  imageUrl: string;
  x: number;       // pixel X in original sheet
  y: number;       // pixel Y in original sheet
  width: number;   // pixel width in original sheet
  height: number;  // pixel height in original sheet
  sheetWidth: number;
  sheetHeight: number;
}

export const getShipCardRect = (level: number): CardRect => {
  const URL_1_TO_17 = 'https://raw.githubusercontent.com/alwjyhnyazsrhan-blip/my-game-assets/refs/heads/main/IMG-20260705-WA0016.jpg';
  const URL_18_TO_31 = 'https://raw.githubusercontent.com/alwjyhnyazsrhan-blip/my-game-assets/refs/heads/main/IMG-20260705-WA0017.jpg';

  if (level <= 17) {
    const sheetWidth = 1149;
    const sheetHeight = 1369;
    
    // Precise grid for Levels 1-17
    const marginLeft = 13;
    const gapX = 6.5;
    const cardWidth = 181.5;
    
    const marginTop = 76;
    const gapY = 10;
    const cardHeight = 387;

    const idx = level - 1;
    const row = Math.floor(idx / 6);
    const col = idx % 6;

    return {
      imageUrl: URL_1_TO_17,
      x: marginLeft + col * (cardWidth + gapX),
      y: marginTop + row * (cardHeight + gapY),
      width: cardWidth,
      height: cardHeight,
      sheetWidth,
      sheetHeight,
    };
  } else {
    const sheetWidth = 1536;
    const sheetHeight = 1024;
    
    // Precise grid for Levels 18-31
    const marginLeft = 16;
    const gapX = 8;
    const cardWidth = 244;
    
    const marginTop = 60;
    const gapY = 10;
    const cardHeight = 298;

    if (level === 30) {
      // Level 30 is a wide card spanning the left half (3 columns wide)
      const wideCardWidth = 3 * cardWidth + 2 * gapX; // 748
      return {
        imageUrl: URL_18_TO_31,
        x: marginLeft,
        y: marginTop + 2 * (cardHeight + gapY),
        width: wideCardWidth,
        height: cardHeight,
        sheetWidth,
        sheetHeight,
      };
    } else if (level === 31) {
      // Level 31 is a wide card spanning the right half (3 columns wide)
      const wideCardWidth = 3 * cardWidth + 2 * gapX; // 748
      return {
        imageUrl: URL_18_TO_31,
        x: marginLeft + 3 * (cardWidth + gapX), // 16 + 3 * 252 = 772
        y: marginTop + 2 * (cardHeight + gapY),
        width: wideCardWidth,
        height: cardHeight,
        sheetWidth,
        sheetHeight,
      };
    } else {
      const idx = level - 18;
      const row = Math.floor(idx / 6);
      const col = idx % 6;

      return {
        imageUrl: URL_18_TO_31,
        x: marginLeft + col * (cardWidth + gapX),
        y: marginTop + row * (cardHeight + gapY),
        width: cardWidth,
        height: cardHeight,
        sheetWidth,
        sheetHeight,
      };
    }
  }
};

const SHIP_IMAGES_1_TO_31: Record<number, string> = {
  1: 'https://raw.githubusercontent.com/alwjyhnyazsrhan-blip/my-game-assets/refs/heads/main/ship_01.png',
  2: 'https://raw.githubusercontent.com/alwjyhnyazsrhan-blip/my-game-assets/refs/heads/main/ship_02.png',
  3: 'https://raw.githubusercontent.com/alwjyhnyazsrhan-blip/my-game-assets/refs/heads/main/ship_03.png',
  4: 'https://raw.githubusercontent.com/alwjyhnyazsrhan-blip/my-game-assets/refs/heads/main/ship_04.png',
  5: 'https://raw.githubusercontent.com/alwjyhnyazsrhan-blip/my-game-assets/refs/heads/main/ship_05.png',
  6: 'https://raw.githubusercontent.com/alwjyhnyazsrhan-blip/my-game-assets/refs/heads/main/ship_06.png',
  7: 'https://raw.githubusercontent.com/alwjyhnyazsrhan-blip/my-game-assets/refs/heads/main/ship_07.png',
  8: 'https://raw.githubusercontent.com/alwjyhnyazsrhan-blip/my-game-assets/refs/heads/main/ship_08.png',
  9: 'https://raw.githubusercontent.com/alwjyhnyazsrhan-blip/my-game-assets/refs/heads/main/ship_09.png',
  10: 'https://raw.githubusercontent.com/alwjyhnyazsrhan-blip/my-game-assets/refs/heads/main/ship_10.png',
  11: 'https://raw.githubusercontent.com/alwjyhnyazsrhan-blip/my-game-assets/refs/heads/main/ship_11.png',
  12: 'https://raw.githubusercontent.com/alwjyhnyazsrhan-blip/my-game-assets/refs/heads/main/ship_12.png',
  13: 'https://raw.githubusercontent.com/alwjyhnyazsrhan-blip/my-game-assets/refs/heads/main/13_ship.png',
  14: 'https://raw.githubusercontent.com/alwjyhnyazsrhan-blip/my-game-assets/refs/heads/main/14_ship.png',
  15: 'https://raw.githubusercontent.com/alwjyhnyazsrhan-blip/my-game-assets/refs/heads/main/ship-15-great-ocean.png',
  16: 'https://raw.githubusercontent.com/alwjyhnyazsrhan-blip/my-game-assets/refs/heads/main/ship-16-legends.png',
  17: 'https://raw.githubusercontent.com/alwjyhnyazsrhan-blip/my-game-assets/refs/heads/main/17_ship.png',
  18: 'https://raw.githubusercontent.com/alwjyhnyazsrhan-blip/my-game-assets/refs/heads/main/18_alfateh.png',
  19: 'https://raw.githubusercontent.com/alwjyhnyazsrhan-blip/my-game-assets/refs/heads/main/19_alnasr.png',
  20: 'https://raw.githubusercontent.com/alwjyhnyazsrhan-blip/my-game-assets/refs/heads/main/20_alhaymana.png',
  21: 'https://raw.githubusercontent.com/alwjyhnyazsrhan-blip/my-game-assets/refs/heads/main/21_ali3sar.png',
  22: 'https://raw.githubusercontent.com/alwjyhnyazsrhan-blip/my-game-assets/refs/heads/main/22_althalam.png',
  23: 'https://raw.githubusercontent.com/alwjyhnyazsrhan-blip/my-game-assets/refs/heads/main/23_almalakiya.png',
  24: 'https://raw.githubusercontent.com/alwjyhnyazsrhan-blip/my-game-assets/refs/heads/main/24_almuheet.png',
  25: 'https://raw.githubusercontent.com/alwjyhnyazsrhan-blip/my-game-assets/refs/heads/main/ship-25.png',
  26: 'https://raw.githubusercontent.com/alwjyhnyazsrhan-blip/my-game-assets/refs/heads/main/ship-26.png',
  27: 'https://raw.githubusercontent.com/alwjyhnyazsrhan-blip/my-game-assets/refs/heads/main/ship-27.png',
  28: 'https://raw.githubusercontent.com/alwjyhnyazsrhan-blip/my-game-assets/refs/heads/main/ship-28.png',
  29: 'https://raw.githubusercontent.com/alwjyhnyazsrhan-blip/my-game-assets/refs/heads/main/ship-29.png',
  30: 'https://raw.githubusercontent.com/alwjyhnyazsrhan-blip/my-game-assets/refs/heads/main/ship-30.png',
  31: 'https://raw.githubusercontent.com/alwjyhnyazsrhan-blip/my-game-assets/refs/heads/main/ship-31.png',
  32: 'https://raw.githubusercontent.com/alwjyhnyazsrhan-blip/my-game-assets/refs/heads/main/submarine-no-bg.png',
  33: 'https://raw.githubusercontent.com/alwjyhnyazsrhan-blip/my-game-assets/refs/heads/main/submarine-no-bg%20(1).png',
  34: 'https://raw.githubusercontent.com/alwjyhnyazsrhan-blip/my-game-assets/refs/heads/main/d1b937aa-cc63-4875-8380-496b97471769.png',
  35: 'https://raw.githubusercontent.com/alwjyhnyazsrhan-blip/my-game-assets/refs/heads/main/f764acf4-ad72-4091-ab03-cafe3551a938.png',
};

const SHIP_SCALES: Record<number, number> = {
  1: 1.0,
  2: 1.0,
  3: 1.0,
  4: 1.0,
  5: 1.0,
  6: 1.1,
  7: 1.05,
  8: 1.1,
  9: 1.05,
  10: 1.05,
  11: 1.05,
  12: 1.1,
  13: 1.1,
  14: 1.1,
  15: 1.25,
  16: 1.25,
  17: 1.1,
  18: 1.1,
  19: 1.1,
  20: 1.1,
  21: 1.1,
  22: 1.1,
  23: 1.1,
  24: 1.1,
  25: 1.1,
  26: 1.1,
  27: 1.1,
  28: 1.1,
  29: 1.1,
  30: 1.1,
  31: 1.1,
  32: 1.1,
  33: 1.1,
  34: 1.1,
  35: 1.1,
};

const SHIP_TRANSLATES: Record<number, string> = {
  15: '-15px',
  16: '-15px',
};

const ShipImage: React.FC<ShipImageProps> = ({ level, width = 140, plain = false, fill = false }) => {
  if (level === 0) {
    const containerHeight = plain ? width * 0.95 : width * 0.9; // consistent aspect ratio
    return (
      <div
        id="ship-image-lvl0"
        style={{
          width: fill ? '100%' : `${width}px`,
          height: fill ? '100%' : `${containerHeight}px`,
          minHeight: fill ? '100%' : `${containerHeight}px`,
          maxWidth: '100%',
          backgroundImage: `url('https://raw.githubusercontent.com/alwjyhnyazsrhan-blip/my-game-assets/refs/heads/main/copilot_image_1782937110028.jpeg')`,
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          margin: '0 auto',
          borderRadius: '12px',
          boxShadow: plain ? 'none' : '0 4px 10px rgba(0,0,0,0.6)',
          border: plain ? 'none' : '2px solid #ca8a04',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: plain ? 'transparent' : '#140c06',
          transform: 'scale(1.0)',
          transformOrigin: 'center center',
          WebkitMaskImage: plain ? 'radial-gradient(ellipse 65% 55% at 50% 50%, black 40%, rgba(0,0,0,0.85) 60%, transparent 92%)' : undefined,
          maskImage: plain ? 'radial-gradient(ellipse 65% 55% at 50% 50%, black 40%, rgba(0,0,0,0.85) 60%, transparent 92%)' : undefined,
        }}
      />
    );
  }

  if (level >= 1 && level <= 35) {
    const imageUrl = SHIP_IMAGES_1_TO_31[level];
    if (imageUrl) {
      const containerHeight = plain ? width * 0.95 : width * 0.9; // generous taller aspect ratio to significantly enlarge ship images!
      const scaleVal = SHIP_SCALES[level] || 1.35;
      const translateYVal = SHIP_TRANSLATES[level] || '0px';
      return (
        <div
          id={`ship-image-lvl${level}`}
          style={{
            width: fill ? '100%' : `${width}px`,
            height: fill ? '100%' : `${containerHeight}px`,
            minHeight: fill ? '100%' : `${containerHeight}px`,
            maxWidth: '100%',
            backgroundImage: `url('${imageUrl}')`,
            backgroundPosition: 'center',
            backgroundSize: 'contain', // ensure the ship appears fully and perfectly
            backgroundRepeat: 'no-repeat',
            margin: '0 auto',
            borderRadius: '12px',
            boxShadow: plain ? 'none' : '0 4px 10px rgba(0,0,0,0.6)',
            border: plain ? 'none' : '2px solid #ca8a04',
            overflow: 'hidden',
            position: 'relative',
            backgroundColor: plain ? 'transparent' : '#140c06', // beautiful dark wood theme background
            transform: `scale(${scaleVal}) translateY(${translateYVal})`,
            transformOrigin: 'center center',
            WebkitMaskImage: plain ? 'radial-gradient(ellipse 65% 55% at 50% 50%, black 40%, rgba(0,0,0,0.85) 60%, transparent 92%)' : undefined,
            maskImage: plain ? 'radial-gradient(ellipse 65% 55% at 50% 50%, black 40%, rgba(0,0,0,0.85) 60%, transparent 92%)' : undefined,
          }}
        />
      );
    }
  }

  const rect = getShipCardRect(level);
  
  // Scale calculations for background-size and position
  const scale = width / rect.width;
  const scaledBackgroundWidth = rect.sheetWidth * scale;
  const scaledBackgroundHeight = rect.sheetHeight * scale;
  
  const bgX = -rect.x * scale;
  const bgY = -rect.y * scale;
  const containerHeight = plain ? width * 0.7 : rect.height * scale;

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${containerHeight}px`,
        backgroundImage: `url('${rect.imageUrl}')`,
        backgroundPosition: `${bgX}px ${bgY}px`,
        backgroundSize: `${scaledBackgroundWidth}px ${scaledBackgroundHeight}px`,
        backgroundRepeat: 'no-repeat',
        margin: '0 auto',
        borderRadius: plain ? '12px' : '8px',
        boxShadow: plain ? 'none' : '0 3px 6px rgba(0,0,0,0.5)',
        border: plain ? 'none' : '1.5px solid #ca8a04',
        overflow: 'hidden',
        WebkitMaskImage: plain ? 'radial-gradient(ellipse 65% 55% at 50% 50%, black 40%, rgba(0,0,0,0.85) 60%, transparent 92%)' : undefined,
        maskImage: plain ? 'radial-gradient(ellipse 65% 55% at 50% 50%, black 40%, rgba(0,0,0,0.85) 60%, transparent 92%)' : undefined,
        willChange: 'transform',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden'
      }}
    />
  );
};

export default React.memo(ShipImage);
