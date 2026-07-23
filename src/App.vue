<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'

  import {ref} from 'vue';
  import { DatePicker } from 'v-calendar';
  import 'v-calendar/style.css'

  const wybrana_data = ref(new Date());

</script>

<template>

  <div>
    <h2>Wybierz datę</h2>
    <DatePicker v-model="wybrana_data"/>
    <p>Wybrałeś: {{ wybrana_data }}</p>
  </div>

  <header>
    <div class="wrapper">
      <!--<HelloWorld msg="You did not do it!" />-->
      no to mam gotowe
    </div>
  </header>

  <main>
    <!--<TheWelcome />-->
    i nie wiem co
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;   
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
