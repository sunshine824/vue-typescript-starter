<template>
  <div class="piece-con">
    <a-table :row-key="(record) => record.guid"
             :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
             @change="tableChange"
             :pagination="pagination"
             :columns="columns"
             :data-source="tableData">
      <template slot="index"
                slot-scope="text, record, index">
        <span>{{ index + 1 }}</span>
      </template>
      <template slot="operation"
                slot-scope="text, record">
        <a href="#">详情</a>
        <a-divider type="vertical" />
        <a href="#"
           @click="deleteOut(record)">删除</a>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from "vue-property-decorator";
import { Table, Divider } from "ant-design-vue";
import { FaultInterface } from "../fault/interfaces";
import TableMixin from "@/mixins/table";

@Component({
  components: {
    ATable: Table,
    ADivider: Divider,
  },
})
export default class Fault extends Mixins(TableMixin) {
  //table mixins参数
  mixinOptions: StoreState.TableMixinOptions = {
    queryTableApi: () => {},
    deleteApi: () => {},
  };
  private columns: object[] = [
    {
      title: "序号",
      dataIndex: "index",
      key: "index",
      width: 60,
      //根据宽度自动省略
      ellipsis: true,
      align: "center",
      scopedSlots: { customRender: "index" },
    },
    {
      title: "设备名称",
      width: 150,
      ellipsis: true,
      align: "center",
      dataIndex: "deviceName",
      key: "deviceName",
    },
    {
      title: "设备SN",
      width: 180,
      ellipsis: true,
      align: "center",
      dataIndex: "sn",
      key: "sn",
    },
    {
      title: "MAC",
      align: "center",
      width: 200,
      ellipsis: true,
      dataIndex: "mac",
      key: "mac",
    },
    {
      title: "组织架构",
      align: "center",
      width: 180,
      ellipsis: true,
      dataIndex: "orgName",
      key: "orgName",
    },
    {
      title: "网络组名称",
      align: "center",
      width: 150,
      ellipsis: true,
      dataIndex: "groupName",
      key: "groupName",
    },
    {
      title: "负责人",
      align: "center",
      width: 150,
      ellipsis: true,
      dataIndex: "createName",
      key: "createName",
    },
    {
      title: "操作",
      align: "center",
      dataIndex: "operation",
      key: "operation",
      width: 220,
      scopedSlots: { customRender: "operation" },
    },
  ];

  //删除
  private deleteOut(row: any) {
    this.handleDetele({
      guid: row.guid,
    });
  }
}
</script>

<style lang="less" scope>
</style>