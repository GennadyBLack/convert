<template>
  <div>
    <Header />
    <CurrencyConverter />
  </div>
</template>

<script>
import Header from "@/components/base/Header.vue";
import CurrencyConverter from "@/components/currency/CurrencyConverter.vue";

export default {
  components: {
    Header,
    CurrencyConverter,
  },
};
</script>
