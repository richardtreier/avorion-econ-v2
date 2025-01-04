<script lang="ts">
  export let href = 'javascript:void(0)';
  export let text = href;
</script>

<a {href} class="hover:underline" rel="norefferer" target="_blank"
  ><svg
    xmlns="http://www.w3.org/2000/svg"
    class="inline-block w-5 pr-0.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    /></svg
  >{text}</a
>
