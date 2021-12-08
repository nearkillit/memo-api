<template>
  <div id="app">        
    <ul>      
      <li><input type="text" v-model="articleTitle"></li>
      <li><input type="text" v-model="articleBody"></li>
      <li>                                        
        <button @click="update()">更新</button>
        <button @click="remove()">削除</button>
      </li>
    </ul>
    <button @click="homeback()">👈戻る</button>
  </div>
</template>

<script lang="ts">
// 下記、「OptionsAPI で記述」するために必要
import Vue from 'vue'

// Todo の型定義をインポート
import { Article } from '~/models/Article'
// Todo リストのストアモジュールをインポート
import { articlesStore } from '~/store'

// OptionsAPI で記述
export default Vue.extend({
  data: function () {
    return {
      articleBody: "" as string,
      articleTitle: "" as string,      
    }
  },
  created(){
    articlesStore.fetchArticles()    
  },
  mounted(){
    this.articleBody = this.article.body
    this.articleTitle = this.article.title
  },
  computed: {
    getId(): string {
      return this.$route.params.id
    },
    articles(): Array<Article> {
      return articlesStore.articles
    },
    article(): Article {      
      return articlesStore.articles.filter(a => String(a.id) === this.getId )[0]
    },
  },
  methods: {
    checkArticle(){
      console.log(this.articles)
    },
    remove(article: Article) {
      articlesStore.deleteArticles(this.article)
      this.$router.push(`/`)
    },
    update() {
      const updateArticle = { ...this.article, title: this.articleTitle, body: this.articleBody }
      console.log(updateArticle);      
      articlesStore.editArticles(updateArticle)
      this.$router.push(`/`)      
    },
    homeback(){
      this.$router.push(`/`)
    }
  }
})
</script>

<style>
/* 完了状態の Todo には打消し線をつける */
.done {
  text-decoration: line-through;
}
</style>