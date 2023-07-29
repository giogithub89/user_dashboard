const interests = [
  {
    id: 1,
    name: "Art & culture",
    color: "#248531",
    categories: [
      {
        id: 16,
        name: "Dance",
        subCategories: [
          "Moderna",
          "Pole Dance",
          "Classica",
          "Breakdance",
          "Moderna",
          "Pole Dance",
          "Classica",
          "Breakdance",
          "Moderna",
          "Pole Dance",
          "Classica",
          "Breakdance",
          "Moderna",
          "Pole Dance",
          "Classica",
          "Breakdance",
        ],
      },
      { id: 17, name: "Theater", subCategories: ["Musical", "Opera", "Commedia", "Cabaret"] },
      { id: 46, name: "Poetry", subCategories: ["Moderna", "Pole Dance", "Classica", "Breakdance"] },
      { id: 47, name: "Paint", subCategories: ["Musical", "Opera", "Commedia", "Cabaret"] },
      { id: 48, name: "Writing", subCategories: ["Moderna", "Pole Dance", "Classica", "Breakdance"] },
      { id: 49, name: "Letterature", subCategories: ["Musical", "Opera", "Commedia", "Cabaret"] },
    ],
  },
  {
    id: 2,
    name: "Food & drinks",
    color: "#cf581d",
    categories: [
      { id: 18, name: "Meals", subCategories: ["Pranzo", "Cena", "Colazione", "Merenda"] },
      { id: 19, name: "Portate", subCategories: ["Ricette", "Dolci", "Antipasti", "Primi"] },
      { id: 50, name: "Meals", subCategories: ["Pranzo", "Cena", "Colazione", "Merenda"] },
      { id: 51, name: "Portate", subCategories: ["Ricette", "Dolci", "Antipasti", "Primi"] },
      { id: 52, name: "Meals", subCategories: ["Pranzo", "Cena", "Colazione", "Merenda"] },
      { id: 53, name: "Portate", subCategories: ["Ricette", "Dolci", "Antipasti", "Primi"] },
    ],
  },
  {
    id: 3,
    name: "Knowledge",
    color: "#fae505",
    categories: [
      { id: 20, name: "Squadra", subCategories: ["Calcio", "Pallavolo", "Baskeball", "Rugby"] },
      {
        id: 21,
        name: "Individuali",
        subCategories: ["MotoGp", "Ciclismo", "F1", "Golf", "Tennis", "Tennis da tavolo"],
      },
    ],
  },
  {
    id: 4,
    name: "Entertainment",
    color: "#104bc9",
    categories: [
      { id: 22, name: "Squadra", subCategories: ["Calcio", "Pallavolo", "Baskeball", "Rugby"] },
      {
        id: 23,
        name: "Individuali",
        subCategories: ["MotoGp", "Ciclismo", "F1", "Golf", "Tennis", "Tennis da tavolo"],
      },
    ],
  },
  {
    id: 5,
    name: "Made in",
    color: "#852466",
    categories: [
      { id: 24, name: "Squadra", subCategories: ["Calcio", "Pallavolo", "Baskeball", "Rugby"] },
      {
        id: 25,
        name: "Individuali",
        subCategories: ["MotoGp", "Ciclismo", "F1", "Golf", "Tennis", "Tennis da tavolo"],
      },
    ],
  },
  {
    id: 6,
    name: "Motors",
    color: "#5e14cc",
    categories: [
      { id: 26, name: "Squadra", subCategories: ["Calcio", "Pallavolo", "Baskeball", "Rugby"] },
      {
        id: 27,
        name: "Individuali",
        subCategories: ["MotoGp", "Ciclismo", "F1", "Golf", "Tennis", "Tennis da tavolo"],
      },
    ],
  },
  {
    id: 7,
    name: "Lifestyle",
    color: "#482bad",
    categories: [
      { id: 28, name: "Squadra", subCategories: ["Calcio", "Pallavolo", "Baskeball", "Rugby"] },
      {
        id: 29,
        name: "Individuali",
        subCategories: ["MotoGp", "Ciclismo", "F1", "Golf", "Tennis", "Tennis da tavolo"],
      },
    ],
  },
  {
    id: 8,
    name: "Business",
    color: "#ffc300",
    categories: [
      { id: 30, name: "Squadra", subCategories: ["Calcio", "Pallavolo", "Baskeball", "Rugby"] },
      {
        id: 31,
        name: "Individuali",
        subCategories: ["MotoGp", "Ciclismo", "F1", "Golf", "Tennis", "Tennis da tavolo"],
      },
    ],
  },
  {
    id: 9,
    name: "Health",
    color: "#76d1f5",
    categories: [
      { id: 32, name: "Squadra", subCategories: ["Calcio", "Pallavolo", "Baskeball", "Rugby"] },
      {
        id: 33,
        name: "Individuali",
        subCategories: ["MotoGp", "Ciclismo", "F1", "Golf", "Tennis", "Tennis da tavolo"],
      },
    ],
  },
  {
    id: 10,
    name: "Society",
    color: "#e80953",
    categories: [
      { id: 34, name: "Squadra", subCategories: ["Calcio", "Pallavolo", "Baskeball", "Rugby"] },
      {
        id: 35,
        name: "Individuali",
        subCategories: ["MotoGp", "Ciclismo", "F1", "Golf", "Tennis", "Tennis da tavolo"],
      },
    ],
  },
  {
    id: 11,
    name: "Sports",
    color: "#ff7700",
    categories: [
      { id: 36, name: "Squadra", subCategories: ["Calcio", "Pallavolo", "Baskeball", "Rugby"] },
      {
        id: 37,
        name: "Individuali",
        subCategories: ["MotoGp", "Ciclismo", "F1", "Golf", "Tennis", "Tennis da tavolo"],
      },
    ],
  },
  {
    id: 12,
    name: "Tecnology",
    color: "#248531",
    categories: [
      { id: 38, name: "Squadra", subCategories: ["Calcio", "Pallavolo", "Baskeball", "Rugby"] },
      {
        id: 39,
        name: "Individuali",
        subCategories: ["MotoGp", "Ciclismo", "F1", "Golf", "Tennis", "Tennis da tavolo"],
      },
    ],
  },
  {
    id: 13,
    name: "Hobbies",
    color: "#1d9ccf",
    categories: [
      { id: 40, name: "Squadra", subCategories: ["Calcio", "Pallavolo", "Baskeball", "Rugby"] },
      {
        id: 41,
        name: "Individuali",
        subCategories: ["MotoGp", "Ciclismo", "F1", "Golf", "Tennis", "Tennis da tavolo"],
      },
    ],
  },
  {
    id: 14,
    name: "World",
    color: "#db1212",
    categories: [
      { id: 42, name: "Squadra", subCategories: ["Calcio", "Pallavolo", "Baskeball", "Rugby"] },
      {
        id: 43,
        name: "Individuali",
        subCategories: ["MotoGp", "Ciclismo", "F1", "Golf", "Tennis", "Tennis da tavolo"],
      },
    ],
  },
  {
    id: 15,
    name: "Travel",
    color: "#45d17d",
    categories: [
      { id: 44, name: "Squadra", subCategories: ["Calcio", "Pallavolo", "Baskeball", "Rugby"] },
      {
        id: 45,
        name: "Individuali",
        subCategories: ["MotoGp", "Ciclismo", "F1", "Golf", "Tennis", "Tennis da tavolo"],
      },
    ],
  },
];

export default interests;
