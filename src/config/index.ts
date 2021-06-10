export default () => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  token: {
    secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  },
});