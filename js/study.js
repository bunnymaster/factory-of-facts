// Study zone: three ways to learn the same topic-grouped Q&A data
// (flip cards, hands-on practice, and a read-through study sheet).
(() => {
  const { h, shuffle } = FOF;

  const flashcards = (entries) =>
    h('div', {},
      h('p', { class: 'muted' }, 'Tap a card to flip it and see the answer.'),
      FOF.flashcards(entries),
    );

  const sheet = (entries) =>
    h('div', { class: 'panel' },
      h('ul', { class: 'sheet' },
        entries.map(([prompt, answer, , why]) =>
          h('li', {}, h('b', {}, prompt), h('div', {}, `Answer: ${answer}`), why ? h('div', { class: 'muted' }, why) : null),
        ),
      ),
    );

  // One question at a time, instant feedback, no pressure (it doesn't touch your quiz stats).
  const practice = (entries, ordered) => {
    const box = h('div', { class: 'panel practice' });
    let deck, i, score;

    const start = () => { deck = shuffle(entries); i = 0; score = 0; ask(); };

    const done = () =>
      box.replaceChildren(
        h('h3', {}, 'Round complete!'),
        h('p', {}, `You got ${score} out of ${deck.length}.`),
        h('button', { class: 'btn primary', onclick: start }, 'Practice again'),
      );

    const ask = () => {
      if (i >= deck.length) return done();
      const q = FOF.qaQuestion(deck[i], ordered);
      const feedback = h('div', { class: 'feedback hidden' });
      const next = h('button', { class: 'btn primary hidden', onclick: () => { i++; ask(); } }, i + 1 === deck.length ? 'Finish' : 'Next');
      const buttons = q.choices.map((choice) => h('button', { class: 'choice', onclick: () => answer(choice) }, choice));

      const answer = (choice) => {
        const right = choice === q.answer;
        if (right) score++;
        FOF.markChoices(buttons, q.choices, q.answer, choice);
        feedback.classList.remove('hidden');
        feedback.classList.add(right ? 'good' : 'bad');
        feedback.replaceChildren(h('b', {}, right ? 'Correct!' : `Not quite. The answer is ${q.answer}.`), ' ', q.explain);
        next.classList.remove('hidden');
      };

      box.replaceChildren(
        h('p', { class: 'muted' }, `Question ${i + 1} of ${deck.length}  |  Score: ${score}`),
        h('h3', { class: 'prompt' }, q.prompt),
        h('div', { class: 'choices' }, buttons),
        feedback,
        next,
      );
    };

    start();
    return box;
  };

  const MODES = { Flashcards: flashcards, Practice: practice, 'Study sheet': sheet };
  const ALL = 'All topics';

  // byTopic: { 'Topic name': [qa entry, ...] }
  FOF.study = (root, byTopic, { title = 'Study zone', ordered = false } = {}) => {
    const topics = [ALL, ...Object.keys(byTopic)];
    let topic = ALL;
    let mode = 'Flashcards';

    const modeBar = h('div', { class: 'tabs' });
    const topicBar = h('div', { class: 'tabs' });
    const body = h('div');

    const tab = (label, active, onclick) =>
      h('button', { class: 'tab' + (active ? ' active' : ''), 'aria-pressed': String(active), onclick }, label);

    const draw = () => {
      modeBar.replaceChildren(...Object.keys(MODES).map((m) => tab(m, m === mode, () => { mode = m; draw(); })));
      topicBar.replaceChildren(...topics.map((t) => tab(t, t === topic, () => { topic = t; draw(); })));
      const entries = topic === ALL ? FOF.flatQA(byTopic) : byTopic[topic];
      body.replaceChildren(MODES[mode](entries, ordered));
    };

    root.append(h('h3', {}, title), modeBar, topicBar, body);
    draw();
  };

  // Endless flashcards for ANY subject: every card is drawn fresh from the subject's own question makers
  // (so math never runs out). No repeats until you've seen the whole deck, then it reshuffles.
  const NEEDS_OPTIONS = /\b(of these|following)\b/i; // "Which of these is prime?" is unanswerable without them

  FOF.endlessCards = (root, subject) => {
    let grade = FOF.grade.load() ?? 2;
    let topicId = null; // null = every topic
    let seen = new Set();
    let count = 0;

    const gradeBar = h('div', { class: 'tabs' });
    const topicBar = h('div', { class: 'tabs' });
    const stage = h('div');

    const tab = (label, active, onclick) =>
      h('button', { class: 'tab' + (active ? ' active' : ''), 'aria-pressed': String(active), onclick }, label);
    const restart = () => { seen = new Set(); count = 0; draw(); };

    const nextCard = () => {
      const open = FOF.openTopics(subject, grade);
      const live = open.filter((t) => !topicId || t.id === topicId);
      const make = () => FOF.pick(live).make(grade);
      let note = '';
      let q = FOF.drawFresh(make, seen);
      if (!q) { // seen everything: shuffle the deck again
        seen = new Set();
        q = make();
        note = 'You have seen every card in this deck, so it is shuffled again!';
      }
      seen.add(FOF.questionKey(q));
      count++;
      const front = NEEDS_OPTIONS.test(q.prompt) ? `${q.prompt}  (${q.choices.join(' \u00b7 ')})` : q.prompt;
      stage.replaceChildren(
        h('p', { class: 'muted' }, `Card ${count}. Tap the card to flip it. ${note}`),
        h('div', { class: 'cards' }, FOF.flashcard([front, q.answer, null, q.explain])),
        h('button', { class: 'btn primary', onclick: nextCard }, 'Next card'),
      );
    };

    const draw = () => {
      gradeBar.replaceChildren(...FOF.GRADES.map((g) => tab(g.label, g.id === grade, () => { grade = g.id; FOF.grade.save(g.id); topicId = null; restart(); })));
      const open = FOF.openTopics(subject, grade);
      if (!open.length) {
        topicBar.replaceChildren();
        stage.replaceChildren(h('p', { class: 'muted' }, `${subject.name} starts in grades ${FOF.GRADES[FOF.firstGrade(subject) - 1].label}. Pick a higher grade above.`));
        return;
      }
      topicBar.replaceChildren(
        tab('All topics', !topicId, () => { topicId = null; restart(); }),
        ...open.map((t) => tab(t.label, t.id === topicId, () => { topicId = t.id; restart(); })),
      );
      nextCard();
    };

    root.append(
      h('h3', {}, 'Endless flashcards'),
      h('p', { class: 'muted' }, 'A fresh card every time. Pick your grade and a topic.'),
      gradeBar, topicBar, stage,
    );
    draw();
  };
})();
