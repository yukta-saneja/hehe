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

    // reset interactive bits when entering certain sections
    if (sections[idx] === 'annoying') {
        // reset NO button to its original flow position
        const btn = document.getElementById('noBtn');
        if (btn) {
            btn.style.position = '';
            btn.style.left = '';
            btn.style.top = '';
            btn.style.transform = '';
        }
        // reset YES size
        yesSize = 1;
        const yes = document.getElementById('yesBtn');
        if (yes) yes.style.transform = 'scale(1)';
    }
    // If entering proposal, make sure the maybe button can't be accidentally clicked immediately
    if (sections[idx] === 'proposal') {
        const maybe = document.querySelector('.maybe-btn');
        if (maybe) {
            maybe.style.pointerEvents = 'none';
            // re-enable after a short delay when animations finish
            setTimeout(() => { maybe.style.pointerEvents = 'auto'; }, 700);
        }
        // focus the positive button so accidental taps don't hit maybe
        const yesProp = document.querySelector('.yes-proposal');
        if (yesProp) yesProp.focus && yesProp.focus();
    }
}

// --- Fun facts ---
const facts = [
    "You make my heart skip a beat every time you smile.",
    "Thinking of you turns ordinary days into adventures.",
    "Your laugh is my favorite song.",
    "With you, even silence feels like a warm hug.",
    "You are the reason for my best days."
];

function showRandomFact() {
    const p = document.getElementById('fact-display');
    p.textContent = facts[Math.floor(Math.random() * facts.length)];
}

// --- No button avoidance & Yes growth ---
let yesSize = 1; // scale multiplier
let noAttempts = 0;

function moveButton(e) {
    // Called on mouseover of NO button. Move it to a random nearby position.
    const btn = document.getElementById('noBtn');
    noAttempts += 1;
    if (!btn) return;

    // Determine container bounds (position relative to the .button-container)
    const container = btn.parentElement;
    const cRect = container.getBoundingClientRect();
    const btnW = btn.offsetWidth;
    const btnH = btn.offsetHeight;

    // pick a position fully inside the container (avoid overflow)
    const maxX = Math.max(0, cRect.width - btnW);
    const maxY = Math.max(0, cRect.height - btnH);

    // Try to avoid overlapping the yes button
    const yes = document.getElementById('yesBtn');
    const yesRect = yes ? yes.getBoundingClientRect() : null;

    let attempt = 0;
    let newX, newY;
    do {
        newX = Math.floor(Math.random() * maxX);
        newY = Math.floor(Math.random() * maxY);
        attempt++;
        if (attempt > 20) break;
    } while (yesRect && overlaps({left: cRect.left + newX, top: cRect.top + newY, width: btnW, height: btnH}, yesRect));

    // position the button at the container origin and move using transform for GPU-accelerated animation
    btn.style.position = 'absolute';
    btn.style.left = '0px';
    btn.style.top = '0px';
    // avoid accidental clicks while we animate
    btn.style.pointerEvents = 'none';
    btn.style.transform = `translate(${newX}px, ${newY}px)`;
    // restore pointer events after the CSS transition completes
    setTimeout(() => { btn.style.pointerEvents = 'auto'; }, 320);

    // Make the YES button grow a bit every time the NO button dodges
    growYes();
}

function overlaps(a, b) {
    return !(a.left + a.width < b.left || a.left > b.left + b.width || a.top + a.height < b.top || a.top > b.top + b.height);
}

function growYes() {
    yesSize = Math.min(2.0, yesSize + 0.09); // cap growth
    const yes = document.getElementById('yesBtn');
    if (yes) {
        yes.style.transition = 'transform 220ms cubic-bezier(.2,.9,.2,1)';
        yes.style.transform = `scale(${yesSize})`;
        yes.style.zIndex = 999; // keep it above the moving NO
    }
}

function youSaid(choice) {
    const res = document.getElementById('result-message');
    if (choice === 'yes') {
        // celebrate and move to proposal
    res.textContent = "You chose LOVE — I always believed in us. 💖";
    res.classList.add('good');
    // small pop effect on YES
    const yes = document.getElementById('yesBtn');
            if (yes) yes.animate([{ transform: `scale(${Math.min(2.2, yesSize + 0.2)})` }, { transform: 'scale(1.1)' }], { duration: 500, easing: 'ease-out' });
            // prevent spurious clicks while animating
            const no = document.getElementById('noBtn');
            if (yes) yes.disabled = true;
            if (no) no.disabled = true;
            setTimeout(() => {
                showSection(4);
                if (yes) yes.disabled = false;
                if (no) no.disabled = false;
            }, 700);
    } else {
        // if NO somehow clicked, playful tease and nudge back
    res.textContent = "No? Hmm... are you teasing me? Try again 😊";
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
    msg.textContent = "If you'd like, tell me one thing you love about us and I'll keep it forever. 💌";
}

// --- Simple confetti/hearts ---
function startConfetti() {
    const container = document.querySelector('.celebration-confetti');
    container.innerHTML = '';
    for (let i = 0; i < 30; i++) {
        const el = document.createElement('div');
        el.className = 'confetti';
        el.style.left = Math.random() * 100 + '%';
        el.style.background = ['#ff5c8a', '#ffd166', '#9ad3bc'][Math.floor(Math.random() * 3)];
        el.style.transform = `rotate(${Math.random() * 360}deg)`;
        container.appendChild(el);
        // remove after animation
        setTimeout(() => el.remove(), 4000);
    }
}

// allow sending a little reply on proposal
function sendReply() {
    const input = document.getElementById('replyInput');
    const display = document.getElementById('replyDisplay');
    if (!input || !display) return;
    const text = input.value.trim();
    if (!text) {
        display.textContent = "A little note would be lovely... 💌";
        return;
    }
    display.textContent = `Yukta wrote: "${text}" — that made my day. 💖`;
    input.value = '';
}

// --- Page polish on load ---
window.addEventListener('load', () => {
    // show intro only
    sections.forEach(id => document.getElementById(id).classList.add('hidden'));
    document.getElementById('intro').classList.remove('hidden');

    // small pulsing on the yes button occasionally
    setInterval(() => {
        const yes = document.getElementById('yesBtn');
        yes.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.05)' }, { transform: 'scale(1)' }], { duration: 1500 });
    }, 2500);
});

