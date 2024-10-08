const PopupHtml = `<div class="input-popup">
    <div class="body">
      <nav class="nav">
        <p id="input-popup-text" class="active-btn">
          Text
        </p>
        <p id="input-popup-image">
          Image
        </p>
        <p id="input-popup-document">
          Document
        </p>
      </nav>
      <main class="main" id="input-popup-main">
        <textarea type="text" placeholder="Paste in anything" id="input-popup-text-input"></textarea>
      </main>
      <footer class="footer">
        <select name="length" id="input-popup-length">
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="long">Long</option>
        </select>
        <button id="input-popup-btn">Send</button>
      </footer>
    </div>
  </div>`;

const TextInputHtml = `<textarea type="text" placeholder="Paste in anything" id="input-popup-text-input"></textarea>`;

const ImageInputHtml = (img, display) => `<label for="input-popup-image-input">
          <img src="${img}" alt="" style="display: ${display};"/>
          <span>
            <i class="fa-regular fa-image"></i>
            Add Image
          </span>
          <input type="file" name="image" id="input-popup-image-input" accept=".jpeg, .jpg, .png" hidden style="display: none;"/>
        </label>`;

const FileInputHtml = (file, display) => `<label for="input-popup-file-input">
          <object data="${file}" type="application/pdf" style="display: ${display};"></object>
          <span>
            <i class="fa-regular fa-file"></i>
            Add File
          </span>
          <input type="file" name="file" id="input-popup-file-input" accept=".pdf" hidden style="display: none;" />
        </label>`;
        
  export default {PopupHtml, TextInputHtml, ImageInputHtml, FileInputHtml}