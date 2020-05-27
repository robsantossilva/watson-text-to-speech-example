
const connection = require('../database/connection');

module.exports = {
  async insert(comentario){
    const {id, message, audio} = comentario;
    
    await connection('comentarios').insert({
        id,
        message,
        audio
    });
    return {
      id: id,
      message: message,
      audio: audio
    } ;
  },

  async all(){
    return await connection('comentarios').select('*').orderBy('created_at', 'desc');
  },

  async delete(id){
    if(id){
      return await connection('comentarios').where('id',id).del();
    }    
  }

}