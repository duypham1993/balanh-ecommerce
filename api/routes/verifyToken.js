import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      err && res.status(401).json(false);
      req.user = user;
      next();
    })
  }
};

const verifyTokenRoleAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role == "admin") {
      next();
    } else {
      res.status(403).json("Bạn chưa được cấp quyền thực hiện thao tác này!");
    }
  });
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.role === "admin") {
      next();
    } else {
      res.status(403).json("Bạn chưa được cấp quyền thực hiện thao tác này!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenRoleAdmin,
  verifyTokenAndAuthorization,
}