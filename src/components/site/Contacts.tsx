import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { useLang } from "./LangProvider";
import { site } from "@/content/site";
import logo from "@/assets/oriole-hero.png.asset.json";

export function Contacts() {
  const { t } = useLang();
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
            <a href={site.phoneHref} className="panel flex items-center gap-4 p-5">
              <Phone className="size-5 text-primary" />
              <span>
                <span className="block text-xs text-muted-foreground">
                  {t.contacts.phone}
                </span>
                {site.phone}
              </span>
            </a>

            <div className="grid gap-4 sm:grid-cols-3">
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="panel flex items-center gap-3 p-4 text-sm"
              >
                <MessageCircle className="size-5 text-primary" /> WhatsApp
              </a>
              <a
                href={site.telegram}
                target="_blank"
                rel="noreferrer"
                className="panel flex items-center gap-3 p-4 text-sm"
              >
                <Send className="size-5 text-primary" /> Telegram
              </a>
              <a
                href={site.viber}
                className="panel flex items-center gap-3 p-4 text-sm"
              >
                <MessageCircle className="size-5 text-primary" /> Viber
              </a>
            </div>

            <a href={`mailto:${site.email}`} className="panel flex items-center gap-4 p-5">
              <Mail className="size-5 text-primary" />
              <span>
                <span className="block text-xs text-muted-foreground">
                  {t.contacts.email}
                </span>
                {site.email}
              </span>
            </a>

            <div className="panel flex items-center gap-4 p-5">
              <MapPin className="size-5 shrink-0 text-primary" />
              <span>
                <span className="block text-xs text-muted-foreground">
                  {t.contacts.address}
                </span>
                {site.address}
              </span>
            </div>

            <div className="panel flex items-center gap-4 p-5">
              <Clock className="size-5 text-primary" />
              <span>
                <span className="block text-xs text-muted-foreground">
                  {t.contacts.hours}
                </span>
                {t.contacts.hoursValue}
              </span>
            </div>

            <div className="panel p-5 text-sm text-muted-foreground">
              <p className="mb-3 font-display text-lg text-foreground">
                {t.contacts.requisites}
              </p>
              <p>{site.fullName}</p>
              <p className="mt-1">KRS: {site.krs}</p>
              <p>NIP: {site.nip}</p>
              <p>REGON: {site.regon}</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-border">
            <iframe
              title="Oriole Partner — карта"
              src={site.mapEmbed}
              loading="lazy"
              className="size-full min-h-[420px] w-full"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useLang();
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
          <p className="mt-4 text-sm text-muted-foreground">{site.shortName}</p>
        </div>

        <div className="space-y-1.5 text-sm text-muted-foreground">
          <a href={site.phoneHref} className="block hover:text-primary">
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className="block hover:text-primary">
            {site.email}
          </a>
          <p>{site.address}</p>
          <p>NIP: {site.nip}</p>
          <p>KRS: {site.krs}</p>
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
            © {new Date().getFullYear()} {site.shortName}. {t.footer.rights}.
          </p>
        </div>
      </div>
    </footer>
  );
}

export function FloatingButtons() {
  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col gap-3">
      <a
        href={site.phoneHref}
        aria-label="Phone"
        className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-gold transition-transform hover:scale-105"
      >
        <Phone className="size-5" />
      </a>
      <a
        href={site.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="flex size-12 items-center justify-center rounded-full border border-border bg-surface text-primary transition-transform hover:scale-105"
      >
        <MessageCircle className="size-5" />
      </a>
      <a
        href={site.telegram}
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
