const crypto = require('crypto');
const jwt = require('jsonwebtoken');

module.exports = {
  geraIdCriptografado(){
    const criptografa =crypto.randomBytes(4).toString('HEX');
    return criptografa
  },

  geraTokenCriptografado(data){
    let gerarToken = jwt.sign({
      data
    },process.env.SECRET,{expiresIn: '6h'});

    return gerarToken;

  }

}
