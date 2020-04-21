const connection = require('../database/connection');

module.exports = {
  async restDados(request,response){
     const buscarParticipantes = await connection('eventos')
    .where('n_participantes','>',0)
    .select('n_participantes')
    .update({n_participantes:0})
    
    const buscarPresenca = await connection('ejcmembros')
    .where('presenca','>',0)
    .select('presenca')
    .update({presenca:0})
        
    console.log(buscarParticipantes,buscarPresenca)
    return response.status(200).send({msg:'rest feito com sucesso!!'})
  }
}