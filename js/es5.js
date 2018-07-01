// Book constructor
function Book(title, author, isbn) {
   this.title = title;
   this.author = author;
   this.isbn = isbn;
}
// UI constructor
function UI() { };
UI.prototype.addBookToTable = function(book) {
   const list = document.getElementById('book-list');
   const row = document.createElement('tr');
   row.innerHTML = `
   <td>${book.title}</td>
   <td>${book.author}</td>
   <td>${book.isbn}</td>
   <td><i class="material-icons red-text text-darken-2 del-icon">delete</i></td>
   `;
   list.appendChild(row);
}

UI.prototype.clearFields = function() {
   document.getElementById('title').value = '';
   document.getElementById('author').value = '';
   document.getElementById('isbn').value = '';
}
UI.prototype.displayMsg = function(message, background) {
   const div = document.createElement('div');
   div.className = `card-panel darken-2 white-text ${background}`;
   div.appendChild(document.createTextNode(message));
   const cardContent = document.querySelector('.card-content');
   const form = document.querySelector('#book-form');
   cardContent.insertBefore(div, form);

   setTimeout(function() {
       document.querySelector('.card-panel').remove();
   }, 1000);
}
UI.prototype.deleteBook = function(target) {
   if(target.classList.contains('del-icon')) {
       target.parentElement.parentElement.remove();
       document.getElementById('title').focus();
   }
}

// Event listener for add book
const form = document.getElementById('book-form');
form.addEventListener('submit', function(e) {
   const title = document.getElementById('title').value,
       author = document.getElementById('author').value,
       isbn = document.getElementById('isbn').value;

   const book = new Book(title, author, isbn);
   const ui = new UI();
   if(title === '' || author === '' || isbn === '') {
       ui.displayMsg('Please fill in all fields', 'red',)
   } else {
       ui.addBookToTable(book);
       ui.clearFields();
       ui.displayMsg('Book has been added', 'teal')
       document.getElementById('title').focus();
   }
   e.preventDefault();
});

// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {
   const ui = new UI();
   ui.deleteBook(e.target);
   if(e.target.classList.contains('del-icon')) {
       ui.displayMsg('Book has been deleted', 'teal');
   }
   e.preventDefault();
});
