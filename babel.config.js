module.exports = (api) => {
  api.cache(true);
  return {
    env: {
      development: {
        plugins: [
          "transform-react-jsx-source",
          [
            "module-resolver",
            {
              root: ["./src"],
            },
          ],
        ],
      },
    },
    presets: ["babel-preset-expo"],
  };
};
