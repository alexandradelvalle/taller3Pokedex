// Prueba parte 1 del taller con prompt-sync

const prompt = require('prompt-sync')();

async function explorarPrueba() {

  let pokemon = prompt("Nombre del Pokémon: ").toLowerCase();
  const url = "https://pokeapi.co/api/v2/pokemon/" + pokemon

  const respuesta = await fetch(url);

  if (!respuesta.ok) {
    console.log("Algo salió mal. Código:", respuesta.status);
    return;
  }

  const datos = await respuesta.json();
  //console.log(datos);

  console.log(`\n--- DATOS DE ${datos.name.toUpperCase()} ---`);

  console.log("\n-- Tipo --");
  for (let t of datos.types) {
    console.log("♦", t.type.name);
  }

  console.log("\n-- Estadísticas --");
  for (let s of datos.stats) {
    console.log(`• ${s.stat.name}: ${s.base_stat}`);
  }
    
  console.log("\n-- Habilidades --");
  for (const a of datos.abilities) {
    console.log("✓", a.ability.name);
  }
    
}

explorarPrueba();