const story = {
    start: {
        text: "You wake up in a mysterious forest. Do you go left or right?",
        choices: [
            { text: "Left", next: "leftPath" },
            { text: "Right", next: "rightPath" }
        ],
        image: "startthegame.jpeg"
    },
    leftPath: {
        text: "You encounter a river. Do you swim across or walk along the bank?",
        choices: [
            { text: "Swim across", next: "swim" },
            { text: "Walk along the bank", next: "walkBank" }
        ],
        image: "rivers.webp"
    },
    rightPath: {
        text: "You find a cabin. Do you enter or keep walking?",
        choices: [
            { text: "Enter the cabin", next: "cabin" },
            { text: "Keep walking", next: "keepWalking" }
        ],
        image: "cabins.jpg"
    },
    swim: {
        text: "You swam across the river and reached a village. The villagers welcome you. THE END.",
        choices: [],
        image: "villagers.webp"
    },
    walkBank: {
        text: "You walked along the bank and found a boat. You sailed to a distant land. THE END.",
        choices: [],
        image: "boatt.png"
    },
    cabin: {
        text: "You enter the cabin and find treasure. You live a rich life. THE END.",
        choices: [],
        image: "treasures.jpg"
    },
    keepWalking: {
        text: "You kept walking and found a hidden path leading to a beautiful garden. THE END.",
        choices: [],
        image: "garden.webp"
    }
    // Add more story paths and endings here
};

let currentStage = "start";

function startGame() {
    currentStage = "start";
    updatePage();
}

function updatePage() {
    const stage = story[currentStage];
    document.getElementById('story').innerText = stage.text;
    document.getElementById('image').innerHTML = `<img src="${stage.image}" alt="Stage Image">`;
    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';
    stage.choices.forEach(choice => {
        const button = document.createElement('button');
        button.innerText = choice.text;
        button.addEventListener('click', () => {
            currentStage = choice.next;
            updatePage();
        });
        choicesDiv.appendChild(button);
    });
}

window.onload = startGame;
