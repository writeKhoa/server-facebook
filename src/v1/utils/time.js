const timeExRefreshTokenCookie = () => {
  const date = new Date();
  date.setTime(date.getTime() + 1000 * 60 * 60 * 24 * 60);
  return date;
};

module.exports = { timeExRefreshTokenCookie };
