const bem = ({
  b, e, m, js,
} = {}) => {
  const classes = [];
  let cls = b;
  const isElement = b && e;

  if (isElement) {
    cls = `${b}__${e}`;
  }

  classes.push(cls);

  if (m) {
    if (Array.isArray(m)) {
      m.map((_m) => classes.push(`${cls}--${_m}`));
    } else {
      classes.push(`${cls}--${m}`);
    }
  }
  if (js) {
    classes.push(`${js}-${cls}`);
  }

  return classes;
};

const formatCurrency = ({ value, locale = 'ru-RU', sign = '₽' }) => `${value.toLocaleString(locale).replace(',', '&nbsp;')}${sign}`;

export {
  bem,
  formatCurrency,
};
