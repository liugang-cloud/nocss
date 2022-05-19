<template>
    
<div class="container">
 <div class="warp">
 <div class="tree_container" style="left:0px;top:40px">

        <div class="tree" v-for="item in dom_list" :key="item.order">
            <div class="node "  v-bind:order="item.order" @click="select($event)" v-bind:id="item.order" @keypress="operate($event)">{{item.tag}}</div>
            <div class="forest"  v-bind:order="item.order">
                <div class="tree" v-for="item in item.sub" :key='item.order'>
                    <div class="node" v-bind:order="item.order" @click="select($event)" v-bind:id="item.order" @keypress="operate($event)">{{item.tag}}</div>
                    <div class="forest" v-bind:order="item.order">
                        <div class="tree" v-for=" item in item.sub" :key="item.order">
                            <div class="node" v-bind:order="item.order" @click="select($event)" v-bind:id="item.order" @keypress="operate($event)">{{item.tag}}</div>
                            <div class="forest" v-bind:order="item.order">
                                <div class="tree" v-for="item in item.sub" :key="item.order">
                                    <div class="node" v-bind:order="item.order" @click="select($event)" v-bind:id="item.order" @keypress="operate($event)">{{item.tag}}</div>
                                    <div class="forest" v-bind:order="item.order">
                                        <div class="tree" v-for="item in item.sub" :key="item.order">
                                            <div class="node" v-bind:order="item.order" @click="select($event)" v-bind:id="item.order" @keypress="operate($event)">{{item.tag}}</div>
                                            <div class="forest" v-bind:order="item.order">
                                                <div class="tree" v-for="item in item.sub" :key="item.order">
                                                    <div class="node" v-bind:order="item.order" @click="select($event)" v-bind:id="item.order" @keypress="operate($event)">{{item.tag}}</div>
                                                    <div class="forest" v-bind:order="item.order">
                                                        <div class="tree" v-for="item in item.sub" :key="item.order">
                                                            <div class="node" v-bind:order="item.order" @click="select($event)" v-bind:id="item.order" @keypress="operate($event)">{{item.tag}}</div>
                                                            <div class="forest" v-bind:order="item.order">
                                                                <div class="tree" v-for="item in item.sub" :key="item.order">
                                                                    <div class="node" v-bind:order="item.order" @click="select($event)" v-bind:id="item.order" @keypress="operate($event)">{{item.tag}}</div>
                                                                    <div class="forest" v-bind:order="item.order">
                                                                        <div class="tree" v-for="item in item.sub" :key="item.order">
                                                                            <div class="node" v-bind:order="item.order" @click="select($event)" v-bind:id="item.order" @keypress="operate($event)">{{item.tag}}</div>
                                                                            <div class="forest" v-bind:order="item.order"></div>
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





export default {
    data(){
      return{
          dom_list:this.$store.getters.get_domlist,
      }
    },
    methods:{
     select(e){
         if(document.getElementsByClassName("focus")[0]){
             document.getElementsByClassName("focus")[0].classList.remove("focus")
         }
        let order= e.target.getAttribute('order');
        document.getElementById(order).classList.add("focus")
        this.$store.commit('set_activenode',order)
        e.target.tabIndex=-1;
        e.target.focus()
        let active_order = Array.from(order) 
        let node = this.dom_list[0];
        for(let i=1;i<active_order.length;i++){
          node=node.sub[parseInt(active_order[i])-1]
       };
     

  //   while (this.$store.state.active_stylelist.length>0) {
  //       this.$store.state.active_stylelist.pop()
  //   }
    
      this.$store.commit('set_activestylelist',node.stylelist)
      //  node.stylelist.forEach(element => {
      //      this.$store.state.active_stylelist.push(element);
      //  });

     this.$store.commit("set_content",node.content)
     this.$store.commit("set_url",node.background_img)
    
    
   //console.log(this.$store.getters.get_activecontent)
        
        
        
     },
     
     add(tag,type){
        let active_code=this.$store.getters.get_activenode;
       let active_order = Array.from(this.$store.state.active_node) 
       let node = this.dom_list[0];
      
       for(let i=1;i<active_order.length;i++){
          node=node.sub[parseInt(active_order[i])-1]
          
       };
       let longth = node.sub.length;
       node.sub.push({
           tag:tag,
           order: active_code+(longth+1),
           sub:[],
           stylelist:[],
           content:"",
           type:type,
           background_img:""
       })
     },

     delete(){
          let active_code=this.$store.getters.get_activenode;
       let active_order = Array.from(active_code) 
       let node = this.dom_list[0];
      
       for(let i=1;i<active_order.length-1;i++){
          node=node.sub[parseInt(active_order[i])-1]
       };
       node.sub.pop()
       
     },

     operate(e){
         let type=e.key;
         
         switch (type) {
             case "1":
               this.add('div','one')
                 break;
             case "2":
                this.add('span','two')
                 break;
             case "3":
                this.add('input','three')
                 break;
             case "4":
                 this.add('button','four')
                 break;
             case "5":
                 this.add('img','five')
                 break;
             case "6":
                 this.delete()
                 break;

         
             
         }
     }
    },
    
    
    
}
</script>

<style scoped>
.container{
    width: 49vw;
    height: 96vh;
    background-color: white;
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
    position: relative;
    bottom: 0.5vh;
    border-radius: 3px;
    transition: all 0.3s;
}
.container:hover{
    border:1px solid rgba(0, 0, 0, 0.5)
}

.wrap{
    
}
  .node {
            width: 55px;
            height: 55px;
            border-radius: 50%;
            /*border: 2px solid #409eff;*/
            border: 2px solid black;
            margin-left: auto;
            margin-right: auto;
            text-align: center;
            line-height: 55px;
            transition: all 0.3s;
            outline: none;
        }
        
  .tree {
            display: flex;
            flex-direction: column;
            width: fit-content;
            padding-left: 10px;
            padding-right: 10px;
            align-items: center;
        }
        
  .forest {
            display: flex;
            flex-direction: row;
            margin-top: 40px;
            padding-right: 20px;
        }
        
  .tree_container {
            position: relative;
            top: 40px;
            margin-left: auto;
            margin-right: auto;
            width: max-content;
            transition: all 0.5s;
        
        }
        .focus{
            background-color: #e1f0ff;
            border:  2px solid black;
           
        }

        .node:hover{
            cursor: pointer;
            border:  2px solid #409eff;;
           
        }
        .node:hover+.forest .node{
              border: 2px solid #409eff;;
             
        }
</style>

