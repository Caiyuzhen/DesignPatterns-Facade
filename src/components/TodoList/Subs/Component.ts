// 用🔥🔥来管理跟组件相关的【方法】、【视图】
abstract class Component {
	// 🔥渲染视图的方法, protected 表示【当前类】跟【子类】可以去访问这个方法, 其他【外部】则不能访问
	protected static inputView(placeholderText: string, buttonText: string): string {
		return `
			<div>
				<input type="text" class="todo-input" placeholder=${placeholderText}
				<button class="ass-button">${buttonText}</button>
			</div>
		`
	}

}


export default Component