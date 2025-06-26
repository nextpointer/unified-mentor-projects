<script setup lang="ts">
import Footer from "@/components/Footer.vue";
import Nav from "@/components/Nav.vue";
</script>

<template>
  <Nav />
  <main>
    <div id="hero">
      <div>
        <h1>Embrace the Future: Your Documents, Digitally Secured</h1>
        <p>Store and manage your mark sheets, PAN cards, passports, and more in a secure digital format.
          Link your documents to your unique Aadhaar number for easy access and sharing. Say goodbye to
          physical copies and embrace a hassle-free future across education, healthcare, railways, and more.</p>
      </div>
      <div><img src="/hero.png" width="600" alt=""></div>
    </div>

    <div id="about">
      <h2>About Us</h2>
      <p>Learn more about our mission and how we aim to revolutionize document management.</p>
      <!-- Add more content here as needed -->
    </div>
    <div id="faq">
      <h2>Frequently Asked Questions</h2>
      <p>Find answers to common questions about our services and digital document management.</p>

      <div id="questions">
        <details>
          <summary>1. What types of documents can I store digitally?</summary>
          <p>You can store various documents such as mark sheets, PAN cards, passports, and other important
            identification
            documents in a secure digital format.</p>
        </details>

        <details>
          <summary>2. How do I link my documents to my Aadhaar number?</summary>
          <p>During the document upload process, you will be prompted to enter your Aadhaar number. This will securely
            link your documents for easy access and sharing.</p>
        </details>

        <details>
          <summary>3. Is my data secure?</summary>
          <p>Yes, we prioritize your privacy and security. All documents are encrypted and stored securely, ensuring
            that
            only you have access to them.</p>
        </details>

        <details>
          <summary>4. Can I access my documents from anywhere?</summary>
          <p>Absolutely! As long as you have internet access, you can access your documents from any device, anywhere in
            the world.</p>
        </details>

        <details>
          <summary>5. What happens if I lose my internet connection?</summary>
          <p>Your documents remain safe and secure in our system. Once your internet connection is restored, you can
            access your documents again without any issues.</p>
        </details>

        <details>
          <summary>6. How do I share my documents with others?</summary>
          <p>You can easily share your documents by generating a secure link or by directly sharing them through our
            platform, ensuring that only authorized individuals can access them.</p>
        </details>
      </div>
    </div>
  </main>
  <Footer />
</template>

<style scoped>

/* main>* {
  outline: 4px solid rgba(0, 0, 255, 0.502);
} */

main #hero {
  display: flex;
}

main #hero div {
  width: 50%;
  height: calc(100vh - 6rem);
}

/* main #hero div:first-child {
    padding: 2rem;
} */

main #hero h1 {
  margin: 2rem;
  margin-top: 4rem;
}

main #hero p {
  margin: 2rem;
  margin-top: 0;
}

main #hero img {
  position: absolute;
  right: 0;
}

main #about {
  display: grid;
  place-items: center;
  padding-top: 10vh;
  padding-bottom: 80vh;
}

main #faq {
  display: grid;
  place-items: center;
  margin-bottom: 2rem;
}

main #faq #questions {
  width: 50vw;
}

main #faq #questions details {
  margin: 1.5rem 0;
}
</style>
