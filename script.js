let currentStep = 0;
const sections = ['login', 'intro', 'reasons', 'facts', 'annoying', 'proposal', 'success'];

function checkPassword() {
    const pwd = document.getElementById('passwordField').value.toLowerCase().replace(/[\/\s-]/g, '');
    if (pwd === '10062020' || pwd === '10june2020') {
        document.getElementById('login').classList.add('hidden');
        document.getElementById('musicUI').classList.remove('hidden');
        currentStep = 1; 
        const intro = document.getElementById('intro');
        intro.classList.remove('hidden');
        setTimeout(() => { intro.style.opacity = '1'; }, 50);
    } else {
        const error = document.getElementById('error-msg');
        error.classList.remove('hidden');
        document.getElementById('login').style.animation = "shake 0.3s";
        setTimeout(() => { document.getElementById('login').style.animation = ""; }, 300);
    }
}

function startExperience() {
    const music = document.getElementById('bgMusic');
    music.play().then(() => {
        document.getElementById('musicToggle').textContent = "⏸ Playing: Stereo Hearts";
    }).catch(e => console.log("Audio waiting..."));
    nextSection();
}

function nextSection() {
    const current = document.getElementById(sections[currentStep]);
    current.style.opacity = '0';
    setTimeout(() => {
        current.classList.add('hidden');
        currentStep++;
        const next = document.getElementById(sections[currentStep]);
        next.classList.remove('hidden');
        setTimeout(() => { next.style.opacity = '1'; }, 50);
    }, 400);
}

function toggleMusic() {
    const m = document.getElementById('bgMusic');
    const b = document.getElementById('musicToggle');
    if (m.paused) { m.play(); b.textContent = "⏸ Playing: Stereo Hearts"; }
    else { m.pause(); b.textContent = "🎵 Music: Off"; }
}

function revealCard(card) { card.classList.add('revealed'); }

function moveButton() {
    const btn = document.getElementById('noBtn');
    const pad = 80; // Increased padding for safety
    const x = Math.floor(Math.random() * (window.innerWidth - btn.offsetWidth - pad)) + pad/2;
    const y = Math.floor(Math.random() * (window.innerHeight - btn.offsetHeight - pad)) + pad/2;
    btn.style.position = 'fixed';
    btn.style.left = x + 'px';
    btn.style.top = y + 'px';
    const yes = document.getElementById('yesBtn');
    const size = parseFloat(window.getComputedStyle(yes).fontSize);
    if (size < 45) yes.style.fontSize = (size + 1.5) + 'px';
}

const truths = [
    "I still remember the exact moment I realized you were the one.",
    "Sometimes I catch myself smiling just thinking about your laugh.",
    "My favorite place in the world is right next to you.",
    "I love the person I am when I'm with you, Yukta.",
    "Your happiness is the only thing that truly matters to me."
];

function showRandomFact() {
    document.getElementById('typewriter-text').textContent = truths[Math.floor(Math.random() * truths.length)];
}

function youSaid(a) { if(a === 'yes') nextSection(); }
function sheYes() { nextSection(); startConfetti(); }

function startConfetti() {
    for (let i = 0; i < 70; i++) {
        const h = document.createElement('div');
        h.innerHTML = '❤️';
        h.style.position = 'fixed';
        h.style.left = Math.random() * 100 + 'vw';
        h.style.top = '-10%';
        h.style.fontSize = Math.random() * 20 + 12 + 'px';
        h.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        document.body.appendChild(h);
    }
}

const style = document.createElement('style');
style.innerHTML = `
@keyframes shake { 0%, 100% {transform: translateX(0);} 25% {transform: translateX(-10px);} 75% {transform: translateX(10px);} }
@keyframes fall { to { transform: translateY(110vh) rotate(360deg); opacity: 0; } }
`;
document.head.appendChild(style);