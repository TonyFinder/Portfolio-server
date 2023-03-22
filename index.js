const express = require('express')
const nodemailer = require("nodemailer");
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const port = process.env.PORT || 3010
const smtp_login = process.env.SMTP_LOGIN || "---"
const smtp_password = process.env.SMTP_PASSWORD || "---"

// create reusable transporter object using the default SMTP transport...
let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: smtp_login, // generated ethereal user
        pass: smtp_password, // generated ethereal password
    },
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.post('/sendMessage', async (req, res) => {
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"ANTON PORTFOLIO" <arseniev.memory@gmail.com>', // sender address
        to: "antonrozdobudko@gmail.com", // list of receivers
        subject: "✔ PORTFOLIO ✔", // Subject line
        html: `<p>Here is a message from <b>${req.body.name}</b></p>
<p>Email: <b>${req.body.email}</b></p> 
<p>Message: <b>${req.body.message}</b></p>`, // html body
    });

    res.send(req.body)
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})