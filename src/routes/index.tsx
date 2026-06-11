import { createFileRoute } from "@tanstack/react-router";
import logoAsset from "@/assets/logo-bh.jpg.asset.json";
import {
  Scissors,
  Phone,
  MapPin,
  Clock,
  Star,
  MessageCircle,
  Sparkles,
  Award,
  Users,
  ShieldCheck,
  Calendar,
  ArrowRight,
} from "lucide-react";

const LOGO = logoAsset.url;
const PHONE = "656506418";
const PHONE_DISPLAY = "656 50 64 18";
const WHATSAPP = `https://wa.me/34${PHONE}`;
const ADDRESS = "C. Campoamor, 03690 Sant Vicent del Raspeig, Alicante";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Peluquería Barbería Borja Hernández | Sant Vicent del Raspeig" },
      {
        name: "description",
        content:
          "Barbería profesional en Sant Vicent del Raspeig. Cortes, degradados, arreglo de barba y afeitado tradicional. Reserva tu cita ⭐ 4,7/5.",
      },
      { property: "og:title", content: "Peluquería Barbería Borja Hernández" },
      {
        property: "og:description",
        content:
          "Cortes de caballero, degradados y arreglo de barba en Sant Vicent del Raspeig.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: LOGO },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "icon", href: LOGO },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BarberShop",
          name: "Peluquería Barbería Borja Hernández",
          image: LOGO,
          telephone: "+34656506418",
          address: {
            "@type": "PostalAddress",
            streetAddress: "C. Campoamor",
            addressLocality: "Sant Vicent del Raspeig",
            postalCode: "03690",
            addressRegion: "Alicante",
            addressCountry: "ES",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.7",
            reviewCount: "100",
          },
          openingHours: "Mo-Sa 09:30-20:00",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Stats />
      <About />
      <Services />
      <Why />
      <Testimonials />
      <Contact />
      <CTAFinal />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <a href="#" className="flex items-center gap-3">
          <img src={LOGO} alt="Logo Borja Hernández" className="h-10 w-10 rounded-full object-cover" />
          <span className="font-display text-lg tracking-tight">
            Borja <span className="italic">Hernández</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#servicios" className="hover:text-foreground transition-colors">Servicios</a>
          <a href="#nosotros" className="hover:text-foreground transition-colors">Nosotros</a>
          <a href="#opiniones" className="hover:text-foreground transition-colors">Opiniones</a>
          <a href="#contacto" className="hover:text-foreground transition-colors">Contacto</a>
        </nav>
        <a
          href={`tel:+34${PHONE}`}
          className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-transform hover:scale-105"
        >
          Reservar
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
      {/* Subtle monochrome backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,oklch(1_0_0),oklch(0.9_0.003_80)_70%)]" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(oklch(0_0_0)_1px,transparent_1px),linear-gradient(90deg,oklch(0_0_0)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 text-center animate-fade-up">
        <img
          src={LOGO}
          alt="Peluquería Barbería Borja Hernández"
          className="mx-auto mb-10 h-32 w-32 rounded-full object-cover shadow-deep md:h-40 md:w-40"
        />
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background/60 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-foreground backdrop-blur">
          <Sparkles className="h-3 w-3" /> Sant Vicent del Raspeig
        </div>
        <h1 className="font-display text-5xl font-medium leading-[1.05] sm:text-6xl md:text-7xl lg:text-8xl">
          Tu imagen merece
          <br />
          <span className="italic">el mejor corte</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Profesionalidad, estilo y atención personalizada. Más de 100 clientes nos avalan
          con una valoración media de 4,7 estrellas.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={`tel:+34${PHONE}`}
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 font-medium text-background transition-transform hover:scale-105"
          >
            <Calendar className="h-4 w-4" /> Reservar cita
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href={`tel:+34${PHONE}`}
            className="inline-flex items-center gap-2 rounded-full border border-foreground/40 px-7 py-3.5 font-medium text-foreground transition-colors hover:bg-foreground/5"
          >
            <Phone className="h-4 w-4" /> Llamar ahora
          </a>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-sm">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-4 w-4 fill-foreground text-foreground" />
            ))}
          </div>
          <span className="text-muted-foreground">
            <span className="font-semibold text-foreground">4,7/5</span> · +100 reseñas
          </span>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    { value: "+100", label: "Clientes satisfechos" },
    { value: "4,7★", label: "Valoración media" },
    { value: "L-S", label: "Desde las 9:30" },
    { value: "100%", label: "Atención personal" },
  ];
  return (
    <section className="border-y border-border bg-foreground text-background">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-10 md:grid-cols-4">
        {items.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-3xl md:text-4xl">{s.value}</div>
            <div className="mt-1 text-xs uppercase tracking-widest text-background/60">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="nosotros" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="relative flex aspect-square items-center justify-center rounded-2xl bg-card shadow-deep">
          <img
            src={LOGO}
            alt="Logo Peluquería Barbería Borja Hernández"
            className="h-3/4 w-3/4 rounded-full object-cover"
          />
          <div className="absolute -bottom-6 -right-6 hidden h-32 w-32 rounded-2xl bg-foreground md:block" />
        </div>
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Sobre nosotros</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">
            Pasión por la barbería <span className="italic">y el detalle</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            En Peluquería Barbería Borja Hernández nos especializamos en ofrecer cortes
            modernos, degradados perfectos y arreglos de barba con la máxima precisión.
            Nuestro objetivo es que cada cliente salga con una imagen impecable y una
            experiencia excepcional.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { icon: Award, t: "Maestría profesional" },
              { icon: ShieldCheck, t: "Higiene impecable" },
              { icon: Users, t: "Trato cercano" },
              { icon: Sparkles, t: "Técnicas modernas" },
            ].map(({ icon: Icon, t }) => (
              <div key={t} className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
                <Icon className="h-5 w-5 text-foreground" />
                <span className="text-sm">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoShowcase() {
  return (
    <section className="bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Nuestra barbería</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">
            Vive la <span className="italic">experiencia</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Un vistazo a nuestro estilo, ambiente y trabajo diario.
          </p>
        </div>
        <div className="mt-12 overflow-hidden rounded-2xl border border-border shadow-deep">
          <video
            src={videoAsset.url}
            autoPlay
            muted
            loop
            playsInline
            controls
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    { name: "Corte de Caballero", desc: "Corte clásico o moderno con acabado profesional.", price: "15€" },
    { name: "Degradado Fade", desc: "Degradados perfectos: low, mid, high y skin fade.", price: "17€" },
    { name: "Arreglo de Barba", desc: "Perfilado y diseño adaptado a tus rasgos.", price: "10€" },
    { name: "Afeitado Tradicional", desc: "Navaja, toallas calientes y cuidados premium.", price: "15€" },
    { name: "Corte + Barba", desc: "Combo completo para una imagen impecable.", price: "22€" },
    { name: "Asesoramiento de Imagen", desc: "Encontramos el estilo que mejor te define.", price: "Consulta" },
  ];
  return (
    <section id="servicios" className="bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Servicios</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">
            Cada detalle, <span className="italic">cuidado</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Servicios pensados para el hombre que quiere lo mejor.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.name}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-8 transition-all hover:border-foreground hover:shadow-deep"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-foreground/5 text-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
                <Scissors className="h-5 w-5" />
              </div>
              <h3 className="font-display text-2xl">{s.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              <div className="mt-6 flex items-end justify-between border-t border-border pt-4">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Desde</span>
                <span className="font-display text-2xl">{s.price}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Why() {
  const items = [
    { icon: Users, t: "+100 clientes satisfechos", d: "Una comunidad creciente que confía en nosotros." },
    { icon: Sparkles, t: "Atención personalizada", d: "Escuchamos para ofrecerte el estilo perfecto." },
    { icon: ShieldCheck, t: "Máxima higiene", d: "Material esterilizado y protocolos estrictos." },
    { icon: Scissors, t: "Técnicas modernas", d: "Tendencias actuales con base clásica." },
    { icon: Award, t: "Resultados premium", d: "Acabados precisos en cada visita." },
    { icon: Clock, t: "Puntualidad", d: "Respetamos tu tiempo, abrimos desde las 9:30." },
  ];
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">¿Por qué elegirnos?</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">
            La diferencia está <span className="italic">en el detalle</span>
          </h2>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {items.map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-xl border border-border bg-card p-6">
              <Icon className="h-6 w-6 text-foreground" />
              <h3 className="mt-4 font-display text-xl">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { t: "Buen trabajo, buen trato y muy buen ambiente.", a: "Cliente verificado" },
    { t: "Muy cuidadosos con la limpieza y la profesionalidad.", a: "Cliente verificado" },
    { t: "Son muy amables y realizan cortes de gran calidad.", a: "Cliente verificado" },
  ];
  return (
    <section id="opiniones" className="bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Opiniones</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">
            Lo que dicen <span className="italic">nuestros clientes</span>
          </h2>
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-5 w-5 fill-foreground text-foreground" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">4,7/5</span> · +100 reseñas
            </span>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <figure
              key={i}
              className="rounded-xl border border-border bg-card p-8"
            >
              <div className="mb-4 flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-4 w-4 fill-foreground text-foreground" />
                ))}
              </div>
              <blockquote className="font-display text-lg italic leading-relaxed">
                "{r.t}"
              </blockquote>
              <figcaption className="mt-6 text-sm text-muted-foreground">— {r.a}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contacto" className="py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Contacto</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">
            Visítanos en <span className="italic">Sant Vicent</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Te esperamos en el centro de Sant Vicent del Raspeig.
          </p>

          <div className="mt-8 space-y-5">
            <a href={`tel:+34${PHONE}`} className="flex items-start gap-4 group">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-foreground/5 text-foreground group-hover:bg-foreground group-hover:text-background transition">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Teléfono</div>
                <div className="font-display text-xl">{PHONE_DISPLAY}</div>
              </div>
            </a>
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-foreground/5 text-foreground">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Dirección</div>
                <div className="text-base">{ADDRESS}</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-foreground/5 text-foreground">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Horario</div>
                <div className="text-base">Lunes a Sábado · desde 9:30</div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`tel:+34${PHONE}`}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background"
            >
              <Phone className="h-4 w-4" /> Llamar
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/40 px-6 py-3 text-sm font-medium hover:bg-foreground/5"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border shadow-deep">
          <iframe
            title="Mapa Peluquería Barbería Borja Hernández"
            src="https://www.google.com/maps?q=Calle+Campoamor+Sant+Vicent+del+Raspeig+Alicante&output=embed"
            width="100%"
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="min-h-[420px] w-full grayscale contrast-110"
          />
        </div>
      </div>
    </section>
  );
}

function CTAFinal() {
  return (
    <section className="relative overflow-hidden bg-foreground py-24 text-background md:py-32">
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <img src={LOGO} alt="Logo BH" className="mx-auto mb-8 h-20 w-20 rounded-full object-cover" />
        <h2 className="font-display text-4xl md:text-6xl">
          Reserva tu cita y <span className="italic">renueva tu estilo</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-background/70">
          Te esperamos para ofrecerte una experiencia de barbería profesional con resultados
          que marcan la diferencia.
        </p>
        <a
          href={`tel:+34${PHONE}`}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-background px-8 py-4 font-medium text-foreground transition-transform hover:scale-105"
        >
          <Calendar className="h-4 w-4" /> Reservar ahora
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex items-center gap-3">
          <img src={LOGO} alt="Logo BH" className="h-8 w-8 rounded-full object-cover" />
          <span className="font-display">
            Borja <span className="italic">Hernández</span>
          </span>
        </div>
        <div className="text-center text-xs text-muted-foreground md:text-right">
          © {new Date().getFullYear()} Peluquería Barbería Borja Hernández · {ADDRESS}
        </div>
      </div>
    </footer>
  );
}

function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background shadow-2xl transition-transform hover:scale-110"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
