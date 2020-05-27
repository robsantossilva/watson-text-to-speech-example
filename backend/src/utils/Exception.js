module.exports = function(message){
  
  function _getMessage(){
    return message;
  }

  return {
    getMessage: _getMessage 
  }
}