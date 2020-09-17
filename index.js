const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.json());

app.use(bodyParser.json()); // ให้req ใช้งาน json
app.use(bodyParser.urlencoded({ extended: false }));

//กำหนดให้ view เป็นแบบ ejs set ไฟล์เก็บ view ไว้ที่ folder view
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "views")));

require("./routes/dialogflowRoute")(app);
require("./routes/fulfillmentRoutes")(app);
require("./routes/manternate")(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT);
