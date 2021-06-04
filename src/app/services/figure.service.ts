import { Injectable } from '@angular/core';
import { Figure } from '../figure.model';
import { Line } from '../main/models/line.model';
import { Rectangle } from '../main/models/rectangle.model';
import { Triangle } from '../main/models/triangle.model';
import { Circle } from '../main/models/circle.model';
import { Ellipse } from '../main/models/ellipse.model';

@Injectable({
  providedIn: 'root',
})
export class FigureService {
  constructor() {}

  print(data: Figure[]): (Line | Triangle | Rectangle | Circle | Ellipse | string)[] {
    let outFigures: ( Line | Triangle | Rectangle | Circle | Ellipse | string)[] = [];

    data.forEach((figure) => {
      let type: string;
      let error: boolean = false;
      let errorMessage: string = '';
      let x1: number;
      let x2: number;
      let x3: number;
      let y1: number;
      let y2: number;
      let y3: number;
      let color: string = '';
      let radius: number;
      let radius2: number;
      let background: string = '';
      let outFig: Line | Triangle | Rectangle | Circle | Ellipse | string;
      let comm: string = figure.command!;
      let arrComm: string[] = comm.split(/[\s,]+/);

      for (let i = 0; i < arrComm.length; i++) {
        if (arrComm[i] === 'line') type = 'line';
        else if (arrComm[i] === 'rectangle') type = 'rectangle';
        else if (arrComm[i] === 'triangle') type = 'triangle';
        else if (arrComm[i] === 'circle') type = 'circle';
        else if (arrComm[i] === 'ellipse') type = 'ellipse';

        if (arrComm[i] === '-p') {
          if (type! === 'line' || type! === 'rectangle') {
            if (
              arrComm[i + 1] == undefined ||
              arrComm[i + 2] == undefined ||
              arrComm[i + 3] == undefined ||
              arrComm[i + 4] == undefined
            ) {
              error = true;
              errorMessage = 'Enter the valid count of points!';
              break;
            }
            x1 = arrComm[++i].replace(/[^0-9]/g, '') !== '' ? +arrComm[i].replace(/[^0-9]/g, '') : -1;
            y1 = arrComm[i + 1].replace(/[^0-9]/g, '') !== '' ? +arrComm[i + 1].replace(/[^0-9]/g, '') : -1;
            x2 = arrComm[i + 2].replace(/[^0-9]/g, '') !== '' ? +arrComm[i + 2].replace(/[^0-9]/g, '') : -1;
            y2 = arrComm[i + 3].replace(/[^0-9]/g, '') !== '' ? +arrComm[i + 3].replace(/[^0-9]/g, '') : -1;
            i = i + 3;

            if (x1 === -1 || x2 === -1 || y1 === -1 || y2 === -1) {
              error = true;
              errorMessage = 'Enter the valid count of points!';
              break;
            }
          } 
          else if (type! === 'triangle') {
            if (
              arrComm[i + 1] == undefined ||
              arrComm[i + 2] == undefined ||
              arrComm[i + 3] == undefined ||
              arrComm[i + 4] == undefined ||
              arrComm[i + 5] == undefined ||
              arrComm[i + 6] == undefined
            ) {
              error = true;
              errorMessage = 'Enter the valid count of points!';
              break;
            }
            x1 = arrComm[++i].replace(/[^0-9]/g, '') !== '' ? +arrComm[i].replace(/[^0-9]/g, '') : -1;
            y1 = arrComm[i + 1].replace(/[^0-9]/g, '') !== '' ? +arrComm[i + 1].replace(/[^0-9]/g, '') : -1;
            x2 = arrComm[i + 2].replace(/[^0-9]/g, '') !== '' ? +arrComm[i + 2].replace(/[^0-9]/g, '') : -1;
            y2 = arrComm[i + 3].replace(/[^0-9]/g, '') !== '' ? +arrComm[i + 3].replace(/[^0-9]/g, '') : -1;
            x3 = arrComm[i + 4].replace(/[^0-9]/g, '') !== '' ? +arrComm[i + 4].replace(/[^0-9]/g, '') : -1;
            y3 = arrComm[i + 5].replace(/[^0-9]/g, '') !== '' ? +arrComm[i + 5].replace(/[^0-9]/g, '') : -1;

            i = i + 5;

            if (
              x1 === -1 ||
              x2 === -1 ||
              x3 === -1 ||
              y1 === -1 ||
              y2 === -1 ||
              y3 === -1
            ) {
              error = true;
              errorMessage = 'Enter the valid count of points!';
              break;
            }
          } 
          else if (type! === 'circle' || type! === 'ellipse') {
            if (arrComm[i + 1] == undefined || arrComm[i + 2] == undefined) {
              error = true;
              errorMessage = 'Enter the valid count of points!';
              break;
            }
            x1 = arrComm[++i].replace(/[^0-9]/g, '') !== '' ? +arrComm[i].replace(/[^0-9]/g, '') : -1;
            y1 = arrComm[i + 1].replace(/[^0-9]/g, '') !== '' ? +arrComm[i + 1].replace(/[^0-9]/g, '') : -1;

            i = i + 1;
            if (x1 === -1 || y1 === -1) {
              error = true;
              errorMessage = 'Enter the valid count of points!';
              break;
            }
          }
        }

        if (arrComm[i] === '-r' || arrComm[i] === '-r1') {
          if (arrComm[i + 1] === undefined) {
            error = true;
            errorMessage = 'Enter the radius!';
            break;
          }
          radius = arrComm[++i].replace(/[^0-9-]/g, '') !== '' ? +arrComm[i].replace(/[^0-9-]/g, '') : -1;

          if (radius < 0) {
            error = true;
            errorMessage =
              'The radius cannot be less than 0. Enter the correct value!';
            break;
          } 
          else if (isNaN(radius)) {
            error = true;
            errorMessage = 'Enter the correct radius value!';
            break;
          }
        }
        if (arrComm[i] === '-r2') {
          if (arrComm[i + 1] === undefined) {
            error = true;
            errorMessage = 'Enter the radius!';
            break;
          }
          radius2 = arrComm[++i].replace(/[^0-9-]/g, '') !== '' ? +arrComm[i].replace(/[^0-9-]/g, '') : -1;

          if (radius2 < 0) {
            error = true;
            errorMessage =
              'The radius cannot be less than 0. Enter the correct value!';
            break;
          }
        }

        if (arrComm[i] === '-c') {
          if (arrComm[i + 1].includes('rgba')) {
            if (
              arrComm[i + 1] == undefined ||
              arrComm[i + 2] == undefined ||
              arrComm[i + 3] == undefined ||
              arrComm[i + 4] == undefined
            ) {
              error = true;
              errorMessage = 'Enter the valid color!';
              break;
            }
            color = `${arrComm[++i]},${arrComm[++i]},${arrComm[i + 1]},${arrComm[i + 2]}`;
            i = i + 2;
          } 
          else if (arrComm[i + 1].includes('rgb')) {
            if (
              arrComm[i + 1] == undefined ||
              arrComm[i + 2] == undefined ||
              arrComm[i + 3] == undefined
            ) {
              error = true;
              errorMessage = 'Enter the valid color!';
              break;
            }
            color = `${arrComm[++i]},${arrComm[++i]},${arrComm[i + 1]}`;
            i = i + 1;
          } 
          else if (arrComm[i + 1].includes('#')) color = arrComm[++i];
          else {
            error = true;
            errorMessage = 'Use the available color format!';
            break;
          }
        }

        if (arrComm[i] === '-b') {
          if (arrComm[i + 1].includes('rgba')) {
            if (
              arrComm[i + 1] == undefined ||
              arrComm[i + 2] == undefined ||
              arrComm[i + 3] == undefined ||
              arrComm[i + 4] == undefined
            ) {
              error = true;
              errorMessage = 'Enter the valid color!';
              break;
            }
            background = `${arrComm[++i]},${arrComm[++i]},${arrComm[i + 1]},${arrComm[i + 2]}`;
            i = i + 2;
          } 
          else if (arrComm[i + 1].includes('rgb')) {
            if (
              arrComm[i + 1] == undefined ||
              arrComm[i + 2] == undefined ||
              arrComm[i + 3] == undefined
            ) {
              error = true;
              errorMessage = 'Enter the valid color!';
              break;
            }
            background = `${arrComm[++i]},${arrComm[++i]},${arrComm[i + 1]}`;
            i = i + 1;
          } 
          else if (arrComm[i + 1].includes('#')) background = arrComm[++i];
          else {
            error = true;
            errorMessage = 'Use the available color format!';
            break;
          }
        }
      }
      if (type! === 'circle' && radius! == undefined) {
        error = true;
        errorMessage = 'Enter the radius!';
      } 
      else if (
        type! === 'ellipse' &&
        (radius! == undefined || radius2! == undefined)
      ) {
        error = true;
        errorMessage = 'Enter the radius!';
      }

      if (error === true) {
        outFigures.push(errorMessage);
        error = false;
        errorMessage = '';
      } 
      else {
        if (type! === 'line') outFig = new Line(x1!, x2!, y1!, y2!, color!);
        else if (type! === 'rectangle')
          outFig = new Rectangle(x1!, x2!, y1!, y2!, color!, background!);
        else if (type! === 'triangle')
          outFig = new Triangle(
            x1!,
            x2!,
            x3!,
            y1!,
            y2!,
            y3!,
            color!,
            background!
          );
        else if (type! === 'circle')
          outFig = new Circle(x1!, y1!, radius!, color!, background!);
        else if (type! === 'ellipse')
          outFig = new Ellipse(
            x1!,
            y1!,
            radius!,
            radius2!,
            color!,
            background!
          );

        outFigures.push(outFig!);
      }
    });
    return outFigures;
  }
}