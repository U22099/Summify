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
        <textarea type="text" placeholder="Paste in anything"></textarea>
        <!--<label for="image-input">
          <span>
            Add Image
          </span>
          <input type="file" name="image" id="image-input" accept=".jpeg, .jpg, .png" hidden style="display: none;"/>
        </label>-->
        <!--<label for="file-input">
          <span>
            Add File
          </span>
          <input type="file" name="file" id="file-input" accept=".jpeg, .jpg, .png" hidden style="display: none;" />
        </label>-->
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