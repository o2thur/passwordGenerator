// Project idea: password generator where the user can select:
// Predefined:
// 1. Weak(lowercase + numbers, length 8)
// 2. Medium(uppercase + lowercase + numbers, length 12)
// 3. Strong(uppercase + lowercase + numbers + special char, length 15)

// Personalize:
// 1. length
// 2. special characters
// 3. add uppercase
// 4. add numbers

$(document).ready(function () {

    const weakButton = $("#generateButtonWeak"),
        secureButton = $("#generateButtonSecure"),
        strongButton = $("#generateButtonStrong"),
        saveButton = $("#savePasswordButton"),
        personalizedButton = $("#generateButtonPersonalized"),
        uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz',
        numberCharacters = '0123456789',
        specialCharacters = '!@#$%&*<>?',
        passwordGenerated = $("#passwordGenerated"),
        warning = $(".warning");
    let uppercaseCheck,
        lowercaseCheck,
        specialCharCheck,
        numbersCheck,
        lengthPersonalized,
        savedPasswords = [];

    // The checkboxes are updated to true or false. The length gets it's value updated
    function updateCheckboxes() {
        uppercaseCheck = $("#uppercaseCheck").is(":checked");
        lowercaseCheck = $("#lowercaseCheck").is(":checked");
        specialCharCheck = $("#specialCharCheck").is(":checked");
        numbersCheck = $("#numbersCheck").is(":checked");
        lengthPersonalized = parseInt($("#lengthPersonalized").val()) || 0;

    }

    // When the user generates a personalized password, this function ensures that the predefined passwords will work
    function clearCheckboxes() {
        uppercaseCheck = $("#uppercaseCheck")
        lowercaseCheck = $("#lowercaseCheck")
        specialCharCheck = $("#specialCharCheck")
        numbersCheck = $("#numbersCheck")
        lengthPersonalized = $("#lengthPersonalized");
    }

    // Every predefined password has at least lowercase and numbers
    function generatePassword(lowercase = true, uppercase = false, specialChar = false, numbersChar = true, length) {
        // In the personalized password, this function would return an infinite loop if none of the checkboxes are checked
        // This if statement is to ensure that the infinite loop won't happen
        if (!lowercase && !uppercase && !specialChar && !numbersChar) {
            return
        }

        let password = ''

        // Loop to create a password with the desired length
        for (let i = 0; i < length; i++) {

            // Loop to decide which character will be used. If we are not allowed to use the decided character, we loop again
            let decideCharacter
            do {
                decideCharacter = Math.round(Math.random() * 3)
            } while (
                (decideCharacter == 0 && !lowercase) ||
                (decideCharacter == 1 && !uppercase) ||
                (decideCharacter == 2 && !specialChar) ||
                (decideCharacter == 3 && !numbersChar)
            )

            // (Check comments for getRandomIndex). We are taking the letter in the defined string using the random index generated
            if (decideCharacter == 0 && lowercase) {
                const index = getRandomIndex(lowercaseLetters)
                password += lowercaseLetters[index]

            } else if (decideCharacter == 1 && uppercase) {
                const index = getRandomIndex(uppercaseLetters)
                password += uppercaseLetters[index]

            } else if (decideCharacter == 2 && specialChar) {
                const index = getRandomIndex(specialCharacters)
                password += specialCharacters[index]

            } else if (decideCharacter == 3 && numbersChar) {
                const index = getRandomIndex(numberCharacters)
                password += numberCharacters[index]
            }
        }
        return password
    }

    // getRandomIndex returns a random number within the length of the specified string
    function getRandomIndex(string) {
        const stringLength = string.length
        const index = Math.floor(Math.random() * stringLength);
        return index
    }

    function appendPassword(password) {
        // If the length is 0, the password will not be displayed. Otherwise, displays password
        if (lengthPersonalized === 0) {
            alert("Error: provide a length")
        } else if (!uppercaseCheck && !lowercaseCheck && !numbersCheck && !specialCharCheck) {
            alert("Error: at least one checkbox required")
        } else {
            passwordGenerated.text(password)
            return passwordGenerated
        }
    }

    function storeApplication() {
        applicationName = $("#inputApplication").val().toLowerCase()
        data = { app: `${applicationName}`, password: `${passwordGenerated.text()}` }

        savedPasswords.forEach((application) => {
            if (!application.includes(applicationName)) {
                console.log("hey")
            }
        })

        // if (application) {
        //     savedPasswords.push(data)
        //     localStorage.setItem("savedPasswords", JSON.stringify(savedPasswords))
        // } else {
        //     alert("Error: provide the application's name")
        // }
        console.log(savedPasswords)

    }

    weakButton.on("click", () => {
        clearCheckboxes()
        let password = generatePassword(true, false, false, true, 8)
        appendPassword(password);
    })
    secureButton.on("click", () => {
        clearCheckboxes()
        let password = generatePassword(true, true, false, true, 12)
        appendPassword(password);
    })
    strongButton.on("click", () => {
        clearCheckboxes()
        let password = generatePassword(true, true, true, true, 15)
        appendPassword(password);
    })
    personalizedButton.on("click", () => {
        updateCheckboxes()
        // Since the updateCheckboxes updates the boolean value for each variable (except lenghtPersonalized), we can use them as parameters.
        let password = generatePassword(lowercaseCheck, uppercaseCheck, specialCharCheck, numbersCheck, lengthPersonalized)
        appendPassword(password)
    })
    saveButton.on("click", () => {
        storeApplication()
    })

});