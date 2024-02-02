import Vue from 'vue'
// 导入组件
import OcrFileDialog from './Dialog.vue'
import { ocrFile } from '_r/file.js'

// 使用基础 Vue 构造器，创建一个“子类”
const OcrFileDetailConstructor = Vue.extend(OcrFileDialog)

let ocrFileDetailInstance = null

const initInstanceOcrFileDetail = (fileInfo,ocrJson) => {
	ocrFileDetailInstance = new OcrFileDetailConstructor({
		el: document.createElement('div'),
		data() {
			return {
				fileInfo,
				ocrJson
			}
		}
	})
}

const ShowOcrFileDialog = (obj) => {
	// 非首次调用服务时，在 DOM 中移除上个实例
	if (ocrFileDetailInstance !== null) {
		document.body.removeChild(ocrFileDetailInstance.$el)
	}
	let { fileInfo, ocrJson } = obj

	return new Promise(() => {
		//initInstanceOcrFileDetail(fileInfo, ocrJson)
		//const res = ocrFile(fileInfo)
		//ocrJson = res.data
		//alert(ocrJson)

		//ocrFileDetailInstance.callback = (res) => {
		//	reslove(res)
		//	// 服务取消时卸载 DOM
		//	if (res === 'cancel' && ocrFileDetailInstance !== null) {
		//		document.body.removeChild(ocrFileDetailInstance.$el)
		//		ocrFileDetailInstance = null
		//	}
		//}
		//document.body.appendChild(ocrFileDetailInstance.$el) //  挂载 DOM
		//Vue.nextTick(() => {
		//	ocrFileDetailInstance.visible = true //  打开对话框
		//})

	    // 执行 OCR 请求
	    ocrFile(fileInfo)
	        .then((res) => {
	            ocrJson = JSON.stringify(res.data)
	            initInstanceOcrFileDetail(fileInfo, ocrJson);

	            ocrFileDetailInstance.callback = (res) => {
	                // resolve(res);
	                // 服务取消时卸载 DOM
	                if (res === 'cancel' && ocrFileDetailInstance !== null) {
	                    document.body.removeChild(ocrFileDetailInstance.$el);
	                    ocrFileDetailInstance = null;
	                }
	            };

	            document.body.appendChild(ocrFileDetailInstance.$el); // 挂载 DOM
	            Vue.nextTick(() => {
	                ocrFileDetailInstance.visible = true; // 打开对话框
	            });
	        })
	        .catch((error) => {
	            console.error(error); // 处理错误情况
	        });
	})

}


export default ShowOcrFileDialog