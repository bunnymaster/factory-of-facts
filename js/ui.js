// Shared UI pieces: screen mounting, back button, searchable card browser.
(() => {
  const { h } = FOF;

  // Swap the whole screen.
  FOF.mount = (...nodes) => {
    document.getElementById('app').replaceChildren(...nodes);
    window.scrollTo(0, 0);
  };

  FOF.backButton = (label, onclick) =>
    h('button', { class: 'btn ghost back', onclick }, `← ${label}`);

  FOF.factList = (facts) =>
    h('div', { class: 'panel' }, h('ul', {}, facts.map((f) => h('li', {}, f))));

  // Flash card: tap to reveal the answer. A real <button> gives keyboard focus + Enter/Space for free.
  FOF.flashcard = ([prompt, answer, , explain]) => {
    const back = h('div', { class: 'answer hidden' }, h('b', {}, answer), explain ? h('div', { class: 'muted' }, explain) : null);
    const card = h(
      'button',
      {
        class: 'card flash',
        'aria-expanded': 'false',
        onclick: () => {
          const nowHidden = back.classList.toggle('hidden');
          card.setAttribute('aria-expanded', String(!nowHidden));
        },
      },
      h('div', {}, prompt),
      back,
    );
    return card;
  };

  // After an answer: lock the buttons and paint the right one green and the picked wrong one red.
  FOF.markChoices = (buttons, choices, answer, picked) =>
    buttons.forEach((b, i) => {
      b.disabled = true;
      if (choices[i] === answer) b.classList.add('correct');
      else if (choices[i] === picked) b.classList.add('wrong');
    });

  FOF.flashcards = (entries) => h('div', { class: 'cards' }, entries.map(FOF.flashcard));

  // Searchable card grid with optional tabs and an intro panel per tab.
  // items: [{tab?, ...}]  matches(item, query) -> bool  card(item) -> Node
  FOF.browser = (root, { tabs = [], items, matches, card, intro }) => {
    let active = tabs.length ? tabs[0].id : null;
    let query = '';

    const tabBar = h('div', { class: 'tabs' });
    const panel = h('div');
    const grid = h('div', { class: 'cards' });
    const search = h('input', {
      class: 'search',
      type: 'search',
      placeholder: 'Search…',
      'aria-label': 'Search',
      oninput: (e) => {
        query = e.target.value.trim().toLowerCase();
        draw();
      },
    });

    function draw() {
      tabBar.replaceChildren(
        ...tabs.map((t) =>
          h(
            'button',
            {
              class: 'tab' + (!query && t.id === active ? ' active' : ''),
              'aria-pressed': String(!query && t.id === active),
              onclick: () => {
                active = t.id;
                draw();
              },
            },
            t.label,
          ),
        ),
      );
      const shown = items.filter((i) =>
        query ? matches(i, query) : !tabs.length || i.tab === active,
      );
      const top = query
        ? h('p', { class: 'muted' }, `${shown.length} ${shown.length === 1 ? 'result' : 'results'} for “${query}”`)
        : intro && intro(active);
      panel.replaceChildren(...(top ? [top] : []));
      grid.replaceChildren(...shown.map(card));
      if (!shown.length) grid.append(h('p', { class: 'muted' }, 'Nothing found. Try another word!'));
    }

    root.append(search, tabBar, panel, grid);
    draw();
  };
})();
