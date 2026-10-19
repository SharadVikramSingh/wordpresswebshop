function getInternalPath(url: string): string {
  const siteUrl = "http://localhost/wordpresswebshop";

  if (url.startsWith(siteUrl)) {
    const pathname = url.slice(siteUrl.length);
    return pathname || "/";
  }

  return url;
}

export {getInternalPath}