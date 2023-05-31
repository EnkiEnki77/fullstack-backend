const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if(error.name == 'CastError'){
        return res.status(400).send({error: 'malformed id'})
    }

    //passes the error to the default Express error handler if 
    next(error)
}

module.exports = {errorHandler}