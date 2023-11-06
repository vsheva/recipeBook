export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;

  //assign arguments, we receive, to the properties of our object- our class
  constructor(name:string, desc:string, imagePath:string) {
    this.name=name;
    this.description=desc;
    this.imagePath=imagePath;
  }
}
