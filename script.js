const API_BASE_URL = "https://6le445lnbf.execute-api.ap-south-1.amazonaws.com/dev";

/*************************************************
 * GLOBAL
 *************************************************/
function logout() {
    sessionStorage.clear();
    window.location.href = "login.html";
}

function loadNavbar() {
    const nav = document.getElementById("nav-actions");
    if (!nav) return;
    nav.innerHTML = `<button onclick="logout()">Logout</button>`;
}
loadNavbar();

/*************************************************
 * LOGIN
 *************************************************/
const loginForm = document.getElementById("login-form");

if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.querySelector("input[type='email']").value;
        const role = document.getElementById("role-select").value;

        if (!role) {
            alert("Select a role");
            return;
        }

        sessionStorage.setItem("jwtToken", "mock-token");
        sessionStorage.setItem("role", role);
        sessionStorage.setItem("userEmail", email);

        window.location.href =
            role === "attendee"
                ? "attendee-dashboard.html"
                : "organizer-dashboard.html";
    });
}

/*************************************************
 * ATTENDEE
 *************************************************/
const mockEvents = [
    { id: "1", name: "Music Fest", date: "2026-01-10" },
    { id: "2", name: "Tech Talk", date: "2026-01-15" }
];

function fetchEvents() {
    const container = document.getElementById("events-container");
    if (!container) return;

    container.innerHTML = "";

    mockEvents.forEach(ev => {
        const div = document.createElement("div");
        div.className = "event-card";
        div.innerHTML = `
            <h4>${ev.name}</h4>
            <p>Date: ${ev.date}</p>
            <button onclick="generateQR('${ev.id}','${ev.name}')">Register</button>
        `;
        container.appendChild(div);
    });
}

function generateQR(eventId, eventName) {
    const qrContainer = document.getElementById("qr-container");
    if (!qrContainer) return;

    qrContainer.innerHTML = "";

    const ticket = JSON.stringify({
        eventId,
        eventName,
        email: sessionStorage.getItem("userEmail"),
        status: "unused"
    });

    new QRCode(qrContainer, {
        text: ticket,
        width: 180,
        height: 180
    });
}

if (window.location.pathname.includes("attendee-dashboard")) {
    fetchEvents();
}

/*************************************************
 * ORGANIZER — ATTENDEES
 *************************************************/
const mockRegistrations = [
    { email: "user1@example.com", event: "Music Fest", status: "unused" },
    { email: "user2@example.com", event: "Tech Talk", status: "used" }
];

function fetchRegistrations() {
    const container = document.getElementById("registrations-container");
    if (!container) return;

    container.innerHTML = "";

    mockRegistrations.forEach(r => {
        const div = document.createElement("div");
        div.className = "registration-card";
        div.innerHTML = `
            <p><strong>${r.email}</strong></p>
            <p>Event: ${r.event}</p>
            <p>Status:
                <span style="color:${r.status === "used" ? "#ef4444" : "#22c55e"}">
                    ${r.status.toUpperCase()}
                </span>
            </p>
        `;
        container.appendChild(div);
    });
}

if (window.location.pathname.includes("organizer-dashboard")) {
    fetchRegistrations();
}



function generateQR(eventId, eventName) {
    const qrContainer = document.getElementById("qr-container");
    if (!qrContainer) return;

    qrContainer.innerHTML = "";

    const ticket = JSON.stringify({
        eventId,
        eventName,
        email: sessionStorage.getItem("userEmail"),
        status: "unused"
    });

    new QRCode(qrContainer, {
        text: ticket,
        width: 180,
        height: 180
    });

    // ✅ SHOW DOWNLOAD BUTTON AFTER REGISTRATION
    const downloadBtn = document.getElementById("download-btn");
    if (downloadBtn) {
        downloadBtn.style.display = "block";
    }
}




/*************************************************
 * LIVE QR SCANNER (CAMERA)
 *************************************************/
if (window.location.pathname.includes("organizer-dashboard")) {

    const resultEl = document.getElementById("scan-result");

    const qrScanner = new Html5Qrcode("qr-video");

    Html5Qrcode.getCameras().then(cameras => {
        if (cameras.length === 0) {
            resultEl.innerText = "No camera found";
            return;
        }

        qrScanner.start(
            cameras[0].id,
            { fps: 10, qrbox: 250 },
            (decodedText) => {
                try {
                    const ticket = JSON.parse(decodedText);
                    resultEl.innerText =
                        `✅ VALID TICKET\n${ticket.eventName}\n${ticket.email}`;
                } catch {
                    resultEl.innerText = "❌ Invalid QR Code";
                }
            },
            () => {}
        );
    }).catch(err => {
        console.error(err);
        resultEl.innerText = "Camera access denied";
    });
}


