<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="琉璃社链接" prop="liuliLink">
        <el-input
          v-model="queryParams.liuliLink"
          placeholder="请输入琉璃社链接"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="BT链接" prop="btLink">
        <el-input
          v-model="queryParams.btLink"
          placeholder="请输入BT链接"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="文章内容" prop="liuliTitle">
        <el-input
          v-model="queryParams.liuliTitle"
          placeholder="请输入文章内容"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Plus"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="liuliList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键id" align="center" prop="id" />
      <!-- <el-table-column label="琉璃社链接" align="center" prop="liuliLink" /> -->
      <el-table-column label="BT链接" align="center" prop="btLink" />
      <el-table-column label="文章标题" align="center" >
        <template #default="scope">  
          <a :href="scope.row.liuliLink" target="_blank" style="text-decoration: underline; color: #007bff;">  
            {{ scope.row.liuliTitle }}  
          </a>  
        </template>
      </el-table-column>
      <el-table-column label="副标题" align="center" prop="subContent" />
      <el-table-column label="发布日期" align="center" prop="publishTime" />
      <el-table-column label="发布人" align="center" prop="publishAuthor" />
      <el-table-column label="类型" align="center" prop="catName" />
      <el-table-column label="标签" align="center" prop="tagNames" />
      <el-table-column label="图片" width="150px">
          <template #default="scope">
              <el-image :src="scope.row.imgUrl" style="width:100px ;"></el-image>
              <!-- <div style="text-align: center;width: 100px;">美景</div> -->
          </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改琉璃-内容对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="liuliRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="琉璃社链接" prop="liuliLink">
          <el-input v-model="form.liuliLink" placeholder="请输入琉璃社链接" />
        </el-form-item>
        <el-form-item label="BT链接" prop="btLink">
          <el-input v-model="form.btLink" placeholder="请输入BT链接" />
        </el-form-item>
        <el-form-item label="文章标题" prop="liuliTitle">
          <el-input v-model="form.liuliTitle" placeholder="请输入文章标题" />
        </el-form-item>
        <el-form-item label="正文">
          <editor v-model="form.content" :min-height="192"/>
        </el-form-item>
        <el-form-item label="删除标志" prop="delFlag">
          <el-input v-model="form.delFlag" placeholder="请输入删除标志" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Liuli">
import { listLiuli, getLiuli, delLiuli, addLiuli, updateLiuli } from "@/api/dylan/liuli";

const { proxy } = getCurrentInstance();

const liuliList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    liuliLink: null,
    btLink: null,
    liuliTitle: null,
    content: null,
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询琉璃-内容列表 */
function getList() {
  loading.value = true;
  listLiuli(queryParams.value).then(response => {
    liuliList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}

// 取消按钮
function cancel() {
  open.value = false;
  reset();
}

// 表单重置
function reset() {
  form.value = {
    id: null,
    liuliLink: null,
    btLink: null,
    liuliTitle: null,
    content: null,
    delFlag: null,
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null
  };
  proxy.resetForm("liuliRef");
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}

// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加琉璃-内容";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _id = row.id || ids.value
  getLiuli(_id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改琉璃-内容";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["liuliRef"].validate(valid => {
    if (valid) {
      if (form.value.id != null) {
        updateLiuli(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addLiuli(form.value).then(response => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _ids = row.id || ids.value;
  proxy.$modal.confirm('是否确认删除琉璃-内容编号为"' + _ids + '"的数据项？').then(function() {
    return delLiuli(_ids);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('dylan/liuli/export', {
    ...queryParams.value
  }, `liuli_${new Date().getTime()}.xlsx`)
}

getList();
</script>
