module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },

  'extends': [
    'eslint:recommended',
  ],

  'overrides': [
  ],

  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },

  'plugins': [
  ],

  "globals": {
    "Handlebars": false
  },

  'rules': {
    'indent': [
      'error',
      2
    ],

    'linebreak-style': [
      'off'
    ],

    'quotes': [
      'error',
      'single',
      {'allowTemplateLiterals': true}
    ],

    'semi': [
      'error',
      'always'
    ],

    'no-console': [
      'off'
    ],

    'no-prototype-builtins': ['off']
  }

}
