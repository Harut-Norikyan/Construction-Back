// const jwt = require('jsonwebtoken');
// const httpErrors = require('http-errors');
// const { JWT_TOKEN } = process.env;
//
// function authorization(req, res, next) {
//   try {
//     if (req.method === 'OPTIONS') {
//       return next();
//     }
//     if (req.path.startsWith('/projects')) {
//       return next();
//     }
//     if (req.path.startsWith('/users')) {
//       return next();
//     }
//     const token = req.headers['x-authorization'];
//     let data = {};
//     try {
//       data = jwt.verify(token, JWT_TOKEN);
//     } catch (e) {
//
//     }
//     if (!data || !data.id) {
//       throw httpErrors(401, 'Not authorizeddd');
//     }
//     req.user = { id: data.id };
//     next();
//   } catch (e) {
//     next(e)
//   }
// }
//
// module.exports = authorization;
