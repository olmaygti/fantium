module.exports = {
  "env": {
    "node": true,
    "browser": true,
    "es6": true,
    "jest/globals": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier/react"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "plugins": [
    "jest",
    "react"
  ],
  "settings": {
    "import/resolver": {
      "babel-module": {}
    }
  },
  rules: {
    'one-var': 'off',
    'no-plusplus': 'off',
    'no-underscore-dangle': 'off',
    'no-await-in-loop': 'off',
    'class-methods-use-this': 'off',
    'no-bitwise': 'off',
    'no-iterator': 'off',
    'no-param-reassign': 'off',
    'no-nested-ternary': 'off',
    'no-console': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'import/no-named-as-default': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 0,
    'react/display-name': 'off',
    'default-param-last': 'off',
    'no-return-assign': 'off',
    'new-cap': 'off',
    'max-statements': [
      'error',
      25,
    ],
    'max-len': [
      'error', {
        code: 160
      },
    ],
    'no-use-before-define': [
      'error',
      'nofunc',
    ],
    'no-restricted-syntax': 'off',
    'func-names': [
      'error',
      'as-needed',
    ],
    'import/no-cycle': 'off',
    'default-case': 'off',
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true
    }],
    'linebreak-style': ['error', (process.platform === 'win32' ? 'windows' : 'unix')],
  },

}