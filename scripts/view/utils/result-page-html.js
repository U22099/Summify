const resultPageHtml = ({icon, inputTitle, action}) => `<div class="result-page-container">
    <button class="card">
      <i class="fa-regular fa-${icon}"></i>
      ${inputTitle}
    </button>
    <nav>
      <button class="card active-btn" id=${action.toLowerCase()}>
        ${action}
      </button>
      <button class="card" id="flash-card">
        FlashCards </button>
      <button class="card" id="chat">
        ${action} Chat </button>
    </nav>
    <main id="result-main-container">
      <section>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 4C0 1.79086 1.79086 0 4 0H12C14.2091 0 16 1.79086 16 4V11.8553C16.0002 11.9034 16.0003 11.9516 16.0003 12C16.0003 14.206 17.786 15.9949 19.9907 16C19.9938 16 19.9969 16 20 16H28C30.2091 16 32 17.7909 32 20V28C32 30.2091 30.2091 32 28 32H20C17.7909 32 16 30.2091 16 28V20C16 19.9889 16 19.9778 16.0001 19.9667C15.9823 17.7729 14.1983 16 12.0003 16C11.9899 16 11.9796 16 11.9693 16H4C1.79086 16 0 14.2091 0 12V4Z" fill="#0C111D" />
        </svg>
      </section>
      <section>
        <p id="result-output">
        </p>
      </section>
    </main>
    <footer>
    </footer>
  </div>`;
  
export default { resultPageHtml }