import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { site as fallback } from "@/content/site";

export type SiteSettings = {
  phone: string;
  whatsapp: string;
  telegram: string;
  viber: string;
  email: string;
  address: string;
  map_embed: string;
  hours: string;
  full_name: string;
  short_name: string;
  krs: string;
  nip: string;
  regon: string;
};

export const fallbackSettings: SiteSettings = {
  phone: fallback.phone,
  whatsapp: fallback.whatsapp,
  telegram: fallback.telegram,
  viber: fallback.viber,
  email: fallback.email,
  address: fallback.address,
  map_embed: fallback.mapEmbed,
  hours: "",
  full_name: fallback.fullName,
  short_name: fallback.shortName,
  krs: fallback.krs,
  nip: fallback.nip,
  regon: fallback.regon,
};

export const settingsQueryKey = ["site_settings"];

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

export function useSiteSettings() {
  const { data } = useQuery({
    queryKey: settingsQueryKey,
    queryFn: async (): Promise<SiteSettings> => {
      const { data, error } = await supabase
        .from("site_settings")
        .select(
          "phone, whatsapp, telegram, viber, email, address, map_embed, hours, full_name, short_name, krs, nip, regon",
        )
        .eq("id", 1)
        .maybeSingle();
      if (error) throw error;
      return (data as SiteSettings | null) ?? fallbackSettings;
    },
    staleTime: 60_000,
  });

  return data ?? fallbackSettings;
}

export type CarPhoto = {
  id: string;
  storage_path: string;
  title: string;
  sort_order: number;
  url: string;
};

export const photosQueryKey = ["car_photos"];

export function useCarPhotos() {
  return useQuery({
    queryKey: photosQueryKey,
    queryFn: async (): Promise<CarPhoto[]> => {
      const { data, error } = await supabase
        .from("car_photos")
        .select("id, storage_path, title, sort_order")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });
      if (error) throw error;
      const rows = data ?? [];
      if (rows.length === 0) return [];
      const signed = await supabase.storage
        .from("cars")
        .createSignedUrls(
          rows.map((r) => r.storage_path),
          60 * 60 * 24 * 7,
        );
      return rows.map((r, i) => ({
        ...r,
        url: signed.data?.[i]?.signedUrl ?? "",
      }));
    },
    staleTime: 60_000,
  });
}
