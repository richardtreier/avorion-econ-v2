<script lang="ts">
  import { APPLICATION_NAME } from '$lib/application-name';
  import ExternalLink from '$lib/ExternalLink.svelte';
  import FactoryAndGoodList from '$lib/FactoryAndGoodList.svelte';
  import FactoryPlanner from '$lib/FactoryPlanner.svelte';
  import '../app.css';
</script>

<div class="flex h-screen max-h-screen flex-col divide-y overflow-hidden">
  <nav class="flex items-center justify-between p-3">
    <div class="flex items-center gap-3">
      <div class="text-2xl">
        {APPLICATION_NAME}
      </div>
      <div>Avorion 1.3.8</div>
    </div>
    <div>
      Source Code available on
      <ExternalLink text="GitHub" href="https://github.com/richardtreier/avorion-econ-v2"
      ></ExternalLink>
    </div>
  </nav>

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
</div>
