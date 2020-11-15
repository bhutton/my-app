export function fibonacciCalculator(num) {
    if (num === 1) return [0];

    const response = [0, 1];

    for (let i = 2; i < num; i++) {
        response.push(response[i - 1] + response[i - 2]);
    }

    return response;
}

export function fibonacciToString(num) {
    const fibonacciSequence = `[${fibonacciCalculator(num)}]`;
    return fibonacciSequence;
}
