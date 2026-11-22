// Quiz engine: builds questions from the chosen subjects, runs the game, shows results.
(() => {
  const { h, shuffle, mount } = FOF;
  const STORE = 'fof-stats';
  const DEFAULTS = { answered: 0, correct: 0, bestStreak: 0, games: 0 };

  FOF.stats = {
    load() {
      try {
        return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(STORE)) };
      } catch {
        return { ...DEFAULTS };
      }
    },
    save(stats) {
      try {
        localStorage.setItem(STORE, JSON.stringify(stats));
      } catch {
        /* private mode or full storage: the game still works, we just can't remember it */
      }
    },
  };

  // ---- keyboard shortcuts (1-4 to answer, Enter for next) ----
  let keyHandler = null;
  const setKeys = (fn) => {
    if (keyHandler) document.removeEventListener('keydown', keyHandler);
    keyHandler = fn;
    if (fn) document.addEventListener('keydown', fn);
  };

  // topicSel: { subjectId: Set of topic ids }. A subject missing from it uses all its topics.
  const buildQuestions = (subjectIds, count, { topicSel = {}, grade }) => {
    const pool = FOF.subjects.filter((s) => subjectIds.includes(s.id));
    const seen = new Set(); // asked in this game: never repeated
    const recent = new Set(FOF.recent.load()); // answered in earlier games: avoided when there's a choice
    const questions = [];
    const dry = new Set(); // subjects with nothing new left to ask
    let turnOrder = [];

    const fresh = (subject) => {
      const make = () => subject.question(topicSel[subject.id], grade);
      return FOF.drawFresh(make, seen, recent) ?? FOF.drawFresh(make, seen);
    };

    while (questions.length < count && dry.size < pool.length) {
      // Deal subjects like cards: reshuffle only when the deck runs out, so every pick gets a turn.
      if (!turnOrder.length) turnOrder = shuffle(pool.filter((s) => !dry.has(s)));
      const subject = turnOrder.pop();
      if (dry.has(subject)) continue;
      const q = fresh(subject);
      if (!q) { dry.add(subject); continue; }
      seen.add(FOF.questionKey(q));
      questions.push({ ...q, subject });
    }
    return questions; // may be shorter than `count` when there aren't that many different questions
  };

  const subjectChip = (s) => h('span', { class: 'chip static', style: `--hue:${s.hue}` }, s.name);

  // settings: { topicSel, grade }. Passed along so "Play again" asks the same kind of questions.
  // retry: { questions, freshCount } replays specific questions (your misses) instead of building new ones.
  FOF.startQuiz = (subjectIds, count, settings = {}, retry = null) => {
    const questions = retry ? retry.questions : buildQuestions(subjectIds, count, settings);
    const run = {
      subjectIds, settings, questions,
      short: !retry && questions.length < count, // fewer different questions exist than you asked for
      count: questions.length,
      freshCount: retry ? retry.freshCount : count, // "Play again" goes back to a normal-size quiz
      i: 0, score: 0, streak: 0, bestStreak: 0,
      bySubject: {},
      missed: [],
    };
    showQuestion(run);
  };

  function showQuestion(run) {
    const q = run.questions[run.i];
    const isLast = run.i === run.count - 1;
    let answered = false;

    const feedback = h('div', { class: 'feedback hidden' });
    const nextBtn = h('button', { class: 'btn primary hidden', onclick: next }, isLast ? 'See results' : 'Next question');
    const buttons = q.choices.map((choice, idx) =>
      h('button', { class: 'choice', onclick: () => answer(choice) }, h('span', { class: 'key' }, String(idx + 1)), choice),
    );

    function answer(choice) {
      if (answered) return;
      answered = true;
      const right = choice === q.answer;
      const stats = FOF.stats.load();
      const tally = (run.bySubject[q.subject.id] ||= { subject: q.subject, right: 0, total: 0 });
      FOF.recent.add(q);

      tally.total++;
      stats.answered++;
      if (right) {
        tally.right++; run.score++; run.streak++; stats.correct++;
        run.bestStreak = Math.max(run.bestStreak, run.streak);
      } else {
        run.streak = 0;
        run.missed.push(q);
      }
      stats.bestStreak = Math.max(stats.bestStreak, run.bestStreak);
      FOF.stats.save(stats);

      FOF.markChoices(buttons, q.choices, q.answer, choice);
      feedback.classList.remove('hidden', 'good', 'bad');
      feedback.classList.add(right ? 'good' : 'bad');
      feedback.replaceChildren(
        h('b', {}, right ? (run.streak >= 3 ? `Correct! ${run.streak} in a row!` : 'Correct!') : `Not quite. The answer is ${q.answer}${q.answer.endsWith('.') ? '' : '.'}`),
        ' ', q.explain || '',
      );
      nextBtn.classList.remove('hidden');
      nextBtn.focus();
      refreshHud();
    }

    function next() {
      run.i++;
      if (run.i >= run.count) showResults(run);
      else showQuestion(run);
    }

    const hud = h('div', { class: 'hud' });
    const bar = h('div', { class: 'bar-fill' });
    function refreshHud() {
      hud.replaceChildren(
        h('span', {}, `Question ${run.i + 1} / ${run.count}`),
        run.settings.grade ? h('span', {}, `Grades ${FOF.GRADES[run.settings.grade - 1].label}`) : null,
        h('span', {}, `Score: ${run.score}`),
        h('span', {}, `Streak: ${run.streak}`),
      );
      bar.style.width = `${((run.i + (answered ? 1 : 0)) / run.count) * 100}%`;
    }
    refreshHud();

    setKeys((e) => {
      const n = Number(e.key);
      if (n >= 1 && n <= q.choices.length) answer(q.choices[n - 1]);
      else if (answered && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); next(); }
    });

    mount(
      h('div', { class: 'screen quiz' },
        FOF.backButton('Quit quiz', () => { setKeys(null); FOF.go.home(); }),
        hud,
        h('div', { class: 'bar' }, bar),
        run.short ? h('p', { class: 'muted' }, `Only ${run.count} different questions exist for your picks, so this quiz is a little shorter. No repeats!`) : null,
        subjectChip(q.subject),
        h('h2', { class: 'prompt' }, q.prompt),
        h('div', { class: 'choices' }, buttons),
        feedback,
        nextBtn,
      ),
    );
  }

  // "Here's what you missed, and why": the part that turns a quiz into a lesson.
  const review = (run) =>
    run.missed.length
      ? h('div', {},
          h('h3', {}, 'Let\'s review what you missed'),
          h('div', { class: 'panel' },
            h('ul', { class: 'sheet' },
              run.missed.map((q) =>
                h('li', {}, h('b', {}, q.prompt), h('div', {}, `Answer: ${q.answer}`), q.explain ? h('div', { class: 'muted' }, q.explain) : null),
              ),
            ),
          ),
        )
      : h('p', { class: 'muted' }, 'You did not miss a single one!');

  function showResults(run) {
    setKeys(null);
    const stats = FOF.stats.load();
    stats.games++;
    FOF.stats.save(stats);

    const pct = Math.round((run.score / run.count) * 100);
    const title =
      pct >= 90 ? 'Factory Foreman!' :
      pct >= 70 ? 'Certified Engineer' :
      pct >= 50 ? 'Promising Apprentice' :
      'Rookie on the Conveyor Belt';
    const blurb =
      pct >= 90 ? 'Basically a walking encyclopedia. Show-off.' :
      pct >= 70 ? 'Solid work. The machines are impressed.' :
      pct >= 50 ? 'Not bad! A little more practice and you will be unstoppable.' :
      'Every expert started here. Explore a subject, then try again!';

    mount(
      h('div', { class: 'screen results' },
        h('div', { class: 'panel center' },
          h('div', { class: 'score-ring' }, `${pct}%`),
          h('h2', {}, title),
          h('p', {}, `${run.score} out of ${run.count} correct. Best streak: ${run.bestStreak}.`),
          h('p', { class: 'muted' }, blurb),
        ),
        h('h3', {}, 'By subject'),
        h('div', { class: 'cards' },
          Object.values(run.bySubject).map(({ subject, right, total }) =>
            h('div', { class: 'card', style: `--hue:${subject.hue}` }, h('b', {}, subject.name), h('div', {}, `${right} / ${total} correct`)),
          ),
        ),
        review(run),
        h('div', { class: 'row' },
          run.missed.length ? h('button', { class: 'btn primary', onclick: () => FOF.startQuiz(run.subjectIds, run.count, run.settings, { questions: run.missed, freshCount: run.freshCount }) }, `Practice my ${run.missed.length} miss${run.missed.length > 1 ? 'es' : ''}`) : null,
          h('button', { class: 'btn' + (run.missed.length ? '' : ' primary'), onclick: () => FOF.startQuiz(run.subjectIds, run.freshCount, run.settings) }, 'Play again'),
          h('button', { class: 'btn', onclick: () => FOF.go.setup(run.subjectIds, run.settings) }, 'Pick new subjects'),
          h('button', { class: 'btn ghost', onclick: FOF.go.home }, 'Home'),
        ),
      ),
    );
  }
})();
