// Builds the "classroom" subjects (English, Science, History, ...) from plain Q&A data.
// One builder, six subjects. DRY for the win.
(() => {
  const { h } = FOF;
  const { qa } = FOF.data;

  const makeSubject = ({ id, name, badge, hue, blurb }) => {
    const { facts, qa: entries, ordered } = qa[id];

    FOF.register({
      id, name, badge, hue, blurb, facts,
      topics: FOF.qaTopics(entries, ordered),
      explore: (root) => {
        root.append(h('h3', {}, 'Did you know?'), FOF.factList(facts));
        FOF.study(root, entries, { ordered });
      },
    });
  };

  [
    { id: 'english', name: 'English', badge: 'Aa', hue: 25, blurb: 'Words, grammar, authors and figures of speech.' },
    { id: 'science', name: 'Science', badge: 'Sci', hue: 175, blurb: 'Space, the human body, physics and nature.' },
    { id: 'history', name: 'History', badge: 'Hist', hue: 40, blurb: 'Big events, famous people and ancient worlds.' },
    { id: 'arts', name: 'Arts & Music', badge: 'Art', hue: 320, blurb: 'Painters, composers, instruments and colors.' },
    { id: 'tech', name: 'Tech & Coding', badge: '</>', hue: 225, blurb: 'Computers, the internet and how code works.' },
    { id: 'fun', name: 'Fun Facts', badge: 'Wow', hue: 55, blurb: 'True or false? Weird, wild and wonderful trivia.' },
  ].forEach(makeSubject);
})();
