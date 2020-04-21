const request = require('supertest');
const gsmembroController = require('../../src/controllers/gsmembroController');
const connection = require('../../src/database/connection');
const app = require('../../src/server');

describe('Ejc Membros Funções',()=>{
  beforeEach(async ()=>{
    await connection.migrate.rollback();
    await connection.migrate.latest();
  })

  afterAll(async ()=>{
    await connection.destroy();
  })

  it('Cadastra um Membro do EJC no Banco de dados ',async ()=>{
    const response = await request(app)
    .post('/ejcmembros')
    .send({
      nome:"membro test",
			data_niver:"8/4",
      data_nascimento:"30/06/1995",
      genero:"masculino",
      circulo:"verde",
      endereço:"rua test amadeil",
      ejc:"PSS",
      telefone:"086912345678",
      estado:"solteiro",
      cargos_ocupados:"sem cargos",
			foto:"oiwajdiaowjdwpao"
    })

    expect(response.status).toBe(200)
  })

})