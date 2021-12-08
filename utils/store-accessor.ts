import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Articles from '~/store/articles'

// eslint-disable-next-line import/no-mutable-exports
let articlesStore: Articles

/**
 * ストアを初期化する（型推論できるモジュールとして取得する）
 * @param store Vuex.Store
 */
function initialiseStores(store: Store<any>): void {
  // Todos を型推論できるストアモジュール化  
  articlesStore = getModule(Articles, store)
}

export { initialiseStores, articlesStore }