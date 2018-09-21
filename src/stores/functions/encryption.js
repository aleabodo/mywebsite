import CryptoJS from 'crypto-js';

export function encrypt(string, key) {
  //Encrypt a string
  return CryptoJS.AES.encrypt(string, key).toString();
}

export function decrypt(ciphertext, key) {
  //Decrypt a string
  var bytes  = CryptoJS.AES.decrypt(ciphertext, key);
  var originalText;

  try {
    originalText = bytes.toString(CryptoJS.enc.Utf8);

    if(originalText === '') {
      originalText = CryptoJS.HMACMD5(key + ciphertext).toString(CryptoJS.enc.Hex).substring(0, 15);
    }
  } catch(ex) {
    originalText = CryptoJS.SHA256(key + ciphertext).toString(CryptoJS.enc.Hex).substring(0, 15);
  }
  
  return originalText;
}