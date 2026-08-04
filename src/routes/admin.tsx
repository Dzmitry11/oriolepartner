import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  fallbackSettings,
  settingsQueryKey,
  photosQueryKey,
  useCarPhotos,
  type SiteSettings,
} from "@/hooks/useSiteData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, LogOut, Trash2, Upload } from "lucide-react";

const ADMIN_EMAIL = "alwaysactualdata@oriole.local";
const ADMIN_LOGIN = "AlwaysActualData";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Панель администратора — Oriole Partner" },
      {
        name: "description",
        content:
          "Служебная панель Oriole Partner: контакты, реквизиты, фото автопарка и заявки на консультацию.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Панель администратора — Oriole Partner" },
      {
        property: "og:description",
        content: "Служебная панель управления сайтом Oriole Partner.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [ready, setReady] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSignedIn(!!data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setSignedIn(!!session);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  return signedIn ? <Dashboard /> : <LoginCard />;
}

function LoginCard() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const email = login.trim().includes("@")
      ? login.trim()
      : login.trim().toLowerCase() === ADMIN_LOGIN.toLowerCase()
        ? ADMIN_EMAIL
        : `${login.trim().toLowerCase()}@oriole.local`;
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setBusy(false);
    if (authError) setError("Неверный логин или пароль");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form onSubmit={submit} className="panel w-full max-w-sm space-y-5 p-8">
        <div>
          <h1 className="font-display text-2xl gold-text">Вход администратора</h1>
          <p className="mt-1 text-sm text-muted-foreground">Oriole Partner</p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="login">Логин</Label>
          <Input
            id="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            autoComplete="username"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Пароль</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" className="w-full" disabled={busy}>
          Войти
        </Button>
        <Link to="/" className="block text-center text-xs text-muted-foreground hover:text-primary">
          На сайт
        </Link>
      </form>
    </div>
  );
}

function Dashboard() {
  const queryClient = useQueryClient();

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl gold-text sm:text-3xl">
          Панель администратора
        </h1>
        <div className="flex items-center gap-2">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
            На сайт
          </Link>
          <Button variant="outline" size="sm" onClick={signOut}>
            <LogOut className="mr-2 size-4" /> Выйти
          </Button>
        </div>
      </div>

      <Tabs defaultValue="leads" className="mt-8">
        <TabsList>
          <TabsTrigger value="leads">Заявки</TabsTrigger>
          <TabsTrigger value="settings">Контакты и реквизиты</TabsTrigger>
          <TabsTrigger value="photos">Фото авто</TabsTrigger>
        </TabsList>
        <TabsContent value="leads" className="mt-6">
          <LeadsPanel />
        </TabsContent>
        <TabsContent value="settings" className="mt-6">
          <SettingsPanel />
        </TabsContent>
        <TabsContent value="photos" className="mt-6">
          <PhotosPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}

type Lead = {
  id: string;
  name: string;
  phone: string;
  service: string;
  contact_way: string;
  comment: string;
  lang: string;
  status: string;
  created_at: string;
};

function LeadsPanel() {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Lead[];
    },
  });

  const toggle = async (lead: Lead) => {
    await supabase
      .from("leads")
      .update({ status: lead.status === "new" ? "done" : "new" })
      .eq("id", lead.id);
    queryClient.invalidateQueries({ queryKey: ["leads"] });
  };

  const remove = async (id: string) => {
    await supabase.from("leads").delete().eq("id", id);
    queryClient.invalidateQueries({ queryKey: ["leads"] });
  };

  if (isLoading) return <Loader2 className="size-5 animate-spin text-primary" />;
  if (error) return <p className="text-sm text-destructive">Не удалось загрузить заявки.</p>;
  if (!data?.length)
    return <p className="text-sm text-muted-foreground">Заявок пока нет.</p>;

  return (
    <div className="grid gap-4">
      {data.map((l) => (
        <div key={l.id} className="panel p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-display text-lg">
                {l.name} — {l.phone}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(l.created_at).toLocaleString("ru-RU")} · {l.lang.toUpperCase()} ·{" "}
                {l.status === "new" ? "новая" : "обработана"}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => toggle(l)}>
                {l.status === "new" ? "Обработана" : "Вернуть в новые"}
              </Button>
              <Button variant="outline" size="sm" onClick={() => remove(l.id)}>
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
          <div className="mt-3 space-y-1 text-sm text-muted-foreground">
            {l.service && <p>Услуга: {l.service}</p>}
            {l.contact_way && <p>Способ связи: {l.contact_way}</p>}
            {l.comment && <p>Комментарий: {l.comment}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

const SETTINGS_FIELDS: { key: keyof SiteSettings; label: string }[] = [
  { key: "phone", label: "Телефон" },
  { key: "whatsapp", label: "Ссылка WhatsApp" },
  { key: "telegram", label: "Ссылка Telegram" },
  { key: "viber", label: "Ссылка Viber" },
  { key: "email", label: "E-mail" },
  { key: "address", label: "Адрес" },
  { key: "hours", label: "Часы работы" },
  { key: "map_embed", label: "Ссылка карты (embed)" },
  { key: "full_name", label: "Полное название" },
  { key: "short_name", label: "Краткое название" },
  { key: "krs", label: "KRS" },
  { key: "nip", label: "NIP" },
  { key: "regon", label: "REGON" },
];

function SettingsPanel() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["site_settings_admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .eq("id", 1)
        .maybeSingle();
      if (error) throw error;
      return (data as SiteSettings | null) ?? fallbackSettings;
    },
  });

  const [form, setForm] = useState<SiteSettings | null>(null);
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);
  const value = useMemo(() => form ?? data ?? null, [form, data]);

  const save = async () => {
    if (!value) return;
    setBusy(true);
    const { error } = await supabase
      .from("site_settings")
      .update({ ...value, id: 1 })
      .eq("id", 1);
    setBusy(false);
    if (!error) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      queryClient.invalidateQueries({ queryKey: settingsQueryKey });
      queryClient.invalidateQueries({ queryKey: ["site_settings_admin"] });
    }
  };

  if (isLoading || !value)
    return <Loader2 className="size-5 animate-spin text-primary" />;

  return (
    <div className="panel grid gap-5 p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        {SETTINGS_FIELDS.map((f) => (
          <div key={f.key} className="grid gap-2">
            <Label htmlFor={f.key}>{f.label}</Label>
            <Input
              id={f.key}
              value={value[f.key] ?? ""}
              onChange={(e) =>
                setForm({ ...value, [f.key]: e.target.value })
              }
            />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <Button onClick={save} disabled={busy}>
          Сохранить
        </Button>
        {saved && <span className="text-sm text-primary">Сохранено</span>}
      </div>
    </div>
  );
}

function PhotosPanel() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useCarPhotos();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const refresh = () =>
    queryClient.invalidateQueries({ queryKey: photosQueryKey });

  const upload = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    setError("");
    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;
      const up = await supabase.storage.from("cars").upload(path, file);
      if (up.error) {
        setError(up.error.message);
        continue;
      }
      const ins = await supabase.from("car_photos").insert({
        storage_path: path,
        url: path,
        title: file.name.replace(/\.[^.]+$/, ""),
        sort_order: (data?.length ?? 0) + 1,
      });
      if (ins.error) setError(ins.error.message);
    }
    setBusy(false);
    refresh();
  };

  const remove = async (id: string, path: string) => {
    await supabase.storage.from("cars").remove([path]);
    await supabase.from("car_photos").delete().eq("id", id);
    refresh();
  };

  return (
    <div className="grid gap-6">
      <div className="panel flex flex-wrap items-center gap-4 p-5">
        <Label
          htmlFor="upload"
          className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          <Upload className="size-4" /> Загрузить фото
        </Label>
        <input
          id="upload"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => upload(e.target.files)}
        />
        {busy && <Loader2 className="size-4 animate-spin text-primary" />}
        {error && <span className="text-sm text-destructive">{error}</span>}
      </div>

      {isLoading ? (
        <Loader2 className="size-5 animate-spin text-primary" />
      ) : !data?.length ? (
        <p className="text-sm text-muted-foreground">Фотографий пока нет.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((p) => (
            <div key={p.id} className="overflow-hidden rounded-xl border border-border">
              <img src={p.url} alt={p.title} className="aspect-[4/3] w-full object-cover" />
              <div className="flex items-center justify-between gap-2 p-3">
                <span className="truncate text-xs text-muted-foreground">{p.title}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => remove(p.id, p.storage_path)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
