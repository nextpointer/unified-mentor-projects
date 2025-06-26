<script setup lang="ts">
import { ref } from 'vue';

const titleInput = ref<string>('');
const fileInput = ref(null);

defineProps({
  show: Boolean
})

const emit = defineEmits(['popup-close']);

const handleFileChange = (event: any) => {
  fileInput.value = event.target.files[0];
};

const handleUpload = async () => {
  const title = titleInput.value;
  const file = fileInput.value;

  if (!file) {
    alert('Please select a file to upload!');
    return;
  }

  const formData = new FormData();
  formData.append('title', title);
  formData.append('document', file);

  try {
    const response = await fetch("/api/documents", {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      alert("Uploaded Sucessfully!");
      emit("popup-close");
    } else {
      alert("Something went wrong!");
      emit("popup-close");
    }
  } catch (error) {
    alert("Something went wrong!");
    console.error('Error during upload:', error);
    emit("popup-close");
  }
};
</script>

<template>
  <div v-if="show" class="upload-root">
    <div class="upload-container">
      <h2>Upload Document</h2>
      <form @submit.prevent="handleUpload">
        <div class="form-group">
          <label for="title">Title:</label>
          <input type="text" v-model="titleInput" id="title" required />
        </div>
        <div class="form-group">
          <label for="document">Select Document:</label>
          <input type="file" @change="handleFileChange" id="document" required />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.upload-root {
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #f4f4f4d3;
  backdrop-filter: blur(3px);
  z-index: 1000;
}

.upload-container {
  max-width: 400px;
  margin: auto;
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

input[type="text"],
input[type="file"] {
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
