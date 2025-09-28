// script.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Necesario para obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas de archivos
const inputFilePath = path.join(__dirname, 'diccionario.txt');
const outputFilePath = path.join(__dirname, 'diccionario.ts');

// Función principal
async function generarDiccionario() {
  try {
    // Leer archivo de manera asincrónica usando callback y Promise
    const data = await new Promise((resolve, reject) => {
      fs.readFile(inputFilePath, 'utf8', (err, content) => {
        if (err) reject(err);
        else resolve(content);
      });
    });

    // Separar por líneas y limpiar espacios
    const palabras = data
      .split(/\r?\n/)
      .map(p => p.trim())
      .filter(p => p.length > 0);

    // Crear contenido TypeScript
    const tsContent = `export const diccionario = [\n  ${palabras.map(p => `'${p}'`).join(',\n  ')}\n];\n`;

    // Escribir archivo diccionario.ts
    await new Promise((resolve, reject) => {
      fs.writeFile(outputFilePath, tsContent, 'utf8', (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    console.log(`Archivo diccionario.ts creado con ${palabras.length} palabras.`);
  } catch (err) {
    console.error('Error:', err);
  }
}

// Ejecutar función
generarDiccionario();
