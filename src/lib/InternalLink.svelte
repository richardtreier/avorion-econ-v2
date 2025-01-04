<script lang="ts">
  import { base } from '$app/paths';
  import { page } from '$app/stores';
  export let href = 'javascript:void(0)';
  export let cls = '';
  export let clsActive = '';

  $: path = $page.url.pathname.substring(base.length);
</script>

<a href="{base}{href}" class="{cls} {path === href ? clsActive : ''}"><slot /></a>
