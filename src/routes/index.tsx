import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-barber.jpg";
import interiorImg from "@/assets/interior.jpg";
import toolsImg from "@/assets/tools.jpg";
import cut1Img from "@/assets/cut1.jpg";
import beardImg from "@/assets/beard.jpg";
import cut2Img from "@/assets/cut2.jpg";
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
      { property: "og:image", content: heroImg },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BarberShop",
          name: "Peluquería Barbería Borja Hernández",
          image: heroImg,
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
      <Gallery />
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
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2">
          <Scissors className="h-5 w-5 text-gold" />
          <span className="font-display text-lg tracking-tight">
            Borja <span className="text-gold-gradient">Hernández</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#servicios" className="hover:text-gold transition-colors">Servicios</a>
          <a href="#galeria" className="hover:text-gold transition-colors">Galería</a>
          <a href="#opiniones" className="hover:text-gold transition-colors">Opiniones</a>
          <a href="#contacto" className="hover:text-gold transition-colors">Contacto</a>
        </nav>
        <a
          href={`tel:+34${PHONE}`}
          className="rounded-full bg-gold-gradient px-5 py-2 text-sm font-medium text-primary-foreground shadow-gold transition-transform hover:scale-105"
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
      <img
        src={heroImg}
        alt="Barbero realizando un corte profesional"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        width={1920}
        height={1280}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 text-center animate-fade-up">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-background/40 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-gold backdrop-blur">
          <Sparkles className="h-3 w-3" /> Sant Vicent del Raspeig
        </div>
        <h1 className="font-display text-5xl font-medium leading-[1.05] sm:text-6xl md:text-7xl lg:text-8xl">
          Tu imagen merece
          <br />
          <span className="text-gold-gradient italic">el mejor corte</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Profesionalidad, estilo y atención personalizada. Más de 100 clientes nos avalan
          con una valoración media de 4,7 estrellas.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={`tel:+34${PHONE}`}
            className="group inline-flex items-center gap-2 rounded-full bg-gold-gradient px-7 py-3.5 font-medium text-primary-foreground shadow-gold transition-transform hover:scale-105"
          >
            <Calendar className="h-4 w-4" /> Reservar cita
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href={`tel:+34${PHONE}`}
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-7 py-3.5 font-medium text-foreground transition-colors hover:bg-gold/10"
          >
            <Phone className="h-4 w-4" /> Llamar ahora
          </a>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-sm">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-4 w-4 fill-gold text-gold" />
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
    <section className="border-y border-border/40 bg-card/30">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-10 md:grid-cols-4">
        {items.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-3xl text-gold-gradient md:text-4xl">{s.value}</div>
            <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
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
        <div className="relative">
          <img
            src={interiorImg}
            alt="Interior de la barbería Borja Hernández"
            loading="lazy"
            width={1280}
            height={960}
            className="rounded-lg object-cover shadow-deep"
          />
          <div className="absolute -bottom-6 -right-6 hidden h-32 w-32 rounded-lg bg-gold-gradient shadow-gold md:block" />
        </div>
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-gold">Sobre nosotros</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">
            Pasión por la barbería <span className="italic text-gold-gradient">y el detalle</span>
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
              <div key={t} className="flex items-center gap-3 rounded-lg border border-border/60 bg-card/40 p-4">
                <Icon className="h-5 w-5 text-gold" />
                <span className="text-sm">{t}</span>
              </div>
            ))}
          </div>
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
    <section id="servicios" className="bg-card/30 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-gold">Servicios</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">
            Cada detalle, <span className="italic text-gold-gradient">cuidado</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Servicios pensados para el hombre que quiere lo mejor.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.name}
              className="group relative overflow-hidden rounded-xl border border-border/60 bg-background p-8 transition-all hover:border-gold/50 hover:shadow-gold"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gold/10 text-gold transition-colors group-hover:bg-gold-gradient group-hover:text-primary-foreground">
                <Scissors className="h-5 w-5" />
              </div>
              <h3 className="font-display text-2xl">{s.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              <div className="mt-6 flex items-end justify-between border-t border-border/60 pt-4">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Desde</span>
                <span className="font-display text-2xl text-gold-gradient">{s.price}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const imgs = [
    { src: cut1Img, alt: "Corte fade con barba" },
    { src: beardImg, alt: "Arreglo de barba con navaja" },
    { src: interiorImg, alt: "Interior de la barbería" },
    { src: toolsImg, alt: "Herramientas de barbero" },
    { src: cut2Img, alt: "Estilo clásico moderno" },
    { src: heroImg, alt: "Sesión de barbería profesional" },
  ];
  return (
    <section id="galeria" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-gold">Galería</span>
        <h2 className="mt-4 font-display text-4xl md:text-5xl">
          Nuestro <span className="italic text-gold-gradient">trabajo</span>
        </h2>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {imgs.map((img, i) => (
          <div
            key={i}
            className={`group relative overflow-hidden rounded-lg ${i === 0 ? "row-span-2 col-span-2 md:col-span-1" : ""}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        ))}
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
    <section className="relative overflow-hidden bg-card/30 py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(0.78_0.13_82/0.08),transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-gold">¿Por qué elegirnos?</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">
            La diferencia está <span className="italic text-gold-gradient">en el detalle</span>
          </h2>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {items.map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-xl border border-border/60 bg-background p-6">
              <Icon className="h-6 w-6 text-gold" />
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
    <section id="opiniones" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-gold">Opiniones</span>
        <h2 className="mt-4 font-display text-4xl md:text-5xl">
          Lo que dicen <span className="italic text-gold-gradient">nuestros clientes</span>
        </h2>
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-5 w-5 fill-gold text-gold" />
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
            className="rounded-xl border border-border/60 bg-card p-8"
          >
            <div className="mb-4 flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </div>
            <blockquote className="font-display text-lg italic leading-relaxed">
              "{r.t}"
            </blockquote>
            <figcaption className="mt-6 text-sm text-muted-foreground">— {r.a}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contacto" className="bg-card/30 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-gold">Contacto</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">
            Visítanos en <span className="italic text-gold-gradient">Sant Vicent</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Te esperamos en el centro de Sant Vicent del Raspeig.
          </p>

          <div className="mt-8 space-y-5">
            <a href={`tel:+34${PHONE}`} className="flex items-start gap-4 group">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gold/10 text-gold group-hover:bg-gold-gradient group-hover:text-primary-foreground transition">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Teléfono</div>
                <div className="font-display text-xl">{PHONE_DISPLAY}</div>
              </div>
            </a>
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gold/10 text-gold">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Dirección</div>
                <div className="text-base">{ADDRESS}</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gold/10 text-gold">
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
              className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-6 py-3 text-sm font-medium text-primary-foreground shadow-gold"
            >
              <Phone className="h-4 w-4" /> Llamar
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-6 py-3 text-sm font-medium hover:bg-gold/10"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border/60 shadow-deep">
          <iframe
            title="Mapa Peluquería Barbería Borja Hernández"
            src="https://www.google.com/maps?q=Calle+Campoamor+Sant+Vicent+del+Raspeig+Alicante&output=embed"
            width="100%"
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="min-h-[420px] w-full grayscale-[40%] contrast-110"
          />
        </div>
      </div>
    </section>
  );
}

function CTAFinal() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.78_0.13_82/0.15),transparent_70%)]" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-4xl md:text-6xl">
          Reserva tu cita y <span className="italic text-gold-gradient">renueva tu estilo</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
          Te esperamos para ofrecerte una experiencia de barbería profesional con resultados
          que marcan la diferencia.
        </p>
        <a
          href={`tel:+34${PHONE}`}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-gold-gradient px-8 py-4 font-medium text-primary-foreground shadow-gold transition-transform hover:scale-105"
        >
          <Calendar className="h-4 w-4" /> Reservar ahora
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex items-center gap-2">
          <Scissors className="h-4 w-4 text-gold" />
          <span className="font-display">
            Borja <span className="text-gold-gradient">Hernández</span>
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
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-transform hover:scale-110"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
