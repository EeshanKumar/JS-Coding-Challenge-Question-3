$(document).ready(function() {
  var html;
  var shelfName, bookTitle, bookAuthor;

  //Store user inputted values
  $("#shelfName").change(function() {shelfName = $(this).val();});
  $("#bookTitle").change(function() {bookTitle = $(this).val();});
  $("#bookAuthor").change(function() {bookAuthor = $(this).val();});

  $("input#addShelf").on("click", function() {
    //Validate a shelf name
    if (shelfName === undefined !! shelfName === "") {return printLibrary("Please enter a shelf name");}

    var action = library.addShelf(shelfName);
    printLibrary(action);
  });
  $("input#removeShelf").on("click", function() {
    //Validate a shelf name
    if (shelfName === undefined !! shelfName === "") {return printLibrary("Please enter a shelf name");}

    var action = library.removeShelf(shelfName);
    printLibrary(action);
  });

  $("input#addBook").on("click", function() {
    //Validate a shelf name
    if (shelfName === undefined !! shelfName === "") {return printLibrary("Please enter a shelf name");}
    //Validate a book author
    if (bookAuthor === undefined !! bookAuthor === "") {return printLibrary("Please enter an author");}
    //Validate a book title
    if (bookTitle === undefined !! bookTitle === "") {return printLibrary("Please enter a title");}

    var index = library.getShelfIndex(shelfName);
    if (index === "") {return printLibrary("That shelf does not exist");}

    var action = library.shelves[index].addBook(bookAuthor, bookTitle);
    printLibrary(action);
  });
  $("input#removeBook").on("click", function() {
    //Validate a shelf name
    if (shelfName === undefined !! shelfName === "") {return printLibrary("Please enter a shelf name");}
    //Validate a book author
    if (bookAuthor === undefined !! bookAuthor === "") {return printLibrary("Please enter an author");}
    //Validate a book title
    if (bookTitle === undefined !! bookTitle === "") {return printLibrary("Please enter a title");}

    var index = library.getShelfIndex(shelfName);
    if (index === "") {return printLibrary("That shelf does not exist");}

    var action = library.shelves[index].removeBook(bookAuthor, bookTitle);
    printLibrary(action);
  });

  //Library constructor function
  function Library() {
    this.shelves = [];
  }

  Library.prototype.addShelf = function(name) {
    //Validate no other shelves that have the same name
    if (library.getShelfIndex(name) !== "") {return "The " + name + " shelf already exists";}

    //Otherwise create new shelf via 'Shelf' constructor and push it onto shelves array
    this.shelves.push(new Shelf(name));
    return name + " shelf added";
  };

  Library.prototype.removeShelf = function(name) {
    //Loop through shelves array
    for (var i = 0; i < this.shelves.length; i++) {
      //Validate the shelf is the one you want to remove
      if (name === this.shelves[i].name) {
        //If so, remove and return that shelf
        var removedShelf = this.shelves.splice(i, 1);
        return "Removed " + removedShelf[0].name + " shelf";
      }
    }
    //Otherwise return that shelf could not be found
    return "Could not find " + name + " shelf";
  };

  Library.prototype.getShelfIndex = function(name) {
    //Loop through shelves array and return index of shelf with same name
    for (var i = 0; i < this.shelves.length; i++) {
      if (name === this.shelves[i].name) {return i;}
    }
    //If not found, return ""
    return "";
  };

  //Shelf constructor function
  function Shelf(name) {
    this.name = name;
    this.books = [];
  }

  Shelf.prototype.addBook = function(author, title) {
    //Validate no other books that have the same author and title
    for (var i = 0; i < this.books.length; i++) {
      //Check to see if the author and title are the same
      if (author === this.books[i].author && title === this.books[i].title) {
        return "That book already exists";
      }
    }

    //Otherwise create new book via 'Book' constructor and push it onto books array
    this.books.push(new Book(author, title));
    return title + " by " + author + " added";
  };

  Shelf.prototype.removeBook = function(author, title) {
    //Loop through books array
    for (var i = 0; i < this.books.length; i++) {
      //Check to see if the author and title are the same
      if (author === this.books[i].author && title === this.books[i].title) {
        //If so, remove and return that book
        var removedBook = this.books.splice(i, 1);
        return "Removed " + removedBook[0].title + " by " + removedBook[0].author;
      }
    }
    //Otherwise return that book could not be found
    return "Could not find " + title + " by " + author;
  };

  //Book constructor function
  function Book(author, title) {
      this.author = author;
      this.title = title;
  }

  function printLibrary(latestAction) {
    html = "";
    //If latestAction has a value, print it
    if (latestAction !== undefined) {html += latestAction;}
    html += "</br></br>";
    //Validate the library has shelves
    if (library.shelves.length === 0) {
      html += "No bookshelves in this library";
    } else {
      //Loop through library and print all shelves and books
      for (var i = 0; i < library.shelves.length; i++) {
        html += library.shelves[i].name + " Shelf";
        html += "<ol>";
        if (library.shelves[i].books.length === 0) {
          html += "No books on this shelf";
        } else {
          for (var j = 0; j < library.shelves[i].books.length; j++) {
            html += "<li>" + library.shelves[i].books[j].title + " by ";
            html += library.shelves[i].books[j].author + "</li>";
          }
        }
        html += "</ol>";
      }
    }
    //Print actual text in #library div (This time no jquery!)
    document.getElementById("library").innerHTML = html;
  }

  //Initialize the library with some shelves and books
  var library = new Library();
  library.addShelf("Fantasy");
  library.shelves[0].addBook("RR Martin", "Game of Thrones");
  library.shelves[0].addBook("F Scott Fitzgerald", "Great Gatsby");
  library.shelves[0].addBook("Homer", "Illiad");
  library.addShelf("Philosophy");
  library.shelves[1].addBook("Hand of God", "Bible");
  library.shelves[1].addBook("Ayn Rand", "Atlas Shrugged");

  //Print initialized library
  printLibrary();
});
