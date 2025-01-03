import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

const basePath = process.argv.includes('dev') ? undefined : process.env.BASE_PATH || undefined;
if (basePath) {
  console.log(`Using Base Path: ${basePath}`);
} else {
  console.log(`Base path was unset.`);
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess({}),

  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter({
      fallback: '404.html'
    }),
    paths: {
      base: basePath
    }
  }
};

export default config;
