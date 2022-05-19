<template>
    
<div class="wrap" v-bind:class="size" >

<div :background_img="item.background_img" :url="item.content" :is="item.type" v-for="item in dom_list" :key="item.index" v-bind:order="item.order" :class="item.stylelist" >{{item.content}}
   <div :background_img="item.background_img" :url="item.content" :is="item.type" v-for="item in item.sub" :key="item.index" v-bind:order="item.order" :class="item.stylelist" >{{item.content}}
      <div :background_img="item.background_img" :url="item.content" :is="item.type" v-for="item in item.sub" :key="item.index" v-bind:order="item.order" :class="item.stylelist" v-bind:src="item.content">{{item.content}}
         <div :background_img="item.background_img" :url="item.content" :is="item.type" v-for="item in item.sub" :key="item.index" v-bind:order="item.order" :class="item.stylelist" v-bind:src="item.content">{{item.content}}
             <div :background_img="item.background_img" :url="item.content" :is="item.type" v-for="item in item.sub" :key="item.index" v-bind:order="item.order" :class="item.stylelist" v-bind:src="item.content">{{item.content}}
                <div :background_img="item.background_img" :url="item.content" :is="item.type" v-for="item in item.sub" :key="item.index" v-bind:order="item.order" :class="item.stylelist" v-bind:src="item.content">{{item.content}}
                   <div :background_img="item.background_img" :url="item.content" :is="item.type" v-for="item in item.sub" :key="item.index" v-bind:order="item.order" :class="item.stylelist" v-bind:src="item.content">{{item.content}}
                      <div :background_img="item.background_img" :url="item.content" :is="item.type" v-for="item in item.sub" :key="item.index" v-bind:order="item.order" :class="item.stylelist" v-bind:src="item.content">{{item.content}}
                          <div :background_img="item.background_img" :url="item.content" :is="item.type" v-for="item in item.sub" :key="item.index" v-bind:order="item.order" :class="item.stylelist" v-bind:src="item.content">{{item.content}}
                          </div>
                      </div>
                   </div>
                </div>
             </div>
         </div>
      </div>
   </div>
</div>

</div>



</template>

<script>
import Vue from 'vue'
let one=Vue.component('one',{
		template: "<div v-bind:style='background_img'><slot></slot></div>",
      props:["background_img"]
	})
let two=Vue.component('two',{
		template: "<span><slot></slot></span>"
	})
let three=Vue.component('three',{
		template: "<input>"
	})
let four=Vue.component('four',{
		template: "<button><slot></slot></button>"
	})
let five=Vue.component('five',{
		template: "<img v-bind:src ='url' >",
      props:["url"]
	})

export default {

   data(){
   return{
      div:'one',
      span:'two',
      input:'three',
   dom_list:this.$store.state.dom_list,
  }
   },
   props:['size'],
   components:{
      one,
      two,
      three,
      four,
      five
   },
   
}
</script>

<style scoped>
div[order='1']{
   z-index: 10;
}


</style>