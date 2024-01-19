import jwt from "jsonwebtoken";

export const verifyCreator = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "unautorized accessing" });
  } else {
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (err) {
        return res.json({ message: "invalid token" });
      } else {
        req.username = payload.username;
        req.role = payload.role;
        next();
      }
    });
  }
};

export const verifyAll = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "unautorized accessing" });
  } else {
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (err) {
        jwt.verify(token, process.env.SECRET_KEY_USER, (err, payload) => {
          if (err) {
            return res.json({ message: "invalid token" });
          } else {
            req.username = payload.username;
            req.role = payload.role;
            next();
          }
        });
      } else {
        req.username = payload.username;
        req.role = payload.role;
        next();
      }
    });
  }
};
