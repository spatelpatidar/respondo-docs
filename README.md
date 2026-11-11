# Respondo docs

Static documentation site for `respondo`, `respondo-graphql` and `respondo-grpc`.
No build step: one HTML file per page (`index.html`, `respondo.html`, `respondo-graphql.html`, `respondo-grpc.html`, `compare.html`) plus shared `styles.css` and `shell.js`.

Preview locally: `python3 -m http.server 8000` then open http://localhost:8000

Deploy: push to a repo (e.g. `respondo-docs`), set Settings → Pages → Source to "GitHub Actions".
The included workflow publishes it on every push to `main`.
