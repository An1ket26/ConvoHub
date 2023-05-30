const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes=require('./routes/authRoutes');
const socketServer=require('./socketServer')
const friendInvitationRoutes=require('./routes/friendInvitationRoutes')

require("dotenv").config();


const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());


app.use('/api/auth',authRoutes);
app.use('/api/friend-invitation',friendInvitationRoutes);


const server = http.createServer(app);
socketServer.registerSocketServer(server);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, (err) => {
      if (err) {
        console.log(err);
      }
      console.log("server hosted at 5000");
    });
  })
  .catch((err) => {
    console.error(err);
  });
