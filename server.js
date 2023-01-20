const express = require('express');
const cors = require('cors');
const { application } = require('express');
const app = express();
const bodyParser = require("body-parser");
const port = 3080;

const users = [];
const dbConfig = require("./app/config/db.config");

const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const livereload = require("connect-livereload");

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);


const database = require("./app/models");
const role = database.role;
database.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


var corsOptions = {
  origin: "http://localhost:4200"
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
//app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

app.use(sessions({
  secret: "smarthashingkey",
  resave: true,
  saveUninitialized: true
}));

app.use(cookieParser());
app.use(livereload());

app.get('/', (req, res) => {
  res.json({ message: "WELCOME" });
});

app.get('/api/users', (req, res) => {
  res.json({ message: "HELLO WORLD BANK!!" });
});

app.post('/api/user', (req, res) => {
  const user = req.body.user;
  users.push(user);
  res.json("user addedd");
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});