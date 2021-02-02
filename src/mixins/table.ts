/**
 * 将table组件公共操作（删除，查询，分页查询）封装到mixin
 */
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Pagination } from '@/utils/const';
import { Modal, message } from 'ant-design-vue';

@Component
export default class TableMixin extends Vue {
  public tableData = [] // table列表数据

  public loading = false // 加载loading

  public selectedRowKeys: (string | number)[] = [] // 勾选项key

  public selectedRows: any = [] // 勾选项

  public mixinOptions: StoreState.TableMixinOptions = { // 公共操作请求api方法
    queryTableApi: () => { },
    deleteApi: () => { }
  }

  public pagination: StoreState.Pagination = new Pagination({}).init(); // 分页

  public queryData: StoreState.TableQueryOptions = { // table列表请求参数
    pageNo: 1,
    pageSize: 10
  };

  // inital methods

  // 查询列表
  public async query() {
    this.loading = true;
    try {
      const { data } = await this.mixinOptions.queryTableApi(this.queryData);
      this.tableData = data.list;
      this.pagination.current = data.pageNum;
      this.pagination.total = data.total;
      this.loading = false;
    } catch (error) {
      this.loading = false;
    }
  }

  // 分页查询
  public tableChange(pagination: StoreState.Pagination) {
    this.queryData.pageNo = pagination.current as number;
    this.query();
  }

  /**
   * 批量删除
   * @param deleteParams //api参数
   */
  public batchHandleDetele(deleteParams: any) {
    if (!this.selectedRows.length) {
      message.warning('请选择要删除的数据！');
      return;
    }
    this.handleDetele(deleteParams);
  }

  // 删除确认
  public handleDetele(deleteParams: any) {
    Modal.confirm({
      title: '确定进行[删除]操作?',
      okText: '确定',
      class: 'my-modal',
      cancelText: '取消',
      onOk: async () => {
        this.onDetele(deleteParams);
      },
      onCancel: () => {
        console.log('Cancel');
      }
    });
  }

  // 开始删除
  public async onDetele(deleteParams: any) {
    await this.mixinOptions.deleteApi(deleteParams);
    const { pageNo } = this.queryData;
    if (this.tableData.length == 1) {
      this.queryData.pageNo = pageNo - 1 <= 0 ? 1 : pageNo - 1;
    }
    this.query();
  }

  // 勾选
  public onSelectChange(selectedRowKeys: Array<string | number>, selectedRows: any) {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.selectedRowKeys = selectedRowKeys;
    this.selectedRows = selectedRows;
  }

  mounted() {
    this.query();
  }
}
