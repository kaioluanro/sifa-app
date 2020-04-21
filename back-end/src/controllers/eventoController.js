const connection = require('../database/connection');

module.exports = {
  async create(request,response){
    const {evento_nome, data} = request.body;

    const n_participantes = 0;

    await connection('eventos').insert({
      evento_nome,
      data,
      n_participantes
    })

    return response.status(204).send()
  },

  async listarTodosEventos(request, response){
    const pegarTodosEventos = await connection('eventos').select('*')

    return response.json(pegarTodosEventos);
  },

  async editarEvento(request, response){
    const {id,...params} = request.body

    await connection('eventos')
    .where('id',id)
    .update(params)

    const dadosModificados = await connection('eventos')
    .where('id', id)
    .select('*')
    .first()

    return response.json(dadosModificados);
  },

  async deletaEvento(request, response){
    const {id} = request.params;

    const procurarIdNoDB = await connection('eventos')
    .where('id',id)
    .select()
    .first()

    if(!procurarIdNoDB){
      return response.status(400).send({error:'Id não foi encontrado!!'});
    }

    await connection('eventos')
    .where('id',id)
    .delete()

    return response.status(204).send()
  }
}