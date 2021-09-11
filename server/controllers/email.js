const nodeMailer = require("nodemailer");

const email = (req, res) => {
  try {
    const { email, name, company, phone, message } = JSON.parse(req.body.body);

    let transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_URL,
        pass: process.env.EMAIL_PASS
      }
    });

    let mailOptions = {
      from: `"Bludelego ${email}" `, // sender address
      to: process.env.EMAIL_URL, // list of receivers
      subject: "From bludelego site",
      text: "Hello world?", // plain text body
      html: `
        <strong>name</strong>: ${name}<br>
        <strong>company</strong>: ${company}<br>
        <strong>phone</strong>: ${phone}<br>
        <strong>message</strong>: ${message}
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        // console.log('Email error ' + error);
        res.json({ message: "Error" });
        return console.log(error);
      }
      // console.log('Message %s sent: %s', info.messageId, info.response);
      res.json({ message: "Successs" });
    });
    // res.json({ some: req });
  } catch (e) {
    console.log(e, "e");
  }
};

module.exports = { email };
