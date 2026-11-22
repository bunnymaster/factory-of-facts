// Screens: home, explore a subject, quiz setup. (The quiz itself lives in quiz.js.)
(() => {
  const { h, sample, mount } = FOF;
  const FACTS_SHOWN = 4;

  const allFacts = () =>
    FOF.subjects.flatMap((subject) => subject.facts.map((text) => ({ subject, text })));

  const hueStyle = (s) => `--hue:${s.hue}`;

  // ---------- Home ----------
  function home() {
    const facts = allFacts();
    const factList = h('div', { class: 'fact-list' });
    const showFacts = () => {
      factList.replaceChildren(
        ...sample(facts, FACTS_SHOWN).map(({ subject, text }) =>
          h('div', { class: 'fact-item' },
            h('span', { class: 'chip static', style: hueStyle(subject) }, subject.name),
            h('p', { class: 'fact-text' }, text),
          ),
        ),
      );
    };
    showFacts();

    const stats = FOF.stats.load();
    const pct = stats.answered ? Math.round((stats.correct / stats.answered) * 100) : 0;

    mount(
      h('div', { class: 'screen home' },
        h('header', { class: 'hero' },
          h('h1', {}, 'Factory of Facts'),
          h('p', { class: 'tagline' }, 'Where knowledge gets manufactured. Hard hats optional.'),
          h('div', { class: 'conveyor' }),
        ),
        h('div', { class: 'panel fact-machine' },
          h('b', {}, 'Facts of the moment'),
          factList,
          h('button', { class: 'btn small', onclick: showFacts }, 'More facts!'),
        ),
        h('div', { class: 'row center' },
          h('button', { class: 'btn primary big', onclick: () => setup([]) }, 'Quiz me!'),
        ),
        h('div', { class: 'row center stats-line muted' },
          stats.answered
            ? [`Lifetime: ${stats.correct}/${stats.answered} correct (${pct}%)`, `Best streak: ${stats.bestStreak}`, `Games: ${stats.games}`].map((t) => h('span', {}, t))
            : h('span', {}, 'No quizzes yet. Pick a subject below to explore, or hit "Quiz me!"'),
        ),
        h('h2', {}, 'Explore a subject'),
        h('div', { class: 'subjects' },
          FOF.subjects.map((s) =>
            h('button', { class: 'subject', style: hueStyle(s), onclick: () => explore(s) },
              h('span', { class: 'badge' }, s.badge),
              h('b', {}, s.name),
              h('span', { class: 'muted' }, s.blurb),
            ),
          ),
        ),
      ),
    );
  }

  // ---------- Explore ----------
  function explore(subject) {
    const body = h('div', { class: 'explore-body' });
    if (subject.lessons) FOF.lessons(body, subject); // teach first...
    FOF.endlessCards(body, subject); // ...then drill...
    //  ...then let them poke around:
    subject.explore(body);
    mount(
      h('div', { class: 'screen', style: hueStyle(subject) },
        FOF.backButton('Home', home),
        h('div', { class: 'row between wrap' },
          h('h2', { class: 'title-with-badge' }, h('span', { class: 'badge' }, subject.badge), subject.name),
          h('button', { class: 'btn primary', onclick: () => setup([subject.id]) }, `Quiz me on ${subject.name}`),
        ),
        body,
      ),
    );
  }

  // ---------- Quiz setup: "what grade?" then "what should I quiz you on?" ----------
  function setup(preselected, previous = {}) {
    const selected = new Set(preselected);
    const topicSel = previous.topicSel || {}; // subjectId -> Set of topic ids (empty until you choose)
    const topicsOf = (s) => (topicSel[s.id] ||= new Set());
    const allTopics = (s) => FOF.openTopics(s, grade).forEach((t) => topicsOf(s).add(t.id));
    // A subject is ready once at least one of its types that exists at this grade is switched on.
    const needsType = (s) => !FOF.openTopics(s, grade).some((t) => topicsOf(s).has(t.id));
    let grade = previous.grade ?? FOF.grade.load();
    let count = 10;

    const startBtn = h('button', { class: 'btn primary big', onclick: () => FOF.startQuiz([...selected], count, { topicSel, grade }) }, 'Start quiz');
    const gradeRow = h('div', { class: 'tabs' });
    const gradeNote = h('p', { class: 'muted' });
    const chipList = h('div', { class: 'subjects pick' });
    const topicList = h('div');
    const countRow = h('div', { class: 'row' });

    const hasQuestions = (s) => FOF.openTopics(s, grade).length > 0;
    const gradeLabel = (id) => FOF.GRADES[id - 1].label;

    const topicPanel = (s) => {
      const on = topicsOf(s);
      const visible = FOF.openTopics(s, grade);
      const toggle = (id) => {
        if (!on.delete(id)) on.add(id);
        draw();
      };
      return h('div', { class: 'panel topic-panel', style: hueStyle(s) },
        h('div', { class: 'row between wrap' },
          h('b', {}, `Which type of ${s.name}?`),
          h('button', { class: 'btn small ghost', onclick: () => { allTopics(s); draw(); } }, 'All types'),
        ),
        needsType(s) ? h('p', { class: 'muted' }, 'Pick one or more types, or tap All types.') : null,
        h('div', { class: 'tabs' },
          visible.map((t) =>
            h('button', { class: 'tab' + (on.has(t.id) ? ' active' : ''), 'aria-pressed': String(on.has(t.id)), onclick: () => toggle(t.id) }, t.label),
          ),
        ),
      );
    };

    const subjectButton = (s) => {
      if (!hasQuestions(s)) {
        return h('button', { class: 'subject locked', style: hueStyle(s), disabled: '' },
          h('span', { class: 'badge' }, s.badge), h('b', {}, s.name), h('span', { class: 'check' }, `Starts in grades ${gradeLabel(FOF.firstGrade(s))}`));
      }
      const on = selected.has(s.id);
      return h('button', {
        class: 'subject' + (on ? ' selected' : ''),
        style: hueStyle(s),
        'aria-pressed': String(on),
        onclick: () => { on ? selected.delete(s.id) : selected.add(s.id); draw(); },
      }, h('span', { class: 'badge' }, s.badge), h('b', {}, s.name), h('span', { class: 'check' }, on ? 'Selected' : 'Tap to add'));
    };

    const draw = () => {
      FOF.subjects.filter((s) => !hasQuestions(s)).forEach((s) => selected.delete(s.id));
      const pickedSubjects = FOF.subjects.filter((s) => selected.has(s.id));

      gradeRow.replaceChildren(
        ...FOF.GRADES.map((g) =>
          h('button', {
            class: 'tab' + (g.id === grade ? ' active' : ''), 'aria-pressed': String(g.id === grade), title: g.name,
            onclick: () => { grade = g.id; FOF.grade.save(g.id); draw(); },
          }, g.label),
        ),
      );
      gradeNote.textContent = grade ? FOF.GRADES[grade - 1].name : 'Pick one so the questions are not too easy or too hard.';
      chipList.replaceChildren(...FOF.subjects.map(subjectButton));
      topicList.replaceChildren(...pickedSubjects.map(topicPanel));
      countRow.replaceChildren(
        ...[5, 10, 20].map((n) =>
          h('button', { class: 'tab' + (n === count ? ' active' : ''), onclick: () => { count = n; draw(); } }, `${n} questions`),
        ),
      );
      const unready = pickedSubjects.find(needsType);
      startBtn.disabled = !grade || selected.size === 0 || !!unready;
      startBtn.textContent =
        !grade ? 'Pick a grade level first' :
        !selected.size ? 'Pick at least one subject' :
        unready ? `Pick a type of ${unready.name}` :
        `Start quiz (${selected.size} subject${selected.size > 1 ? 's' : ''})`;
    };
    draw();

    mount(
      h('div', { class: 'screen' },
        FOF.backButton('Home', home),
        h('h2', {}, 'What grade level?'),
        gradeRow,
        gradeNote,
        h('h2', {}, 'What should I quiz you on?'),
        h('p', { class: 'muted' }, 'Pick one subject or mix as many as you like.'),
        h('div', { class: 'row' },
          h('button', { class: 'btn small', onclick: () => { FOF.subjects.filter(hasQuestions).forEach((s) => { selected.add(s.id); allTopics(s); }); draw(); } }, 'Select all'),
          h('button', { class: 'btn small ghost', onclick: () => { selected.clear(); draw(); } }, 'Clear'),
        ),
        chipList,
        topicList,
        h('h3', {}, 'How many questions?'),
        countRow,
        h('div', { class: 'row center' }, startBtn),
      ),
    );
  }

  FOF.go = { home, explore, setup };
  home();
})();
