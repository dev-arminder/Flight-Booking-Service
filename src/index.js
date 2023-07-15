const express = require('express');
const app = express();
const { serverConfig } = require('./config')
const apiRoutes = require('./routes')


app.use('/api', apiRoutes)

app.listen(serverConfig.PORT, () => {
  console.log(`Server Started On Port - ${serverConfig.PORT}`)
})