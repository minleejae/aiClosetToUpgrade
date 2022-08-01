import express from 'express';
import router from './routes/index.js';
// import passport from 'passport';
// import swaggerJsdoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';
// import swaggerOptions from './swagger/swagger';
// import router from './routes';
// import errorHandler from './utils/error/errorHandler';

const app= express();
// const cors = require('cors');

// app.use(passport.initialize());
app.use(express.json());
// app.use(cors({
//   origin: [

//   ],
//   credentials: true,
// }));

// passport.use('jwt', JwtStrategy);

app.get('/welcome', (req, res) => {
  res.send('welcome!');
});

// Swagger 연결
// const specs = swaggerJsdoc(swaggerOptions);
// app.use(
//   '/swagger',
//   swaggerUi.serve,
//   swaggerUi.setup(specs, { explorer: true }),
// );

// dev route
// app.use('/api', router);

// 에러 핸들러
app.use(function(err, req, res, next) {
  res.json(err.message);
});
export default app;