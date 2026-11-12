# Respondo Docs

Documentation site for the three Respondo Ruby gems:

| Gem | What it does | Page |
|---|---|---|
| [`respondo`](https://github.com/spatelpatidar/respondo) | Consistent JSON API responses for Rails | `respondo.html` |
| [`respondo-graphql`](https://github.com/spatelpatidar/respondo-graphql) | GraphQL-spec responses for Rails controllers | `respondo-graphql.html` |
| [`respondo-grpc`](https://github.com/spatelpatidar/respondo-grpc) | Response envelopes and status codes for gRPC services | `respondo-grpc.html` |

It is a plain static site: **HTML, CSS and vanilla JavaScript. There is no build step, no framework and no dependencies.** Open it in a browser, or host the folder anywhere.

## Pages

| File | Content |
|---|---|
| `index.html` | Overview, install options and how the three gems relate |
| `respondo.html` | Docs for `respondo` (JSON) |
| `respondo-graphql.html` | Docs for `respondo-graphql` |
| `respondo-grpc.html` | Docs for `respondo-grpc` |
| `compare.html` | "Which gem do I need?" comparison |
| `404.html` | Page shown for any unknown URL |

Each gem has its own file, so fixing one gem's docs never touches another's.

## Features

- Responsive layout. A permanent sidebar on laptops (1024px and up), a hamburger drawer on tablets, foldables and phones.
- Floating glass header with a centered gem navigation.
- Light and dark theme. The choice is saved in the browser and applied before first paint, so there is no flash. The theme button icon shows the current theme on its left half and the next theme on its right half.
- Search across all pages (press `/` or `Ctrl/Cmd + K`).
- "On this page" outline that follows your scroll, plus a copy-link button on every heading.
- Code blocks with syntax highlighting and a copy button, and tabbed examples.
- Toast messages for code copy, section-link copy and theme switch.
- Scroll animations. Everything switches off for visitors who have "reduce motion" turned on.
- A 404 page with a "did you mean…?" suggestion for close typos.

## Project structure

```
.
├── index.html, respondo.html, respondo-graphql.html,
│   respondo-grpc.html, compare.html      one page of content each
├── 404.html                              not-found page
├── shell.js                              shared header, sidebar, search, toasts, theme
├── styles.css                            all styling, light and dark tokens
├── favicon.svg, logo.svg                 brand mark (logo.svg includes the protocol labels)
└── .github/workflows/pages.yml           publishes the site to GitHub Pages
```

Every page file holds only its own content, inside one `<article>`. `shell.js` builds the header, sidebar, "on this page" outline, footer and search around that article when the page loads, so the navigation is defined in one place.

## Run it locally

Serve the folder over HTTP. Pick one:

```bash
npx serve .                     # recommended: also shows 404.html for wrong URLs
python3 -m http.server 8000     # simple, but wrong URLs get Python's own error page
```

Then open the address it prints (for example http://localhost:3000 or http://localhost:8000).

- **VS Code Live Server** works for everything except the 404 page. It shows its own `Cannot GET /path` message for unknown URLs. That is a limit of Live Server, not a bug in the site. GitHub Pages serves `404.html` correctly, and so does `npx serve`. To look at the 404 page in Live Server, open `/404.html` directly.
- Opening the files straight from disk (`file://`) mostly works, but search can only look through the current page, because browsers block loading the other pages that way.

## Deploy to GitHub Pages

GitHub Pages hosts the site as plain static files. The workflow in `.github/workflows/pages.yml` publishes them:

1. Push this repo to GitHub.
2. Go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main`. It also runs from the **Actions** tab ("Run workflow").

What the workflow does:

1. **Checks** that `index.html`, `404.html`, `styles.css` and `shell.js` exist, and fails the run with a clear error if one is missing.
2. **Collects every tracked file** except the repo files (`.github/`, `README.md`, `LICENSE*`, `*.patch`, `.gitignore`).
3. **Publishes** the result and prints the list of published files in the run log.

There is no file list to maintain. Add a new page, an image, `robots.txt` or `sitemap.xml` to the repo, and it is deployed on the next push to `main`. Only files tracked by git are published, so remember to `git add` new files.

GitHub Pages automatically serves `404.html` for unknown URLs. The 404 page sets its own `<base>` so its CSS and scripts load even from a deep missing path such as `/respondo-docs/a/b/c`. On a custom domain or localhost it uses `/` as the base.

Prefer no workflow at all? Because the site is plain HTML, you can also set **Settings → Pages → Source** to **Deploy from a branch** (`main`, `/ (root)`) and delete `pages.yml`. The only difference is that it would also publish `README.md` and other repo files.

## Editing the docs

### Change content

Open the gem's page and edit the HTML inside `<article class="page active">`. Useful building blocks, all copied from the existing pages:

````html
<h2 id="install">Install</h2>                      <!-- ids become anchors, search results and outline entries -->

<div class="code"><pre data-lang="ruby">render_ok(data: user)</pre></div>
<!-- data-lang: ruby | json | bash | proto. Escape < as &lt; and & as &amp; inside code. -->

<div class="tabs" data-tabs>                       <!-- tabs: one button per .tab-panel, in order -->
  <div class="tab-list" role="tablist"><button role="tab">One</button><button role="tab">Two</button></div>
  <div class="tab-panel">…</div>
  <div class="tab-panel" hidden>…</div>
</div>

<div class="callout">…</div>                       <!-- also: callout warn, callout note -->
<div class="tbl"><table>…</table></div>            <!-- scrolls sideways on small screens -->
<details><summary>Title</summary>…</details>
````

### Update for a new gem release

1. Edit the version pill in the page's `<h1>` (for example `JSON · v2.2.0`).
2. Update the changed sections: config options, helpers, response shape.
3. Check the defaults against the gem's source rather than its README examples.

### Add a new page

1. Copy an existing page file and change the content. Set `data-page` to a new key and `data-repo` to the gem's repo name, or leave `data-repo=""` for a general page.
2. Add the page to the `PAGES` array in `shell.js`. This also feeds the sidebar and search.
3. For a link in the top navigation, add its key to the list near the top of the header markup in `shell.js`.

`data-repo` controls the footer. On a gem page it links to that gem's GitHub, RubyGems page and issues. On the overview and compare pages it shows the general footer.

### Colors and styling

Colors are CSS variables at the top of `styles.css`, defined for light and dark theme.

| Token | Light | Dark |
|---|---|---|
| `--json` (respondo) | `#c2410c` | `#fb923c` |
| `--gql` (respondo-graphql) | `#be185d` | `#f472b6` |
| `--grpc` (respondo-grpc) | `#0f766e` | `#2dd4bf` |

### Show a toast from your own code

```js
respondoToast("Saved");                       // success (green check)
respondoToast("Heads up", "info");            // info (accent color)
respondoToast("Something failed", "error");   // error (red)
respondoToast("Stays longer", "success", 4000); // optional duration in ms
```

## Notes

- Search loads the other pages the first time it is opened, so it needs the site served over HTTP (GitHub Pages, `npx serve` and Live Server are all fine).
- Fonts (Inter and JetBrains Mono) load from Google Fonts. Without them the site falls back to the system fonts.
- The header entrance animation plays once per browser session, so moving between pages stays calm.