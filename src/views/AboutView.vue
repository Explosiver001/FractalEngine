<script setup lang="ts"></script>

<template>
  <div class="h-full w-full flex justify-center items-center">
    <div class="h-full w-4/5 py-8">
      <div class="w-full h-full p-6 text-white leading-relaxed space-y-6">
        <h1
          class="text-3xl font-bold tracking-wide bg-gradient-to-r from-teal-300 to-purple-400 bg-clip-text text-transparent drop-shadow-sm"
        >
          Fractal Engine
        </h1>

        <p class="text-gray-300">
          <strong>Fractal Engine</strong> je interaktivní experimentální
          aplikace pro generování fraktálů v reálném čase.
        </p>

        <!-- Escape-Time Renderer -->
        <section class="space-y-3">
          <h2 class="text-xl font-semibold text-teal-300">
            Escape-time WebGL renderer
          </h2>

          <p class="text-gray-300">
            Modul pro výpočet fraktálů typu <em>Mandelbrot</em> a
            <em>Julia</em> využívá technologii <strong>WebGL</strong>, díky
            které je každý pixel zpracován paralelně přímo na GPU. Shader
            provádí iterace komplexní rovnice:
          </p>

          <div
            class="bg-black/40 px-4 py-2 rounded-lg border border-white/10 text-center"
          >
            <math display="inline">
              <mi>z</mi>
              <mo>→</mo>
              <msup>
                <mi>z</mi>
                <mi>k</mi>
              </msup>
              <mo>+</mo>
              <mi>c</mi>
            </math>
          </div>

          <p class="text-gray-300">
            Díky tomu lze renderovat obraz s vysokým rozlišením a velkým počtem
            iterací v reálném čase.
          </p>

          <!-- Nastavení Escape rendereru -->
          <h3 class="text-lg font-semibold text-teal-200">Nastavení</h3>

          <ul class="list-disc list-inside text-gray-300 space-y-1">
            <li>
              <strong>Typ</strong> - výběr mezi klasickou Mandelbrotovou
              množinou (bod je klidový) a Julia množinou (bod je počáteční
              hodnota).
            </li>
            <li>
              <strong>Iterace</strong> - maximální počet kroků, které shader
              provede, než rozhodne, zda bod uniká. Vyšší hodnota = detailnější
              obraz.
            </li>
            <li>
              <strong>Exponent <code>k</code></strong> - obecná podoba fraktálu,
              např. <code>k = 2</code> dává klasiku, vyšší hodnoty vytvářejí
              “vícevrstvé” rotační motivy.
            </li>
            <li>
              <strong>Globální zoom</strong> - měřítko celého pohledu. Kolečko
              myši zoomuje kolem kurzoru, slider mění globální hodnotu měřítka.
            </li>
            <li>
              <strong>Julia konstanta <code>c</code></strong> - komplexní číslo,
              které určuje tvar Julia množiny. Malé změny často radikálně mění
              strukturu.
            </li>
            <li>
              <strong>Barevná paleta</strong> - tři různé mapy pro převod počtu
              iterací na barvu (classic / fire / pastel).
            </li>
            <li>
              <strong>Vrstevnice</strong> - volitelné zvýraznění hranic pomocí
              iterací modulo N. Dodává fraktálu strukturu a jasnější kontury.
            </li>
            <li>
              <strong>Interval vrstevnic</strong> - určuje každou kolikátou
              iteraci se vykreslí čára.
            </li>
          </ul>

          <p class="text-gray-300">
            Posun a zoom nad komplexní rovinou je zajištěn čistě na úrovni
            shaderu, takže obraz zůstává dokonale ostrý i při extrémním
            přiblížení.
          </p>
        </section>

        <!-- Strange Attractors -->
        <section class="space-y-3">
          <h2 class="text-xl font-semibold text-purple-300">
            Chaotické attractory (variace Petera de Jonga)
          </h2>

          <p class="text-gray-300">
            Druhý renderer simuluje několik chaotických systémů – nejen klasický
            Peter de Jongův atraktor, ale i další trigonometrické varianty –
            popsaných rovnicemi:
          </p>

          <div class="bg-black/40 px-4 py-2 rounded-lg border border-white/10">
            <math display="block">
              <mrow>
                <msub
                  ><mi>x</mi><mrow><mi>n</mi><mo>+</mo><mn>1</mn></mrow></msub
                >
                <mo>=</mo>
                <mi>sin</mi>
                <mo>(</mo><mi>a</mi><mo>·</mo><msub><mi>y</mi><mi>n</mi></msub
                ><mo>)</mo>
                <mo>−</mo>
                <mi>cos</mi>
                <mo>(</mo><mi>b</mi><mo>·</mo><msub><mi>x</mi><mi>n</mi></msub
                ><mo>)</mo>
              </mrow>
            </math>
            <math display="block">
              <mrow>
                <msub
                  ><mi>y</mi><mrow><mi>n</mi><mo>+</mo><mn>1</mn></mrow></msub
                >
                <mo>=</mo>
                <mi>sin</mi>
                <mo>(</mo><mi>c</mi><mo>·</mo><msub><mi>x</mi><mi>n</mi></msub
                ><mo>)</mo>
                <mo>−</mo>
                <mi>cos</mi>
                <mo>(</mo><mi>d</mi><mo>·</mo><msub><mi>y</mi><mi>n</mi></msub
                ><mo>)</mo>
              </mrow>
            </math>
          </div>

          <p class="text-gray-300">
            I přes svou jednoduchost generují tyto rovnice nečekaně bohaté,
            chaotické a často vizuálně velmi estetické struktury. Výsledný obraz
            je tvořen hustotou průchodů orbit systému.
          </p>

          <!-- Nastavení attractoru -->
          <h3 class="text-lg font-semibold text-purple-200">Nastavení</h3>

          <ul class="list-disc list-inside text-gray-300 space-y-1">
            <li>
              <strong>Typ attractoru</strong> - k dispozici je několik variant
              (sinusové, kosinusové i smíšené mapy), které mění charakter
              vykreslených oblaků.
            </li>
            <li>
              <strong
                >Parametry <code>a</code>, <code>b</code>, <code>c</code>,
                <code>d</code></strong
              >
              - určují chování dynamické rovnice. Malé změny mají často
              dramatický efekt na výsledný obraz.
            </li>
            <li>
              <strong>Iterace</strong> - počet bodů, které systém vygeneruje.
              Vyšší počet vede k hustším a jemnějším strukturám.
            </li>
            <li>
              <strong>Gamma</strong> - nelineární korekce jasu, která zvýrazňuje
              světlé nebo tmavé části a pomáhá zobrazit jemné nuance.
            </li>
            <li>
              <strong>Brightness</strong> - síla transformace hustoty. Vyšší
              hodnoty dělají světlejší obraz, nižší zvýrazňují jemné detaily.
            </li>
            <li>
              <strong>Randomizace parametrů</strong> - jedním kliknutím
              vygeneruje zcela nový atraktor, často s překvapivými výsledky.
            </li>
          </ul>

          <p class="text-gray-300">
            Renderer používá histogramový přístup: každé zobrazení bodu zvýší
            počet v daném pixelu. Výsledný histogram je poté převeden na barvy s
            využitím gamma korekce. Díky tomu vznikají hladké přechody a výrazné
            hustotní struktury.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>
