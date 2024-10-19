// Imports the Remarkable markdown parser and highlight.js for code syntax highlighting.
import { Remarkable } from 'remarkable';
import hljs from "highlight.js";
import 'highlight.js/styles/github.css';

// Function to convert markdown text to HTML.
export default function markdownToHtml(markdown) {
  // Creates a new Remarkable instance with various options enabled for HTML output, line breaks, and typographic features.
  const md = new Remarkable({
    html: true, // Enable HTML tags in the output.
    xhtmlOut: true, // Use XHTML-style closing tags.
    breaks: true, // Convert line breaks to <br> tags.
    typographer: true, // Enable typographic replacements (e.g., smart quotes).
    // Custom highlight function for code syntax highlighting using highlight.js.
    highlight: function(str, lang) {
      // If a language is specified and highlight.js supports it.
      if (lang && hljs.getLanguage(lang)) {
        try {
          // Highlight the code using the specified language.
          return hljs.highlight(str, { language: lang }).value;
        } catch (e) {
          console.log(e); // Log any errors that occur during highlighting.
        }
      }
      try {
        // If no language is specified or the language is not supported, use auto-detection.
        return hljs.highlightAuto(str).value;
      } catch (e) {
        console.log(e); // Log any errors that occur during auto-detection.
      }
      return ''; // Return an empty string if highlighting fails.
    }
  });
  // Renders the markdown text to HTML using the Remarkable instance.
  return md.render(markdown);
}