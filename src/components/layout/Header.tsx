"use client";

import { useState } from "react";
import Link from "next/link";

type MenuItem = {
  id?: number;
  title: string;
  url: string;
  target?: string;
  children?: MenuItem[];
};

type HeaderProps = {
  options: {
    header?: {
      logo?: string | { url?: string } | null;
      menu?: MenuItem[] | null;
      button_text?: string | null;
      button_url?: string | null;
      button_target?: string | null;
      site_name?: string | null;
    };
  };
};

const WORDPRESS_URL = "http://localhost/wordpresswebshop";
const WORDPRESS_PATH = "/wordpresswebshop";

// Convert WordPress URLs into Next.js frontend paths.
function getFrontendUrl(url?: string | null): string {
  if (!url) return "/";

  try {
    const parsedUrl = new URL(url, WORDPRESS_URL);

    // Convert URLs belonging to the local WordPress installation.
    if (
      parsedUrl.origin === new URL(WORDPRESS_URL).origin &&
      (
        parsedUrl.pathname === WORDPRESS_PATH ||
        parsedUrl.pathname.startsWith(`${WORDPRESS_PATH}/`)
      )
    ) {
      const path = parsedUrl.pathname
        .slice(WORDPRESS_PATH.length)
        .replace(/\/+$/, "");

      return `${path || "/"}${parsedUrl.search}${parsedUrl.hash}`;
    }

    // Preserve actual external URLs.
    if (/^https?:\/\//i.test(url)) {
      return url;
    }

    // Keep relative frontend paths.
    if (url.startsWith("/")) {
      return url;
    }

    return `/${url.replace(/^\/+|\/+$/g, "")}`;
  } catch {
    return url.startsWith("/") ? url : "/";
  }
}

function isExternalUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

function MenuItems({
  items,
  onNavigate,
}: {
  items: MenuItem[];
  onNavigate?: () => void;
}) {
  return (
    <>
      {items.map((item, index) => {
        const href = getFrontendUrl(item.url);
        const external = isExternalUrl(href);

        return (
          <li key={item.id ?? `${item.url}-${index}`}>
            {external ? (
              <a
                href={href}
                target={item.target || "_self"}
                rel={
                  item.target === "_blank"
                    ? "noopener noreferrer"
                    : undefined
                }
                onClick={onNavigate}
              >
                {item.title}
              </a>
            ) : (
              <Link
                href={href}
                onClick={onNavigate}
              >
                {item.title}
              </Link>
            )}

            {item.children && item.children.length > 0 && (
              <ul className="sub-menu">
                <MenuItems
                  items={item.children}
                  onNavigate={onNavigate}
                />
              </ul>
            )}
          </li>
        );
      })}
    </>
  );
}

export default function Header({ options }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const header = options?.header;

  const logoUrl =
    typeof header?.logo === "string"
      ? header.logo
      : header?.logo?.url;

  const siteName = header?.site_name || "Home";
  const menuItems = header?.menu ?? [];

  const buttonUrl = getFrontendUrl(header?.button_url);
  const buttonExternal = isExternalUrl(buttonUrl);

  return (
    <header className="header">
      <div className="wrapper">
        <div className="inner-part">
          {/* Logo */}
          <div className="logo">
            <Link href="/" aria-label={siteName}>
              {logoUrl ? (
                <img src={logoUrl} alt={siteName} />
              ) : (
                <span>{siteName}</span>
              )}
            </Link>
          </div>

          <div className="right_part">
            {/* Navigation */}
            <nav
              className={`navigation ${menuOpen ? "active" : ""}`}
              aria-label="Main navigation"
            >
              <ul>
                <MenuItems
                  items={menuItems}
                  onNavigate={() => setMenuOpen(false)}
                />
              </ul>
            </nav>

            {/* Project button */}
            {header?.button_url && header?.button_text && (
              buttonExternal ? (
                <a
                  className="btn_one"
                  href={buttonUrl}
                  target={header.button_target || "_self"}
                  rel={
                    header.button_target === "_blank"
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  {header.button_text}
                </a>
              ) : (
                <Link
                  className="btn_one"
                  href={buttonUrl}
                >
                  {header.button_text}
                </Link>
              )
            )}

            {/* Mobile menu */}
            <button
              type="button"
              className={`menubar ${menuOpen ? "active" : ""}`}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}