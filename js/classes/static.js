// Static properties and methods

/////////////////
// Static methods
/////////////////

/*
    We can also assign a method to the class a whole. Such methods are called static.

    In a class declaration. they are prepended by 'static' keyword, like this:
*/
class User {
  static staticMethod() {
    console.log(this === User);
  }
}
User.staticMethod(); // true

// That actually does the same as assigning it as a property directly:
User.staticMethod2 = function () {
  console.log(this === User);
};
User.staticMethod2(); // true

/*
    The value of 'this' in 'User.staticMethod() call is the class contructor 'User' itself 
    (the object before dot rule).

    Usually, static methods are used to implement functions that belong to the class as a whole,
    but not to any particular object of it.

    For instance, we have 'Article' objects and need a function to compare them.

    A natural solution would be to add 'Article.compare' static method.

    Here 'Article.compare' method stands "above" articles, as a means to compare them. It's not
    a method of an article, but rather of the whole class.
*/
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }
  static compare(articleA, articleB) {
    return articleA.date - articleB.date;
  }
}

// usage
let articles = [
  new Article("HTML", new Date(2019, 1, 1)),
  new Article("CSS", new Date(2019, 0, 1)),
  new Article("JavaScript", new Date(2019, 11, 1)),
];

articles.sort(Article.compare);
console.log(articles[0].title); // CSS

/*
    Another example would be a so-called "factory" method.

    Let's say, we need multiple ways to create an article:
    - Create by given parameters ('title', 'date', etc).
    - Create an empty article with today's date.
    - Or else.

    The first way can be implemented by the constructor. And for the second one we can make a
    static method of the class. Such as 'Article.createTodays()' here.

    Now every time we need to create a today's digest, we can call 'Article.createTodays()'.
    Once again, that's not a method of an article, but a method of the whole class.

*/
class Article2 {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }
  static createTodays() {
    // remember, this = Article
    return new this("Today's digest", new Date());
  }
}
let article = Article2.createTodays();
console.log(article.title); // Today's digest

/*
    Static methods are also used in database-related classes to search/save/remove entries from the
    database, like this:
    
    // assuming Article is a special class for managing articles
    // static method to remove the article by id:
    Article.remove({id: 12345});
*/
/*
    Warning: Static methods aren’t available for individual objects

    Static methods are callable on classes, not on individual objects.

    article.createTodays(); /// Error: article.createTodays is not a function
*/

////////////////////
// Static properties
////////////////////
// Warning: This is a recent addition to the language. Examples work in the recent Chrome.
/*
    Static properties are also possible, they look like regular class properties, but preprended by
    'static'.

    And it's the same as a direct assignment to 'Article'
*/
class Article3 {
  static publisher = "Ilya Kantor";
}
console.log(Article3.publisher); // Ilya Kantor

Article3.publisher = "Ilya Kantor";

///////////////////////////////////////////////
// Inheritance of static properties and methods
///////////////////////////////////////////////
/*
    Static properties and methods are inherited.

    For instance, 'Animal.compare' and 'Animal.planet' in the code below are inherited and
    accessible as 'Rabbit.compare' and 'Rabbit.planet'.
*/
class Animal {
  static planet = "Eartch";

  constructor(name, speed) {
    this.name = name;
    this.speed = speed;
  }

  run(speed = 0) {
    this.speed += speed;
    console.log(`${this.name} runs with speed of ${this.speed}`);
  }

  static compare(animalA, animalB) {
    return animalA.speed - animalB.speed;
  }
}

// Inherit from Animal
class Rabbit extends Animal {
  hide() {
    console.log(`${this.name} is hidden`);
  }
}

let rabbits = [new Rabbit("Toast", 10), new Rabbit("Cookie", 5)];

// Now when we call Rabbit.compare , the inherited Animal.compare will be called.
rabbits.sort(Rabbit.compare);

rabbits[0].run(); // Cookie runs with speed of 5
