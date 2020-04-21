const request = require('supertest');
const gsmembroController = require('../../src/controllers/gsmembroController');
const connection = require('../../src/database/connection');
const app = require('../../src/server');

describe('Gs membros Funções',()=>{
  beforeAll(async ()=>{
    await connection.migrate.rollback();
    await connection.migrate.latest();
  })

  afterAll(async ()=>{
    await connection.destroy();
  })



  it('VALIDAÇÃO dos campos do cadastro do Membros do Gs',async()=>{
    
    const responseCargoError = await request(app)
    .post('/gsmembros')
    .send({
      cargo:123,
      email1:"test@test.com",
      email2:"test@test2.com",
      senha1:"test",
      senha2:"test2",
      membro_gs:true
    })

    expect(responseCargoError.status).toBe(400);


    const responseEmail1 = await request(app)
    .post('/gsmembros')
    .send({
      cargo:"pos-encontro",
      email1:"test",
      email2:"test@test2.com",
      senha1:"test",
      senha2:"test2",
      membro_gs:true
    })

    expect(responseEmail1.status).toBe(400);

    const responseEmail2 = await request(app)
    .post('/gsmembros')
    .send({
      cargo:"pos-encontro",
      email1:"test@test.com",
      email2:"test",
      senha1:"test",
      senha2:"test2",
      membro_gs:true
    })

    expect(responseEmail2.status).toBe(400);

    const responseSenha1 = await request(app)
    .post('/gsmembros')
    .send({
      cargo:"pos-encontro",
      email1:"test@test.com",
      email2:"test@test2.com",
      senha1:123,
      senha2:"test2",
      membro_gs:true
    })

    expect(responseSenha1.status).toBe(400);
    
    const responseSenha2 = await request(app)
    .post('/gsmembros')
    .send({
      cargo:"pos-encontro",
      email1:"test@test.com",
      email2:"test@test2.com",
      senha1:"test",
      senha2:123,
      membro_gs:true
    })

    expect(responseSenha2.status).toBe(400);
    
    const responseMembroGs = await request(app)
    .post('/gsmembros')
    .send({
      cargo:"pos-encontro",
      email1:"test@test.com",
      email2:"test@test2.com",
      senha1:"test",
      senha2:"test2",
      membro_gs:"test"
    })

    expect(responseMembroGs.status).toBe(400);


  })


  it('CRIAR um Cargo no Gs Membros || VERIFICA se o Id Existe no Banco de Dados', async ()=>{

    const response = await request(app)
    .post('/gsmembros')
    .send({
      cargo:"pos-encontro",
      email1:"test@test.com",
      email2:"test@test2.com",
      senha1:"test",
      senha2:"test2",
      membro_gs:true
    })

    const idDeAcesso = response.body.id;

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);

    const responseIdValido = await request(app)
      .post('/sessions')
      .send({
        id:idDeAcesso
      })
      
    expect(responseIdValido.body.id).toBe(idDeAcesso);
    
  })

  it('DELETA um Membro do GS ou PASTA', async()=>{
    
    const responseCreate = await request(app)
    .post('/gsmembros')
    .send({
      cargo:"pos-encontro",
      email1:"test@test.com",
      email2:"test@test2.com",
      senha1:"test",
      senha2:"test2",
      membro_gs:true
    })

    const buscarIdNoDB = await request(app).get('/gsmembros');
    
    const response = await request(app)
    .delete('/gsmembros/:id')
    .send(buscarIdNoDB.body[0].id)

    expect(response.status).toBe(204);

  })

  it('LISTAR Todos os membros do Gs do DB', async ()=>{

    const response = await request(app).get('/gsmembros');

    expect(response.status).toBe(200);
  })


}

)