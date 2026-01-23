<template>
    <div class="layout">
        <header class="header">
            <h1>Kitabım Nerede?</h1>
        </header>

        <main class="page">
            <div class="search">
                <input type="text" v-model.trim="inputBox" placeholder="Kitap adı girin" @keyup.enter="findBook" />
                <button @click="findBook">Ara</button>
            </div>

            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

            <div class="tables">
                <section class="products">
                    <h2>Kitaplar</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Başlık</th>
                                <th>Yazar</th>
                                <th>Fiyat</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="book in leftBooks" :key="book.title" :class="{ activeRow: book === foundBook }">
                                <td>{{ book.title }}</td>
                                <td>{{ book.author }}</td>
                                <td>{{ book.price }} $</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section class="shelfs">
                    <h2>Raf Düzeni</h2>
                    <table>
                        <thead>
                            <tr>
                                <th v-for="shelf in 5" :key="shelf">
                                    {{ shelf }}. Raf
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="chapter in 5" :key="chapter"
                                :class="{ rowHighlight: chapter === selectedChapter }">
                                <td v-for="shelf in 5" :key="shelf" :class="{
                                        colHighlight: shelf === selectedShelf,
                                        cellHighlight:
                                            shelf === selectedShelf &&
                                            chapter === selectedChapter
                                    }">
                                    {{ chapter }}. Bölüm
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section class="products">
                    <h2>Kitaplar</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Başlık</th>
                                <th>Yazar</th>
                                <th>Fiyat</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="book in rightBooks" :key="book.title" :class="{ activeRow: book === foundBook }">
                                <td>{{ book.title }}</td>
                                <td>{{ book.author }}</td>
                                <td>{{ book.price }} $</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </main>

        <footer class="footer">
            © 2026 Kitabım Nerede? | Geliştiren: Güray Topağaç
        </footer>
    </div>
</template>

<script setup>
    import { ref, computed } from "vue";

    const inputBox = ref("");
    const selectedShelf = ref(null);
    const selectedChapter = ref(null);
    const errorMessage = ref("");
    const foundBook = ref(null);

    const books = [
        { title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 10.99, shelf: 1, chapter: 1 },
        { title: "To Kill a Mockingbird", author: "Harper Lee", price: 8.99, shelf: 2, chapter: 3 },
        { title: "1984", author: "George Orwell", price: 9.99, shelf: 3, chapter: 5 },
        { title: "Pride and Prejudice", author: "Jane Austen", price: 7.99, shelf: 4, chapter: 2 },
        { title: "The Catcher in the Rye", author: "J.D. Salinger", price: 6.99, shelf: 5, chapter: 4 },
        { title: "Moby Dick", author: "Herman Melville", price: 11.5, shelf: 1, chapter: 4 },
        { title: "War and Peace", author: "Leo Tolstoy", price: 14.99, shelf: 2, chapter: 5 },
        { title: "The Hobbit", author: "J.R.R. Tolkien", price: 12.99, shelf: 3, chapter: 2 },

        { title: "Dune", author: "Frank Herbert", price: 11.25, shelf: 4, chapter: 1 },
        { title: "Brave New World", author: "Aldous Huxley", price: 9.5, shelf: 5, chapter: 3 },
        { title: "Anna Karenina", author: "Leo Tolstoy", price: 13.75, shelf: 1, chapter: 5 },
        { title: "The Alchemist", author: "Paulo Coelho", price: 8.5, shelf: 2, chapter: 1 },
        { title: "Fahrenheit 451", author: "Ray Bradbury", price: 7.99, shelf: 3, chapter: 4 },
        { title: "Jane Eyre", author: "Charlotte Brontë", price: 9.25, shelf: 4, chapter: 3 },
        { title: "Animal Farm", author: "George Orwell", price: 6.5, shelf: 5, chapter: 2 },
        { title: "The Little Prince", author: "Antoine de Saint-Exupéry", price: 7.25, shelf: 3, chapter: 1 }
    ];

    const leftBooks = computed(() => books.slice(0, Math.ceil(books.length / 2)));
    const rightBooks = computed(() => books.slice(Math.ceil(books.length / 2)));

    function findBook() {
        errorMessage.value = "";
        foundBook.value = null;

        if (!inputBox.value) {
            errorMessage.value = "Lütfen bir kitap adı girin.";
            return;
        }

        const found = books.find(b =>
            b.title.toLowerCase().includes(inputBox.value.toLowerCase())
        );

        if (!found) {
            selectedShelf.value = null;
            selectedChapter.value = null;
            errorMessage.value = "Aradığınız kitap bulunamadı.";
            return;
        }

        foundBook.value = found;
        selectedShelf.value = found.shelf;
        selectedChapter.value = found.chapter;
    }
</script>

<style src="./bookListApp.css"></style>