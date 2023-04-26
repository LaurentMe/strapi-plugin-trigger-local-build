module.exports = {
  default: {},
  validator: ({ folder, commands }) => {
    if (!folder) {
      throw new Error("owner is a required");
    }
    if (!commands) {
      throw new Error("repo is a required");
    }
  },
};
