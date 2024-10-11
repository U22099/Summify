const historyHtml = (action, title, id) => {
  return `
      <button class="card history-btn">
        <input value="${id}" hidden styles="display: none;"/>
        <span>${action}</span>
      ${title}
      </button>
  `
}

export default {historyHtml}