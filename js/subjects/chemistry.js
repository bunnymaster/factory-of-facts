// Subject: Periodic Table. Clickable chart + element quizzes.
(() => {
  const { h, pick, choices, numChoices } = FOF;
  const { elements, categories } = FOF.data;

  // The pool grows with the grade: the first 20 elements, then 54, then everything up to 86.
  const POOL_SIZE = { 2: 20, 3: 54, 4: 86 };
  const upTo = (g, cap = Infinity) => elements.filter((e) => e.n <= Math.min(POOL_SIZE[g] ?? 54, cap));
  const basicCategories = ['ak', 'ae', 'tm', 'pt', 'md', 'nm', 'hl', 'ng', 'ln'].map((k) => categories[k]);

  // Only use a fun-fact clue if it doesn't give the answer away.
  const clueable = (g) => upTo(g).filter((e) => e.fact && !e.fact.toLowerCase().includes(e.name.toLowerCase()));

  const kinds = {
    symbolOf: (g) => {
      const pool = upTo(g);
      const e = pick(pool);
      return { prompt: `What is the chemical symbol for ${e.name}?`, answer: e.sym, choices: choices(e.sym, pool.map((x) => x.sym)), explain: `${e.name} = ${e.sym}.` };
    },
    nameOfSymbol: (g) => {
      const pool = upTo(g);
      const e = pick(pool);
      return { prompt: `Which element has the symbol "${e.sym}"?`, answer: e.name, choices: choices(e.name, pool.map((x) => x.name)), explain: `${e.sym} stands for ${e.name}.` };
    },
    atomicNumber: (g) => {
      const e = pick(upTo(g));
      return {
        prompt: `What is the atomic number of ${e.name}?`,
        answer: String(e.n),
        choices: numChoices(e.n),
        explain: `${e.name} has ${e.n} protons, so its atomic number is ${e.n}.`,
      };
    },
    nameOfNumber: (g) => {
      const pool = upTo(g, 36);
      const e = pick(pool);
      return { prompt: `Which element has atomic number ${e.n}?`, answer: e.name, choices: choices(e.name, pool.map((x) => x.name)), explain: `Atomic number ${e.n} is ${e.name}.` };
    },
    family: (g) => {
      const e = pick(upTo(g));
      const answer = categories[e.cat];
      return {
        prompt: `${e.name} belongs to which family?`,
        answer,
        choices: choices(answer, basicCategories),
        explain: `${e.name} is a ${answer.toLowerCase()}.`,
      };
    },
    clue: (g) => {
      const pool = clueable(g);
      const e = pick(pool);
      return {
        prompt: `Which element is this? "${e.fact}"`,
        answer: e.name,
        choices: choices(e.name, pool.map((x) => x.name)),
        explain: `That's ${e.name} (${e.sym}), atomic number ${e.n}.`,
      };
    },
  };

  function detailCard(e) {
    const neutrons = Math.round(parseFloat(e.mass)) - e.n;
    const stat = (label, value) => h('div', { class: 'stat' }, h('small', {}, label), h('b', {}, String(value)));
    return h(
      'div',
      { class: 'panel element-detail' },
      h('div', { class: `big-el cat-${e.cat}` }, h('small', {}, e.n), h('b', {}, e.sym)),
      h(
        'div',
        {},
        h('h3', {}, e.name),
        h('p', { class: 'muted' }, categories[e.cat]),
        h('div', { class: 'stats' },
          stat('Atomic mass', e.mass),
          stat('Period', e.period),
          stat('Group', e.group ?? 'f-block'),
          stat('Protons', e.n),
          stat('Electrons', e.n),
          stat('Neutrons (approx.)', neutrons),
        ),
        h('p', {}, e.fact || 'No fun fact yet. This one is a quiet achiever.'),
      ),
    );
  }

  function explore(root) {
    const detail = h('div', {}, h('div', { class: 'panel element-detail' }, 'Tap any element to see its stats and a fun fact!'));
    const table = h('div', { class: 'ptable' });
    const legend = h('div', { class: 'legend' });
    let focus = null;

    const cells = elements.map((e) =>
      h(
        'button',
        {
          class: `el cat-${e.cat}`,
          style: `grid-row:${e.pos[0]};grid-column:${e.pos[1]}`,
          title: e.name,
          onclick: () => {
            detail.replaceChildren(detailCard(e));
            cells.forEach((cell) => cell.classList.toggle('selected', cell.title === e.name));
          },
        },
        h('small', {}, e.n),
        h('b', {}, e.sym),
      ),
    );
    // Little markers showing where the lanthanides / actinides were pulled out from.
    const marker = (row, label) => h('div', { class: 'el marker', style: `grid-row:${row};grid-column:3` }, label);
    table.append(...cells, marker(6, '57-71'), marker(7, '89-103'));

    const applyFocus = () => {
      cells.forEach((cell, i) => cell.classList.toggle('dim', focus !== null && elements[i].cat !== focus));
      [...legend.children].forEach((chip) => chip.classList.toggle('active', chip.dataset.cat === focus));
    };
    Object.entries(categories).forEach(([key, label]) =>
      legend.append(
        h('button', {
          class: `chip cat-${key}`,
          'data-cat': key,
          onclick: () => { focus = focus === key ? null : key; applyFocus(); },
        }, label),
      ),
    );

    root.append(
      h('p', { class: 'muted' }, 'Tap an element for details. Tap a family below to highlight it.'),
      legend,
      detail,
      h('div', { class: 'scroll-x' }, table),
    );
  }

  FOF.register({
    id: 'chemistry',
    name: 'Periodic Table',
    badge: 'Fe',
    hue: 280,
    blurb: 'All 118 elements with stats, families and fun facts.',
    facts: elements.filter((e) => e.fact).map((e) => `${e.name}: ${e.fact}`),
    lessons: FOF.data.lessons.chemistry,
    explore,
    topics: [
      FOF.fromGrade(2, FOF.topic('Symbols', kinds.symbolOf, kinds.nameOfSymbol)),
      FOF.fromGrade(2, FOF.topic('Atomic numbers', kinds.atomicNumber, kinds.nameOfNumber)),
      FOF.fromGrade(3, FOF.topic('Element families', kinds.family)),
      FOF.fromGrade(3, FOF.topic('Fun-fact clues', kinds.clue)),
    ],
  });
})();
