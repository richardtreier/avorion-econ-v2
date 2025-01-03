import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: {
        plugins: [tailwindcss, autoprefixer]
      }
    })
  ],

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    adapter: adapter({ fallback: 'index.html' })
  }
};

export default config;
