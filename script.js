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
    
    // Add click-to-reveal functionality for reason cards
    if (idx === 1) {
        setTimeout(() => {
            const cards = document.querySelectorAll('.reason-card');
            cards.forEach((card, index) => {
                card.style.animation = `none`;
                card.onclick = () => {
                    card.classList.toggle('revealed');
                };
            });
        }, 100);
    }
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

    // Get the parent container bounds (button-container)
    const parent = btn.parentElement.getBoundingClientRect();
    
    // Constrain movement within the parent container
    const safeArea = {
        left: parent.left,
        top: parent.top,
        right: parent.right - btn.offsetWidth,
        bottom: parent.bottom - btn.offsetHeight
    };

    // pick a new location within the parent container
    const x = Math.max(safeArea.left, Math.min(safeArea.right, parent.left + Math.random() * (parent.width - btn.offsetWidth)));
    const y = Math.max(safeArea.top, Math.min(safeArea.bottom, parent.top + Math.random() * (parent.height - btn.offsetHeight)));

    btn.style.position = 'fixed';
    btn.style.left = x + 'px';
    btn.style.top = y + 'px';

    // Make the YES button grow a bit every time the NO button dodges
    growYes();
}

function growYes() {
    // gently increase yesSize but clamp it so it doesn't grow unbounded
    yesSize = Math.min(1.8, yesSize + 0.06); // max 1.8x
    const yes = document.getElementById('yesBtn');
    if (!yes) return;
    // apply scale using CSS variable so other transforms (translateY) can compose
    yes.style.setProperty('--scale', yesSize.toFixed(3));
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

    // small pulsing on the yes button occasionally — animate a temporary overlay pulse
    setInterval(() => {
        const yes = document.getElementById('yesBtn');
        // animate using composite transform that includes the current CSS variable --scale
        // We cannot directly animate CSS variables with WAAPI, so we simulate a subtle pulse by animating a transient scale multiplier
        const base = parseFloat(getComputedStyle(yes).getPropertyValue('--scale')) || 1;
        const pulseUp = base * 1.06;
        const animation = yes.animate([
            { transform: `translateY(var(--ty,0)) scale(${base})` },
            { transform: `translateY(var(--ty,0)) scale(${pulseUp})` },
            { transform: `translateY(var(--ty,0)) scale(${base})` }
        ], { duration: 1200, easing: 'ease-in-out' });
        // no need to change CSS var; animation is transient
    }, 3000);
});

