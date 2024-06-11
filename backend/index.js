const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

connectDB()


app.use(cors())
app.use(bodyParser.json())

const employeeRoutes = require('./routes/employeeRoutes')
const assetRoutes = require('./routes/assetRoutes')
const assetCategoryRoutes = require('./routes/assetCategoryRoutes')
const transactionRoutes = require('./routes/transactionRoutes')

app.use('/employees', employeeRoutes)
app.use('/assets', assetRoutes)
app.use('/categories', assetCategoryRoutes)
app.use('/transactions', transactionRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
