const Patient = require("../models/Patient");
const {validationResult} = require('express-validator');
const distance = require('google-distance-matrix');
distance.key('AIzaSyD09ZcG7fHZltsAOsKjxq5Eww4xEIfXZNc');
distance.units('metric');


exports.getNearestClinics = async (req, res) => {



}
