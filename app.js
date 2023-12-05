const http = require("http");
const express = require("express");
const mongo = require("mongoose");
const bodyParser = require("body-parser");
const mongoconnect = require("./config/dbconnection.json");
const path = require("path");

const {
  authenticate,
  show,
  add,deleteclass
} = require("./controller/userController");
mongo
  .connect(mongoconnect.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongo connecter"))
  .catch((err) => console.log(err));

const userRouter = require("./routes/user");

var app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/user", userRouter);

const server = http.createServer(app);
const io = require("socket.io")(server);
io.on("connection", (socket) => {
  console.log("user connected");
  socket.emit("msg", "user is connected");

 

  socket.on("connectUser", async (data) => {
    // Utilisez les données directement sans dépendre de req.body
    await authenticate(data, (result) => {
      socket.emit("connectUser", result);
    });
  });


  socket.on('registerUser', async (data) => {
    try {
      // Call the add function with the user data
      await add(data, (result) => {
        // Emit the result back to the client
        socket.emit('registerUser', result);
      });
    } catch (error) {
      console.error(error);
      socket.emit('registerUser', { success: false, error: error.message });
    }
  });

  socket.on('deleteUser', async (data) => {
    try {
      // Ensure that data.userId or the correct property is used
      const userId = data.userId;

      // Call the delete function with the user ID
      await deleteclass(userId, (result) => {
        // Emit the result back to the client
        socket.emit('deleteUser', result);
      });
    } catch (error) {
      console.error(error);
      socket.emit('deleteUser', { success: false, error: error.message });
    }
  });

  socket.on("aff", async () => {
    try {
      const data = await show();
      console.log('Data to send:', data);
      if (data) {
        io.emit('aff', data);
      } else {
        console.error('Error fetching user data or data is undefined');
        socket.emit('aff_error', { error: 'Internal Server Error' });
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      socket.emit('aff_error', { error: 'Internal Server Error' });
    }
  });





  socket.on('logout', () => {
    console.log('User logged out');
    io.emit('userDisconnect', 'user disconnect');  
  });


  socket.on("disconnect", () => {
    console.log("user disconnect");
    io.emit("msg", "user disconnect");
  });
});
server.listen(3000, console.log("server run"));
module.exports = app;
