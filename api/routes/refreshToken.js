import Admin from "../models/Admin";
import jwt from "jsonwebtoken";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401).json("Cookies not found");

  const refreshToken = cookies.jwt;

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

  const user = await Admin.findOne({ refreshToken: refreshToken }).exec();

  if (!user) {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, async (err, decoded) => {
      if (err) return res.status(401).json(err);

      const hackedUser = await Admin.findOne({ _id: decoded._id }).exec();
      hackedUser.refreshToken = [];
      await hackedUser.save();
    })
    return res.status(401).json("user has been hacked");
  }

  const newRTArr = user.refreshToken.filter(item => item !== refreshToken);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, async (err, decoded) => {
    if (err) {
      user.refreshToken = [...newRTArr];
      await user.save();
      return res.status(401).json(err);
    }

    if (user._id != decoded._id) return res.status(401).json("????");

    const accessToken = jwt.sign(
      {
        _id: user._id,
        isActive: user.isActive,
        role: user.role
      },
      process.env.JWT_KEY,
      { expiresIn: '15m' }
    );

    const newRefreshToken = jwt.sign(
      {
        _id: user._id,
        role: user.role,
        isActive: user.isActive
      },
      process.env.REFRESH_TOKEN_KEY
    )

    user.refreshToken = [...newRTArr, newRefreshToken];
    await user.save();

    res.cookie('jwt', newRefreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
    res.status(201).json({ accessToken });
  })
});

module.exports = router;