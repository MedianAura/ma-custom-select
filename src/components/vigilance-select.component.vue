<template>
  <div class="vigilance-select-component" :class="setStateClass()">
    <div class="vs__toggle-frame">
      <div class="vs__selected-section">
        <span class="vs__selected" v-if="selectedValue">
          <slot name="selected-option">
            {{ selectedValue }}
          </slot>
        </span>

        <input
          type="text"
          class="form-control vs__search"
          v-model="searchInput"
        />
      </div>

      <div class="vs__actions-section">
        <button
          type="button"
          class="vs__clear"
          title="Clear selection"
          v-if="selectedValue"
        >
          X
        </button>

        <slot name="loading">
          <div class="vs__spinner" v-if="isLoading">Loading...</div>
        </slot>
      </div>
    </div>

    <transition>
      <div v-show="hasResult || noResult">
        <ul class="list-group vs__select-section" v-show="hasResult">
          <li
            v-for="(result, ndx) in searchResults"
            :key="ndx"
            class="list-group-item vs__select-item"
          >
            <slot name="result-item" v-bind="result">
              {{ result }}
            </slot>
          </li>
        </ul>

        <ul class="list-group" v-if="noResult">
          <li class="list-group-item">
            <slot name="result-error">
              Aucun résultat trouver
            </slot>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class VigilanceSelectComponent extends Vue {
  @Prop({ default: [], required: true })
  public searchResults!: any[]

  @Prop()
  public selectedValue!: any

  @Prop({ default: false })
  public noResult!: boolean

  @Prop({ default: false })
  public isLoading!: any

  public searchInput: string = ''

  @Watch('searchInput')
  @Emit('search')
  public searchUpdated(): string {
    return this.searchInput
  }

  public setStateClass(): object {
    return {
      'vs--open': false,
      'vs--single': true,
      'vs--searching': false,
      'vs--searchable': false,
      'vs--unsearchable': false,
      'vs--loading': this.isLoading,
      'vs--disabled': false
    }
  }

  public get hasResult(): boolean {
    return this.searchResults.length > 0
  }
}
</script>

<style scoped lang="less">
@import '../media/less/ma-custom-select';
</style>
