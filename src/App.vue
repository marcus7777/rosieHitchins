<template>
  <div id="app">
    <div id="header" class="clear-block">
      <h1 class='site-name'><a href="/" title="Home">Rosie Hitchins</a></h1>
      <div class='site-slogan' style="width: 288px;">
        Holistic Therapist serving Newmarket West Suffolk &amp; Surrounding Area
      </div>
    </div>
    <div id="primary">
      <ul class="links" id="navlist" style="margin: 0;padding: 0;display: flex;justify-content: space-between;">
        <li v-for="page in menu" v-bind:key="page.path" style="display: inline;list-style-type: none"><router-link :to="page.path" :title="page.name">{{page.menu}}</router-link></li>
      </ul>
    </div>
    <h1>{{$route.name}}</h1>
    <img v-if="$route.meta.images" :alt="$route.name" :src="$route.meta.images" style="float: left;margin: 0 10px 20px 0;" />
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    const menu = this.$router.options.routes.sort((a,b) => {
      return a.weight - b.weight
    }).filter(p => !!(p.menu.trim()))
    return {
      menu
    }
  },
}
</script>
