const chatbot = require("../bin/setup/chatbot");
const sql = require("mssql");
const db = require("../bin/config/db");
const request = new sql.Request();

module.exports.queryText = async (req, res) => {
  let responses = await chatbot.textQuery(
    req.body.text,
    req.body.userID,
    req.body.parameters
  );
  // console.log(`ข้อความ : ${responses[0].queryResult.fulfillmentText}`);
  // console.log(`userId : ${req.body.userID}`);
  // console.log(responses[0].queryResult);
  // console.log(responses[0].queryResult.intent.displayName);

  // แค่รับมายังไม่ต่อกับ dialogflow
  // ทำเสดแล้วเหลือ fullfil
  const querytext = `INSERT INTO history (intent, question, answer ) 
  VALUES ('${responses[0].queryResult.intent.displayName}', '${responses[0].queryResult.queryText}','${responses[0].queryResult.fulfillmentText}')`;
  // console.log(querytext);
  db.query(querytext);
  res.json(responses[0].queryResult);
};

module.exports.queryEvent = async (req, res) => {
  let responses = await chatbot.eventQuery(
    req.body.event,
    req.body.userID,
    req.body.parameters
  );

  res.json(responses[0].queryResult);
};
