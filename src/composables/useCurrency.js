// src/composables/useCurrencyRates.js
import { ref, onMounted } from "vue";

const currencyRates = ref({});
const availableCurrencies = ref([]);
const baseCurrency = ref(null);

const useCurrency = () => {
  const fetchRates = async () => {
    try {
      const response = await fetch(
        "https://status.neuralgeneration.com/api/currency"
      );
      const data = await response.json();
      currencyRates.value = data;
      extractCurrencies(data);
    } catch (error) {
      console.error("Ошибка при загрузке данных курсов валют:", error);
    }
  };

  const extractCurrencies = (data) => {
    try {
      const currencies = new Set();
      Object.keys(data).forEach((pair) => {
        const [from, to] = pair.split("-");
        currencies.add(from);
        currencies.add(to);
      });
      availableCurrencies.value = Array.from(currencies);
      if (!baseCurrency.value && availableCurrencies.value) {
        baseCurrency.value = availableCurrencies.value.includes("rub")
          ? "rub"
          : availableCurrencies.value[0];
      }
    } catch (error) {
      console.error("Ошибка при загрузке данных курсов валют:", error);
    }
  };

  onMounted(() => {
    try {
      if (Object.keys(currencyRates?.value)?.length === 0) {
        fetchRates();
      }
    } catch (error) {
      console.error("Ошибка при загрузке данных курсов валют:", error);
    }
  });

  return { baseCurrency, currencyRates, availableCurrencies };
};

export default useCurrency;
