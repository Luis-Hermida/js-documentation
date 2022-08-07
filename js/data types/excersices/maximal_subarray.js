// The task is: find the contiguous subarray of arr with the maximal sum of items.
// O(n^2)
let getMaxSubSum = (arr) => {
  let maxSumValue = 0;

  for (let index = 0; index < arr.length; index++) {
    currentSumValue = 0;

    for (let j = index; j < arr.length; j++) {
      currentSumValue += arr[j];
      maxSumValue = Math.max(maxSumValue, currentSumValue);
    }
  }

  console.log(maxSumValue);
};

// O(n)
getMaxSubSum = (arr) => {
  let maxSumValue = 0;
  let currentSumValue = 0;

  arr.forEach((value) => {
    currentSumValue += value;
    maxSumValue = Math.max(maxSumValue, currentSumValue);
    if (currentSumValue < 0) currentSumValue = 0;
  });

  console.log(maxSumValue);
};

getMaxSubSum([-1, 2, 3, -9]); // 5 - [2, 3]
getMaxSubSum([2, -1, 2, 3, -9]); // 6 - [2, -1, 2, 3]
getMaxSubSum([-1, 2, 3, -9, 11]); // 11 - [11]
getMaxSubSum([-2, -1, 1, 2]); // 3 - [1, 2]
getMaxSubSum([100, -9, 2, -3, 5]); // 100 - [100]
getMaxSubSum([1, 2, 3]); // 6 - [1, 2, 3]
getMaxSubSum([-1, -2, -3]); // 0 - []
