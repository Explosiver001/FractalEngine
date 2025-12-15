# Fractal Engine

Fractal Engine je webová aplikace prohlížeče pro vykreslování Mandelbrotových/Julia fraktálů a chaotických atraktorů pomocí GPU.

## Funkce
- Prohlížeč Mandelbrot/Julia s nastavitelnými iteracemi, exponentem, vlastním barevným přechodem a obrysovými liniemi.
- Renderer chaotických atraktorů s upravitelnými parametry `a/b/c/d`, jasem a gammou a možností náhodné volby.
- Plynulé posouvání a přibližování díky shaderům WebGL.

## Začínáme
1. Nainstalujte závislosti:
   ```sh
   npm install
   ```
2. Spusťte vývojový server:
   ```sh
   npm run dev
   ```
3. Otevřete adresu vypsanou v terminálu (obvykle `http://localhost:5173`).

- Vyberte **Mandelbrot/Julia** pro prozkoumání fraktálů. Kolečkem myši přibližujte, tažením posouvejte a pomocí ovládacích prvků měňte počet iterací, exponent, barvy přechodu a obrysy.
- Vyberte **Attractor** pro generování chaotických obrazců. Upravte parametry `a/b/c/d`, jas, gammu i vlastní barevný přechod nebo klikněte na náhodný výběr a objevujte nové tvary.
- Jakmile najdete zajímavý pohled, uložte si obrázek přímo z prohlížeče.

## Stav projektu
Vzniklo jako součást kurzu VIN (2025/2026) s cílem zpřístupnit interaktivní matematické vizualizace v prohlížeči.
