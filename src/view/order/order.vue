<script setup>
import { ref, reactive } from "vue";
import MyTable from "@/components/MyTable.vue";
import { orderTableConfig } from "@/utils/tableConfig";
import {
  getOrderListApi,
  detleteOrderApi,
  orderRefundApi,
  getRefundMessageApi,
  allowRefundApi,
  rejectRefundApi,
  completeOrderApi
} from "@/api/order";
import { ElMessage } from "element-plus";

const userinfo = JSON.parse(localStorage.getItem("userinfo"));
const orderList = ref([]);
const currentPage = ref(1);
const pageSize = ref(8);
const orderTotal = ref(0);
//获取订单列表
const getOrderList = async pageObj => {
  const res = await getOrderListApi(userinfo, pageObj);
  if (res.code === 0) {
    res.data.list.forEach(item => {
      switch (item.order_status) {
        case 0:
          item.order_status = "待付款";
          break;
        case 1:
          item.order_status = "已付款";
          break;
        case 2:
          item.order_status = "待退款";
          break;
        case 3:
          item.order_status = "已退款";
          break;
        case 4:
          item.order_status = "已完成";
          break;
      }
    });
    orderList.value = res.data.list;
    orderTotal.value = res.data.total;
  }
};
//分页对象
const pageObj = reactive({
  currentPage: currentPage.value,
  pageSize: pageSize.value
});
getOrderList(pageObj);
//分页变化
const pageChange = nowPage => {
  pageObj.currentPage = nowPage;
  getOrderList(pageObj);
};
const dialogVisivle = ref(false);
const dialogTitle = ref("申请退款");
const disable = ref(false);
//删除订单
const deleteClick = oid => {
  ElMessageBox.confirm("确认删除订单吗?", "Warning", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(async () => {
    const res = await detleteOrderApi(oid);

    if (res.code === 0) {
      getOrderList(pageObj);
      ElMessage({
        type: "success",
        message: "删除成功！"
      });
      //重新请求数据
    }
  });
};
//点击申请退款
const refundObj = reactive({
  refund_type: "",
  refund_context: "",
  order_id: ""
});
//点击退款按钮
const refundClick = oid => {
  dialogVisivle.value = true;
  disable.value = false;
  refundObj.order_id = oid;
};
//处理退款函数
const refundHandler = async () => {
  if (!refundObj.refund_context || !refundObj.refund_type) {
    ElMessage({
      type: "warning",
      message: "请将数据填写完整"
    });
    return;
  }
  //退款
  const res = await orderRefundApi(refundObj);
  if (res.code === 0) {
    ElMessage({
      type: "success",
      message: "提交成功！"
    });
    dialogVisivle.value = false;
    //重新获取订单列表
    getOrderList(pageObj);
    //清空对象
    refundObj = reactive({
      refund_type: "",
      refund_context: "",
      order_id: ""
    });
  }
};
//点击确认退款按钮
const affirmRefundClick = async oid => {
  refundObj.order_id = oid;
  const res = await getRefundMessageApi(oid);
  if (res.code === 0) {
    refundObj.refund_type = res.data.refund_type;
    refundObj.refund_context = res.data.refund_context;
  }
  disable.value = true;
  dialogVisivle.value = true;
};
//点击弹框的确认按钮
const allowRefundHandler = async () => {
  const res = await allowRefundApi(refundObj.order_id);
  if (res.code === 0) {
    ElMessage({
      type: "success",
      message: "退款成功"
    });
    dialogVisivle.value = false;
    getOrderList(pageObj);
  }
};
//驳回退款
const rejectRefundHandler = async () => {
  const res = await rejectRefundApi(refundObj.order_id);
  if (res.code === 0) {
    ElMessage({
      type: "success",
      message: "已驳回"
    });
    dialogVisivle.value = false;
    getOrderList(pageObj);
  }
};
//完成订单
const completeOrder = oid => {
  ElMessageBox.confirm("是否确定完成当前订单", "Warning", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(async () => {
    const res = await completeOrderApi(oid);
    if (res.code === 0) {
      getOrderList(pageObj);
      ElMessage({
        type: "success",
        message: "以完成订单"
      });
    } else {
      ElMessage({
        type: "error",
        message: "完成失败"
      });
    }
  });
};
</script>

<template>
  <div class="order">
    <h3>订单管理</h3>
    <MyTable :strcture="orderTableConfig" :tableData="orderList">
      <el-table-column fixed="right" label="操作" width="150">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="deleteClick(scope.row.oid)"
            v-if="scope.row.order_status == '已完成' || scope.row.order_status == '已退款'"
          >删除</el-button>
          <el-button
            link
            type="primary"
            size="small"
            v-if="scope.row.order_status == '已付款' && userinfo.userType == '0'"
            @click="refundClick(scope.row.oid)"
          >申请退款</el-button>
          <el-button
            link
            type="primary"
            size="small"
            v-if="scope.row.order_status != '已完成' && userinfo.userType == '0'"
            @click="completeOrder(scope.row.oid)"
          >完成</el-button>
          <el-button
            link
            type="primary"
            size="small"
            v-if="scope.row.order_status == '待退款' && userinfo.userType === '1'"
            @click="affirmRefundClick(scope.row.oid)"
          >确认退款</el-button>
          <el-button
            link
            type="primary"
            size="small"
            v-if="scope.row.order_status == '已付款' && userinfo.userType === '1'"
          >暂无操作</el-button>
        </template>
      </el-table-column>
    </MyTable>

    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        v-model="currentPage"
        :page-size="pageSize"
        :total="orderTotal"
        @current-change="pageChange"
      />
    </div>
    <el-dialog v-model="dialogVisivle" :title="dialogTitle" width="30%">
      <el-form :model="refundObj">
        <el-form-item label="原因">
          <el-select v-model="refundObj.refund_type" placeholder="请选择退款原因" :disabled="disable">
            <el-option label="未办理" value="未办理" />
            <el-option label="办理脏乱差" value="办理脏乱差" />
            <el-option label="服务质量差" value="服务质量差" />
          </el-select>
        </el-form-item>
        <el-form-item label="原因">
          <el-input
            v-model="refundObj.refund_context"
            type="textarea"
            resize="none"
            rows="5"
            :readonly="disable"
          />
        </el-form-item>
        <el-form-item>
          <div class="btn_box">
            <el-button type="warning" @click="refundHandler" v-if="!disable">提交</el-button>
            <el-button type="info" @click="rejectRefundHandler" v-if="disable">驳回</el-button>
            <el-button type="primary" @click="allowRefundHandler" v-if="disable">确认退款</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>


<style scoped lang="scss">
.order {
  padding: $box-padding;
  background-color: #fff;
  border-radius: $box-radius;
  box-shadow: $card-box-shadow;
  .pagination {
    width: 100%;
    padding: 10px 0;
    display: flex;
    justify-content: center;
  }
  .btn_box {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
}
</style>