import _Vue, { PluginObject } from 'vue'
import VigilanceSelectComponent from '@/components/vigilance-select.component.vue'

class VigilanceSelect implements PluginObject<object> {
  public install(Vue: typeof _Vue): void {
    Vue.component('vigilance-select', VigilanceSelectComponent)
  }
}

export const VigilanceSelectPlugin = new VigilanceSelect()
