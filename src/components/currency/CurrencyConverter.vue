<template>
  <div class="container">
    <h2>Конвертация валют</h2>
    <div class="converter_block">
      <select v-model="currencyFrom" @change="convertCurrency('from')">
        <option
          v-for="currency in availableCurrencies"
          :key="currency"
          :value="currency"
        >
          {{ currency.toUpperCase() }}
        </option>
      </select>
      <input
        type="number"
        v-model.number="amountFrom"
        @input="convertCurrency('from')"
      />
    </div>
    <div class="converter_block">
      <select v-model="currencyTo" @change="convertCurrency('to')">
        <option
          v-for="currency in availableCurrencies"
          :key="currency"
          :value="currency"
        >
          {{ currency.toUpperCase() }}
        </option>
      </select>
      <input
        type="number"
        v-model.number="amountTo"
        @input="convertCurrency('to')"
      />
    </div>
  </div>
</template>

<script setup>
import useCurrency from "@/composables/useCurrency";
import { ref, watch, onMounted } from "vue";
const {
  baseCurrency,
  currencyRates: rates,
  availableCurrencies,
} = useCurrency();
const currencyFrom = ref("rub"); // Валюта по умолчанию в первом Dropdown
const currencyTo = ref("usd"); // Валюта по умолчанию во втором Dropdown
const amountFrom = ref(0);
const amountTo = ref(0);

onMounted(() => {
  setDefaultCurrencies();
});

const setDefaultCurrencies = () => {
  if (availableCurrencies.value.length > 0) {
    currencyFrom.value = availableCurrencies.value.includes(baseCurrency?.value)
      ? baseCurrency?.value
      : availableCurrencies.value[0];
    currencyTo.value = availableCurrencies.value.includes("usd")
      ? "usd"
      : availableCurrencies.value[1];
  }
};

const getConversionRate = (from, to) => {
  if (from === to) {
    return 1;
  }

  const directPair = `${from}-${to}`;
  const reversePair = `${to}-${from}`;

  if (rates[directPair]) {
    return rates.value[directPair];
  } else if (rates.value[reversePair]) {
    return 1 / rates.value[reversePair];
  } else {
    return 1;
  }
};

const convertCurrency = (changedField) => {
  if (currencyFrom.value && currencyTo.value) {
    const conversionRate = getConversionRate(
      currencyFrom.value,
      currencyTo.value
    );

    if (changedField === "from") {
      amountTo.value = (amountFrom.value * conversionRate).toFixed(2);
    } else if (changedField === "to") {
      const reverseRate = 1 / conversionRate;
      amountFrom.value = (amountTo.value * reverseRate).toFixed(2);
    }
  }
};

watch(
  () => [currencyFrom.value, currencyTo.value],
  () => {
    convertCurrency("from");
    convertCurrency("to");
  }
);
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

select {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
}

input[type="number"] {
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: calc(100% - 20px);
}

input[type="number"]:focus {
  border-color: #007bff;
  outline: none;
}

.converter_block {
  display: flex;
  gap: 10px;
}
</style>
