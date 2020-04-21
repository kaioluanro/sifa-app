const connection = require('../database/connection');
const util = require('../util/Util');

module.exports= {
  async loginPorIdMembros(request, response){
    const { id } = request.body
    const procuraGsmembros = await connection('gsmembros')
    .where('id', id)
    .select('id')
    .first()

    if(!procuraGsmembros){
        return response.status(400).json({error:'ID nao é invalido, Você não Acesso!!'})
    }

    return response.json(procuraGsmembros)
  },

  async loginPorEmailSenha(request,response){
    const {email , senha} = request.body;

    const procurarEmailnoDB = await connection('gsmembros')
    .where('email1', email).orWhere('email2',email)
    .select('id','email1','email2','senha1','senha2','membro_gs')
    .first()

    if(!procurarEmailnoDB){
      return response.status(400).json({error:'Email não existe, por favor coloque email valido, ou, caso nao consigar acessar, entre contato como o desenvolvedor.'})
    }

    const {senha1 , senha2} = procurarEmailnoDB;

    if(senha1 !== senha && senha2 !== senha){
      return response.status(400).json({error:'A senha informada não é valida!!'})
    }

    const {id,membro_gs} = procurarEmailnoDB;
    const token = util.geraTokenCriptografado({id,membro_gs});
    
    return response.json({token});

  }
}