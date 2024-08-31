<template>
  <div class="container">
    <h2>Курсы валют (основная валюта: {{ baseCurrency?.toUpperCase?.() }})</h2>
    <ul>
      <li v-for="(rate, currency) in displayedRates" :key="currency">
        1 {{ baseCurrency?.toUpperCase?.() }} = {{ rate.toFixed(4) }}
        {{ currency.toUpperCase() }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from "vue";
import useCurrency from "@/composables/useCurrency";

const { baseCurrency, currencyRates: rates } = useCurrency();

const displayedRates = computed(() => {
  try {
    const displayedRates = {};
    // Фильтрация курсов валют в зависимости от выбранной основной валюты
    Object.keys(rates.value).forEach((pair) => {
      const [from, to] = pair.split("-");
      if (from === baseCurrency.value) {
        displayedRates[to] = rates.value[pair];
      }
    });
    return displayedRates;
  } catch (error) {
    console.error("Ошибка", error);
  }
});
</script>

<style scoped>
.container {
  margin: 20px auto;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background-color: #f8f9fa;
  margin: 5px 0;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
</style>
