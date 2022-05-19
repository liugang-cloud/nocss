<template>
    
<div class="layout_container">

<div class="button_list">
<button v-on:click="big">big</button>
<button v-on:click="middle">middle</button>
<button v-on:click="small">small</button>
</div>
<Paint  v-bind:size="size"></Paint>
</div>



</template>

<script>


import Paint from "./paint.vue"
export default {
    data(){
        return {
            size:'middle'
        }
    },
    methods:{
      big(){
          this.size='big'
      },
      middle(){
          this.size='middle '
      },
      small(){
          this.size='small '
      }
    },
    components: { Paint }
}
</script>

<style scoped>
.layout_container{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

.wrap{
    transform: scale(0.9,0.9);
    margin-left: auto;
    margin-right: auto;
    background-color: rgb(255, 255, 255);
    height: 720px;
    overflow: scroll;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
    transition: all 0.3s;
    border-radius: 3px;
    position: relative;
    bottom: 10px;
    
    
}
.wrap:hover{
    outline: 1px solid rgba(0, 0, 0, 0.5);
}
.big{
    width: 1536px;
}
.middle{
    width: 1280px;
}
.small{
    width: 1024px;
}
.button_list{
  width: 300px;
  display: flex;
  flex-direction: row;
  justify-content:space-around ;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  position: relative;
  top: 10px;
 
}
button{
    outline: none;
    font-size: 18px;
    transition: all 0.3s;
    height: 30px;
}
button:focus{
    font-size: 23px;
    line-height: 10px;
}
::-webkit-scrollbar {
  width: 16px;
  height: 16px;
 
}
/* Track */
::-webkit-scrollbar-track {
 
 
  
}
/* Handle */
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 12px;
  border: 5px solid rgba(255, 255, 255, 1);
  background: lightgray;
}


</style>