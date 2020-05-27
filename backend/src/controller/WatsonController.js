
TextToSpeech = require('../service/TextToSpeech');
Comentario = require('../model/Comentario');
ComentarioRepository = require('../service/ComentarioRepository');

module.exports = {
    async synthesize (req, res) {

      const { message } = req.body;

      /*
      * 1 - Cria uma novo comentário
      */
      var comentario = {};
      try {
        comentario = Comentario.create({message:message});
      } catch (error) {
        if(error){
          return res.json({message: error.getMessage()})
        }
      } 


      /*
      * 2 - Text to Speech
      */
      try {
        var nomeAudio = comentario.id;
        nomeAudioComExtensao = await TextToSpeech.synthesize(comentario.message, nomeAudio);
      } catch (error) {
        if(error){
          return res.json({message: error});
        }
      }
      

      /*
      * 3 - Faz a persistência no banco
      */
      comentario.audio = nomeAudioComExtensao.fileName;
      try {
        comentario = await ComentarioRepository.insert(comentario);
      } catch (error) {
        if(error){
          return res.json({message: error});
        }
      }
      
        
      return res.json(comentario);

    },

    async comentarios(req, res){

      var all;
      try {
        all = await ComentarioRepository.all();
      } catch (error) {
        if(error){
          return res.json({message: error});
        }
      }
      
        
      return res.json(all);
    },

    async deleteComentario(req, res){

      const {id} = req.params;

      try {
        await ComentarioRepository.delete(id);
      } catch (error) {
        if(error){
          return res.json({message: error});
        }
      }
      
        
      return res.json({message:'Excluido com sucesso!'});
    }
}