import Vue from 'vue'
// 导入组件
import PdfConvertWordDialog from './Dialog.vue'
import { pdfConvertWord } from '_r/file.js'

// 使用基础 Vue 构造器，创建一个“子类”
const PdfToWordFileDetailConstructor = Vue.extend(PdfConvertWordDialog)

let pdfToWordFileDetailInstance = null

const initInstancePdfConvertWord = (fileInfo,pdfStr) => {
	pdfToWordFileDetailInstance = new PdfToWordFileDetailConstructor({
		el: document.createElement('div'),
		data() {
			return {
				fileInfo,
				pdfStr
			}
		}
	})
}

const ShowPdfConvertWordDialog = (obj) => {
	// 非首次调用服务时，在 DOM 中移除上个实例
	if (pdfToWordFileDetailInstance !== null) {
		document.body.removeChild(pdfToWordFileDetailInstance.$el)
	}
	let { fileInfo, pdfStr } = obj

	return new Promise(() => {
	    // 执行 PDF 转换请求
	    pdfConvertWord(fileInfo)
	        .then((res) => {
	            pdfStr = res.data
	            initInstancePdfConvertWord(fileInfo, pdfStr);

	            pdfToWordFileDetailInstance.callback = (res) => {
	                // resolve(res);
	                // 服务取消时卸载 DOM
	                if (res === 'cancel' && pdfToWordFileDetailInstance !== null) {
	                    document.body.removeChild(pdfToWordFileDetailInstance.$el);
	                    pdfToWordFileDetailInstance = null;
	                }
	            };

	            document.body.appendChild(pdfToWordFileDetailInstance.$el); // 挂载 DOM
	            Vue.nextTick(() => {
	                pdfToWordFileDetailInstance.visible = true; // 打开对话框
	            });
	        })
	        .catch((error) => {
	            console.error(error); // 处理错误情况
	        });
	})

}


export default ShowPdfConvertWordDialog