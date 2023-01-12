import Component from "./Component"

export interface InputOptions {
	wrapperEle: HTMLElement //🔥🔥父组件 create 出来的 div 容器
	placeholderText: string
	buttonText: string
}


class Input extends Component{//继承抽象类

	private options: InputOptions

	constructor(options: InputOptions) { //类型由上面的接口来定义, 全部包装进 options 对象中
		super()
		this.options = options
	}


	// 🔥渲染视图的方法, View 层
	public render() {
		const { placeholderText, buttonText } = this.options// 解构出数据
		this.options.wrapperEle.innerHTML += Component.inputView(  //🔥🔥在 input 这个子组件中调用 Component 抽象类的渲染视图的方法, 把自己渲染进入 wrapperEle 容器中
			placeholderText,
			buttonText
		)
	}

}


export default Input