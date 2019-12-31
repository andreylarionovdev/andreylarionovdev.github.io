$(document).ready(function () {
  const blockName = 'votes-chart';
  const classLabel = `${blockName}__label`;

  $(`.${classLabel}`).on('click', function () {
    const $label = $(this);

    const classLabelFocus = `${classLabel}--focus`;

    $(`.${classLabel}`).removeClass(`${classLabelFocus}`);
    $label.addClass(classLabelFocus);

    const classCircle = `${blockName}__circle`;
    const voteKey = $label.attr('data-vote-key');
    const $circle = $(`.${classCircle}--${voteKey}`);
    const classCircleFocus = `${classCircle}--focus`;

    $(`.${classCircle}`).removeClass(classCircleFocus);
    $circle.addClass(classCircleFocus);

    const count = parseInt($label.data('count'));

    const classCountValue = `${blockName}__count-value`;
    const countValue = $(`.${classCountValue}`);

    countValue.text(count);

    const classCount = `${blockName}__count`;
    const classCountLabel = `${classCount}--${voteKey}`;

    $(`.${classCount}`)
        .removeClass()
        .addClass(classCount)
        .addClass(classCountLabel);
  });
});