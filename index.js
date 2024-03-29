console.log("This is index.js");
//Todos
/*
1.store all the data to the local storage
2.Give another column as an option to delete the book
3.Add a Scroll bar to the view */

//Constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;

}
//Display Constructor
function Display() {

}
//Add methods to display prototype
Display.prototype.add = function (book) {//I am taking book object
    console.log("Adding to UI");
    tableBody = document.getElementById('tableBody');
    let uiString = `<tr>
    <td>${book.name}</td>
    <td>${book.author}</td>
    <td>${book.type}</td>
    </tr>

    `
    tableBody.innerHTML += uiString;//adding in inner html
}
//implement the clear funciton
Display.prototype.clear = function (book) {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();

}

//implement the validate funciton

Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false;

    }
    else {
        return true;
    }



}
Display.prototype.show = function (type, displaymessage) {
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
    <strong>Message:</strong> ${displaymessage}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span></button>
  </div>`;
    setTimeout(function () {
        message.innerHTML = ''//message will vanish after 2 seconds

    }, 2000);

}


//Add submit event listener to libraryForm


let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('you have submitted library form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;



    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }
    let book = new Book(name, author, type);
    console.log(book);

    let display = new Display();
    if (display.validate(book)) {
        display.add(book);
        display.clear();//it will clear the values
        display.show('success', 'Your book has been successfully added');

    }
    else {
        //show error to the user
        display.show('danger', 'sorry you cannot add this book.');
    }
    e.preventDefault();
}