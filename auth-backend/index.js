const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const accessTokenSecret =
  "basic-express-authentication-service-accesstokensecret";
const users = [
  {
    username: "John",
    password: "jpwd",
    role: "admin",
  },
  {
    username: "Anna",
    password: "apwd",
    role: "member",
  },
];

const loginApp = express();
loginApp.use(bodyParser.json());

loginApp.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

loginApp.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Filter user from the users array by username and password
  const user = users.find((u) => {
    return u.username === username && u.password === password;
  });

  if (user) {
    // Generate an access token
    const accessToken = jwt.sign(
      { username: user.username, role: user.role },
      accessTokenSecret,
      { expiresIn: "10m" }
    );

    console.log("login returning token " + accessToken);
    res.status(200);
    res.json({ jwt: accessToken, expiresIn: 10 });
  } else {
    console.log("login returning username or password incorrect");
    res.status(401);
    res.send("Username or password incorrect");
  }
});

loginApp.get("/learning-log", (req, res) => {
  validate(req).then((result) => {
    console.log("The validation result is: " + res);
    res.send(result);
  });
});

async function validate(req) {
  const authHeader = req.headers.authorization;
  console.log("VALIDATE - Token: " + authHeader);
  if (authHeader) {
    jwt.verify(authHeader, accessTokenSecret, (err, user) => {
      if (err) {
        console.log("VALIDATION: Returning 403 " + err);
        return 403;
      }
      console.log("VALIDATION: Returning 200");
      return 200;
    });
  } else {
    console.log("VALIDATION: Returning 401");
    return 401;
  }
}
loginApp.listen(3000, () => {
  console.log("AUTH-SERVICE: HTTP SERVER STARTED AT 3000");
});
