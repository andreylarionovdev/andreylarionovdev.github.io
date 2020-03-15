const createBemClasses = function createBemClasses(options) {
  const {
    blockName,
    elementName,
    modifiers,
    jsPrefix,
  } = options || {};

  const isElement = blockName && elementName;

  const baseClass = isElement ? `${blockName}__${elementName}` : blockName;

  const classes = [];

  classes.push(baseClass);

  if (modifiers && Array.isArray(modifiers)) {
    const modifiersClasses = modifiers.map((modifier) => {
      if (typeof modifier === 'object') {
        const modifierName = Object.keys(modifier)[0];
        const modifierValue = modifier[modifierName];

        return modifierValue ? `${baseClass}_${modifierName}_${modifierValue}` : '';
      }

      return `${baseClass}_${modifier}`;
    });

    classes.push(...modifiersClasses);
  }

  if (jsPrefix) {
    classes.push(`${jsPrefix}-${baseClass}`);
  }

  return classes;
};

const formatCurrency = function formatCurrency(options) {
  const { value, locale = 'ru-RU', sign = '₽' } = options || {};

  return `${value.toLocaleString(locale).replace(',', '&nbsp;')}${sign}`;
};

export {
  createBemClasses,
  formatCurrency,
};
