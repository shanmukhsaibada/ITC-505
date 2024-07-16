function sortNumbers() {
    const input = document.getElementById('numbers').value;
    const array = input.split(',').map(Number);
    bubbleSort(array);
    document.getElementById('result').innerText = array.join(', ');
}

function bubbleSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
}
