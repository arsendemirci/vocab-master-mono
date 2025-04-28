export function parseDurationToMs(input) {
  const unitToMs = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
    w: 7 * 24 * 60 * 60 * 1000,
    M: 30 * 24 * 60 * 60 * 1000,
    y: 365 * 24 * 60 * 60 * 1000,
  };

  const regex = /(\d+(?:\.\d+)?)([smhdwMy])/g;
  let totalMs = 0;
  let match;

  while ((match = regex.exec(input.trim())) !== null) {
    const value = parseFloat(match[1]);
    const unit = match[2];
    const ms = unitToMs[unit];

    if (!ms) {
      throw new Error(`Unknown unit: ${unit}`);
    }

    totalMs += value * ms;
  }

  return totalMs;
}
