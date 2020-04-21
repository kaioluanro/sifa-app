const connection = require('../database/connection');

module.exports = {
  async listaComPaginasMembrosEjc(request,response){
    const {page = 1} = request.query;
    
    const [count] = await connection('ejcmembros').count();

    const buscarTodosdoDBePaginar = await connection('ejcmembros')
    .limit(5)
    .offset((page - 1) * 5)
    .select('*');

    response.header('X-Total-Count', count['count(*)'])

    return response.json(buscarTodosdoDBePaginar);
  }
}