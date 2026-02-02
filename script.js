// script.js - interactive behaviors for the Valentine's page

// --- Lightweight navigation between sections ---
const sections = ['intro', 'reasons', 'facts', 'annoying', 'proposal', 'success'];
let currentIndex = 0;

function startJourney() {
    showSection(1); // go to reasons
}

function nextSection() {
    showSection(currentIndex + 1);
}

function showSection(idx) {
    if (idx < 0 || idx >= sections.length) return;
    // hide all
    sections.forEach(id => document.getElementById(id).classList.add('hidden'));
    // show target
    const el = document.getElementById(sections[idx]);
    if (el) el.classList.remove('hidden');
    currentIndex = idx;
}

// --- Romantic facts ---
const facts = [
    "You make my heart skip a beat every single time I see you smile.",
    "Thinking of you turns my ordinary days into magical adventures.",
    "Your laugh is the most beautiful symphony my heart could ever hear.",
    "With you, even the quietest moments feel like warm, peaceful hugs.",
    "You are the reason every one of my days feels like a blessing.",
    "My heart chose you before my mind even understood why.",
    "Being with you feels like coming home to where I belong.",
    "You've turned my life into a beautiful love story worth living forever.",
    "Every time you're near, the world fades away and only you matter.",
    "You are my greatest love, my deepest wish, my greatest adventure."
];

function showRandomFact() {
    const p = document.getElementById('fact-display');
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    p.textContent = randomFact;
    p.style.animation = 'none';
    setTimeout(() => { p.style.animation = 'slideUp 0.5s ease'; }, 10);
}

// --- No button avoidance & Yes growth ---
let yesSize = 1; // scale multiplier
let noAttempts = 0;

function moveButton(e) {
    // Called on mouseover of NO button. Move it to a random nearby position.
    const btn = document.getElementById('noBtn');
    noAttempts += 1;

    // If user somehow clicks NO quickly, fallback handled in youSaid
    const parent = btn.parentElement.getBoundingClientRect();
    const safeArea = {
        left: 0,
        top: 0,
        right: window.innerWidth - btn.offsetWidth,
        bottom: window.innerHeight - btn.offsetHeight
    };

    // pick a new location biased away from cursor
    const x = Math.max(0, Math.min(safeArea.right, Math.random() * window.innerWidth));
    const y = Math.max(0, Math.min(safeArea.bottom, Math.random() * (window.innerHeight - 100) + 50));

    btn.style.position = 'absolute';
    btn.style.left = x + 'px';
    btn.style.top = y + 'px';

    // Make the YES button grow a bit every time the NO button dodges
    growYes();
}

function growYes() {
    yesSize += 0.08; // scale up
    const yes = document.getElementById('yesBtn');
    yes.style.transform = `scale(${yesSize})`;
}

function youSaid(choice) {
    const res = document.getElementById('result-message');
    if (choice === 'yes') {
        // celebrate and move to proposal
        res.textContent = "I knew it! Your heart is as beautiful as I always knew. 💖";
        res.classList.add('good');
        setTimeout(() => showSection(4), 900);
    } else {
        // if NO somehow clicked, playful tease and nudge back
        res.textContent = "Hmm, you almost got me there! Try again, my love 😊";
        res.classList.remove('good');
        // slightly shrink the NO button as a playful consequence
        const btn = document.getElementById('noBtn');
        btn.style.transform = 'scale(0.9)';
        setTimeout(() => { btn.style.transform = ''; moveButton(); }, 300);
    }
}

// --- Proposal actions ---
function sheYes() {
    showSection(5);
    startConfetti();
}

function maybeWho() {
    const msg = document.getElementById('proposal-message');
    msg.classList.remove('hidden-text');
    msg.textContent = "I'm asking because you mean the world to me, Yukta. Because loving you is the best decision I could ever make. 💌";
}

// --- Simple confetti/hearts ---
function startConfetti() {
    const container = document.querySelector('.celebration-confetti');
    container.innerHTML = '';
    const confettiEmojis = ['💕', '💖', '✨', '🌹', '💝', '💐', '🎀', '💞', '⭐', '💑'];
    
    for (let i = 0; i < 40; i++) {
        const el = document.createElement('div');
        el.className = 'confetti';
        el.textContent = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
        el.style.left = Math.random() * 100 + '%';
        el.style.fontSize = (12 + Math.random() * 16) + 'px';
        el.style.background = 'transparent';
        el.style.transform = `rotate(${Math.random() * 360}deg)`;
        container.appendChild(el);
        // remove after animation
        setTimeout(() => el.remove(), 4000);
    }
}

// --- Page polish on load ---
window.addEventListener('load', () => {
    // show intro only
    sections.forEach(id => document.getElementById(id).classList.add('hidden'));
    document.getElementById('intro').classList.remove('hidden');

    // small pulsing on the yes button occasionally
    setInterval(() => {
        const yes = document.getElementById('yesBtn');
        yes.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.08)' }, { transform: 'scale(1)' }], { duration: 1500 });
    }, 3000);
});

