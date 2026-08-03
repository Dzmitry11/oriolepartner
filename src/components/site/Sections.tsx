import { AlertTriangle, ShieldCheck, Clock } from "lucide-react";
import { useLang } from "./LangProvider";
import { requestConsultation } from "./lead";
import { Button } from "@/components/ui/button";
import { Bullets, Block, SectionHead } from "./ServiceCards";

export function LicenceSection() {
  const { t } = useLang();
  const s = t.licence;
  return (
    <section id="licence" className="border-y border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHead kicker={s.kicker} title={s.title} subtitle={s.text} />

        <div className="mt-8 flex gap-3 rounded-xl border border-primary/40 bg-primary/5 p-5">
          <AlertTriangle className="size-5 shrink-0 text-primary" />
          <div>
            <p className="font-medium">{s.noteTitle}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {s.note}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Block title={s.forWhoTitle}>
            <Bullets items={s.forWho} />
          </Block>
          <Block title={s.includedTitle}>
            <Bullets items={s.included} />
          </Block>
          <Block title={s.termTitle}>
            <p className="flex items-center gap-2 font-display text-3xl gold-text">
              <Clock className="size-6 text-primary" />
              {s.term}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">{s.termNote}</p>
          </Block>
          <Block title={s.guaranteeTitle}>
            <p className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
              {s.guarantee}
            </p>
          </Block>
        </div>

        <div className="mt-6">
          <Block title={s.advantagesTitle}>
            <Bullets items={s.advantages} />
          </Block>
        </div>

        <Button
          size="lg"
          className="mt-8"
          onClick={() => requestConsultation(t.form.services[0])}
        >
          {s.cta}
        </Button>
      </div>
    </section>
  );
}

export function TaxiSection() {
  const { t } = useLang();
  const s = t.taxi;
  return (
    <section id="taxi" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionHead kicker={s.kicker} title={s.title} subtitle={s.subtitle} />

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Block title={s.forWhoTitle}>
          <Bullets items={s.forWho} />
        </Block>
        <Block title={s.termTitle}>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {s.term}
          </p>
        </Block>
        <Block title={s.docsTitle}>
          <Bullets items={s.docs} />
        </Block>
        <Block title={s.providesTitle}>
          <Bullets items={s.provides} />
        </Block>
        <Block title={s.payoutsTitle}>
          <Bullets items={s.payouts} />
          <p className="mt-4 text-sm text-muted-foreground">{s.payoutsNote}</p>
        </Block>
        <Block title={s.reportsTitle}>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {s.reports}
          </p>
          <h4 className="mt-6 font-display text-lg">{s.formsTitle}</h4>
          <div className="mt-3">
            <Bullets items={s.forms} />
          </div>
        </Block>
      </div>

      <div className="mt-6">
        <Block title={s.advantagesTitle}>
          <Bullets items={s.advantages} />
        </Block>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button size="lg" onClick={() => requestConsultation(t.form.services[1])}>
          {s.cta1}
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => requestConsultation(t.form.services[1])}
        >
          {s.cta2}
        </Button>
      </div>
    </section>
  );
}

export function RentSection() {
  const { t } = useLang();
  const s = t.rent;
  return (
    <section id="rent" className="border-y border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHead kicker={s.kicker} title={s.title} subtitle={s.subtitle} />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Block title={s.modelsTitle}>
            <div className="flex flex-wrap gap-2">
              {s.models.map((m) => (
                <span
                  key={m}
                  className="rounded-full border border-border px-4 py-1.5 text-sm text-foreground"
                >
                  {m}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{s.modelsNote}</p>
          </Block>
          <Block title={s.priceTitle}>
            <p className="font-display text-3xl gold-text">{s.price}</p>
            <p className="mt-3 text-sm text-muted-foreground">{s.priceNote}</p>
          </Block>
          <Block title={s.termsTitle}>
            <Bullets items={s.terms} />
          </Block>
          <Block title={s.getsTitle}>
            <Bullets items={s.gets} />
          </Block>
          <Block title={s.depositTitle}>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {s.deposit}
            </p>
          </Block>
          <Block title={s.responsibilityTitle}>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {s.responsibility}
            </p>
            <h4 className="mt-6 font-display text-lg">{s.requirementsTitle}</h4>
            <div className="mt-3">
              <Bullets items={s.requirements} />
            </div>
          </Block>
        </div>

        <Button
          size="lg"
          className="mt-8"
          onClick={() => requestConsultation(t.form.services[2])}
        >
          {s.cta}
        </Button>
      </div>
    </section>
  );
}

export function AboutSection() {
  const { t } = useLang();
  const s = t.about;
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <SectionHead kicker={s.kicker} title={s.title} subtitle={s.text} />
        <div className="grid gap-4 sm:grid-cols-2">
          {s.perks.map((p) => (
            <div key={p} className="panel p-5 text-sm text-muted-foreground">
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
