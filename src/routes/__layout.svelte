<script lang="ts">
  import { APPLICATION_NAME } from '$lib/application-name';
  import ExternalLink from '$lib/ExternalLink.svelte';
  import FactoryAndGoodList from '$lib/FactoryAndGoodList.svelte';
  import FactoryPlanner from '$lib/FactoryPlanner.svelte';
</script>

<div class="h-screen max-h-screen overflow-hidden flex flex-col divide-y">
  <nav class="text-2xl p-3">{APPLICATION_NAME}</nav>

  <main class="flex-grow flex flex-row justify-stretch divide-x overflow-hidden">
    <div class="flex justify-stretch p-3 w-96">
      <FactoryAndGoodList />
    </div>
    <div class="flex-grow flex items-stretch overflow-auto">
      <slot />
    </div>
    <div class="flex-grow flex items-stretch overflow-auto">
      <div class="flex-grow flex flex-col p-3 gap-3">
        <FactoryPlanner />
      </div>
    </div>
  </main>

  <footer class="p-3">
    <ExternalLink text="GitHub" href="https://github.com/richardtreier/avorion-econ-v2"></ExternalLink>
    ·
    Based on <ExternalLink
      href="https://omnicrola.github.io/avorion-econ/"
      text="Avorion Econ v1"
    />.
  </footer>
</div>

<style global lang="postcss">
  @import '../app.css';
</style>
