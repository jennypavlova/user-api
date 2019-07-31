module.exports = {
    env: {
        es6: true,
        mocha: true
    },
    extends: [
        'standard'
    ],
    parserOptions: {
        ecmaVersion: 2018
    },
    rules: {
        "indent": ["error", 4],
        "prefer-template": "error"
    }
}
