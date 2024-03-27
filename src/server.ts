import { requestIntereptor } from './utils/requestInterceptor';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import https from 'https';
import http, { Server } from 'http';
import fs from 'fs';

import siteRoutes from './routes/site';
import adminRoutes from './routes/admin';
import { fstat } from 'fs';

const app = express();

// CONFIGS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES

app.all('*', requestIntereptor);

app.use('/admin', adminRoutes);
app.use('/', siteRoutes);

// LISTEN TO SERVER 1.0
app.listen(process.env.PORT || 3000, (error?: Error) => {
  if (!error) {
    console.log('Server Running on Port 3000');
  } else {
    console.log('Error: ', error);
  }
});

// LISTEN TO SERVER
// const runServer = (port: number, server: http.Server) => {
//   server.listen(port, () => {
//     console.log(`Running at PORT ${port}`);
//   });
// };

// const regularServer = http.createServer(app);
// if (process.env.NODE_ENV === 'production') {
//   //TODO: config SSL
//   const options = {
//     key: fs.readFileSync(process.env.SSL_KEY as string),
//     cert: fs.readFileSync(process.env.SSL_CERT as string)
//   }
//   // TODO: rodar server na 80 e na 443
//   const secServer = https.createServer(options, app)
//   runServer(80, regularServer)
//   runServer(443, secServer)
// } else {
//   const serverPort: number = process.env.PORT
//     ? parseInt(process.env.PORT)
//     : 9000;
//   runServer(serverPort, regularServer);
// }
