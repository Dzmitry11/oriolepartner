import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { useLang } from "./LangProvider";
import { requestConsultation } from "./lead";
import { useSiteSettings, telHref } from "@/hooks/useSiteData";
import { Button } from "@/components/ui/button";
import logo from "@/assets/oriole-hero.png.asset.json";

export function Header() {
  const { t, lang, setLang } = useLang();
  const site = useSiteSettings();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#licence", label: t.nav.licence },
    { href: "#taxi", label: t.nav.taxi },
    { href: "#rent", label: t.nav.rent },
    { href: "#about", label: t.nav.about },
    { href: "#contacts", label: t.nav.contacts },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-border bg-background/95 backdrop-blur"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <a href="#top" className="flex shrink-0 items-center gap-3">
          <img
            src={logo.url}
            alt="Oriole Partner"
            className="h-11 w-11 rounded-full object-cover ring-1 ring-border"
          />
          <span className="hidden font-display text-lg tracking-wide gold-text sm:block">
            ORIOLE PARTNER
          </span>
        </a>

        <nav className="ml-auto hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <div className="flex items-center rounded-md border border-border text-xs">
            {(["ru", "ua", "pl"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1.5 uppercase transition-colors ${
                  lang === l
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 text-sm text-foreground transition-colors hover:text-primary md:flex"
          >
            <Phone className="size-4" />
            {site.phone}
          </a>

          <Button
            className="hidden md:inline-flex"
            onClick={() => requestConsultation()}
          >
            {t.nav.cta}
          </Button>

          <button
            className="lg:hidden"
            aria-label={t.nav.menu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3 text-sm text-muted-foreground"
              >
                {l.label}
              </a>
            ))}
            <a href={site.phoneHref} className="py-3 text-sm text-primary">
              {site.phone}
            </a>
            <Button
              className="mt-2"
              onClick={() => {
                setOpen(false);
                requestConsultation();
              }}
            >
              {t.nav.cta}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
