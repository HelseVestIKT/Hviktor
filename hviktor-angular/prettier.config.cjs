module.exports = {
  singleQuote: true,
  semi: true,
  printWidth: 100,
  trailingComma: 'all',
  arrowParens: 'always',
  endOfLine: 'lf',

  plugins: [
    require.resolve('prettier-plugin-tailwindcss'),
    require.resolve('prettier-plugin-organize-imports'),
  ],
};
