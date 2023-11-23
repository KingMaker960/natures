module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        messsage: err.message,
      });
    } else {
      // console.error('Error----------', err);
      res.status(500).json({
        status: 'Error',
        message: 'Something went wrong!',
      });
    }
  } else {
    res.status(err.statusCode).render('error', {
      title: 'Something Went Wrong!',
      msg: err.message,
    });
  }
};
