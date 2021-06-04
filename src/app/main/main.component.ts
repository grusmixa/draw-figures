import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Figure } from '../figure.model';
import { DataSource } from '../datasource.model';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FigureService } from '../services/figure.service';
import { Line } from './models/line.model';
import { Rectangle } from './models/rectangle.model';
import { Triangle } from './models/triangle.model';
import { Circle } from './models/circle.model';
import { Ellipse } from './models/ellipse.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less'],
})
export class MainComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D | null;
  private dataSource: DataSource;
  private figures: Figure[];
  myForm: FormGroup;

  private figureService: FigureService;
  private locator = (p: Figure, id: number) => p.id == id;

  constructor() {
    this.dataSource = new DataSource();
    this.figures = new Array<Figure>();
    this.dataSource.getData().forEach((p) => this.figures.push(p));
    this.myForm = new FormGroup({
      figuresLines: new FormArray([new FormControl()]),
    });
    this.figureService = new FigureService();
  }

  ngOnInit(): void {
    this.ctx = (this.canvas.nativeElement as HTMLCanvasElement).getContext(
      '2d'
    );
    if (sessionStorage.getItem('lines')) {
      this.figures = JSON.parse(sessionStorage.getItem('lines')!);
      this.figures.forEach((figure) => {
        this.dataSource.setData(figure);
      });
      if (this.figures.length > 1) {
        for (let i = 1; i < this.figures.length; i++) {
          (<FormArray>this.myForm.controls['figuresLines']).push(
            new FormControl('')
          );
        }
      }
      (<FormArray>this.myForm.controls['figuresLines']).controls.forEach(
        (contr, idx) => {
          contr.setValue(this.figures[idx].command);
        }
      );
    } else {
      (<FormArray>this.myForm.controls['figuresLines']).removeAt(0);
      this.addFigure();
    }
  }

  getFigures(): Figure[] {
    return this.figures;
  }

  getFigure(id: number): Figure {
    return this.figures.find((p) => this.locator(p, id))!;
  }

  getFormsControls(): string[] {
    return (this.myForm.controls['figuresLines'] as FormArray).value;
  }

  addFigure(): void {
    const figure = new Figure(this.generateID(), false, '', '');
    (<FormArray>this.myForm.controls['figuresLines']).push(new FormControl(''));
    this.figures.push(figure);
    this.dataSource.setData(figure);
    sessionStorage.setItem('lines', JSON.stringify(this.figures));
  }

  deleteFigure(id: number): void {
    let index = this.figures.findIndex((p) => this.locator(p, id));
    if (index > -1 && this.figures.length > 1) {
      this.figures.splice(index, 1);
      (<FormArray>this.myForm.controls['figuresLines']).removeAt(index);
      this.dataSource.deleteData(index);
    }

    sessionStorage.setItem('lines', JSON.stringify(this.figures));
  }

  clear(): void {
    this.ctx!.clearRect(
      0,
      0,
      (this.canvas.nativeElement as HTMLCanvasElement).width,
      (this.canvas.nativeElement as HTMLCanvasElement).height
    );
  }

  private generateID(): number {
    let candidate = 0;
    while (this.getFigure(candidate) != null) {
      candidate++;
    }
    return candidate;
  }

  saveFigures() {
    this.figures.forEach((figure) => console.log(figure.id));
    let arrLines: string[] = this.getFormsControls();
    arrLines.forEach((val, idx) => {
      this.figures[idx].command = val;
    });

    this.paint(this.figureService.print(this.figures));
    sessionStorage.setItem('lines', JSON.stringify(this.figures));
  }

  paint(prints: (Line | Triangle | Rectangle | Circle | Ellipse | string)[]) {
    this.figures.forEach((figure) => {
      figure.error = false;
      figure.errorMessage = '';
    });

    this.clear();
    let error = false;
    for (let i = 0; i < prints.length; i++) {
      if (typeof prints[i] === 'string') {
        this.figures[i].error = true;
        this.figures[i].errorMessage = prints[i] as string;
        error = true;
      }
    }
    if (error === false) {
      (prints as (Line | Triangle | Rectangle | Circle | Ellipse)[]).forEach(
        (figure) => {
          this.ctx!.beginPath();
          
          if (figure instanceof Line) {
            this.ctx!.moveTo(figure.x1, figure.y1);
            this.ctx!.lineTo(figure.x2, figure.y2);
            if (figure.color !== '') this.ctx!.strokeStyle = figure.color!;
            this.ctx!.stroke();
          } 
          else if (figure instanceof Rectangle) {
            this.ctx!.rect(
              figure.x1,
              figure.y1,
              figure.x2 - figure.x1,
              figure.y2 - figure.y1
            );
            if (figure.color !== '') this.ctx!.strokeStyle = figure.color!;
            this.ctx!.stroke();
            if (figure.background !== '') {
              this.ctx!.fillStyle = figure.background!;
              this.ctx!.fill();
            }
          } 
          else if (figure instanceof Triangle) {
            this.ctx!.moveTo(figure.x1, figure.y1);
            this.ctx!.lineTo(figure.x2, figure.y2);
            this.ctx!.lineTo(figure.x3, figure.y3);
            this.ctx!.closePath();

            if (figure.color !== '') {
              this.ctx!.strokeStyle = figure.color!;
            }
            this.ctx!.stroke();

            if (figure.background !== '') {
              this.ctx!.fillStyle = figure.background!;
              this.ctx!.fill();
            }
          } 
          else if (figure instanceof Circle) {
            this.ctx!.arc(figure.x1, figure.y1, figure.radius, 0, 2 * Math.PI);
            if (figure.color !== '') this.ctx!.strokeStyle = figure.color!;
            this.ctx!.stroke();
            if (figure.background !== '') {
              this.ctx!.fillStyle = figure.background!;
              this.ctx!.fill();
            }
          } 
          else if (figure instanceof Ellipse) {
            this.ctx!.ellipse(
              figure.x1,
              figure.y1,
              figure.radius1,
              figure.radius2,
              0,
              0,
              2 * Math.PI
            );
            if (figure.color !== '') this.ctx!.strokeStyle = figure.color!;
            this.ctx!.stroke();
            if (figure.background !== '') {
              this.ctx!.fillStyle = figure.background!;
              this.ctx!.fill();
            }
          }
        }
      );
    }
    error = false;
  }
}
