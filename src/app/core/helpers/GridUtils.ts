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

  static getValueFromQueryByParameterName(fieldString: string, fieldName: string): any {
    const fieldPairs = fieldString.split('&');
  for (const pair of fieldPairs) {
    const [name, value] = pair.split('=');
    if (name === fieldName) {
      if (value === 'undefined') {
        return undefined;
      } else if (!isNaN(Number(value))) {
        return Number(value);
      } else {
        return value;
      }
    }
  }
  return undefined;
  }
  static filterFieldsFromString(inputString: string, fieldsToKeep: string[]): string {
    // Split the input string by '&' to get individual field-value pairs
    const fieldPairs = inputString.split('&');

    // Initialize an array to store the filtered field-value pairs
    const filteredPairs: string[] = [];

    // Iterate through the field-value pairs
    for (const pair of fieldPairs) {
      // Split each pair by '=' to get the field name and value
      const [fieldName, fieldValue] = pair.split('=');

      // Check if the current field name is in the list of fields to keep
      if (fieldsToKeep.some(field => fieldName.startsWith(field))) {
        // Add the current field-value pair to the filtered array
        filteredPairs.push(pair);
      }
    }

    // Join the filtered field-value pairs back into a string
    return filteredPairs.join('&');
  }

}
