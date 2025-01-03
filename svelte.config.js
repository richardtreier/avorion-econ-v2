import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';


const basePath = process.argv.includes('dev') ? undefined : (process.env.BASE_PATH || undefined);
if (basePath) {
  console.log(`Using Base Path: ${basePath}`)
} else {
  console.log(`Base path was unset.`)
}


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
    adapter: adapter({
      fallback: '404.html'
    }),
    paths: {
      base: basePath,
    }
  }
};

export default config;
