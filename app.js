const express = require('express');
const app = express();
const routes = require('./routes');

app.use('/', routes);
app.use(express.static('public'));

const PORT = process.env.PORT || 63770
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});