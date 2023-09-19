<script lang="ts">
  import Answer from './Answer.svelte';
  import ChatInput from './ChatInput.svelte';
  import { onMount } from 'svelte';
  import { delay, distinctUntilChanged, filter } from 'rxjs';
  import { chat, question } from '../core/data';
  import Icon from '../common/icons/Icon.svelte';

  export let fullscreen = true;
  export let show = !fullscreen;

  let entriesContainerElement: HTMLDivElement;

  let isScrolling = false;
  let entries: { question: string; answer: string[] }[] = [];

  onMount(() => {
    const subs = [
      chat
        .pipe(
          delay(200),
          distinctUntilChanged(),
          filter(() => show),
        )
        .subscribe(() => {
          entriesContainerElement.scrollBy({ top: 500, behavior: 'smooth' });
        }),
      chat.subscribe((entry) => {
        entries = [...entries, entry];
      }),
    ];
    return () => subs.forEach((sub) => sub.unsubscribe());
  });
</script>

{#if show}
  <div
    class="sw-chat"
    class:fullscreen
  >
    <div
      class="chat-container"
      class:fullscreen
    >
      <div
        class="entries-container"
        bind:this={entriesContainerElement}
      >
        {#each entries as entry, i}
          <div class="chat-entry">
            <div class="question">
              <div class="chat-icon">
                <Icon />
              </div>
              <div class="title-m">{entry.question}</div>
            </div>
            <div class="answer">
              {#if entry.answer}
                <Answer text={entry.answer} />
              {:else}
                …
              {/if}
            </div>
          </div>
        {/each}
      </div>
      <div
        class="input-container"
        class:scrolling-behind={isScrolling}
      >
        <ChatInput
          placeholder="Ask me anything"
          question={$question}
          {fullscreen}
        />
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  .sw-chat {
    --main-padding-side: 0;
    --main-padding-top: 0;

    &.fullscreen {
      --main-padding-side: var(--rhythm-2);
      --main-padding-top: var(--rhythm-7);

      background: var(--modal-background-color);
      bottom: 0;
      display: flex;
      left: 0;
      justify-content: center;
      padding: var(--main-padding-top) var(--main-padding-side) 0;
      position: fixed;
      right: 0;
      top: 0;
      z-index: var(--z-index-modal);

      header {
        position: absolute;
        right: var(--rhythm-1);
        top: var(--rhythm-1);
      }
    }

    .chat-container {
      --chat-padding: var(--rhythm-1_5);
      --height-container: var(--custom-height-container, var(--rhythm-56));
      --height-input: calc(
        var(--rhythm-6) + var(--padding-top-input-container) + var(--padding-bottom-input-container)
      );
      --max-width-container: 100%;
      --max-height-entries: calc(var(--height-container) - var(--height-input));
      --padding-top-input-container: var(--chat-padding);
      --padding-bottom-input-container: var(--chat-padding);
      --padding-side-input-container: var(--chat-padding);

      &.fullscreen {
        --height-container: calc(100vh - var(--main-padding-top));
        --max-width-container: calc(100vw - var(--main-padding-side) * 2);
        --padding-top-input-container: 0;
        --padding-bottom-input-container: 0;
        --padding-side-input-container: 0;
      }

      background: var(--container-background-color);
      display: flex;
      flex: 1 0 auto;
      flex-direction: column;
      height: var(--height-container);
      max-width: var(--max-width-container);

      .entries-container {
        max-height: var(--max-height-entries);
        padding-bottom: 50px;
        overflow: auto;
        flex: 1 0 0;

        .chat-entry {
          padding: var(--chat-padding);

          .error {
            color: var(--color-neutral-light);
          }

          &:not(:last-of-type) {
            border-bottom: 1px solid var(--color-neutral-lighter);
          }

          .chat-icon {
            padding-top: var(--rhythm-0_5);
          }
          .question {
            display: flex;
            gap: var(--rhythm-2);
          }
          .answer {
            max-width: calc(var(--max-width-container) - var(--chat-padding) * 2);
          }
        }
      }

      .input-container {
        flex: 0 0 auto;
        padding: var(--padding-top-input-container) var(--padding-side-input-container)
          var(--padding-bottom-input-container);
      }
    }
  }

  @media (min-width: 599px) {
    .sw-chat {
      &.fullscreen {
        --main-padding-side: var(--rhythm-3);
      }

      .chat-container {
        &.fullscreen {
          --padding-top-input-container: var(--rhythm-2);
          --padding-bottom-input-container: var(--rhythm-4);
          --padding-side-input-container: var(--rhythm-4);
        }
        .input-container.scrolling-behind {
          border-top: 1px solid var(--color-neutral-lighter);
        }
      }
    }
  }

  @media (min-width: 1023px) {
    .sw-chat {
      &.fullscreen {
        --main-padding-side: var(--rhythm-12);
        --main-padding-top: 0;
      }

      .chat-container {
        &.fullscreen {
          --max-width-container: calc(var(--rhythm-64) * 2);
          --padding-bottom-input-container: var(--rhythm-9);
          --padding-side-input-container: var(--rhythm-10);
        }

        .entries-container {
          .title-m {
            max-width: calc(var(--max-width-container) - var(--rhythm-12) * 2);
          }
        }
      }
    }
  }
</style>
