const mongoose = require("mongoose");
const Recipe = mongoose.model("Recipe");

exports.findAll = function (req, res) {
  Recipe.find({}, function (err, results) {
    return res.send(results);
  });
};

exports.findById = (req, res) => {
  const id = req.params.id;
  Recipe.findOne({ _id: id }, (err, json) => {
    if (err) return console.log(err);
    return res.send(json);
  });
};

exports.add = function (req, res) {
  Recipe.create(req.body, function (err, recipe) {
    if (err) return console.log(err);
    return res.send(recipe);
  });
};

exports.update = function (req, res) {
  console.log(req.body);
  const id = req.params.id;
  Recipe.findByIdAndUpdate(id, req.body, { new: true }, (err, response) => {
    if (err) return console.log(err);
    res.send(response);
  });
};

exports.delete = function (req, res) {
  let id = req.params.id;
  Recipe.deleteOne({ _id: id }, () => {
    return res.sendStatus(202);
  });
};

exports.upload = function (req, res) {
  console.log(req.files);
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send("No files were uploaded.");
  }
  let file = req.files.file;
  file.mv(`./public/img/${req.body.filename}`, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ file: `public/img/${req.body.filename}` });
    console.log(" res.json", res.json);
  });
};

exports.import = function (req, res) {
  Recipe.create(
    {
      title: "Mojito",
      author: "Jennifer Lawrence",
      description:
      "The mojito is a sour cocktail that originates from Havana, Cuba. The origins of the Mojito are cloudy: some say it was invented in the 1500s, others in the 1800’s with the birth of the Bacardi rum company. In any case, its place as an iconic Cuban cocktail was solidified by the 1930’s when Ernest Hemingway helped to popularize the drink.",
      ingredients: 
      "Fresh mint. Lime Juice. Rum. Simple Syrup. Soda Water.",
      directions:
      "To make it, you’ll simply muddle mint, add the lime juice, rum, and simple syrup, and shake it in a cocktail shaker. Then top off the glass with club soda before serving.",
      nutrition:
      "Calories per serving: 188. Total Fat: 0%. Total Carbohydrate: 6%. Sugars: 12.6g. Calcium: 24.6mg. Potassium: 78.9mg.",
      image: "mojito.png",
      year: "2015",
    },
    {
      title: "Comsmopolitan",
      author: "Ryan Reynolds",
      description:
      "It’s got a brilliant pink color and refreshing flavor: yes, it’s a Cosmo! A Cosmopolitan cocktail, to be exact. Our recipe is more tart than sweet, it's an improved version of the classic using 100% cranberry juice. It's an easy cocktail to make, and it's ready to spice up your next gathering! It's great for dinner parties or drinks on the patio.",
      ingredients:
      "1 ounce (2 tablespoons) vodka or citron vodka. 1 ounce (2 tablespoons) 100% cranberry juice (do not use sweetened!). 1/2 ounce (1 tablespoon) Cointreau. 1/2 ounce (1 tablespoon) lemon juice. 1 lime wedge. 1 teaspoon simple syrup or maple syrup. For the garnish: lime wheel (optional)",
      directions:
      "Place the vodka, cranberry juice, Cointreau, lemon juice, and syrup in a cocktail shaker with ice. Shake 15 seconds until cold. Strain the liquid into a martini glass. Squeeze with the lime wedge and serve, garnished with a lime wheel if desired.",
      nutrition:
      "Calories per serving: 93. Total Fat: 0.1g. Saturated Fat 0g. Total Carbohydrate: 9.4g. Total Sugars: 8.2g. Vitamin C 8.8mg. Calcium 10.2mg. Magnesium 4.2mg. Potassium 54.4mg.",
      image: "cosmopolitan.png",
      year: "2016",
    },

    {
      title: "Mai Tai",
      author: "Ben Affleck",
      description:
      "The Mai Tai is a classic cocktail from the 1940’s that's breathtakingly complex, featuring rum, orange liqueur, and fancy almond syrup. It’s just sweet enough, with nutty and vanilla notes against the sharp citrus. Float a little dark rum on top, and you get to the core of a Mai Tai: it’s sophisticated, nuanced, and might we say…extraordinarily special.",
      ingredients: 
      "Aged rum (also called golden, amber or anejo). Orange liqueur: either curaçao, Cointreau or Grand Marnier. Lime juice. Orgeat syrup. Dark rum.",
      directions:
      "Place all ingredients except the dark rum in a cocktail shaker, add ice, and shake. (Don’t have one? Use a mason jar!). Pour the dark rum on top of the drink, and it will settle on in a single layer. Strain the drink into a lowball glass. The traditional garnish is fresh mint and a lime wedge. Many Mai Tai drinks also have pineapple and cocktail cherries as a garnish, so we added that here too: just for kicks.",
      nutrition:
      "Calories per serving: 188. Total Fat: 0%. Total Carbohydrate: 6%. Sugars: 12.6g. Calcium: 24.6mg. Potassium: 78.9mg.",
      image: "maitai.png",
      year: "2017",
    },

    {
      title: "Classic Old Fashion",
      author: "Angelina Jolie",
      description:
      "The Old Fashioned is one of the most famous cocktails there is: possibly because it’s the oldest! This baby dates back to the early 1800’s, before the words classic and cocktail were even said next to each other. It's barely a cocktail at all: just lightly sweetened booze seasoned with bitters. Here’s how to make a classic bourbon Old Fashioned cocktail that lets the whiskey shine.",
      ingredients:
      "Bourbon or rye whiskey. Sugar cube. Water. Angostura bitters. Orange peel.",
      directions:
      "Place the sugar cube in a lowball glass and add the bitters. Add the water and mash and swirl it with a muddler or wooden spoon until the sugar is mostly dissolved. Add the whiskey and swirl to combine. Add a large ice cube. Use a knife to remove a 1″ wide strip of the orange peel. Squeeze the orange peel into the drink to release the oils. Gently run the peel around the edge of the glass, then place it in the glass. If desired, garnish with a cocktail cherry for additional sweetness.",
      nutrition: 
      "Calories per serving 155. Total fat 0%; carbohydrates 4.3g; sugars 4.2g.",
      image: "oldfashion.png",
      year: "2018",
    },
    function (err) {
      if (err) return console.log(err);
      return res.sendStatus(201);
    }
  );
};

exports.killall = function (req, res) {
  Recipe.deleteMany({}, (err) => {
    if (err) return console.log(err);
    return res.sendStatus(202);
  });
};
