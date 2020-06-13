// first let's import nodemailer
const nodemailer = require('nodemailer');
// then let's import the sendgrid compatibility
const sendgridTransport = require('nodemailer-sendgrid-transport');
// log in to your sendgrid account, generate a new api key and paste it here
const SENDGRID_CONFIG = { auth: { api_key: 'SG.NwMwCwGXSSGpXqTtQwbT4Q.18lcskMKjrFf0s06hB4lTRBMcXT1bl8CK1EGd16tQS0' } };
// now we need to initialize a transporter
const transporter = nodemailer.createTransport(sendgridTransport(SENDGRID_CONFIG));
// now you can send emails using this transporter
// so now we want to send an email after signing up
// so let's edit the postSignup method
module.exports = transporter;