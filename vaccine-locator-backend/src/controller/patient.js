const Patient = require("../models/Patient");
const {validationResult} = require('express-validator');

exports.signUp = async (req, res) => {
  firstName = req.body.Fname;
  lastName = req.body.Lname;
  Email = req.body.Email;
  password = req.body.Password;
  phoneNo = req.body.Phoneno;
  AadharNo = req.body.AadharNo;

  const errors = validationResult(req);
  if (!errors.isEmpty()){

    return res.status(422).send({
        errorMessage: errors.array()[0].msg,
    });
}
  const patient = new Patient(req.body);

  try {
    await patient.save();
    const token = await patient.generateAuthToken();
    res.status(201).send({ patient, token });

  } catch (e) {
    res.status(400).send(e);

  }
};

exports.signIn = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {

    return res.status(422).send({
      errorMessage: errors.array()[0].msg,
    });
  }
  try {
    const patient = await Patient.findByCredentials(req.body.email, req.body.password);
    const token = await Patient.generateAuthToken();
    res.send({ patient, token });
  } catch (e) {

    res.status(400).send({error:e});
  }
};
