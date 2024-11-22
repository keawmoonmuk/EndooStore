const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express'); // Import swagger-ui-express
const swaggerDocument  = require('./swagger.json'); // Import swagger.json

const port = process.env.PORT || 5555; // ใช้พอร์ตจาก .env หรือค่าเริ่มต้นเป็น 3000

//import middleware
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
const { readdirSync } = require('fs');
// const authRouter = require('./routers/auth');
// const categoryRouter = require('./routers/categorie');

//ใช้ middleware
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json({
    limit:'20mb'
}));

//swagger document
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//เรียกใช้ router
// app.use('/api', authRouter);
// app.use('/api',categoryRouter )

//เรียกใช้ router แบบ .map  จะอ่านทุกไฟล์ routers
readdirSync('./routers').map((item) => app.use('/api', require('./routers/' + item)));

//start server
app.listen(port , () => {
    console.log("listen connect on port start : " + port);
    
})