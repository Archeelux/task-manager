const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "archeelux@gmail.com",
        subject: "Thanks for joining in!",
        text: `Hello ${name}, welcome to the app! Let me know how you get on with the app.`
    });
};

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "archeelux@gmail.com",
        subject: "Sad to see you go!",
        text: `Hello ${name}, thanks for trying the app out, can we maybe help you in any way?`
    });
};

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
};
