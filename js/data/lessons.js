// Lesson text. Each lesson: topic (must match a topic label), idea (paragraphs), tips, hint.
// Subjects pick theirs up with `lessons: FOF.data.lessons.<subjectId>`.
FOF.data.lessons = {
  math: [
    {
      topic: 'Addition',
      idea: ['Addition puts amounts together. The answer is called the sum.'],
      tips: [
        'Order does not matter: 8 + 5 is the same as 5 + 8.',
        'Break big numbers into tens and ones: 47 + 38 is 47 + 30 = 77, then 77 + 8 = 85.',
        'Make a ten: 9 + 6 is 9 + 1 = 10, then 10 + 5 = 15.',
      ],
      hint: 'Split the second number into tens and ones, and add one piece at a time.',
    },
    {
      topic: 'Subtraction',
      idea: ['Subtraction takes an amount away, or finds the gap between two numbers. The answer is called the difference.'],
      tips: [
        'Subtraction undoes addition: if 12 − 5 = 7, then 7 + 5 = 12. Use that to check your work!',
        'Count up from the smaller number to the bigger one to find the gap.',
        'Break it up: 85 − 38 is 85 − 30 = 55, then 55 − 8 = 47.',
      ],
      hint: 'Split the second number into tens and ones, and take away one piece at a time.',
    },
    {
      topic: 'Multiplication',
      idea: ['Multiplying is adding the same number again and again. 4 × 3 means 4 groups of 3, which is 3 + 3 + 3 + 3 = 12.'],
      tips: [
        'Order does not matter: 3 × 7 = 7 × 3.',
        'Times 10 adds a zero on the end: 6 × 10 = 60.',
        'Times 5 always ends in 0 or 5.',
        'The 9s trick: the digits of the answer add up to 9 (9 × 4 = 36, and 3 + 6 = 9).',
      ],
      hint: 'Picture equal groups, or skip count: 3, 6, 9, 12...',
    },
    {
      topic: 'Division',
      idea: ['Division splits an amount into equal groups, or asks how many times one number fits into another. It is the opposite of multiplication.'],
      tips: [
        'Turn it around: 56 ÷ 7 = ? is the same as 7 × ? = 56.',
        'Any number divided by 1 stays the same. Any number divided by itself is 1.',
        'Check your answer: answer × the number you divided by should give the starting number.',
      ],
      hint: 'What times the small number gives the big number?',
    },
    {
      topic: 'Fractions',
      idea: [
        'A fraction shows equal parts of a whole. The bottom number (denominator) is how many equal parts there are. The top number (numerator) is how many parts you take.',
      ],
      tips: [
        'To find a fraction of a number: divide by the bottom, then multiply by the top.',
        '1/2 is the same amount as 2/4 and 5/10.',
        'A bigger bottom number means smaller pieces: 1/8 of a pizza is less than 1/4.',
      ],
      hint: 'Divide by the bottom number first.',
    },
    {
      topic: 'Order of operations',
      idea: [
        'When a problem mixes operations, everyone follows the same order so we all get the same answer. Multiply and divide first, then add and subtract. Anything in parentheses goes before all of that.',
      ],
      tips: [
        'PEMDAS helps you remember: Parentheses, Exponents, Multiply/Divide, Add/Subtract.',
        '2 + 3 × 4 is 14, not 20. Multiplication jumps the line!',
        'Steps at the same level go left to right.',
      ],
      hint: 'Do the multiplication first, then add and subtract.',
    },
    {
      topic: 'Area & perimeter',
      idea: ['Perimeter is the distance around a shape, like a fence. Area is the space inside it, like the grass in the yard.'],
      tips: [
        'Perimeter: add up all the sides. A rectangle has two widths and two lengths.',
        'Area of a rectangle: width × length.',
        'Area is counted in square units (cm²). Perimeter is counted in plain units (cm).',
      ],
      hint: 'Area: multiply the two sides. Perimeter: add all four sides.',
    },
    {
      topic: 'Percents',
      idea: ['Percent means "out of 100". 50% is half, 25% is a quarter, and 10% is one tenth.'],
      tips: [
        '10% of a number: divide it by 10 (10% of 80 is 8).',
        '50% means divide by 2. 25% means divide by 4.',
        'Build the others from pieces: 15% is 10% + 5%.',
      ],
      hint: 'Find 10% first, then scale up or down.',
    },
    {
      topic: 'Squares & roots',
      idea: [
        'Squaring a number means multiplying it by itself: 5² = 5 × 5 = 25. A square root goes backwards: √25 = 5, because 5 × 5 = 25.',
      ],
      tips: [
        'Perfect squares to know: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144.',
        'A square with sides of 5 has an area of 25. That is where the name comes from!',
        'Squaring is not doubling: 5² is 25, not 10.',
      ],
      hint: 'Multiply the number by itself, or ask: what number times itself gives this?',
    },
    {
      topic: 'Algebra',
      idea: [
        'Algebra uses a letter, like x, for a mystery number. Solving means finding out what x has to be. The trick: do the opposite operation to get x all alone.',
      ],
      tips: [
        'Undo addition with subtraction, and undo multiplication with division.',
        'Undo in reverse order: first the + or −, then the × or ÷.',
        'Always check: put your answer back into the problem.',
      ],
      hint: 'Subtract the loose number first, then divide.',
    },
    {
      topic: 'Triangles',
      idea: [
        "A triangle's area is half of a rectangle with the same base and height. In a right triangle (one square corner), the longest side, across from that corner, is called the hypotenuse.",
      ],
      tips: [
        'Area = ½ × base × height.',
        'Pythagorean theorem: a² + b² = c², where c is the hypotenuse.',
        'Famous triples: 3-4-5, 5-12-13 and 8-15-17 (and multiples, like 6-8-10).',
      ],
      hint: 'Area: multiply base and height, then halve it. Hypotenuse: square both legs, add them, then take the square root.',
    },
    {
      topic: 'Primes',
      idea: ['A prime number has exactly two factors: 1 and itself. 2, 3, 5, 7 and 11 are prime. Numbers with more factors are called composite.'],
      tips: [
        '2 is the only even prime number.',
        '1 is not prime, because it only has one factor.',
        'To test a number under 100, try dividing by 2, 3, 5 and 7. If none divide evenly, it is prime.',
      ],
      hint: 'Try dividing each choice by 2, 3, 5 and 7.',
    },
  ],

  geography: [
    {
      topic: 'Continents',
      idea: ['Earth has seven continents: Africa, Antarctica, Asia, Australia/Oceania, Europe, North America and South America.'],
      tips: [
        'Asia is the biggest continent, and most of the world\'s people live there.',
        'Africa has the most countries. Antarctica has none, only research stations!',
        'Picture a globe and think about where the country is, then which land mass it sits on.',
      ],
      hint: 'Picture the globe. Which land mass is the country on?',
    },
    {
      topic: 'Capitals',
      idea: ['A capital is the city where a country\'s government works. It is often big and famous, but not always!'],
      tips: [
        'Surprise capitals: Australia\'s is Canberra (not Sydney), Canada\'s is Ottawa (not Toronto), Brazil\'s is Brasília (not Rio).',
        'Learn a few at a time, grouped by continent.',
        'Quiz yourself on both directions: country → capital and capital → country.',
      ],
      hint: 'The most famous city is not always the capital.',
    },
    {
      topic: 'Famous cities',
      idea: ['Many famous cities are not capitals. Knowing which country they are in helps you place them on the map.'],
      tips: [
        'Sydney, Toronto and Rio de Janeiro are famous, but they are not capitals.',
        'Link a city to a landmark or a picture you know.',
        'Think about the continent first, then narrow it down.',
      ],
      hint: 'Think of a landmark, or start with the continent.',
    },
  ],

  usa: [
    {
      topic: 'Capitals',
      idea: ['Each state has one capital city where its government meets. The capital is often NOT the biggest city.'],
      tips: [
        'Surprises: Sacramento (not Los Angeles) in California, Albany (not New York City) in New York, Austin (not Houston) in Texas, Tallahassee (not Miami) in Florida.',
        'Washington, D.C. is the capital of the whole country, and it is not in any state.',
        'Learn one region at a time: the West, the South, and so on.',
      ],
      hint: 'Capitals are often smaller than the big famous cities.',
    },
    {
      topic: 'Cities',
      idea: ['Knowing which state a city is in helps you picture the map of the USA.'],
      tips: [
        'Some names repeat in several states (Portland is in Oregon and in Maine), so we only quiz cities with a clear answer.',
        'Group states by region: the West Coast is California, Oregon and Washington.',
        'Think of what the city is known for: a team, a landmark, or a famous festival.',
      ],
      hint: 'Picture the map: is it on a coast, in the middle, or up north?',
    },
    {
      topic: 'Abbreviations',
      idea: ['The post office gives every state a two-letter code, always written in capital letters.'],
      tips: [
        'Two-word states use both initials: NY, NJ, NH, NM, NC, ND, RI, SC, SD, WV.',
        'Many states use their first two letters: OH is Ohio, and OK is Oklahoma.',
        'Watch out for look-alikes: Alabama is AL, Alaska is AK, Arizona is AZ, Arkansas is AR.',
        'Eight states start with M: ME, MD, MA, MI, MN, MS, MO and MT.',
      ],
      hint: 'Two-word states use both initials. Many others use the first two letters.',
    },
  ],

  chemistry: [
    {
      topic: 'Symbols',
      idea: [
        'Every element has a short symbol of one or two letters. The first letter is always a capital and the second (if there is one) is lowercase, like C for carbon and Cl for chlorine.',
      ],
      tips: [
        'Many symbols are the start of the name: H is hydrogen, O is oxygen, C is carbon.',
        'Some come from old Latin names: Au is gold (aurum), Ag is silver (argentum), Fe is iron (ferrum), Na is sodium (natrium).',
        'Scientists all over the world use the same symbols, whatever language they speak.',
      ],
      hint: 'Try the first letter or two of the name. If that does not fit, it may come from a Latin name.',
    },
    {
      topic: 'Atomic numbers',
      idea: [
        'The atomic number is how many protons an atom has in its center (the nucleus). It is like the element\'s ID number: no two elements share one.',
      ],
      tips: [
        'The periodic table is in order of atomic number: 1, 2, 3 and so on.',
        'A normal atom has as many electrons as protons, so the electron count equals the atomic number too.',
        'Hydrogen (1) is the smallest. Each step along the table adds one more proton.',
      ],
      hint: 'Find the element on the table below. The small number in its box is the atomic number.',
    },
    {
      topic: 'Element families',
      idea: [
        'Elements in the same family act alike, and the layout of the table shows it. Columns are families (groups), and rows are called periods.',
      ],
      tips: [
        'Metals take up most of the table. They are shiny, bendy, and good at carrying heat and electricity.',
        'Nonmetals sit on the right side (plus hydrogen). Many are gases or crumbly solids.',
        'Noble gases (far right, like helium and neon) almost never react with anything.',
        'Halogens (like fluorine and chlorine) are in the column next to the noble gases and react easily.',
        'Alkali metals (the left column, like sodium) are soft, shiny and very reactive.',
      ],
      hint: 'Use location: left side is metals, right side is nonmetals, far right is noble gases.',
    },
  ],
};
