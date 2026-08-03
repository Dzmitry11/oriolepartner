import { IdCard, Car, KeyRound, Check, ArrowRight } from "lucide-react";
import { useLang } from "./LangProvider";
import { requestConsultation } from "./lead";
import { Button } from "@/components/ui/button";

const icons = [IdCard, Car, KeyRound];

export function ServiceCards() {
  const { t } = useLang();
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <h2 className="text-center font-display text-3xl sm:text-4xl">
        {t.cards.title}
      </h2>
      <div className="mx-auto mt-4 gold-rule" />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {t.cards.items.map((c, i) => {
          const Icon = icons[i % icons.length]!;
          return (
            <article
              key={c.title}
              className="panel flex flex-col p-7 transition-transform duration-300 hover:-translate-y-1"
            >
              <Icon className="size-8 text-primary" />
              <h3 className="mt-5 font-display text-2xl">{c.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {c.text}
              </p>
              <Button
                variant="outline"
                className="mt-6 justify-between"
                onClick={() => requestConsultation(t.form.services[i])}
              >
                {c.cta} <ArrowRight />
              </Button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {items.map((i) => (
        <li key={i} className="flex gap-2.5 text-sm text-muted-foreground">
          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

export function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="panel p-6">
      <h3 className="font-display text-xl text-foreground">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function SectionHead({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs uppercase tracking-[0.28em] text-primary">
        {kicker}
      </p>
      <h2 className="mt-4 text-balance font-display text-3xl leading-tight sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}
