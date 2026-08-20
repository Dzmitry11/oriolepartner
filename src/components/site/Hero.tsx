import { Phone, MessageCircle, Send } from "lucide-react";
import { useLang } from "./LangProvider";
import { requestConsultation } from "./lead";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
const hero = "/oriole-hero.png";

export function Hero() {
  const { t } = useLang();

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden">
      <img
        src={hero}
        alt="Oriole Partner — ночная Варшава"
        className="absolute inset-0 size-full object-cover"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-4xl flex-col items-center justify-end px-4 pb-16 pt-32 text-center sm:px-6">
        <h1 className="rise-in max-w-3xl text-balance font-display text-4xl leading-tight sm:text-5xl md:text-6xl">
          <span className="gold-text">{t.hero.title}</span>
        </h1>
        <p className="rise-in mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
          {t.hero.subtitle}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" onClick={() => requestConsultation()}>
            {t.hero.cta}
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href={site.phoneHref}>
              <Phone /> {t.hero.call}
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href={site.whatsapp} target="_blank" rel="noreferrer">
              <MessageCircle /> WhatsApp
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href={site.telegram} target="_blank" rel="noreferrer">
              <Send /> Telegram
            </a>
          </Button>
        </div>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {t.hero.perks.map((p) => (
            <li key={p} className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
