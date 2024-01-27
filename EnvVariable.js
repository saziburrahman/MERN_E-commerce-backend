const PORT = process.env.PORT;
const secretKey = process.env.JWT_SECRET_KEY;
const MONGOURI = process.env.MONGOURI;
module.exports = {
  PORT,
  secretKey,
  MONGOURI,
};
