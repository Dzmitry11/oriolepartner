import { createFileRoute } from "@tanstack/react-router";
import { LangProvider } from "@/components/site/LangProvider";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { ServiceCards } from "@/components/site/ServiceCards";
import {
  LicenceSection,
  TaxiSection,
  RentSection,
  AboutSection,
} from "@/components/site/Sections";
import { Gallery } from "@/components/site/Gallery";
import { LeadForm } from "@/components/site/LeadForm";
import { Contacts, Footer, FloatingButtons } from "@/components/site/Contacts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Oriole Partner — замена прав, такси и аренда авто в Варшаве",
      },
      {
        name: "description",
        content:
          "Замена иностранных водительских прав, подключение к Uber, Bolt и FreeNow, аренда подготовленных гибридных Toyota в Варшаве.",
      },
      {
        property: "og:title",
        content: "Oriole Partner — работа в такси в Варшаве",
      },
      {
        property: "og:description",
        content:
          "Замена прав без ожидания 185 дней, подключение к Uber, Bolt, FreeNow и аренда автомобилей для такси.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <LangProvider>
      <Header />
      <main>
        <Hero />
        <ServiceCards />
        <LicenceSection />
        <TaxiSection />
        <RentSection />
        <Gallery />
        <AboutSection />
        <LeadForm />
        <Contacts />
      </main>
      <Footer />
      <FloatingButtons />
    </LangProvider>
  );
}
