const connection = require('../database/connection');

module.exports = {
  async addPresencaMembroEjc(request, response){
    const {id,id_evento} = request.body;

    const presenca = await connection('ejcmembros')
    .where('id',id)
    .select('presenca')
    .first();

    const presentesEvento = await connection('eventos')
    .where('id', id_evento)
    .select('n_participantes')
    .first()

    const addPresenca = presenca.presenca + 1;

    await connection('eventos').where('id',id_evento)
    .update({n_participantes:addPresenca})

    await connection('ejcmembros').where('id',id)
    .update({presenca:addPresenca});

    return response.status(204).send();
  }
}