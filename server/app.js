import express from 'express';
import router from './routes/index.js';
import mongoose from 'mongoose';
import {createServer} from 'http';
import {Server} from 'socket.io';
import cors from 'cors';

const app = express();
export const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

mongoose.connect("mongodb://localhost:27017/Ocloset");

mongoose.connection.on("connected", () => {
    console.log('DB connect success');
})

mongoose.connection.on("error", (err) => {
    console.log(err);
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('images'));


app.get('/welcome', (req, res) => {
  res.send('welcome!');
});


// dev route
app.use('/api', router);

// 에러 핸들러
app.use(function(err, req, res, next) {
  res.json(err.message);
});


const port = '8070';

server.listen(port, () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: ${port}🛡️
  ################################################
    `);
});
export default app;