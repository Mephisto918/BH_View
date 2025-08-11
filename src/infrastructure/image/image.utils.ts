export const buildImageUrl = (path: string, isProtected = false) => {
  const base = "https://your-api-url.com/media";
  const layer = isProtected ? "protected" : "public";
  return `${base}/${layer}/${path}`;
};