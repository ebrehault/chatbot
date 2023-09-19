<script lang="ts">
  import Icon from '../common/icons/Icon.svelte';

  export let placeholder = '';
  export let fullscreen = true;

  let inputElement: HTMLInputElement;
  export let question = '';
  let isListening = false;
</script>

<div
  class="sw-chat-input"
  class:fullscreen
  class:highlight={isListening}
>
  <div class="icon">
    <Icon />
  </div>
  <input
    name="nuclia-chat-field"
    bind:this={inputElement}
    {placeholder}
    tabindex="0"
    autocomplete="off"
    autocapitalize="off"
    spellcheck="false"
    bind:value={question}
  />
</div>

<style lang="scss">
  .sw-chat-input {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    flex: 1 0 auto;
    position: relative;
    border: 1px solid var(--border-color);
    height: var(--rhythm-6);

    &.highlight {
      background-color: var(--color-tertiary-lighter);
    }

    .icon {
      display: flex;
      margin: 0 var(--rhythm-2);
    }
    .microphone {
      display: flex;
      margin: 0 var(--rhythm-1);
    }

    input {
      background-color: inherit;
      border: 0;
      box-sizing: border-box;
      color: inherit;
      font-family: inherit;
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-body);
      line-height: calc(var(--line-height-body) * 1.5);
      outline: none;
      text-overflow: ellipsis;
      width: calc(100% - var(--rhythm-0_25));

      -webkit-appearance: none;
    }

    input::placeholder {
      color: var(--color-neutral-regular);
      transition: all 0s ease;
    }
  }
  @media (max-width: 598px) {
    .sw-chat-input.fullscreen {
      border-width: 1px 0 0 0;
    }
  }
</style>
