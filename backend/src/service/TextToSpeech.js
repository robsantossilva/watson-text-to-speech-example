const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

module.exports =  {
  async synthesize (text, fileName='audio', accept='audio/wav', voice= 'pt-BR_IsabelaVoice'){

    const textToSpeech = new TextToSpeechV1({
      authenticator: new IamAuthenticator({
        apikey: `${process.env.API_KEY_TEXT_TO_SPEECH}`,
      }),
      url: `${process.env.URL_TEXT_TO_SPEECH}`,
    });
    
    const synthesizeParams = {
      text: text,
      accept,
      voice,
    };
    
    await textToSpeech
      .synthesize(synthesizeParams)
      .then(response => {
        const audio = response.result;
        return textToSpeech.repairWavHeaderStream(audio);
      })
      .then(repairedFile => {
        fs.writeFileSync('audio/'+fileName+'.wav', repairedFile);
        console.log('audio.wav written with a corrected wav header');
      })
      .catch(err => {
        console.log(err);
      });

    return {fileName: fileName+'.wav'};
  }
}