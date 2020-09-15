const { WebhookClient } = require("dialogflow-fulfillment");
const sql = require("mssql");
const db = require("../bin/config/db");
const request = new sql.Request();
const tt = require("../bin/fn/loopfn");

module.exports = (app) => {
  // app.post("/", async (req, res) => {
  //   const agent = new WebhookClient({ request: req, response: res });

  //   const ทดสอบจร้า = () => {
  //     agent.add("ทด");
  //   }; //มี intent 1000 ต้องสร้างหมดเลย 1000 ?

  //   let intentMap = new Map();
  //   intentMap.set("ทดสอบจร้า", ทดสอบจร้า);
  //   // intentMap.set("Default Fallback Intent", fallback);
  //   agent.handleRequest(intentMap);
  // });

  app.post("/", tt.tt);
};
