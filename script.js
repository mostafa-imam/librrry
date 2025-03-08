const dialog = document.querySelector("dialog");
const form = document.querySelector('form');

const inputElemTitle = document.querySelector('#book-title');
const inputElemAuthor = document.querySelector('#book-author');
const inputElemPages = document.querySelector('#book-pages');
const inputElemStatus = document.querySelector('#book-status');

const addBookBtn = document.querySelector(".add-book-btn");
const submitBtn = document.querySelector('.form-submit-btn');
const closeDialogBtn = document.querySelector('.close-dialog-btn');
const removeBtns = document.querySelectorAll('button.remove');
const statusBtns = document.querySelectorAll('td[data-cell="status"] button');

const table = document.querySelector('table');
const tableTBody = document.querySelector('.table-body');
const tableSelect = document.querySelector('#book-status');

const librrry = [];

addBookBtn.addEventListener("click", showDialog);
closeDialogBtn.addEventListener('click', () => {
        closeDialog();
        clearInputs();
    }
);

submitBtn.addEventListener('click', (event) => {

    if (!form.checkValidity()) {
        return;
    }

    event.preventDefault();
    closeDialog();
    addBookToLibrrry();
    displayBookOnPage();
    clearInputs();
    }
);

tableTBody.addEventListener('click', (event) => {
    let target = event.target;
    let targetIndex = Number(target.dataset.index);

    removeBookFromPage(target, targetIndex);
    toggleStatus(target);
});

dialog.addEventListener('click', (event) => {

    let rect = event.target.getBoundingClientRect();

    if ( rect.left > event.clientX || rect.right < event.clientX || rect.top > event.clientY || rect.bottom < event.clientY ) {
            dialog.close();
        }
});

function showDialog() {
    dialog.showModal();
}

function closeDialog() {
    dialog.close();
}

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

Book.prototype.toggleStatus = function() {
    if (this.status === "Read") {
        this.status = "Not Read";
    } else {
        this.status = "Read";
    }
}

function addBookToLibrrry(title, author, pages, status) {
    title = inputElemTitle.value;
    author = inputElemAuthor.value;
    pages = inputElemPages.value;
    status = inputElemStatus.value;
    
    let book = new Book(title, author, pages, status);
    librrry.push(book);
}

function displayBookOnPage() {
    let row = tableTBody.insertRow();
    row.dataset.index = librrry.length - 1;
    for (let key in librrry.at(-1) ) {
        let cell = row.insertCell();
        cell.dataset.index = librrry.length - 1;
        cell.dataset.cell = key;
        let text = document.createTextNode(librrry.at(-1)[key]);
        cell.appendChild(text);
        if (cell.dataset.cell === "status") {
            text.remove();
            let status = document.createElement('button');
            status.classList = librrry.at(-1)[key];
            status.textContent = librrry.at(-1)[key];
            cell.appendChild(status);
        }
        if (cell.dataset.cell === 'toggleStatus') {
            cell.remove();
        }
    }
    let remove = document.createElement('button');
    remove.classList = 'remove';
    remove.textContent = "Remove";
    remove.dataset.index = librrry.length - 1;
    let cell = row.insertCell();
    cell.dataset.index = librrry.length - 1;
    cell.dataset.cell = "Remove";
    cell.appendChild(remove);
}

function removeBookFromPage(target, targetIndex) {
    if (target.className === "remove") {
        librrry.splice(targetIndex, 1);
        tableTBody.children[targetIndex].remove();

        for (let i = 0; i < tableTBody.children.length; i++) {
            tableTBody.children[i].dataset.index = i;

            for (let j = 0; j < tableTBody.children[i].children.length; j++) {
                tableTBody.children[i].children[j].dataset.index = i;

                for (let k = 0; k < tableTBody.children[i].children[j].children.length; k++) {
                    tableTBody.children[i].children[j].children[k].dataset.index = i;
                }
            }
        }
    }
}

function toggleStatus(target) {
    if (target.parentElement.dataset.cell === "status") {
        librrry[target.parentElement.dataset.index].toggleStatus();

        target.className = librrry[target.parentElement.dataset.index].status;
        target.textContent = librrry[target.parentElement.dataset.index].status;
    }
}

function clearInputs() {
    inputElemTitle.value = '';
    inputElemAuthor.value = '';
    inputElemPages.value = '';
}