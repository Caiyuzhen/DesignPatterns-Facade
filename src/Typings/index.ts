export interface ITodoData { //🔥定义一个对象类型, 然后引用的时候 ITodoData[] 来定义数组
	id: number;
	content: string;
	completed: boolean;
}