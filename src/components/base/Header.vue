<template>
  <header>
    <nav>
      <router-link to="/">Главная</router-link>
      <router-link to="/convert">Конвертация</router-link>
    </nav>
    <select v-model="baseCurrency" class="header_base__currency">
      <option
        :value="currency"
        v-for="currency in availableCurrencies"
        :key="currency"
      >
        {{ currency?.toUpperCase?.() }}
      </option>
    </select>
  </header>
</template>

<script setup>
import useCurrency from "@/composables/useCurrency";
const { baseCurrency, availableCurrencies } = useCurrency();
</script>
<style scoped>
header {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav a {
  color: white;
  margin-right: 20px;
  text-decoration: none;
  font-weight: bold;
}

nav a:hover {
  text-decoration: underline;
}

select {
  padding: 5px;
  margin-left: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.header_base__currency {
  max-width: 5rem;
}
</style>
