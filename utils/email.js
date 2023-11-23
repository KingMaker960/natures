const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `No reply ${process.env.EMAIL_FROM}`;
  }

  newTransport() {
    // if (process.env.NODE_ENV === 'production') {
    //   //real mail implementation
    //   return 1;
    // }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  //Send the actual email
  async send(template, subject) {
    //1. Render HTML based on a pug template
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      },
    );

    //2. Define email options
    const emailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.convert(html),
    };

    //3. Create a transport and send email
    await this.newTransport().sendMail(emailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome To The Natures Family!');
  }

  async sendPasswordReset() {
    await this.send('passwordReset', 'resetpassword@natures');
  }
};

// const sendEmail = async (options) => {
//   //1. Create Trasnporter
//   //a. Using Gmail
//   // const transporter = nodemailer.createTransport({
//   //     service:'Gmail',
//   //     auth:{
//   //         user:process.env.EMAIL_USERNAME,
//   //         pass:process.env.EMAIl_PASSWORD,

//   //     }
//   //     //activate in gmail "less secure app" option
//   // });
//   //b.Using MailTrap

//   //2. Define the email options
//   const emailOptions = {
//     from: 'Abhishek Shukla <cyberworld960@gmail.com>',
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//   };

//   //3. Actually semd the email
//   await transporter.sendMail(emailOptions);
// };
