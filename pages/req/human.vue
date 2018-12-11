<template>
    <div>
        <h1>Human Power</h1>
        <div>
        <v-select
          :items="majorList"
          v-model="form.majorId"
          label="สาขา"
          class="input-group--focused"
          item-text="name"
          item-value="id"
          outline
        ></v-select>
          <label class="required">สาขา</label>
            <select v-model="form.majorId"  required>
                <option :value="0">-- เลือก --</option>
                <option v-for="m in majorList" :key="m.id" :value="m.id">{{m.name}} </option>
            </select>
        </div>
        <div>
            <label class="required">จำนวนที่ต้องการ</label>
        </div>
        <div>จำนวน ({{form.male}} คน)
        </div>
        <div>

            <v-slider :label="`ชาย(${form.male})`" v-model="form.male"  thumb-label :step="1"  :min="0" :max="100" ticks  ></v-slider>
            <label>เพศชาย</label>

            <input type="number" v-model.number="form.male" min="0">
        </div>
        <div>
            <label>เพศหญิง</label>
            <input type="number" v-model.number="form.female" min="0">
        </div>
        <div>
            <label>ไม่ระบุเพศ</label>
            <input type="number" v-model.number="form.common" min="0">
        </div>
         <div>
            <label>เริ่ม</label>
            <input type="date" v-model="form.reqStart">
        </div>
         <div>
            <label>ความต้องการพิเศษ</label>
            <textarea v-model="form.specialCondition" placeholder="กรุณากรอกรายละเอียดเพิ่มเติม"></textarea>
        </div>
        <div>

            <v-btn color="success" @click="doSave" :disabled="!isValid" >SAVE</v-btn>
        </div>
    </div>

</template>

<script>

export default {
   data() {
        return {
            form: {
                businessId: 0,
                majorId: '',
                level: '',
                male: '',
                female: '',
                common: '',
                orgDate: '',
                reqDate: '',
                changeReq: 0,
                reqStart: '',
                reqEnd: '',
                ageRange: '',
                specialCondition: '',
            },
            majorList: [
                {id: 1,name: 'Major 1'},
                {id: 2,name: 'Major 2'},
                {id: 3,name: 'Major 3'},
            ],
        }
    },//data
    computed: {
      isValid(){
          //if (this.form.majorId === 0){
          //    return false
        //  }
        return this.form.majorId && (this.form.male || this.form.female || this.form.common)

         // let ok =  this.form.majorId > 0 && (this.form.male > 0 || this.form.female)
      },
    },//end computed
    created() {
      // การยิง request มีไลบาร์ลี่ vue-resource => promise base ปัจจุบันประกาศเป็นทางเลือก vue พยายามอย่าตั้งตัวแปรขึ้นต้นด้วย $ มีโอกาสชนกับตัวแปรระบบ, 
      // axios => promise base
      // request => call back ลักษณะเดียวกับ Ajax query => success เรียกว่า call back
      this.$http.get('http://localhost:9000/req/major').then(res => {
           if (res.data.data){
               let arr = []
               for (let i =0; i < res.data.data.length; i++){
                   arr.push({id: res.data.data[i].major_code,name: res.data.data[i].major_code+'   '+ res.data.data[i].major_name})
               }
               this.majorList = arr
            //     this.majorList = res.data.data.map(x => {
            //           return {
            //            id: x.major_code,
            //            name: x.major_name,
            //        }
            //    })

             //this.majorList = res.data.data.map(x => ({ id: x.major_code,name: x.major_code+'  '+ x.major_name}))
             //this.majorList = res.data.data
            //    })
            // map() 
            // var a =['A', 'B', 'C', 'D']
            // var b = a.map(function(x)){
            //  return x.toLowerCase()    })
            //  
            // var b =['a', 'b', 'c', 'd']
            //
         // if (res.data.a == 1){
          } 
      })
      // echo json_encode(array('a' => 1,'b' => 2))  // ส่งมาจาก php
    }, // end created
    methods: {
        doSave() {
          console.log(JSON.parse(JSON.stringify(this.form)))
          //TODO: check
          //ส่ง post แบบ php
          // Content-type: x-www-
          //
          //name=...&major_code=....&major_name
          

          //Content-Type: text/jsom
          //
          // {"major_code": 1,"major_name":}
          this.$http.post('http://localhost:9000/req/manpower',this.form).then(res => {
              if(!res.data.status){
                  //TODO: show error
                  return
              }
              //TODO: show success
          })
        } // doSave
    }, //methods
}
</script>
<style>
 .required::after {
     content: '*';
     color: red;
 }
</style>
