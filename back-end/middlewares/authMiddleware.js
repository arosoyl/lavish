// const jwt = require('jsonwebtoken');

// const { ACCESS_TOKEN_SECRET } = require('../configs/index');

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
