const isProduction = process.env.NODE_ENV === 'production';

const setAuthCookie = (res, token) => {
  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 3 * 24 * 60 * 60 * 1000,
    secure: isProduction,
    sameSite: isProduction ? 'None' : 'Lax'
  });
};

module.exports = setAuthCookie;