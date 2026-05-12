export function shortHash(hash) {
  return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
}
