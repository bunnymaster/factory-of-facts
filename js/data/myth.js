// Mythology + religion tables.
// Written the way each tradition's own followers and storytellers describe things:
// myths are "stories", and religions are presented factually and respectfully.
(() => {
  // ---------- Greek gods: Greek | Roman | role | symbol ----------
  const greekLines = `
Zeus|Jupiter|king of the gods, ruler of the sky and thunder|Lightning bolt
Hera|Juno|queen of the gods, goddess of marriage|Peacock
Poseidon|Neptune|god of the sea, earthquakes and horses|Trident
Demeter|Ceres|goddess of the harvest and farming|Wheat
Athena|Minerva|goddess of wisdom and crafts|Owl
Apollo|Apollo|god of the sun, music, healing and prophecy|Lyre
Artemis|Diana|goddess of the hunt and the Moon|Deer
Ares|Mars|god of war|Spear
Aphrodite|Venus|goddess of love and beauty|Dove
Hephaestus|Vulcan|god of fire, forges and blacksmiths|Hammer and anvil
Hermes|Mercury|swift messenger of the gods and protector of travelers|Caduceus (a staff with two snakes)
Dionysus|Bacchus|god of festivals, theater and grapes|Grapevine
Hades|Pluto|ruler of the underworld and king of the dead|Helm of Darkness
Hestia|Vesta|goddess of the hearth and home|Hearth fire
Persephone|Proserpina|goddess of spring who spends part of each year in the underworld|Pomegranate
Eros|Cupid|winged god of romantic love|Golden arrows
Nike|Victoria|goddess of victory|Laurel wreath
Pan|Faunus|god of shepherds and the wild|Reed pipes
`;

  FOF.data.greekGods = FOF.parseLines(greekLines).map(([name, roman, role, symbol]) => ({ name, roman, role, symbol }));

  // ---------- Deities around the world: tradition | name | role ----------
  const deityLines = `
Norse|Odin|Allfather, god of wisdom, war and poetry
Norse|Thor|god of thunder and protector of humans
Norse|Loki|trickster god and shape-shifter
Norse|Freya|goddess of love, beauty and war
Norse|Baldur|god of light and purity
Norse|Heimdall|watchman of the gods who guards the Bifröst bridge
Norse|Tyr|god of law, justice and brave oaths
Norse|Hel|ruler of the realm of the dead
Egyptian|Ra|god of the sun
Egyptian|Osiris|green-skinned king of the afterlife and rebirth
Egyptian|Isis|goddess of magic and motherhood
Egyptian|Horus|falcon-headed god of the sky
Egyptian|Anubis|jackal-headed god of mummification and the dead
Egyptian|Thoth|ibis-headed god of writing and wisdom
Egyptian|Bastet|cat goddess who protects the home
Egyptian|Set|god of chaos, storms and deserts
Egyptian|Hathor|goddess of love, music and joy
Hindu|Brahma|creator god
Hindu|Vishnu|preserver god
Hindu|Shiva|destroyer and transformer god
Hindu|Ganesha|elephant-headed remover of obstacles
Hindu|Lakshmi|goddess of wealth and good fortune
Hindu|Saraswati|goddess of knowledge, music and the arts
Hindu|Hanuman|monkey god of strength and devotion
Hindu|Durga|warrior goddess who defeats evil
Celtic|Dagda|father god of abundance and magic
Celtic|Brigid|goddess of poetry, healing and smithcraft
Celtic|Lugh|god of skill, crafts and light
Celtic|The Morrigan|goddess of war and fate
Aztec & Maya|Quetzalcoatl|Aztec feathered serpent god of wind and learning
Aztec & Maya|Huitzilopochtli|Aztec god of the sun and war
Aztec & Maya|Tlaloc|Aztec god of rain
Aztec & Maya|Kukulkan|Maya feathered serpent god
Aztec & Maya|Ixchel|Maya goddess of the Moon and healing
Japanese|Amaterasu|goddess of the sun
Japanese|Susanoo|god of storms and the sea
Japanese|Tsukuyomi|god of the Moon
Japanese|Inari|god of rice, foxes and prosperity
Japanese|Izanami|goddess of creation and death
Chinese|Jade Emperor|ruler of Heaven in Chinese folk religion
Chinese|Nuwa|goddess who created humans from clay
Chinese|Chang'e|goddess of the Moon
Chinese|Guan Yu|god of war and loyalty
Chinese|Zao Jun|kitchen god who reports on each family to Heaven
Mesopotamian|Marduk|king of the gods of Babylon
Mesopotamian|Ishtar|goddess of love and war
Mesopotamian|Enki|god of fresh water and wisdom
Mesopotamian|Tiamat|primordial goddess of the salt sea
Yoruba|Olorun|supreme creator god
Yoruba|Shango|god of thunder and lightning
Yoruba|Yemoja|mother goddess of rivers and the sea
Yoruba|Oshun|goddess of love and fresh water
Yoruba|Ogun|god of iron, tools and war
Polynesian|Maui|demigod trickster who fished up islands
Polynesian|Pele|Hawaiian goddess of volcanoes and fire
Polynesian|Tangaroa|god of the sea
Polynesian|Ranginui|Māori sky father
Polynesian|Papatuanuku|Māori earth mother
`;

  const greekNames = new Set(FOF.data.greekGods.map((g) => g.name));
  const romanDeities = FOF.data.greekGods.map((g) => ({ tradition: 'Roman', name: g.roman, role: g.role }));

  FOF.data.deities = [
    ...FOF.parseLines(deityLines).map(([tradition, name, role]) => ({ tradition, name, role })),
    ...romanDeities,
  ];
  // Names that exist in both Greek and Roman tables (Apollo) can't be traced to one tradition.
  FOF.data.sharedDeityNames = new Set([...greekNames].filter((n) => romanDeities.some((r) => r.name === n)));

  FOF.data.traditionBlurbs = {
    Norse: 'Stories of the Vikings and Scandinavians: gods in Asgard, nine worlds on the great tree Yggdrasil, and a final battle called Ragnarök.',
    Egyptian: 'Gods with animal heads, a sun god who sails through the underworld every night, and a deep belief in life after death.',
    Hindu: 'Ancient epics (the Ramayana and the Mahabharata) and many deities, which many Hindus see as different forms of one divine reality.',
    Roman: 'Rome borrowed many Greek gods and gave them new names. Our planets and several months are named after them.',
    Celtic: 'Tales from Ireland, Wales and Scotland of magical peoples, heroes and an Otherworld.',
    'Aztec & Maya': 'Mesoamerican peoples whose gods were tied to the cycles of the sun, rain and maize.',
    Japanese: 'Shinto stories of kami (spirits), recorded in the Kojiki. The imperial family traditionally traced its line to Amaterasu.',
    Chinese: 'Stories from Chinese folk religion, Daoism and Buddhism, full of emperors, immortals and heroes.',
    Mesopotamian: 'Some of the oldest written myths on Earth, from Sumer and Babylon, around 4,000 years old.',
    Yoruba: 'From the Yoruba people of Nigeria and Benin. Their orishas are also honored in Cuba and Brazil.',
    Polynesian: 'Island peoples across the Pacific, including Hawaii and New Zealand, whose stories explain the sea, sky and volcanoes.',
  };

  // ---------- Religions: name | followers | holy text | place of worship | central figure | key idea ----------
  const religionLines = `
Christianity|About 2.4 billion|Bible|Church|Jesus of Nazareth|Belief in one God in three persons: Father, Son and Holy Spirit
Islam|About 1.9 billion|Quran|Mosque|Prophet Muhammad|Five Pillars, including prayer five times a day
Hinduism|About 1.2 billion|Vedas and Bhagavad Gita|Mandir|No single founder|The Trimurti: Brahma, Vishnu and Shiva
Buddhism|About 500 million|Tripitaka (Pali Canon)|Vihara (monastery)|Siddhartha Gautama (the Buddha)|The Four Noble Truths and the Eightfold Path
Sikhism|About 25-30 million|Guru Granth Sahib|Gurdwara|Guru Nanak|Ten Gurus and the Five Ks, such as the kara bracelet
Judaism|About 15 million|Tanakh (including the Torah)|Synagogue|Abraham and Moses|One God, a covenant with the Jewish people, and Shabbat as a weekly day of rest
Jainism|About 4-6 million|Agama Sutras|Derasar|Mahavira|Extreme non-violence and 24 Tirthankaras
Shinto|Mostly in Japan|Kojiki|Shrine|No single founder|Worship of kami, the spirits of nature and ancestors
Taoism|Mostly in China and East Asia|Daodejing|Daoguan|Laozi|Living in harmony with the Way of nature and balancing yin and yang
Zoroastrianism|About 100,000-200,000|Avesta|Fire temple|Zoroaster|Worship of Ahura Mazda and the struggle of good against evil
Baha'i|About 5-8 million|Kitab-i-Aqdas|Mashriqu'l-Adhkar|Baha'u'llah|The unity of God, religion and all of humanity
`;

  FOF.data.religions = FOF.parseLines(religionLines).map(([name, followers, text, place, figure, idea]) => ({
    name, followers, text, place, figure, idea,
  }));
})();
