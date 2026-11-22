// Lessons: teach first, then practice. A lesson is { topic, idea, tips, hint } and borrows the
// topic's own question generator, so the examples and practice are always fresh (and grade-sized).
(() => {
  const { h } = FOF;

  const tab = (label, active, onclick) =>
    h('button', { class: 'tab' + (active ? ' active' : ''), 'aria-pressed': String(active), onclick }, label);

  // "Watch one": a fresh solved example. The explanation is the teaching bit.
  const workedExample = (lesson, grade) => {
    const box = h('div', { class: 'panel example' });
    const show = () => {
      const q = lesson.topic.make(grade);
      box.replaceChildren(
        h('b', {}, 'Watch one'),
        h('div', { class: 'prompt' }, q.prompt),
        h('div', {}, h('b', {}, `Answer: ${q.answer}`)),
        q.explain ? h('div', { class: 'muted' }, q.explain) : null,
        h('button', { class: 'btn small ghost', onclick: show }, 'Show me another'),
      );
    };
    show();
    return box;
  };

  // "Your turn": unlimited tries at fresh questions, with a hint button and a step-by-step answer.
  // It never touches the quiz stats, so it's safe to get things wrong.
  const yourTurn = (lesson, grade) => {
    const box = h('div', { class: 'panel practice' });
    let right = 0;
    let tried = 0;

    const ask = () => {
      const q = lesson.topic.make(grade);
      let answered = false;
      const score = h('span', { class: 'muted' }, `Score: ${right} / ${tried}`);
      const hint = h('p', { class: 'muted hidden' }, `Hint: ${lesson.hint}`);
      const feedback = h('div', { class: 'feedback hidden' });
      const next = h('button', { class: 'btn primary hidden', onclick: ask }, 'Another one');
      const hintBtn = h('button', { class: 'btn small ghost', onclick: () => { hint.classList.remove('hidden'); hintBtn.disabled = true; } }, 'Hint');
      const buttons = q.choices.map((choice) => h('button', { class: 'choice', onclick: () => answer(choice) }, choice));

      const answer = (choice) => {
        if (answered) return;
        answered = true;
        const good = choice === q.answer;
        tried++;
        if (good) right++;
        score.textContent = `Score: ${right} / ${tried}`;
        hintBtn.disabled = true;
        FOF.markChoices(buttons, q.choices, q.answer, choice);
        feedback.classList.remove('hidden');
        feedback.classList.add(good ? 'good' : 'bad');
        feedback.replaceChildren(h('b', {}, good ? 'Correct!' : `Not quite. The answer is ${q.answer}.`), ' ', q.explain);
        next.classList.remove('hidden');
      };

      box.replaceChildren(
        h('div', { class: 'row between wrap' }, h('b', {}, 'Your turn'), score),
        h('h3', { class: 'prompt' }, q.prompt),
        h('div', { class: 'choices' }, buttons),
        h('div', { class: 'row' }, hintBtn),
        hint,
        feedback,
        next,
      );
    };

    ask();
    return box;
  };

  FOF.lessons = (root, subject) => {
    const lessons = subject.lessons.map((l) => ({ ...l, topic: subject.topics.find((t) => t.label === l.topic) }));
    let current = lessons[0];

    const tabs = h('div', { class: 'tabs' });
    const body = h('div');

    const draw = () => {
      // Examples are sized to the grade you picked on the quiz screen, but never below what the topic needs.
      const grade = Math.max(current.topic.min, FOF.grade.load() ?? 1);
      tabs.replaceChildren(...lessons.map((l) => tab(l.topic.label, l === current, () => { current = l; draw(); })));
      body.replaceChildren(
        h('div', { class: 'panel' },
          h('h3', {}, current.topic.label),
          current.idea.map((p) => h('p', {}, p)),
          h('b', {}, 'Tips and tricks'),
          h('ul', {}, current.tips.map((t) => h('li', {}, t))),
        ),
        workedExample(current, grade),
        yourTurn(current, grade),
        h('p', { class: 'muted' }, `Examples use grades ${FOF.GRADES[grade - 1].label}. Change your grade on the quiz setup screen.`),
      );
    };

    root.append(h('h3', {}, 'Learn it'), h('p', { class: 'muted' }, 'Pick a lesson: read the idea, watch an example, then try some yourself.'), tabs, body);
    draw();
  };
})();
