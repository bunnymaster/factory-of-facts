// Subjects: Add & Multiply, Subtract & Divide, Older Operations. Questions are generated fresh every time,
// so no memorizing the answers!
(() => {
  const { h, pick, randInt: R, shuffle, numChoices } = FOF;

  const make = (prompt, answer, why = '') => ({
    prompt,
    answer: String(answer),
    choices: numChoices(answer),
    explain: why, // the quiz screen already announces the right answer
  });

  const TRIPLES = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [7, 24, 25]];
  const PRIMES = [11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
  const NOT_PRIMES = [15, 21, 25, 27, 33, 35, 39, 45, 49, 51, 55, 57];

  // Everything below takes a grade (1 = K-2 ... 4 = 9-12) and scales the numbers to match.
  const RANGE = { 1: [1, 10], 2: [10, 99], 3: [100, 999], 4: [1000, 9999] };
  const SIDE = { 2: [2, 12], 3: [3, 25], 4: [5, 40] };
  const FACTORS = {
    1: () => [pick([2, 5, 10]), R(1, 10)],
    2: () => [R(2, 12), R(2, 12)],
    3: () => [R(6, 15), R(11, 25)],
    4: () => [R(12, 30), R(12, 30)],
  };
  const QUOTIENT = { 2: [[2, 12], [2, 12]], 3: [[2, 12], [11, 30]], 4: [[6, 25], [11, 40]] };

  const twoDistinct = (g) => {
    const [lo, hi] = RANGE[g];
    const a = R(lo, hi);
    let b = R(lo, hi);
    while (b === a) b = R(lo, hi);
    return [Math.max(a, b), Math.min(a, b)];
  };

  // "Break it up" working for + and −: 47 + 38 -> 47 + 30 = 77, then 77 + 8 = 85.
  // Round or single-digit numbers have nothing to split, so they get the column method instead.
  const breakUp = (a, b, sign) => {
    const ones = b % 10, big = b - ones, op = sign > 0 ? '+' : '−';
    if (!ones || !big) return `Line up the digits and work one column at a time: ${a} ${op} ${b} = ${a + sign * b}.`;
    const mid = a + sign * big;
    return `Break it up: ${a} ${op} ${big} = ${mid}, then ${mid} ${op} ${ones} = ${mid + sign * ones}.`;
  };

  const kinds = {
    add: (g) => {
      const [lo, hi] = RANGE[g];
      const a = R(lo, hi), b = R(lo, hi);
      const how = g === 1 ? `Start at ${a} and count up ${b} more. You land on ${a + b}.` : breakUp(a, b, 1);
      return make(`${a} + ${b} = ?`, a + b, how);
    },
    subtract: (g) => {
      const [a, b] = twoDistinct(g);
      const how = g === 1 ? `Count back ${b} from ${a}. You land on ${a - b}. Check: ${a - b} + ${b} = ${a}.` : `${breakUp(a, b, -1)} Check: ${a - b} + ${b} = ${a}.`;
      return make(`${a} − ${b} = ?`, a - b, how);
    },
    multiply: (g) => {
      const [a, b] = FACTORS[g]();
      const ones = b % 10, tens = b - ones;
      const how = b > 10 && ones
        ? `Split ${b} into ${tens} + ${ones}: ${a} × ${tens} = ${a * tens} and ${a} × ${ones} = ${a * ones}. Add them: ${a * b}.`
        : `${a} × ${b} means ${a} groups of ${b}.`;
      return make(`${a} × ${b} = ?`, a * b, how);
    },
    divide: (g) => {
      const [[bLo, bHi], [qLo, qHi]] = QUOTIENT[g];
      const b = R(bLo, bHi), q = R(qLo, qHi);
      return make(`${b * q} ÷ ${b} = ?`, q, `${b} × ${q} = ${b * q}`);
    },
    fraction: (g) => {
      const den = g === 2 ? pick([2, 3, 4, 5]) : R(2, 12), num = R(1, den - 1), k = R(2, g === 2 ? 8 : 12);
      return make(`What is ${num}/${den} of ${den * k}?`, num * k, `${den * k} ÷ ${den} = ${k}, then × ${num}.`);
    },
    percent: (g) => {
      // Multiples of 5% of multiples of 20 always give whole numbers.
      const p = g === 3 ? pick([10, 20, 25, 50, 75]) : R(1, 19) * 5, n = R(1, g === 3 ? 10 : 20) * 20;
      return make(`What is ${p}% of ${n}?`, (p * n) / 100, `${p}% means ${p} out of every 100, so ${n} × ${p} ÷ 100 = ${(p * n) / 100}.`);
    },
    square: (g) => { const n = R(2, g === 3 ? 12 : 20); return make(`${n}² = ?`, n * n, `${n} × ${n}`); },
    root: (g) => { const n = R(2, g === 3 ? 12 : 20); return make(`√${n * n} = ?`, n, `${n} × ${n} = ${n * n}`); },
    algebra: (g) => {
      const x = R(2, g === 3 ? 12 : 15), a = R(2, g === 3 ? 9 : 12), b = R(1, g === 3 ? 20 : 40);
      return make(`Solve for x:  ${a}x + ${b} = ${a * x + b}`, x, `Subtract ${b}: ${a}x = ${a * x}. Divide by ${a}: x = ${x}. Check: ${a} × ${x} + ${b} = ${a * x + b}.`);
    },
    rectArea: (g) => {
      const w = R(...SIDE[g]), l = R(...SIDE[g]);
      return make(`A rectangle is ${w} by ${l}. What is its area?`, w * l, 'Area = width × length.');
    },
    rectPerimeter: (g) => {
      const w = R(...SIDE[g]), l = R(...SIDE[g]);
      return make(`A rectangle is ${w} by ${l}. What is its perimeter?`, 2 * (w + l), 'Perimeter = 2 × (width + length).');
    },
    triangleArea: (g) => {
      const b = R(2, g === 3 ? 10 : 20) * 2, ht = R(2, g === 3 ? 12 : 25);
      return make(`A triangle has base ${b} and height ${ht}. What is its area?`, (b * ht) / 2, 'Area = ½ × base × height.');
    },
    hypotenuse: (g) => {
      const k = g >= 4 ? R(1, 3) : 1; // scaled triples (6-8-10 style) for the oldest grade
      const [a, b, c] = pick(TRIPLES).map((side) => side * k);
      return make(`A right triangle has legs ${a} and ${b}. How long is the hypotenuse?`, c, `${a}² + ${b}² = ${c}²`);
    },
    orderOfOps: (g) => {
      if (g === 2) {
        const a = R(2, 20), b = R(2, 9), c = R(2, 9);
        return make(`${a} + ${b} × ${c} = ?`, a + b * c, 'Multiply first, then add (order of operations).');
      }
      const a = R(10, 30), b = R(2, 9), c = R(2, 9), d = R(1, 9);
      return make(`${a} + ${b} × ${c} − ${d} = ?`, a + b * c - d, 'Multiply first, then add and subtract from left to right.');
    },
    prime: () => {
      const answer = String(pick(PRIMES));
      return {
        prompt: 'Which of these is a prime number?',
        answer,
        choices: shuffle([answer, ...FOF.sample(NOT_PRIMES, 3).map(String)]),
        explain: `${answer} can only be divided evenly by 1 and itself.`,
      };
    },
  };

  // ---------- Explorers ----------
  const FORMULAS = [
    ['Area of a rectangle', 'width × length'],
    ['Area of a triangle', '½ × base × height'],
    ['Area of a circle', 'π × radius²'],
    ['Circumference of a circle', '2 × π × radius'],
    ['Pythagorean theorem', 'a² + b² = c²'],
    ['Perimeter of a rectangle', '2 × (width + length)'],
    ['Percent of a number', 'number × percent ÷ 100'],
    ['Speed', 'distance ÷ time'],
  ];

  const cheatSheet = (root) =>
    root.append(
      h('h3', {}, 'Formula cheat sheet'),
      h('div', { class: 'cards' }, FORMULAS.map(([name, f]) => h('div', { class: 'card' }, h('b', {}, name), h('div', {}, f)))),
    );

  // Pick a number, see its table. `fact(n, k)` is what each card says, e.g. "7 × 3 = 21".
  const tableExplorer = (title, fact) => (root) => {
    let n = 7;
    const buttons = h('div', { class: 'tabs' });
    const table = h('div', { class: 'cards times' });
    const ONE_TO_12 = Array.from({ length: 12 }, (_, i) => i + 1);

    const draw = () => {
      buttons.replaceChildren(
        ...ONE_TO_12.map((k) => h('button', { class: 'tab' + (k === n ? ' active' : ''), onclick: () => { n = k; draw(); } }, String(k))),
      );
      table.replaceChildren(...ONE_TO_12.map((k) => h('div', { class: 'card' }, ...fact(n, k))));
    };

    root.append(h('h3', {}, title), h('p', { class: 'muted' }, 'Pick a number to see its table.'), buttons, table);
    draw();
  };

  // ---------- The three math groups ----------
  const T = {
    add: FOF.topic('Addition', kinds.add),
    subtract: FOF.topic('Subtraction', kinds.subtract),
    multiply: FOF.topic('Multiplication', kinds.multiply),
    divide: FOF.fromGrade(2, FOF.topic('Division', kinds.divide)),
    fractions: FOF.fromGrade(2, FOF.topic('Fractions', kinds.fraction)),
    order: FOF.fromGrade(2, FOF.topic('Order of operations', kinds.orderOfOps)),
    area: FOF.fromGrade(2, FOF.topic('Area & perimeter', kinds.rectArea, kinds.rectPerimeter)),
    percent: FOF.fromGrade(3, FOF.topic('Percents', kinds.percent)),
    squares: FOF.fromGrade(3, FOF.topic('Squares & roots', kinds.square, kinds.root)),
    algebra: FOF.fromGrade(3, FOF.topic('Algebra', kinds.algebra)),
    triangles: FOF.fromGrade(3, FOF.topic('Triangles', kinds.triangleArea, kinds.hypotenuse)),
    primes: FOF.fromGrade(3, FOF.topic('Primes', kinds.prime)),
  };

  // Lessons live in one data list; each group shows the ones for its own topics.
  const mathGroup = (info, topics) =>
    FOF.register({
      ...info,
      topics,
      lessons: FOF.data.lessons.math.filter((l) => topics.some((t) => t.label === l.topic)),
    });

  mathGroup(
    {
      id: 'math-addmul', name: 'Add & Multiply', badge: '+×', hue: 140,
      blurb: 'Addition and multiplication, with a times table to explore.',
      facts: [
        '111,111,111 × 111,111,111 = 12,345,678,987,654,321.',
        'The word "hundred" comes from an old Norse word that actually meant 120.',
        'Multiplying by 9? The digits of the answer add up to 9 (9 × 4 = 36, and 3 + 6 = 9).',
      ],
      explore: tableExplorer('Times table', (n, k) => [`${n} × ${k} = `, h('b', {}, String(n * k))]),
    },
    [T.add, T.multiply],
  );

  mathGroup(
    {
      id: 'math-subdiv', name: 'Subtract & Divide', badge: '−÷', hue: 170,
      blurb: 'Subtraction and division, with a division table to explore.',
      facts: [
        'There are 86,400 seconds in a day.',
        'Dividing by zero is not allowed: no number works as the answer!',
        'Division and multiplication are opposites, so 56 ÷ 7 = 8 because 7 × 8 = 56.',
      ],
      explore: tableExplorer('Division table', (n, k) => [`${n * k} ÷ ${n} = `, h('b', {}, String(k))]),
    },
    [T.subtract, T.divide],
  );

  mathGroup(
    {
      id: 'math-more', name: 'Older Operations', badge: 'π', hue: 110,
      blurb: 'Fractions, percents, algebra, geometry, primes and more.',
      facts: [
        'A "googol" is the number 1 followed by 100 zeros.',
        'Zero is the only number that cannot be written with Roman numerals.',
        'Pi never ends and never repeats. Computers have calculated trillions of its digits.',
        'A circle has infinite lines of symmetry.',
      ],
      explore: cheatSheet,
    },
    [T.fractions, T.order, T.area, T.percent, T.squares, T.algebra, T.triangles, T.primes],
  );
})();
