# King Machines - Website

Strona internetowa firmy King Machines zbudowana z Astro 5, Tailwind CSS 4 i WordPress jako Headless CMS.

## 🚀 Struktura Projektu

```
/
├── public/
│   ├── favicon.svg
│   └── images/           # Obrazy statyczne
├── src/
│   ├── assets/           # Assety importowane w komponentach
│   ├── components/
│   │   ├── ui/           # Podstawowe komponenty UI (Button, Card, Input, etc.)
│   │   ├── layout/       # Komponenty layoutu (Header, Footer, Navigation)
│   │   ├── sections/     # Sekcje stron (Hero, CTA, Features, etc.)
│   │   ├── forms/        # Formularze (ContactForm, SearchForm)
│   │   ├── machines/     # Komponenty specyficzne dla maszyn
│   │   ├── knowledge/    # Komponenty bazy wiedzy
│   │   └── common/       # Wspólne komponenty (Pagination, etc.)
│   ├── layouts/
│   │   └── Layout.astro  # Główny layout z SEO, nawigacją, footerem
│   ├── lib/
│   │   ├── wp.ts         # Integracja z WordPress REST API
│   │   └── mockData.ts   # Mockowe dane do rozwoju
│   ├── pages/
│   │   ├── index.astro              # Strona Główna
│   │   ├── o-nas.astro              # O nas
│   │   ├── baza-wiedzy.astro        # Baza Wiedzy
│   │   ├── maszyny.astro            # Lista maszyn
│   │   ├── maszyny/[slug].astro     # Szczegóły maszyny (tworzone na Linux/macOS)
│   │   ├── kontakt.astro            # Kontakt
│   │   └── api/
│   │       └── contact.ts           # API endpoint formularza
│   ├── styles/
│   │   └── global.css    # Style globalne + Tailwind
│   └── types/
│       └── wp.ts         # TypeScript typy dla WordPress
├── .env.example          # Przykład konfiguracji WordPress
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## 📄 Strony

| Strona | URL | Opis |
|--------|-----|------|
| Strona Główna | `/` | Hero, polecane maszyny, CTA |
| O nas | `/o-nas` | Historia, misja, wartości, zespół |
| Baza Wiedzy | `/baza-wiedzy` | Kategoria, wyszukiwanie, najnowsze artykuły |
| Maszyny | `/maszyny` | Lista z filtrami, paginacją |
| Szczegóły maszyny | `/maszyny/[slug]` | Galeria, specyfikacja, opis, podobne |
| Kontakt | `/kontakt` | Formularz, dane kontaktowe, mapa, FAQ |

> ⚠️ **Uwaga dla użytkowników Windows:** Dynamiczna trasa `src/pages/maszyny/[slug].astro` nie kompiluje się poprawnie na Windows z powodu problemu z nawiasami kwadratowymi w nazwie pliku. Aby ją utworzyć, utwórz plik na systemie Linux/macOS lub w WSL, a następnie skopiuj do projektu. Plik powinien zawierać `getStaticPaths()` generujący ścieżki z `mockMachines` oraz komponenty `MachineHero`, `MachineGallery`, `MachineSpecs`, `MachineDescription`, `RelatedMachines`, `ContactForm`.

## ⚙️ Konfiguracja WordPress (Headless CMS)

### 1. Wymagane wtyczki WordPress
- **ACF (Advanced Custom Fields)** - dla pól niestandardowych maszyn
- **ACF to REST API** - udostępnianie pól ACF w REST API
- **Custom Post Type UI** - tworzenie typu posta `machines`

### 2. Typ posta `machines` (Custom Post Type)
Pola ACF do dodania:
- `category` (Select) - kategoria maszyny
- `price` (Number) - cena
- `short_description` (Textarea) - krótki opis
- `specifications` (Repeater/Group) - specyfikacja techniczna (klucz: wartość)
- `images` (Gallery) - zdjęcia maszyny
- `featured_image` (Image) - zdjęcie główne (lub użyj wbudowanego)

### 3. Konfiguracja środowiska
Skopiuj `.env.example` do `.env` i uzupełnij:

```env
WP_URL=https://twoja-strona-wordpress.com
WP_USERNAME=twoj_login
WP_APP_PASSWORD=twoje_haslo_aplikacji
```

Hasło aplikacji generuj w: WP Admin → Użytkownicy → Twój profil → Hasła aplikacji

### 4. Endpointy API używane
- `GET /wp-json/wp/v2/machines` - lista maszyn
- `GET /wp-json/wp/v2/machines?slug={slug}` - pojedyncza maszyna
- `GET /wp-json/wp/v2/posts` - artykuły bazy wiedzy
- `GET /wp-json/wp/v2/posts?slug={slug}` - pojedynczy artykuł

## 🛠️ Komendy

```bash
# Instalacja zależności
npm install

# Serwer deweloperski (background mode)
npm run dev

# Budowanie produkcyjne
npm run build

# Podgląd budowania
npm run preview

# Linting
npm run lint

# Formatowanie kodu
npm run format
```

## 🎨 Technologie

- **Astro 5** - Framework dla szybkich stron statycznych
- **Tailwind CSS 4** - Utility-first CSS
- **TypeScript** - Typowanie statyczne
- **WordPress REST API** - Headless CMS
- **ESLint + Prettier** - Jakość kodu

## 📦 Deployment

### Static Hosting (Netlify, Vercel, Cloudflare Pages)
```bash
npm run build
# Wypchnij folder dist/
```

### Node.js Server (Railway, Render, VPS)
```bash
# Astro 5 wspiera SSR - ustaw w astro.config.mjs:
# output: 'server'
```

## 🔧 Rozszerzanie

### Dodawanie nowych komponentów
1. Utwórz plik w odpowiednim folderze `src/components/`
2. Użyj TypeScript interfaces dla props
3. Styluj z Tailwind CSS

### Dodawanie nowej strony
1. Utwórz plik w `src/pages/`
2. Użyj `Layout` jako wrapper
3. Importuj potrzebne komponenty

### Nowe typy treści z WordPress
1. Rozszerz `src/types/wp.ts`
2. Dodaj funkcje w `src/lib/wp.ts`
3. Utwórz komponenty wyświetlające

## 📝 Licencja

Wszelkie prawa zastrzeżone © King Machines