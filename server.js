const express = require('express');
const limiter = require('express-rate-limit');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  limiter({
    windowMs: 3000,
    max: 300,
    message: 'Слишком много запросов с одного IP',
  })
);

app.use(express.static(`${__dirname}/build`));
app.get('*/', function (req, res) {
  res.sendfile(__dirname + '/build/index.html');
});

app.listen(PORT, function () {
  console.log(`Server access: http://localhost:${PORT}/`);
});
