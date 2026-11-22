// All 118 elements in atomic-number order.
// symbol | name | atomic mass | category | fun fact (optional)
// Categories: ak alkali, ae alkaline earth, tm transition, pt post-transition,
//             md metalloid, nm nonmetal, hl halogen, ng noble gas, ln lanthanide, ac actinide, unk unknown
(() => {
  const lines = `
H|Hydrogen|1.008|nm|The most abundant element in the universe. Stars are mostly hydrogen!
He|Helium|4.0026|ng|Makes your voice squeaky, and it was spotted on the Sun before anyone found it on Earth.
Li|Lithium|6.94|ak|Powers the rechargeable batteries in phones and laptops.
Be|Beryllium|9.0122|ae|Gives emeralds their green color.
B|Boron|10.81|md|Added to glass to make heat-proof cookware.
C|Carbon|12.011|nm|The backbone of all known life. Diamonds and pencil graphite are both pure carbon!
N|Nitrogen|14.007|nm|Makes up about 78% of the air you breathe.
O|Oxygen|15.999|nm|About half of Earth's crust by weight is oxygen, mostly locked up in rocks.
F|Fluorine|18.998|hl|The most reactive element of all. Toothpaste uses a tamer form to protect teeth.
Ne|Neon|20.180|ng|Glows reddish-orange when electricity zaps through it, which is how neon signs work.
Na|Sodium|22.990|ak|Explodes in water, but team it up with chlorine and you get table salt.
Mg|Magnesium|24.305|ae|Burns with a blinding white flame and sits at the center of chlorophyll in plants.
Al|Aluminum|26.982|pt|Once rarer than gold. The tip of the Washington Monument is aluminum.
Si|Silicon|28.085|md|The brain material of computer chips.
P|Phosphorus|30.974|nm|Found in your DNA, your bones, and the heads of matches.
S|Sulfur|32.06|nm|Responsible for the smell of rotten eggs and the yellow crystals around volcanoes.
Cl|Chlorine|35.45|hl|Keeps swimming pools clean.
Ar|Argon|39.948|ng|The third most common gas in Earth's air. Often fills light bulbs.
K|Potassium|39.098|ak|Bananas have it. The symbol K comes from the Latin "kalium".
Ca|Calcium|40.078|ae|Builds your bones and teeth.
Sc|Scandium|44.956|tm|Used in stadium lights and lightweight bike frames.
Ti|Titanium|47.867|tm|As strong as steel but almost half the weight. Great for jets and joint replacements.
V|Vanadium|50.942|tm|Makes steel super tough. Named after Vanadis, a Norse goddess.
Cr|Chromium|51.996|tm|Makes steel shiny and rust-proof, and gives rubies their red.
Mn|Manganese|54.938|tm|A key ingredient in making steel.
Fe|Iron|55.845|tm|Earth's core is mostly iron, and your blood uses it to carry oxygen.
Co|Cobalt|58.933|tm|Has been making glass and pottery blue for thousands of years.
Ni|Nickel|58.693|tm|Used in coins, and it is also found in many meteorites.
Cu|Copper|63.546|tm|One of the first metals ever used by humans. Germs struggle to survive on it.
Zn|Zinc|65.38|tm|Coats steel so it doesn't rust. Your body needs it to heal wounds.
Ga|Gallium|69.723|pt|Melts in your hand at just 29.8 °C!
Ge|Germanium|72.630|md|Mendeleev predicted it would exist before anyone found it.
As|Arsenic|74.922|md|A tricky element that keeps turning up in old detective stories.
Se|Selenium|78.971|nm|Its electrical behavior changes with light. Used in early photocopiers.
Br|Bromine|79.904|hl|One of only two elements that are liquid at room temperature.
Kr|Krypton|83.798|ng|Its name means "hidden" in Greek.
Rb|Rubidium|85.468|ak|Used in super-accurate atomic clocks.
Sr|Strontium|87.62|ae|Makes fireworks glow bright red.
Y|Yttrium|88.906|tm|One of four elements named after the Swedish village of Ytterby.
Zr|Zirconium|91.224|tm|Cubic zirconia, the fake diamond, is made from its oxide.
Nb|Niobium|92.906|tm|Used in the super-cold magnets inside MRI scanners.
Mo|Molybdenum|95.95|tm|Makes steel strong enough for tools and engines.
Tc|Technetium|98|tm|The first element ever made artificially.
Ru|Ruthenium|101.07|tm|A rare shiny metal used in electronics.
Rh|Rhodium|102.91|tm|One of the most expensive metals on the planet.
Pd|Palladium|106.42|tm|Cleans harmful gases in car exhaust systems.
Ag|Silver|107.87|tm|The best conductor of electricity of any metal.
Cd|Cadmium|112.41|tm|Used in some rechargeable batteries, but it is toxic.
In|Indium|114.82|pt|Touchscreens use a see-through coating that contains it.
Sn|Tin|118.71|pt|"Tin cans" are really steel cans with a thin tin coating.
Sb|Antimony|121.76|md|Its symbol Sb comes from the Latin "stibium".
Te|Tellurium|127.60|md|Used in solar panels.
I|Iodine|126.90|hl|Your thyroid gland needs it to work properly.
Xe|Xenon|131.29|ng|Powers the glowing ion thrusters on some spacecraft.
Cs|Cesium|132.91|ak|One second is officially defined by how fast cesium atoms vibrate.
Ba|Barium|137.33|ae|A "barium milkshake" lets doctors see your insides on X-rays.
La|Lanthanum|138.91|ln|
Ce|Cerium|140.12|ln|The most common "rare earth" element. It is in lighter flints.
Pr|Praseodymium|140.91|ln|Gives glass and ceramics a yellow-green tint.
Nd|Neodymium|144.24|ln|Makes the strongest permanent magnets in the world.
Pm|Promethium|145|ln|Named after Prometheus, who stole fire from the gods.
Sm|Samarium|150.36|ln|Used in powerful magnets.
Eu|Europium|151.96|ln|Makes the red glow in many screens, and glows on euro banknotes under UV light.
Gd|Gadolinium|157.25|ln|Helps doctors get clearer MRI pictures.
Tb|Terbium|158.93|ln|
Dy|Dysprosium|162.50|ln|
Ho|Holmium|164.93|ln|
Er|Erbium|167.26|ln|Helps carry internet signals through fiber-optic cables.
Tm|Thulium|168.93|ln|
Yb|Ytterbium|173.05|ln|Another element named after the village of Ytterby.
Lu|Lutetium|174.97|ln|
Hf|Hafnium|178.49|tm|Used in the control rods of nuclear submarines.
Ta|Tantalum|180.95|tm|Hidden inside your phone's tiny electronic parts.
W|Tungsten|183.84|tm|Has the highest melting point of any metal (3,422 °C). Its symbol comes from "wolfram".
Re|Rhenium|186.21|tm|One of the last stable elements ever discovered.
Os|Osmium|190.23|tm|The densest naturally occurring element.
Ir|Iridium|192.22|tm|A thin layer of it in rocks is evidence of the asteroid that ended the dinosaurs.
Pt|Platinum|195.08|tm|Rarer than gold. Used in jewelry and catalytic converters.
Au|Gold|196.97|tm|Never rusts or tarnishes, which is why it stays shiny forever.
Hg|Mercury|200.59|tm|The only metal that is liquid at room temperature.
Tl|Thallium|204.38|pt|
Pb|Lead|207.2|pt|Its symbol Pb comes from the Latin "plumbum", which is where "plumbing" comes from.
Bi|Bismuth|208.98|pt|Grows rainbow-colored crystals shaped like staircases.
Po|Polonium|209|pt|Discovered by Marie Curie and named after her home country, Poland.
At|Astatine|210|hl|The rarest naturally occurring element on Earth.
Rn|Radon|222|ng|A radioactive gas that can seep up from the ground into basements.
Fr|Francium|223|ak|
Ra|Radium|226|ae|Used to make glow-in-the-dark paint on old watches.
Ac|Actinium|227|ac|
Th|Thorium|232.04|ac|Named after Thor, the Norse god of thunder.
Pa|Protactinium|231.04|ac|
U|Uranium|238.03|ac|The fuel for nuclear power plants.
Np|Neptunium|237|ac|
Pu|Plutonium|244|ac|
Am|Americium|243|ac|Found inside most smoke detectors.
Cm|Curium|247|ac|Named in honor of Marie and Pierre Curie.
Bk|Berkelium|247|ac|
Cf|Californium|251|ac|
Es|Einsteinium|252|ac|Named after Albert Einstein.
Fm|Fermium|257|ac|
Md|Mendelevium|258|ac|Named after Dmitri Mendeleev, who invented the periodic table.
No|Nobelium|259|ac|
Lr|Lawrencium|266|ac|
Rf|Rutherfordium|267|tm|
Db|Dubnium|268|tm|
Sg|Seaborgium|269|tm|Named after Glenn Seaborg while he was still alive.
Bh|Bohrium|270|tm|
Hs|Hassium|277|tm|
Mt|Meitnerium|278|unk|
Ds|Darmstadtium|281|unk|
Rg|Roentgenium|282|unk|
Cn|Copernicium|285|unk|
Nh|Nihonium|286|unk|The first element discovered in Asia (in Japan).
Fl|Flerovium|289|unk|
Mc|Moscovium|290|unk|
Lv|Livermorium|293|unk|
Ts|Tennessine|294|unk|
Og|Oganesson|294|unk|The heaviest element known so far.
`;

  FOF.data.categories = {
    ak: 'Alkali metal',
    ae: 'Alkaline earth metal',
    tm: 'Transition metal',
    pt: 'Post-transition metal',
    md: 'Metalloid',
    nm: 'Nonmetal',
    hl: 'Halogen',
    ng: 'Noble gas',
    ln: 'Lanthanide',
    ac: 'Actinide',
    unk: 'Unknown properties',
  };

  // Where each element lives on the classic 18-column chart: [row, column].
  // Lanthanides and actinides are pulled out into rows 9 and 10.
  function gridPosition(n) {
    if (n === 1) return [1, 1];
    if (n === 2) return [1, 18];
    if (n <= 4) return [2, n - 2];
    if (n <= 10) return [2, n + 8];
    if (n <= 12) return [3, n - 10];
    if (n <= 18) return [3, n];
    if (n <= 36) return [4, n - 18];
    if (n <= 54) return [5, n - 36];
    if (n <= 56) return [6, n - 54];
    if (n <= 71) return [9, n - 54];
    if (n <= 86) return [6, n - 68];
    if (n <= 88) return [7, n - 86];
    if (n <= 103) return [10, n - 86];
    return [7, n - 100];
  }

  FOF.data.elements = FOF.parseLines(lines).map(([sym, name, mass, cat, fact], i) => {
    const n = i + 1;
    const pos = gridPosition(n);
    const inFBlock = pos[0] > 8;
    return {
      n, sym, name, mass, cat, fact: fact || '', pos,
      period: inFBlock ? pos[0] - 3 : pos[0],
      group: inFBlock ? null : pos[1],
    };
  });
})();
