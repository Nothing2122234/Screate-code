// Encode aur Decode ke liye maps
const encodeMap = {};
const decodeMap = {};

// Add uppercase alphabet mapping (A-Z)
for (let i = 0; i < 26; i++) {
    let letter = String.fromCharCode(65 + i); // A = 65 in ASCII
    let encodedValue = 126 + (i * 99);  // Formula for encoding letters (A-Z)
    encodeMap[letter] = encodedValue;
    decodeMap[encodedValue] = letter;
}

// Add lowercase alphabet mapping (a-z)
for (let i = 0; i < 26; i++) {
    let letter = String.fromCharCode(97 + i); // a = 97 in ASCII
    let encodedValue = 2000 + (i * 99);  // Formula for encoding lowercase letters (a-z)
    encodeMap[letter] = encodedValue;
    decodeMap[encodedValue] = letter;
}

// Add numbers (0-9)
for (let i = 0; i < 10; i++) {
    let number = String(i); // 0-9
    let encodedValue = 3000 + i;  // Encode numbers from 3000
    encodeMap[number] = encodedValue;
    decodeMap[encodedValue] = number;
}

// Add special characters
const specialChars = [
    '~', '$', '^', '%', '√', '¢', '£', '¥', '€', '.', '`', '•', '~', '\\', '|', 
    'α', 'β', '^', '®', '©', '™', 'π', '¤', 'Φ', 'Π', 'Δ', '¦', '§', '°', '$', 
    '¥', '£', '=', '/', '₹', '-', '₦', '_', '—', '€', '<', '{', '[', '(', '>', 
    '>', '}', ')', '+', '-', '*', '!', '?', ':', ';', '"', "'", '#', '@', '!', 
    '¿', '¡', '≈', '≠', '≥'
];

let specialCounter = 5000; // Starting point for special character codes
specialChars.forEach((char) => {
    encodeMap[char] = specialCounter++;
    decodeMap[specialCounter - 1] = char;
});

// Space handling variable
let spaceCounter = 0;

// Encode function
function encodeText() {
    let input = document.getElementById('inputText').value;
    let encodedMessage = "";

    // Input mein har character ko encode karte hain
    for (let i = 0; i < input.length; i++) {
        let char = input[i];

        // Agar character encodeMap mein hai (alphabet ya special character)
        if (encodeMap[char]) {
            encodedMessage += encodeMap[char] + " "; // Map se encode kar ke add karo
        } else if (char === " ") {
            spaceCounter++;
            // Har space ke liye code generate karo
            let spaceCode = `00${spaceCounter * 3}`;
            encodedMessage += spaceCode + " "; // Space ka code add karo
        }
    }

    document.getElementById('outputText').value = encodedMessage.trim();
}

// Decode function
function decodeText() {
    let input = document.getElementById('inputText').value;
    let decodedMessage = "";

    let codes = input.split(" "); // Split the input by space

    // Har code ko decode karte hain
    for (let i = 0; i < codes.length; i++) {
        let code = codes[i];

        // Agar code space ka hai (like 000, 003, 030)
        if (code.startsWith("00")) {
            decodedMessage += " "; // Space decode karo
        } else {
            let numCode = parseInt(code);
            if (decodeMap[numCode]) {
                decodedMessage += decodeMap[numCode]; // Letter ya symbol ko decode karo
            }
        }
    }

    document.getElementById('outputText').value = decodedMessage;
}

// Copy function
function copyText() {
    let outputText = document.getElementById('outputText');
    outputText.select();
    document.execCommand('copy');
}

// Paste function
function pasteText() {
    navigator.clipboard.readText().then(function(text) {
        document.getElementById('inputText').value = text;
    });
}

// Existing code remains the same...

// Clear All function
function clearAll() {
    document.getElementById('inputText').value = '';  // Clear input field
    document.getElementById('outputText').value = ''; // Clear output field
}

//password area 

// 🔹 Global Variable to Store Real Password
// 🔹 Global Variable to Store Real Password
let fullPassword = "";

// 🔹 Password Check Function
function checkPassword() {
    let passwordInput = document.getElementById("passwordInput").value;
    let errorMessage = document.getElementById("error-message");

    if (fullPassword === "NTH_NOTHING") { 
        document.getElementById("passwordScreen").style.display = "none";
        document.getElementById("mainContent").classList.add("unlocked"); // Remove Blur
    } else {
        errorMessage.textContent = "❌ Incorrect Password!";
    }
}

// 🔹 Toggle Password Visibility (Show/Hide Password)
function togglePasswordVisibility() {
    let passwordInput = document.getElementById("passwordInput");
    let checkbox = document.getElementById("togglePassword");

    if (checkbox.checked) {
        passwordInput.type = "text";  // Show password
        passwordInput.value = fullPassword; // Display actual password
    } else {
        passwordInput.type = "password";  // Hide password
        maskPassword(); // Mask it again
    }
}

// 🔹 Mask Password (Always Replace with Dots)
function maskPassword() {
    let input = document.getElementById("passwordInput");
    let value = input.value;

    if (value.length > fullPassword.length) {
        fullPassword += value.slice(fullPassword.length); // Save new character
    } else {
        fullPassword = fullPassword.slice(0, value.length); // Handle backspace
    }

    // Mask all characters with "•" (dot)
    let maskedValue = "•".repeat(fullPassword.length);
    input.value = maskedValue;
}

// 🔹 Apply Masking on Input
document.getElementById("passwordInput").addEventListener("input", maskPassword);