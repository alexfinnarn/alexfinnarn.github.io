// Pencil lines drawn in code, like the site's other textures. Each is an alpha mask: put a
// color behind it with CSS (`background` plus `mask`), so the color stays a role token.

/** A small seeded random number generator (mulberry32), so a line is the same every build. */
function random(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * A hand-drawn line as a CSS `url()`: slightly wobbly and sloped, traced twice like a pencil
 * going over it. It stretches to any width; `weight` is the stroke in CSS pixels.
 */
export function pencilLine(seed: number, weight = 1.6) {
  const next = random(seed);
  const slope = (next() - 0.5) * 2;
  const points = Array.from({ length: 26 }, (_, i) => {
    const x = 4 + i * 39.7;
    const y = 6 + slope * (i / 25 - 0.5) + (next() - 0.5) * 1.6;
    return `${x.toFixed(1)} ${y.toFixed(2)}`;
  });
  const d = `M${points.join(' L')}`;
  const stroke = (width: number, opacity: number, dy: number) =>
    `<path d='${d}' transform='translate(0 ${dy})' fill='none' stroke='%23fff' stroke-opacity='${opacity}' stroke-width='${width}' stroke-linecap='round' stroke-linejoin='round' vector-effect='non-scaling-stroke'/>`;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 12' preserveAspectRatio='none'>${stroke(weight, 0.9, 0)}${stroke(weight * 0.75, 0.45, weight * 0.4)}</svg>`;
  return `url("data:image/svg+xml,${svg.replace(/</g, '%3C').replace(/>/g, '%3E').replace(/ /g, '%20')}")`;
}
