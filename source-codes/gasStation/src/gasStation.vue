<template>
  <div class="layout">

    <header>Akaryakıt Otomasyonu</header>

    <div class="page">
      <div class="form-area">
        <div>
          <label>Pompa No</label>
          <input type="number" v-model.number="pumpNumber" min="1" max="4" placeholder="Pompa No" />
        </div>

        <div>
          <label>Yakıt Türü</label>
          <select v-model="fuelType">
            <option value="">Seçiniz</option>
            <option value="Dizel">Dizel</option>
            <option value="Benzin">Benzin</option>
            <option value="Lpg">LPG</option>
          </select>
        </div>

        <div>
          <label>Miktar (Litre)</label>
          <input type="number" v-model.number="amount" min="1" max="100" placeholder="Miktar" />
        </div>
      </div>

      <button id="calculateBttn" @click="calculate">Hesapla</button>

      <div id="result">
        <p style="white-space: pre-line">{{ result }}</p>
      </div>
    </div>

    <footer>
      © 2026 Akaryakıt Otomasyonu | Geliştiren: Güray Topağaç
    </footer>

  </div>
</template>


<script setup>
  import { ref } from "vue";

  const pumpNumber = ref(null);
  const fuelType = ref("");
  const amount = ref(null);
  const result = ref("Hoşgeldiniz!");

  const PRICES = {
    Dizel: 54.47,
    Benzin: 53.75,
    Lpg: 28.7
  };

  function calculate() {
    if (!Number.isInteger(pumpNumber.value) || pumpNumber.value < 1 || pumpNumber.value > 4) {
      result.value = "Pompa numarası 1-4 arasında olmalıdır.";
      return;
    }

    if (!fuelType.value) {
      result.value = "Lütfen yakıt türü seçiniz.";
      return;
    }

    if (isNaN(amount.value) || amount.value < 1 || amount.value > 100) {
      result.value = "Yakıt miktarı 1-100 litre arasında olmalıdır.";
      return;
    }

    const price = (PRICES[fuelType.value] * amount.value).toFixed(2);

    result.value =
      "⛽ Yakıt Alım Özeti ⛽\n\n" +
      `Pompa No   : ${pumpNumber.value}\n` +
      `Yakıt Türü : ${fuelType.value}\n` +
      `Miktar     : ${amount.value} L\n\n` +
      `Toplam Ücret: ${price} TL`;
  }
</script>

<style src="./gasStation.css"></style>