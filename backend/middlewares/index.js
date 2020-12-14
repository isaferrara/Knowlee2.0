exports.catchErr = ctrl => (req, res, next) => ctrl(req, res).catch(next)

exports.isAuth = (req, res, next)  =>{
    req.isAuthenticated() ? next() : res.status(401).json({ msg: 'Log in first' });
  }