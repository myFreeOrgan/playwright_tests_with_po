module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
        mocha: true,
    },
    globals: {
        browser: true,
        driver: true,
        $: true,
        $$: true,
    },
    extends: [
        'airbnb-base',
        'plugin:import/recommended',
        'plugin:playwright/recommended',
    ],
    plugins: [
        'import',
    ],
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        'linebreak-style': ['error', 'windows'],
        'max-len': 'off',
        'no-dupe-keys': 'off',
        'class-methods-use-this': 'off',
        'no-plusplus': 'off',
        'no-console': 'off',
        'no-await-in-loop': 'off',
        'import/prefer-default-export': 'off',
        'no-restricted-syntax': 'off',
        'import/no-extraneous-dependencies': ['error', {
            devDependencies: ['**/test/**', '**/*.test.js', '**/fixture.js'],
        }],
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
            },
        ],
        'max-len': ['error', {
            code: 120,
            ignoreComments: true,
            ignoreTrailingComments: true,
            ignoreUrls: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreRegExpLiterals: true,
        }],
    },
};
