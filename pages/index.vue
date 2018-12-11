<template>
  <div>
   <div>Hello World</div>
    <div>
    <v-btn color="success">Success</v-btn>
    <v-btn color="error">Error</v-btn>
    <v-btn color="warning">Warning</v-btn>
    <v-btn color="info">Info</v-btn>
  </div>
    <div v-if="show">{{ text.toUpperCase() }}</div>
    <input v-model.trim="text" @input="doCheckKey"><br>
    {{ bntText }}
    <div> text={{ text }}xxxx</div>
    <div>html=<span v-html="text"></span>xxxx</div>
    <input v-model="text"><br>
    {{ btnText }}
    <input type="button" :value="btnText" :disabled ="text.length <= 3" @click="addStd">
    <input type="button" value="Toggle" @click="toggleShow">
<div>Total {{students.length}} students</div>

    <div v-for="st in students" :key="st.id">
        {{st.id}} <b>{{st.code}}</b>{{st.name}}
    </div>
    <div v-for="i in 12" :key="i">
        {{i}}
    </div>
    </div>
</template>
<script>

export default {
   data(){
         return {
         text: '',
         show: true,
         students:[
             {id: 1, code: '111', name: 'name1'},
             {id: 2, code: '112', name: 'name2'},
             {id: 3, code: '113', name: 'name3'},
             {id: 4, code: '114', name: 'name4'},
           
         ],
        
       }
   },
   computed:{
       btnText() {
       return this.text.length > 3 ? 'YES' : 'NO'
     },
     text2(){
      return this.text.toUpperCase();
     },
   },
   methods: {
       addStd(){
           let id = this.students.length + 1
           this.students.push({id: 5, code: '00' + id, name: 'name'+id})
       },
       toggleShow(){
        this.show = !this.show
       },
       doCheckKey(evt){
           console.log(evt.keyCode, evt.charCode, evt.which)
       if(evt.which >= 48 && evt.which <= 57){
          return
       }
       this.text = this.text.replace(/[^0-9]+/mig,'')
       console.log('text=', this.text)
       },
   }
}
</script>
