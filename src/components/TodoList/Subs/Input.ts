import AbstractComponent from "./AbstractComponent"

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

}


export default Input