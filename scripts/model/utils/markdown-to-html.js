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
  console.log(md.render(` ## Summify: AI-Powered Content Summarizer Documentation

**Project Overview**

Summify is an AI-powered content summarizer that leverages the capabilities of the Gemini API to provide users with concise and informative summaries of various input formats. It offers a user-friendly interface for summarizing text, PDFs, and even image prompts. 

**Features**

* **Text Summarization/Explanation:**  Users can paste or type in text content to generate a summary.
* **PDF Summarization/Explanation:**  Users can upload PDF documents for summarization.
* **Image Summarization/Explanation:** Users can upload images for summarization, leveraging the Gemini API's image understanding capabilities.
* **Flash Cards:**  Based on the input document, the application generates flash cards with key points, promoting learning and knowledge retention.`))
  return md.render(markdown);
}