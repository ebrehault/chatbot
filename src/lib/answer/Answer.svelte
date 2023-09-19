<script lang="ts">
  import { concatMap, delay, from, of, startWith } from 'rxjs';
  import { onMount } from 'svelte';

  export let text: string[];
  let innerWidth = window.innerWidth;

  let message = '';

  onMount(() => {
    const sub = from(text.slice(1))
      .pipe(
        concatMap((values) => of(values).pipe(delay(1000))),
        startWith(text[0]),
      )
      .subscribe((chunk) => (message += chunk));

    return () => sub.unsubscribe();
  });
</script>

<svelte:window bind:innerWidth />
<div class="sw-answer">
  <div class="answer-container">
    <div class="text">{@html message}</div>
  </div>
</div>

<style lang="scss">
  .sw-answer {
    .answer-container {
      align-items: center;
      display: flex;
      gap: var(--rhythm-1);
      margin-top: var(--rhythm-1);

      .text {
        flex: 1 1 auto;
      }
    }
  }
</style>
