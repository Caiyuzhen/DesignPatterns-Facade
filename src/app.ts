import TodoList from './components/TodoList/TodoList'
import { ITodoData } from './Typings/index'


// 立即执行函数
((doc)=> {

	// 🔥外观模式的核心容器为 todoList，其中的子组件比如 input 是不会接触到 app.ts 的!!(设计模式一般都是从外往里写, 先搭建好大框架)
	const oAPP: HTMLElement = doc.querySelector('#app') as HTMLElement

	// 🔥初始化的数据（默认值）
	const todoData: ITodoData[] = [
		{
			id: 1,
			content: 'hey',
			completed: true,
		},
		{
			id: 2,
			content: 'Hi',
			completed: false,
		},
		{
			id: 3,
			content: 'Hello',
			completed: true,
		},
	]


	const init = (): void => {
		// ⚡️传入 todoList 容器 、初始化的数据
		const todoList: TodoList = new TodoList(oAPP, todoData)
		todoList.init() //执行类里边的方法
	}

	init()

})(document)