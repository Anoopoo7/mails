const express = require("express");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const SingleMessage = require("./models/singleMessages");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5990;

const uri =
    "mongodb+srv://zyndicateMessaggings:DiREqo3AV0UpLfhNjDfq5BtCqbwodoAFFxNkccWmTZroIyPsl1azC4fP7ZdUc5AN@cluster0.wubob.mongodb.net/ZMessagings?retryWrites=true&w=majority";

mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log("connected");
        app.listen(PORT);
    })
    .catch((err) => console.log("err"));

let transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "mails.lxiya@gmail.com",
        pass: "rhdocmpuilyncauh",
    },
});

function constructMessage(message, keys) {
    let msg = message;
    Object.entries(keys).map((item) => {
        msg = msg.replace(item[0], item[1]);
    });
    return msg;
}

const startMail = async(result, body) => {
    console.log(result);
    const mailOptions = {
        from: "mails.lxiya@gmail.com",
        to: body.to,
        subject: result.subject,
        html: constructMessage(result.message, body.KeysWords),
    };
    transport.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
};
app.get("/", async(req, res) => {
    res.send("success")
})

app.post("/send", async(req, res) => {
    SingleMessage.findOne({
        eventId: req.body.eventId,
    }).then((result) => {
        startMail(result, req.body);
    });
    res.json({
        success: true,
        message: ["mail added to queue"],
    });
});