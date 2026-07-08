import fs from "node:fs";

function extractSingleBlock({ file, tag, output, replacement }) {
  const source = fs.readFileSync(file, "utf8");
  const pattern = new RegExp(`\\r?\\n\\s*<${tag}[^>]*>\\r?\\n([\\s\\S]*?)\\r?\\n\\s*</${tag}>`);
  const match = source.match(pattern);
  if (!match) {
    if (fs.existsSync(output) && source.includes(replacement.trim())) return;
    throw new Error(`No <${tag}> block found in ${file}`);
  }
  fs.writeFileSync(output, `${match[1].trim()}\n`, "utf8");
  fs.writeFileSync(file, source.replace(pattern, `\n${replacement}`), "utf8");
}

extractSingleBlock({
  file: "index.html",
  tag: "style",
  output: "assets/css/home.css",
  replacement: '  <link rel="stylesheet" href="assets/css/home.css">'
});

extractSingleBlock({
  file: "games/jam-akson-thai/index.html",
  tag: "style",
  output: "games/jam-akson-thai/style.css",
  replacement: '  <link rel="stylesheet" href="style.css">'
});

extractSingleBlock({
  file: "games/jam-akson-thai/index.html",
  tag: "script",
  output: "games/jam-akson-thai/script.js",
  replacement: '  <script src="script.js"></script>'
});
