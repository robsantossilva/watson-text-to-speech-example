const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const routes = express.Router();

//Controllers
const WatsonController = require('./controller/WatsonController');

//Routes
routes.post(
  '/watson/synthesize', 
  celebrate({
    [Segments.BODY]: Joi.object().keys({
        message: Joi.string().required(),
    })
  }),
  WatsonController.synthesize
);

routes.delete('/comentarios/:id', WatsonController.deleteComentario);

routes.get('/comentarios', WatsonController.comentarios);

routes.use('/audio', express.static('audio'))

module.exports = routes;