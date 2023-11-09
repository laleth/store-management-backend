const express = require("express")
const userModel = require("../models/userModel")


const router = express.Router()

router.post("/register", async (req, res) => {
    try {
        const newUser = new userModel({...req.body, verified : true})
        await newUser.save()
        res.send("User registered successfully")
    } catch (error) {
        res.status(400).json(error)
    }
})

router.post("/login", async (req, res) => {
    try {
        const user = await userModel.findOne({
            userId: req.body.userId,
            password: req.body.password,
            verified: true,
        })
        if (user) {
            res.send(user)
        } else {
            res.status(400).send({ message: "Login Failed", user })
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports=router