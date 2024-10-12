const toastHtml = (type, message) => `
<div id="toast" class="toast">
    <h1>${type}</h1>
    <p>${message}</p>
  </div>
`;

export default { toastHtml }