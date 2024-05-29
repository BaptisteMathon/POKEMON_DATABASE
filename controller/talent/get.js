const initDatabase = require('../../database')

async function getAllTalent(){
    const db = initDatabase()

    try{
        const talent = db.collection("Talent").find({}).toArray()
        return talent
    } catch(error){
        console.error({error})
    }
}

module.exports = {getAllTalent}