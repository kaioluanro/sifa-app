const express = require('express');
const routes = express.Router();
const {celebrate, Segments,Joi} = require('celebrate');


const gsmembroController = require('./controllers/gsmembroController');
const sessionController = require('./controllers/SessionController');
const ejcmembrosController = require('./controllers/ejcmembrosController');
const pageMembrosEjcController = require('./controllers/pageMembrosEjcController');
const presencaMembroEjcController = require('./controllers/presencaMembroEjcController');
const aniversarioController = require('./controllers/aniversariosController');
const eventoController = require('./controllers/eventoController');
const permisaoController = require('./controllers/permicaoController');
const restController = require('./controllers/restController');
const downloadXlsx = require('./util/downloadXlsx');

const email = require('./util/email');

routes.post('/sessions', celebrate({
  [Segments.BODY]:Joi.object().keys({
    id:Joi.string().required().token()
  })
}), sessionController.loginPorIdMembros);

routes.post('/sessions/login', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email:Joi.string().required().email(),
    senha:Joi.string().required()
  })
}),sessionController.loginPorEmailSenha);



routes.post('/gsmembros', celebrate({
  [Segments.BODY]: Joi.object().keys({
    cargo:Joi.string(),
    email1:Joi.string().required().email(),
    email2:Joi.string().required().email(),
    senha1:Joi.string().required(),
    senha2:Joi.string().required(),
    membro_gs:Joi.boolean().required(),
  })

}),gsmembroController.create);

routes.put('/gsmembros',celebrate({
  [Segments.BODY]: Joi.object().keys({
    id:Joi.string().required(),
    cargo:Joi.string().required(),
    email1:Joi.string().required().email(),
    email2:Joi.string().required().email(),
    senha1:Joi.string().required(),
    senha2:Joi.string().required(),
    membro_gs:Joi.boolean().required(),
  })

}),gsmembroController.editarGsMembro);
routes.get('/gsmembros', gsmembroController.listaTodoGs);
routes.delete('/gsmembros/:id', gsmembroController.deleteUmMembroGs);



routes.get('/ejcmembros', pageMembrosEjcController.listaComPaginasMembrosEjc);
routes.get('/ejcmembros/listacompletaejc', ejcmembrosController.listaTodoEjc);
routes.delete('/ejcmembros/:id', ejcmembrosController.deletaUmMembroEjc);
routes.post('/ejcmembros',celebrate({
  [Segments.BODY]:Joi.object().keys({
    nome:Joi.string().required(),
    data_niver:Joi.string().required(),
    data_nascimento:Joi.string().required(),
    genero:Joi.string().required(),
    circulo:Joi.string().required(),
    endereço:Joi.string().required(),
    ejc:Joi.string().required(),
    telefone:Joi.string().required(),
    estado:Joi.string().required(),
    cargos_ocupados:Joi.string(),
    foto:Joi.string()
  })
}), ejcmembrosController.create);

routes.put('/ejcmembros',celebrate({
  [Segments.BODY]:Joi.object().keys({
    id:Joi.string().required(),
    nome:Joi.string().required(),
    data_niver:Joi.string().required(),
    data_nascimento:Joi.string().required(),
    genero:Joi.string().required(),
    circulo:Joi.string().required(),
    endereço:Joi.string().required(),
    ejc:Joi.string().required(),
    telefone:Joi.string().required(),
    estado:Joi.string().required(),
    cargos_ocupados:Joi.string(),
    foto:Joi.string()
  })
}),ejcmembrosController.editarDadosMembroEjc);



routes.post('/eventos',celebrate({
  [Segments.BODY]:Joi.object().keys({
    evento_nome:Joi.string().required(),
    data:Joi.string().required()
  })
}),eventoController.create)

routes.put('/eventos',celebrate({
  [Segments.BODY]:Joi.object().keys({
    id:Joi.number().required(),
    evento_nome:Joi.string().required(),
    data:Joi.string().required()
  })
}),eventoController.editarEvento)
routes.get('/eventos',eventoController.listarTodosEventos)
routes.delete('/eventos/:id',eventoController.deletaEvento)



routes.get('/restdados/:codigo',celebrate({
  [Segments.PARAMS]:Joi.object().keys({
    codigo:Joi.string().required().min(17)
  })
}),permisaoController.permicaoParaExecutar,restController.restDados)

routes.put('/presenca',presencaMembroEjcController.addPresencaMembroEjc)
routes.get('/aniversarios',aniversarioController.hojeMeuNiver)

routes.get('/download/:codigo',celebrate({
  [Segments.PARAMS]:Joi.object().keys({
    codigo:Joi.string().required().min(17)
  })
}),permisaoController.permicaoParaExecutar,downloadXlsx.download)

routes.get('/sendemail',email.enviarEmail);



module.exports = routes;