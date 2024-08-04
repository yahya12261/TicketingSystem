export class GridUtils{

  static getDataFromObject(object: any, field: string): any {
    const fieldParts = field.split('.');
    let currentObject = object;

    for (let i = 0; i < fieldParts.length; i++) {
      const part = fieldParts[i];
      if (!currentObject[part]) {
        return "";
      }
      currentObject = currentObject[part];
    }

    return currentObject;
  }

}
