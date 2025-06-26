<script setup lang="ts">
import { RouterLink } from "vue-router"

const links = ["#About", "#FAQ", "#Contact", "#Terms and Conditions"]
</script>

<template>
  <footer>
    <div>
      <ul>
        <li v-for="link in links">
          <RouterLink activeClass="active-link" :to="{ path: '/', hash: link.toLowerCase() }">
            {{
              link.substring(1)
            }}
          </RouterLink>
        </li>
      </ul>
    </div>
    <div id="copyright-text">Copyright © {{ (new Date()).getFullYear() }}, This website is built as a part of the web dev internship at Unified Mentors</div>
  </footer>
</template>

<style scoped>
footer {
  height: 30vh;
  color: var(--color-background);
  background-color: var(--color-accent);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
}

footer ul {
  display: flex;
  flex-direction: column;
  height: 50%;
  list-style: none;
}

footer ul li {
  width: calc(100% / 4);
}

footer #copyright-text {
  text-align: center;
}
</style>
