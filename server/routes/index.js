module.exports = [
  {
    method: "GET",
    path: "/publish",
    handler: "githubPublish.publish",
    config: { policies: [] },
  },
];
