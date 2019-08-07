module.exports = {
    "env": {
        // "browser": true,
        "es6": true,
        "node": true,
    },
    "globals": {
        "module": true,
    },
    "extends": "eslint:recommended",
    parser: "babel-eslint",
    "parserOptions": {
        "sourceType": "module",
        parser: "babel-eslint",
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        // "comma-dangle": [
        //     "error",
        //     "always"
        // ],
        "no-console": "off",
    }
};