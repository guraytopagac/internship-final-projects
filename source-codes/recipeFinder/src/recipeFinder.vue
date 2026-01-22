<template>
    <div class="layout">

        <header class="header">
            <h1>Ne Yesem?</h1>
        </header>

        <main class="content">
            <section class="card">
                <h2>Malzemeler</h2>

                <label v-for="item in ingredients" :key="item" class="ingredient">
                    <input type="checkbox" :value="item" v-model="selectedIngredients" />
                    {{ item }}
                </label>
            </section>

            <section class="card">
                <h2>Yapılabilecek Yemekler</h2>

                <p v-if="availableRecipes.length === 0" class="info">
                    Henüz uygun bir yemek bulunamadı.
                </p>

                <ul v-else class="recipe-list">
                    <li v-for="recipe in availableRecipes" :key="recipe.name">
                        {{ recipe.name }}
                    </li>
                </ul>
            </section>

        </main>

        <footer class="footer">
            © 2026 Ne Yesem? | Geliştiren: Güray Topağaç
        </footer>

    </div>
</template>

<script setup>
    import { ref, computed } from "vue";

    const ingredients = [
        "Domates",
        "Yumurta",
        "Peynir",
        "Soğan",
        "Sarımsak",
        "Tavuk",
        "Patates",
        "Un",
        "Biber",
        "Zeytinyağı",
        "Süt",
        "Yoğurt",
        "Tereyağı",
        "Makarna",
        "Pirinç"
    ];

    const recipes = [
        { name: "Menemen", needs: ["Domates", "Yumurta", "Soğan", "Biber"] },
        { name: "Omlet", needs: ["Yumurta", "Peynir", "Tereyağı"] },
        { name: "Patates Kızartması", needs: ["Patates", "Zeytinyağı"] },
        { name: "Tavuk Sote", needs: ["Tavuk", "Soğan", "Sarımsak", "Zeytinyağı"] },
        { name: "Krep", needs: ["Un", "Yumurta", "Süt"] },

        { name: "Makarna", needs: ["Makarna", "Zeytinyağı"] },
        { name: "Tavuklu Makarna", needs: ["Tavuk", "Makarna"] },
        { name: "Pirinç Pilavı", needs: ["Pirinç", "Tereyağı"] },
        { name: "Yoğurtlu Patates", needs: ["Patates", "Yoğurt", "Sarımsak"] },
        { name: "Peynirli Börek", needs: ["Un", "Peynir", "Yumurta"] }
    ];

    const selectedIngredients = ref([]);

    const availableRecipes = computed(() => {
        return recipes.filter(recipe => {
            for (const need of recipe.needs) {
                if (!selectedIngredients.value.includes(need)) {
                    return false;
                }
            }
            return true;
        });
    });
</script>

<style src="./recipeFinder.css"></style>