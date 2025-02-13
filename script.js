document.addEventListener('DOMContentLoaded', () => {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const belumSelesaiList = document.getElementById('belum-selesai-list');
    const selesaiList = document.getElementById('selesai-list');

    const renderBooks = () => {
        belumSelesaiList.innerHTML = '';
        selesaiList.innerHTML = '';

        books.forEach((book, index) => {
            const li = document.createElement('li');
            li.textContent = book.title;

            const moveButton = document.createElement('button');
            moveButton.textContent = book.finished ? 'Belum Selesai' : 'Selesai';
            moveButton.addEventListener('click', () => {
                books[index].finished = !books[index].finished;
                localStorage.setItem('books', JSON.stringify(books));
                renderBooks();
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Hapus';
            deleteButton.addEventListener('click', () => {
                books.splice(index, 1);
                localStorage.setItem('books', JSON.stringify(books));
                renderBooks();
            });

            li.appendChild(moveButton);
            li.appendChild(deleteButton);

            if (book.finished) {
                selesaiList.appendChild(li);
            } else {
                belumSelesaiList.appendChild(li);
            }
        });
    };

    document.getElementById('add-book').addEventListener('click', () => {
        const bookTitle = document.getElementById('book-title').value;
        if (bookTitle) {
            books.push({ title: bookTitle, finished: false });
            localStorage.setItem('books', JSON.stringify(books));
            document.getElementById('book-title').value = '';
            renderBooks();
        }
    });

    renderBooks();
});
