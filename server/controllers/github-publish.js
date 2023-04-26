const { exec } = require("node:child_process");
const pluginId = "plugin.github-publish";

module.exports = ({ strapi }) => ({
  publish: async (ctx) => {
    const { folder, commands } = strapi.config.get(pluginId);
    //Do something
    await exec("cd " + folder + " ; " + commands, (err, output) => {
      if (err) {
        console.error(
          "Failed to execute the following command: " + commands.toString()
        );
      }

      console.log("Successfully executed command.");
    });
    ctx.send({ success });
  },
});
