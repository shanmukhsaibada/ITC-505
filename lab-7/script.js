function sanitizeInput(input) {
    let element = document.createElement('div');
    element.innerText = input;
    return element.innerHTML;
}

document.getElementById('madLibForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let noun = sanitizeInput(document.getElementById('noun').value);
    let verb = sanitizeInput(document.getElementById('verb').value);
    let adjective = sanitizeInput(document.getElementById('adjective').value);
    let pluralNoun = sanitizeInput(document.getElementById('pluralNoun').value);
    let place = sanitizeInput(document.getElementById('place').value);

    // Check for empty fields
    if (!noun || !verb || !adjective || !pluralNoun || !place) {
        alert('All fields are required.');
        return;
    }

    // Form the Mad Lib sentence
    let madLib = `Once upon a time, a ${adjective} ${noun} decided to ${verb} with some ${pluralNoun} in ${place}.`;

    // Display the result
    document.getElementById('madLibResult').innerHTML = `<p>${madLib}</p>`;
});
