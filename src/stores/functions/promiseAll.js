const promiseAll = function(promises) {
  var results = [];
  var completedPromises = 0;
  return new Promise(function (resolve, reject) {
    promises.forEach(function(promise, index) {
      promise.then(function (value) {
        results[index] = value;
        completedPromises += 1;
        if(completedPromises === promises.length) {
          resolve(results);
        }
      }).catch(function (error) {
        reject(error);
      });
    });
  });
}

export default promiseAll;