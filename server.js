const express = require('express');
const limiter = require('express-rate-limit');
const app = express();
const PORT = 3000;

app.use(
  limiter({
    windowMs: 3000,
    max: 300,
    message: 'Слишком много запросов с одного IP'
  })
);

app.use(express.static(`${__dirname}/static`));
app.get('*/',function(req, res){
  res.sendfile(__dirname + '/static/index.html');
});

app.listen(PORT, function() {
  console.log(`Server access: http://localhost:${PORT}/`);
});