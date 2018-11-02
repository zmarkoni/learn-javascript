module.exports = {
    "env": {
        "es6": true
    },
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 6
    },
    "rules": {
        "accessor-pairs": [
            2,
            {
                "getWithoutSet": false
            }
        ],
        "block-scoped-var": 2,
        "camelcase": 2,
        "comma-dangle": [
            2,
            "never"
        ],
        "comma-style": [
            2,
            "last"
        ],
        "curly": [
            2,
            "all"
        ],
        "eol-last": 2,
        "eqeqeq": [
            2,
            "allow-null"
        ],
        "guard-for-in": 2,
        "no-alert": 2,
        "no-array-constructor": 2,
        "no-bitwise": 2,
        "no-caller": 2,
        "no-debugger": 2,
        "no-dupe-args": 2,
        "no-dupe-keys": 2,
        "no-duplicate-case": 2,
        "no-empty": 2,
        "no-ex-assign": 2,
        "no-extra-semi": 2,
        "no-func-assign": 2,
        "no-inner-declarations": [
            2,
            "both"
        ],
        "no-invalid-regexp": 2,
        "no-irregular-whitespace": 2,
        "no-loop-func": 2,
        "no-multi-spaces": 2,
        "no-native-reassign": 2,
        "no-negated-in-lhs": 2,
        "no-new": 2,
        "no-new-object": 2,
        "no-obj-calls": 2,
        "no-proto": 2,
        "no-redeclare": [
            2,
            {
                "builtinGlobals": true
            }
        ],
        "no-regex-spaces": 2,
        "no-self-compare": 2,
        "no-sequences": 2,
        "no-script-url": 2,
        "no-shadow": 2,
        "no-sparse-arrays": 2,
        "no-throw-literal": 2,
        "no-undef": 2,
        "no-unexpected-multiline": 2,
        "no-unused-expressions": [
            2,
            {
                "allowTernary": true,
                "allowShortCircuit": true
            }
        ],
        "no-unreachable": 2,
        "no-underscore-dangle": 0,
        "no-unused-vars": 2,
        "no-useless-call": 2,
        "no-useless-concat": 2,
        "no-void": 2,
        "no-with": 2,
        "quotes": [
            2,
            "single"
        ],
        "quote-props": [
            2,
            "as-needed",
            {
                "keywords": true,
                "unnecessary": false
            }
        ],
        "semi": [
            2,
            "always"
        ],
        "use-isnan": 2,
        "valid-typeof": 2,
        "vars-on-top": 2,
        "wrap-iife": [
            2,
            "outside"
        ],
        "yoda": 2,
        "no-console": 0,
        "no-debugger": 0,
    },
    "globals": {
        "require": true,
        "module": true
    },
};
// https://github.com/airbnb/javascript/issues/747