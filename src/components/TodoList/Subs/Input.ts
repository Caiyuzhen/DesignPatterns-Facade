import AbstractComponent from "./AbstractComponent"
import List from "./List"
import './main.css'

export interface InputOptions {
	containerEle: HTMLElement //🔥🔥父组件 create 出来的 div 容器, 用来给子组件让子组件把自己渲染进这个容器内
	placeholderText: string
	buttonText: string
}



class Input extends AbstractComponent{//继承抽象类

	private options: InputOptions
	constructor(options: InputOptions) { //类型由上面的接口来定义, 全部包装进 options 对象中, 限定三个参数 containerEle、placeholderText、buttonText
		super()
		this.options = options
	}


	// 🔥渲染视图的方法, View 层
	public render() {
		const { placeholderText, buttonText } = this.options// 解构出数据
		this.options.containerEle.innerHTML += AbstractComponent.inputView(  //🔥🔥在 input 这个子组件中调用 【抽象类】 的渲染视图的方法, 把自己渲染进入 containerEle 容器中
			placeholderText,
			buttonText
		)
	}


	// 🌟input 子组件也需要有 bindEvent 方法, 用来绑定事件, 但是要交由【父组件来执行】, 因为父组件才知道【什么时渲染完成】, 渲染完成后才去【绑定事件】
	public bindEvent() {
		const addBtn: HTMLElement = document.querySelector('.add-button') as HTMLElement//获取按钮
		const inputEle: HTMLInputElement = document.querySelector('.todo-input') as HTMLInputElement //获取输入框
		// 点击添加按钮, 传入【inputEle 这个参数】拿到输入框的值, 并且把值传给【List 组件】, 让 List 组件去新增一组数据】
		addBtn.addEventListener('click', this.handleBtnClick.bind(this, inputEle), false) //👈👈👈👈👈记得要绑定 this, 不然 this 指向的是 addBtn!! 🔥🔥🔥🔥🔥 用 bind(this)) 让 this 指向 Input 本身!! 其次因为要传给 List 组件, 需要要传入 inputEle 参数！

		this.handleMouseEnter() 
	}


	// 🌟【添加 list 事件】
	private handleBtnClick(inputDom: HTMLInputElement) {
		// 获得输入框的值
		const textValue: string = inputDom.value.trim() //⚡️⚡️trim() 方法用于删除字符串的头尾空白符
		console.log(textValue);
		if(textValue) {
			// 让 List 组件去新增一组数据】
			List.addItem(textValue) //🔥🔥🔥🔥需要在 List 内定义为静态方法, 【不用实例化就能调用】！！
			inputDom.value = '' //清空输入框
		}
	}


	// 👋鼠标光圈移动事件
	private handleMouseEnter() {
		const addBtn: HTMLElement = document.querySelector('.add-button') as HTMLElement//获取按钮
		addBtn.addEventListener('mousemove', (e) => {
			let rect = (e.target as HTMLElement).getBoundingClientRect()
			let x = e.clientX - rect.left
			let y = e.clientY - rect.top
			addBtn.style.setProperty('--x', x + 'px')
			addBtn.style.setProperty('--y', y + 'px')
			console.log(x, y);
		})
	}
}


export default Input