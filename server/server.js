import app from './app.js';


const port = '8070';

app.listen(port, () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: ${port}🛡️
  ################################################
    `);
});