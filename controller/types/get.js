const initDatabase = require('../../database')

async function getAllTypes(){
    const db = await initDatabase()
    try{
        const types = await db.collection("Types").find({}).toArray()
        return types
    } catch(error){
        console.error({error})
    }
}

async function getOneTypes(type){
    const db = await initDatabase()
    try{
        const types = await db.collection("Types").findOne({name : type})

        return types
    } catch(error){
        console.error({error})
    }
}

async function getManyTypes(types){
    const db = await initDatabase()
    try{
        const Reeltypes = await db.collection("Types").find({}).toArray()
        let ArrayTypes = []
        Reeltypes.forEach(element => {
            if (types.includes(element["_id"])){
                ArrayTypes.push(element.name)
            }
        });
        return ArrayTypes
    } catch(error){
        console.error({error})
    }
}

module.exports = {getOneTypes, getAllTypes, getManyTypes}