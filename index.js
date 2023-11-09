const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const cors = require("cors")
const itemsRoute = require("./routes/itemsRoute")
const billsRoute = require("./routes/billRoute")
const usersRoute = require("./routes/userRoute")
const app = express()
const PORT = 5000

app.use(express.json())
app.use(cors({}))
app.get("/", (req, res) => {
    res.send("Welcome to Store Management")
})

app.use("/items",itemsRoute)
app.use("/bills",billsRoute)
app.use("/users",usersRoute)

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Mongoose is connected")
        app.listen(PORT, () => console.log("Server started on the port", PORT))
    })
    .catch((error) => {
        console.log(error.message)
    })
