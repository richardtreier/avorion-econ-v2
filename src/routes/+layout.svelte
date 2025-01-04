<script lang="ts">
  import { APPLICATION_NAME } from '$lib/application-name';
  import ExternalLink from '$lib/ExternalLink.svelte';
  import FactoryAndGoodList from '$lib/FactoryAndGoodList.svelte';
  import FactoryPlanner from '$lib/FactoryPlanner.svelte';
  import '../app.css';
</script>

<div class="flex h-screen max-h-screen flex-col divide-y overflow-hidden">
  <nav class="p-3 text-2xl">{APPLICATION_NAME}</nav>

  <main class="flex grow flex-row justify-stretch divide-x overflow-hidden">
    <div class="flex w-96 justify-stretch p-3">
      <FactoryAndGoodList />
    </div>
    <div class="flex grow items-stretch overflow-auto">
      <slot />
    </div>
    <div class="flex grow items-stretch overflow-auto">
      <div class="flex grow flex-col gap-3 p-3">
        <FactoryPlanner />
      </div>
    </div>
  </main>

  <footer class="p-3">
    Avorion 1.3.8 · View on <ExternalLink
      text="GitHub"
      href="https://github.com/richardtreier/avorion-econ-v2"
    ></ExternalLink>
    · Based on <ExternalLink
      href="https://omnicrola.github.io/avorion-econ/"
      text="Avorion Econ v1"
    />.
  </footer>
</div>
