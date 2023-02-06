const checkGmail = (gmail) => {
  const re = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
  return re.test(gmail);
};

const checkNumberPhone = (numberPhone) => {
  const re = /^\d{10}$/;
  return re.test(numberPhone);
};

module.exports = { checkGmail, checkNumberPhone };
