// Taller Pokédex

// Parte 1 - Conexión y exploración de la respuesta

async function explorar() {
    const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");

    console.log("Status de la respuesta:", respuesta.status);

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

explorar();