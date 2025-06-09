// class ExpressError extends Error {
//     constructor(statusCode,message){
//         super();
//         this.statusCode = statusCode;
//         this.message = message;
//     }
// };

// module.exports = ExpressError;

class ExpressError extends Error {
    constructor(statusCode, message) {
      super(message); // pass message to the built-in Error constructor
      this.statusCode = statusCode;
      Error.captureStackTrace(this, this.constructor); // optional but helpful
    }
  }
  
  module.exports = ExpressError;
  