import { ITodoData } from "../../../Typings"



// 用🔥🔥来管理跟组件相关的【方法】、【视图】 的渲染层！
abstract class AbstractComponent {

	// 🔥渲染 Input 视图的方法, protected 表示【当前类】跟【子类】可以去访问这个方法, 其他【外部】则不能访问
	protected static inputView(placeholderText: string, buttonText: string): string {
		return `
			<div class='todo-bar'>
				<input type="text" class="todo-input" placeholder=${placeholderText}>
				<button class="add-button">${buttonText}</button>
			</div>
		`
	}


	// 🔥渲染整个 List 容器的方法
	protected static listContainer(data: ITodoData[]): string {
		return `
			<div class="todo-list">
			${
				//👇是个三元运算符, 有 todo 数据则有长度, 会 > 0, 隐式转化为 true, 于是开始渲染数据
				data.length ?
				data.map((todo: ITodoData) => {
					return AbstractComponent.todoView(todo) //🚀🚀🚀调用自己的静态方法, 渲染每条 List 的方法!!!
				}) 
				: 
				'暂无数据'
			}
			</div>
		`.split(',').join('')	/* 去掉逗号的方法, 表示【先将将字符串分割为逗号分隔的数组】然后再【将数组中的所有元素组合成一个字符串】 */
	}


	// 🔥渲染每条 List 的方法
	protected static todoView(todo: ITodoData): string {
		const { id, content, completed } = todo
			/*	数据结构:
			{
				id: 1,
				content: 'hey',
				completed: true,
			},
		*/
		// console.log(id, content, completed);
		//line-through; 为文本装饰线
		return `
			<div class="todo-items">	
				<div class="pre-content">
					<input 
						type="checkbox" 
						data-id="${id}"
						${completed ? 'checked' : ''} 
						>
					<span 
						style="text-decoration: ${completed ? 'line-through;' : '' }"
					>
						${content}
					</span>
				</div>
				<button data-id="${id}" class="del-button">删除</button>
			</div>
		`
	}

}


export default AbstractComponent