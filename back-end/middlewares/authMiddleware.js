const jwt = require('jsonwebtoken');

// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res
//       .status(401)
//       .json({ success: false, message: 'Access token not found' });
//   }

//   jwt.verify(token, ACCESS_TOKEN_SECRET, (error, user) => {
//     if (error) {
//       return res.status(403).json({ success: false, message: 'Invalid token' });
//     }

//     // Attach userId to request after decoded user param
//     req.userId = user.userId;

//     next();
//   });
// };

// const verifyTokenAndAuthorization = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (req.user.id === req.params.id || req.user.isAdmin) {
//       next();
//     } else {
//       res.status(403).json("You are not alowed to do that!");
//     }
//   });
// };

// const verifyTokenAndAdmin = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (req.user.isAdmin) {
//       next();
//     } else {
//       res.status(403).json("You are not alowed to do that!");
//     }
//   });
// };

// module.exports = {
//   verifyToken,
//   verifyTokenAndAuthorization,
//   verifyTokenAndAdmin,
// };

const verifyToken = (req, res, next) => {
  //ACCESS TOKEN FROM HEADER, REFRESH TOKEN FROM COOKIE
  const token = req.headers.token;
//   const refreshToken = req.cookies.refreshToken;
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        res.status(403).json("Token is not valid!");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You're not authenticated");
  }
};

const verifyTokenAndUserAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id|| req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You're not allowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You're not allowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndUserAuthorization,
  verifyTokenAndAdmin,
};