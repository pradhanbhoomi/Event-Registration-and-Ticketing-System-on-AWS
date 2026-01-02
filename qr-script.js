// Get JWT token from session
const token = sessionStorage.getItem('jwtToken');
if (!token) {
    alert('Please login first!');
    window.location.href = 'login.html';
}

// Display result
const resultContainer = document.getElementById('scan-result');

// Initialize QR scanner
const html5QrCode = new Html5Qrcode("video");

function onScanSuccess(decodedText, decodedResult) {
    // decodedText = QR code value (ticket ID)
    html5QrCode.stop(); // stop scanning temporarily
    resultContainer.innerText = `Scanned Ticket ID: ${decodedText}`;

    // Validate ticket with backend
    fetch(`YOUR_API_GATEWAY/validate-ticket/${decodedText}`, {
        method: 'POST',
        headers: { 'Authorization': token }
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            resultContainer.innerText = `✅ Ticket Validated for ${data.attendeeEmail}`;
        } else {
            resultContainer.innerText = `❌ Invalid or already used ticket`;
        }
        // Restart scanning after 2 seconds
        setTimeout(() => html5QrCode.start({ facingMode: "environment" }, config, onScanSuccess), 2000);
    })
    .catch(err => {
        console.error(err);
        resultContainer.innerText = 'Error validating ticket';
        setTimeout(() => html5QrCode.start({ facingMode: "environment" }, config, onScanSuccess), 2000);
    });
}

// QR scanner config
const config = { fps: 10, qrbox: 250 };

// Start scanning
html5QrCode.start({ facingMode: "environment" }, config, onScanSuccess);
