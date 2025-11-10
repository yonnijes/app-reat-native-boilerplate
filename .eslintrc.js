module.exports = {
extends: [
'expo',
'prettier',
'plugin:@tanstack/eslint-plugin-query/recommended'
],
plugins: ['prettier', '@tanstack/query'],
rules: {
'prettier/prettier': 'warn',
'react-hooks/exhaustive-deps': 'warn',
},
}
