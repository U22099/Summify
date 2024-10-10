const historyHtml = (action, title) => {
  return `
      <button class="card">
        <span>${action}</span>
      ${title}
      </button>
  `
}

export default {historyHtml}