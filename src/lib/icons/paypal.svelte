<script lang="ts">
  import { Icon, type IconProps } from "lucide-svelte";

  const props: IconProps = $props();
</script>

<Icon viewBox="0 0 20 20" strokeWidth="0" {...props}>
  <path
    fill="currentColor"
    d="M7.914 10.677h1.659c3.604 0 5.649-1.623 6.3-4.96q.032-.164.056-.322c.036-.226.054-.429.062-.624c.006-.134.01-.213.009-.287a2.6 2.6 0 0 0-.216-1.039c-.129-.296-.324-.587-.613-.918C14.318 1.557 12.832 1 11.057 1H5.404a.81.81 0 0 0-.799.683l-1.02 6.571l-1.269 8.185a.486.486 0 0 0 .48.561h2.772l.849-5.043a1.51 1.51 0 0 1 1.497-1.28m9.103-4.587c-.792 3.771-3.357 5.772-7.445 5.772H7.914a.33.33 0 0 0-.328.282L6.481 19h2.907a.71.71 0 0 0 .699-.597l.029-.15l.555-3.514l.036-.194a.71.71 0 0 1 .699-.597h.44c2.85 0 5.081-1.158 5.733-4.506c.268-1.38.132-2.534-.562-3.352"
  />
</Icon>
