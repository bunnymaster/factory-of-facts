// World geography data: continents, countries + capitals, famous cities.
(() => {
  FOF.data.continents = {
    AF: {
      name: 'Africa', area: '30.4 million km²', pop: '1.4 billion',
      facts: [
        'Africa has the longest river on Earth (the Nile) and the biggest hot desert (the Sahara).',
        'Africa is the only continent that touches all four hemispheres.',
        'Over 2,000 languages are spoken across Africa.',
      ],
    },
    AS: {
      name: 'Asia', area: '44.6 million km²', pop: '4.7 billion',
      facts: [
        'Asia is the biggest continent, and about 6 out of every 10 humans live there.',
        'Mount Everest, the highest mountain above sea level, is in Asia.',
        'Asia holds both the highest point (Everest) and the lowest land point (the Dead Sea shore).',
      ],
    },
    EU: {
      name: 'Europe', area: '10.2 million km²', pop: '745 million',
      facts: [
        'Europe is home to the smallest country on Earth: Vatican City.',
        'Russia stretches across both Europe and Asia.',
        'Europe has no true desert, but it does have glaciers in the Alps!',
      ],
    },
    NA: {
      name: 'North America', area: '24.2 million km²', pop: '600 million',
      facts: [
        'Greenland, the largest island in the world, belongs to North America.',
        'Canada has the longest coastline of any country.',
        'The Grand Canyon in the USA is about 446 km long.',
      ],
    },
    SA: {
      name: 'South America', area: '17.8 million km²', pop: '440 million',
      facts: [
        'The Amazon is the largest rainforest on Earth.',
        'The Andes are the longest mountain range on land.',
        'Angel Falls in Venezuela is the tallest waterfall on Earth (979 m).',
      ],
    },
    OC: {
      name: 'Oceania', area: '8.5 million km²', pop: '45 million',
      facts: [
        'Australia is both a country and a continent.',
        'There are more kangaroos in Australia than people.',
        'Oceania has thousands of islands scattered across the Pacific Ocean.',
      ],
    },
    AN: {
      name: 'Antarctica', area: '14.2 million km²', pop: 'No permanent residents',
      facts: [
        'Antarctica is the coldest, windiest and driest continent.',
        'It has no countries, just research stations from many nations.',
        'Its ice holds about 70% of all the fresh water on Earth.',
      ],
    },
  };

  const countryLines = `
Algeria|Algiers|AF
Angola|Luanda|AF
Botswana|Gaborone|AF
Cameroon|Yaoundé|AF
Chad|N'Djamena|AF
DR Congo|Kinshasa|AF
Egypt|Cairo|AF
Ethiopia|Addis Ababa|AF
Ghana|Accra|AF
Ivory Coast|Yamoussoukro|AF
Kenya|Nairobi|AF
Libya|Tripoli|AF
Madagascar|Antananarivo|AF
Mali|Bamako|AF
Mauritania|Nouakchott|AF
Morocco|Rabat|AF
Mozambique|Maputo|AF
Namibia|Windhoek|AF
Niger|Niamey|AF
Nigeria|Abuja|AF
Rwanda|Kigali|AF
Senegal|Dakar|AF
Somalia|Mogadishu|AF
South Africa|Pretoria|AF
Sudan|Khartoum|AF
Tanzania|Dodoma|AF
Tunisia|Tunis|AF
Uganda|Kampala|AF
Zambia|Lusaka|AF
Zimbabwe|Harare|AF
Afghanistan|Kabul|AS
Bangladesh|Dhaka|AS
Bhutan|Thimphu|AS
Cambodia|Phnom Penh|AS
China|Beijing|AS
India|New Delhi|AS
Indonesia|Jakarta|AS
Iran|Tehran|AS
Iraq|Baghdad|AS
Israel|Jerusalem|AS
Japan|Tokyo|AS
Jordan|Amman|AS
Kazakhstan|Astana|AS
Kuwait|Kuwait City|AS
Laos|Vientiane|AS
Lebanon|Beirut|AS
Malaysia|Kuala Lumpur|AS
Mongolia|Ulaanbaatar|AS
Myanmar|Naypyidaw|AS
Nepal|Kathmandu|AS
North Korea|Pyongyang|AS
Oman|Muscat|AS
Pakistan|Islamabad|AS
Philippines|Manila|AS
Qatar|Doha|AS
Saudi Arabia|Riyadh|AS
Singapore|Singapore|AS
South Korea|Seoul|AS
Syria|Damascus|AS
Taiwan|Taipei|AS
Thailand|Bangkok|AS
Turkey|Ankara|AS
United Arab Emirates|Abu Dhabi|AS
Uzbekistan|Tashkent|AS
Vietnam|Hanoi|AS
Yemen|Sana'a|AS
Albania|Tirana|EU
Austria|Vienna|EU
Belarus|Minsk|EU
Belgium|Brussels|EU
Bulgaria|Sofia|EU
Croatia|Zagreb|EU
Czech Republic|Prague|EU
Denmark|Copenhagen|EU
Estonia|Tallinn|EU
Finland|Helsinki|EU
France|Paris|EU
Germany|Berlin|EU
Greece|Athens|EU
Hungary|Budapest|EU
Iceland|Reykjavik|EU
Ireland|Dublin|EU
Italy|Rome|EU
Latvia|Riga|EU
Lithuania|Vilnius|EU
Netherlands|Amsterdam|EU
Norway|Oslo|EU
Poland|Warsaw|EU
Portugal|Lisbon|EU
Romania|Bucharest|EU
Russia|Moscow|EU
Serbia|Belgrade|EU
Slovakia|Bratislava|EU
Slovenia|Ljubljana|EU
Spain|Madrid|EU
Sweden|Stockholm|EU
Switzerland|Bern|EU
Ukraine|Kyiv|EU
United Kingdom|London|EU
Bahamas|Nassau|NA
Belize|Belmopan|NA
Canada|Ottawa|NA
Costa Rica|San José|NA
Cuba|Havana|NA
Dominican Republic|Santo Domingo|NA
El Salvador|San Salvador|NA
Guatemala|Guatemala City|NA
Haiti|Port-au-Prince|NA
Honduras|Tegucigalpa|NA
Jamaica|Kingston|NA
Mexico|Mexico City|NA
Nicaragua|Managua|NA
Panama|Panama City|NA
United States|Washington, D.C.|NA
Argentina|Buenos Aires|SA
Bolivia|Sucre|SA
Brazil|Brasília|SA
Chile|Santiago|SA
Colombia|Bogotá|SA
Ecuador|Quito|SA
Guyana|Georgetown|SA
Paraguay|Asunción|SA
Peru|Lima|SA
Suriname|Paramaribo|SA
Uruguay|Montevideo|SA
Venezuela|Caracas|SA
Australia|Canberra|OC
Fiji|Suva|OC
New Zealand|Wellington|OC
Papua New Guinea|Port Moresby|OC
Samoa|Apia|OC
Solomon Islands|Honiara|OC
Tonga|Nuku'alofa|OC
Vanuatu|Port Vila|OC
`;

  const cityLines = `
Tokyo|Japan
Kyoto|Japan
Osaka|Japan
Mumbai|India
Chennai|India
Shanghai|China
Hong Kong|China
Istanbul|Turkey
Dubai|United Arab Emirates
Karachi|Pakistan
Lahore|Pakistan
Busan|South Korea
Ho Chi Minh City|Vietnam
Phuket|Thailand
Toronto|Canada
Vancouver|Canada
New York City|United States
Los Angeles|United States
Chicago|United States
Guadalajara|Mexico
Rio de Janeiro|Brazil
São Paulo|Brazil
Cusco|Peru
Medellín|Colombia
Mendoza|Argentina
Sydney|Australia
Melbourne|Australia
Auckland|New Zealand
Lagos|Nigeria
Casablanca|Morocco
Cape Town|South Africa
Alexandria|Egypt
Mombasa|Kenya
Barcelona|Spain
Seville|Spain
Milan|Italy
Florence|Italy
Munich|Germany
Hamburg|Germany
Lyon|France
Zurich|Switzerland
Edinburgh|United Kingdom
Kraków|Poland
Saint Petersburg|Russia
Gothenburg|Sweden
`;

  FOF.data.countries = FOF.parseLines(countryLines).map(([name, capital, cont]) => ({ name, capital, cont }));
  FOF.data.cities = FOF.parseLines(cityLines).map(([name, country]) => ({ name, country }));
})();
