const twilio = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN,
);
const sendSMS = () => {
  twilio.messages
    .create({
      body: "test twilio",
      messagingServiceSid: "MGf66f98046582a0ef312b606d074771ae",
      to: "+56989342705",
    })
    .then((message) => console.log('SMS enviado con éxito! ',message.sid))
    .done();
};



module.exports = { sendSMS };
