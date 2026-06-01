function getHealthData() {
  return {
    status: "UP",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };
}

module.exports = {
  getHealthData,
};
