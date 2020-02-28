const bem = function bem(options) {
  const {
    b,
    e,
    m,
    js,
  } = options || {};

  const isElement = b && e;

  const baseClass = isElement ? `${b}__${e}` : b;

  const classes = [];

  classes.push(baseClass);

  if (m && Array.isArray(m)) {
    const modifiersClasses = m.map((modifier) => {
      if (typeof modifier === 'object') {
        const modifierName = Object.keys(modifier)[0];
        const modifierValue = modifier[modifierName];

        return modifierValue ? `${baseClass}_${modifierName}_${modifierValue}` : '';
      }

      return `${baseClass}_${modifier}`;
    });

    classes.push(...modifiersClasses);
  }

  if (js) {
    classes.push(`${js}-${baseClass}`);
  }

  return classes;
};

const formatCurrency = function formatCurrency(options) {
  const { value, locale = 'ru-RU', sign = '₽' } = options || {};

  return `${value.toLocaleString(locale).replace(',', '&nbsp;')}${sign}`;
};

export {
  bem,
  formatCurrency,
};
