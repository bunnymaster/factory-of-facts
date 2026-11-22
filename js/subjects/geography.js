// Subjects: World Geography + USA States. Both use the shared card browser.
(() => {
  const { h, pick, choices } = FOF;
  const { continents, countries, cities, states, stateFacts, ambiguousCities } = FOF.data;

  // ---------- World ----------
  const citiesByCountry = {};
  cities.forEach((c) => (citiesByCountry[c.country] ||= []).push(c.name));

  const worldItems = countries.map((c) => ({
    ...c,
    tab: c.cont,
    cities: citiesByCountry[c.name] || [],
  }));
  const continentNames = Object.values(continents).map((c) => c.name);

  // "the capital of the United States", but just "the capital of France".
  const NEEDS_THE = new Set([
    'United States', 'United Kingdom', 'United Arab Emirates', 'Netherlands', 'Bahamas',
    'Philippines', 'Czech Republic', 'Dominican Republic', 'DR Congo', 'Solomon Islands',
  ]);
  const named = (name) => (NEEDS_THE.has(name) ? `the ${name}` : name);

  const continentPanel = (code) => {
    const c = continents[code];
    return h(
      'div',
      { class: 'panel' },
      h('h3', {}, c.name),
      h('p', { class: 'muted' }, `Area: ${c.area}  |  People: ${c.pop}  |  Countries listed here: ${countries.filter((x) => x.cont === code).length}`),
      h('ul', {}, c.facts.map((f) => h('li', {}, f))),
      code === 'AN' ? h('p', { class: 'muted' }, 'No countries to list here. The penguins are in charge.') : null,
    );
  };

  const countryCard = (c) =>
    h(
      'div',
      { class: 'card' },
      h('b', {}, c.name),
      h('div', {}, h('span', { class: 'tag' }, 'Capital'), ' ', c.capital),
      c.cities.length ? h('div', { class: 'muted' }, 'Cities: ' + c.cities.join(', ')) : null,
    );

  // Younger grades only get well-known countries; 6th grade and up gets the whole atlas.
  const WELL_KNOWN_COUNTRIES = new Set([
    'United States', 'Canada', 'Mexico', 'Brazil', 'Argentina', 'Peru', 'United Kingdom', 'France', 'Spain',
    'Italy', 'Germany', 'Greece', 'Russia', 'Egypt', 'Kenya', 'Nigeria', 'South Africa', 'China', 'Japan',
    'India', 'Australia', 'New Zealand',
  ]);
  const countriesFor = (g) => (g <= 2 ? countries.filter((c) => WELL_KNOWN_COUNTRIES.has(c.name)) : countries);
  const citiesFor = (g) => {
    const names = new Set(countriesFor(g).map((c) => c.name));
    return cities.filter((c) => names.has(c.country));
  };

  const world = {
    capitalOf: (g) => {
      const pool = countriesFor(g);
      const c = pick(pool);
      return {
        prompt: `What is the capital of ${named(c.name)}?`,
        answer: c.capital,
        choices: choices(c.capital, pool.map((x) => x.capital)),
        explain: `${c.capital} is the capital of ${named(c.name)}.`,
      };
    },
    countryOfCapital: (g) => {
      const pool = countriesFor(g).filter((x) => x.capital !== x.name);
      const c = pick(pool);
      return {
        prompt: `${c.capital} is the capital of which country?`,
        answer: c.name,
        choices: choices(c.name, pool.map((x) => x.name)),
        explain: `${c.capital} is the capital of ${c.name}.`,
      };
    },
    continentOf: (g) => {
      const c = pick(countriesFor(g));
      const answer = continents[c.cont].name;
      return {
        prompt: `Which continent is ${named(c.name)} in?`,
        answer,
        choices: choices(answer, continentNames),
        explain: `${c.name} is in ${answer}.`,
      };
    },
    countryOfCity: (g) => {
      const city = pick(citiesFor(g));
      return {
        prompt: `${city.name} is a city in which country?`,
        answer: city.country,
        choices: choices(city.country, countriesFor(g).map((c) => c.name)),
        explain: `${city.name} is in ${city.country}.`,
      };
    },
  };

  FOF.register({
    id: 'geography',
    name: 'World Geography',
    badge: 'GEO',
    hue: 200,
    blurb: 'Continents, countries, capitals and famous cities.',
    facts: Object.values(continents).flatMap((c) => c.facts),
    lessons: FOF.data.lessons.geography,
    explore: (root) =>
      FOF.browser(root, {
        tabs: Object.entries(continents).map(([id, c]) => ({ id, label: c.name })),
        items: worldItems,
        intro: continentPanel,
        card: countryCard,
        matches: (c, q) => [c.name, c.capital, ...c.cities].some((s) => s.toLowerCase().includes(q)),
      }),
    topics: [
      FOF.topic('Continents', world.continentOf),
      FOF.fromGrade(2, FOF.topic('Capitals', world.capitalOf, world.countryOfCapital)),
      FOF.fromGrade(2, FOF.topic('Famous cities', world.countryOfCity)),
    ],
  });

  // ---------- USA ----------
  const stateNames = states.map((s) => s.name);

  // City names that appear twice in our data (Portland, Charleston...) or in many real states are unfair.
  const cityCounts = {};
  states.forEach((s) => [s.capital, s.city].forEach((n) => (cityCounts[n] = (cityCounts[n] || 0) + 1)));
  const unambiguousCities = states.flatMap((s) =>
    [s.capital, s.city]
      .filter((n) => cityCounts[n] === 1 && !ambiguousCities.has(n))
      .map((n) => ({ city: n, state: s.name })),
  );

  const stateByName = Object.fromEntries(states.map((s) => [s.name, s]));

  const sayState = (s) => `${s.name} (${s.say})`;
  const sayCapital = (s) => `${s.capital} (${s.capitalSay})`;

  // Shown after every state question, so each answer also teaches the abbreviation and a fun fact.
  const stateNote = (s) => `${s.name} is ${s.abbr} for short. Fun fact: ${s.fact}`;
  const stateFactLine = (s) => `${s.name} (${s.abbr}): ${s.fact}`;

  const stateCard = (s) =>
    h(
      'div',
      { class: 'card' },
      h('b', {}, s.name),
      h('div', { class: 'muted' }, `Say it: ${s.say}`),
      h('div', {}, h('span', { class: 'tag' }, 'Abbreviation'), ' ', s.abbr),
      h('div', {}, h('span', { class: 'tag' }, 'Capital'), ' ', s.capital),
      h('div', { class: 'muted' }, `Say it: ${s.capitalSay}`),
      h('div', { class: 'muted' }, `Big city: ${s.city}`),
      h('div', {}, h('span', { class: 'tag' }, 'Fun fact'), ' ', s.fact),
    );

  const WELL_KNOWN_STATES = new Set([
    'California', 'Texas', 'Florida', 'New York', 'Hawaii', 'Alaska', 'Arizona', 'Colorado', 'Massachusetts',
    'Illinois', 'Pennsylvania', 'Washington',
  ]);
  const statesFor = (g) => (g <= 2 ? states.filter((s) => WELL_KNOWN_STATES.has(s.name)) : states);

  const usa = {
    capitalOf: (g) => {
      const pool = statesFor(g);
      const s = pick(pool);
      return {
        prompt: `What is the capital of ${s.name}?`,
        answer: s.capital,
        choices: choices(s.capital, pool.map((x) => x.capital)),
        explain: `${sayCapital(s)} is the capital of ${sayState(s)}. ${stateNote(s)}`,
      };
    },
    stateOfCapital: (g) => {
      const pool = statesFor(g);
      const s = pick(pool);
      return {
        prompt: `${s.capital} is the capital of which state?`,
        answer: s.name,
        choices: choices(s.name, pool.map((x) => x.name)),
        explain: `${sayCapital(s)} is the capital of ${sayState(s)}. ${stateNote(s)}`,
      };
    },
    stateOfCity: () => {
      const c = pick(unambiguousCities);
      return {
        prompt: `In which state is the city of ${c.city}?`,
        answer: c.state,
        choices: choices(c.state, stateNames),
        explain: `${c.city} is in ${sayState(stateByName[c.state])}. ${stateNote(stateByName[c.state])}`,
      };
    },
    stateOfAbbr: () => {
      const s = pick(states);
      return {
        prompt: `Which state has the postal abbreviation "${s.abbr}"?`,
        answer: s.name,
        choices: choices(s.name, stateNames),
        explain: `${s.abbr} stands for ${sayState(s)}. Fun fact: ${s.fact}`,
      };
    },
  };

  FOF.register({
    id: 'usa',
    name: 'USA States',
    badge: 'USA',
    hue: 355,
    blurb: 'All 50 states: how to say them, abbreviations, capitals, big cities and a fun fact each.',
    facts: [...stateFacts, ...states.map(stateFactLine)],
    lessons: FOF.data.lessons.usa,
    explore: (root) => {
      root.append(
        h('div', { class: 'panel' }, h('ul', {}, stateFacts.slice(0, 4).map((f) => h('li', {}, f)))),
      );
      FOF.browser(root, {
        items: states,
        card: stateCard,
        matches: (s, q) => [s.name, s.capital, s.city, s.abbr].some((x) => x.toLowerCase().includes(q)),
      });
    },
    topics: [
      FOF.fromGrade(2, FOF.topic('Capitals', usa.capitalOf, usa.stateOfCapital)),
      FOF.fromGrade(3, FOF.topic('Cities', usa.stateOfCity)),
      FOF.fromGrade(3, FOF.topic('Abbreviations', usa.stateOfAbbr)),
    ],
  });
})();
