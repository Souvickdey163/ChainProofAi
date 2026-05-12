export function formatDate(value) {
  if (!value) {
    return "Unavailable";
  }

  return new Date(value).toLocaleString();
}
