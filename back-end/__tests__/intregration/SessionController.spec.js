const request = require('supertest');
const gsmembroController = require('../../src/controllers/gsmembroController');
const connection = require('../../src/database/connection');
const app = require('../../src/server');
const jwt = require('jsonwebtoken');

describe('Gs membros Funções',()=>{
  beforeEach(async ()=>{
    await connection.migrate.rollback();
    await connection.migrate.latest();
  })

  afterAll(async ()=>{
    await connection.destroy();
  })

  it('Campos da Rotar do login estao validados',async()=>{
    const responseEmail = await request(app)
    .post('/sessions/login')
    .send({
      email:'test',
      senha:'test'
    })

    expect(responseEmail.status).toBe(400)

    const responseSenha = await request(app)
    .post('/sessions/login')
    .send({
      email:'test@test.com',
      senha:123456
    })

    expect(responseSenha.status).toBe(400)
  })
  
  it('Login esta validado o usuario!!', async()=>{

    const responseCreateGs = await request(app)
    .post('/gsmembros')
    .send({
      cargo:"pos-encontro",
      email1:"test@test.com",
      email2:"test@test2.com",
      senha1:"test",
      senha2:"test2",
      membro_gs:true
    })

    const response = await request(app)
    .post('/sessions/login')
    .send({
      email:'test@test.com',
      senha:'test'
    })

    expect(response.body).toHaveProperty('token')

    const VerificaToken = jwt.verify(response.body.token, process.env.SECRET)

    expect(VerificaToken.data.membro_gs).toBe(1)
  })

})