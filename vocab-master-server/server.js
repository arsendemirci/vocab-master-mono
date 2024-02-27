require('dotenv').config()
const app = require("./app/index");


const port = process.env.PORT || "3000";
var server = app.listen(port, () => {
  var host = `localhost`;
  var port = server.address().port;
  console.log("Vocab-Master app listening at http://%s:%s", host, port);
});
