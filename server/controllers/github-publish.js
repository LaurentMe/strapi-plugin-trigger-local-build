const { exec } = require("node:child_process");
const pluginId = "plugin.github-publish";

module.exports = ({ strapi }) => ({
  publish: async (ctx) => {
    const { folder, commands } = strapi.config.get(pluginId);
    //Do something
    await commands.forEach((command) => {
      exec("cd " + folder + " ; " + command, (err, output) => {
        if (err) {
          console.error(
            "Failed to execute the following command: " + command.toString()
          );
        }

        console.log("Successfully executed command.");
      });
    });
    ctx.send({ success });
  },
});
