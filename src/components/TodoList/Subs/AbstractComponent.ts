import { ITodoData } from "../../../Typings"



// 用🔥🔥来管理跟组件相关的【方法】、【视图】
abstract class AbstractComponent {

	// 🔥渲染 Input 视图的方法, protected 表示【当前类】跟【子类】可以去访问这个方法, 其他【外部】则不能访问
	protected static inputView(placeholderText: string, buttonText: string): string {
		return `
			<div>
				<input type="text" class="todo-input" placeholder=${placeholderText}
				<button class="ass-button">${buttonText}</button>
			</div>
		`
	}


	// 🔥渲染整个 List 容器的方法
	protected static listViewContainer(data: ITodoData[]): string {
		return `
			<div class="todo-list">
			${
				//👇是个三元运算符, 有 todo 数据则有长度, 会 > 0, 隐式转化为 true, 于是开始渲染数据
				data.length ?
				data.map((todo: ITodoData) => {
					return AbstractComponent.todolistView(todo) //🚀🚀🚀调用自己的静态方法, 渲染每条 List 的方法!!!
				}) 
				: 
				'暂无数据'
			}
			</div>
		`
	}


	// 🔥渲染每条 List 的方法
	protected static todolistView(todo: ITodoData): string {
		/*	数据结构:
			{
				id: 1,
				content: 'hey',
				completed: true,
			},
		*/
		const { id, content, completed } = todo
		return `
			<div class="toto-item>	
				<input 
					type="checkbox" 
					data-id="${id}">
					${completed ? 'checked' : ''} 
				</input>
				<span style="text-decoration: ${completed ? 'list-lineStyle' : '' }">${content}</span>
				<button data-id="${id}">删除</button>
			</div>
		`
	}

}


export default AbstractComponent