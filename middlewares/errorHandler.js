const errorHandler = (err, req, res,next) => {
  console.log("error handler");
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: err.stack,
  });
};

module.exports = {
  errorHandler,
};
