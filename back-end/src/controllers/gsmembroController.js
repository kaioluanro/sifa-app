const Util = require('../util/Util');

const connection = require('../database/connection');

module.exports = {
   async create(request, response){
        const {cargo,email1,email2,senha1,senha2,membro_gs} = request.body
        
        const id=Util.geraIdCriptografado(); 
    
        await connection('gsmembros').insert({
            id,
            cargo,
            email1,
            email2,
            senha1,
            senha2,
            membro_gs
        })

        return response.json({id});
    },

   async listaTodoGs(request, response){
        const gsmembrosTodosdoDB = await connection('gsmembros').select('*');

        return response.json(gsmembrosTodosdoDB);
    },

   async deleteUmMembroGs(request,response){
        const { id } = request.params;

       const procurarMembrosGs = await connection('gsmembros')
       .where('id', id)
       .select()
       .first()

       if(!procurarMembrosGs){
           return response.status(400).json({error:'Id não encontrado'})
       }

       await connection('gsmembros').where('id',id).delete();

       return response.status(204).send()
       
   },

   async editarGsMembro(request, response){
    const {id,...params} = request.body

    await connection('gsmembros')
    .where('id', id)
    .update(params)

    const dadosModificados = await connection('gsmembros')
    .where('id', id)
    .select('*')
    .first()

    return response.json(dadosModificados);
    
   }
};