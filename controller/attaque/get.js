const initDatabase = require('../../database')

async function getAllAttaque(){
    const db = await initDatabase()

    try{
        const attaque = await db.collection("Attaque").find({}).toArray()
        return attaque
    } catch(error){
        console.error({error})
    }
}

async function getManyAttaque(attaques){
    const db = await initDatabase()

    try{
        const attaque = await db.collection("Attaque").find({}).toArray()
        let ArrayAttaque = []
        attaque.forEach(element => {
            if(attaques.includes(element["_id"])){
                ArrayAttaque.push(element.Name)
            }
        });
        return ArrayAttaque
    } catch(error){
        console.error({error})
    }
}

module.exports = {getAllAttaque, getManyAttaque}