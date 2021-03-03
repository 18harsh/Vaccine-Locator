const Patient = require("../models/Patient");

exports.signUp = async (req, res) => {
  firstName = req.body.Fname;
  lastName = req.body.Lname;
  Email = req.body.Email;
  password = req.body.Password;
  phoneNo = req.body.Phoneno;
  AadharNo = req.body.AadharNo;
  console.log(JSON.stringify({
    firstName: firstName,
    lastName: lastName,
    email: Email,
    password: password,
    phoneNo: phoneNo,
    aadharNo: AadharNo,
  }));
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
  try {
    const patient = await Patient.findByCredentials(req.body.email, req.body.password);
    const token = await patient.generateAuthToken();
    res.send({ patient, token });
  } catch (e) {

    res.status(400).send(e);
  }
};