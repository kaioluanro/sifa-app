module.exports={
  permicaoParaExecutar(request, response,next){
    const {codigo} = request.params

    if(codigo === process.env.CODIGO){
      console.log('>>>Download da Tabela Ejc Membros')
      next();
    }else{
    return response.status(400).send({error:'Você não tem permissão!!'})
    }
  }
}