<script module lang="ts">
  export { headTitle, headDescription };
</script>

{#snippet headTitle(title: string)}
  <title>{title}</title>
  <meta property="og:title" content={title} />
  <meta name="twitter:title" content={title} />
{/snippet}

{#snippet headDescription(description: string)}
  <meta name="description" content={description} />
  <meta property="og:description" content={description} />
  <meta name="twitter:description" content={description} />
{/snippet}
