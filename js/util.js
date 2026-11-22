// Factory of Facts — tiny shared toolbox. No dependencies, no build step. 
(() => {
  const FOF = (window.FOF = { subjects: [], data: {} });

  // ---------- Grade levels ----------
  // A grade is 1-4. Generated questions (math...) scale themselves to it; written questions carry a level.
  FOF.GRADES = [
    { id: 1, label: 'K-2', name: 'Kindergarten to 2nd grade' },
    { id: 2, label: '3-5', name: '3rd to 5th grade' },
    { id: 3, label: '6-8', name: '6th to 8th grade' },
    { id: 4, label: '9-12', name: '9th to 12th grade' },
  ];
  const MIN_POOL = 2; // a topic needs at least this many questions at a grade, or it sits that grade out

  // A written question of level L suits grade G when L is G or one below. No grade = everything.
  const forGrade = (entries, grade) =>
    grade == null ? entries : entries.filter((e) => e[4] <= grade && e[4] >= grade - 1);

  // ---------- Subjects and topics ----------
  // A subject lists its `topics`: [{ id, label, isOpen(grade), make(grade) }].
  FOF.topic = (label, ...makers) => ({
    id: label, label,
    min: 1,
    isOpen: () => true,
    make: (grade) => FOF.pick(makers)(grade),
  });
  // Same topic, but only from a minimum grade up (Algebra shouldn't show up in kindergarten).
  FOF.fromGrade = (min, topic) => ({ ...topic, min, isOpen: (grade) => grade == null || grade >= min });

  // The grade you picked on the setup screen, remembered between visits (null = not chosen yet).
  FOF.grade = {
    load() {
      try {
        const g = Number(localStorage.getItem('fof-grade'));
        return g >= 1 && g <= FOF.GRADES.length ? g : null;
      } catch {
        return null; // private mode: we just ask again next time
      }
    },
    save(g) {
      try {
        localStorage.setItem('fof-grade', String(g));
      } catch {
        /* the game works, we just can't remember it */
      }
    },
  };

  FOF.openTopics = (subject, grade) => subject.topics.filter((t) => t.isOpen(grade));
  // Lowest grade at which a subject has something to ask, or null if never.
  FOF.firstGrade = (subject) => FOF.GRADES.find((g) => FOF.openTopics(subject, g.id).length)?.id ?? null;

  // register() gives each subject question(selectedTopicIds, grade): draws only from the selected topics
  // that exist at that grade (falling back to every open topic if the selection doesn't fit).
  FOF.register = (subject) => {
    subject.question = (selected, grade) => {
      const open = FOF.openTopics(subject, grade);
      const chosen = selected ? open.filter((t) => selected.has(t.id)) : open;
      return FOF.pick(chosen.length ? chosen : open.length ? open : subject.topics).make(grade);
    };
    FOF.subjects.push(subject);
  };

  FOF.rand = (n) => Math.floor(Math.random() * n);
  FOF.randInt = (min, max) => min + FOF.rand(max - min + 1);
  FOF.pick = (arr) => arr[FOF.rand(arr.length)];

  // ---------- No repeats ----------
  // A question's identity is its prompt plus its right answer ("Which of these is prime?" has many answers).
  FOF.questionKey = (q) => `${q.prompt}||${q.answer}`;

  // What you answered recently, remembered between visits so a brand-new game doesn't re-ask it.
  const RECENT_KEY = 'fof-recent';
  const RECENT_MAX = 400;
  FOF.recent = {
    load() {
      try {
        return JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
      } catch {
        return [];
      }
    },
    add(q) {
      const key = FOF.questionKey(q);
      const keys = FOF.recent.load().filter((k) => k !== key);
      keys.push(key);
      try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(keys.slice(-RECENT_MAX)));
      } catch {
        /* can't remember, so we only avoid repeats within one game */
      }
    },
  };

  // Draw from make() until we get a question whose key is in none of the `avoid` sets. null = pool is used up.
  FOF.drawFresh = (make, ...avoid) => {
    for (let tries = 0; tries < 150; tries++) {
      const q = make();
      const key = FOF.questionKey(q);
      if (!avoid.some((set) => set.has(key))) return q;
    }
    return null;
  };

  FOF.shuffle = (arr) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = FOF.rand(i + 1);
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  FOF.sample = (arr, n) => FOF.shuffle(arr).slice(0, n);

  // Right answer + (n-1) wrong ones pulled from a pool, shuffled together.
  FOF.choices = (answer, pool, n = 4) => {
    const wrong = FOF.sample([...new Set(pool)].filter((x) => x !== answer), n - 1);
    return FOF.shuffle([answer, ...wrong]);
  };

  // Plausible wrong numbers near the real answer.
  FOF.numChoices = (answer, n = 4) => {
    const options = new Set([answer]);
    const spread = Math.max(3, Math.ceil(Math.abs(answer) * 0.2));
    while (options.size < n) {
      const guess = answer + FOF.randInt(1, spread) * (Math.random() < 0.5 ? -1 : 1);
      if (answer < 0 || guess >= 0) options.add(guess); // no negative decoys for a whole-number answer
    }
    return FOF.shuffle([...options].map(String));
  };

  // [question, right answer, [wrong answers], explanation, level] -> a quiz question object.
  // `ordered` keeps True/False in a stable order (True first) instead of shuffling.
  FOF.qaQuestion = ([prompt, answer, wrong, explain], ordered = false) => ({
    prompt,
    answer,
    choices: ordered ? [answer, ...wrong].sort().reverse() : FOF.shuffle([answer, ...wrong]),
    explain: explain || '', // the quiz screen already announces the right answer
  });

  // Q&A data grouped by topic ({ 'Music': [entry, ...], ... }) -> topics, or one flat list of entries.
  FOF.qaTopics = (byTopic, ordered = false) =>
    Object.entries(byTopic).map(([label, entries]) => ({
      ...FOF.topic(label, (grade) => FOF.qaQuestion(FOF.pick(forGrade(entries, grade)), ordered)),
      isOpen: (grade) => forGrade(entries, grade).length >= MIN_POOL,
    }));
  FOF.flatQA = (byTopic) => Object.values(byTopic).flat();

  // Hyperscript-lite: h('div', {class:'x', onclick: fn}, 'text', childNode)
  FOF.h = (tag, props = {}, ...kids) => {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(props)) {
      if (key.startsWith('on')) node.addEventListener(key.slice(2), value);
      else if (key === 'style') node.style.cssText = value;
      else node.setAttribute(key, value);
    }
    node.append(...kids.flat().filter((k) => k !== null && k !== undefined && k !== false));
    return node;
  };

  // "Name|Capital|AF" style lines -> arrays of fields. Keeps data files readable.
  FOF.parseLines = (text) =>
    text.trim().split('\n').map((line) => line.trim().split('|'));
})();
