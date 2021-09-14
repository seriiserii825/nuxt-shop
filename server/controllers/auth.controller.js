const jwt = require("jsonwebtoken");

module.exports.login = async (req, res) => {
  const login = req.body.login;
  const password = req.body.password;
  //   console.log(login, "login");
  //   console.log(password, "password");

  try {
    if (login === process.env.LOGIN) {
      if (password === process.env.PASSWORD) {
        const token = jwt.sign(
          {
            user: login,
            userId: 1044
          },
          process.env.JWT,
          { expiresIn: "2h" }
        );

        res
          .status(200)
          .json({ status: 1, message: "You are logged in", token });
      } else {
        res.status(200).json({ status: 0, message: "User not found" });
      }
    } else {
      res.status(200).json({ status: 0, message: "User not found" });
    }
  } catch (error) {
    throw error;
    return res.status(500).json(error);
  }
};

module.exports.user = async (req, res) => {
  const token = req.headers["authorization"];
  const newToken = token.replace("Bearer ", "");
  if (token) {
    jwt.verify(newToken, process.env.JWT, (error, decode) => {
      if (error) {
        res.status(403).json({ status: 0, message: "invalid token", error });
      } else {
        res.status(200).json({ status: 1, user: decode.user });
      }
    });
  } else {
    res.status(500).json({ status: 0, message: "Please, send a token" });
  }
};

module.exports.logout = (req, res) => {
  res.status(200).json({ status: 1, message: "You are logged in", token: "" });
};
