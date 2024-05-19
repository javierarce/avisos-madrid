import { ensureDir } from "https://deno.land/std/fs/ensure_dir.ts";

async function generateHTML() {
  await ensureDir("./m");

  // Read JSON file using Deno built-in functions
  const jsonText = await Deno.readTextFile('output.json');
  const messages = JSON.parse(jsonText);  // Parse the JSON text into an object

  for (const message of messages.data) {
    let content = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Avisos Madrid | ${message.description.slice(0, 50)}</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="author" content="Javier Arce" />
  <meta name="description" content="${message.description}">
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="twitter:image" content="${message.url || 'https://javierarce.github.io/avisos-madrid/card.png'}">
  <meta property='og:image' content="${message.url || 'https://javierarce.github.io/avisos-madrid/card.png'}"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="theme-color" content="#FEF6F0">
  <meta property="og:title" content="Avisos Madrid | ${message.description.slice(0, 50)}" />
  <meta property="og:site_name" content="Avisos Madrid" />
  <meta name="twitter:title" content="Avisos Madrid | ${message.description.slice(0, 70)}">
  <meta property="og:description" content="Avisos Madrid | ${message.description}" />
  <meta property="twitter:description" content="Avisos Madrid | ${message.description}" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.0/dist/leaflet.css" />
  <link rel="stylesheet" href="/css/reset.css" />
  <link rel="stylesheet" href="/css/style.css" />
  <script>
    const lat = ${message.lat};
    const long = ${message.long};
  </script>
  <script src="https://unpkg.com/leaflet@1.7.0/dist/leaflet.js"></script>
  <script src="/js/Map.js"></script>
  <script src="/js/post.js"></script>
</head>
<body>
  <div class="Content">
    <div class="Posts">
    <div class="Header">
      <h1><a href="https://javierarce.github.io/avisos-madrid">Avisos Madrid</a></h1>
      <a target="_blank" href="https://github.com/javierarce/avisos-madrid">Explora y descarga los datos</a>
    </div>
      <div class="Items">
        <div class="Item">
          <div class="Item__service">${message.service}</div>
          <div class="Item__content">
          <p>${message.description}</p>`;
          
    if (message.url) {
      content += ` <img src="${message.url}" alt="Image">`;
    }

    content += `
          </div>
          <div class="Item__footer">
<div class="Item__metadata">
          <span class="js-date" data-date="${message.date}" title="${message.date}"></span> en ${message.address}</div>
          </div>
        </div>
        <div class="Footer">
          Origen de los datos: Ayuntamiento de Madrid.
        </div>
      </div>
    </div>
    <div class="Map__container">
      <div id="map" class="Map"></div>
    </div>
  </div>
</body>
</html>`;

    await Deno.writeTextFile(`./m/${message.id}.html`, content);
  }
}

generateHTML().catch(err => console.error(err));
