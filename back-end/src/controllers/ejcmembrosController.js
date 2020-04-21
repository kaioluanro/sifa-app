const Util = require('../util/Util');

const connection = require('../database/connection');

module.exports= {
 async create(request, response){
    const {nome,data_niver,data_nascimento,genero,circulo,endereço,ejc,telefone,estado,cargos_ocupados,foto} = request.body;

    const id=Util.geraIdCriptografado();
    const presenca = 0; 

    await connection('ejcmembros').insert({
      id,
      nome,
      data_niver,
      data_nascimento,
      genero,
      circulo,
      endereço,
      ejc,
      telefone,
      estado,
      cargos_ocupados,
      presenca,
      foto
    })
    
    return response.status(200).send()
  },

  async listaTodoEjc(request, response){
    const todosMembrosEjc = await connection('ejcmembros').select('*')

    return response.json(todosMembrosEjc)
  },

  async editarDadosMembroEjc(request, response){
    const {id,...params} = request.body

    await connection('ejcmembros')
    .where('id', id)
    .update(params)

    const dadosModificados = await connection('ejcmembros')
    .where('id', id)
    .select('*')
    .first()

    return response.json(dadosModificados);

  },

  async deletaUmMembroEjc(request,response){
    const {id} = request.params;

    const buscarMembroEjc = await connection('ejcmembros')
    .where('id', id)
    .select()
    .first()

    if(!buscarMembroEjc){
      return response.status(400).json({error:'Id não encontrado'})
    }

    await connection('ejcmembros').where('id',id).delete();

    return response.status(204).send();
  }
}