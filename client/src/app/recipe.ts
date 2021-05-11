export class Recipe {

  constructor(
    public name: string,
    public ingredients: string,
    public steps: string,
	public timers: number,
	public imageURL: string
  ) {  }

}