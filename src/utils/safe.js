export const safeExternalUrl = (url) => {
  if (typeof url !== "string" || !url.trim()) {
    return "#";
  }

  try {
    const parsed = new URL(url);
    const protocol = parsed.protocol.toLowerCase();
    if (protocol !== "https:" && protocol !== "http:") {
      return "#";
    }
    return parsed.href;
  } catch {
    return "#";
  }
};

export const asArray = (value) => (Array.isArray(value) ? value : []);
