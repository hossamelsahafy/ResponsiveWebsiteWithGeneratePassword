document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Copyright Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Light / Dark Mode Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    let isDark = false;

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            isDark = !isDark;
            if (isDark) {
                document.body.setAttribute('data-theme', 'dark');
                themeToggleBtn.textContent = '☀️ Light Mode';
            } else {
                document.body.removeAttribute('data-theme');
                themeToggleBtn.textContent = '🌙 Dark Mode';
            }
        });
    }

    // 3. Password Generator Logic
    const passwordOutput = document.getElementById('password-output');
    const lengthSlider = document.getElementById('length-slider');
    const lengthVal = document.getElementById('length-val');
    const chkUpper = document.getElementById('chk-uppercase');
    const chkLower = document.getElementById('chk-lowercase');
    const chkNumbers = document.getElementById('chk-numbers');
    const chkSymbols = document.getElementById('chk-symbols');
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');

    const charsUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charsLower = 'abcdefghijklmnopqrstuvwxyz';
    const charsNumbers = '0123456789';
    const charsSymbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    // Update length text on slider move
    if (lengthSlider && lengthVal) {
        lengthSlider.addEventListener('input', (e) => {
            lengthVal.textContent = e.target.value;
        });
    }

    function generatePassword() {
        let validChars = '';
        if (chkUpper.checked) validChars += charsUpper;
        if (chkLower.checked) validChars += charsLower;
        if (chkNumbers.checked) validChars += charsNumbers;
        if (chkSymbols.checked) validChars += charsSymbols;

        if (!validChars) {
            passwordOutput.value = 'Select at least 1 option!';
            return;
        }

        const length = parseInt(lengthSlider.value, 10);
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * validChars.length);
            password += validChars[randomIndex];
        }

        passwordOutput.value = password;
    }

    if (generateBtn) {
        generateBtn.addEventListener('click', generatePassword);
        // Auto-generate initial password on page load
        generatePassword();
    }

    // Copy to clipboard functionality
    if (copyBtn && passwordOutput) {
        copyBtn.addEventListener('click', () => {
            if (!passwordOutput.value || passwordOutput.value.includes('Select at least')) return;
            
            navigator.clipboard.writeText(passwordOutput.value).then(() => {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = '✅ Copied!';
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                }, 1500);
            });
        });
    }

    // 4. Contact Form Handler
    const contactForm = document.getElementById('contact-form');
    const statusMsg = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('name');
            const name = nameInput ? nameInput.value : 'Friend';

            if (statusMsg) {
                statusMsg.style.color = '#10b981';
                statusMsg.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
            }

            contactForm.reset();
        });
    }
});
