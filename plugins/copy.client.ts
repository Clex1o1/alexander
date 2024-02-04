export default defineNuxtPlugin({
  async setup(nuxtApp) {},
  hooks: {
    "page:finish"() {
      const codeElements = document.querySelectorAll("pre code");
      codeElements.forEach((codeElement) => {
        const text = codeElement.textContent;
        const button = document.createElement("button");
        button.classList.add("button-secondary");
        button.textContent = "Copy";
        button.addEventListener("click", () => {
          if (!text) return;
          window.navigator.clipboard.writeText(text);
          button.textContent = "Copied!";
          setTimeout(() => {
            button.textContent = "Copy";
          }, 1000);
        });
        codeElement.parentElement?.appendChild(button);
      });
    },
  },
});
