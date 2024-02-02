<template>
	<!-- 查看文件详情对话框 -->
	<el-dialog
		class="file-info-dialog"
		title="Pdf转换Word"
		:visible.sync="visible"
		:close-on-click-modal="false"
		width="550px"
		@close="handleDialogClose"
	>
		<el-form
			class="file-info-form"
			:model="fileInfo"
			ref="fileInfoForm"
			label-width="82px"
			label-position="right"
			label-suffix="："
			size="small"
		>
			<el-form-item label="文件名" prop="fileName">
				<el-input
					:value="$file.getFileNameComplete(fileInfo)"
					readonly
				></el-input>
			</el-form-item>
			<el-form-item label="识别内容" prop="pdfStr">
				<el-input
					:value="pdfStr"
					readonly
				></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="handleDialogClose">关 闭</el-button>
		</div>
	</el-dialog>
</template>

<script>
import router from '@/router/router.js'

export default {
	name: 'PdfToWordDialog',
	data() {
		return {
			visible: false //  对话框是否可见
		}
	},
	computed: {
		// 左侧菜单选中的文件类型
		fileType() {
			return router.currentRoute.query.fileType
				? Number(router.currentRoute.query.fileType)
				: 0
		},
		// 路由名称
		routeName() {
			return router.currentRoute.name
		}
	},
	methods: {
		/**
		 * 查看文件详情对话框 | 对话框关闭的回调
		 * @description 关闭对话框
		 */
		handleDialogClose() {
			this.visible = false
			this.$refs.fileInfoForm.resetFields()
			this.callback('cancel')
		},
		/**
		 * 路径点击事件
		 * @param {object} fileInfo 文件信息
		 */
		handleClickFilePath(fileInfo) {
			router.push({
				query: { filePath: fileInfo.filePath, fileType: 0 }
			})
			this.handleDialogClose()
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~_a/styles/varibles.styl';

.file-img {
  display: block;
  margin: 0 auto 8px auto;
  max-width: 120px;
  width: 40%;
  height: auto;
}
>>>.el-form.file-info-form {
  .el-form-item {
    margin-bottom: 16px;
    .el-input__inner {
      border: none;
      font-size: 14px;
    }
    &.form-item-end-time {
      .el-form-item__content {
        display: flex;
        align-items: center;
        .el-input {
          width: 141px;
          .el-input__inner {
            padding-right: 0;
          }
        }
        .status-icon {
          font-size: 14px;
        }
        .el-icon-warning {
          color: $Warning;
        }
        .el-icon-time {
          color: $Success;
        }
      }
    }
  }
}
</style>
