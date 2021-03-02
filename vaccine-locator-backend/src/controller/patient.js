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
  console.log("Patient",patient);
  try {
    await patient.save();
    const token = await patient.generateAuthToken();
    res.status(201).send({ patient, token });
    console.log("Hello");
  } catch (e) {
    res.status(400).send(e);
    console.log("Hello", e);
  }
};

exports.signIn = async (req, res) => {
  try {
    const user = await Patient.findByCredentials(req.body.Email, req.body.Password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
};
