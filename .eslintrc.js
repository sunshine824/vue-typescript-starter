module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/no-empty-function": "off",
    "eqeqeq": "off",  //是否开启==
    "class-methods-use-this": "off",  //在方法中是否必须使用this
    "no-plusplus": "off",  //不允许使用++ --运算符
    "no-param-reassign": "off",  //不允许重新分配函数参数"no-proto": 2, //不允许使用__proto__属性
    "import/no-extraneous-dependencies": "off",
    "no-underscore-dangle": "off", //不允许标识符以下划线开头
    "global-require": "off",
    "import/no-cycle": 'off',
    "import/prefer-default-export": 'off',
    "import/no-dynamic-require": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-this-alias": "off",
    "@typescript-eslint/no-namespace": "off",
    "no-unused-expressions": "off",  //不允许无用的表达式
    "no-lonely-if": "off",
    "object-curly-newline": "off",
    'comma-dangle': [0, 'never'],
  },
};
