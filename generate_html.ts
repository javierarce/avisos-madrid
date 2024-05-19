import { ensureDir } from "https://deno.land/std/fs/ensure_dir.ts";

async function generateHTML() {
  await ensureDir("./docs/messages");

  // Read JSON file using Deno built-in functions
  const jsonText = await Deno.readTextFile('output.json');
  const messages = JSON.parse(jsonText);  // Parse the JSON text into an object

  for (const message of messages.data) {
    let content = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
    <meta charset="UTF-8">
    <title>${message.description.slice(0, 50)}</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="author" content="Javier Arce" />
    <meta name="description" content="${message.description}">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="twitter:image" content="${message.url || 'https://javierarce.github.io/avisos-madrid/card.png'}">
    <meta property='og:image' content="${message.url || 'https://javierarce.github.io/avisos-madrid/card.png'}"/>
    <meta name="twitter:card" content="summary_large_image"/>
    <meta name="theme-color" content="#FEF6F0">
    <meta property="og:title" content="${message.description.slice(0, 50)}" />
    <meta property="og:site_name" content="Avisos Madrid" />
    <meta name="twitter:title" content="${message.description.slice(0, 70)}">
    <meta property="og:description" content="${message.description}" />
    <meta property="twitter:description" content="${message.description}" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.0/dist/leaflet.css" />
    <link rel="stylesheet" href="../css/style.css" />
    <script src="https://unpkg.com/leaflet@1.7.0/dist/leaflet.js"></script>
    <script src="../js/Map.js"></script>
    <script src="../js/Pagination.js"></script>
    <script src="../js/Items.js"></script>
    <script src="../js/main.js"></script>
    </head>
    <body>
    <div class="Content">
      <div class="Posts">
        <h1>${message.description}</h1>
        <p>Date: ${message.date}</p>`;
        
    if (message.url) {
      content += `<img src="${message.url}" alt="Image">`;
    }
    content += `
        <div class="Footer">
          Origen de los datos: Ayuntamiento de Madrid.
        </div>
      </div>
    </div>
    </body>
    </html>`;
    
    await Deno.writeTextFile(`./docs/messages/${message.id}.html`, content);
  }
}

generateHTML().catch(err => console.error(err));
