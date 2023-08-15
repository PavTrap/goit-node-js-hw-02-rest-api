// -------------NODEMAILER - UKR.NET------------- //

const nodemailer = require("nodemailer");
require("dotenv").config();

const {UKR_NET_EMAIL, UKR_NET_PASSWORD} = process.env;



const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async(data) => {
  // const data = {
  //   to: "sipetil393@weishu8.com",
  //   from: UKR_NET_EMAIL,
  //   subject: "Test email",
  //   html: "<p><strong>Test email</strong> from localhost:3000</p>"
  // };
  // transport.sendMail(data)
  //   .then(() => console.log("Email send succsess"))
  //   .catch(error => console.log(error.message));
  const email = {...data, from: UKR_NET_EMAIL};
  await transport.sendMail(email);
  return true;
}

module.exports = sendEmail;





// -------------NODEMAILER - META.UA------------- //

// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const {UKR_NET_EMAIL, UKR_NET_PASSWORD} = process.env;



// const nodemailerConfig = {
//   host: "smtp.ukr.net",
//   port: 465,
//   secure: true,
//   auth: {
//     user: UKR_NET_EMAIL,
//     pass: UKR_NET_PASSWORD,
//   },
// };

// const transport = nodemailer.createTransport(nodemailerConfig);

// const email = {
//   to: "sipetil393@weishu8.com",
//   from: UKR_NET_EMAIL,
//   subject: "Test email",
//   html: "<p><strong>Test email</strong> from localhost:3000</p>"
// };
// transport.sendMail(email)
//   .then(() => console.log("Email send succsess"))
//   .catch(error => console.log(error.message));














// -----------------ELASTICEMAIL----------------- //

// const ElasticEmail = require('@elasticemail/elasticemail-client');
// require("dotenv").config();

// const {ELASTIC_EMAIL_API_KEY} = process.env;

// const defaultClient = ElasticEmail.ApiClient.instance;

// const {apikey} = defaultClient.authentications;
// apikey.apiKey = ELASTIC_EMAIL_API_KEY;

// const api = new ElasticEmail.EmailsApi();

// const email = ElasticEmail.EmailMessageData.constructFromObject({
//   Recipients: [
//     new ElasticEmail.EmailRecipient("sipetil393@weishu8.com")
//   ],
//   Content: {
//     Body: [
//       ElasticEmail.BodyPart.constructFromObject({
//         ContentType: "HTML",
//         Content: "Verify Email"
//       })
//     ],
//     Subject: "Verify Email",
//     From: "paveltrapeznikovv@gmail.com "
//   }
// });

// const callback = function(error, data, response) {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log('API called successfully.');
//   }
// };
// api.emailsPost(email, callback);

// // https://www.youtube.com/watch?v=GiAlVWuSSXE