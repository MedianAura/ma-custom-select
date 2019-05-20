module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/essential",
    "@vue/prettier",
    "@vue/typescript",
    "prettier",
    "prettier/@typescript-eslint"
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "@typescript-eslint/no-explicit-any": "off"
  },
  "overrides": [
    {
      "files": ["*.js"],
      "rules": {
        "@typescript-eslint/explicit-function-return-type": "off"
      }
    }
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser"
  }
};
