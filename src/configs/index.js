module.exports = {
  secret:
    process.env.NODE_ENV === "production"
      ? process.env.SECRET
      : "not-production-secret-key",
};
