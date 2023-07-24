const {HttpError} = require("../helpers");

const isValidFavorite = schema => {
    const func = (req, res, next)=> {
      if (Object.keys(req.body).length === 0) {
        throw HttpError(400, "missing field favorite");
        // next (HttpError(400, "missing field favorite"));
      }
        const { error } = schema.validate(req.body);
        if (error) {
            next(HttpError(400, error.message));
        }
        next()
    }

    return func;
}

module.exports = isValidFavorite;