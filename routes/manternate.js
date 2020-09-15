const manage = require("../services/dialogMange/manage.controller");
const { restart } = require("nodemon");
const { request } = require("express");
module.exports = (app) => {
  app.get("/manage", manage.getIntent);
  app.get("/manage/history", manage.getHistory);
  app.post("/view", manage.getIntentById);
  app.post("/edit", manage.getEdit);
  app.get("/manage/edit/:id", manage.getIntentById);
  app.get("/history", manage.getHistory);
  app.post("/manage/intent/create", manage.createAnswer);
  app.post("/savechange", manage.updateAnswer);
};
