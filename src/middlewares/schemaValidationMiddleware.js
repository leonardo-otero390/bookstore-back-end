export default function schemaValidation(schema) {
  return (req, res, next) => {
    const validation = schema.validate(req.body);
    if (validation.error) {
      res.status(400).send('Todos os campos devem ser devidamente preenchidos');
      return;
    }

    next();
  };
}
