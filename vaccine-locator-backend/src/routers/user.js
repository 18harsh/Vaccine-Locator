const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router.post('/users', async (req, res) => {
    firstName = req.body.Fname;
    lastName = req.body.Lname;
    Email = req.body.Email;
    password = req.body.Password;
    phoneNo = req.body.Phoneno;
    AadharNo = req.body.AadharNo;
    const user = new User(req.body)
    console.log(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        // res.status(201).send({ user, token })
        console.log("Hello")
    } catch (e) {
        // res.status(400).send(e)
        console.log("Hello",e)
    }
})


router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.Email, req.body.Password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

module.exports = router
