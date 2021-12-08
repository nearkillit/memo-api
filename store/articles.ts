import { Module, Action, VuexModule, Mutation } from 'vuex-module-decorators'
import { Article } from '~/models/Article'
import { $axios } from '~/utils/api'

const ArticleAPI = "http://127.0.0.1:8001/"

interface addArtcles {
    title: string,
    body: string
}

// stateFactory: true → Vuex をモジュールモードで扱うために指定
@Module({ stateFactory: true, namespaced: true, name: 'articles' })
export default class Articles extends VuexModule {  
  articles: Article[] = []

  /**
   * article を追加する
   * @param text article テキスト
   */

  // titleとbodyの追加！！！！！ 
  @Mutation
  add(getArtcles: addArtcles) {
    const articles: Article[] = this.articles
    // article を作成
    const article: Article = {
      // リストがない場合、id = 0
      // リストがある場合、id = リストの最終要素の id + 1
      id: articles.length === 0 ? 0 : articles[articles.length - 1].id + 1,
      title: getArtcles.title,
      body: getArtcles.body,      
    }
    // リストに article を追加
    this.articles.push(article)
  }

  /**
   * article を削除する
   * @param article 削除する article インスタンス
   */
  @Mutation
  remove(article: Article) {
    this.articles.splice(this.articles.indexOf(article), 1)
  }

  @Mutation
  fetch(articles: Article[]){
    this.articles = articles.concat() 
  }

  @Mutation
  update(article: Article){
    this.articles = this.articles.map(a => a.id === article.id ? article : a)    
  }

  @Action({ rawError: true })
  public async fetchArticles() {
    let data = await $axios.$get<Article[]>(`${ArticleAPI}api/articles/`)    
    this.fetch(data)    
  }

  @Action({ rawError: true })
  public async addArticles(getArtcle: addArtcles) {
    let data = await $axios.$post<Article[]>(`${ArticleAPI}api/articles/`, getArtcle)    
    this.add(getArtcle)    
  }

  @Action({ rawError: true })
  public async deleteArticles(article: Article) {    
    let data = await $axios.$delete<Article[]>(`${ArticleAPI}api/articles/${article.id}`)
    console.log(data);    
    this.remove(article)    
  }

  @Action({ rawError: true })
  public async editArticles(article: Article) {    
    let data = await $axios.$put<Article[]>(`${ArticleAPI}api/articles/${article.id}`, article)
    console.log(data);    
    this.update(article)
  }

}