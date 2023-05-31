const errorHandler = (error, req, res, next) => {
    console.error(error.name)

    if(error.name == 'CastError'){
        return res.status(400).send({error: 'malformed id'})
    }else if(error.name == 'ValidationError'){
        return res.status(400).send({error: error.message})
    }

    //passes the error to the default Express error handler if 
    next(error)
}

module.exports = {errorHandler}