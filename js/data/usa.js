// US states: abbreviation | state | how to say it | capital | how to say it | another big city | fun fact
// (CAPITALS in a respelling mark the loud syllable)
(() => {
  const lines = `
AL|Alabama|al-uh-BAM-uh|Montgomery|mont-GUM-er-ee|Birmingham|Rocket scientists in Huntsville helped build the rockets that took astronauts to the Moon.
AK|Alaska|uh-LAS-kuh|Juneau|JOO-noh|Anchorage|Denali, the tallest mountain in North America, is in Alaska.
AZ|Arizona|air-ih-ZOH-nuh|Phoenix|FEE-niks|Tucson|The Grand Canyon is about 446 km (277 miles) long, and you can find it in Arizona.
AR|Arkansas|AR-kun-saw|Little Rock|LIT-ul rock|Fort Smith|Arkansas has a diamond park where visitors can dig and keep any diamonds they find.
CA|California|kal-ih-FOR-nyuh|Sacramento|sak-ruh-MEN-toh|Los Angeles|California is home to giant sequoias, the biggest trees on Earth.
CO|Colorado|kol-uh-RAD-oh|Denver|DEN-ver|Colorado Springs|Denver is called the Mile High City because it sits about one mile above sea level.
CT|Connecticut|kuh-NET-ih-kut|Hartford|HART-furd|New Haven|Legend says the Frisbee got its name from pie tins made by a bakery in Bridgeport.
DE|Delaware|DEL-uh-wair|Dover|DOH-ver|Wilmington|Delaware was the very first state to approve the US Constitution, in 1787.
FL|Florida|FLOR-ih-duh|Tallahassee|tal-uh-HAS-ee|Miami|Rockets blast off into space from the Kennedy Space Center in Florida.
GA|Georgia|JOR-juh|Atlanta|at-LAN-tuh|Savannah|Georgia grows more peanuts than any other state.
HI|Hawaii|huh-WY-ee|Honolulu|hon-uh-LOO-loo|Hilo|Hawaii has the only royal palace in the United States, called Iolani Palace.
ID|Idaho|EYE-duh-hoh|Boise|BOY-see|Idaho Falls|Idaho grows more potatoes than any other state.
IL|Illinois|il-ih-NOY|Springfield|SPRING-feeld|Chicago|The very first skyscraper was built in Chicago in 1885.
IN|Indiana|in-dee-AN-uh|Indianapolis|in-dee-uh-NAP-uh-lis|Fort Wayne|The Indianapolis 500 car race has been held in Indiana since 1911.
IA|Iowa|EYE-oh-wuh|Des Moines|dih-MOYN|Cedar Rapids|Iowa has many more pigs than people.
KS|Kansas|KAN-zus|Topeka|tuh-PEE-kuh|Wichita|Dorothy from The Wonderful Wizard of Oz lived in Kansas.
KY|Kentucky|ken-TUK-ee|Frankfort|FRANK-furt|Louisville|Mammoth Cave in Kentucky is the longest known cave system in the world.
LA|Louisiana|loo-ee-zee-AN-uh|Baton Rouge|bat-un ROOZH|New Orleans|Jazz music was born in New Orleans, Louisiana.
ME|Maine|MAYN|Augusta|aw-GUS-tuh|Portland|Maine catches more lobsters than any other state.
MD|Maryland|MAIR-ih-lund|Annapolis|uh-NAP-uh-lis|Baltimore|The words to The Star-Spangled Banner were written at Fort McHenry in Baltimore.
MA|Massachusetts|mass-uh-CHOO-sits|Boston|BAW-stun|Worcester|Basketball was invented in Springfield, Massachusetts, in 1891.
MI|Michigan|MISH-ih-gun|Lansing|LAN-sing|Detroit|Michigan touches four of the five Great Lakes.
MN|Minnesota|min-uh-SOH-tuh|Saint Paul|saynt PAWL|Minneapolis|Minnesota is called the Land of 10,000 Lakes, but it really has more than 11,000.
MS|Mississippi|mis-ih-SIP-ee|Jackson|JAK-sun|Gulfport|Its name comes from a Native American word that means great river.
MO|Missouri|mih-ZOOR-ee|Jefferson City|JEF-er-sun SIT-ee|Kansas City|The Gateway Arch in St. Louis is the tallest arch in the world, at 192 meters (630 feet).
MT|Montana|mon-TAN-uh|Helena|HEL-uh-nuh|Billings|Montana has more cows than people.
NE|Nebraska|nuh-BRAS-kuh|Lincoln|LING-kun|Omaha|Kool-Aid was invented in Hastings, Nebraska, in 1927.
NV|Nevada|nuh-VAD-uh|Carson City|KAR-sun SIT-ee|Las Vegas|Nevada is the driest state in the country.
NH|New Hampshire|noo HAMP-sher|Concord|KONG-kurd|Manchester|Wind on Mount Washington once reached 372 km/h (231 mph), a world record at the time.
NJ|New Jersey|noo JER-zee|Trenton|TREN-tun|Newark|New Jersey has so many diners that it is nicknamed the Diner Capital of the World.
NM|New Mexico|noo MEK-sih-koh|Santa Fe|SAN-tuh FAY|Albuquerque|Santa Fe, founded in 1610, is the oldest state capital city in the USA.
NY|New York|noo YORK|Albany|AWL-buh-nee|New York City|The Statue of Liberty stands in New York Harbor.
NC|North Carolina|north kair-uh-LY-nuh|Raleigh|RAW-lee|Charlotte|The Wright brothers made the first airplane flight near Kitty Hawk, North Carolina, in 1903.
ND|North Dakota|north duh-KOH-tuh|Bismarck|BIZ-mark|Fargo|Wild bison roam free in Theodore Roosevelt National Park.
OH|Ohio|oh-HY-oh|Columbus|kuh-LUM-bus|Cleveland|Ohio has the only state flag that is not a rectangle. It is shaped like a swallowtail.
OK|Oklahoma|oh-kluh-HOH-muh|Oklahoma City|oh-kluh-HOH-muh SIT-ee|Tulsa|The first parking meter was set up in Oklahoma City in 1935.
OR|Oregon|OR-ih-gun|Salem|SAY-lum|Portland|Crater Lake is the deepest lake in the USA, at about 592 meters (1,943 feet).
PA|Pennsylvania|pen-sul-VAYN-yuh|Harrisburg|HAIR-is-burg|Philadelphia|In Hershey, the streetlights are shaped like chocolate Kisses.
RI|Rhode Island|rohd EYE-lund|Providence|PROV-ih-dens|Newport|Rhode Island's official state drink is coffee milk.
SC|South Carolina|south kair-uh-LY-nuh|Columbia|kuh-LUM-bee-uh|Charleston|South Carolina often grows more peaches than Georgia, the Peach State.
SD|South Dakota|south duh-KOH-tuh|Pierre|PEER|Sioux Falls|The four presidents' faces on Mount Rushmore are each about 18 meters (60 feet) tall.
TN|Tennessee|ten-uh-SEE|Nashville|NASH-vil|Memphis|Nashville is nicknamed Music City and is famous for country music.
TX|Texas|TEK-sus|Austin|AW-stin|Houston|Texas was its own country, the Republic of Texas, for about ten years.
UT|Utah|YOO-tah|Salt Lake City|sawlt layk SIT-ee|Provo|The Great Salt Lake is much saltier than the ocean, so you float easily in it.
VT|Vermont|ver-MONT|Montpelier|mont-PEEL-yer|Burlington|Vermont makes more maple syrup than any other state.
VA|Virginia|ver-JIN-yuh|Richmond|RICH-mund|Virginia Beach|Eight US presidents were born in Virginia, more than any other state.
WA|Washington|WAW-shing-tun|Olympia|oh-LIM-pee-uh|Seattle|Washington grows more apples than any other state.
WV|West Virginia|west ver-JIN-yuh|Charleston|CHARLZ-tun|Huntington|Every part of West Virginia is in the Appalachian Mountains.
WI|Wisconsin|wis-KON-sin|Madison|MAD-ih-sun|Milwaukee|Wisconsin is nicknamed America's Dairyland and makes more cheese than any other state.
WY|Wyoming|wy-OH-ming|Cheyenne|shy-AN|Casper|Yellowstone, the world's first national park, is mostly in Wyoming. Old Faithful geyser is there!
`;

  FOF.data.states = FOF.parseLines(lines).map(([abbr, name, say, capital, capitalSay, city, fact]) => ({
    abbr, name, say, capital, capitalSay, city, fact,
  }));

  // Real towns with these names exist in several states, so "which state is X in?" would be unfair.
  FOF.data.ambiguousCities = new Set([
    'Albany', 'Augusta', 'Columbia', 'Columbus', 'Concord', 'Jackson', 'Lincoln', 'Madison',
    'Manchester', 'Newark', 'Newport', 'Richmond', 'Salem', 'Springfield', 'Burlington', 'Wilmington',
  ]);

  FOF.data.stateFacts = [
    'Alaska is the biggest state, more than twice the size of Texas.',
    'Rhode Island is the smallest state, and it is only about 77 km (48 miles) from top to bottom.',
    'Hawaii is the only state made entirely of islands.',
    'Juneau, the capital of Alaska, cannot be reached by road. You have to fly or take a boat!',
    'Maine is the only state whose name is just one syllable.',
    'California has the most people; Wyoming has the fewest.',
    'Washington, D.C. is the capital of the USA, but it is not a state.',
    'Alaska and Hawaii were the last two states to join the USA, both in 1959.',
    'Alaska has more coastline than all the other states put together.',
  ];
})();
