import {Figure} from "./figure.model";

export class DataSource {
    private data:Figure[];
    constructor() {
    this.data = new Array<Figure>();
 }
 
 getData(): Figure[] {
    return this.data;
 }

 setData(figure: Figure): void {
     this.data.push(figure);
 }

 deleteData(id: number) {
    this.data.splice(id, 1);
 }
}