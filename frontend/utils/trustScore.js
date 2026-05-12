export function trustScore(input) {
  return Math.max(0, Math.min(100, input));
}
