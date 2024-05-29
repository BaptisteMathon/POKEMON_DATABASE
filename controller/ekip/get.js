const initDatabase = require("../../database")

async function getAllEkip(){
    const db = await initDatabase()

    try{
        const ekip = await db.collection("Ekip").find({}).toArray()
        return ekip
    } catch(error){
        console.error({error})
    }
}

module.exports = {getAllEkip}