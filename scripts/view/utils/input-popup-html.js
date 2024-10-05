export default `<div class="input-popup">
    <div class="body">
      <nav class="nav">
        <p id="text" class="">
          Text
        </p>
        <p id="image" class="active-btn">
          Image
        </p>
        <p id="document" class="">
          Document
        </p>
      </nav>
      <main class="main">
        <textarea type="text" placeholder="Paste in anything" id="text-input"></textarea>
      </main>
      <footer class="footer">
        <select name="length" id="length">
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="long">Long</option>
        </select>
        <button>Send</button>
      </footer>
    </div>
  </div>`;

export const textInputHtml = `<textarea type="text" placeholder="Paste in anything" id="text-input"></textarea>`;

export const imageInputHtml = (img) => `<label for="image-input">
          <img src="${img}" alt="" />
          <span>
            Add Image
          </span>
          <input type="file" name="image" id="image-input" accept=".jpeg, .jpg, .png" hidden style="display: none;"/>
        </label>`;

export const fileInputHtml = (file, type) => `<label for="file-input">
          <object data="${file}" type="${type}"></object>
          <span>
            Add File
          </span>
          <input type="file" name="file" id="file-input" accept=".jpeg, .jpg, .png" hidden style="display: none;" />
        </label>`;
export const fileInputHtml = (type, ext) => `<label for="file-input">
          <span>
            Add ${type}
          </span>
          <input type="file" name="file" id="file-input" accept="${ext}" hidden style="display: none;" />
        </label>`