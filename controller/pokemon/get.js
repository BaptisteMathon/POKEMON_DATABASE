const initDatabase = require('../../database')

async function getAllPokemon() {
    const db = await initDatabase()

    try {

        const pokemons = await db.collection("Pokemon").find({}).toArray()

        return pokemons
    } catch (error){
        console.error("Erreur : " + error)
    }
}

async function getOnePokemon(idPOK){

    console.log({idPOK})

    const db = await initDatabase()

    try {
        const findPokemon = await db.collection("Pokemon").findOne({_id : idPOK})
        return findPokemon
    } catch (error){
        console.error('Erreur : ' + error)
    }
}

module.exports = {getAllPokemon, getOnePokemon}