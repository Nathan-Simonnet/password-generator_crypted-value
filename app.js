
const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerChars = upperChars.toLocaleLowerCase();
const numbers = '0123456789';
const symbols = '!@#$%^()_+[]{};:,.?';
const allCharsArray = [lowerChars, upperChars, numbers, symbols];

let selectedCharsObject = {
    lowerChars: true,
    upperChars: false,
    numbers: false,
    symbols: false,
}

// Checkboxes
// ===============================================

const checkboxes = document.querySelectorAll("input[type='checkbox'");
checkboxes.forEach((checkbox) => {
    // Keyboard friendly
    checkbox.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.target.click();
        };
    });
    // checkbox.addEventListener('input', checkBoxHandler);
});

// function checkBoxHandler(e) {
//     const checkbox = e.target
//     if (checkbox.checked) {
//         selectedCharsObject[checkbox.dataset.char] = true;
//     } else {
//         selectedCharsObject[checkbox.dataset.char] = false;
//     }
// }

// Range
// ==============================================
const passwordRange = document.getElementById('password-range');
const passwordRangeDisplay = document.getElementById('password-range-display');
passwordRange.addEventListener('input', passwordRangeHandler);

function passwordRangeHandler(e) {
    passwordRangeDisplay.textContent = e.target.value;
}

// Submit
// =====================================

const generatePasswordButton = document.getElementById('generate-password-button');
const passwordDisplay = document.getElementById('password-display')
generatePasswordButton.addEventListener('click', generatePassword);
function generatePassword() {
    let selectedCharsArray = [];
    // let index = 0;

    // for (const key in selectedCharsObject) {
    //     // console.log(selectedCharsObject[key]);
    //     if (selectedCharsObject[key] === true) {
    //         selectedCharsArray.push(...allCharsArray[index])
    //     }
    //     index++;
    // };

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            selectedCharsArray.push(...allCharsArray[checkbox.id[checkbox.id.length - 1]])
        }
    });

    console.log(selectedCharsArray)

    const randomIndexes = new Uint32Array(passwordRange.value);
    crypto.getRandomValues(randomIndexes);

    const passwordGenerated = Array.from(randomIndexes, (cryptedIndex) => {
        const randomIndexParsed = cryptedIndex % selectedCharsArray.length;
        return selectedCharsArray[randomIndexParsed];
    });

    console.log(passwordGenerated);
    passwordDisplay.textContent = passwordGenerated.join("");
}; generatePassword();

const copyBtn = document.getElementById('copy-btn');
copyBtn.addEventListener('click', copyPasswordButtonHandler);
function copyPasswordButtonHandler() {
    let currentPassword = passwordDisplay.textContent;
    navigator.clipboard.writeText(currentPassword);

    generatePasswordButton.textContent = "Copié !"
    setTimeout(() => {
        generatePasswordButton.textContent = "Générer";
    },1000)
}