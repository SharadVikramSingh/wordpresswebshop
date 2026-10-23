
function getInternalPath(url: string): string {
  const siteUrl = "http://localhost/wordpresswebshop";

  if (url.startsWith(siteUrl)) {
    const pathname = url.slice(siteUrl.length);
    return pathname || "/";
  }

  return url;
}

function decodeHtmlEntities(text: string): string {
  if (typeof document === "undefined") {
    return text;
  }

  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}

export { getInternalPath, decodeHtmlEntities };
