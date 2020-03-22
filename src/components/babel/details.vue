<template>
<el-rate
        v-model="value"
        disabled
        show-score
        text-color="#ff9900"
        score-template="{value}">
</el-rate>
</template>
<script>
  export default {
    data() {
      return {
        value: 2.7,
        val:''
      }
    },
    methods(){

    },
    created(){
      this.val=this.route.params.val;
    },
    mounted(){
      console.log(this.val);
    }
  }
</script>