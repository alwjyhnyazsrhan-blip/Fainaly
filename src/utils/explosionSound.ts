// Comprehensive procedural sound generator for missile flight and cinematic heavy explosion
// Designed with multi-layered Web Audio synthesis for authentic arcade combat impact

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return null;
    if (!audioCtx || audioCtx.state === 'closed') {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  } catch (e) {
    console.warn('Explosion AudioContext not available:', e);
    return null;
  }
}

function isAudioMuted(): boolean {
  try {
    const isGlobalMuted = localStorage.getItem('pirate_is_muted') === 'true';
    const isSfxMuted = localStorage.getItem('pirate_sfx_muted') === 'true';
    return isGlobalMuted || isSfxMuted;
  } catch {
    return false;
  }
}

/**
 * Creates an audio buffer with procedural white + pink noise for realistic explosion roar
 */
function createNoiseBuffer(ctx: AudioContext, durationSeconds = 2.5): AudioBuffer {
  const bufferSize = Math.floor(ctx.sampleRate * durationSeconds);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for (let i = 0; i < bufferSize; i++) {
    // Generate pink noise approximation (Paul Kellet's filter method)
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    b3 = 0.86650 * b3 + white * 0.3104856;
    b4 = 0.55000 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.0168980;
    const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
    b6 = white * 0.115926;
    
    // Mix 60% pink noise with 40% white noise for punchy explosion texture
    data[i] = (pink * 0.11) + (white * 0.08);
  }
  return buffer;
}

/**
 * Creates a soft saturation distortion curve for heavy bass punch
 */
function makeDistortionCurve(amount = 25): Float32Array {
  const k = amount;
  const n_samples = 44100;
  const curve = new Float32Array(n_samples);
  const deg = Math.PI / 180;
  for (let i = 0; i < n_samples; ++i) {
    const x = (i * 2) / n_samples - 1;
    curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
  }
  return curve;
}

/**
 * Sound of the large missile flying towards target:
 * High-speed Doppler whistle + rocket thruster roar
 */
export function playLargeRocketIncomingSound() {
  if (isAudioMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const flightDuration = 1.3;

  try {
    // 1. High-speed Doppler screech/whistle (1400Hz -> 380Hz)
    const whistleOsc = ctx.createOscillator();
    const whistleGain = ctx.createGain();
    whistleOsc.type = 'sawtooth';
    whistleOsc.frequency.setValueAtTime(1350, now);
    whistleOsc.frequency.exponentialRampToValueAtTime(360, now + flightDuration);

    whistleGain.gain.setValueAtTime(0.01, now);
    whistleGain.gain.linearRampToValueAtTime(0.18, now + flightDuration * 0.75);
    whistleGain.gain.exponentialRampToValueAtTime(0.001, now + flightDuration);

    whistleOsc.connect(whistleGain);
    whistleGain.connect(ctx.destination);
    whistleOsc.start(now);
    whistleOsc.stop(now + flightDuration);

    // 2. Thruster rocket engine hiss (Bandpass noise)
    const noiseBuffer = createNoiseBuffer(ctx, flightDuration + 0.2);
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(450, now);
    bandpass.frequency.linearRampToValueAtTime(900, now + flightDuration);
    bandpass.Q.setValueAtTime(2.0, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.05, now);
    noiseGain.gain.linearRampToValueAtTime(0.25, now + flightDuration * 0.85);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + flightDuration);

    noiseSource.connect(bandpass);
    bandpass.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noiseSource.start(now);
    noiseSource.stop(now + flightDuration);
  } catch (e) {
    console.debug('Error in rocket launch sound:', e);
  }
}

/**
 * Sound of the large missile detonation & cinematic explosion:
 * - Supersonic impact crack (sharp punch)
 * - Heavy sub-bass detonation boom (160Hz -> 28Hz)
 * - Fiery roaring blast noise sweeping down through resonant low-pass
 * - Secondary ocean shockwave rumble echo
 * - Debris & crackling fire tail
 */
export function playLargeRocketExplosionSound() {
  if (isAudioMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  try {
    // -------------------------------------------------------------
    // LAYER 1: Initial Supersonic Detonation Crack (Impact Punch)
    // -------------------------------------------------------------
    const crackOsc = ctx.createOscillator();
    const crackGain = ctx.createGain();
    crackOsc.type = 'triangle';
    crackOsc.frequency.setValueAtTime(280, now);
    crackOsc.frequency.exponentialRampToValueAtTime(40, now + 0.08);

    crackGain.gain.setValueAtTime(0.5, now);
    crackGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    crackOsc.connect(crackGain);
    crackGain.connect(ctx.destination);
    crackOsc.start(now);
    crackOsc.stop(now + 0.1);

    // -------------------------------------------------------------
    // LAYER 2: Heavy Sub-Bass Detonation Boom (Chest-Thumping Thud)
    // -------------------------------------------------------------
    const subOsc1 = ctx.createOscillator();
    const subOsc2 = ctx.createOscillator();
    const subGain = ctx.createGain();
    const distortion = ctx.createWaveShaper();
    distortion.curve = makeDistortionCurve(12);
    distortion.oversample = '2x';

    subOsc1.type = 'sine';
    subOsc1.frequency.setValueAtTime(160, now);
    subOsc1.frequency.exponentialRampToValueAtTime(32, now + 0.9);

    subOsc2.type = 'triangle';
    subOsc2.frequency.setValueAtTime(110, now);
    subOsc2.frequency.exponentialRampToValueAtTime(24, now + 1.2);

    subGain.gain.setValueAtTime(0.85, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.3);

    subOsc1.connect(subGain);
    subOsc2.connect(subGain);
    subGain.connect(distortion);
    distortion.connect(ctx.destination);

    subOsc1.start(now);
    subOsc2.start(now);
    subOsc1.stop(now + 1.4);
    subOsc2.stop(now + 1.4);

    // -------------------------------------------------------------
    // LAYER 3: Roaring Fiery Noise Blast (Resonant Low-Pass Sweep)
    // The quintessential arcade / anime explosion sound: KABOOOOM
    // -------------------------------------------------------------
    const noiseBuffer = createNoiseBuffer(ctx, 2.2);
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const filter1 = ctx.createBiquadFilter();
    filter1.type = 'lowpass';
    filter1.frequency.setValueAtTime(2200, now);
    filter1.frequency.exponentialRampToValueAtTime(95, now + 1.4);
    filter1.Q.setValueAtTime(4.2, now); // Strong resonance for that tearing explosive punch

    const filter2 = ctx.createBiquadFilter();
    filter2.type = 'lowpass';
    filter2.frequency.setValueAtTime(1800, now);
    filter2.frequency.exponentialRampToValueAtTime(80, now + 1.4);
    filter2.Q.setValueAtTime(2.0, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.9, now);
    noiseGain.gain.linearRampToValueAtTime(0.75, now + 0.15);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

    noiseSource.connect(filter1);
    filter1.connect(filter2);
    filter2.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noiseSource.start(now);
    noiseSource.stop(now + 2.0);

    // -------------------------------------------------------------
    // LAYER 4: Ocean Shockwave Reverb / Rolling Echo
    // -------------------------------------------------------------
    const echoOsc = ctx.createOscillator();
    const echoGain = ctx.createGain();
    echoOsc.type = 'sine';
    echoOsc.frequency.setValueAtTime(65, now + 0.12);
    echoOsc.frequency.exponentialRampToValueAtTime(20, now + 1.5);

    echoGain.gain.setValueAtTime(0, now);
    echoGain.gain.setValueAtTime(0.4, now + 0.12);
    echoGain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);

    echoOsc.connect(echoGain);
    echoGain.connect(ctx.destination);

    echoOsc.start(now + 0.12);
    echoOsc.stop(now + 1.7);

    // -------------------------------------------------------------
    // LAYER 5: Burning Fire Debris & Sizzle
    // -------------------------------------------------------------
    const debrisBuffer = createNoiseBuffer(ctx, 1.8);
    const debrisSource = ctx.createBufferSource();
    debrisSource.buffer = debrisBuffer;

    const highpass = ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.setValueAtTime(1500, now + 0.2);

    const debrisGain = ctx.createGain();
    debrisGain.gain.setValueAtTime(0, now);
    debrisGain.gain.setValueAtTime(0.12, now + 0.25);
    debrisGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

    debrisSource.connect(highpass);
    highpass.connect(debrisGain);
    debrisGain.connect(ctx.destination);

    debrisSource.start(now + 0.2);
    debrisSource.stop(now + 1.9);

  } catch (e) {
    console.debug('Error in explosion sound synthesis:', e);
  }
}

/**
 * High-velocity falling whistle sound for the Atomic Bomb dropping from sky to sea.
 * Exactly matches the video reference (descending whistle with rushing air).
 */
export function playAtomicBombDropSound() {
  if (isAudioMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const dropDuration = 1.18;

  try {
    // 1. High-pitched descending Doppler whistle
    const whistleOsc = ctx.createOscillator();
    const whistleGain = ctx.createGain();
    const whistleFilter = ctx.createBiquadFilter();

    whistleOsc.type = 'sawtooth';
    whistleOsc.frequency.setValueAtTime(1280, now);
    whistleOsc.frequency.exponentialRampToValueAtTime(260, now + dropDuration);

    whistleFilter.type = 'lowpass';
    whistleFilter.frequency.setValueAtTime(1600, now);
    whistleFilter.frequency.exponentialRampToValueAtTime(450, now + dropDuration);

    whistleGain.gain.setValueAtTime(0.01, now);
    whistleGain.gain.linearRampToValueAtTime(0.18, now + dropDuration * 0.7);
    whistleGain.gain.exponentialRampToValueAtTime(0.001, now + dropDuration);

    whistleOsc.connect(whistleFilter);
    whistleFilter.connect(whistleGain);
    whistleGain.connect(ctx.destination);

    whistleOsc.start(now);
    whistleOsc.stop(now + dropDuration);

    // 2. High-speed rushing wind / atmospheric friction
    const noiseBuffer = createNoiseBuffer(ctx, dropDuration + 0.1);
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const windFilter = ctx.createBiquadFilter();
    windFilter.type = 'bandpass';
    windFilter.frequency.setValueAtTime(550, now);
    windFilter.frequency.linearRampToValueAtTime(1100, now + dropDuration);
    windFilter.Q.setValueAtTime(2.2, now);

    const windGain = ctx.createGain();
    windGain.gain.setValueAtTime(0.02, now);
    windGain.gain.linearRampToValueAtTime(0.16, now + dropDuration * 0.85);
    windGain.gain.exponentialRampToValueAtTime(0.001, now + dropDuration);

    noiseSource.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(ctx.destination);

    noiseSource.start(now);
    noiseSource.stop(now + dropDuration);
  } catch (e) {
    console.debug('Error in atomic bomb drop sound:', e);
  }
}

/**
 * Colossal nuclear detonation sound matching the video reference:
 * - Supersonic impact shock crack
 * - Sub-bass detonation thump (140Hz -> 20Hz) with distortion
 * - Massive roaring resonant blast sweeping across low-pass
 * - Long sustained rolling thunder / shockwave reverberation (3.8s)
 * - Flash-boiling water steam sizzle
 */
export function playAtomicBombExplosionSound() {
  if (isAudioMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  try {
    // -------------------------------------------------------------
    // LAYER 1: Initial Detonation Impact Crack (Sharp Transient Shock)
    // -------------------------------------------------------------
    const crackOsc = ctx.createOscillator();
    const crackGain = ctx.createGain();
    crackOsc.type = 'triangle';
    crackOsc.frequency.setValueAtTime(320, now);
    crackOsc.frequency.exponentialRampToValueAtTime(30, now + 0.1);

    crackGain.gain.setValueAtTime(0.7, now);
    crackGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    crackOsc.connect(crackGain);
    crackGain.connect(ctx.destination);
    crackOsc.start(now);
    crackOsc.stop(now + 0.13);

    // -------------------------------------------------------------
    // LAYER 2: Massive Sub-Bass Blast (Chest-Rattling Nuclear Boom)
    // -------------------------------------------------------------
    const subOsc1 = ctx.createOscillator();
    const subOsc2 = ctx.createOscillator();
    const subGain = ctx.createGain();
    const distortion = ctx.createWaveShaper();
    distortion.curve = makeDistortionCurve(18);
    distortion.oversample = '2x';

    subOsc1.type = 'sine';
    subOsc1.frequency.setValueAtTime(140, now);
    subOsc1.frequency.exponentialRampToValueAtTime(26, now + 1.2);

    subOsc2.type = 'triangle';
    subOsc2.frequency.setValueAtTime(95, now);
    subOsc2.frequency.exponentialRampToValueAtTime(18, now + 1.8);

    subGain.gain.setValueAtTime(1.1, now);
    subGain.gain.exponentialRampToValueAtTime(0.4, now + 0.5);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

    subOsc1.connect(subGain);
    subOsc2.connect(subGain);
    subGain.connect(distortion);
    distortion.connect(ctx.destination);

    subOsc1.start(now);
    subOsc2.start(now);
    subOsc1.stop(now + 2.3);
    subOsc2.stop(now + 2.3);

    // -------------------------------------------------------------
    // LAYER 3: Immense Roaring Nuclear Blast (Swept Resonant Noise)
    // -------------------------------------------------------------
    const noiseBuffer = createNoiseBuffer(ctx, 3.8);
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const filter1 = ctx.createBiquadFilter();
    filter1.type = 'lowpass';
    filter1.frequency.setValueAtTime(2400, now);
    filter1.frequency.exponentialRampToValueAtTime(45, now + 2.8);
    filter1.Q.setValueAtTime(4.8, now); // Powerful resonance for cinematic tearing explosion

    const filter2 = ctx.createBiquadFilter();
    filter2.type = 'lowpass';
    filter2.frequency.setValueAtTime(1900, now);
    filter2.frequency.exponentialRampToValueAtTime(38, now + 3.2);
    filter2.Q.setValueAtTime(2.2, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(1.25, now);
    noiseGain.gain.linearRampToValueAtTime(0.95, now + 0.2);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 3.6);

    noiseSource.connect(filter1);
    filter1.connect(filter2);
    filter2.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noiseSource.start(now);
    noiseSource.stop(now + 3.8);

    // -------------------------------------------------------------
    // LAYER 4: Deep Rolling Sea Shockwave Rumble Echo (0.15s to 3.8s)
    // -------------------------------------------------------------
    const rumbleOsc1 = ctx.createOscillator();
    const rumbleOsc2 = ctx.createOscillator();
    const rumbleGain = ctx.createGain();

    rumbleOsc1.type = 'sine';
    rumbleOsc1.frequency.setValueAtTime(48, now + 0.15);
    rumbleOsc1.frequency.exponentialRampToValueAtTime(16, now + 3.6);

    rumbleOsc2.type = 'triangle';
    rumbleOsc2.frequency.setValueAtTime(36, now + 0.15);
    rumbleOsc2.frequency.exponentialRampToValueAtTime(14, now + 3.6);

    rumbleGain.gain.setValueAtTime(0, now);
    rumbleGain.gain.setValueAtTime(0.65, now + 0.15);
    rumbleGain.gain.exponentialRampToValueAtTime(0.001, now + 3.8);

    rumbleOsc1.connect(rumbleGain);
    rumbleOsc2.connect(rumbleGain);
    rumbleGain.connect(ctx.destination);

    rumbleOsc1.start(now + 0.15);
    rumbleOsc2.start(now + 0.15);
    rumbleOsc1.stop(now + 3.9);
    rumbleOsc2.stop(now + 3.9);

    // -------------------------------------------------------------
    // LAYER 5: Flash-Boiling Ocean Steam & Sizzle (0.2s to 2.8s)
    // -------------------------------------------------------------
    const steamBuffer = createNoiseBuffer(ctx, 2.8);
    const steamSource = ctx.createBufferSource();
    steamSource.buffer = steamBuffer;

    const steamHighpass = ctx.createBiquadFilter();
    steamHighpass.type = 'highpass';
    steamHighpass.frequency.setValueAtTime(2200, now + 0.2);

    const steamGain = ctx.createGain();
    steamGain.gain.setValueAtTime(0, now);
    steamGain.gain.setValueAtTime(0.22, now + 0.25);
    steamGain.gain.exponentialRampToValueAtTime(0.001, now + 2.7);

    steamSource.connect(steamHighpass);
    steamHighpass.connect(steamGain);
    steamGain.connect(ctx.destination);

    steamSource.start(now + 0.2);
    steamSource.stop(now + 2.8);

  } catch (e) {
    console.debug('Error in atomic bomb explosion sound:', e);
  }
}

/**
 * Sound of the small missile flying rapidly towards target:
 * High-speed Doppler whistle + agile rocket thruster hiss
 * Exactly matches the video reference (fast, snappy 0.75s flight).
 */
export function playSmallRocketIncomingSound() {
  if (isAudioMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const flightDuration = 0.75;

  try {
    // 1. High-pitched fast Doppler whistle (1750Hz -> 420Hz)
    const whistleOsc = ctx.createOscillator();
    const whistleGain = ctx.createGain();
    whistleOsc.type = 'sawtooth';
    whistleOsc.frequency.setValueAtTime(1750, now);
    whistleOsc.frequency.exponentialRampToValueAtTime(420, now + flightDuration);

    whistleGain.gain.setValueAtTime(0.01, now);
    whistleGain.gain.linearRampToValueAtTime(0.16, now + flightDuration * 0.7);
    whistleGain.gain.exponentialRampToValueAtTime(0.001, now + flightDuration);

    whistleOsc.connect(whistleGain);
    whistleGain.connect(ctx.destination);
    whistleOsc.start(now);
    whistleOsc.stop(now + flightDuration);

    // 2. High-speed rushing thruster wind
    const noiseBuffer = createNoiseBuffer(ctx, flightDuration + 0.1);
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(650, now);
    bandpass.frequency.linearRampToValueAtTime(1250, now + flightDuration);
    bandpass.Q.setValueAtTime(2.2, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.03, now);
    noiseGain.gain.linearRampToValueAtTime(0.2, now + flightDuration * 0.8);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + flightDuration);

    noiseSource.connect(bandpass);
    bandpass.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noiseSource.start(now);
    noiseSource.stop(now + flightDuration);
  } catch (e) {
    console.debug('Error in small rocket incoming sound:', e);
  }
}

/**
 * Sound of the small missile detonation & punchy cartoon explosion:
 * Matches the video reference exactly:
 * - Crisp supersonic crack / snap punch (transient start)
 * - Punchy arcade mid-bass thump (220Hz -> 45Hz) with warm saturation
 * - Roaring comic blast noise sweeping down through resonant low-pass
 * - Snappy smoke sizzle tail (~0.7s)
 */
export function playSmallRocketExplosionSound() {
  if (isAudioMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  try {
    // -------------------------------------------------------------
    // LAYER 1: Initial Supersonic Snap (Sharp Transient Punch)
    // -------------------------------------------------------------
    const crackOsc = ctx.createOscillator();
    const crackGain = ctx.createGain();
    crackOsc.type = 'triangle';
    crackOsc.frequency.setValueAtTime(390, now);
    crackOsc.frequency.exponentialRampToValueAtTime(50, now + 0.05);

    crackGain.gain.setValueAtTime(0.65, now);
    crackGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    crackOsc.connect(crackGain);
    crackGain.connect(ctx.destination);
    crackOsc.start(now);
    crackOsc.stop(now + 0.07);

    // -------------------------------------------------------------
    // LAYER 2: Punchy Arcade Detonation Thump (220Hz -> 45Hz)
    // -------------------------------------------------------------
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    const distortion = ctx.createWaveShaper();
    distortion.curve = makeDistortionCurve(10);
    distortion.oversample = '2x';

    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(220, now);
    subOsc.frequency.exponentialRampToValueAtTime(45, now + 0.45);

    subGain.gain.setValueAtTime(0.85, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

    subOsc.connect(subGain);
    subGain.connect(distortion);
    distortion.connect(ctx.destination);

    subOsc.start(now);
    subOsc.stop(now + 0.6);

    // -------------------------------------------------------------
    // LAYER 3: Snappy Comic Blast Noise (Resonant Filter Sweep)
    // The crisp, tearing arcade explosion punch seen in the video
    // -------------------------------------------------------------
    const noiseBuffer = createNoiseBuffer(ctx, 0.9);
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const filter1 = ctx.createBiquadFilter();
    filter1.type = 'lowpass';
    filter1.frequency.setValueAtTime(2600, now);
    filter1.frequency.exponentialRampToValueAtTime(130, now + 0.65);
    filter1.Q.setValueAtTime(4.2, now); // Sharp arcade bite

    const filter2 = ctx.createBiquadFilter();
    filter2.type = 'lowpass';
    filter2.frequency.setValueAtTime(2100, now);
    filter2.frequency.exponentialRampToValueAtTime(100, now + 0.65);
    filter2.Q.setValueAtTime(2.0, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.9, now);
    noiseGain.gain.linearRampToValueAtTime(0.7, now + 0.08);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);

    noiseSource.connect(filter1);
    filter1.connect(filter2);
    filter2.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noiseSource.start(now);
    noiseSource.stop(now + 0.8);

    // -------------------------------------------------------------
    // LAYER 4: Expanding Smoke Puffs Sizzle Tail
    // -------------------------------------------------------------
    const smokeBuffer = createNoiseBuffer(ctx, 0.7);
    const smokeSource = ctx.createBufferSource();
    smokeSource.buffer = smokeBuffer;

    const smokeHighpass = ctx.createBiquadFilter();
    smokeHighpass.type = 'highpass';
    smokeHighpass.frequency.setValueAtTime(1800, now + 0.08);

    const smokeGain = ctx.createGain();
    smokeGain.gain.setValueAtTime(0, now);
    smokeGain.gain.setValueAtTime(0.16, now + 0.12);
    smokeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

    smokeSource.connect(smokeHighpass);
    smokeHighpass.connect(smokeGain);
    smokeGain.connect(ctx.destination);

    smokeSource.start(now + 0.08);
    smokeSource.stop(now + 0.7);

  } catch (e) {
    console.debug('Error in small rocket explosion sound synthesis:', e);
  }
}


