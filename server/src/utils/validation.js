class ValidationMiddleware {
  __validate(schema, sourceCallback) {
    return (req, res, next) => {
      const { error } = schema.validate(sourceCallback(req));
      if (error) {
        return res.status(400).json({ error: error.details.map(err => err.message) });
      }
  
      next();
    };
  }

  body(schema) {
    return this.__validate(schema, (req) => req.body);
  }

  query(schema) {
    return this.__validate(schema, (req) => req.query);
  }
}

module.exports = new ValidationMiddleware();