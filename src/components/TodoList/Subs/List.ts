import { ITodoData } from "../../../Typings"
import AbstractComponent  from "./AbstractComponent"

export interface IListOptions {
	containerEle: HTMLElement //🔥🔥父组件 create 出来的 div 容器, 用来给子组件让子组件把自己渲染进这个容器内
	textData: ITodoData[] //🔥🔥要渲染的列表是 todoData 的数组类型
}



class List extends AbstractComponent{

	private options: IListOptions
	private containerEle: HTMLElement
	private static textData: ITodoData[]  //🚀🚀🚀【静态属性 - 第一步】不要让它在实例化的时候进行更改, 因为每次实例化的时候都是同一个 textData: TodoData , 不需要每次实例化都去更改它

	// 初始化
	constructor(options: IListOptions) { //类型上面的接口来定义, 全部包装进 options 对象中, 限定两个参数 containerEle、text
		super()
		this.containerEle = options.containerEle //在构造函数中(每次实例化的时候）解构赋值, 因为只是个容器
		List.textData = options.textData //🚀🚀🚀【静态属性- 第二步】不要让它在实例化的时候进行更改, 因为每次实例化的时候都是同一个 textData: TodoData , 不需要每次实例化都去更改它
	}

	// 🔥渲染视图的方法, View 层
	public render() {
		this.containerEle.innerHTML += AbstractComponent.listViewContainer(List.textData) //🚀🚀🚀【静态属性 - 第三步】传入数据, 由 AbstractComponent 抽象类进行渲染
		// const { textData } = this.options // 解构出数据

	}
}


export default List