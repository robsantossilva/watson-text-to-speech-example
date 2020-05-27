Exception = require('../utils/Exception');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
    create(comentario){

      //const {message, audio} = comentario;
      if(!comentario){
        throw Exception("O parametro 'comentario é obrigatório'");
      }

      if(!comentario.message){
        throw Exception("A 'message' é obrigatório'");
      }

      id = generateUniqueId();

      return {
        id: id,
        message: comentario.message,
        audio: ''
      }
    }
}