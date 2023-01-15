import { ITodoData } from "../../Typings";
import Input, { InputOptions } from "./Subs/Input"
import List, { IListOptions } from "./Subs/List"

// Todolist 【外观容器】的类
class TodoList {

	private ele: HTMLElement
	private todoData: ITodoData[]
	private input: Input //子组件
	private list: List //子组件
	private todoContainer: HTMLElement //🔥todoList 列表的容器(外观容器)


	constructor(ele: HTMLElement, todoData: ITodoData[]) { //上游传入的 ele 跟 todoData
		// 保存上游传入的数据
		this.ele = ele
		this.todoData = todoData
		this.todoContainer = document.createElement('div') //🔥创建todoList 列表的容器(外观容器)
		// console.log(this.ele, this.todoData);
	}


	// 总开关, 初始化执行的函数
	public init() {
		this.createConponents() //先执行实例化子组件
		this.render()
		this.bindEvent()
	}


	// 用于实例化子组件
	private createConponents() {
		//🔥🔥实例化子组件(然后把父组件中定义的这个容器传给子组件, 让子组件把自己放进去), <InputOptions> 是类型断言
		this.input = new Input(<InputOptions>{
			containerEle: this.todoContainer,
			placeholderText: '请输入内容',
			buttonText: '增加'
		}) 
		this.list = new List(<IListOptions>{ //实例化子组件(然后把父组件中定义的这个容器传给子组件, 让子组件把自己放进去)
			containerEle: this.todoContainer,
			todoData: this.todoData //传给列表，让列表渲染数据
		})
		// console.log('创建子组件')
	}


	// 渲染 🔥todoList 列表的容器(外观容器), View 层
	private render() {
		this.input.render() //👀【最终渲染子组件中的 View！】让子组件把自己渲染进去，最终显示出来
		this.list.render() //👀【最终渲染子组件中的 View！】让子组件把自己渲染进去，最终显示出来
		this.ele.appendChild(this.todoContainer) //👀【最终 将 todoList 列表的容器(外观容器) 添加到 app 容器中】, 总开关
		// console.log('渲染子组件')
	}


	// 点击 checkbox 开关的事件绑定
	private bindEvent() {
		this.input.bindEvent()// 🔥🔥执行 input 子组卷内的 bindEvent 方法！！
		this.list.bindEvent()//	🔥🔥执行 list 子组卷内的 bindEvent 方法！！
		// console.log('绑定事件函数')
	}
}


export default TodoList