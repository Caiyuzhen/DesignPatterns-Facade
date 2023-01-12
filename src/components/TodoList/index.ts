import { ITodoData } from "../../Typings";
import Input, { InputOptions } from "./Subs/Input"
import List from "./Subs/List"

// Todolist 外观容器的类
class TodoList {

	private ele: HTMLElement
	private todoData: ITodoData[]
	private input: Input //子组件
	private list: List //子组件
	private todoWrapper: HTMLElement //🔥todoList 列表的容器(外观容器)


	constructor(ele: HTMLElement, todoData: ITodoData[]) { //上游传入的 ele 跟 todoData
		// 保存上游传入的数据
		this.ele = ele
		this.todoData = todoData
		this.todoWrapper = document.createElement('div') //🔥创建todoList 列表的容器(外观容器)
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
			wrapperEle: this.todoWrapper,
			placeholderText: '请输入内容',
			buttonText: '增加'
		}) 
		this.list = new List() //实例化子组件(然后把父组件中定义的这个容器传给子组件, 让子组件把自己放进去)
		// console.log('创建子组件')
	}


	// 渲染 🔥todoList 列表的容器(外观容器), View 层
	private render() {
		this.input.render() //🔥渲染子组件中的 View！
		this.ele.appendChild(this.todoWrapper) //🔥将 todoList 列表的容器(外观容器) 添加到 app 容器中
		// console.log('渲染子组件')
	}


	// 点击 checkbox 开关的事件绑定
	private bindEvent() {
		// console.log('绑定事件函数')
	}
}


export default TodoList