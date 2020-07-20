function headers(req, res, next) {
  try {
    // const origins = ['http://localhost:3000'];
    const origins = ["http://localhost:3000","http://localhost:3001","http://192.168.56.1/:3001","http://192.168.56.1/:3000"];

    if (origins.includes(req.headers.origin)) {
      res.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
      res.set('Access-Control-Allow-Origin', req.headers.origin);
      res.set('Access-Control-Allow-Headers', '*');
    }

    next();
  } catch (e) {
    next(e)
  }
}

module.exports = headers
