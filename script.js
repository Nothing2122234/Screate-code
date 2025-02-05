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
// Add Urdu alphabet mapping
encodeMap["ا"] = 5000; decodeMap[5000] = "ا";
encodeMap["ب"] = 5100; decodeMap[5100] = "ب";
encodeMap["پ"] = 5200; decodeMap[5200] = "پ";
encodeMap["ت"] = 5300; decodeMap[5300] = "ت";
encodeMap["ٹ"] = 5400; decodeMap[5400] = "ٹ";
encodeMap["ث"] = 5500; decodeMap[5500] = "ث";
encodeMap["ج"] = 5600; decodeMap[5600] = "ج";
encodeMap["چ"] = 5700; decodeMap[5700] = "چ";
encodeMap["ح"] = 5800; decodeMap[5800] = "ح";
encodeMap["خ"] = 5900; decodeMap[5900] = "خ";
encodeMap["د"] = 6000; decodeMap[6000] = "د";
encodeMap["ڈ"] = 6100; decodeMap[6100] = "ڈ";
encodeMap["ذ"] = 6200; decodeMap[6200] = "ذ";
encodeMap["ر"] = 6300; decodeMap[6300] = "ر";
encodeMap["ڑ"] = 6400; decodeMap[6400] = "ڑ";
encodeMap["ز"] = 6500; decodeMap[6500] = "ز";
encodeMap["ژ"] = 6600; decodeMap[6600] = "ژ";
encodeMap["س"] = 6700; decodeMap[6700] = "س";
encodeMap["ش"] = 6800; decodeMap[6800] = "ش";
encodeMap["ص"] = 6900; decodeMap[6900] = "ص";
encodeMap["ض"] = 7000; decodeMap[7000] = "ض";
encodeMap["ط"] = 7100; decodeMap[7100] = "ط";
encodeMap["ظ"] = 7200; decodeMap[7200] = "ظ";
encodeMap["ع"] = 7300; decodeMap[7300] = "ع";
encodeMap["غ"] = 7400; decodeMap[7400] = "غ";
encodeMap["ف"] = 7500; decodeMap[7500] = "ف";
encodeMap["ق"] = 7600; decodeMap[7600] = "ق";
encodeMap["ک"] = 7700; decodeMap[7700] = "ک";
encodeMap["گ"] = 7800; decodeMap[7800] = "گ";
encodeMap["ل"] = 7900; decodeMap[7900] = "ل";
encodeMap["م"] = 8000; decodeMap[8000] = "م";
encodeMap["ن"] = 8100; decodeMap[8100] = "ن";
encodeMap["ں"] = 8200; decodeMap[8200] = "ں";
encodeMap["و"] = 8300; decodeMap[8300] = "و";
encodeMap["ہ"] = 8400; decodeMap[8400] = "ہ";
encodeMap["ھ"] = 8500; decodeMap[8500] = "ھ";
encodeMap["ء"] = 8600; decodeMap[8600] = "ء";
encodeMap["ی"] = 8700; decodeMap[8700] = "ی";
encodeMap["ے"] = 8800; decodeMap[8800] = "ے";
