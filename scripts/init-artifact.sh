#!/usr/bin/env bash
set -euo pipefail

PROJECT_NAME="${1:?Usage: bash scripts/init-artifact.sh <project-name>}"

if [[ -d "$PROJECT_NAME" ]]; then
  echo "Error: directory '$PROJECT_NAME' already exists." >&2
  exit 1
fi

mkdir -p "$PROJECT_NAME"

# ── index.html ────────────────────────────────────────────────────────────────
cat > "$PROJECT_NAME/index.html" << EOF
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${PROJECT_NAME}</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div id="app">
    <h1>${PROJECT_NAME}</h1>
    <p>ערוך את <code>index.html</code>, <code>style.css</code> ו-<code>script.js</code> כדי להתחיל.</p>
  </div>
  <script src="script.js"></script>
</body>
</html>
EOF

# ── style.css ─────────────────────────────────────────────────────────────────
cat > "$PROJECT_NAME/style.css" << 'EOF'
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #000;
  --surface: #0a0a0a;
  --border: rgba(255,255,255,0.08);
  --text: #fff;
  --muted: rgba(255,255,255,0.45);
  --accent: #00d4ff;
  --font: "Heebo", "Assistant", system-ui, sans-serif;
}

html, body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font);
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

#app {
  max-width: 800px;
  margin: 0 auto;
  padding: 80px 24px;
}

h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
}

p {
  color: var(--muted);
  line-height: 1.7;
  font-size: 1rem;
}

code {
  font-family: monospace;
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 2px 6px;
  border-radius: 3px;
  color: var(--accent);
  font-size: 0.875em;
}
EOF

# ── script.js ─────────────────────────────────────────────────────────────────
cat > "$PROJECT_NAME/script.js" << 'EOF'
// Entry point
document.addEventListener("DOMContentLoaded", () => {
  console.log("artifact ready");
});
EOF

echo ""
echo "✓  Artifact '${PROJECT_NAME}' created"
echo ""
echo "   Files:"
echo "   ├── index.html"
echo "   ├── style.css"
echo "   └── script.js"
echo ""
echo "   Next: cd ${PROJECT_NAME} && open index.html"
echo ""
