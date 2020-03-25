<template>

 <mailTable  :tableData="tableData" :tableStyle="{ width:'600px' }"></mailTable>

</template>

<script>
    import mailTable from "./tableComponent"
    export default {
      components:{
        mailTable
      },
      data(){
      return{

        tableData: [
          {key: '单号', value: '1001'},
          {key: '商品名称', value: '篮球'},
          {key: '价格', value: '120.00'},
          {key: '订单日期', value: '2017-03-01'},
          {key: '付款方式', value: '在线支付'},
          {key: '收货地址', value: '北京市海淀区西北旺镇'},
        ],
      }
    },
      computed:{

      },
      created(){
        console.log(JSON.parse(localStorage.getItem('table')));
       // this.tableData=JSON.parse(localStorage.getItem('table'))

      }


  };
</script>

<style scoped>

    　
</style>