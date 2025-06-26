<script setup lang="ts">
// import { RouterLink } from "vue-router"
import router from '@/router';

function isLoggedIn() {
  const cookies = document.cookie;
  const cookieArray = cookies.split('; ');

  for (let i = 0; i < cookieArray.length; i++) {
    const cookie = cookieArray[i];
    if (cookie.startsWith('session_id=')) {
      const sessionIdValue = cookie.split('=')[1];
      if (sessionIdValue) {
        return true;
      } else {
        return false;
      }
    }
  }

  return false;
}

async function handleLogout() {
  try {
    const response = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      router.push('/');
    } else {
      alert('Logout failed');
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
}

// const links = ["/", "/About", "/FAQ", "/Contact"]
</script>

<template>
  <nav>
    <div id="branding">
      <img src="/digivault.svg" width="52" alt="">&nbsp;<span>digivault</span>
    </div>
    <div id="spacer"><!-- spacer --></div>
    <!-- <ul>
            <li v-for="link in links">
                <RouterLink activeClass="active-link" :to="link.toLowerCase()">{{
                    link.length === 1 ? "home" : link.toLowerCase().substring(1)
                }}</RouterLink>
            </li>
        </ul> -->

    <button v-if="!isLoggedIn()" @click="router.push('/login')">Login</button>
    <button v-if="!isLoggedIn()" @click="router.push('/register')">Register</button>
    <button v-if="isLoggedIn()" @click="handleLogout">Logout</button>
  </nav>
</template>

<style scoped>
nav {
  position: sticky;
  top: 0;
  left: 0;
  width: 100vw;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 1rem;
  border-bottom: 2px solid var(--color-accent);
  color: var(--color-accent);
  background-color: var(--color-primary);
  z-index: 900;
}

/* nav>* {
    outline: 1px solid blue;
} */

nav #branding {
  display: flex;
  align-items: center;
  min-width: fit-content;
  font-family: Newsreader;
  font-weight: 600;
}

nav #spacer {
  width: 100%;
}

nav ul {
  display: flex;
  flex-direction: row;
  width: 50%;
  padding: 1rem;
  list-style: none;
}

nav ul li {
  width: calc(100% / 4);
  text-align: center;
}

nav button {
  margin-left: 1rem;
  display: block;
  min-width: 6rem;
  height: 3rem;
  border: none;
  letter-spacing: .6px;
  outline: 2px solid var(--color-accent);
  font-size: .88rem;
  font-weight: 600;
  color: var(--color-accent);
  background-color: var(--color-background);
  transition: .2s;
}

nav button:hover {
  color: var(--color-background);
  background-color: var(--color-accent);
}

.active-link {
  color: var(--color-background);
  background-color: var(--color-accent);
}
</style>
