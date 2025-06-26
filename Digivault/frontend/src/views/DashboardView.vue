<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Nav from "@/components/Nav.vue";
import view from '@/assets/view.svg';
import share from '@/assets/share.svg';
import download from '@/assets/download.svg';
import trash from '@/assets/delete.svg';
import FileUpload from '@/components/FileUpload.vue';

const documents = ref<any>([]);
const open = ref(false);

const toggleOpen = () => {
  open.value = !open.value;
};

const fetchDocuments = async () => {
  try {
    const response = await fetch('/api/documents');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    documents.value = await response.json();
  } catch (error) {
    console.error('Error fetching documents:', error);
  }
};

const shareLink = async (document: any) => {
  if (navigator.share) {
    try {
      console.log({
        title: document.title,
        text: `Here is my ${document.title}!`,
        url: document.document,
      })
      await navigator.share({
        title: document.title,
        text: `Here is my ${document.title}!`,
        url: document.url,
      })
      console.log('Share successful');
    } catch (error) {
      console.error('Error sharing:', error);
    }
  } else {
    console.log('Web Share API is not supported in this browser.');
  }
};

const deleteDocument = async (id: any) => {
  try {
    const response = await fetch(`/api/documents/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      alert('Document deleted successfully!');
      documents.value = documents.value.filter((doc: any) => doc.id !== id);
    } else {
      alert('Failed to delete the document. Please try again.');
    }
  } catch (error) {
    console.error('An error occurred while deleting the document: ' + error);
  }
}

onMounted(() => {
  fetchDocuments();
});
</script>

<template>
  <Nav />
  <div id="heading">
    <h1>welcome, user</h1>
    <button id="upload" @click="toggleOpen">Upload New Document</button>
    <FileUpload :show="open" @popup-close="() => { toggleOpen(); fetchDocuments() }" />
  </div>
  <h2>your documents</h2>
  <hr />
  <div class="card-container">
    <span v-if="documents.length === 0">No documents yet</span>
    <div class="card" v-for="document in documents" :key="document.id">
      <h3>{{ document.title }}</h3>
      <span>
        <a :href="document.url"><img :src="view" alt="View" /></a>
        <i @click="() => shareLink(document)"><img :src="share" alt="Share" /></i>
        <a :href="document.url" download><img :src="download" alt="Download" /></a>
        <i @click="() => deleteDocument(document.id)"><img :src="trash" alt="Delete" /></i>
      </span>
    </div>
  </div>
</template>

<style scoped>
#heading {
  display: flex;
  margin: 40px;
  align-items: center;
  justify-content: space-between;
}

#upload {
  display: block;
  height: 3rem;
  border: none;
  padding: 0 10px;
  letter-spacing: .6px;
  outline: 2px solid var(--color-accent);
  font-size: .88rem;
  font-weight: 600;
  color: var(--color-accent);
  background-color: var(--color-background);
  transition: .2s;
}

#upload:hover {
  color: var(--color-background);
  background-color: var(--color-accent);
}

hr {
  width: 94%;
  margin-left: 38px;
  height: 2px;
  border: none;
  background: #b9b9b9;
  border-radius: 100px;
}

h2 {
  margin: 0 40px;
}

.card-container {
  display: flex;
  justify-content: start;
  gap: 20px;
  flex-wrap: wrap;
  margin: 20px 40px;
}

.card {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  width: 340px;
  background-color: var(--color-primary);
  transition: transform 0.2s;
}

.card:hover {
  outline: 2px solid var(--color-accent);
}

h3 {
  display: inline-block;
  width: 140px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

img {
  margin-left: 8px;
}

i {
  cursor: pointer;
}
</style>
