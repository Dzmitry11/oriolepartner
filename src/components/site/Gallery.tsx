import { useState } from "react";
import { useLang } from "./LangProvider";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export function Gallery() {
  const { t } = useLang();
  // Реальные фотографии автопарка добавляются здесь (от 3 до 6 шт.)
  const photos: { src: string; alt: string }[] = [];
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="border-y border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h2 className="font-display text-3xl sm:text-4xl">{t.gallery.title}</h2>
        <div className="mt-4 gold-rule" />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.length > 0
            ? photos.map((p) => (
                <button
                  key={p.src}
                  onClick={() => setActive(p.src)}
                  className="overflow-hidden rounded-xl border border-border"
                >
                  <img
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </button>
              ))
            : Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex aspect-[4/3] items-center justify-center rounded-xl border border-dashed border-border text-sm text-muted-foreground"
                >
                  {t.gallery.slot}
                </div>
              ))}
        </div>

        {photos.length === 0 && (
          <p className="mt-6 text-sm text-muted-foreground">
            {t.gallery.empty}
          </p>
        )}
        <p className="mt-3 text-sm text-muted-foreground">{t.gallery.note}</p>
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-3xl border-border bg-background p-2">
          {active && (
            <img src={active} alt="" className="w-full rounded-lg" />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
