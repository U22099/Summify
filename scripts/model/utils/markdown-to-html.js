import { Remarkable } from 'remarkable';
import hljs from "highlight.js";
import 'highlight.js/styles/github.css';

export default function markdownToHtml(markdown) {
  const md = new Remarkable({
    html: true,
    xhtmlOut: true,
    breaks: true,
    typographer: true,
    highlight: function(str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (e) { console.log(e) }
      }
      try {
        return hljs.highlightAuto(str).value;
      } catch (e) { console.log(e) }
      return '';
    }
  });
  return md.render(markdown);
}