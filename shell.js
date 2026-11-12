/* Shared shell: header, sidebar, "on this page", footer, search, theme.
   Page content lives in each HTML file; edit a gem's docs only in its own file. */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var PAGES = [
    { key: "home", href: "index.html", title: "Overview" },
    { key: "compare", href: "compare.html", title: "Which gem do I need?" },
    { key: "respondo", href: "respondo.html", title: "respondo", color: "var(--json)" },
    { key: "graphql", href: "respondo-graphql.html", title: "respondo-graphql", color: "var(--gql)" },
    { key: "grpc", href: "respondo-grpc.html", title: "respondo-grpc", color: "var(--grpc)" }
  ];
  var current = document.body.dataset.page, repo = document.body.dataset.repo;
  var GH = '<svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.05-.49.05-.49.8.06 1.23.83 1.23.83.71 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>';

  /* ---------- build the shell around the page's <article> ---------- */
  var article = $("article.page");
  var nav = function (k) { return PAGES.filter(function (p) { return p.key === k; })[0]; };
  function link(p, extra) {
    return '<a href="' + p.href + '"' + (p.key === current ? ' class="active" aria-current="page"' : "") + ">" + (extra || "") + p.title + "</a>";
  }
  function dot(p) { return '<span class="dot" style="background:' + p.color + '"></span>'; }

  var SEARCH = '<svg class="ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>', MENU = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>', STAR = '<svg class="ico star" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z"/></svg>';
  var GHU = "https://github.com/spatelpatidar/", T = ' target="_blank" rel="noopener"';
  var footer = repo
    ? 'Respondo is open source. <a href="' + GHU + repo + '"' + T + '>GitHub</a> · <a href="https://rubygems.org/gems/' + repo + '"' + T + '>RubyGems</a> · Found a gap? Open an issue: <a href="' + GHU + repo + '/issues"' + T + '>' + repo + '</a>' +
      '<br>If <strong>' + repo + '</strong> is useful, give it a star ' + STAR + ' on <a href="' + GHU + repo + '"' + T + '>GitHub</a>.'
    : 'Respondo is open source. <a href="' + GHU.slice(0, -1) + '"' + T + '>GitHub</a> · <a href="https://rubygems.org/profiles/spatelpatidar"' + T + '>RubyGems</a>' +
      '<br>If Respondo is useful, give it a star ' + STAR + ' on <a href="' + GHU.slice(0, -1) + '"' + T + '>GitHub</a>.';

  var shell = document.createElement("div");
  shell.innerHTML =
    '<a class="skip" href="#main">Skip to content</a>' +
    '<header class="header"><div class="hdr-left">' +
      '<button class="icon-btn menu-btn" id="menuBtn" aria-label="Open navigation">' + MENU + '</button>' +
      '<a class="brand" href="index.html"><svg class="logo" viewBox="0 0 400 400" width="30" height="30" aria-hidden="true"><rect width="400" height="400" rx="80" fill="var(--surface-2)" stroke="var(--border)" stroke-width="4"/><g transform="translate(0 30)" fill="none" stroke-width="40" stroke-linecap="round" stroke-linejoin="round"><path d="M 128 280 L 128 80" stroke="var(--json)"/><path d="M 128 80 H 215 C 265 80, 265 175, 215 175 H 146" stroke="var(--gql)"/><path d="M 146 175 L 240 280" stroke="var(--grpc)"/></g></svg>Respondo</a>' +
      '</div><nav class="topnav" aria-label="Gems">' +
        ["respondo", "graphql", "grpc", "compare"].map(function (k) {
          var p = nav(k), label = { respondo: "respondo", graphql: "respondo-graphql", grpc: "respondo-grpc", compare: "Compare" }[k];
          return '<a href="' + p.href + '"' + (k === current ? ' class="active"' : "") + ">" + label + "</a>";
        }).join("") +
      "</nav>" +
      '<div class="hdr-right"><button class="search-btn" id="searchBtn" aria-label="Search docs">' + SEARCH + ' <span>Search docs</span><kbd>/</kbd></button>' +
      '<a class="icon-btn" href="https://github.com/spatelpatidar" aria-label="GitHub" title="GitHub" target="_blank" rel="noopener">' + GH + "</a>" +
      '<button class="icon-btn" id="themeBtn" aria-label="Toggle theme"><svg class="theme-ico" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 0 0 0 18z" fill="var(--ic-cur)"/><path d="M12 3a9 9 0 0 1 0 18z" fill="var(--ic-oth)"/><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></button></div>' +
    "</header>" +
    '<div class="scrim" id="scrim"></div>' +
    '<div class="layout">' +
      '<aside class="sidebar" id="sidebar" aria-label="Documentation">' +
        "<h4>Start</h4>" + link(nav("home")) + link(nav("compare")) +
        "<h4>Gems</h4>" +
        link(nav("respondo"), dot(nav("respondo"))).replace("</a>", ' <small style="color:var(--muted)">JSON</small></a>') +
        link(nav("graphql"), dot(nav("graphql"))) + link(nav("grpc"), dot(nav("grpc"))) +
        "<h4>Links</h4>" +
        '<a href="https://rubygems.org/profiles/spatelpatidar" target="_blank" rel="noopener">RubyGems ↗</a>' +
        '<a href="https://github.com/spatelpatidar" target="_blank" rel="noopener">GitHub ↗</a>' +
      "</aside>" +
      '<main id="main"></main>' +
      '<aside class="toc" id="toc" aria-label="On this page"></aside>' +
    "</div>" +
    '<div class="modal" id="modal" role="dialog" aria-modal="true" aria-label="Search"><div class="modal-box"><input id="q" type="search" placeholder="Search docs…" autocomplete="off"><div class="results" id="results"></div></div></div>';

  var main = $("#main", shell);
  main.appendChild(article);
  var foot = document.createElement("footer"); foot.innerHTML = footer; main.appendChild(foot);
  while (shell.firstChild) document.body.insertBefore(shell.firstChild, $("script[src='shell.js']"));

  document.documentElement.classList.remove("shell-pending"); // header, sidebar and content now appear together
  var toc = $("#toc"), modal = $("#modal");
  (function () {
    var h = $(".header"), seen = false;
    try { seen = sessionStorage.getItem("respondo-hdr") === "1"; sessionStorage.setItem("respondo-hdr", "1"); } catch (e) {}
    if (seen) h.classList.add("no-anim");
    // turn the glass effect on only after the first frames have been painted
    var on = function () { requestAnimationFrame(function () { requestAnimationFrame(function () { h.classList.add("glass"); }); }); };
    if (document.readyState === "complete") on(); else window.addEventListener("load", on);
  })();


  /* ---------- toast + clipboard ---------- */
  var TOAST_ICONS = {
    success: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
    info: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
    error: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>'
  };
  function toast(message, type, ms) {
    type = TOAST_ICONS[type] ? type : "success";
    var box = $("#toasts");
    if (!box) {
      box = document.createElement("div"); box.id = "toasts";
      box.setAttribute("role", "status"); box.setAttribute("aria-live", "polite");
      document.body.appendChild(box);
    }
    while (box.children.length >= 3) box.removeChild(box.firstChild);       // keep the stack short
    var t = document.createElement("div"); t.className = "toast toast-" + type;
    t.innerHTML = TOAST_ICONS[type] + "<span></span>"; t.lastChild.textContent = message;
    box.appendChild(t);
    var timer = setTimeout(close, ms || 2200);
    function close() { clearTimeout(timer); t.classList.add("out"); setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 260); }
    t.addEventListener("click", close);
  }
  function legacyCopy(text) {
    var ta = document.createElement("textarea"); ta.value = text; ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;top:-1000px;opacity:0"; document.body.appendChild(ta); ta.select();
    var ok = false; try { ok = document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta); return ok;
  }
  function copyText(text) {      // resolves true / false; also works on http and file://
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return legacyCopy(text); });
    }
    return Promise.resolve(legacyCopy(text));
  }
  window.respondoToast = toast;

  /* ---------- syntax highlighter ---------- */
  function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  var RULES = {
    ruby: [["com", /#.*/], ["str", /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/], ["sym", /:[a-zA-Z_]\w*[?!]?|%i\[[^\]]*\]/],
           ["kw", /\b(?:class|def|end|if|else|unless|return|do|rescue|module|include|require|begin|nil|true|false|self)\b/], ["num", /\b\d[\d_]*\b/]],
    json: [["key", /"(?:[^"\\]|\\.)*"(?=\s*:)/], ["str", /"(?:[^"\\]|\\.)*"/], ["kw", /\b(?:true|false|null)\b/], ["num", /-?\b\d+(?:\.\d+)?\b/]],
    bash: [["com", /#.*/], ["str", /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/], ["kw", /\b(?:bundle|rails|gem|install|generate|git|cd|config|set)\b/]],
    proto: [["com", /\/\/.*/], ["str", /"(?:[^"\\]|\\.)*"/], ["kw", /\b(?:syntax|package|import|service|rpc|returns|message|optional|repeated|bool|string|int32)\b/], ["num", /\b\d+\b/]]
  };
  function highlight(code, lang) {
    var rules = RULES[lang]; if (!rules) return esc(code);
    var out = "", i = 0;
    while (i < code.length) {
      var best = null;
      for (var r = 0; r < rules.length; r++) {
        var re = new RegExp(rules[r][1].source, "g"); re.lastIndex = i;
        var m = re.exec(code);
        if (m && (!best || m.index < best.index)) best = { index: m.index, text: m[0], cls: rules[r][0] };
      }
      if (!best || !best.text) { out += esc(code.slice(i)); break; }
      out += esc(code.slice(i, best.index)) + '<span class="tk-' + best.cls + '">' + esc(best.text) + "</span>";
      i = best.index + best.text.length;
    }
    return out;
  }
  $$("pre[data-lang]").forEach(function (pre) {
    var lang = pre.dataset.lang, raw = pre.textContent, box = pre.parentNode;
    var bar = document.createElement("div"); bar.className = "bar"; bar.innerHTML = "<span>" + lang + "</span>";
    var btn = document.createElement("button"); btn.type = "button"; btn.textContent = "Copy";
    btn.addEventListener("click", function () {
      copyText(raw).then(function (ok) {
        if (ok) {
          btn.textContent = "Copied"; setTimeout(function () { btn.textContent = "Copy"; }, 1400);
          toast("Code copied to clipboard");
        } else toast("Couldn't copy. Select the code and press Ctrl+C", "error", 3200);
      });
    });
    bar.appendChild(btn); box.insertBefore(bar, pre);
    pre.innerHTML = highlight(raw, lang); pre.setAttribute("tabindex", "0");
  });

  /* ---------- tabs ---------- */
  $$("[data-tabs]").forEach(function (t) {
    var btns = $$(".tab-list button", t), panels = $$(".tab-panel", t);
    btns.forEach(function (b, i) {
      b.setAttribute("aria-selected", i === 0);
      b.addEventListener("click", function () {
        btns.forEach(function (x, j) { x.setAttribute("aria-selected", j === i); panels[j].hidden = j !== i; });
      });
    });
  });

  /* ---------- heading ids + "on this page" ---------- */
  var hs = article.classList.contains("nf") ? [] : $$("h2,h3", article);   // the 404 page has no sections
  hs.forEach(function (h) { if (!h.id) h.id = h.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); });
  toc.innerHTML = "<h4>On this page</h4>";
  hs.forEach(function (h) {
    var a = document.createElement("a"); a.textContent = h.textContent; a.href = "#" + h.id;
    if (h.tagName === "H3") a.className = "sub"; toc.appendChild(a);
  });
  if (!hs.length) toc.style.display = "none";
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) $$("a", toc).forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id); });
      });
    }, { rootMargin: "-70px 0px -70% 0px" });
    hs.forEach(function (h) { io.observe(h); });
  }
  if (location.hash && document.getElementById(location.hash.slice(1))) document.getElementById(location.hash.slice(1)).scrollIntoView();


  /* ---------- scroll reveal ---------- */
  (function () {
    var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;
    document.documentElement.classList.add("js");
    var sel = "h1,.lede,.badges,h2,h3,.code,.tbl,.cards .card,.callout,details,.tabs,.pager,article>p,article>ul";
    var els = $$(sel, article).filter(function (el) {
      var inTabs = el.closest(".tabs") && !el.classList.contains("tabs");
      var inDetails = el.closest("details") && el.tagName !== "DETAILS";
      var inCard = el.closest(".card") && !el.classList.contains("card");
      return !inTabs && !inDetails && !inCard;
    });
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io2.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });
    els.forEach(function (el) {
      el.classList.add("reveal");
      if (el.matches(".cards .card")) el.style.transitionDelay = ($$(".card", el.parentNode).indexOf(el) * 90) + "ms";
      io2.observe(el);
    });
  })();


  /* ---------- copy-link buttons on headings ---------- */
  hs.forEach(function (h) {
    var b = document.createElement("button"); b.type = "button"; b.className = "anchor";
    b.setAttribute("aria-label", "Copy link to “" + h.textContent.trim() + "”");
    b.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.1 0l3-3a5 5 0 0 0-7.1-7.1l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.1 0l-3 3A5 5 0 0 0 11 21.1l1.7-1.7"/></svg>';
    b.addEventListener("click", function () {
      var url = location.href.split("#")[0] + "#" + h.id;
      try { history.replaceState(null, "", "#" + h.id); } catch (e) {}
      copyText(url).then(function (ok) { ok ? toast("Link to this section copied") : toast("Couldn't copy the link", "error"); });
    });
    h.appendChild(b);
  });

  /* ---------- theme + mobile nav ---------- */
  function label() {
    var root = document.documentElement, b = $("#themeBtn");
    var dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    var t = "Switch to " + (dark ? "light" : "dark") + " theme";
    b.setAttribute("aria-label", t); b.title = t;
  }
  label();
  $("#themeBtn").addEventListener("click", function () {
    var root = document.documentElement, btn = this;
    var dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    var next = dark ? "light" : "dark";
    var apply = function () {
      root.dataset.theme = next; root.style.colorScheme = next; label();
      try { localStorage.setItem("respondo-theme", next); } catch (e) {}
    };
    var announce = function () { toast("Switched to " + next + " theme", "info"); };
    var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { apply(); announce(); return; }
    if (!document.startViewTransition) {
      root.classList.add("theme-fade"); apply(); announce();
      setTimeout(function () { root.classList.remove("theme-fade"); }, 500);
      return;
    }
    var r = btn.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
    var end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    root.classList.add("theme-vt");
    var t = document.startViewTransition(apply);
    t.ready.then(function () {
      root.animate(
        { clipPath: ["circle(0px at " + x + "px " + y + "px)", "circle(" + end + "px at " + x + "px " + y + "px)"] },
        { duration: 700, easing: "cubic-bezier(.4,0,.2,1)", pseudoElement: "::view-transition-new(root)" }
      );
    }).catch(function () {});
    t.finished.finally(function () { root.classList.remove("theme-vt"); announce(); });
  });
  $("#menuBtn").addEventListener("click", function () { document.body.classList.toggle("nav-open"); });
  $("#scrim").addEventListener("click", function () { document.body.classList.remove("nav-open"); });

  /* ---------- search across all pages (pages are fetched on first open) ---------- */
  var index = null;
  function indexDoc(doc, p) {
    var out = [], art = doc.querySelector("article.page"); if (!art) return out;
    var cur = { href: p.href, title: p.title, head: p.title, text: "" }; out.push(cur);
    Array.prototype.forEach.call(art.children, function (el) {
      if (el.tagName === "H2") {
        var id = el.id || el.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        cur = { href: p.href + "#" + id, title: p.title, head: el.textContent, text: "" }; out.push(cur);
      } else cur.text += " " + el.textContent;
    });
    return out;
  }
  function loadIndex() {
    if (index) return Promise.resolve();
    index = nav(current) ? indexDoc(document, nav(current)) : [];
    return Promise.all(PAGES.filter(function (p) { return p.key !== current; }).map(function (p) {
      return fetch(p.href).then(function (r) { return r.text(); }).then(function (t) {
        index = index.concat(indexDoc(new DOMParser().parseFromString(t, "text/html"), p));
      }).catch(function () { index.push({ href: p.href, title: p.title, head: p.title, text: "" }); });
    }));
  }
  var q = $("#q"), results = $("#results"), sel = -1;
  function render(term) {
    var t = term.trim().toLowerCase(), hits = [];
    if (t) {
      (index || []).forEach(function (e) {
        var h = e.head.toLowerCase().indexOf(t), x = e.text.toLowerCase().indexOf(t);
        if (h > -1 || x > -1) hits.push({ e: e, score: h > -1 ? 0 : 1, pos: x });
      });
      hits.sort(function (a, b) { return a.score - b.score; });
    } else hits = (index || []).filter(function (e) { return e.href.indexOf("#") > -1; }).slice(0, 8).map(function (e) { return { e: e, pos: -1 }; });
    results.innerHTML = ""; sel = -1;
    if (!hits.length) { results.innerHTML = '<div class="none">No results</div>'; return; }
    hits.slice(0, 12).forEach(function (h) {
      var a = document.createElement("a"); a.href = h.e.href;
      var snip = t && h.pos > -1 ? "…" + h.e.text.slice(Math.max(0, h.pos - 30), h.pos + 80).trim() + "…" : "";
      var b = document.createElement("strong"); b.textContent = h.e.head;
      var s = document.createElement("small"); s.textContent = h.e.title + (snip ? " · " + snip : "");
      a.appendChild(b); a.appendChild(s); results.appendChild(a);
    });
  }
  function openSearch() { modal.classList.add("open"); q.value = ""; q.focus(); loadIndex().then(function () { render(q.value); }); }
  function closeSearch() { modal.classList.remove("open"); }
  $("#searchBtn").addEventListener("click", openSearch);
  modal.addEventListener("click", function (e) { if (e.target === modal) closeSearch(); });
  q.addEventListener("input", function () { render(q.value); });
  q.addEventListener("keydown", function (e) {
    var items = $$("a", results);
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault(); sel = (sel + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
      items.forEach(function (a, i) { a.classList.toggle("sel", i === sel); });
    } else if (e.key === "Enter" && items.length) { location.href = items[Math.max(sel, 0)].href; }
  });
  document.addEventListener("keydown", function (e) {
    var tag = (e.target.tagName || "").toLowerCase();
    if ((e.key === "/" && tag !== "input") || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) { e.preventDefault(); openSearch(); }
    if (e.key === "Escape") closeSearch();
  });
})();
