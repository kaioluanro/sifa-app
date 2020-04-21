const createCsvWrite = require('csv-writer').createObjectCsvWriter
const request = require('supertest');
const app = require('../server');
const convertCsvToXlsx = require('@aternus/csv-to-xlsx');


conc()
async function conc(){

  const csvWriter = createCsvWrite({
    path:'src/csv/file.csv',
    header:[
      {id:'nome',title:'NOME'},
      {id:'data_nascimento',title:'DATA DE NASCIMENTO'},
      {id:'genero',title:'GENERO'},
      {id:'endereço',title:'ENDEREÇO'},
      {id:'ejc',title:'EJC'},
      {id:'telefone',title:'TELEFONE'},
      {id:'estado',title:'ESTADO'},
      {id:'cargos_ocupados',title:'CARGAS OCUPADOS'},
      {id:'presenca',title:'PRESENÇA'},

    ]
  });

  const response = await request(app)
  .get('/ejcmembros/listacompletaejc')

  const records = response.body

  return csvWriter.writeRecords(records)
  .then(()=>{
    console.log('...Done');
    
  })
  
}

cvsToXlsx()
function cvsToXlsx(){
  try{
    convertCsvToXlsx('src/csv/file.csv','src/csv/file.xlsx')
  }catch{
    console.error(e.toString());
  }
}