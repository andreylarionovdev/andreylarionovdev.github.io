export const bem = function ({b, e, m, js} = {}) {
  let classes = [];
  let cls = b;
  const isElement = b && e;

  if (isElement) {
    cls = `${b}__${e}`
  }

  classes.push(cls);

  if (m) {
    if (Array.isArray(m)) {
      m.map((m) => {
        classes.push(`${cls}--${m}`);
      });
    } else {
      classes.push(`${cls}--${m}`);
    }
  }
  if (js) {
    classes.push(`${js}-${cls}`)
  }

  return classes;
};