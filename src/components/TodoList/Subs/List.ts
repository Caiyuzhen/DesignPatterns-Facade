import { ITodoData } from "../../../Typings"
import AbstractComponent  from "./AbstractComponent"
import './main.css'

export interface IListOptions {
	containerEle: HTMLElement //ð¥ð¥ç¶ç»ä»¶ create åºæ¥ç div å®¹å¨, ç¨æ¥ç»å­ç»ä»¶è®©å­ç»ä»¶æèªå·±æ¸²æè¿è¿ä¸ªå®¹å¨å
	todoData: ITodoData[] //ð¥ð¥è¦æ¸²æçåè¡¨æ¯ todoData çæ°ç»ç±»å
}



class List extends AbstractComponent{

	private options: IListOptions
	private containerEle: HTMLElement
	private static todoData: ITodoData[]  //ðððãéæå±æ§ - ç¬¬ä¸æ­¥ãéæå±æ§æ¯å¯ä¸ç!! å ä¸ºä¸è¦è®©å®å¨å®ä¾åçæ¶åè¿è¡æ´æ¹, å ä¸ºæ¯æ¬¡å®ä¾åçæ¶åé½æ¯åä¸ä¸ª todoData: TodoData , ä¸éè¦æ¯æ¬¡å®ä¾åé½å»æ´æ¹å®

	// åå§å
	constructor(options: IListOptions) { //ç±»åä¸é¢çæ¥å£æ¥å®ä¹, å¨é¨åè£è¿ options å¯¹è±¡ä¸­, éå®ä¸¤ä¸ªåæ° containerEleãtext
		super()
		this.containerEle = options.containerEle //å¨æé å½æ°ä¸­(æ¯æ¬¡å®ä¾åçæ¶åï¼è§£æèµå¼, å ä¸ºåªæ¯ä¸ªå®¹å¨
		List.todoData = options.todoData //ðððãéæå±æ§- ç¬¬äºæ­¥ãä¸è¦è®©å®å¨å®ä¾åçæ¶åè¿è¡æ´æ¹, å ä¸ºæ¯æ¬¡å®ä¾åçæ¶åé½æ¯åä¸ä¸ª todoData: TodoData , ä¸éè¦æ¯æ¬¡å®ä¾åé½å»æ´æ¹å®
	}



	// ð¥æ¸²æè§å¾çæ¹æ³, View å±
	public render() {
		this.containerEle.innerHTML += AbstractComponent.listContainer(List.todoData) //ðððãéæå±æ§ - ç¬¬ä¸æ­¥ãä¼ å¥ todoData æ°æ®ã, ç± AbstractComponent æ½è±¡ç±»è¿è¡æ¸²æ
		// const { todoData } = this.options // è§£æåºæ°æ®
	}



	// ð¥ð¥æ·»å  list æ°æ®çæ¹æ³, ãç± Input ç»ä»¶è°ç¨ã, ä¼ å¥ Input ç»ä»¶åè·å¾ç ãè¾å¥æ¡æ°æ®ãï¼ï¼
	public static addItem(textValue: string) {
		const todoItem: HTMLElement = document.querySelector('.todo-list') as HTMLElement// åå»ä¿å­æ°æ®, é¿åç©ºç¶æçé®é¢(ä¼ç´æ¥æ¾ç¤º 'ææ æ°æ®')
		
		// æ°å¢ä¸æ¡ todo
		const _item: ITodoData = {
			id: new Date().getTime(),
			content: textValue,
			completed: false,
		}
		
		List.todoData.push(_item) //ðððãéæå±æ§ - ç¬¬åæ­¥ãææ°å¢çæ°æ® push è¿ todoData æ°ç»ä¸­, ç¶ååç± AbstractComponent æ½è±¡ç±»è¿è¡æ¸²æ

		if(List.todoData.length === 1){
			todoItem.innerHTML = ''//å¦æå¼å§æ°å¢æ°æ®, å =1 , åæ¸ç©º 'ææ æ°æ®â çå ä½ç¬¦
		}

		todoItem.innerHTML += AbstractComponent.todoView(_item)
	}



	// ð¥ð¥å é¤ list æ°æ®çæ¹æ³
	public bindEvent() {
		const todoItem: HTMLElement = document.querySelector('.todo-list') as HTMLElement
		todoItem.addEventListener('click', this.handleItemClick.bind(this), false) 
	}


	//ç¹å» list
	private handleItemClick(e: MouseEvent) {
		// ðæ´ä¸ª list çç¹å»äºä»¶, ð¡ð¡ãéè¦å¤æ­ç¹å»çåç´ æ¯ä»ä¹ç±»åãï¼æ¯ checkbox è¿æ¯ delete æé®!!ï¼
		const tar = e.target as HTMLElement
		const tagName = tar.tagName.toLowerCase()
		const allTodoItems: HTMLCollection = document.getElementsByClassName('todo-items') //æ¯æ¬¡ç¹å»é½éè¦éæ°è·åä¸ä¸ææç todo-items, è®°å¾ getElementsByClassName çéæ©å¨æ¯æ²¡æ . ç
		// console.log(allTodoItems);
		// console.log('ç¹å»äº list ä¸çåç´ ç±»åä¸º:' + tagName)

		if(tagName === 'input' || tagName === 'button') {
			const selectedId: number = parseInt(tar.dataset.id as string) //è·åå°åè¡¨ç data-id å±æ§

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


	//ç¹å» checkbox
	private _handleClickCheckbox(selectedId:number, allTodoItems:HTMLCollection) {
		// const selectedId: number = parseInt(target.dataset.id as string) //è·åå° checkbox ç data-id å±æ§
		List.todoData = List.todoData.map((todo:ITodoData, index:number) => {
			if(todo.id === selectedId) {
				todo.completed = !todo.completed //checkbox åå
				const oneTodoItem = allTodoItems[index].querySelector('span') as HTMLElement
				// console.log(allTodoItems[index]);
				oneTodoItem.style.textDecoration = todo.completed ? 'line-through' : '' //å­ä½åçº¿æ ·å¼
			}

			return todo
		})
	}


	//ç¹å»å é¤æé®
	private _handleClickButton(selectedId:number, allTodoItems: HTMLCollection) {
		// const selectedId: number = parseInt(target.dataset.id as string) //è·åå° button ç data-id å±æ§
		List.todoData = List.todoData.filter((todo:ITodoData, index:number) => {
			if(todo.id !== selectedId) {
				return todo //è¿åä¸ºç¹å»å é¤ç todo æ°æ®
			} else {
				allTodoItems[index].remove()
			}
		})

		if(List.todoData.length === 0) {// å¦æå¨ç©ºäºåæ¾ç¤ºå 'ææ æ°æ®' çå ä½ç¬¦
			const allTodoItems: HTMLCollection = document.getElementsByClassName('todo-items') 
			const todoItem: HTMLElement = document.querySelector('.todo-list') as HTMLElement
			todoItem.innerHTML = 'ææ æ°æ®'
		}
	}
}


export default List