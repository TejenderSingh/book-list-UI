// Book Class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
// UI Class
class UI {
    addBookToTable(book) {
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
    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
    displayMsg(message, background) {
        const div = document.createElement('div');
        div.className = `card-panel darken-2 white-text ${background}`;
        div.appendChild(document.createTextNode(message));
        const cardContent = document.querySelector('.card-content');
        const form = document.querySelector('#book-form');
        cardContent.insertBefore(div, form);

        setTimeout(() => {
            document.querySelector('.card-panel').remove();
        }, 1000);
    }
    deleteBook(target) {
        if(target.classList.contains('del-icon')) {
            target.parentElement.parentElement.remove();
            document.getElementById('title').focus();
        }
    }

}

// Local Storage class
class Store {
    static getBooksLS() {
        let bookList;
        if(localStorage.getItem('bookList') === null) {
            bookList = [];
        } else {
            bookList = JSON.parse(localStorage.getItem('bookList'));
        }
        return bookList;
    }
    static displayBooksLS() {
        const bookList = Store.getBooksLS();
        bookList.forEach(function(book) {
            const ui = new UI();
            ui.addBookToTable(book);
        });
    }
    static addBooksLS(book) {
        const bookList = Store.getBooksLS();
        bookList.push(book);
        localStorage.setItem('bookList', JSON.stringify(bookList));
    }
    static deleteBooksLS(isbn) {
        const bookList = Store.getBooksLS();
        bookList.forEach(function(book, index) {
            if(book.isbn === isbn) {
                bookList.splice(index, 1);
            }
        });
        localStorage.setItem('bookList', JSON.stringify(bookList));
    }
}

document.addEventListener('DOMContentLoaded', Store.displayBooksLS());
// Event listener for add book
const form = document.getElementById('book-form');
form.addEventListener('submit', e => {
   const title = document.getElementById('title').value,
       author = document.getElementById('author').value,
       isbn = document.getElementById('isbn').value;

   const book = new Book(title, author, isbn);
   const ui = new UI();
   if(title === '' || author === '' || isbn === '') {
       ui.displayMsg('Please fill in all fields', 'red',)
   } else {
       ui.addBookToTable(book);
       Store.addBooksLS(book);
       ui.clearFields();
       ui.displayMsg('Book has been added', 'teal')
       document.getElementById('title').focus();
   }
   e.preventDefault();
});

// Event Listener for delete
document.getElementById('book-list').addEventListener('click', e => {
   const ui = new UI();
   ui.deleteBook(e.target);
   Store.deleteBooksLS(e.target.parentElement.previousElementSibling.textContent);
   if(e.target.classList.contains('del-icon')) {
       ui.displayMsg('Book has been deleted', 'teal');
   }
   e.preventDefault();
});
