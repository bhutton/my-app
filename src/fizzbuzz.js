export function calculateFizzBuzz(num) {
    let response = '';
    if (num % 3 === 0) response += 'fizz';
    if (num % 5 === 0) response += 'buzz';

    if (response === '') return num;
    return response;
}
