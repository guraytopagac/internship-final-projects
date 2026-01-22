<template>
    <div class="layout">
        <header>Döviz Dönüştürücü</header>

        <main class="page">
            <div class="converter">
                <input type="number" v-model.number="amount" placeholder="Miktar giriniz" />
                <select v-model="fromCurrency">
                    <option value="TL">Türk Lirası (TL)</option>
                    <option value="USD">Amerikan Doları (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                    <option value="GBP">Sterlin (GBP)</option>
                    <option value="GOLD">Gram Altın</option>
                    <option value="SILVER">Gram Gümüş</option>
                    <option value="BTC">Bitcoin</option>
                    <option value="ETH">Ethereum</option>
                    <option value="JPY">Japon Yeni</option>
                    <option value="CHF">İsviçre Frangı</option>
                </select>

            </div>

            <div class="results" v-if="amount > 0">
                <p v-for="(value, currency) in convertedValues" :key="currency">
                    {{ value }} {{ symbols[currency] }} ({{ currency }})
                </p>
            </div>
        </main>

        <footer>© 2026 Döviz Dönüştürücü | Geliştiren: Güray Topağaç</footer>
    </div>
</template>

<script setup>
    import { ref, computed } from "vue";

    const amount = ref(null);
    const fromCurrency = ref("TL");

    const rates = {
        TL: 1,
        USD: 43.29,
        EUR: 45.78,
        GBP: 53.21,
        GOLD: 2450,
        SILVER: 29.5,
        BTC: 1350000,
        ETH: 75000,
        JPY: 0.29,
        CHF: 46.10
    };

    const symbols = {
        TL: "₺",
        USD: "$",
        EUR: "€",
        GBP: "£",
        GOLD: "gr",
        SILVER: "gr",
        BTC: "₿",
        ETH: "Ξ",
        JPY: "¥",
        CHF: "CHF"
    };

    const convertedValues = computed(() => {
        if (!amount.value || amount.value <= 0) return {};

        const amountInTL = amount.value * rates[fromCurrency.value];
        const result = {};

        for (const currency in rates) {
            if (currency !== fromCurrency.value) {
                result[currency] = (amountInTL / rates[currency]).toFixed(2);
            }
        }

        return result;
    });
</script>

<style src="./currencyConverter.css"></style>