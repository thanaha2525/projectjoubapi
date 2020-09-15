const { WebhookClient } = require("dialogflow-fulfillment");
const sql = require("mssql");
const db = require("../../bin/config/db");
const { AgentsClient } = require("dialogflow");
const request = new sql.Request();
const chatbot = require("../../bin/setup/chatbot");
const { query } = require("express");

module.exports.tt = async (req, res) => {
  const querytext = `SELECT intent,response
         FROM resdialogflow
         LEFT JOIN intent
         ON resdialogflow.intentId = intent.id;`;
  intentarr = [];
  resparr = [];

  const agent = new WebhookClient({ request: req, response: res });

  db.query(querytext, (err, rss) => {
    if (err) {
      console.log(err);
    } else {
      for (var i = 0; i < rss.length; i++) {
        intentarr.push(rss[i].intent);
        resparr.push(rss[i].response);
        a = {
          in: intentarr,
          re: resparr,
        };
      }

      let intentMap = new Map();

      for (var ii = 0; ii < rss.length; ii++) {
        //ตอนนี้ได้ 1 คำถามต่อ 1 คำตอบในอนาตคต้องได้หลายคำถาม1คำตอบ
        const aws = a.re[ii];
        intentMap.set(`${a.in[ii]}`, function () {
          agent.add(`${aws}`);
        });
      }

      agent.handleRequest(intentMap);
      const ans = agent.responseMessages_;
      if(ans[0].text == undefined){
        ans = 'เอ๋ น้องไม่รู้'
      }
      const qtt = `INSERT INTO history(intent,question,answer)
                   VALUES ('${agent.intent}','${agent.query}','${ans[0].text}')`;
                   console.log(qtt)
          db.query(qtt, (err, rs) => {
        if (err) {
          console.log(err);
          return
        }
        console.log("save success");
        return;
      });
    }
  });
};
