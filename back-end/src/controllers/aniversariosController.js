const connection = require('../database/connection');

module.exports={
 async hojeMeuNiver(request, response){
    let data = new Date();

    let dia = data.getDate();
    let mes = data.getMonth();

    const dataAtual = `${dia}/${mes+1}`

    const buscarAniversariantesNoDB = await connection('ejcmembros')
    .where('data_niver',dataAtual)
    .select('*');

    return response.json(buscarAniversariantesNoDB);
  }
}