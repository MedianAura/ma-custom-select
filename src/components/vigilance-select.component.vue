<template>
  <div class="vigilance-select-component">
    <div class="vs__toggle-frame">
      <div class="vs__search-section">
        <input type="text" class="form-control" v-model="searchInput" />
      </div>

      <div class="vs__actions-section">
        <div class="vs__spinner">Loading...</div>
      </div>
    </div>

    <div v-show="hasResult || hasError">
      <ul class="list-group" v-show="hasResult">
        <li
          v-for="(result, ndx) in searchResults"
          :key="ndx"
          class="list-group-item"
        >
          <slot name="result-item" v-bind="result">
            {{ result }}
          </slot>
        </li>
      </ul>

      <ul class="list-group" v-if="hasError">
        <li class="list-group-item">
          <slot name="result-error">
            Aucun résultat trouver
          </slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class VigilanceSelectComponent extends Vue {
  @Prop({ default: [] })
  public searchResults!: any[]

  @Prop({ default: false })
  public hasError!: boolean

  public searchInput: string = ''

  @Watch('searchInput')
  @Emit('search')
  public searchUpdated(): string {
    return this.searchInput
  }

  public get hasResult(): boolean {
    return this.searchResults.length > 0
  }
}
</script>

<style scoped lang="less">
/* KeyFrames */
@-webkit-keyframes vSelectSpinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes vSelectSpinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.vigilance-select-component {
  .vs__toggle-frame {
    display: flex;
    appearance: none;
    padding: 0 0 4px;
    background: none;
    border: 1px solid rgba(60, 60, 60, 0.26);
    border-radius: 4px;
    white-space: normal;
    cursor: text;

    .vs__search-section {
      display: flex;
      flex-basis: 100%;
      flex-grow: 1;
      flex-wrap: wrap;
      padding: 0 2px;
      position: relative;

      input {
        appearance: none;
        line-height: 1.4;
        font-size: 1em;
        border: 1px solid transparent;
        border-left: none;
        outline: none;
        margin: 4px 0 0;
        padding: 0 7px;
        background: none;
        box-shadow: none;
        width: 0;
        max-width: 100%;
        flex-grow: 1;
      }
    }

    .vs__actions-section {
      display: flex;
      align-items: center;
      padding: 4px 6px 0 3px;
    }
  }

  /* Loading Spinner */
  .vs__spinner {
    align-self: center;
    opacity: 1;
    font-size: 5px;
    text-indent: -9999em;
    overflow: hidden;
    border-top: 0.9em solid rgba(100, 100, 100, 0.1);
    border-right: 0.9em solid rgba(100, 100, 100, 0.1);
    border-bottom: 0.9em solid rgba(100, 100, 100, 0.1);
    border-left: 0.9em solid rgba(60, 60, 60, 0.45);
    transform: translateZ(0);
    animation: vSelectSpinner 1.1s infinite linear;
    transition: opacity 0.1s;
  }
  .vs__spinner,
  .vs__spinner:after {
    border-radius: 50%;
    width: 5em;
    height: 5em;
  }

  /* Loading Spinner States */
  .vs--loading .vs__spinner {
    opacity: 1;
  }
}
</style>
