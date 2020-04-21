const request = require('supertest');
const gsmembroController = require('../../src/controllers/gsmembroController');
const connection = require('../../src/database/connection');
const app = require('../../src/server');

describe('Eventos Funções',()=>{
  beforeAll(async ()=>{
    await connection.migrate.rollback();
    await connection.migrate.latest();
  })

  afterAll(async ()=>{
    // await connection.destroy();
  })

  it('Cadastrar um envento no DB',async()=>{
    const response = await request(app)
    .post('/eventos')
    .send({
      evento_nome:"tevento",
      data:"30/06/1995",
      n_participantes:0
    });

    expect(response.status).toBe(204)
  })

})