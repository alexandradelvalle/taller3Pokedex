//Taller Pokedex

async function buscarPokemon() {
    const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
 
    const datos = await respuesta.json();
    const types = datos.types
    const stats =
   
    console.log("========== PARTE 1: Explorar API (Pikachu) ==========");
    console.log("Nombre:", datos.name);
    console.log("Número de Pokedex:", datos.id);
    console.log("Peso:", datos.weight);
    console.log("Altura:", datos.height);
    console.log("Habilidad 1:", datos.abilities[0].ability.name);
    console.log("Habilidad 2:", datos.abilities[1].ability.name);
    console.log("Tipo: ", datos.types[0].type.name);
    console.log("Estaadisticas:",)
    console.log("HP (Vida):", datos.stats[0].base_stat);
    console.log("Ataque:", datos.stats[1].base_stat);
    console.log("Defensa:", datos.stats[2].base_stat);
    console.log("Velocidad:", datos.stats[5].base_stat)
}
buscarPokemon()