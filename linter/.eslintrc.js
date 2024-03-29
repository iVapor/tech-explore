module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    // "extends": [
    //     "eslint:recommended",
    //     "plugin:vue/essential"
    // ],
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "double"],
        "no-class-declaration": ["error", "always"],
        // "class": ["error", "always"],
    }
};
