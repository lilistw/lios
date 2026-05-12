/* global React, ReactDOM, TweaksPanel, TweakSection, TweakRadio, TweakToggle, useTweaks */
const { useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "brandHue": 295,
  "showGrid": true,
  "density": "comfy"
}/*EDITMODE-END*/;

const HUE_OPTIONS = [
  { value: 270, label: "violet" },
  { value: 295, label: "purple" },
  { value: 255, label: "indigo" },
];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply tweaks live by updating CSS custom properties
  useEffect(() => {
    const r = document.documentElement.style;
    const h = t.brandHue;
    r.setProperty("--brand-50",  `oklch(97.5% 0.018 ${h})`);
    r.setProperty("--brand-100", `oklch(94.5% 0.035 ${h})`);
    r.setProperty("--brand-200", `oklch(88.5% 0.075 ${h})`);
    r.setProperty("--brand-300", `oklch(78.5% 0.135 ${h})`);
    r.setProperty("--brand-400", `oklch(66.5% 0.195 ${h})`);
    r.setProperty("--brand-500", `oklch(55.0% 0.220 ${h})`);
    r.setProperty("--brand-600", `oklch(48.5% 0.210 ${h})`);
    r.setProperty("--brand-700", `oklch(41.0% 0.180 ${h})`);

    if (t.density === "compact")      r.setProperty("--section-y", "clamp(3.5rem, 7vw, 6rem)");
    else if (t.density === "airy")    r.setProperty("--section-y", "clamp(6.5rem, 13vw, 11rem)");
    else                              r.setProperty("--section-y", "clamp(5rem, 10vw, 8.5rem)");

    document.querySelectorAll(".grid-bg").forEach((el) => {
      el.style.display = t.showGrid ? "" : "none";
    });
  }, [t]);

  // Scroll-triggered reveals
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          if (e.target.tagName === "SECTION") e.target.classList.add("in-view");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll("section, .reveal, .reveal-stagger").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Smart anchor scroll — center the section vertically if it fits,
  // otherwise align to the top (under the sticky header).
  useEffect(() => {
    const HEADER = 120;
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();

      const vh = window.innerHeight;
      const rect = target.getBoundingClientRect();
      const targetTop = window.scrollY + rect.top;
      const h = rect.height;
      const available = vh - HEADER;
      let dest;
      if (h <= available) {
        // Center vertically in the visible area below the header
        dest = targetTop - HEADER - (available - h) / 2;
      } else {
        // Too tall — pin to the top, just under the sticky header
        dest = targetTop - HEADER - 16;
      }
      window.scrollTo({ top: Math.max(0, dest), behavior: "smooth" });
      history.replaceState(null, "", href);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <React.Fragment>
      <Header />
      <main>
        <Hero />
        <Services />
        <Approach />
        <Technologies />
        <Founder />
        <Blog />
        <Contact />
      </main>
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Brand">
          <TweakRadio
            label="Hue"
            options={HUE_OPTIONS}
            value={t.brandHue}
            onChange={(v) => setTweak("brandHue", v)}
          />
        </TweakSection>

        <TweakSection label="Layout">
          <TweakRadio
            label="Density"
            options={[
              { value: "compact", label: "compact" },
              { value: "comfy", label: "comfy" },
              { value: "airy", label: "airy" },
            ]}
            value={t.density}
            onChange={(v) => setTweak("density", v)}
          />
          <TweakToggle
            label="Grid backdrop"
            value={t.showGrid}
            onChange={(v) => setTweak("showGrid", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
