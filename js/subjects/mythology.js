// Subjects: Greek Mythology, World Mythology, World Religions.
// Each mixes table-driven questions (gods, symbols, texts...) with story questions from mythQA.
(() => {
  const { h, pick, choices, shuffle } = FOF;
  const { greekGods, deities, sharedDeityNames, traditionBlurbs, religions, mythQA } = FOF.data;

  const has = (q) => (...fields) => fields.some((f) => f.toLowerCase().includes(q));

  const question = (prompt, answer, pool, explain) => ({ prompt, answer, choices: choices(answer, pool), explain });

  // ---------- Greek Mythology ----------
  const greekNames = greekGods.map((g) => g.name);
  const romanNames = greekGods.map((g) => g.roman);
  const symbols = greekGods.map((g) => g.symbol);

  const godCard = (g) =>
    h(
      'div',
      { class: 'card' },
      h('b', {}, g.name, ' ', g.roman !== g.name ? h('span', { class: 'tag' }, `Roman: ${g.roman}`) : null),
      h('div', {}, g.role),
      h('div', { class: 'muted' }, `Symbol: ${g.symbol}`),
    );

  const greekKinds = {
    romanName: () => {
      const g = pick(greekGods.filter((x) => x.name !== x.roman));
      return question(`What did the Romans call the Greek god ${g.name}?`, g.roman, romanNames, `${g.name} (Greek) is ${g.roman} (Roman).`);
    },
    roleToGod: () => {
      const g = pick(greekGods);
      return question(`In Greek mythology, who is the ${g.role}?`, g.name, greekNames, `${g.name} is the ${g.role}.`);
    },
    symbolOf: () => {
      const g = pick(greekGods);
      return question(`Which symbol is linked with ${g.name}?`, g.symbol, symbols, `${g.name}'s symbol: ${g.symbol.toLowerCase()}.`);
    },
    godOfSymbol: () => {
      const g = pick(greekGods);
      return question(`Which Greek god or goddess is linked with this symbol: ${g.symbol.toLowerCase()}?`, g.name, greekNames, `${g.name} is the ${g.role}.`);
    },
  };

  FOF.register({
    id: 'greek',
    name: 'Greek Mythology',
    badge: 'Gr',
    hue: 255,
    blurb: 'Olympian gods, heroes, monsters and their Roman names.',
    facts: mythQA.greek.facts,
    topics: [
      FOF.fromGrade(3, FOF.topic('Roman names', greekKinds.romanName)),
      FOF.fromGrade(2, FOF.topic('Gods and their jobs', greekKinds.roleToGod)),
      FOF.fromGrade(2, FOF.topic('Symbols', greekKinds.symbolOf, greekKinds.godOfSymbol)),
      ...FOF.qaTopics(mythQA.greek.qa),
    ],
    explore: (root) => {
      root.append(h('h3', {}, 'Did you know?'), FOF.factList(mythQA.greek.facts), h('h3', {}, 'Gods and goddesses'));
      FOF.browser(root, {
        items: greekGods,
        card: godCard,
        matches: (g, q) => has(q)(g.name, g.roman, g.role, g.symbol),
      });
      FOF.study(root, mythQA.greek.qa, { title: 'Heroes, monsters and legends' });
    },
  });

  // ---------- World Mythology ----------
  const traditions = [...new Set(deities.map((d) => d.tradition))];
  // Roman deities are renamed Greek ones, so we keep them out of "which mythology?" questions.
  const traceable = deities.filter((d) => !sharedDeityNames.has(d.name));

  // Wrong answers from the same tradition first, so the quiz is a real test, not a coin flip.
  const nearbyNames = (d) => {
    const same = shuffle(deities.filter((x) => x.tradition === d.tradition && x.name !== d.name));
    const others = shuffle(deities.filter((x) => x.tradition !== d.tradition));
    return [...same, ...others].slice(0, 3).map((x) => x.name);
  };

  const worldKinds = {
    godByRole: () => {
      const d = pick(deities);
      return {
        prompt: `In ${d.tradition} mythology, who is the ${d.role}?`,
        answer: d.name,
        choices: shuffle([d.name, ...nearbyNames(d)]),
        explain: `${d.name} is the ${d.role}.`,
      };
    },
    traditionOf: () => {
      const d = pick(traceable);
      return question(`${d.name} comes from which mythology?`, d.tradition, traditions, `${d.name} is the ${d.role} in ${d.tradition} mythology.`);
    },
  };

  FOF.register({
    id: 'mythology',
    name: 'World Mythology',
    badge: 'Myth',
    hue: 110,
    blurb: 'Norse, Egyptian, Hindu, Celtic, Aztec, Japanese and more.',
    facts: mythQA.world.facts,
    topics: [
      FOF.fromGrade(3, FOF.topic('Gods by tradition', worldKinds.godByRole)),
      FOF.fromGrade(3, FOF.topic('Which mythology?', worldKinds.traditionOf)),
      ...FOF.qaTopics(mythQA.world.qa),
    ],
    explore: (root) => {
      root.append(h('h3', {}, 'Did you know?'), FOF.factList(mythQA.world.facts), h('h3', {}, 'Gods and goddesses by tradition'));
      FOF.browser(root, {
        tabs: traditions.map((t) => ({ id: t, label: t })),
        items: deities.map((d) => ({ ...d, tab: d.tradition })),
        intro: (t) => h('div', { class: 'panel' }, h('p', {}, traditionBlurbs[t])),
        card: (d) => h('div', { class: 'card' }, h('b', {}, d.name, ' ', h('span', { class: 'tag' }, d.tradition)), h('div', {}, d.role)),
        matches: (d, q) => has(q)(d.name, d.role, d.tradition),
      });
      FOF.study(root, mythQA.world.qa, { title: 'Legends and stories' });
    },
  });

  // ---------- World Religions ----------
  const names = religions.map((r) => r.name);
  const texts = religions.map((r) => r.text);
  const places = religions.map((r) => r.place);
  const figures = religions.map((r) => r.figure);

  const religionCard = (r) => {
    const line = (label, value) => h('div', {}, h('span', { class: 'tag' }, label), ' ', value);
    return h(
      'div',
      { class: 'card' },
      h('b', {}, r.name),
      h('div', { class: 'muted' }, `Followers: ${r.followers}`),
      line('Text', r.text),
      line('Worship', r.place),
      line('Origin', r.figure),
      h('div', { class: 'muted' }, r.idea),
    );
  };

  const religionKinds = {
    textOf: () => {
      const r = pick(religions);
      return question(`What is a main holy text of ${r.name}?`, r.text, texts, `${r.text} is a central text of ${r.name}.`);
    },
    religionOfText: () => {
      const r = pick(religions);
      return question(`"${r.text}" is a main holy text of which religion?`, r.name, names, `That is the holy text of ${r.name}.`);
    },
    placeOf: () => {
      const r = pick(religions);
      return question(`What is a place of worship for followers of ${r.name}?`, r.place, places, `Followers of ${r.name} worship at a ${r.place.toLowerCase()}.`);
    },
    founderOf: () => {
      const r = pick(religions);
      return question(`Who is the founder or central figure of ${r.name}?`, r.figure, figures, r.figure === 'No single founder' ? `${r.name} grew over time and has no single founder.` : `${r.figure} is closely tied to the start of ${r.name}.`);
    },
    religionOfIdea: () => {
      const r = pick(religions);
      return question(`Which religion is described by this key idea: ${r.idea}?`, r.name, names, `That describes ${r.name}.`);
    },
  };

  FOF.register({
    id: 'religions',
    name: 'World Religions',
    badge: 'Faith',
    hue: 70,
    blurb: 'Beliefs, holy texts, places of worship and festivals.',
    facts: mythQA.religions.facts,
    topics: [
      FOF.fromGrade(3, FOF.topic('Holy texts', religionKinds.textOf, religionKinds.religionOfText)),
      FOF.fromGrade(3, FOF.topic('Places of worship', religionKinds.placeOf)),
      FOF.fromGrade(3, FOF.topic('Founders', religionKinds.founderOf)),
      FOF.fromGrade(3, FOF.topic('Key ideas', religionKinds.religionOfIdea)),
      ...FOF.qaTopics(mythQA.religions.qa),
    ],
    explore: (root) => {
      root.append(
        h('p', { class: 'muted' }, 'Here the religions are described simply and respectfully, the way their followers might explain them. Numbers are rough estimates.'),
        h('h3', {}, 'Did you know?'),
        FOF.factList(mythQA.religions.facts),
        h('h3', {}, 'Meet the religions'),
      );
      FOF.browser(root, {
        items: religions,
        card: religionCard,
        matches: (r, q) => has(q)(r.name, r.text, r.place, r.figure, r.idea),
      });
      FOF.study(root, mythQA.religions.qa);
    },
  });
})();
