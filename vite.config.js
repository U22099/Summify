import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('pdfmake')) {
            return 'pdfmake'; 
          }
        },
      },
    },
  },
  base: '/Summify/',
  plugins: [VitePWA({
  	  workbox: {
        maximumFileSizeToCacheInBytes: 10485760
      },
      registerType: 'autoUpdate',
      manifest: {
        name: 'Summify AI Content Summariser',
        short_name: 'Summify',
        description: 'Summify is an AI-powered content summarizer that uses the Gemini API to quickly and easily create summaries of text, PDFs, and images. Generate flash cards, chat with the AI about your content, and save your summaries for later.',
        background_color: 'black', 
        display: 'standalone', 
        start_url: '/Summify',
        scope: '/',
        orientation: 'portrait',
        theme_color: 'black',
        icons: [
		{
			src: "pwa-64x64.png",
			sizes: "64x64",
			type: "image/png"
		},
		{
			src: "pwa-192x192.png",
			sizes: "192x192",
			type: "image/png"
		},
  		{
    			src: "pwa-512x512.png",
    			sizes: "512x512",
    			type: "image/png"
  		},
  		{
    			src: "maskable-icon-512x512.png",
    			sizes: "512x512",
    			type: "image/png",
    			purpose: "maskable"
  		}
	]
      }
  })
  ],
});