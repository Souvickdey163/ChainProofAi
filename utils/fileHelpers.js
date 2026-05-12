export function getFileTypeLabel(file) {
  if (!file) {
    return "Unknown";
  }

  return file.type || "Unknown";
}
