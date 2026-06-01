function success(data, message = 'Success') {
  return {
    ok: true,
    message,
    data
  };
}

function failure(message = 'Something went wrong') {
  return {
    ok: false,
    message
  };
}

module.exports = {
  success,
  failure
};
