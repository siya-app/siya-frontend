
### 📊 Analisis performance metrics Siya App.

* **TTFB: 67 ms**

  🔥 Molt bo. El servidor respon rapidíssim perque estic en local. En producció amb CDN, un bon TTFB acostuma a ser < 800 ms.
* **LCP: 3100 ms (3,1 s)**

  ⚠️Està per sobre del llindar de **2,5 s** que Google considera “bo”. Això vol dir que el contingut principal (segurament la portada amb la imatge o alguna targeta gran) triga massa a aparèixer.
* **CLS: 0.326**

  ❌ Això és dolent (hauria d’estar per sota de  **0.1** ). Vol dir que la pàgina fa **saltets visuals** (layout shifts). Pot ser perquè:

  * Tens imatges sense atributs `width` i `height`.
  * Hi ha fonts que carreguen tard i fan moure el text.
  * Hi ha elements que apareixen després (ads, sliders, menús sticky...).

---

### ✅ Què pots fer

**Per millorar LCP (3.1 s):**

* Optimitza i **compressa imatges** grans (usa formats com WebP/AVIF).
* Si tens una imatge hero a la portada, assegura’t que:

  <pre class="overflow-visible!" data-start="1097" data-end="1186"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-html"><span><span><img</span><span></span><span>src</span><span>=</span><span>"..."</span><span></span><span>alt</span><span>=</span><span>"..."</span><span></span><span>width</span><span>=</span><span>"600"</span><span></span><span>height</span><span>=</span><span>"400"</span><span></span><span>fetchpriority</span><span>=</span><span>"high"</span><span> />
  </span></span></code></div></div></pre>

  (`fetchpriority="high"` ajuda molt).
* Utilitza `loading="lazy"` només per imatges que no es vegin de seguida.
* Assegura’t que el component que pinta el contingut principal no depengui d’una crida massa lenta (p. ex. si l’LCP és una imatge de Supabase i trigues a recuperar-la).

**Per reduir CLS (0.326):**

* Sempre especifica `width` i `height` a les imatges o fes servir `aspect-ratio` amb Tailwind. Exemple:
  <pre class="overflow-visible!" data-start="1610" data-end="1725"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-tsx"><span><span><img
    src=</span><span>"/terrace.jpg"</span><span>
    alt=</span><span>"Terrace"</span><span>
    className=</span><span>"w-full aspect-[16/9] object-cover"</span><span>
  />
  </span></span></code></div></div></pre>
* Reserva espai per a banners, sliders i components que apareixen després.
* Si uses fonts externes (Google Fonts), afegeix `font-display: swap` o carrega-les localment per evitar que el text salti.
* Si tens animacions o sliders, revisa que no estiguin movent elements inesperadament.

---

### 📝 Taula resum

| Mètrica       | Bo ✅    | Millorable ⚠️ | Pobre ❌  |
| -------------- | -------- | --------------- | --------- |
| **TTFB** | < 800 ms | 800–1800 ms    | > 1800 ms |
| **LCP**  | < 2.5 s  | 2.5–4.0 s      | > 4.0 s   |
| **CLS**  | < 0.1    | 0.1–0.25       | > 0.25    |
| **INP**  | < 200 ms | 200–500 ms     | > 500 ms  |
