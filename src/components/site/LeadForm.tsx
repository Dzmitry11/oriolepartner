import { useEffect, useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { useLang } from "./LangProvider";
import { LEAD_EVENT } from "./lead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function LeadForm() {
  const { t } = useLang();
  const [service, setService] = useState<string>("");
  const [way, setWay] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [consent, setConsent] = useState(false);
  const [honey, setHoney] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string | null>).detail;
      if (detail) setService(detail);
    };
    window.addEventListener(LEAD_EVENT, handler);
    return () => window.removeEventListener(LEAD_EVENT, handler);
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (honey) return; // защита от спама
    if (!name.trim() || !phone.trim() || !consent) {
      setError(t.form.required);
      return;
    }
    setError("");
    setSent(true);
  };

  return (
    <section id="form" className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.28em] text-primary">
          {t.form.kicker}
        </p>
        <h2 className="mt-4 font-display text-3xl sm:text-4xl">
          {t.form.title}
        </h2>
        <p className="mt-3 text-muted-foreground">{t.form.subtitle}</p>
      </div>

      {sent ? (
        <div className="panel mt-10 flex items-center gap-4 p-8">
          <CheckCircle2 className="size-8 shrink-0 text-primary" />
          <p className="text-pretty">{t.form.success}</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="panel mt-10 grid gap-5 p-6 sm:p-8">
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honey}
            onChange={(e) => setHoney(e.target.value)}
            className="hidden"
            aria-hidden="true"
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="name">{t.form.name}</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">{t.form.phone}</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>{t.form.service}</Label>
              <Select value={service} onValueChange={setService}>
                <SelectTrigger>
                  <SelectValue placeholder={t.form.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {t.form.services.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>{t.form.contactWay}</Label>
              <Select value={way} onValueChange={setWay}>
                <SelectTrigger>
                  <SelectValue placeholder={t.form.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {t.form.ways.map((w) => (
                    <SelectItem key={w} value={w}>
                      {w}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="comment">{t.form.comment}</Label>
            <Textarea
              id="comment"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <label className="flex items-start gap-3 text-sm text-muted-foreground">
            <Checkbox
              checked={consent}
              onCheckedChange={(v) => setConsent(v === true)}
              className="mt-0.5"
            />
            <span>{t.form.consent}</span>
          </label>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" size="lg">
            {t.form.submit}
          </Button>
        </form>
      )}
    </section>
  );
}
