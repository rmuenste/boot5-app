export function simpleShuffle(inputArray: Array<any>): Array<any> {
  let j, i: number;
  let perm = Array(inputArray.length).fill(0);

  for( i = inputArray.length - 1; i > 0; i-- ) {
    j = Math.floor(Math.random() * (i + 1));
    let x = {...inputArray[i]};

    // Swap these elements
    inputArray[i] = inputArray[j];
    inputArray[j] = x;
    perm[j] = i;

  }
  console.log(perm);

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

export function generatePermutation(size: number) : Array<number> {

  let j, i: number;
  let sequence = Array.from(Array(size), (_, index) => index);

  let permutation = []; // = Array(inputArray.length).fill(0);

  while (sequence.length > 0) {
    let idx = Math.floor(Math.random() * (sequence.length));
    i = sequence[idx];

    let temp = sequence[sequence.length - 1];
    sequence[sequence.length - 1] = i;
    sequence[idx] = temp;

    permutation.push(sequence.pop());
  }

  return permutation;

}


export function permutationShuffe(inputArray: Array<any>) {

  let j, i: number;

  let permutation = generatePermutation(inputArray.length);
  console.log(`permutation =${permutation}`);
  let outputArray = [];

  for(i = 0; i < inputArray.length; i++) {
    outputArray.push(inputArray[permutation[i]]);
  }

  return [outputArray, permutation]
}

export default myDefault;
