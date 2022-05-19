<template>
    
<div class="container">
<div v-show="false">{{active_order}}</div>
    <div class="tab_wrap con" >
        <div class="title" >content</div>
        <input class="input_content" type="text" v-model="input_value"  @blur="change">
    </div>
     <div class="tab_wrap con" >
        <div class="title" >background</div>
        <input class="url" type="text" v-model="url"  @blur="change_url">
    </div>

<div class="tab_wrap " v-for="(value,key,index) in this.style_option" :key="index" >
    <span class="title" @click="narrow($event)" @contextmenu.prevent.stop="code($event)">{{key}}</span>
   
      <div class="hiden">
        <div style="margin:10px 0 10px 0;font-size:22px" class="code" v-for="(value,key,index) in value" :key="index+key" >
          {{key}}:  <div contenteditable="true" class="code_input" >{{value}}</div>
        </div>
      </div>
      
    <div>
 <div class="tab_sub " v-for="(value,key,index) in value" :key="index">
        <span class="sub_title" >{{key}}</span>
        <div class="sub_content">
            <div class="sub_content_item" v-for="item in value" :key="item.index" @click="operate($event)" @contextmenu.prevent="prefix($event)" v-bind:name="item" >
                {{item}}
                <span class="prefix dont">
               <span @contextmenu.prevent.stop @click.stop="prefix_break($event)" >no</span>
               <span @contextmenu.prevent.stop @click.stop="prefix_react($event)" >no</span>
                </span>
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
        //active_order:this.$store.getters.get_activenode,
       //active_stylelist:this.$store.getters.get_stylelist,
       //active_content:this.$store.getters.get_activecontent,
       show:true,
        style_option:{
            layout:{
                display:["block","inline","flex"],
                overflow:["overflow-auto","overflow-hidden","overflow-scroll","overflow-x-auto","overflow-x-hidden","overflow-x-scroll","overflow-y-auto","overflow-y-hidden","overflow-y-scroll"],
                visibility:["visible","invisible"],
                z_index:["z-0","z-10","z-20","z-30","z-40","z-50","z-auto"]
            },
            flex:{
                flex_derection:["flex-row","flex-col","flex-row-reverse","flex-col-reverse"],
                flex_wrap:["flex-wrap","flex-wrap-reverse","flex-nowrap"],
                flex_size:["flex-1","flex-auto","flex-initial","flex-none"],
                flex_grow:["flex-gorw","flex-grow-0"],
                flex_shrink:["flex-shrink","flex-shrink-0"],
                order:["order-1","order-2","order-3","order-4","order-5","order-6","order-7","order-8","order-9","order-first","order-last"],
                justify_content:["justify-start","justify-center","justify-end","justify-between","justify-around","justify-evenly"],
                justify_items:["justify-items-start","justify-items-center","justify-items-end","justify-items-stretch"],
                align_content:["content-start","content-center","content-end","content-between","content-around","content-evenly"],
                align_items:["items-start","items-center","items-end","items-baseline","items-stretch"],
            },
            location:{
                position:["static","fixed","absolute","relative","sticky"],
                trbl:["inset-0","inset-x-0","inset-y-0","top-0","right-0","bottom-0","left-0"],
                margin:["mx-auto","my-auto","mt-2","mt-4","mt-8","mr-2","mr-4","mr-8","mb-2","mb-4","mb-8","ml-2","ml-4","ml-8"],
                space_between:["space-x-2","space-x-4","space-x-8","space-y-2","space-y-4","space-y-8"],
                padding:["pt-1","pt-2","pt-3","pt-4","pt-5","pt-6","pt-7","pt-8","pr-1","pr-2","pr-3","pr-4","pr-5","pr-6","pr-7","pr-8","pb-1","pb-2","pb-3","pb-4","pb-5","pb-6","pb-7","pb-8","pl-1","pl-2","pl-3","pl-4","pl-5","pl-6","pl-7","pl-8"]
            },
            size:{
                width:["w-4","w-8","w-12","w-16","w-20","w-auto","w-1/2","w-1/3","w-1/4","w-1/5","w-1/6","w-full","w-screen","w-min","w-max"],
                min_width:["min-w-0","min-w-full","min-w-min","min-w-max"],
                max_width:["max-w-xs","max-w-sm","max-w-md","max-w-lg","max-w-xl","max-w-2xl","max-w-4xl","max-w-6xl","max-w-full","max-w-min","max-w-max","max-w-screen-sm","max-w-screen-md","max-w-screen-lg","max-w-screen-xl","max-w-screen-2xl"],
                height:["h-4","h-8","h-12","h-16","h-20","h-auto","h-1/2","h-1/3","h-1/4","h-1/5","h-1/6","h-full","h-screen","h-min","h-max"],
                min_height:["min-h-full","min-h-screen"],
                max_height:["max-h-4","max-h-8","max-h-12","max-h-16","max-h-20","max-h-32","max-h-44","max-h-60","max-h-full","max-h-screen"]

            },
            text:{
                font_face:["font-sans","font-serif","font-mono"],
                font_size:["text-sm","text-base","text-lg","text-xl","text-2xl","text-3xl","text-4xl","text-5xl"],
                font_weight:["font-thin","font-extralight","font-light","font-normal","font-medium","font-semibold","font-bold","font-extrabold","font-black"],
                letter_space:["tracking-tighter","tracking-tight","tracking-normal","tracking-wide","tracking-wider","tracking-widest"],
                line_height:["leading-4","leading-6","leading-8","leading-10"],
                text_align:["text-left","text-right","text-center","text-justify"],
                color:["text-black","text-white","text-red-400","text-yellow-400","text-green-400","text-blue-400"],
                text_opacity:["text-opacity-0","text-opacity-20","text-opacity-40","text-opacity-60","text-opacity-80","text-opacity-100"],
                text_deraction:["underline","line-through","no-underline"],
                text_overflow:["truncate","overflow-ellipsis","overflow-clip"],
                vertical_align:["align-baseline","align-top","align-middle","align-bottom","align-text-top","align-text-bottom"],
                white_space:["whitespace-normal","whitespace-nowrap","whitespace-pre","whitespace-pre-line","whitespace-pre-wrap"],
                word_break:["break-normal","break-words","break-all"]
            },
            background:{
                bg_attachment:["bg-fixed","bg-local","bg-scroll"],
                bg_clip:["bg-clip-border","bg-clip-padding","bg-clip-content","bg-clip-text"],
                bg_color:["bg-black","bg-white","bg-gray-200","bg-red-50","bg-red-100","bg-red-500","bg-yellow-50","bg-yellow-100","bg-yellow-300","bg-green-50","bg-green-100","bg-green-400","bg-blue-50","bg-blue-100","bg-blue-400"],
                bg_opacity:["bg-opacity-0","bg-opacity-20","bg-opacity-40","bg-opacity-60","bg-opacity-80","bg-opacity-100"],
                bg_position:["bg-bottom","bg-center","bg-left","bg-left-bottom","bg-left-top","bg-right","bg-right-bottom","bg-right-top","bg-top"],
                bg_repeat:["bg-repeat","bg-no-repeat","bg-repeat-x","bg-repeat-y","bg-repeat-round","bg-repeat-space"],
                bg_size:["bg-auto","bg-cover","bg-contain"],
                bg_gradient:["bg-gradient-to-t","bg-gradient-to-r","bg-gradient-to-b","bg-gradient-to-l"],
                gradient_from:["from-black","from-white","from-red-400","from-yellow-300","from-green-400","from-blue-400"],
                gradient_via:["via-black","via-white","via-red-400","via-yellow-300","via-green-400","via-blue-400"],
                gradient_to:["to-black","to-white","to-red-400","to-yellow-300","to-green-400","to-blue-400"]
            },
            border:{
                border_radius:["rounded-sm","rounded","rounded-md","rounded-lg","rounded-xl","rounded-2xl","rounded-full"],
                border_width:["border-2","border-t-2","border-r-2","border-b-2","border-l-2"],
                border_color:["border-black","border-white","border-gray-200","border-red-50","border-red-100","border-red-500","border-yellow-50","border-yellow-100","border-yellow-300","border-green-50","border-green-100","border-green-400","border-blue-50","border-blue-100","border-blue-400"],
                outline_width:["ring-0","ring-1","ring-2","ring-4","ring-8"],
                outline_color:["ring-black","ring-white","ring-gray-200","ring-red-50","ring-red-100","ring-red-500","ring-yellow-50","ring-yellow-100","ring-yellow-300","ring-green-50","ring-green-100","ring-green-400","ring-blue-50","ring-blue-100","ring-blue-400"]
            },
            effective:{
                shadow:["shadow-sm","shadow","shadow-md","shadow-lg","shadow-xl","shadow-2xl","shadow-inner"],
                opacity:["opacity-0","opacity-20","opacity-40","opacity-60","opacity-80","opacity-100"]
            },
            transitions:{
                transition:["transition-all","transition","transition-colors","transition-opacity","transition-shadow","transition-transform"],
                during_time:["duration-100","duration-300","duration-500","duration-700","duration-1000"],
                timing_function:["ease-linear","ease-in","ease-out","ease-in-out"],
                animatie:["animate-spin","animate-ping","animate-pulse"]
            },
            transforms:{
                transform:["transform","transform-gpu","transform-none"],
                origin:["origin-center","origin-top","origin-top-right","origin-right","origin-bottom-right","origin-bottom","origin-bottom-left","origin-left","origin-top-left"],
                scale:["scale-50","scale-75","scale-100","scale-125","scale-150","scale-x-50","scale-x-75","scale-x-100","scale-x-125","scale-x-150","scale-y-50","scale-y-75","scale-y-100","scale-y-125","scale-y-150"],
                rotate:["rotate-45","rotate-90","rotate-180","-rotate-45","-rotate-90","-rotate-180"],
                translate:["translate-x-1","translate-x-2","translate-x-3","translate-x-4","translate-x-6","translate-x-8","translate-x-10","translate-y-1","translate-y-2","translate-y-3","translate-y-4","translate-y-6","translate-y-8","translate-y-10"]
            },
            interaction:{
                cursor:["cursor-pointer","cursor-wait","cursor-text","cursor-move","cursor-help"],
                outline:["outline-none","outline-white","outline-black"],
                change_size:["resize-y","resize-x","resize-both"]
            }
        },
        }
    },
    computed:{
       active_content:function (){
           return this.$store.getters.get_activecontent
       },
       active_stylelist:function(){
           return this.$store.getters.get_activestylelist
       },
       active_order:function(){
           return this.$store.getters.get_activenode
       },
       active_url:function(){
          return this.$store.getters.get_activeurl
       },
      

      input_value: {
         get () {
           return this.active_content
        },
         set (value) {
          this.value=value
         }
      },
      url: {
         get () {
           return this.active_url
        },
         set (value) {
          this.value=value
         }
      },


    },
    methods:{

        render(){
          const templist=  document.getElementsByClassName("selected");
          while(templist.length>0){
                templist[0].classList.remove("selected")
          }
          const allprelist = document.getElementsByClassName("pre")
          //归零前缀
          while(allprelist.length>0){
              allprelist[0].innerHTML="no"
              allprelist[0].classList.remove("pre")
          }
         
             let active_stylelist= this.active_stylelist
             active_stylelist.forEach(element => {
                 //处理关于前缀的问题
                 if(element.includes(':')){
                    let prefix= element.slice(0,element.lastIndexOf(":"))
                    element= element.slice(element.lastIndexOf(':')+1)
                   let prefix_list= prefix.split(":")
                   //渲染选项的前缀
                   for(let i =0;i<prefix_list.length;i++){
                       if(prefix_list[i].length<=3){
                           document.querySelector("div[name='"+element+"']").children[0].children[0].innerHTML=prefix_list[i]
                           document.querySelector("div[name='"+element+"']").children[0].children[0].classList.add("pre")
                           //console.log(document.querySelector("div[name='"+element+"']").children[0])
                       }else{
                           document.querySelector("div[name='"+element+"']").children[0].children[1].innerHTML=prefix_list[i]
                           document.querySelector("div[name='"+element+"']").children[0].children[1].classList.add("pre")
                       }
                   }
                 }
                 //渲染选项
                let style_node= document.querySelector("div[name='"+element+"']")
                style_node.classList.add("selected")
             });
        },
        prefix(e){
            let prefix = e.target.children[0]
            if(prefix.classList.value.includes("dont")){
                prefix.classList.remove("dont")
            }else{
                prefix.classList.add("dont")
            }
           
        },
        prefix_break(e){
            const element = e.currentTarget
            let name = e.currentTarget.innerHTML;
            
           if(element.parentNode.parentNode.classList.value.includes("selected")){
              alert("you can't change before you unchecked the option")
           }else{
                switch (name) {
                case "no":
                    element.innerHTML = "lg"
                    break;
                case "lg":
                    element.innerHTML = "xl"
                    break;
                case "xl":
                    element.innerHTML = "2xl"
                    break;
                 case "2xl":
                    element.innerHTML = "no"
                    break;
            }
           if(element.innerHTML!="no"){
               element.classList.add("pre")
             }
           }
            
            
        },
        prefix_react(e){
            const element = e.currentTarget
            let name = e.currentTarget.innerHTML;
            if(element.parentNode.parentNode.classList.value.includes("selected")){
                alert("you can't change before you unchecked the option")
            }else{
                switch (name) {
                case "no":
                    element.innerHTML = "hover"
                    break;
                case "hover":
                    element.innerHTML = "focus"
                    break;
                case "focus":
                    element.innerHTML = "active"
                    break;
                 case "active":
                    element.innerHTML = "no"
                    break;
            }
           if(element.innerHTML!="no"){
               element.classList.add("pre")
               }
            }
            
        },
        operate(e){
            //是否已经在元素样式表里了
          let bool= e.target.classList.value.includes("selected");
          //console.log(e.target)
          //这个选项的类名是什么
          let name = e.target.getAttribute("name")
          let prefix_break = e.target.children[0].children[0].innerHTML
          let prefix_react = e.target.children[0].children[1].innerHTML
          if(prefix_break !="no"){
              name = `${prefix_break}:${name}`
          }
          if(prefix_react !="no"){
              name =`${prefix_react}:${name}`
          }
          //找到当前元素
          let active_order = Array.from(this.$store.getters.get_activenode) 
          let node = this.dom_list[0];
          //console.log(node)
        //console.log("operate")
        for(let i=1;i<active_order.length;i++){
          node=node.sub[parseInt(active_order[i])-1]
       };
           switch (bool) {
               case false:
                node.stylelist.push(name)
               // console.log(this.active_stylelist)
                //this.$store.commit('add_style',name)
                this.render()
                break;
           case true:
                 node.stylelist.splice(node.stylelist.indexOf(name),1) 
                 this.render()
                 //console.log(this.active_stylelist)
                 //  while (this.$store.state.active_stylelist.length>0) {
                //  this.$store.state.active_stylelist.pop()
               //   }
              //  node.stylelist.forEach(element => {
              // this.$store.state.active_stylelist.push(element)
              //    });
                 
                break;
              
           } 
         
        },
        change(){
            
            let active_order = Array.from(this.$store.getters.get_activenode) 
            let node = this.dom_list[0];

            for(let i=1;i<active_order.length;i++){
             node=node.sub[parseInt(active_order[i])-1]
           };
           node.content=this.value
        this.$store.commit("set_content",node.content);
        },

        change_url(){
              let active_order = Array.from(this.$store.getters.get_activenode) 
            let node = this.dom_list[0];

            for(let i=1;i<active_order.length;i++){
             node=node.sub[parseInt(active_order[i])-1]
           };
          // node.background_img=`background-image:url('${this.value}')`
           node.background_img=`background-image:url(${this.value})`
           this.$store.commit("set_url",node.background_img);



        },
        narrow(e){
           let wrap= e.target.parentNode
           let str =wrap.classList.value
           let bool =str.includes("narrow")
           //console.log(bool)
           switch (bool) {
               case false:
                   wrap.classList.add("narrow")
                   break;
                case true:
                  wrap.classList.remove("narrow")
              
           }
            //console.log(wrap.style.animation)
            
           
        },
        code(e){
            let father = e.currentTarget.parentNode;
            let name = e.currentTarget.innerHTML
            let code = father.children[1]
            let tab = father.children[2]
            let option= this.style_option[name]
            let list =[]
            for(let i =0; i<code.children.length;i++){
                let content = code.children[i].children[0].innerHTML
                content = eval(content)
                list.push(content)
            }
            let i =0;
            let proplist = Object.keys(option)
            for(let i =0; i<proplist.length;i++){
                option[proplist[i]] = list[i]
            }

            if(tab.classList.value.includes("hiden")){
                tab.classList.remove("hiden")
                code.classList.add("hiden")
            }else{
                code.classList.remove("hiden")
                tab.classList.add("hiden")
            }
        }
    },
    
    updated:function(){
        this.render()

    }
    
    

}
</script>

<style scoped>




.container{
    width: 50vw;
    height: 100vh;
    background-color: rgb(255, 255, 255);
    overflow: scroll;
    padding-bottom: 3px;
}

div.tab_wrap.narrow{
  height: 50px;
    
}
.title:hover{
    cursor: pointer;
}
.tab_wrap{
    margin-left: 10px;
    padding-left: 7px;
    padding-top: 5px;
    margin-top: 10px;
    padding-bottom: 15px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
    width: 48vw;
    border-radius: 3px;
    transition: all 0.3s;
    border: 1px solid rgba(0, 0, 0, 0);
    overflow: hidden;
}

.con{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.tab_wrap:hover{
   border: 1px solid rgb(0, 0, 0,0.5);
}
.tab_sub{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-left: 2px;
    
}
.sub_title{
    font-size: 20px;
    line-height: 24px;
    margin-top: 10px;
    

}
.sub_content{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-left: 10px;
    flex-wrap: wrap;
}
.sub_content_item{
    padding-left: 5px;
    padding-right: 5px;
    margin-left: 10px;
    border:  2px solid black;
    border-radius: 6px;
    margin-top: 10px;
    transition:  all 0.2s;
}
.sub_content_item:hover{
    cursor: pointer;
    border: 2px solid #409eff;
}
.title{
    font-size: 25px;
    font-weight: bolder;
    
}
.selected{
    background-color: #e1f0ff;
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

.input_content{
    width: 39vw;
    height: 30px;
    border: 2px solid black;
    margin-left: 20px;
    border-radius: 5px;
    font-size: 20px;
    padding-left: 5px;
    
}
::placeholder{
    color: black;
}
.url{
     width: 36.5vw;
    height: 30px;
    border: 2px solid black;
    margin-left: 20px;
    border-radius: 5px;
    font-size: 20px;
    padding-left: 5px;
    
}
.dont{
    display: none;
}
.hiden{
    display: none;
}
.code_input{
    width: 45vw;
    height: fit-content;
    font-size: 20px;
  
    }
</style>