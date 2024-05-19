import { ensureDir } from "https://deno.land/std/fs/ensure_dir.ts";

async function generateHTML() {
  await ensureDir("./docs/messages");

  // Read JSON file using Deno built-in functions
  const jsonText = await Deno.readTextFile('output.json');
  const messages = JSON.parse(jsonText);  // Parse the JSON text into an object

  for (const message of messages.data) {
    let content = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@YourTwitterHandle">
    <meta name="twitter:title" content="${message.description.slice(0, 70)}">
    <meta name="twitter:description" content="${message.description}">
    <meta name="twitter:image" content="${message.url}">
    <title>${message.description.slice(0, 50)}</title>
    </head>
    <body>
    <h1>${message.description}</h1>
    <p>Date: ${message.date}</p>
    `
    if (message.url) {
      content += `<img src="${message.url}" alt="Image">`
    } 
    content += `</body></html>`;
    await Deno.writeTextFile(`./docs/messages/${message.id}.html`, content);
  }
}

generateHTML().catch(err => console.error(err));
