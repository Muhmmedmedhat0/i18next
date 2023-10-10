import { Locale } from "@/i18n/i18n-config";

export interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    lang: Locale;
  };
}

