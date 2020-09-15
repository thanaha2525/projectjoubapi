const dialogFlow = require("../controllers/textQuery");
const sql = require("mssql");
const db = require("../bin/config/db");
const chatbot = require("../bin/setup/chatbot");
const request = new sql.Request();

module.exports = (app) => {
  app.get("/", function (req, res) {
    res.json({ message: "DFT-Chatbot" });
  });
  app.post("/api/df_text_query", dialogFlow.queryText);
  app.post("/api/df_event_query", dialogFlow.queryEvent);
};
