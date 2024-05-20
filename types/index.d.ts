type Steps = { 
	id: 1 | 2 | 3 | 4 | 5;
	name: string;
}[]

type StepId = Steps[number]['id']