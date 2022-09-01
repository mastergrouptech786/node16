
export default function (req, res, next) {
    if(req.session.auth && req.session.auth === true) {
      next();
  
      return;
    }
  
    res.redirect('/');
  };