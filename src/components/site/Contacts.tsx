import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang } from "./LangProvider";
import { useSiteSettings, telHref } from "@/hooks/useSiteData";
import logo from "@/assets/oriole-hero.png.asset.json";

export function Contacts() {
  const { t } = useLang();
  const s = useSiteSettings();
  return (
    <section id="contacts" className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <p className="text-xs uppercase tracking-[0.28em] text-primary">
          {t.contacts.kicker}
        </p>
        <h2 className="mt-4 font-display text-3xl sm:text-4xl">
          {t.contacts.title}
        </h2>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="grid gap-4">
            <a href={telHref(s.phone)} className="panel flex items-center gap-4 p-5">
              <Phone className="size-5 text-primary" />
              <span>
                <span className="block text-xs text-muted-foreground">
                  {t.contacts.phone}
                </span>
                {s.phone}
              </span>
            </a>

            <div className="grid gap-4 sm:grid-cols-3">
              <a
                href={s.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="panel flex items-center gap-3 p-4 text-sm"
              >
                <MessageCircle className="size-5 text-primary" /> WhatsApp
              </a>
              <a
                href={s.telegram}
                target="_blank"
                rel="noreferrer"
                className="panel flex items-center gap-3 p-4 text-sm"
              >
                <Send className="size-5 text-primary" /> Telegram
              </a>
              <a
                href={s.viber}
                className="panel flex items-center gap-3 p-4 text-sm"
              >
                <MessageCircle className="size-5 text-primary" /> Viber
              </a>
            </div>

            <a href={`mailto:${s.email}`} className="panel flex items-center gap-4 p-5">
              <Mail className="size-5 text-primary" />
              <span>
                <span className="block text-xs text-muted-foreground">
                  {t.contacts.email}
                </span>
                {s.email}
              </span>
            </a>

            <div className="panel flex items-center gap-4 p-5">
              <MapPin className="size-5 shrink-0 text-primary" />
              <span>
                <span className="block text-xs text-muted-foreground">
                  {t.contacts.address}
                </span>
                {s.address}
              </span>
            </div>

            <div className="panel flex items-center gap-4 p-5">
              <Clock className="size-5 text-primary" />
              <span>
                <span className="block text-xs text-muted-foreground">
                  {t.contacts.hours}
                </span>
                {s.hours || t.contacts.hoursValue}
              </span>
            </div>

            <div className="panel p-5 text-sm text-muted-foreground">
              <p className="mb-3 font-display text-lg text-foreground">
                {t.contacts.requisites}
              </p>
              <p>{s.full_name}</p>
              <p className="mt-1">KRS: {s.krs}</p>
              <p>NIP: {s.nip}</p>
              <p>REGON: {s.regon}</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-border">
            <iframe
              title="Oriole Partner — карта"
              src={s.map_embed}
              loading="lazy"
              className="size-full min-h-[420px] w-full"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="mt-6 text-right">
          <Link
            to="/admin"
            className="text-[11px] lowercase tracking-wide text-muted-foreground/40 transition-colors hover:text-primary"
          >
            admin
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useLang();
  const s = useSiteSettings();
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logo.url}
              alt="Oriole Partner"
              className="size-10 rounded-full object-cover ring-1 ring-border"
            />
            <span className="font-display text-lg gold-text">
              ORIOLE PARTNER
            </span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{s.short_name}</p>
        </div>

        <div className="space-y-1.5 text-sm text-muted-foreground">
          <a href={telHref(s.phone)} className="block hover:text-primary">
            {s.phone}
          </a>
          <a href={`mailto:${s.email}`} className="block hover:text-primary">
            {s.email}
          </a>
          <p>{s.address}</p>
          <p>NIP: {s.nip}</p>
          <p>KRS: {s.krs}</p>
        </div>

        <div className="space-y-1.5 text-sm text-muted-foreground">
          <a href="#form" className="block hover:text-primary">
            {t.footer.privacy}
          </a>
          <a href="#form" className="block hover:text-primary">
            {t.footer.consent}
          </a>
          <a href="#form" className="block hover:text-primary">
            {t.footer.cookies}
          </a>
          <p className="pt-3">
            © {new Date().getFullYear()} {s.short_name}. {t.footer.rights}.
          </p>
        </div>
      </div>
    </footer>
  );
}

export function FloatingButtons() {
  const s = useSiteSettings();
  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col gap-3">
      <a
        href={telHref(s.phone)}
        aria-label="Phone"
        className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-gold transition-transform hover:scale-105"
      >
        <Phone className="size-5" />
      </a>
      <a
        href={s.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="flex size-12 items-center justify-center rounded-full border border-border bg-surface text-primary transition-transform hover:scale-105"
      >
        <MessageCircle className="size-5" />
      </a>
      <a
        href={s.telegram}
        target="_blank"
        rel="noreferrer"
        aria-label="Telegram"
        className="flex size-12 items-center justify-center rounded-full border border-border bg-surface text-primary transition-transform hover:scale-105"
      >
        <Send className="size-5" />
      </a>
    </div>
  );
}
