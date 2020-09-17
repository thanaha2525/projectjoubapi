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
      res.status(404).json({error:"Cannot Found Result"})
      return;
    }
    res.status(200).json({rs})
    // res.render("Manage", { rs })
  });
};

module.exports.getHistory = (req, res) => {
  const qt = "SELECT * FROM history ORDER BY datecreate DESC";
   db.query(qt, (err, rs) => {
    if (err) {
      console.log(err);
      res.status(404).json({error:"Cannot Found Result "})
      return;
    } else {
      res.status(200).json({rs})
      // res.render("History", { result: rs });
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
      res.status(404).json({error:"Can not found result"})
      console.log(err);
    }
    console.log(rs[0].catalog_id)
    const qtrs = `select name from catalog where id = ${rs[0].catalog_id}`;
     db.query(qtrs, (err, rss) => {
      if (err) {
        res.status(404).json({error:"Can not found result"})
        console.log(err);
      }
      res.status(200).json({intent:rs[0],response:rss[0]})
      // res.render("view", { result: rs[0], ca: rss[0] });
    });
  });
};

module.exports.createAnswer = (req, res) => {
  const qt = `INSERT INTO resdialogflow (intentId,response,isActive) 
                VALUES ('${req.body.id}','${req.body.response}',1)`;
   db.query(qt, (err, rs) => {
    if (err) {
      res.status(400).json({error:"Cannot Create Answer"})
      console.log(err);
      return;
    } else {

      res.status(200).json({status:"success",result:rs});
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
      res.status(400).json({error:"Can not Update Answer"})
      console.log(err);
      return;
    }
    // console.log(qt);
    // res.writeHead(301, {
    //   Location: "/manage",
    // });
    res.status(200).json({result:success})
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
      res.status(404).json({error:"Can not found result"})
      console.log(err);
    }
    const qtrs = `select name from catalog where id = ${rs[0].catalog_id}`;
     db.query(qtrs, (err, rss) => {
      res.status(404).json({error:"Can not found result"})
      if (err) {
        console.log(err);
      }

      res.status(200).json({ intent:rs[0],answer:rss[0] })
      // res.render("edit", {  rs :rs[0] ,  rss: rss[0] });
    });
  });
};
