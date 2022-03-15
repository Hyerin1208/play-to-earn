export function upLeftTranspose(numbers) {
    let copy = Array(numbers[0].length);
    for (let i = 0; i < numbers[0].length; ++i) {
        copy[i] = Array(numbers.length);
    }
    for (let i = 0; i < numbers.length; ++i) {
        for (let j = 0; j < numbers[i].length; ++j) {
            copy[j][i] = numbers[i][j];
        }
    }
    return copy;
}

export function upDownTranspose(numbers) {
    let copy = Array(numbers.length);
    for (let i = 0; i < numbers.length; ++i) {
        copy[i] = numbers[numbers.length - i - 1];
    }
    return copy;
}

export function leftRightTranspose(numbers) {
    numbers = upLeftTranspose(numbers);
    numbers = upDownTranspose(numbers);
    numbers = upLeftTranspose(numbers);
    return numbers;
}