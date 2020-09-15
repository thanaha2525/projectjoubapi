const { WebhookClient } = require("dialogflow-fulfillment");
const sql = require("mssql");
const db = require("../../bin/config/db");
const { queryText } = require("../../controllers/textQuery");
const request = new sql.Request();

module.exports.getIntent = (req, res) => {
  const queryText = `SELECT *
  FROM intent
  LEFT JOIN catalog
  ON intent.catalog_id = catalog.id;`;
   db.query(queryText, (err, rs) => {
    if (err) {
      console.log(err);
      return;
    }
    res.render("Manage", { rs })
  });
};

module.exports.getHistory = (req, res) => {
  const qt = "SELECT * FROM history ORDER BY datecreate DESC";
   db.query(qt, (err, rs) => {
    if (err) {
      console.log(err);
      return;
    } else {
      res.render("History", { result: rs });
    }
  });
};

module.exports.getIntentById = (req, res) => {
  const id = req.body.id;
  const qt = `SELECT intent,response,intent.catalog_id,resdialogflow.id
  FROM resdialogflow
  LEFT JOIN intent
  ON resdialogflow.intentId = intent.id
  WHERE intent.id = ${id}`;

   db.query(qt, (err, rs) => {
    if (err) {
      console.log(err);
    }
    console.log(rs[0].catalog_id)
    const qtrs = `select name from catalog where id = ${rs[0].catalog_id}`;
     db.query(qtrs, (err, rss) => {
      if (err) {
        console.log(err);
      }
      res.render("view", { result: rs[0], ca: rss[0] });
    });
  });
};

module.exports.createAnswer = (req, res) => {
  const qt = `INSERT INTO resdialogflow (intentId,response,isActive) 
                VALUES ('${req.body.id}','${req.body.response}',1)`;
   db.query(qt, (err, rs) => {
    if (err) {
      console.log(err);
      return;
    } else {
      res.json(rs);
    }
  });
};

module.exports.updateAnswer = (req, res) => {
  const answer = req.body.answer;
  const id = req.body.id;
  const qt = `UPDATE resdialogflow
             SET response = '${answer}'
             WHERE id = '${id}';`;
   db.query(qt, (err, rs) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(qt);
    res.writeHead(301, {
      Location: "/manage",
    });
    res.end();
  });
};

module.exports.getEdit = (req, res) => {
  const id = req.body.id;
  const qt = `SELECT intent,response,intent.catalog_id,resdialogflow.id
  FROM resdialogflow
  LEFT JOIN intent
  ON resdialogflow.intentId = intent.id
  WHERE intent.id = ${id}`;

   db.query(qt, (err, rs) => {
    if (err) {
      console.log(err);
    }
    const qtrs = `select name from catalog where id = ${rs[0].catalog_id}`;
     db.query(qtrs, (err, rss) => {
      if (err) {
        console.log(err);
      }
      console.log(rs[0])
      res.render("edit", {  rs :rs[0] ,  rss: rss[0] });
    });
  });
};
