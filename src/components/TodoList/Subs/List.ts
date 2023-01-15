import { ITodoData } from "../../../Typings"
import AbstractComponent  from "./AbstractComponent"
import './main.css'

export interface IListOptions {
	containerEle: HTMLElement //🔥🔥父组件 create 出来的 div 容器, 用来给子组件让子组件把自己渲染进这个容器内
	todoData: ITodoData[] //🔥🔥要渲染的列表是 todoData 的数组类型
}



class List extends AbstractComponent{

	private options: IListOptions
	private containerEle: HTMLElement
	private static todoData: ITodoData[]  //🚀🚀🚀【静态属性 - 第一步】静态属性是唯一的!! 因为不要让它在实例化的时候进行更改, 因为每次实例化的时候都是同一个 todoData: TodoData , 不需要每次实例化都去更改它

	// 初始化
	constructor(options: IListOptions) { //类型上面的接口来定义, 全部包装进 options 对象中, 限定两个参数 containerEle、text
		super()
		this.containerEle = options.containerEle //在构造函数中(每次实例化的时候）解构赋值, 因为只是个容器
		List.todoData = options.todoData //🚀🚀🚀【静态属性- 第二步】不要让它在实例化的时候进行更改, 因为每次实例化的时候都是同一个 todoData: TodoData , 不需要每次实例化都去更改它
	}



	// 🔥渲染视图的方法, View 层
	public render() {
		this.containerEle.innerHTML += AbstractComponent.listContainer(List.todoData) //🚀🚀🚀【静态属性 - 第三步】传入 todoData 数据】, 由 AbstractComponent 抽象类进行渲染
		// const { todoData } = this.options // 解构出数据
	}



	// 🔥🔥添加 list 数据的方法, 【由 Input 组件调用】, 传入 Input 组件内获得的 【输入框数据】！！
	public static addItem(textValue: string) {
		const todoItem: HTMLElement = document.querySelector('.todo-list') as HTMLElement// 先去保存数据, 避免空状态的问题(会直接显示 '暂无数据')
		
		// 新增一条 todo
		const _item: ITodoData = {
			id: new Date().getTime(),
			content: textValue,
			completed: false,
		}
		
		List.todoData.push(_item) //🚀🚀🚀【静态属性 - 第四步】把新增的数据 push 进 todoData 数组中, 然后再由 AbstractComponent 抽象类进行渲染

		if(List.todoData.length === 1){
			todoItem.innerHTML = ''//如果开始新增数据, 则 =1 , 则清空 '暂无数据’ 的占位符
		}

		todoItem.innerHTML += AbstractComponent.todoView(_item)
	}



	// 🔥🔥删除 list 数据的方法
	public bindEvent() {
		const todoItem: HTMLElement = document.querySelector('.todo-list') as HTMLElement
		todoItem.addEventListener('click', this.handleItemClick.bind(this), false) 
	}


	//点击 list
	private handleItemClick(e: MouseEvent) {
		// 👇整个 list 的点击事件, 💡💡【需要判断点击的元素是什么类型】（是 checkbox 还是 delete 按钮!!）
		const tar = e.target as HTMLElement
		const tagName = tar.tagName.toLowerCase()
		const allTodoItems: HTMLCollection = document.getElementsByClassName('todo-items') //每次点击都需要重新获取一下所有的 todo-items, 记得 getElementsByClassName 的选择器是没有 . 的
		// console.log(allTodoItems);
		// console.log('点击了 list 上的元素类型为:' + tagName)

		if(tagName === 'input' || tagName === 'button') {
			const selectedId: number = parseInt(tar.dataset.id as string) //获取到列表的 data-id 属性

			switch (tagName) {
				case 'input':
					this._handleClickCheckbox(selectedId, allTodoItems)
					break
				case 'button':
					this._handleClickButton(selectedId, allTodoItems)
					break
				default:
					break
			}
		}
	}


	//点击 checkbox
	private _handleClickCheckbox(selectedId:number, allTodoItems:HTMLCollection) {
		// const selectedId: number = parseInt(target.dataset.id as string) //获取到 checkbox 的 data-id 属性
		List.todoData = List.todoData.map((todo:ITodoData, index:number) => {
			if(todo.id === selectedId) {
				todo.completed = !todo.completed //checkbox 取反
				const oneTodoItem = allTodoItems[index].querySelector('span') as HTMLElement
				// console.log(allTodoItems[index]);
				oneTodoItem.style.textDecoration = todo.completed ? 'line-through' : '' //字体划线样式
			}

			return todo
		})
	}


	//点击删除按钮
	private _handleClickButton(selectedId:number, allTodoItems: HTMLCollection) {
		// const selectedId: number = parseInt(target.dataset.id as string) //获取到 button 的 data-id 属性
		List.todoData = List.todoData.filter((todo:ITodoData, index:number) => {
			if(todo.id !== selectedId) {
				return todo //返回为点击删除的 todo 数据
			} else {
				allTodoItems[index].remove()
			}
		})

		if(List.todoData.length === 0) {// 如果全空了则显示回 '暂无数据' 的占位符
			const allTodoItems: HTMLCollection = document.getElementsByClassName('todo-items') 
			const todoItem: HTMLElement = document.querySelector('.todo-list') as HTMLElement
			todoItem.innerHTML = '暂无数据'
		}
	}
}


export default List