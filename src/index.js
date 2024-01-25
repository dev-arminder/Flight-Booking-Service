const express = require('express');
const app = express();
const { ServerConfig } = require('./config')
const apiRoutes = require('./routes')

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api', apiRoutes)

app.listen(ServerConfig.PORT, () => {
  console.log(`Server Started On Port - ${ServerConfig.PORT}`)
})