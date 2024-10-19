const sampleDocument = `Elon Musk: A History of Innovation and Ambition
Elon Musk, a South African-born American entrepreneur and investor, has become one of the most influential figures in technology and business. His visionary leadership and entrepreneurial spirit have led to the creation of groundbreaking companies like SpaceX, Tesla, and Neuralink.
Early Life and Education
 * Childhood in South Africa: Born in Pretoria, South Africa, in 1971, Musk grew up surrounded by technology and science. His father, Errol Musk, was an engineer, and his mother, Maye Musk, was a model.
 * Education: Musk attended Pretoria Boys High School and later studied physics and economics at the University of Pennsylvania. He briefly attended Stanford University but dropped out after just two days to pursue his entrepreneurial ambitions.
Entrepreneurial Ventures
 * Zip2: In 1995, Musk and his brother, Kimbal, co-founded Zip2, an online city guide software company. They sold Zip2 to Compaq for $307 million in 1999.
 * X.com: Using the proceeds from the sale of Zip2, Musk founded X.com, an online financial services company. X.com merged with Confinity, a company that owned PayPal, and Musk became the CEO of the combined company. eBay acquired PayPal in 2002 for $1.5 billion.
 * SpaceX: In 2002, Musk founded SpaceX, a space transportation company with the goal of reducing space transportation costs and enabling the colonization of Mars. SpaceX has achieved significant milestones, including launching the first privately-funded spacecraft into orbit and successfully landing a rocket booster on Earth.
 * Tesla: Musk was one of the early investors in Tesla, an electric vehicle manufacturer. He became the company's CEO in 2008 and has led Tesla to become a global leader in the electric vehicle market.
 * Neuralink: In 2016, Musk co-founded Neuralink, a neurotechnology company focused on developing brain-machine interfaces. The company aims to treat neurological diseases and enhance human cognition.
Other Ventures
Musk has also been involved in other ventures, including The Boring Company, a tunnel construction company, and OpenAI, an artificial intelligence research laboratory.
Legacy
Elon Musk's legacy is one of innovation, ambition, and a relentless pursuit of his goals. His companies have pushed the boundaries of technology and have the potential to shape the future of humanity. Musk's visionary leadership and entrepreneurial spirit have inspired millions around the world.
 * https://niitbirgunj.edu.np/elon-musk/
 * https://github.com/Code-Institute-Submissions/web-CV
`

const PopupHtml = `<div class="input-popup" id="input-popup">
    <div class="input-popup-body">
      <nav class="input-popup-nav">
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
      <main class="input-popup-main" id="input-popup-main">
        <textarea type="text" placeholder="Paste in anything" id="input-popup-text-input">
        ${sampleDocument}
        </textarea> 
        <i class="fa-regular fa-microphone card" id="mic"></i>
      </main>
      <footer class="input-popup-footer">
        <select name="input-popup-length" id="input-popup-length">
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="long">Long</option>
        </select>
        <button id="input-popup-btn">Send</button>
      </footer>
    </div>
  </div>`;

const TextInputHtml = `<textarea type="text" placeholder="Paste in anything" id="input-popup-text-input">
          ${sampleDocument}
        </textarea> 
        <i class="fa-regular fa-microphone card" id="mic"></i>`;

const ImageInputHtml = (img, display) => `<label for="input-popup-image-input">
          <img src="${img}" alt="" style="display: ${display};"/>
          <span>
            <i class="fa-regular fa-image"></i>
            <span>Add Image</span>
          </span>
          <input type="file" name="image" id="input-popup-image-input" accept=".jpeg, .jpg, .png" hidden style="display: none;"/>
        </label>`;

const FileInputHtml = (file, display) => `<label for="input-popup-file-input">
          <object data="${file}" type="application/pdf" style="display: ${display};"></object>
          <span>
            <i class="fa-regular fa-file"></i>
            <span>Add File</span>
          </span>
          <input type="file" name="file" id="input-popup-file-input" accept=".pdf" hidden style="display: none;" />
        </label>`;
        
  export default {PopupHtml, TextInputHtml, ImageInputHtml, FileInputHtml}