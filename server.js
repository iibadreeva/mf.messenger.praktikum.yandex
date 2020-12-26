const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static(`${__dirname}/static`));
app.get('*/',function(req, res){//get,put,post,delete
  res.sendfile(__dirname + '/static/index.html');
});

app.listen(PORT, function() {
  console.log(`Server access: http://localhost:${PORT}/`);
});