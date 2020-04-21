const nodemailer = require('nodemailer');
const connection = require('../database/connection');

module.exports={
  async enviarEmail(request, response){
    const transpoter = nodemailer.createTransport({
      service:'gmail',
      auth:{
        user:process.env.GMAIL,
        pass:process.env.PASSGMAIL
      }
    })

    const procuraEmail = await connection('gsmembros')
    .select('*')
   

    // const {email1,email2,cargo,senha1,senha2} = procuraEmail
    // const emails = [email1,email2]
    
    const resultadoBuscarEmail = procuraEmail

    resultadoBuscarEmail.map((item)=>{
      
      
      const mailOptions = {
        from:process.env.GMAIL,
        to:[item.email1,item.email2],
        subject:`Ola ${item.cargo} quero de falar algumas informação`,
        html:` <style>
        body{
        margin: 0;
        top: 0;
        padding: 0;
        font-family: Arial, Helvetica, sans-serif;
        width: 800px;
        height: 1000px;
        }
        .conteiner{
          width: 1000px;
    
        }
        .header{
          text-align: left;
          color: #181818;
          font-size: 30px;
          margin-left: 100px;
          
        }
        
        .corpo{
          background: rgba(204, 220, 221, 0.3);
          border-radius: 1.14em;
          width: 500px;
          height:600px;
          margin-top: 40px;
          margin-left: 115px;
          color: #181818;
        }
    
        .corpo-header h1{
          text-align: left;
          font-size: 120px;
          margin-left: 215px;
          color:#FF4343;
        }
        .corpo-msg h3{
          text-align: center;
          font-size: 36px;
          margin: 0;
          color:#252525;
        }
    
        .corpo-msg{
          margin: 15px;
        }
    
        .info2{
          text-align: center;
          font-style: italic;
          font-weight: bold;
          font-size: 24px;
        }
    
        .corpo-msg ul{
          font-size: 16px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          list-style: none;
          border: 1px solid #EBEBEB;
          border-radius: 1.14em;
          padding: 30px 0 30px 30px ;
          text-align: left;
          font-weight: bold;
        }
    
        .corpo-msg ul li{
          margin-bottom: 10px;
        }
    
        .data{
          font-size: 12px;
          margin-left: 15px;
        }
        
        .info{
          font-size: 14px;
          font-style: italic;
          font-weight: lighter;
          text-align: center;
        }
        .info3{
          font-size: 16px;
          font-style: italic;
          font-weight: lighter;
          
        }
    
      </style>
      <div class="conteiner" style="">
        <div class="header">
          <h1>Seja Bem Vindo ao</h1>
          </div>
          <div class="corpo-header">
            <h1>SiFa</h1>
          </div>
        <div class="corpo">
          <div class="corpo-msg">
            <h3>${item.cargo}</h3>
            <p class="info2">Essa são dados Importantes seus e de sua Banda para o Acesso ao SiFa.</p>
            <p class="info">Por Favor, guarde esses dados em segurança. </p>
            <p class="info3">Obs: Dê preferencia para Memorizar o ID e Senhar, e logo apois apague o email!</p>
            <ul>
              <li>ID:</li>
              <li class="data">${item.id}</li>
              <li>email1:</li>
              <li class="data">${item.email1}</li>
              <li>senha1:</li>
              <li class="data">${item.senha1}</li>
              <li>email2:</li>
              <li class="data">${item.email2}</li>
              <li>senha2:</li>
              <li class="data">${item.senha2}</li>
            </ul>
          </div>
        </div>
      </div>`
      }
      
      
        transpoter.sendMail(mailOptions,function (err,info){
          if(err)
            console.log(err)
          else
            console.log(info)
            return response.json(info)
        }) 
        // console.log(mailOptions)
      })
  }
}