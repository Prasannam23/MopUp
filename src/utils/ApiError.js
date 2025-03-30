class ApiError extends Error {
  constructor(
    statuCode,
    message="Something went wrong",
    errors =[],
    stack = "" 
  ){
    super(message)
    this.statuscode = statuscode
    this.date = null
    this.message = false;
    this.errors = errors

    if(stack) {
        this.stack = stack
    }else {
        Error.captureStackTrace(this,this.constructor)
    }
  }
}

export {ApiError}