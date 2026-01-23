<template>
    <header>Bunu Mu Arıyordun?</header>
    <div class="page">
        <div class="filters">
            <div class="category-buttons">
                <button v-for="cat in categories" :key="cat" :class="{ active: selectedCategory === cat }"
                    @click="selectCategory(cat)">
                    {{ cat }}
                </button>
                <button :class="{ active: selectedCategory === '' }" @click="selectCategory('')">
                    Tümü
                </button>
            </div>

            <div class="price-filters">
                <input type="text" placeholder="Ürün ara..." v-model="searchText" />

                <input type="number" placeholder="Min Fiyat" v-model.number="minPrice" />
                <input type="number" placeholder="Max Fiyat" v-model.number="maxPrice" />
                <button class="apply-btn" @click="applyFilters">Filtrele</button>
            </div>
        </div>
        <div id="screen">
            <div class="title">Arama Sonuçları:</div>

            <div v-if="filteredProducts.length === 0" class="no-results">
                <strong>Ürün bulunamadı.</strong>
            </div>

            <div v-for="product in filteredProducts" :key="product.name" class="selectedProducts">
                <span class="product-name">{{ product.name }}</span>
                <span class="product-price">{{ product.price }} TL</span>
                <span class="product-category">({{ product.category }})</span>
            </div>
        </div>
    </div>
    <footer> © 2026 Bunu Mu Arıyordun? | Geliştiren: Güray Topağaç </footer>
</template>

<script setup>
    import { ref, watch } from "vue";

    const products = [
        { name: "Dizüstü Bilgisayar", category: "Elektronik", price: 25999.99 },
        { name: "Masaüstü Bilgisayar", category: "Elektronik", price: 43999.99 },
        { name: "Tablet", category: "Elektronik", price: 4799.99 },
        { name: "Telefon", category: "Elektronik", price: 17350.00 },
        { name: "Klavye", category: "Elektronik", price: 2099.99 },

        { name: "Masa Sandalyesi", category: "Mobilya", price: 2999.99 },
        { name: "Çalışma Masası", category: "Mobilya", price: 3499.99 },
        { name: "Kitaplık", category: "Mobilya", price: 1699.99 },
        { name: "Koltuk Takımı", category: "Mobilya", price: 14085.00 },
        { name: "Yemek Masası", category: "Mobilya", price: 12899.99 },

        { name: "Defter", category: "Kırtasiye", price: 129.99 },
        { name: "Kurşun Kalem Seti", category: "Kırtasiye", price: 79.99 },
        { name: "Silgi", category: "Kırtasiye", price: 24.99 },
        { name: "Renkli Kalem Seti", category: "Kırtasiye", price: 319.99 },
        { name: "Cetvel", category: "Kırtasiye", price: 35.00 },

        { name: "Saksı", category: "Ev & Yaşam", price: 399.99 },
        { name: "Termos", category: "Ev & Yaşam", price: 550.00 },
        { name: "Masa Lambası", category: "Ev & Yaşam", price: 908.00 },
        { name: "Yastık", category: "Ev & Yaşam", price: 149.99 },
        { name: "Battaniye", category: "Ev & Yaşam", price: 599.99 },

        { name: "Yoga Matı", category: "Spor", price: 409.99 },
        { name: "Dumbbell Seti", category: "Spor", price: 1750.00 },
        { name: "Koşu Bandı", category: "Spor", price: 8900.00 },
        { name: "Basketbol Topu", category: "Spor", price: 769.00 },
        { name: "Spor Ayakkabı", category: "Spor", price: 3499.99 }
    ];

    const categories = ["Elektronik", "Mobilya", "Kırtasiye", "Ev & Yaşam", "Spor"];

    const searchText = ref("");
    const filteredProducts = ref([...products]);
    const selectedCategory = ref('');
    const minPrice = ref('');
    const maxPrice = ref('');

    function applyFilters() {
        filteredProducts.value = products.filter(product => {
            const matchesCategory = selectedCategory.value ? product.category === selectedCategory.value : true;
            const matchesMin = minPrice.value ? product.price >= minPrice.value : true;
            const matchesMax = maxPrice.value ? product.price <= maxPrice.value : true;
            const matchesText = searchText.value ? product.name.toLowerCase().includes(searchText.value.toLowerCase()) : true;
            return matchesCategory && matchesMin && matchesMax && matchesText;
        });
    }

    function selectCategory(cat) {
        selectedCategory.value = cat;
        applyFilters();
    }

    watch(searchText, () => {
        applyFilters();
    });
</script>

<style src="./productListApp.css"></style>