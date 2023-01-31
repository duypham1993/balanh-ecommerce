import jwt from "jsonwebtoken";

export const verifyTokenAdmin = (req, res, next) => {
  const authHeader = req.headers.accesstoken;
  const cookies = req.cookies;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err && cookies?.jwtAdmin) return res.status(401).json("Token expired");
      if (err && !cookies?.jwtAdmin) return res.status(403).json("logout");

      req.user = user;
      next();
    })
  }
};

export const verifyTokenRoleAdmin = (req, res, next) => {
  verifyTokenAdmin(req, res, () => {
    if (req.user.role == "Admin") {
      next();
    } else {
      res.status(403).json("Bạn chưa được cấp quyền thực hiện thao tác này!");
    }
  });
};

export const verifyTokenClient = (req, res, next) => {
  const authHeader = req.headers.accesstoken;
  const cookies = req.cookies;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_KEY_CLIENT, (err, user) => {
      if (err && cookies?.jwtClient) return res.status(401).json("Token expired");

      if (err && !cookies?.jwtClient) return res.status(403).json("logout");

      req.user = user;
      next();
    })
  }
};