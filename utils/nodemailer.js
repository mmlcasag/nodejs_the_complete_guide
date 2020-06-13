const nodemailer = require('nodemailer');

const sendgridTransport = require('nodemailer-sendgrid-transport');

const SENDGRID_CONFIG = { auth: { api_key: 'SG.NwMwCwGXSSGpXqTtQwbT4Q.18lcskMKjrFf0s06hB4lTRBMcXT1bl8CK1EGd16tQS0' } };

const transporter = nodemailer.createTransport(sendgridTransport(SENDGRID_CONFIG));

module.exports = transporter;