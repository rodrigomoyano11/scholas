const sortOrderSmacss = require('stylelint-config-property-sort-order-smacss/generate')

module.exports = {
  extends: ['stylelint-config-standard', 'prettier'],
  plugins: ['stylelint-order'],
  rules: {
    'no-eol-whitespace': [true, { ignore: ['empty-lines'] }],
    'no-empty-source': null,
    'declaration-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-declaration'],
      },
    ],
    'order/properties-order': [sortOrderSmacss({ emptyLineBefore: 'always' })],
  },
}
