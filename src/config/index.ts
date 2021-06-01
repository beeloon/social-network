export default () => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  secret: process.env.JWT_SECRET,
});
