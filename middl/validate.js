const yup = require("yup");

const validate = async (req, res, next) => {
  try {
    const Schema = yup.object().shape({
      username: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required(),
      role: yup.string().oneOf(["admin", "user"]).required(), // Define valid roles

    });
    await Schema.validate(req.body);
    next();
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
};

module.exports = validate;
