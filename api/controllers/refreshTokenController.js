import Admin from "../models/Admin.js";
import Customer from "../models/Customer.js";
import jwt from "jsonwebtoken";

export const refreshTokenAdmin = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwtAdmin) return res.status(401).json("Not found the key");

  const refreshToken = cookies.jwtAdmin;

  res.clearCookie('jwtAdmin', { httpOnly: true, sameSite: 'None', secure: true });

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

    res.cookie('jwtAdmin', newRefreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
    res.status(201).json({ accessToken });
  })
};

export const refreshTokenClient = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwtClient) return res.status(401).json("Not found the key");

  const refreshToken = cookies.jwtClient;

  res.clearCookie('jwtClient', { httpOnly: true, sameSite: 'None', secure: true });

  const user = await Customer.findOne({ refreshToken: refreshToken }).exec();

  if (!user) {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY_CLIENT, async (err, decoded) => {
      if (err) return res.status(401).json(err);

      const hackedUser = await Customer.findOne({ _id: decoded._id }).exec();
      hackedUser.refreshToken = [];
      await hackedUser.save();
    })
    return res.status(401).json("user has been hacked");
  }

  const newRTArr = user.refreshToken.filter(item => item !== refreshToken);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY_CLIENT, async (err, decoded) => {
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
      process.env.JWT_KEY_CLIENT,
      { expiresIn: '15m' }
    );

    const newRefreshToken = jwt.sign(
      {
        _id: user._id,
        role: user.role,
        isActive: user.isActive
      },
      process.env.REFRESH_TOKEN_KEY_CLIENT
    )

    user.refreshToken = [...newRTArr, newRefreshToken];
    await user.save();

    res.cookie('jwtClient', newRefreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
    res.status(201).json({ accessToken });
  })
};

