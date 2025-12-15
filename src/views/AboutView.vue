<script setup lang="ts"></script>

<template>
  <div class="min-h-full w-full flex justify-center items-start">
    <div class="w-4/5 py-10">
      <div class="p-6 text-white leading-relaxed space-y-8">
        <header class="space-y-3">
          <h1
            class="text-3xl font-bold tracking-wide bg-gradient-to-r from-teal-300 to-purple-400 bg-clip-text text-transparent"
          >
            Fractal Engine
          </h1>
          <p class="text-gray-300">
            Fractal Engine je malá webová aplikace pro prozkoumávání Mandelbrotových/Julia fraktálů a
            jednoduchých chaotických atraktorů. Vše běží ve vašem prohlížeči přes WebGL, takže obraz zůstává
            ostrý i při hlubokém přiblížení nebo při generování nových vzorů.
          </p>
        </header>

        <section class="space-y-3">
          <h2 class="text-xl font-semibold text-teal-300">Co umí</h2>
          <ul class="list-disc list-inside text-gray-300 space-y-1">
            <li>Renderování Mandelbrot/Julia s nastavitelnými iteracemi, exponentem <code>k</code>, vlastním barevným přechodem a obrysovými liniemi.</li>
            <li>Render chaotických atraktorů s ovladatelnými parametry <code>a</code>/<code>b</code>/<code>c</code>/<code>d</code>, jasem, gammou a vlastními barvami.</li>
            <li>Vykreslování přes GPU pro plynulé posouvání a přibližování ve vysokém rozlišení.</li>
          </ul>
        </section>

        <section class="space-y-3">
          <h2 class="text-xl font-semibold text-purple-300">Jak to funguje</h2>
          <p class="text-gray-300">
            Fraktály se počítají přímo v prohlížeči pomocí WebGL shaderů. Každý pixel plátna je iterativně vyhodnocen
            podle zvoleného vzorce (Mandelbrot, Julia nebo atraktor) a zbarven podle počtu iterací. Úprava parametrů
            okamžitě změní výsledek, takže můžete plynule hledat nové tvary bez čekání na server.
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-xl font-semibold text-purple-300">Jak používat</h2>
          <ol class="list-decimal list-inside text-gray-300 space-y-2">
            <li>V navigaci otevřete stránku Mandelbrot/Julia nebo Attractor.</li>
            <li>Pomocí posuvníků a vstupů upravte iterace, exponent a barvy přechodu pro Mandelbrot/Julia nebo parametry atraktoru.</li>
            <li>Vyberte dvě barvy v ovladačích Mandelbrot/Julia (začátek/konec), aby se vytvořil vlastní přechod místo předvolených palet, a podobně dvě barvy pro atraktory.</li>
            <li>U fraktálů přibližujte kolečkem a tažením myši posouvejte pro detailní průzkum.</li>
            <li>Kliknutím na náhodný výběr vygenerujte nové nastavení atraktoru.</li>
            <li>Nalezený záběr si uložíte tak, že na plátno kliknete pravým tlačítkem a zvolíte „Uložit obrázek jako…“.</li>
          </ol>
        </section>
      </div>
    </div>
  </div>
</template>
