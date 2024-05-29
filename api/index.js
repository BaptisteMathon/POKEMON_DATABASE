const express = require('express')
const fs = require('fs/promises')
const axios = require('axios')
const cors = require('cors');
const datas  =require("../data/pokemon-data.json")

const app = express()
const database = require("../database")

const { getAllPokemon, getOnePokemon } = require("../controller/pokemon/get");
const {getOneTypes, getAllTypes, getManyTypes} = require("../controller/types/get")
const {getAllAttaque, getManyAttaque} = require("../controller/attaque/get")
const {getAllTalent} = require("../controller/talent/get")
const {getAllEkip} = require("../controller/ekip/get")

const {postEkip} = require("../controller/ekip/post")

const {deleteEkip} = require("../controller/ekip/delete")



let path = "./data/pokemon-data.json"

app.use(cors())

database()

app.get('/', function (req, res) {
    let content = `Hello World! <br><br>
    
    Comment fonctionne l'API: <br>
        -Renvoie un pokemon aléatoire de la liste <a href="/random" style="background: gray">'/random'</a><br>
        -Renvoie un pokemon aléatoire de la liste correspondant au type <i style="background: gray">'/random/[type]' </i><br>
        -Renvoie un pokemon aléatoire correspondant au deux types <i style="background: gray"> '/random/[type]/[type]' </i><br>
        -Renvoie un pokemon aléatoire correspondant au stage d'évolution en paramètre (1 le pokemon est non évolué, 2 le pokemon n'a plus d'évolution) <i style="background: gray">'/random/stage/[1-2]' </i><br>
        -Renvoie un pokemon aléatoire dans la tier correspondant <i style="background: gray">'/random/tier/[tier]'</i> <br>
        -Renvoie la liste de tout les tiers disponible dans la base de donnée <a href="/liste/tier" style="background: gray">'/liste/tier'</a> <br>
        -Renvoie la liste de tout les types disponible dans la base de donnée <a href="/liste/type" style="background: gray">'/liste/type'</a> <br>
        -Renvoie une lignée de pokemon au hasard <a href="/random/lignee" style="background: gray">'/random/lignee'</a>
        `
    res.send(content)
})

app.get('/all', async function(req, res) {
    try {
      const allPokemon = await getAllPokemon();

      for(let i = 0; i < allPokemon.length; i++){
          allPokemon[i] = allPokemon[i][' Name']
      }

      res.send(allPokemon);
    } catch (error) {
      console.error("Erreur lors de la récupération des Pokemons :", error);
      res.status(500).send("Erreur de récupération des Pokemons");
    }
  });

app.get('/random', async function (req, res) {

    try {
        const AllPOK = await getAllPokemon();
        const randomNumber = Math.floor(Math.random() * AllPOK.length)
        const randomPOK = AllPOK[randomNumber]
        res.send(randomPOK)
    } catch(error){
        console.error("Erreur lors de la récupération des pokémons : ", error)
        res.status(500).send("Erreur de récupératuoin des pokémons")
    }
})

app.get('/random/lignee', async function(req, res) {

    let ArrayPOK = []

    const PokemonInfo = await getAllPokemon()
    const randomNumber = Math.floor(Math.random() * PokemonInfo.length)
    const randomPokemon = PokemonInfo[randomNumber]
    ArrayPOK.push(randomPokemon)
    if(randomPokemon['Next Evolution(s)'].length !== 0){
        const Evolution = await getOnePokemon(randomPokemon['Next Evolution(s)'][0])
        ArrayPOK.push(Evolution)
        if(Evolution['Next Evolution(s)'].length !== 0){
            const Evolution2 = await getOnePokemon(Evolution['Next Evolution(s)'][0])
            ArrayPOK.push(Evolution2)
        }
    } 
    res.send(ArrayPOK)
})

app.get('/random/tier/:tier', async function (req, res) {

    let arrayTier = []
    const allPokemon = await getAllPokemon()
    allPokemon.forEach(element => {
        if (element.Tier === req.params.tier){
            arrayTier.push(element)
        }
    });

    if(arrayTier.length != 0){
        const randomNumber = Math.floor(Math.random() * arrayTier.length)
    
        const randomTierPokemon = arrayTier[randomNumber]
    
        res.send(randomTierPokemon)
    } else {
        res.redirect("/error?e=Le%20tier%20n'existe%20pas")
    }
})

app.get('/random/stage/:evo', async function (req, res) {
    let arrrayPokemonSansEvolution = []
    let arrrayPokemonAvecEvolution = []
    const allPokemon = await getAllPokemon()
    allPokemon.forEach(element => {
        if(element['Next Evolution(s)'].length === 0){
            arrrayPokemonSansEvolution.push(element)
        } else {
            arrrayPokemonAvecEvolution.push(element)
        }
    })

    if(req.params.evo == '1'){
        const randomNumber = Math.floor(Math.random() * arrrayPokemonAvecEvolution.length)
        res.send(arrrayPokemonAvecEvolution[randomNumber])
    } else if (req.params.evo == '2'){
        const randomNumber = Math.floor(Math.random() * arrrayPokemonSansEvolution.length)
        res.send(arrrayPokemonSansEvolution[randomNumber])
    } else {
        res.redirect("/error?e=Stage%20inconnue")
    }
})

app.get('/random/:types', async function(req, res) {

    const pokemonType = await getOneTypes(req.params.types)

    let allPokemon = await getAllPokemon()
    console.log({allPokemon})
    allPokemon = allPokemon.filter(pokemon => pokemon.Types.includes(pokemonType._id))

    if(allPokemon.length !== 0){
        const randomNumber = Math.floor(Math.random() * allPokemon.length)
        const RealTypes  = await getManyTypes(allPokemon[randomNumber]["Types"]);
        const RealAttaque = await getManyAttaque(allPokemon[randomNumber]["Moves"])

        allPokemon[randomNumber]["Types"] = RealTypes
        allPokemon[randomNumber]["Moves"] = RealAttaque
        res.send(allPokemon[randomNumber])
    } else {
        res.redirect('/error?e=Type%20inconnue')
    }

})

app.get('/random/:type/:types', async function(req, res){

    const pokemonType1 = await getOneTypes(req.params.type)
    const pokemonType2 = await getOneTypes(req.params.types)

    let allPokemon = await getAllPokemon()

    allPokemon = allPokemon.filter(type => type.Types.includes(pokemonType1._id))
    allPokemon = allPokemon.filter(types => types.Types.includes(pokemonType2._id))

    if(allPokemon.length !== 0){
        const randomNumber = Math.floor(Math.random() * allPokemon.length)
        res.send(allPokemon[randomNumber])
    } else{
        res.redirect('/error?e=Types%20inconnue')
    }
})

app.get('/liste/tier', async function(req, res) {

    let allTier = []
    const allPokemon = await getAllPokemon()
    allPokemon.forEach(element => {
        if(!allTier.includes(element.Tier) && element.Tier != null){
            allTier.push(element.Tier)
        }
    });
    res.send(allTier)

})

app.get('/liste/type', async function(req, res) {
    let allType = []
    const allPokemon = await getAllPokemon()
    console.log(allPokemon)
    allPokemon.forEach(element => {
        let types = getOneTypes(element.Types)
        if(!allType.includes(types)){
            allType.push(types)
        }
    });
    res.send(allType)
})

app.get('/ekip/:ekip', async function(req, res) {
    try{
        await postEkip(req.params.ekip)
        console.log("envoie ekip")
        res.send('hello')
    } catch(error){
        console.error({error})
        res.status(500).send("TEST")
    }
})

app.get('/allEkip', async function (req, res) {
    const ekip = await getAllEkip()
    res.send(ekip)
})

app.get("/deleteEkip/:ekip", async function(req, res) {
    const delEkip = await deleteEkip(req.params.ekip)
    res.send(delEkip)
})

app.get('/error', function(req, res){
    res.send(req.query.e)
})

app.listen(3001, () => {
  console.log("Serveur lancÃ© sur l'adresse http://localhost:3001/");
})