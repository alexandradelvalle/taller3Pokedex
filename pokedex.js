// Taller Pokédex

async function ejecutarTaller() {

    // Parte 2 - Función buscarPokemon()

async function buscarPokemon(nombre) {
    // 1. Construye la URL con el nombre en minúsculas (toLowerCase())
    const url = "https://pokeapi.co/api/v2/pokemon/" + nombre.toLowerCase();

    // 2. await fetch(...)
    const respuesta = await fetch(url);

    // 3. if (!respuesta.ok) { avisa el status y retorna null }
    if (!respuesta.ok) {
        console.log("\n⚠ Algo salió mal. Código:", respuesta.status);
        return null;
    }
    
    // 4. si todo salió bien, retorna await respuesta.json()
    const datos = await respuesta.json();
    return datos;
}

async function mostrar() {
    console.log("--- Mostrar Pokémon y su ID ---");
    let pokemon = await buscarPokemon("pikachu"); //muestra nombre e ID
    if (pokemon !== null) {
        console.log(`Pokémon: ${pokemon.name} (ID: ${pokemon.id})`);
    }

    pokemon = await buscarPokemon("charizard"); //muestra nombre e ID
    if (pokemon !== null) {
        console.log(`Pokémon: ${pokemon.name} (ID: ${pokemon.id})`);
    }

    pokemon = await buscarPokemon("bulbasaur"); //muestra nombre e ID
    if (pokemon !== null) {
        console.log(`Pokémon: ${pokemon.name} (ID: ${pokemon.id})`);
    }

    pokemon = await buscarPokemon("tierra"); //mensaje de "⚠ Algo salió mal. Código: respuesta.status"
    if (pokemon !== null) {
        console.log(`Pokémon: ${pokemon.name} (ID: ${pokemon.id})`);
    }
}

await mostrar();

    // Parte 3 - Función mostrarFicha()

function mostrarFicha(datos) {
    // 1. if (!datos) { avisa y return }
    if (!datos) {
        console.log("⚠ No hay nada que mostrar");
        return;
    }
    // 2. imprime nombre en mayúscula + id
    const nombreMayus = datos.name.toUpperCase();
    console.log("\n--- DATOS DEL POKÉMON ---");
    console.log(`NOMBRE: ${nombreMayus} (ID: ${datos.id})`);

    // 3. arma un array de nombres de tipos y únelo con join(" / ")
    console.log("-- Tipo --");
    let tipos = []
    for (let t of datos.types){
        tipos.push(t.type.name);
    }
    console.log("♦", tipos.join(" / "));

    // 4. calcula altura en cm y peso en kg, imprímelos
    console.log("-- Altura --");
    const alturaCm = datos.height*10;
    console.log("↑", alturaCm, "cm");
    console.log("-- Peso --");
    const pesoKg = datos.weight/10;
    console.log("⚖ ", pesoKg, "kg");

    // 5. recorre datos.stats e imprime cada nombre + base_stat
    console.log("-- Estadísticas --");
    for (let s of datos.stats) {
        console.log(`• ${s.stat.name}: ${s.base_stat}`);
    }

    // 6. recorre datos.abilities e imprime cada nombre (+ "(oculta)" si aplica)
    console.log("-- Habilidades --");
    for (let a of datos.abilities) {
        if (a.is_hidden) {
            console.log("✓", a.ability.name + " (oculta)");
        } else {
            console.log("✓", a.ability.name);
        }
    }
}

async function traer() {
    let namePokemon = await buscarPokemon("gengar"); //muestra tipo, altura, peso, estadísticas, habilidades
    mostrarFicha(namePokemon);

    namePokemon = await buscarPokemon("ditto"); //muestra tipo, altura, peso, estadísticas, habilidades
    mostrarFicha(namePokemon);

    namePokemon = await buscarPokemon("agua"); //mensaje de "⚠ Algo salió mal. Código: respuesta.status" y "⚠ No hay nada que mostrar"
    mostrarFicha(namePokemon);
}

await traer();

    // Parte 4 - Función compararPokemon()

function obtenerStat(datos, nombreStat) {
    // recorre datos.stats con un for
    for (let s of datos.stats) {
      //si stat.name === nombreStat, retorna base_stat (usa "return" para cortar ahí mismo)
      if (s.stat.name === nombreStat) {
        return s.base_stat;
      } 
    }
    // si el for termina sin encontrar nada, retorna null
    return null
}

async function compararPokemon(nombre1, nombre2, stat){
    //buscar ambos pokémon con buscarPokemon() (recuerda el await en cada uno)
    let nombrePokemon1 = await buscarPokemon(nombre1);
    let nombrePokemon2 = await buscarPokemon(nombre2);

    //si alguno vino null, avisar que no se puede comparar y salir con return
    if (!nombrePokemon1 || !nombrePokemon2) {
        console.log("⚠ No se puede comparar porque uno de los Pokémon no existe");
        return;
    }

    //obtener el valor de la stat pedida para cada uno, con obtenerStat()
    const statPokemon1 = obtenerStat(nombrePokemon1, stat);
    const statPokemon2 = obtenerStat(nombrePokemon2, stat);

    //si la stat no existe en ninguno (viene null), avisar cuáles son las stats válidas y salir
    if (statPokemon1 === null || statPokemon2 === null) {
        console.log("\n⚠ Stat no válida \nLas stats disponibles son: \n• hp \n• attack \n• defense \n• special-attack \n• special-defense \n• speed");
        return;
    }

    //comparar los dos valores e imprimir quién gana (o si hay empate)
    console.log(`\n--- COMPARACIÓN DE ${stat.toUpperCase()} ---`);
    console.log(`${nombrePokemon1.name.toUpperCase()}: ${statPokemon1} vs ${nombrePokemon2.name.toUpperCase()}: ${statPokemon2}`);
    
    if (statPokemon1 === statPokemon2) {
        console.log("🤝 Empate");
    } else if (statPokemon1 > statPokemon2) {
        console.log("🏆 Gana:", nombrePokemon1.name.toUpperCase());
    } else {
        console.log("🏆 Gana:", nombrePokemon2.name.toUpperCase());
    }
}

async function combate() {
    await compararPokemon("snorlax", "machamp", "defense"); //muestra ganador
    await compararPokemon("gengar", "blastoise", "power"); //mensaje de "⚠ Stat no válida..."
    await compararPokemon("Mew", "Jirachi", "hp"); //muestra empate
    await compararPokemon("ditto", "aire", "speed"); //mensaje de "⚠ Algo salió mal. Código: respuesta.status" y "⚠ No se puede comparar porque uno de los Pokémon no existe"

}

await combate();

    // Parte 5 — Función pokemonMasFuerte()

async function pokemonMasFuerte(listaNombres, stat){
    //guardar en dos variables el mejor nombre encontrado hasta ahora y su mejor valor (empieza el valor en algo imposible de superar por abajo, como -1)
    mejorNombre = "";
    mejorValor = -1

    //recorrer listaNombres. Para cada nombre: buscarlo con buscarPokemon()
    for (let l of listaNombres) {
        let pokemonActual = await buscarPokemon(l);

    //si vino null , saltarlo y seguir con el siguiente ( continue )
    if (pokemonActual === null) {
        continue;
    } 

    //obtener su valor de la stat con obtenerStat(). Si es null , saltarlo también
    let valorStat = obtenerStat(pokemonActual, stat);
    if (valorStat === null) {
        continue;
    } 

    //si su valor es mayor al mejor guardado hasta ahora, actualizar ambas variables
    if (valorStat > mejorValor) {
        mejorValor = valorStat;
        mejorNombre = pokemonActual.name;
    }
    }

    //al terminar de recorrer toda la lista, mostrar quién ganó y retornar su nombre
    console.log(`\n--- POKÉMON MÁS FUERTE EN ${stat.toUpperCase()} ---`)
    console.log(`🏆 El Pokémon más fuerte en ${stat.toUpperCase()} es ${mejorNombre.toUpperCase()} con un valor de ${mejorValor}`);
    return mejorNombre;
}

async function torneo() {
    // 1. Arma tu propio equipo de 6 pokémon (los que quieras) en un array
    let miEquipo = ["charizard", "mew", "snorlax", "gengar", "machamp", "pikachu"];

    // 2. Usa pokemonMasFuerte() para encontrar cuál es el más fuerte en attack
    let ganadorAtaque = await pokemonMasFuerte(miEquipo, "attack"); //muestra ganador

    // 3. Encuentra cuál es el más fuerte en defense
    await pokemonMasFuerte(miEquipo, "defense"); //muestra ganador

    // 4. Muestra la ficha completa del pokémon ganador en attack, usando mostrarFicha()
    console.log(`\n--- FICHA DEL GANADOR EN ATAQUE: ${ganadorAtaque.toUpperCase()} ---`);
    let datosGanador = await buscarPokemon(ganadorAtaque); //muestra más fuerte
    mostrarFicha(datosGanador);
}

await torneo();
}

ejecutarTaller();