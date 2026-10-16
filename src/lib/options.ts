import { wpFetch } from "./wordpress";

export type MenuItem = {
  title: string;
  url: string;
  target?: string;
  children?: MenuItem[];
};

export type SiteOptions = {
  header?: {
    logo?: string | { url?: string } | null;
    menu?: MenuItem[] | null;
    button_text?: string | null;
    button_url?: string | null;
    button_target?: string | null;
    site_name?: string | null;
  };
};

export async function getSiteOptions(): Promise<SiteOptions> {
  return wpFetch<SiteOptions>("/site/v1/options");
}