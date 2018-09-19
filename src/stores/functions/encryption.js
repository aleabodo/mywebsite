function norm_to_ascii(string){return unescape(encodeURIComponent(string))};
function norm_to_unicode(string){return decodeURIComponent(escape(string))};
function crypt_sym(string,k){return String.fromCharCode.apply(undefined,string.split("").map(function(c){return c.charCodeAt(0)^(k||13)}))};

export function encrypt(string, key) {
  //Encrypt a string
  return btoa(crypt_sym(norm_to_ascii(string), key));
}

export function decrypt(string, key) {
  //Decrypt a string
  return crypt_sym(norm_to_unicode(atob(string)), key);
}