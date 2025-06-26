<script lang="ts">
import router from '@/router';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });

        if (response.ok) {
          router.push('/dashboard');
        } else {
          alert(await response.text());
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    }
  }
};
</script>

<template>
  <div class="login-root">
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" v-model="username" id="username" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" v-model="password" id="password" required />
        </div>
        <div class="form-group">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>


<style scoped>
.login-root {
  display: grid;
  place-items: center;
  width: 100vw;
  height: 100vh;
}

.login-container {
  min-width: 400px;
  padding: 20px;
  background-color: var(--color-primary);
}

h2 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
}

button {
  display: block;
  margin: 40px auto;
  margin-bottom: 0;
  width: 99%;
  height: 1.7rem;
  border: none;
  letter-spacing: .6px;
  outline: 2px solid var(--color-accent);
  font-size: .88rem;
  font-weight: 600;
  color: var(--color-accent);
  background-color: var(--color-background);
  transition: .2s;
}

button:hover {
  color: var(--color-background);
  background-color: var(--color-accent);
}
</style>