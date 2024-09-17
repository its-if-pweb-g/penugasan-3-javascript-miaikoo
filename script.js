document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('nameError').innerText = '';
    document.getElementById('emailError').innerText = '';
    document.getElementById('messageError').innerText = '';
    document.getElementById('successMessage').innerText = '';
    
    let name = document.getElementById('name').value.trim();
    let email = document.getElementById('email').value.trim();
    let message = document.getElementById('message').value.trim();
    let valid = true;

    if (name === '') {
        document.getElementById('nameError').innerText = 'Name is required.';
        valid = false;
    }
    if (email === '') {
        document.getElementById('emailError').innerText = 'Email is required.';
        valid = false;
    } else if (!validateEmail(email)) {
        document.getElementById('emailError').innerText = 'Invalid email format.';
        valid = false;
    }
    if (message === '') {
        document.getElementById('messageError').innerText = 'Message is required.';
        valid = false;
    }

    if (valid) {
        document.getElementById('btnText').style.display = 'none';
        document.getElementById('loadingSpinner').classList.remove('d-none');
        document.getElementById('submitBtn').disabled = true;

        let formData = {
            name: name,
            email: email,
            message: message
        };

        fetch('https://debug.nafkhanzam.com/web-programming-e03', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
            mode: 'no-cors'
        })
        .then(() => {
            document.getElementById('successMessage').innerText = 'Terkirim!';
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            document.getElementById('successMessage').innerText = 'Failed to send the message.';
        })
        .finally(() => {
            document.getElementById('btnText').style.display = 'inline';
            document.getElementById('loadingSpinner').classList.add('d-none');
            document.getElementById('submitBtn').disabled = false;
        });
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function autoResizeTextarea() {
    const textField = document.getElementById('textField');
    textField.style.height = 'auto';
    textField.style.height = textField.scrollHeight + 'px';
}
function updateText() {
    const textField = document.getElementById('textField');
    const outputText = document.getElementById('outputText');
    const userInput = textField.value;
    localStorage.setItem('userText', userInput);
    outputText.textContent = userInput;
    autoResizeTextarea();
}
window.onload = function() {
    const savedText = localStorage.getItem('userText');
    if (savedText) {
        const textField = document.getElementById('textField');
        textField.value = savedText;
        document.getElementById('outputText').textContent = savedText;
        autoResizeTextarea();
    }
};
document.getElementById('textField').addEventListener('input', updateText);
    