<template>
  <div id="app">
    <h1>記事 リスト</h1>
    <button @click="checkArticle">"checkArticles"</button>
    <!-- Todo リスト -->
    <ul>
      <li v-for="(article, i) in articles" :key="i">                
        <p>{{ article.title }}</p>
        <p>{{ article.body }}</p>
        <button @click="remove(article)">削除</button>
        <button @click="edit(article)">編集</button>
      </li>
      <!-- 新規 Todo 入力エリア -->
      <li>
        <input placeholder="記事タイトル　を入力" v-model="articleTitle" />
        <input placeholder="記事本文 を入力" v-model="articleBody" />
        <input type="button" @click="addArticle" value="記事を追加"/>
      </li>
    </ul>
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
      articleTitle: "" as string
    }
  },
  created(){
    articlesStore.fetchArticles()    
  },
  computed: {    
    articles(): Array<Article> {         
      return articlesStore.articles
    }
  },
  methods: {
    checkArticle(){
      console.log(this.articles)
    },
    remove(article: Article) {
      articlesStore.deleteArticles(article)      
    },
    edit(article: Article) {
      this.$router.push(`/article/${article.id}`)
    },
    addArticle(): void {      
      if(this.articleTitle === ""){
        alert('記事タイトルがありません')
        return
      }
      if(this.articleBody === ""){
        alert('記事本文がありません')
        return
      }
      articlesStore.addArticles({ 
        title: this.articleTitle,
        body: this.articleBody,
      })
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