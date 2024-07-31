export enum InputType {
  TEXT = 'text',
  NUMBER = 'number',
  DATE = 'date',
  LIST = 'list',
  HTML = 'html',
}

export function getInputType(columnType: InputType): string {
  switch (columnType) {
    case InputType.NUMBER:
      return 'number';
    case InputType.DATE:
      return 'date';
    case InputType.LIST:
      return 'list';
    case InputType.HTML:
      return 'html';
    default:
      return 'text';
  }
}
