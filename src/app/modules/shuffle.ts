export function simpleShuffle(inputArray: Array<any>): Array<any> {
  let j, i: number;

  for( i = inputArray.length - 1; i > 0; i-- ) {
    j = Math.floor(Math.random() * (i + 1));
    let x = {...inputArray[i]};

    // Swap these elements
    inputArray[i] = inputArray[j];
    inputArray[j] = x;
  }

  return inputArray;
}

function myDefault(inputArray: Array<any>): Array<any> {
  let j, x, i: number;

  for( i = inputArray.length - 1; i > 0; i-- ) {
    j = Math.floor(Math.random() * (i + 1));
    x = inputArray[i];
    inputArray[i] = inputArray[j];
    inputArray[j] = x;
  }

  return inputArray;
}

export default myDefault;
