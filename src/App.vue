<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-3"></div>
        <div class="col-6">
          <vigilance-select
            @search="search"
            :search-results="options"
            :is-loading="isLoading"
            :no-result="noResult"
          >
            <template slot="result-item" slot-scope="option">
              <div class="d-center">
                <img :src="option.owner.avatar_url" />
                {{ option.full_name }}
              </div>
            </template>
          </vigilance-select>
        </div>
        <div class="col-3"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Debounce } from 'lodash-decorators'

@Component
export default class App extends Vue {
  public options: string[] = []

  public isLoading: boolean = false
  public noResult: boolean = false

  public search(search: string): void {
    this.isLoading = true
    this.noResult = false
    this.doSearch(search)
  }

  @Debounce(300)
  public doSearch(search: string): void {
    fetch(
      `https://api.github.com/search/repositories?q=${escape(search)}`
    ).then(res => {
      res.json().then(json => {
        this.isLoading = false

        if (json.items && json.items.length === 0) {
          this.noResult = true
          this.options = []
          return
        }

        this.options = json.items
      })
    })
  }
}
</script>

<style lang="less">
@import '~bootstrap/dist/css/bootstrap.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

img {
  height: auto;
  max-width: 2.5rem;
  margin-right: 1rem;
}

.d-center {
  display: flex;
  align-items: center;
}
</style>
