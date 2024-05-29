const initDatabase = require("../../database")

async function postEkip(ekips){
    ekips = ekips.split("|-|")
    console.log(ekips)
    const db = await initDatabase()

    const pokpok = {
        pokemon1: ekips[0],
        pokemon2: ekips[1],
        pokemon3: ekips[2],
        pokemon4: ekips[3],
        pokemon5: ekips[4],
        pokemon6: ekips[5]
    }

    try{
        const ekip = await db.collection("Ekip").insertOne(pokpok)
        return ekip
    } catch(error){
        console.error({error})
    }
}

module.exports = {postEkip}