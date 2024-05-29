const { ObjectId } = require("mongodb")
const initDatabase = require("../../database")

async function deleteEkip(ekip){
    const db = await initDatabase()

    try{
        // const test = await db.collection("Ekip").deleteOne({_id: "6655a9c9a3c684f6ce011282"})
        const test = await db.collection("Ekip").deleteOne({_id: new ObjectId(ekip)})
        return test
    } catch(error){
        console.error({error})
    }
}

module.exports = {deleteEkip}