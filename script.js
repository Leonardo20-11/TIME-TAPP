function initTimeTapGame() {
    const SUPABASE_URL ="https://jnhkktvtxbsfbrafsnig.supabase.co";
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpuaGtrdHZ0eGJzZmJyYWZzbmlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTU0NTMzNjAsImV4cCI6MjExMTAyOTM2MH0.xRde38jj8K1cBpbXIIDyc14OMSsjRVUMkqTEvwDq2Tw";

const onboardingScreen = document.getElementById("onboardingScreen");
    const usernameInput = document.getElementById("usernameInput");
    const onboardingErrorMsg = document.getElementById("onboardingErrorMsg");
    const saveProfileBtn = document.getElementById("saveProfileBtn");

    const profileCornerBtn = document.getElementById("profileCornerBtn");
    const homeProfileName = document.getElementById("homeProfileName");
    const homeProfileTitle = document.getElementById("homeProfileTitle");

    const homeXpWidget = document.getElementById("homeXpWidget");
    const homeXpRank = document.getElementById("homeXpRank");
    const homeXpNums = document.getElementById("homeXpNums");
    const homeXpFill = document.getElementById("homeXpFill");

    const leaderboardBtn = document.getElementById("leaderboardBtn");
    const leaderboardModal = document.getElementById("leaderboardModal");
    const closeLeaderboardBtn = document.getElementById("closeLeaderboardBtn");
    const yourRankBanner = document.getElementById("yourRankBanner");
    const leaderboardListContainer = document.getElementById("leaderboardListContainer");

    const profileModal = document.getElementById("profileModal");
    const closeProfileBtn = document.getElementById("closeProfileBtn");
    const profileModalUsername = document.getElementById("profileModalUsername");
    const profileModalStats = document.getElementById("profileModalStats");
    const equippedTitleLabel = document.getElementById("equippedTitleLabel");
    const profileBestScore = document.getElementById("profileBestScore");
    const profileBestCombo = document.getElementById("profileBestCombo");
    const profileCurrentRank = document.getElementById("profileCurrentRank");

    const editUsernameBtn = document.getElementById("editUsernameBtn");
    const editUsernameBox = document.getElementById("editUsernameBox");
    const newUsernameInput = document.getElementById("newUsernameInput");
    const editUsernameErrorMsg = document.getElementById("editUsernameErrorMsg");
    const confirmUsernameChangeBtn = document.getElementById("confirmUsernameChangeBtn");
    const cancelUsernameChangeBtn = document.getElementById("cancelUsernameChangeBtn");

    const playBtn = document.getElementById("playBtn");
    const discardSavedBtn = document.getElementById("discardSavedBtn");
    const confirmNewRunModal = document.getElementById("confirmNewRunModal");
    const confirmNewRunYesBtn = document.getElementById("confirmNewRunYesBtn");
    const confirmNewRunNoBtn = document.getElementById("confirmNewRunNoBtn");

    const menu = document.getElementById("menu");
    const game = document.getElementById("game");
    const timerCircle = document.getElementById("timerCircle");
    const timerRingProgress = document.getElementById("timerRingProgress");
    const countdown = document.getElementById("countdown");
    const scoreText = document.getElementById("score");
    const comboText = document.getElementById("combo");

    const gameOverScreen = document.getElementById("gameOverScreen");
    const finalScore = document.getElementById("finalScore");
    const finalRecord = document.getElementById("finalRecord");
    const finalCombo = document.getElementById("finalCombo");
    const playAgainBtn = document.getElementById("playAgainBtn");
    const homeBtn = document.getElementById("homeBtn");
    const newRecordMessage = document.getElementById("newRecordMessage");
    const xpEarnedBadge = document.getElementById("xpEarnedBadge");
    const goRankFrom = document.getElementById("goRankFrom");
    const goXpProgressText = document.getElementById("goXpProgressText");
    const goRankTo = document.getElementById("goRankTo");
    const goXpBarFill = document.getElementById("goXpBarFill");

    const pauseBtn = document.getElementById("pauseBtn");
    const pauseOverlay = document.getElementById("pauseOverlay");
    const resumeBtn = document.getElementById("resumeBtn");
    const quitToHomeBtn = document.getElementById("quitToHomeBtn");

    const settingsBtn = document.getElementById("settingsBtn");
    const settingsModal = document.getElementById("settingsModal");
    const closeSettingsBtn = document.getElementById("closeSettingsBtn");
    const audioToggleBtn = document.getElementById("audioToggleBtn");

    const rankUpCelebration = document.getElementById("rankUpCelebration");
    const fireworksContainer = document.getElementById("fireworksContainer");
    const celebrationRankName = document.getElementById("celebrationRankName");
    const celebrationTitleUnlocked = document.getElementById("celebrationTitleUnlocked");
    const claimRankBtn = document.getElementById("claimRankBtn");

    let specialMessage = document.getElementById("specialMessage");
    if (!specialMessage) {
        specialMessage = document.createElement("div");
        specialMessage.id = "specialMessage";
        document.body.appendChild(specialMessage);
    }

    let homeXpNextLevel = document.getElementById("homeXpNextLevel");
    if (!homeXpNextLevel && homeXpWidget) {
        const topRow = homeXpWidget.querySelector(".home-xp-top");
        if (topRow) {
            homeXpNextLevel = document.createElement("span");
            homeXpNextLevel.id = "homeXpNextLevel";
            homeXpNextLevel.className = "home-xp-next";
            topRow.appendChild(homeXpNextLevel);
        }
    }

    const LOCALE = "it-IT";
    const PAUSE_STATE_KEY = "timeTapSavedPausedState";
    const MAX_TIME = 8.0;
    const RING_CIRCUMFERENCE = 427.25;
    const BTN_RING_CIRCUMFERENCE = 314;
    const MAX_LEVEL = 100;
    const MAX_XP = 100000000;
    const PAUSE_COOLDOWN_MS = 5000;

    const isDesktop = window.innerWidth >= 768;
    const baseTime = isDesktop ? 3.0 : 2.5;
    let time = baseTime;
    if (timerCircle) {
        timerCircle.textContent = time.toFixed(1);
    }

    let score = 0;
    let comboCount = 0;
    let maxComboRun = 0;
    let running = false;
    let isPaused = false;
    let isResumingCountdown = false;
    let doubleBonus = false;
    let isFrozen = false;
    let isSlowMo = false;
    let isAnimatingRecord = false;
    let secondChanceUsed = false;
    let normalSpawnsSinceLastSpecial = 8;

    let freezeRemainingMs = 0;
    let slowMoRemainingMs = 0;
    let doubleBonusRemainingMs = 0;
    let overdriveRemainingMs = 0;
    let feverMusicTimer = 0;
    let feverNoteStep = 0;
    let pauseCooldownRemainingMs = 0;
    let gameLoopInterval = null;
    let spawnAccumulatorMs = 0;
    let messageTimeout = null;
    let panicTickCounter = 0;
    let lastKnownXP = 0;

    let playerUsername = localStorage.getItem("timeTapUsername") || "";
    let record = Number(localStorage.getItem("record")) || 0;
    let bestCombo = Number(localStorage.getItem("bestCombo")) || 0;
    let gamesPlayed = Number(localStorage.getItem("gamesPlayed")) || 0;
    let totalScoreAccumulated = Number(localStorage.getItem("totalScoreAccumulated")) || 0;
    let storedBonusXP = Number(localStorage.getItem("storedBonusXP")) || 0;
    let highestCelebratedLevel = Number(localStorage.getItem("highestCelebratedLevel")) || 1;

    const LEVELS_CONFIG = [];
    const EXPONENT = 3.2;
    for (let lv = 1; lv <= MAX_LEVEL; lv++) {
        let xpReq = 0;
        if (lv === 1) {
            xpReq = 0;
        } else if (lv === MAX_LEVEL) {
            xpReq = MAX_XP;
        } else {
            const ratio = (lv - 1) / (MAX_LEVEL - 1);
            xpReq = Math.round(MAX_XP * Math.pow(ratio, EXPONENT));
        }
        LEVELS_CONFIG.push({
            level: lv,
            name: "LEVEL " + lv,
            xpRequired: xpReq
        });
    }

    function fmtNum(n) {
        return Number(n || 0).toLocaleString(LOCALE);
    }

    function sbHeaders(extra = {}) {
        return Object.assign({
            "apikey": SUPABASE_KEY,
            "Authorization": "Bearer " + SUPABASE_KEY,
            "Content-Type": "application/json"
        }, extra);
    }

    function sanitizeUsernameKey(name) {
        return name.trim().toUpperCase().replace(/[^A-Z0-9_-]/g, "");
    }

    function containsProfanity(rawName) {
        if (!rawName) return false;
        const normalized = rawName
            .toUpperCase()
            .replace(/0/g, "O")
            .replace(/1/g, "I")
            .replace(/3/g, "E")
            .replace(/4/g, "A")
            .replace(/5/g, "S")
            .replace(/7/g, "T")
            .replace(/8/g, "B")
            .replace(/[^A-Z]/g, "");

        const reversed = normalized.split("").reverse().join("");

        const bannedWords = [
            "CAZZ", "MERD", "STRONZ", "PUTTAN", "TROIA", "TROIE", "VAFANC", "VAFFANC",
            "COGLION", "MINCHI", "FICA", "FIGA", "PORCOD", "PORCAM", "DIOCAN", "DIOPORC",
            "MADONNAP", "BASTARD", "BOCCIN", "POMPIN", "SBORR", "CULATTON", "FROC", "NEGR",
            "HANDICAPP", "MONGOLOID", "RITARDAT", "ZOCCOL", "BALDRACC", "PUTTANI",
            "FUCK", "SHIT", "BITCH", "ASSHOLE", "DICK", "COCK", "PUSSY", "CUNT",
            "NIGGA", "NIGGER", "FAGGOT", "WHORE", "SLUT", "MOTHERFUCK", "RETARD", "WANKER",
            "PUTA", "PUTO", "MIERDA", "CABRON", "PENDEJO", "GILIPOLLAS", "JODER", "COJONES",
            "MARICON", "VERGA", "CHINGA", "CARALHO", "FODASE", "BUCETA", "PORRA", "MERDA",
            "PUTAIN", "MERDE", "CONNARD", "SALOPE", "ENCULE", "BITE", "COUILLE", "FOUTRE", "NIQUE", "BATARD",
            "SCHEISSE", "ARSCHLOCH", "HURE", "SCHLAMPE", "FICK", "WICHSER", "HUSO", "MISSGEBURT"
        ];

        return bannedWords.some(word => normalized.includes(word) || reversed.includes(word));
    }

function forceRenameIfProfane() {
if (!playerUsername || !containsProfanity(playerUsername)) return false;
const overlay = document.createElement("div");
overlay.className = "fullscreen-screen";
overlay.style.zIndex = "9999";
const card = document.createElement("div");
card.className = "modal-card onboarding-card";
const title = document.createElement("h2");
title.className = "onboarding-title";
title.textContent = "CHANGE USERNAME";
const sub = document.createElement("p");
sub.className = "onboarding-sub";
sub.textContent = "YOUR CURRENT USERNAME IS NOT ALLOWED. CHOOSE A NEW CLEAN NAME TO CONTINUE:";
const inputEl = document.createElement("input");
inputEl.className = "profile-input";
inputEl.type = "text";
inputEl.maxLength = 16;
inputEl.placeholder = "NEW USERNAME";
inputEl.autocomplete = "off";
const errEl = document.createElement("div");
errEl.className = "username-error-msg";
const saveBtn = document.createElement("button");
saveBtn.className = "action-green-btn full-width-btn";
saveBtn.textContent = "SAVE & CONTINUE";
card.appendChild(title);
card.appendChild(sub);
card.appendChild(inputEl);
card.appendChild(errEl);
card.appendChild(saveBtn);
overlay.appendChild(card);
document.body.appendChild(overlay);
inputEl.focus();
saveBtn.addEventListener("click", async () => {
const chosen = sanitizeUsernameKey(inputEl.value);
if (chosen.length < 2) {
showErrorBox(errEl, "USE AT LEAST 2 LETTERS/NUMBERS!");
inputEl.focus();
return;
}
if (containsProfanity(chosen)) {
playSynthEffect("red");
showErrorBox(errEl, "OFFENSIVE USERNAME NOT ALLOWED!");
inputEl.focus();
return;
}
saveBtn.disabled = true;
saveBtn.textContent = "CHECKING...";
const isFree = await checkUsernameAvailable(chosen);
saveBtn.disabled = false;
saveBtn.textContent = "SAVE & CONTINUE";
if (!isFree) {
playSynthEffect("red");
showErrorBox(errEl, "USERNAME ALREADY IN USE!");
inputEl.focus();
return;
}
const oldName = playerUsername;
playerUsername = chosen;
localStorage.setItem("timeTapUsername", playerUsername);
playSynthEffect("gold");
await syncPlayerToCloud(playerUsername, oldName);
overlay.remove();
enterHomeScreen();
});
return true;
}
function showErrorBox(el, msg) {
if (!el) return;
el.textContent = msg;
el.style.cssText = "color:#fecaca;background:rgba(153,27,27,0.92);border:3px solid #f87171;border-radius:16px;padding:8px 14px;font-size:15px;text-align:center;display:block;width:100%;font-family:'Lilita One','Fredoka',sans-serif;";
}
function hideErrorBox(el) {
if (!el) return;
el.textContent = "";
el.style.display = "none";
}
async function checkUsernameAvailable(cleanName) {
try {
const url = SUPABASE_URL + "/rest/v1/players?username=eq." + encodeURIComponent(cleanName) + "&select=username";
const res = await fetch(url, { headers: sbHeaders() });
if (!res.ok) return true;
const rows = await res.json();
return Array.isArray(rows) && rows.length === 0;
} catch (e) {
return true;
}
}
async function syncPlayerToCloud(usernameToSave, oldUsernameToRemove = "") {
if (!usernameToSave || containsProfanity(usernameToSave)) return;
const currentXP = calculateTotalXP();
const { currentTier } = getCurrentAndNextTier(currentXP);
try {
await fetch(SUPABASE_URL + "/rest/v1/rpc/submit_player_score", {
method: "POST",
headers: sbHeaders(),
body: JSON.stringify({
p_username: usernameToSave,
p_record: record,
p_best_combo: bestCombo,
p_level: currentTier.level,
p_old_username: oldUsernameToRemove || ""
})
});
} catch (e) {}
}
let currentLeaderboardMode = "record";
let chooseLeaderboardModal = document.getElementById("chooseLeaderboardModal");
if (!chooseLeaderboardModal) {
chooseLeaderboardModal = document.createElement("div");
chooseLeaderboardModal.id = "chooseLeaderboardModal";
chooseLeaderboardModal.className = "modal-overlay";
const card = document.createElement("div");
card.className = "modal-card";
const header = document.createElement("div");
header.className = "modal-header";
const title = document.createElement("h3");
title.textContent = "LEADERBOARD";
const closeBtn = document.createElement("button");
closeBtn.className = "close-modal-btn";
closeBtn.textContent = "X";
closeBtn.addEventListener("click", () => {
playSynthEffect("click");
chooseLeaderboardModal.style.display = "none";
});
header.appendChild(title);
header.appendChild(closeBtn);
const actions = document.createElement("div");
actions.className = "resume-actions";
const recordModeBtn = document.createElement("button");
recordModeBtn.className = "lb-choice-btn lb-choice-record";
recordModeBtn.textContent = "RECORD";
recordModeBtn.addEventListener("click", () => {
playSynthEffect("click");
chooseLeaderboardModal.style.display = "none";
openLeaderboardByMode("record");
});
const comboModeBtn = document.createElement("button");
comboModeBtn.className = "lb-choice-btn lb-choice-combo";
comboModeBtn.textContent = "COMBO";
comboModeBtn.addEventListener("click", () => {
playSynthEffect("click");
chooseLeaderboardModal.style.display = "none";
openLeaderboardByMode("combo");
});
actions.appendChild(recordModeBtn);
actions.appendChild(comboModeBtn);
card.appendChild(header);
card.appendChild(actions);
chooseLeaderboardModal.appendChild(card);
document.body.appendChild(chooseLeaderboardModal);
}
async function openLeaderboardByMode(mode) {
currentLeaderboardMode = mode;
if (!leaderboardModal) return;
const headerTitle = leaderboardModal.querySelector(".fullscreen-header h2");
if (headerTitle) {
headerTitle.textContent = mode === "combo" ? "TOP 50 COMBO" : "TOP 50 RECORD";
}
leaderboardModal.style.display = "flex";
await syncPlayerToCloud(playerUsername);
loadAndRenderTop50(mode);
}
async function loadAndRenderTop50(mode = currentLeaderboardMode) {
if (!leaderboardListContainer) return;
const isCombo = mode === "combo";
const field = isCombo ? "best_combo" : "record";
leaderboardListContainer.className = "leaderboard-list-body";
leaderboardListContainer.removeAttribute("style");
leaderboardListContainer.innerHTML = "";
const loadingEl = document.createElement("div");
loadingEl.className = "lb-loading";
loadingEl.textContent = "LOADING TOP 50...";
leaderboardListContainer.appendChild(loadingEl);
if (yourRankBanner) {
yourRankBanner.className = "your-rank-banner";
yourRankBanner.removeAttribute("style");
yourRankBanner.textContent = "CHECKING YOUR RANK...";
}
try {
const url = SUPABASE_URL + "/rest/v1/players?select=username," + field + "&order=" + field + ".desc";
const res = await fetch(url, { headers: sbHeaders() });
if (!res.ok) throw new Error("Fetch failed");
const rawPlayers = await res.json();
const allPlayers = Array.isArray(rawPlayers)
? rawPlayers.filter(p => p && p.username && !containsProfanity(p.username))
: [];
leaderboardListContainer.innerHTML = "";
if (allPlayers.length === 0) {
const emptyEl = document.createElement("div");
emptyEl.className = "lb-loading";
emptyEl.textContent = "NO PLAYERS YET!";
leaderboardListContainer.appendChild(emptyEl);
if (yourRankBanner) yourRankBanner.textContent = "BE THE FIRST #1!";
return;
}
const myIndex = allPlayers.findIndex(p => p.username === playerUsername);
if (yourRankBanner) {
if (myIndex >= 0) {
yourRankBanner.textContent = "YOUR " + (isCombo ? "COMBO" : "RECORD") + " RANK: #" + (myIndex + 1) + " / " + allPlayers.length;
} else {
yourRankBanner.textContent = "PLAY A RUN TO ENTER THE RANKING!";
}
}
const top50 = allPlayers.slice(0, 50);
top50.forEach((p, idx) => {
const pos = idx + 1;
const isMe = p.username === playerUsername;
const val = Number(p[field] || 0);
const row = document.createElement("div");
row.className = "lb-row";
if (pos === 1) row.classList.add("top-1");
else if (pos === 2) row.classList.add("top-2");
else if (pos === 3) row.classList.add("top-3");
if (isMe) row.classList.add("is-me");
row.style.animationDelay = (idx * 0.035).toFixed(3) + "s";
const posEl = document.createElement("div");
posEl.className = "lb-pos";
posEl.textContent = "#" + pos;
const userInfo = document.createElement("div");
userInfo.className = "lb-user-info";
const nameSpan = document.createElement("span");
nameSpan.className = "lb-username";
nameSpan.textContent = p.username;
userInfo.appendChild(nameSpan);
if (isMe) {
const youPill = document.createElement("span");
youPill.className = "lb-you-pill";
youPill.textContent = "YOU";
userInfo.appendChild(youPill);
}
const scoreBox = document.createElement("div");
scoreBox.className = "lb-score-box";
const scoreLabel = document.createElement("span");
scoreLabel.className = "lb-score-label";
scoreLabel.textContent = isCombo ? "MAX COMBO" : "BEST";
const scoreVal = document.createElement("span");
scoreVal.className = "lb-score-val";
scoreVal.textContent = fmtNum(val);
scoreBox.appendChild(scoreLabel);
scoreBox.appendChild(scoreVal);
row.appendChild(posEl);
row.appendChild(userInfo);
row.appendChild(scoreBox);
leaderboardListContainer.appendChild(row);
});
} catch (e) {
leaderboardListContainer.innerHTML = "";
const errEl = document.createElement("div");
errEl.className = "lb-loading";
errEl.textContent = "CONNECTION ERROR";
leaderboardListContainer.appendChild(errEl);
}
}
if (leaderboardBtn && chooseLeaderboardModal) {
leaderboardBtn.addEventListener("click", () => {
playSynthEffect("click");
chooseLeaderboardModal.style.display = "flex";
});
}
if (closeLeaderboardBtn && leaderboardModal) {
closeLeaderboardBtn.addEventListener("click", (e) => {
e.stopPropagation();
playSynthEffect("click");
leaderboardModal.style.display = "none";
});
}
function calculateTotalXP() {
const xpFromGames = gamesPlayed * 2000;
const xpFromRecord = Math.floor(record * 0.1);
const xpFromScore = Math.floor(totalScoreAccumulated * 0.04);
return Math.min(MAX_XP, xpFromGames + xpFromRecord + xpFromScore + storedBonusXP);
}
function getCurrentAndNextTier(currentXP) {
let currentTier = LEVELS_CONFIG[0];
let nextTier = LEVELS_CONFIG[1] || null;
for (let i = 0; i < LEVELS_CONFIG.length; i++) {
const item = LEVELS_CONFIG[i];
if (currentXP >= item.xpRequired) {
currentTier = item;
nextTier = LEVELS_CONFIG[i + 1] || null;
} else {
break;
}
}
return { currentTier, nextTier };
}
function computeSegmentPercent(xpVal) {
const { currentTier, nextTier } = getCurrentAndNextTier(xpVal);
if (!nextTier) return 100;
const span = nextTier.xpRequired - currentTier.xpRequired;
if (span <= 0) return 100;
return Math.max(0, Math.min(100, ((xpVal - currentTier.xpRequired) / span) * 100));
}
function hasSavedRun() {
const raw = localStorage.getItem(PAUSE_STATE_KEY);
if (!raw) return false;
try {
const saved = JSON.parse(raw);
return Boolean(saved && typeof saved.time === "number" && saved.time > 0);
} catch (e) {
return false;
}
}
function updateHomePlayButtonState() {
if (!playBtn) return;
if (hasSavedRun()) {
playBtn.textContent = "CONTINUE";
playBtn.classList.add("continue-mode");
if (discardSavedBtn) discardSavedBtn.style.display = "inline-block";
} else {
playBtn.textContent = "PLAY";
playBtn.classList.remove("continue-mode");
if (discardSavedBtn) discardSavedBtn.style.display = "none";
}
}
function refreshAllProfileAndRankUI(animateHomeBarFromXP = null) {
const currentXP = calculateTotalXP();
const { currentTier, nextTier } = getCurrentAndNextTier(currentXP);
const displayName = playerUsername || "PLAYER";
if (homeProfileName) homeProfileName.textContent = displayName;
if (homeProfileTitle) homeProfileTitle.textContent = currentTier.name;
const targetPct = computeSegmentPercent(currentXP);
if (homeXpRank) homeXpRank.textContent = currentTier.name;
if (homeXpNextLevel) {
homeXpNextLevel.textContent = nextTier ? nextTier.name : "MAX";
}
if (homeXpNums) {
homeXpNums.textContent = nextTier
? fmtNum(currentXP) + " / " + fmtNum(nextTier.xpRequired) + " XP"
: fmtNum(currentXP) + " XP (MAX)";
}
if (homeXpFill) {
if (animateHomeBarFromXP !== null && animateHomeBarFromXP < currentXP) {
const startPct = computeSegmentPercent(animateHomeBarFromXP);
homeXpFill.style.transition = "none";
homeXpFill.style.width = startPct.toFixed(1) + "%";
void homeXpFill.offsetWidth;
homeXpFill.classList.add("xp-boosting");
homeXpFill.style.transition = "width 1.15s cubic-bezier(0.22, 1, 0.36, 1)";
homeXpFill.style.width = targetPct.toFixed(1) + "%";
setTimeout(() => homeXpFill.classList.remove("xp-boosting"), 1300);
} else {
homeXpFill.style.width = targetPct.toFixed(1) + "%";
}
}
const recordEl = document.getElementById("record");
const bestComboEl = document.getElementById("bestComboHome");
if (recordEl) recordEl.textContent = fmtNum(record);
if (bestComboEl) bestComboEl.textContent = fmtNum(bestCombo);
if (profileModalUsername) profileModalUsername.textContent = displayName;
if (profileModalStats) {
profileModalStats.textContent = "GAMES: " + fmtNum(gamesPlayed) + " | XP: " + fmtNum(currentXP);
}
if (equippedTitleLabel) {
equippedTitleLabel.textContent = currentTier.name;
}
if (profileBestScore) profileBestScore.textContent = fmtNum(record);
if (profileBestCombo) profileBestCombo.textContent = fmtNum(bestCombo);
if (profileCurrentRank) profileCurrentRank.textContent = currentTier.name;
lastKnownXP = currentXP;
updateHomePlayButtonState();
if (window.ttMissionEngine && window.ttMissionEngine.refreshCosmetics) {
window.ttMissionEngine.refreshCosmetics();
}
}
if (profileCornerBtn && profileModal) {
profileCornerBtn.addEventListener("click", () => {
playSynthEffect("click");
if (editUsernameBox) editUsernameBox.style.display = "none";
hideErrorBox(editUsernameErrorMsg);
refreshAllProfileAndRankUI();
profileModal.style.display = "flex";
});
}
if (closeProfileBtn && profileModal) {
closeProfileBtn.addEventListener("click", (e) => {
e.stopPropagation();
playSynthEffect("click");
if (editUsernameBox) editUsernameBox.style.display = "none";
hideErrorBox(editUsernameErrorMsg);
profileModal.style.display = "none";
});
}
if (editUsernameBtn && editUsernameBox) {
editUsernameBtn.addEventListener("click", (e) => {
e.stopPropagation();
playSynthEffect("click");
hideErrorBox(editUsernameErrorMsg);
if (newUsernameInput) newUsernameInput.value = playerUsername;
editUsernameBox.style.display = "flex";
if (newUsernameInput) newUsernameInput.focus();
});
}
if (cancelUsernameChangeBtn && editUsernameBox) {
cancelUsernameChangeBtn.addEventListener("click", () => {
playSynthEffect("click");
hideErrorBox(editUsernameErrorMsg);
editUsernameBox.style.display = "none";
});
}
if (confirmUsernameChangeBtn && newUsernameInput) {
confirmUsernameChangeBtn.addEventListener("click", async () => {
const updated = sanitizeUsernameKey(newUsernameInput.value);
if (updated.length < 2) {
showErrorBox(editUsernameErrorMsg, "USE AT LEAST 2 LETTERS/NUMBERS!");
newUsernameInput.focus();
return;
}
if (containsProfanity(updated)) {
playSynthEffect("red");
showErrorBox(editUsernameErrorMsg, "OFFENSIVE USERNAME NOT ALLOWED!");
newUsernameInput.focus();
return;
}
if (updated === playerUsername) {
editUsernameBox.style.display = "none";
return;
}
confirmUsernameChangeBtn.disabled = true;
confirmUsernameChangeBtn.textContent = "...";
const isFree = await checkUsernameAvailable(updated);
confirmUsernameChangeBtn.disabled = false;
confirmUsernameChangeBtn.textContent = "SAVE";
if (!isFree) {
playSynthEffect("red");
showErrorBox(editUsernameErrorMsg, "USERNAME ALREADY IN USE!");
newUsernameInput.focus();
return;
}
const oldName = playerUsername;
playerUsername = updated;
localStorage.setItem("timeTapUsername", playerUsername);
hideErrorBox(editUsernameErrorMsg);
playSynthEffect("gold");
if (editUsernameBox) editUsernameBox.style.display = "none";
refreshAllProfileAndRankUI();
syncPlayerToCloud(playerUsername, oldName);
});
}
function launchFireworksShow() {
if (!fireworksContainer) return;
fireworksContainer.innerHTML = "";
const colors = ["#fde047", "#ef4444", "#4ade80", "#38bdf8", "#c084fc", "#ffffff"];
for (let b = 0; b < 6; b++) {
setTimeout(() => {
const cx = 15 + Math.random() * 70;
const cy = 15 + Math.random() * 55;
playSynthEffect("milestone");
for (let p = 0; p < 26; p++) {
const dot = document.createElement("span");
dot.className = "fw-particle";
const col = colors[Math.floor(Math.random() * colors.length)];
const sz = (6 + Math.random() * 6).toFixed(0) + "px";
dot.style.width = sz;
dot.style.height = sz;
dot.style.background = col;
dot.style.boxShadow = "0 0 10px " + col;
dot.style.left = cx + "%";
dot.style.top = cy + "%";
const angle = (Math.PI * 2 * p) / 26 + (Math.random() * 0.25);
const dist = 60 + Math.random() * 110;
dot.style.setProperty("--dx", (Math.cos(angle) * dist) + "px");
dot.style.setProperty("--dy", (Math.sin(angle) * dist) + "px");
fireworksContainer.appendChild(dot);
setTimeout(() => dot.remove(), 1150);
}
}, b * 360);
}
}
function checkAndTriggerRankUpCelebration() {
const currentXP = calculateTotalXP();
const { currentTier } = getCurrentAndNextTier(currentXP);
if (currentTier.level > highestCelebratedLevel) {
highestCelebratedLevel = currentTier.level;
localStorage.setItem("highestCelebratedLevel", highestCelebratedLevel);
refreshAllProfileAndRankUI();
syncPlayerToCloud(playerUsername);
if (rankUpCelebration) {
if (celebrationRankName) celebrationRankName.textContent = currentTier.name;
if (celebrationTitleUnlocked) {
celebrationTitleUnlocked.textContent = "LEVEL " + currentTier.level + " / " + MAX_LEVEL;
}
rankUpCelebration.style.display = "flex";
playSynthEffect("newrecord");
speakEnglish("Level up! " + currentTier.name, 1.05, 1.15);
launchFireworksShow();
}
}
}
if (claimRankBtn && rankUpCelebration) {
claimRankBtn.addEventListener("click", () => {
playSynthEffect("click");
rankUpCelebration.style.display = "none";
});
}
const SPECIAL_SVGS = {
bomb: '',
ice: '',
clock: '',
gold: ''
};
let soundEnabled = localStorage.getItem("soundEnabled") !== "false";
function updateAudioButton() {
if (!audioToggleBtn) return;
audioToggleBtn.textContent = soundEnabled ? "ON" : "OFF";
audioToggleBtn.classList.toggle("muted", !soundEnabled);
}
updateAudioButton();
if (audioToggleBtn) {
audioToggleBtn.addEventListener("click", () => {
soundEnabled = !soundEnabled;
localStorage.setItem("soundEnabled", soundEnabled);
updateAudioButton();
if (soundEnabled) {
playSynthEffect("click");
} else if ("speechSynthesis" in window) {
window.speechSynthesis.cancel();
}
});
}
let musicEnabled = localStorage.getItem("musicEnabled") !== "false";
let musicToggleBtn = document.getElementById("musicToggleBtn");
if (!musicToggleBtn && settingsModal) {
const modalCard = settingsModal.querySelector(".modal-card");
if (modalCard) {
const musicRow = document.createElement("div");
musicRow.className = "setting-row";
musicRow.style.marginTop = "12px";
const musicLabel = document.createElement("span");
musicLabel.textContent = "Music";
musicToggleBtn = document.createElement("button");
musicToggleBtn.id = "musicToggleBtn";
musicToggleBtn.className = "toggle-pill-btn";
musicToggleBtn.textContent = "ON";
musicRow.appendChild(musicLabel);
musicRow.appendChild(musicToggleBtn);
modalCard.appendChild(musicRow);
}
}
function updateMusicButton() {
if (!musicToggleBtn) return;
musicToggleBtn.textContent = musicEnabled ? "ON" : "OFF";
musicToggleBtn.classList.toggle("muted", !musicEnabled);
}
updateMusicButton();
if (musicToggleBtn) {
musicToggleBtn.addEventListener("click", () => {
musicEnabled = !musicEnabled;
localStorage.setItem("musicEnabled", musicEnabled);
updateMusicButton();
playSynthEffect("click");
if (musicEnabled) {
startHomeSymphony();
} else {
stopHomeSymphony();
}
});
}
if (settingsBtn && settingsModal) {
settingsBtn.addEventListener("click", () => {
playSynthEffect("click");
settingsModal.style.display = "flex";
});
}
if (closeSettingsBtn && settingsModal) {
closeSettingsBtn.addEventListener("click", () => {
playSynthEffect("click");
settingsModal.style.display = "none";
});
}
const activeButtons = [];
const arrows = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
let baseButtonDuration = isDesktop ? 1850 : 1350;
let baseSpawnDelay = isDesktop ? 210 : 220;
let audioCtx = null;
function ensureAudioContext() {
try {
const AudioCtx = window.AudioContext || window.webkitAudioContext;
if (!AudioCtx) return null;
if (!audioCtx) audioCtx = new AudioCtx();
if (audioCtx.state === "suspended") audioCtx.resume();
return audioCtx;
} catch (e) {
return null;
}
}
function initAudio() {
const ctx = ensureAudioContext();
if (!ctx) return;
try {
const buffer = ctx.createBuffer(1, 1, 22050);
const source = ctx.createBufferSource();
source.buffer = buffer;
source.connect(ctx.destination);
source.start(0);
} catch (e) {}
}
let symphonyInterval = null;
let symphonyStep = 0;
function playSymphonyNote(freq, duration, startTime, vol, waveType = "triangle") {
if (!audioCtx || !musicEnabled || !freq) return;
const osc = audioCtx.createOscillator();
const gain = audioCtx.createGain();
osc.type = waveType;
osc.frequency.setValueAtTime(freq, startTime);
gain.gain.setValueAtTime(0.001, startTime);
gain.gain.linearRampToValueAtTime(vol, startTime + 0.025);
gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
osc.connect(gain);
gain.connect(audioCtx.destination);
osc.start(startTime);
osc.stop(startTime + duration + 0.02);
}
function startHomeSymphony() {
if (!musicEnabled || symphonyInterval) return;
if (menu && menu.style.display === "none") return;
const ctx = ensureAudioContext();
if (!ctx) return;
const melody = [
523.25, 659.25, 783.99, 1046.50,  987.77, 783.99, 659.25, 0,
587.33, 698.46, 880.00, 987.77,   783.99, 0,      659.25, 0,
523.25, 659.25, 783.99, 1046.50,  1174.66, 1046.50, 880.00, 698.46,
783.99, 659.25, 587.33, 493.88,   523.25, 0,      523.25, 0
];
const harmony = [
261.63, 329.63, 392.00, 329.63,   293.66, 392.00, 493.88, 392.00,
349.23, 440.00, 523.25, 440.00,   392.00, 493.88, 587.33, 493.88,
261.63, 329.63, 392.00, 329.63,   349.23, 440.00, 523.25, 440.00,
392.00, 329.63, 293.66, 246.94,   261.63, 196.00, 261.63, 0
];
const bass = [
130.81, 0, 196.00, 0,   146.83, 0, 196.00, 0,
174.61, 0, 130.81, 0,   196.00, 0, 146.83, 0,
130.81, 0, 196.00, 0,   174.61, 0, 220.00, 0,
196.00, 0, 196.00, 0,   130.81, 0, 130.81, 0
];
symphonyStep = 0;
const STEP_MS = 230;
symphonyInterval = setInterval(() => {
if (!musicEnabled || (menu && menu.style.display === "none")) {
stopHomeSymphony();
return;
}
if (!audioCtx || audioCtx.state !== "running") return;
const now = audioCtx.currentTime;
const i = symphonyStep % melody.length;
symphonyStep++;
if (melody[i] > 0) {
playSymphonyNote(melody[i], 0.24, now, 0.13, "triangle");
playSymphonyNote(melody[i] * 2, 0.18, now, 0.03, "sine");
}
if (harmony[i] > 0) {
playSymphonyNote(harmony[i], 0.21, now, 0.055, "sine");
}
if (bass[i] > 0) {
playSymphonyNote(bass[i], 0.34, now, 0.12, "sine");
}
}, STEP_MS);
}
function stopHomeSymphony() {
if (symphonyInterval) {
clearInterval(symphonyInterval);
symphonyInterval = null;
}
}
function handleFirstInteraction() {
initAudio();
startHomeSymphony();
}
document.addEventListener("touchstart", handleFirstInteraction, { once: true });
document.addEventListener("pointerdown", handleFirstInteraction, { once: true });
function playTone(freq, endFreq, type, startTime, duration, vol) {
if (!audioCtx || !soundEnabled) return;
const osc = audioCtx.createOscillator();
const gain = audioCtx.createGain();
osc.type = type;
osc.frequency.setValueAtTime(freq, startTime);
if (endFreq !== null) {
osc.frequency.exponentialRampToValueAtTime(endFreq, startTime + duration);
}
gain.gain.setValueAtTime(vol, startTime);
gain.gain.exponentialRampToValueAtTime(0.008, startTime + duration);
osc.connect(gain);
gain.connect(audioCtx.destination);
osc.start(startTime);
osc.stop(startTime + duration);
}
function playFeverRushBeat() {
if (!soundEnabled) return;
initAudio();
if (!audioCtx) return;
const now = audioCtx.currentTime;
const leadMelody = [440, 523.25, 659.25, 880, 783.99, 659.25, 587.33, 659.25];
const bassLine = [110, 110, 130.81, 130.81, 146.83, 146.83, 164.81, 164.81];
const idx = feverNoteStep % leadMelody.length;
feverNoteStep++;
playTone(leadMelody[idx], leadMelody[idx] * 1.02, "triangle", now, 0.14, 0.24);
playTone(bassLine[idx], null, "sine", now, 0.15, 0.28);
}
function playSynthEffect(type) {
if (!soundEnabled) return;
initAudio();
if (!audioCtx) return;
const now = audioCtx.currentTime;
if (type === "green") {
const step = Math.min(comboCount * 10, 160);
playTone(260 + step, 440 + step, "sine", now, 0.11, 0.55);
playTone(150 + step * 0.4, 90, "triangle", now, 0.08, 0.35);
} else if (type === "red") {
playTone(190, 75, "sawtooth", now, 0.22, 0.45);
} else if (type === "gold") {
[440, 554.37, 659.25, 880].forEach((f, i) => {
playTone(f, null, "sine", now + i * 0.045, 0.16, 0.42);
});
} else if (type === "ice") {
[880, 1174.66, 1318.51, 1760].forEach((f, i) => {
playTone(f, null, "sine", now + i * 0.04, 0.22, 0.35);
});
} else if (type === "clock") {
playTone(720, 260, "sine", now, 0.45, 0.4);
playTone(540, 195, "triangle", now + 0.06, 0.45, 0.35);
} else if (type === "bomb") {
playTone(140, 35, "sawtooth", now, 0.45, 0.65);
playTone(100, 28, "square", now, 0.45, 0.55);
} else if (type === "epic") {
[392, 493.88, 587.33, 783.99].forEach((f) => {
playTone(f, null, "triangle", now, 0.3, 0.32);
});
} else if (type === "milestone") {
[440, 587.33, 783.99].forEach((f, i) => {
playTone(f, null, "sine", now + i * 0.055, 0.18, 0.28);
});
} else if (type === "newrecord") {
[440, 554.37, 659.25, 880, 659.25, 880].forEach((f, i) => {
playTone(f, null, "triangle", now + i * 0.085, 0.22, 0.38);
});
} else if (type === "tick") {
playTone(620, null, "sine", now, 0.045, 0.2);
} else if (type === "click") {
playTone(420, 640, "sine", now, 0.075, 0.32);
} else if (type === "beep") {
playTone(392, null, "sine", now, 0.11, 0.32);
} else if (type === "go") {
playTone(659.25, null, "sine", now, 0.22, 0.42);
} else if (type === "gameover") {
playTone(293.66, null, "sawtooth", now, 0.24, 0.28);
playTone(277.18, null, "sawtooth", now + 0.26, 0.24, 0.28);
playTone(261.63, null, "sawtooth", now + 0.52, 0.24, 0.28);
playTone(246.94, 190, "sawtooth", now + 0.78, 0.7, 0.28);
}
}
function spawnFloatingText(x, y, text, color) {
const el = document.createElement("div");
el.className = "floating-text";
el.textContent = text;
el.style.left = x + "px";
el.style.top = y + "px";
el.style.color = color;
game.appendChild(el);
setTimeout(() => el.remove(), 600);
}
function spawnTapRipple(x, y, color) {
const ripple = document.createElement("div");
ripple.className = "tap-ripple";
ripple.style.left = x + "px";
ripple.style.top = y + "px";
ripple.style.borderColor = color;
game.appendChild(ripple);
setTimeout(() => ripple.remove(), 460);
}
function triggerScreenShake() {
game.classList.remove("screen-shake");
void game.offsetWidth;
game.classList.add("screen-shake");
}
function triggerMaxCapFeedback() {
if (navigator.vibrate) {
try { navigator.vibrate(35); } catch (e) {}
}
if (timerCircle) {
timerCircle.classList.remove("timer-max-cap");
void timerCircle.offsetWidth;
timerCircle.classList.add("timer-max-cap");
}
}
function savePausedGameState() {
const savedButtons = activeButtons.map(btn => ({
action: btn.dataset.action,
key: btn.dataset.key,
value: btn.dataset.value || "",
left: parseFloat(btn.style.left) || 0,
top: parseFloat(btn.style.top) || 0,
remainingMs: Math.max(250, Number(btn.dataset.remainingMs) || baseButtonDuration),
totalMs: Number(btn.dataset.totalMs) || baseButtonDuration
}));
const payload = {
time,
score,
comboCount,
maxComboRun,
doubleBonus,
doubleBonusRemainingMs,
isFrozen,
freezeRemainingMs,
isSlowMo,
slowMoRemainingMs,
overdriveRemainingMs,
buttons: savedButtons
};
localStorage.setItem(PAUSE_STATE_KEY, JSON.stringify(payload));
}
function clearSavedPausedState() {
localStorage.removeItem(PAUSE_STATE_KEY);
updateHomePlayButtonState();
}
function updatePauseButtonUI() {
if (!pauseBtn) return;
if (pauseCooldownRemainingMs > 0) {
const secLeft = Math.ceil(pauseCooldownRemainingMs / 1000);
pauseBtn.disabled = true;
pauseBtn.classList.add("on-cooldown");
pauseBtn.textContent = secLeft + "s";
} else {
pauseBtn.disabled = false;
pauseBtn.classList.remove("on-cooldown");
pauseBtn.textContent = "II";
}
}
function pauseGame() {
if (!running || isPaused || isResumingCountdown || pauseCooldownRemainingMs > 0) return;
isPaused = true;
savePausedGameState();
if (pauseOverlay) pauseOverlay.style.display = "flex";
}
function runResumeCountdown(onComplete) {
if (isResumingCountdown) return;
isResumingCountdown = true;
initAudio();
stopHomeSymphony();
if (pauseOverlay) pauseOverlay.style.display = "none";
if (menu) menu.style.display = "none";
if (game) game.style.display = "block";
if (pauseBtn) pauseBtn.disabled = true;
countdown.style.display = "block";
triggerCountdownStep("3", "beep", "Three!", 1.0);
setTimeout(() => triggerCountdownStep("2", "beep", "Two!", 1.05), 1000);
setTimeout(() => triggerCountdownStep("1", "beep", "One!", 1.1), 2000);
setTimeout(() => triggerCountdownStep("GO!", "go", "Go!", 1.2), 3000);
setTimeout(() => {
countdown.style.display = "none";
isResumingCountdown = false;
onComplete();
}, 4000);
}
function resumeGame() {
if (!isPaused || isResumingCountdown) return;
runResumeCountdown(() => {
isPaused = false;
clearSavedPausedState();
pauseCooldownRemainingMs = PAUSE_COOLDOWN_MS;
updatePauseButtonUI();
});
}
function showRewardedAd(onRewardCallback) {
if (window.CrazyGames && window.CrazyGames.SDK && window.CrazyGames.SDK.ad) {
window.CrazyGames.SDK.ad.requestAd("rewarded", {
adFinished: () => onRewardCallback(),
adError: () => showMessage("AD NOT READY", "")
});
return;
}
if (window.PokiSDK && typeof window.PokiSDK.rewardedBreak === "function") {
window.PokiSDK.rewardedBreak().then((success) => {
if (success) onRewardCallback();
});
return;
}
if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.AdMob) {
window.Capacitor.Plugins.AdMob.showRewardVideoAd()
.then(() => onRewardCallback())
.catch(() => showMessage("AD NOT READY", ""));
return;
}
onRewardCallback();
}
function reviveRunAfterAd() {
if (gameOverScreen) gameOverScreen.style.display = "none";
if (game) game.style.display = "block";
secondChanceUsed = true;
time = 3.0;
isFrozen = false;
isSlowMo = false;
if (timerCircle) timerCircle.textContent = time.toFixed(1);
updateTimerVisuals();
running = true;
isPaused = true;
runResumeCountdown(() => {
isPaused = false;
startGame(true);
});
}
function finalizeRunStatsAndShowSummary() {
const xpBeforeRun = calculateTotalXP();
const isNewBest = score > record && score > 0;
const pcMultiplier = isDesktop ? 1.25 : 1.0;
let comboBonusPct = 0;
if (maxComboRun > 200) {
comboBonusPct = 20;
} else if (maxComboRun > 100) {
comboBonusPct = 10;
}
gamesPlayed++;
totalScoreAccumulated += score;
if (isNewBest) {
record = score;
localStorage.setItem("record", record);
}
const baseRunXP = 2000 + Math.floor(score * 0.1) + (isNewBest ? 1500 : 0);
const withPcXP = Math.floor(baseRunXP * pcMultiplier);
const comboBonusXP = Math.floor(withPcXP * (comboBonusPct / 100));
const finalRunXP = withPcXP + comboBonusXP;
const diffPart = isNewBest ? Math.floor((score - record) * 0.1) : 0;
const naturalFormulaDiff = 2000 + Math.floor(score * 0.04) + diffPart;
const extraToStore = Math.max(0, finalRunXP - Math.max(0, naturalFormulaDiff));
storedBonusXP += extraToStore;
localStorage.setItem("gamesPlayed", gamesPlayed);
localStorage.setItem("totalScoreAccumulated", totalScoreAccumulated);
localStorage.setItem("storedBonusXP", storedBonusXP);
if (maxComboRun > bestCombo) {
bestCombo = maxComboRun;
localStorage.setItem("bestCombo", bestCombo);
}
const xpAfterRun = calculateTotalXP();
const earnedXP = Math.max(0, xpAfterRun - xpBeforeRun);
if (xpEarnedBadge) {
const comboLabel = comboBonusPct > 0 ? " + " + comboBonusPct + "% COMBO" : "";
xpEarnedBadge.textContent = "+" + fmtNum(earnedXP) + " XP" + comboLabel;
}
const { currentTier: tierAfter, nextTier: nextAfter } = getCurrentAndNextTier(xpAfterRun);
if (goRankFrom) goRankFrom.textContent = tierAfter.name;
if (goRankTo) goRankTo.textContent = nextAfter ? nextAfter.name : "MAX";
if (goXpProgressText) {
goXpProgressText.textContent = nextAfter
? fmtNum(xpAfterRun) + " / " + fmtNum(nextAfter.xpRequired) + " XP"
: fmtNum(xpAfterRun) + " XP";
}
if (reviveBtn) {
reviveBtn.style.display = (!secondChanceUsed && score > 0) ? "block" : "none";
}
if (menu) menu.style.display = "none";
if (gameOverScreen) gameOverScreen.style.display = "flex";
finalScore.textContent = fmtNum(score);
finalCombo.textContent = fmtNum(maxComboRun);
if (goXpBarFill) {
const startPct = computeSegmentPercent(xpBeforeRun);
const endPct = computeSegmentPercent(xpAfterRun);
goXpBarFill.style.transition = "none";
goXpBarFill.style.width = startPct.toFixed(1) + "%";
setTimeout(() => {
goXpBarFill.style.transition = "width 1.15s cubic-bezier(0.22, 1, 0.36, 1)";
goXpBarFill.style.width = endPct.toFixed(1) + "%";
}, 120);
}
if (isNewBest) {
newRecordMessage.style.display = "block";
isAnimatingRecord = true;
playSynthEffect("newrecord");
speakEnglish("New record!", 1.05, 1.15);
finalRecord.textContent = "0";
animateScoreCounter(finalRecord, record, () => {
isAnimatingRecord = false;
});
} else {
newRecordMessage.style.display = "none";
playSynthEffect("gameover");
speakEnglish("Game over!", 0.95, 0.95);
finalRecord.textContent = fmtNum(record);
}
if (window.ttMissionEngine) window.ttMissionEngine.onRunEnd(score, maxComboRun);
refreshAllProfileAndRankUI(xpBeforeRun);
syncPlayerToCloud(playerUsername);
}
function returnToHome(keepPausedRun = false) {
const xpAtEnter = lastKnownXP;
if (keepPausedRun) {
savePausedGameState();
} else {
clearSavedPausedState();
}
running = false;
isPaused = false;
isResumingCountdown = false;
isFrozen = false;
isSlowMo = false;
doubleBonus = false;
overdriveRemainingMs = 0;
pauseCooldownRemainingMs = 0;
secondChanceUsed = false;
updatePauseButtonUI();
clearInterval(gameLoopInterval);
while (activeButtons.length > 0) {
const b = activeButtons.shift();
if (b && b.parentNode) b.remove();
}
if (pauseOverlay) pauseOverlay.style.display = "none";
if (gameOverScreen) gameOverScreen.style.display = "none";
if (game) {
game.style.display = "none";
game.classList.remove("overdrive-active", "slowmo-active");
}
if (countdown) countdown.style.display = "none";
if (menu) menu.style.display = "flex";
time = baseTime;
score = 0;
comboCount = 0;
maxComboRun = 0;
normalSpawnsSinceLastSpecial = 8;
if (timerCircle) {
timerCircle.textContent = time.toFixed(1);
timerCircle.classList.remove("timer-panic", "timer-frozen", "timer-slowmo", "timer-max-cap");
}
if (scoreText) scoreText.textContent = "SCORE: 0";
if (comboText) {
comboText.textContent = "COMBO 0";
comboText.
classList.remove("combo-fire");
}
refreshAllProfileAndRankUI(xpAtEnter);
checkAndTriggerRankUpCelebration();
startHomeSymphony();
}
if (pauseBtn) {
pauseBtn.addEventListener("click", () => {
playSynthEffect("click");
pauseGame();
});
}
if (resumeBtn) {
resumeBtn.addEventListener("click", () => {
playSynthEffect("click");
resumeGame();
});
}
if (quitToHomeBtn) {
quitToHomeBtn.addEventListener("click", () => {
playSynthEffect("click");
returnToHome(true);
});
}
window.addEventListener("beforeunload", () => {
if (running && isPaused) {
savePausedGameState();
}
});
function resumeSavedRunFromHome() {
const raw = localStorage.getItem(PAUSE_STATE_KEY);
if (!raw) {
startCountdown();
return;
}
try {
const saved = JSON.parse(raw);
if (!saved || typeof saved.time !== "number" || saved.time <= 0) {
clearSavedPausedState();
startCountdown();
return;
}
time = Math.min(MAX_TIME, saved.time);
score = saved.score || 0;
comboCount = saved.comboCount || 0;
maxComboRun = saved.maxComboRun || 0;
doubleBonus = Boolean(saved.doubleBonus);
doubleBonusRemainingMs = saved.doubleBonusRemainingMs || 0;
isFrozen = Boolean(saved.isFrozen);
freezeRemainingMs = saved.freezeRemainingMs || 0;
isSlowMo = Boolean(saved.isSlowMo);
slowMoRemainingMs = saved.slowMoRemainingMs || 0;
overdriveRemainingMs = saved.overdriveRemainingMs || 0;
pauseCooldownRemainingMs = 0;
secondChanceUsed = false;
stopHomeSymphony();
if (window.ttMissionEngine) window.ttMissionEngine.onRunStart();
if (menu) menu.style.display = "none";
if (game) game.style.display = "block";
timerCircle.textContent = time.toFixed(1);
scoreText.textContent = "SCORE: " + fmtNum(score);
comboText.textContent = "COMBO " + comboCount;
updateTimerVisuals();
if (Array.isArray(saved.buttons)) {
saved.buttons.forEach(bData => createButton(bData));
}
running = true;
isPaused = true;
runResumeCountdown(() => {
isPaused = false;
clearSavedPausedState();
startGame(true);
pauseCooldownRemainingMs = PAUSE_COOLDOWN_MS;
updatePauseButtonUI();
});
} catch (e) {
clearSavedPausedState();
startCountdown();
}
}
if (playBtn) {
playBtn.addEventListener("click", () => {
playSynthEffect("click");
if (hasSavedRun()) {
resumeSavedRunFromHome();
} else {
startCountdown();
}
});
}
if (discardSavedBtn && confirmNewRunModal) {
discardSavedBtn.addEventListener("click", () => {
playSynthEffect("click");
confirmNewRunModal.style.display = "flex";
});
}
if (confirmNewRunNoBtn) {
confirmNewRunNoBtn.addEventListener("click", () => {
playSynthEffect("click");
if (confirmNewRunModal) confirmNewRunModal.style.display = "none";
});
}
if (confirmNewRunYesBtn) {
confirmNewRunYesBtn.addEventListener("click", () => {
playSynthEffect("click");
if (confirmNewRunModal) confirmNewRunModal.style.display = "none";
const raw = localStorage.getItem(PAUSE_STATE_KEY);
clearSavedPausedState();
if (raw) {
try {
const saved = JSON.parse(raw);
score = saved.score || 0;
maxComboRun = saved.maxComboRun || 0;
} catch (e) {
score = 0;
maxComboRun = 0;
}
}
finalizeRunStatsAndShowSummary();
});
}
if (playAgainBtn) {
playAgainBtn.addEventListener("click", () => {
if (!isAnimatingRecord) {
clearSavedPausedState();
playSynthEffect("click");
if (gameOverScreen) gameOverScreen.style.display = "none";
if (game) game.style.display = "none";
time = baseTime;
score = 0;
comboCount = 0;
maxComboRun = 0;
overdriveRemainingMs = 0;
pauseCooldownRemainingMs = 0;
secondChanceUsed = false;
updatePauseButtonUI();
normalSpawnsSinceLastSpecial = 8;
if (timerCircle) timerCircle.textContent = time.toFixed(1);
if (scoreText) scoreText.textContent = "SCORE: 0";
if (comboText) {
comboText.textContent = "COMBO 0";
comboText.classList.remove("combo-fire");
}
startCountdown();
}
});
}
if (homeBtn) {
homeBtn.addEventListener("click", () => {
if (!isAnimatingRecord) {
playSynthEffect("click");
returnToHome(false);
}
});
}
function speakEnglish(phrase, rate = 1.05, pitch = 1.08) {
if (!soundEnabled) return;
try {
if (!("speechSynthesis" in window)) return;
window.speechSynthesis.cancel();
const utterance = new SpeechSynthesisUtterance(phrase);
utterance.lang = "en-US";
utterance.rate = rate;
utterance.pitch = pitch;
utterance.volume = 1;
const voices = window.speechSynthesis.getVoices();
const preferredVoices = [
"Google US English",
"Microsoft Aria",
"Microsoft Jenny",
"Samantha",
"Karen",
"Serena",
"Natural"
];
const selectedVoice =
voices.find(v => v.lang.startsWith("en") && preferredVoices.some(name => v.name.includes(name))) ||
voices.find(v => v.lang === "en-US") ||
voices.find(v => v.lang.startsWith("en"));
if (selectedVoice) utterance.voice = selectedVoice;
window.speechSynthesis.speak(utterance);
} catch (e) {}
}
if ("speechSynthesis" in window) {
window.speechSynthesis.getVoices();
window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}
function triggerCountdownStep(text, synthType, spoken, pitch) {
countdown.textContent = text;
countdown.classList.remove("countdown-pop");
void countdown.offsetWidth;
countdown.classList.add("countdown-pop");
playSynthEffect(synthType);
speakEnglish(spoken, 1.08, pitch);
}
function startCountdown() {
initAudio();
stopHomeSymphony();
if (window.ttMissionEngine) window.ttMissionEngine.onRunStart();
secondChanceUsed = false;
pauseCooldownRemainingMs = 0;
updatePauseButtonUI();
menu.style.display = "none";
countdown.style.display = "block";
triggerCountdownStep("3", "beep", "Three!", 1.0);
setTimeout(() => triggerCountdownStep("2", "beep", "Two!", 1.05), 1000);
setTimeout(() => triggerCountdownStep("1", "beep", "One!", 1.1), 2000);
setTimeout(() => triggerCountdownStep("GO!", "go", "Go!", 1.2), 3000);
setTimeout(() => {
countdown.style.display = "none";
game.style.display = "block";
startGame(false);
}, 4000);
}
function updateTimerVisuals() {
if (timerRingProgress) {
const ratio = Math.max(0, Math.min(1, time / MAX_TIME));
const offset = RING_CIRCUMFERENCE * (1 - ratio);
timerRingProgress.style.strokeDashoffset = offset.toFixed(1);
if (isFrozen) {
timerRingProgress.style.stroke = "#7dd3fc";
} else if (isSlowMo) {
timerRingProgress.style.stroke = "#e879f9";
} else if (time <= 1.2) {
timerRingProgress.style.stroke = "#ef4444";
} else if (time <= 3.0) {
timerRingProgress.style.stroke = "#facc15";
} else {
timerRingProgress.style.stroke = "#4ade80";
}
}
timerCircle.classList.toggle("timer-frozen", isFrozen);
timerCircle.classList.toggle("timer-slowmo", isSlowMo && !isFrozen);
game.classList.toggle("slowmo-active", isSlowMo);
game.classList.toggle("overdrive-active", overdriveRemainingMs > 0);
if (isFrozen) {
timerCircle.classList.remove("timer-panic");
return;
}
if (isSlowMo) {
timerCircle.style.background =
"radial-gradient(circle at 30% 30%, #f5d0fe 0%, #c084fc 55%, #7e22ce 100%)";
timerCircle.style.boxShadow =
"inset 0 8px 0 rgba(255,255,255,0.45), 0 11px 0 #581c87, 0 0 32px rgba(192,132,252,0.9)";
timerCircle.classList.remove("timer-panic");
return;
}
if (time <= 1.0) {
timerCircle.style.background =
"radial-gradient(circle at 30% 30%, #fecaca 0%, #ef4444 50%, #b91c1c 100%)";
timerCircle.style.boxShadow =
"inset 0 8px 0 rgba(255, 255, 255, 0.35), 0 11px 0 #7f1d1d, 0 0 28px rgba(239, 68, 68, 0.9)";
timerCircle.classList.add("timer-panic");
} else {
timerCircle.style.background =
"radial-gradient(circle at 30% 30%, #bfdbfe 0%, #3b82f6 50%, #1d4ed8 100%)";
timerCircle.style.boxShadow =
"inset 0 6px 0 rgba(255, 255, 255, 0.32), 0 11px 0 #1e3a8a, 0 20px 30px rgba(0, 0, 0, 0.45)";
timerCircle.classList.remove("timer-panic");
}
}
function startGame(isRestored = false) {
running = true;
if (!isRestored) {
pauseCooldownRemainingMs = 0;
normalSpawnsSinceLastSpecial = 8;
createButton();
createButton();
}
updatePauseButtonUI();
updateTimerVisuals();
const TICK_MS = 50;
clearInterval(gameLoopInterval);
gameLoopInterval = setInterval(() => {
if (!running || isPaused) return;
if (pauseCooldownRemainingMs > 0) {
pauseCooldownRemainingMs = Math.max(0, pauseCooldownRemainingMs - TICK_MS);
updatePauseButtonUI();
}
if (overdriveRemainingMs > 0) {
overdriveRemainingMs = Math.max(0, overdriveRemainingMs - TICK_MS);
feverMusicTimer += TICK_MS;
if (feverMusicTimer >= 165) {
feverMusicTimer = 0;
playFeverRushBeat();
}
} else {
feverMusicTimer = 0;
}
if (isFrozen) {
freezeRemainingMs -= TICK_MS;
if (freezeRemainingMs <= 0) {
isFrozen = false;
freezeRemainingMs = 0;
}
}
if (isSlowMo) {
slowMoRemainingMs -= TICK_MS;
if (slowMoRemainingMs <= 0) {
isSlowMo = false;
slowMoRemainingMs = 0;
}
}
if (doubleBonus) {
doubleBonusRemainingMs -= TICK_MS;
if (doubleBonusRemainingMs <= 0) {
doubleBonus = false;
doubleBonusRemainingMs = 0;
}
}
const speedFactor = isSlowMo ? 0.4 : 1.0;
if (!isFrozen) {
const deltaSeconds = (TICK_MS / 1000) * speedFactor;
time = Math.max(0, Number((time - deltaSeconds).toFixed(3)));
timerCircle.textContent = time.toFixed(1);
if (time <= 1.0) {
panicTickCounter++;
if (panicTickCounter % 4 === 0 && time > 0) {
playSynthEffect("tick");
}
} else {
panicTickCounter = 0;
}
}
updateTimerVisuals();
if (time <= 0) {
gameOver();
return;
}
for (let i = activeButtons.length - 1; i >= 0; i--) {
const btn = activeButtons[i];
const rem = Number(btn.dataset.remainingMs) - TICK_MS * speedFactor;
const tot = Number(btn.dataset.totalMs) || baseButtonDuration;
btn.dataset.remainingMs = rem;
const ringCircle = btn.querySelector(".btn-expiry-ring circle");
if (ringCircle) {
const frac = Math.max(0, Math.min(1, rem / tot));
ringCircle.style.strokeDashoffset = (BTN_RING_CIRCUMFERENCE * (1 - frac)).toFixed(1);
}
if (rem <= 0) {
removeButton(btn);
}
}
spawnAccumulatorMs += TICK_MS * speedFactor;
if (spawnAccumulatorMs >= baseSpawnDelay) {
spawnAccumulatorMs = 0;
if (activeButtons.length < 6) {
createButton();
}
}
}, TICK_MS);
}
function renderButtonInner(btn, type, valueText) {
let contentHtml = "";
if (type === "bomb") {
contentHtml = SPECIAL_SVGS.bomb + 'BOMB';
} else if (type === "ice") {
contentHtml = SPECIAL_SVGS.ice + 'FREEZE';
} else if (type === "clock") {
contentHtml = SPECIAL_SVGS.clock + 'SLOW';
} else if (type === "gold") {
contentHtml = SPECIAL_SVGS.gold + '2X TIME';
} else {
contentHtml = valueText;
}
const ringSvg = '';
btn.innerHTML = ringSvg + '' + contentHtml + '';
}
function createButton(forcedConfig = null) {
let type = "green";
let key = "";
let valueStr = "";
if (forcedConfig) {
type = forcedConfig.action;
key = forcedConfig.key;
valueStr = forcedConfig.value;
} else {
const greenSlotsCount = activeButtons.filter(b =>
["green", "gold", "ice", "clock"].includes(b.dataset.action)
).length;
const redSlotsCount = activeButtons.filter(b =>
["red", "bomb"].includes(b.dataset.action)
).length;
if (greenSlotsCount >= 4 && redSlotsCount >= 2) return;
const hasSpecialOnScreen = activeButtons.some(b =>
["gold", "ice", "bomb", "clock"].includes(b.dataset.action)
);
if (greenSlotsCount >= 4) {
type = "red";
} else if (redSlotsCount >= 2) {
type = "green";
} else if (greenSlotsCount >= 2 && redSlotsCount === 0) {
type = "red";
} else if (redSlotsCount >= 1 && greenSlotsCount === 0) {
type = "green";
} else {
type = Math.random() < 0.65 ? "green" : "red";
}
const canSpawnPowerup = !hasSpecialOnScreen && normalSpawnsSinceLastSpecial >= 8 && time < 3.0;
const canSpawnBomb = !hasSpecialOnScreen && normalSpawnsSinceLastSpecial >= 8;
if (type === "green" && canSpawnPowerup) {
const rand = Math.random();
if (rand < 0.008 && !isSlowMo) {
type = "clock";
} else if (rand < 0.017 && !isFrozen) {
type = "ice";
} else if (rand < 0.027 && !doubleBonus) {
type = "gold";
}
} else if (type === "red" && canSpawnBomb) {
if (Math.random() < 0.014) {
type = "bomb";
}
}
if (["gold", "ice", "bomb", "clock"].includes(type)) {
normalSpawnsSinceLastSpecial = 0;
} else {
normalSpawnsSinceLastSpecial++;
}
const freeArrows = arrows.filter(a => !activeButtons.some(b => b.dataset.key === a));
key = freeArrows.length > 0
? freeArrows[Math.floor(Math.random() * freeArrows.length)]
: arrows[Math.floor(Math.random() * arrows.length)];
}
const btn = document.createElement("button");
btn.classList.add("button-circle");
let valueText = "";
if (type === "green") {
btn.classList.add("green");
const greenOptions = isDesktop ? [0.400, 0.450, 0.500, 0.550] : [0.280, 0.300, 0.350, 0.380];
const value = forcedConfig ? Number(valueStr) : greenOptions[Math.floor(Math.random() * greenOptions.length)];
btn.dataset.value = value;
valueText = "+" + value.toFixed(3);
} else if (type === "red") {
btn.classList.add("red");
const redOptions = [0.4, 0.5, 0.6, 0.7];
const value = forcedConfig ? Number(valueStr) : redOptions[Math.floor(Math.random() * redOptions.length)];
btn.dataset.value = value;
valueText = "-" + value.toFixed(1);
} else if (type === "ice") {
btn.classList.add("ice");
} else if (type === "clock") {
btn.classList.add("clock");
} else if (type === "bomb") {
btn.classList.add("bomb");
} else {
btn.classList.add("gold");
valueText = "2X";
}
let durationMs = baseButtonDuration;
if (type === "green" && overdriveRemainingMs > 0) {
durationMs = Math.round(baseButtonDuration * 0.80);
}
btn.dataset.key = key;
btn.dataset.action = type;
btn.dataset.totalMs = forcedConfig ? (forcedConfig.totalMs || durationMs) : durationMs;
btn.dataset.remainingMs = forcedConfig ? forcedConfig.remainingMs : durationMs;
renderButtonInner(btn, type, valueText);
let x = 0;
let y = 0;
if (forcedConfig) {
x = forcedConfig.left;
y = forcedConfig.top;
} else {
const btnSize = isDesktop ? 165 : 108;
const minCenterDist = isDesktop ? 245 : 150;
const minBtnDist = isDesktop ? 175 : 114;
const margin = 16;
let valid = false;
let attempts = 0;
const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;
while (!valid && attempts < 140) {
attempts++;
x = margin + Math.random() * (window.innerWidth - btnSize - margin * 2);
y = 80 + Math.random() * (window.innerHeight - btnSize - 98);
valid = true;
const distCenter = Math.hypot((x + btnSize / 2) - centerX, (y + btnSize / 2) - centerY);
if (distCenter < minCenterDist) valid = false;
if (valid) {
for (const existing of activeButtons) {
const ex = parseFloat(existing.style.left);
const ey = parseFloat(existing.style.top);
if (Math.hypot(x - ex, y - ey) < minBtnDist) {
valid = false;
break;
}
}
}
}
if (!valid) return;
}
btn.style.left = x + "px";
btn.style.top = y + "px";
btn.onpointerdown = (e) => {
e.preventDefault();
activateButton(btn);
};
game.appendChild(btn);
activeButtons.push(btn);
}
function spawnStars(x, y, mode) {
let count = 12;
let colors = ["#4ade80", "#bbf7d0", "#ffffff"];
let isDiamond = false;
if (mode === "gold") {
count = 20;
colors = ["#fde047", "#f59e0b", "#ffffff"];
isDiamond = true;
} else if (mode === "ice") {
count = 20;
colors = ["#ffffff", "#bae6fd", "#38bdf8", "#0284c7"];
isDiamond = true;
} else if (mode === "clock") {
count = 18;
colors = ["#f5d0fe", "#c084fc", "#fde047"];
isDiamond = true;
} else if (mode === "bomb") {
count = 24;
colors = ["#ef4444", "#f97316", "#facc15", "#1e293b"];
}
for (let i = 0; i < count; i++) {
const spark = document.createElement("span");
spark.className = "fx-spark" + (isDiamond ? " diamond" : "");
const size = (6 + Math.random() * 7).toFixed(0) + "px";
const color = colors[Math.floor(Math.random() * colors.length)];
spark.style.width = size;
spark.style.height = size;
spark.style.background = color;
spark.style.boxShadow = "0 0 8px " + color;
const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.4);
const radius = 22 + Math.random() * 42;
spark.style.left = x + "px";
spark.style.top = y + "px";
spark.style.setProperty("--dx", (Math.cos(angle) * radius) + "px");
spark.style.setProperty("--dy", (Math.sin(angle) * radius) + "px");
game.appendChild(spark);
setTimeout(() => spark.remove(), 480);
}
}
function activateButton(btn) {
if (!btn.parentNode || !running || isPaused) return;
const action = btn.dataset.action;
const rect = btn.getBoundingClientRect();
const centerX = rect.left + rect.width / 2;
const centerY = rect.top + rect.height / 2;
if (action === "green") {
const wasCritical = time <= 0.6 && !isFrozen;
const value = Number(btn.dataset.value);
const addedTime = doubleBonus ? value * 2 : value;
const rawNextTime = Number((time + addedTime).toFixed(3));
if (rawNextTime >= MAX_TIME) {
time = MAX_TIME;
triggerMaxCapFeedback();
} else {
time = rawNextTime;
}
comboCount++;
if (comboCount > maxComboRun) maxComboRun = comboCount;
const earnedPoints = 100 + comboCount * 20;
score += earnedPoints;
if (window.ttMissionEngine) window.ttMissionEngine.onGreenHit(score, comboCount);
if (timerCircle) {
timerCircle.classList.remove("timer-bounce");
void timerCircle.offsetWidth;
timerCircle.classList.add("timer-bounce");
}
spawnTapRipple(centerX, centerY, doubleBonus ? "#fde047" : "#4ade80");
spawnStars(centerX, centerY, "green");
spawnFloatingText(
centerX,
centerY,
(doubleBonus ? "2X +" : "+") + earnedPoints,
doubleBonus ? "#facc15" : "#4ade80"
);
if (comboCount === 101) {
playSynthEffect("newrecord");
showMessage("+10% XP BONUS!", "Ten percent X P bonus!");
} else if (comboCount === 201) {
playSynthEffect("newrecord");
showMessage("+20% XP BONUS!", "Twenty percent X P bonus!");
} else if (comboCount > 0 && comboCount % 80 === 0) {
overdriveRemainingMs = 6000;
feverNoteStep = 0;
playFeverRushBeat();
showMessage("FEVER x" + comboCount + "!", "Fever mode!");
} else if (wasCritical) {
triggerScreenShake();
playSynthEffect("epic");
showMessage("EPIC SAVE!", "Epic save!");
} else {
playSynthEffect("green");
checkComboMessages();
}
} else if (action === "red") {
triggerScreenShake();
playSynthEffect("red");
const value = Number(btn.dataset.value);
time = Number((time - value).toFixed(3));
comboCount = 0;
overdriveRemainingMs = 0;
spawnTapRipple(centerX, centerY, "#ef4444");
spawnFloatingText(centerX, centerY, "-" + value.toFixed(1) + "s", "#f87171");
if (time <= 0) {
time = 0;
timerCircle.textContent = "0.0";
removeButton(btn);
gameOver();
return;
}
} else if (action === "ice") {
playSynthEffect("ice");
isFrozen = true;
freezeRemainingMs = isDesktop ? 1700 : 1000;
updateTimerVisuals();
spawnTapRipple(centerX, centerY, "#38bdf8");
spawnStars(centerX, centerY, "ice");
spawnFloatingText(centerX, centerY, isDesktop ? "FREEZE 1.7s!" : "FREEZE 1s!", "#7dd3fc");
showMessage("FREEZE!", "Freeze!");
} else if (action === "clock") {
playSynthEffect("clock");
isSlowMo = true;
slowMoRemainingMs = isDesktop ? 2550 : 1500;
updateTimerVisuals();
spawnTapRipple(centerX, centerY, "#c084fc");
spawnStars(centerX, centerY, "clock");
spawnFloatingText(centerX, centerY, isDesktop ? "SLOW 2.55s!" : "SLOW 1.5s!", "#e9d5ff");
showMessage("SLOW TIME!", "Slow time!");
} else if (action === "bomb") {
triggerScreenShake();
playSynthEffect("bomb");
spawnTapRipple(centerX, centerY, "#ef4444");
spawnStars(centerX, centerY, "bomb");
spawnFloatingText(centerX, centerY, "BOOM!", "#ef4444");
time = 0;
timerCircle.textContent = "0.0";
removeButton(btn);
gameOver();
return;
} else if (action === "gold") {
playSynthEffect("gold");
doubleBonus = true;
doubleBonusRemainingMs = isDesktop ? 1700 : 1000;
spawnTapRipple(centerX, centerY, "#fde047");
spawnStars(centerX, centerY, "gold");
spawnFloatingText(centerX, centerY, isDesktop ? "2X TIME 1.7s!" : "2X TIME 1s!", "#facc15");
showMessage("2X TIME!", "Double time!");
}
timerCircle.textContent = time.toFixed(1);
scoreText.textContent = "SCORE: " + fmtNum(score);
comboText.textContent = "COMBO " + comboCount;
comboText.classList.toggle("combo-fire", comboCount >= 10);
updateTimerVisuals();
removeButton(btn);
}
function checkComboMessages() {
if (comboCount === 5) {
playSynthEffect("milestone");
showMessage("GREAT!", "Great!");
} else if (comboCount === 10) {
playSynthEffect("milestone");
showMessage("FANTASTIC!", "Fantastic!");
} else if (comboCount === 15) {
playSynthEffect("milestone");
showMessage("AMAZING!", "Amazing!");
} else if (comboCount === 20) {
playSynthEffect("milestone");
showMessage("UNBELIEVABLE!", "Unbelievable!");
} else if (comboCount > 0 && comboCount % 25 === 0 && comboCount % 80 !== 0) {
playSynthEffect("milestone");
showMessage("LEGENDARY!", "Legendary!");
}
}
function showMessage(text, spokenText = "") {
clearTimeout(messageTimeout);
specialMessage.textContent = text;
specialMessage.style.display = "none";
void specialMessage.offsetWidth;
specialMessage.style.display = "block";
if (spokenText) speakEnglish(spokenText, 1.08, 1.12);
messageTimeout = setTimeout(() => {
specialMessage.style.display = "none";
}, 1100);
}
function removeButton(btn) {
if (!btn) return;
const index = activeButtons.indexOf(btn);
if (index > -1) activeButtons.splice(index, 1);
if (btn.parentNode) btn.remove();
}
function animateScoreCounter(element, targetValue, onComplete) {
let current = 0;
const steps = 45;
const increment = targetValue / steps;
const counter = setInterval(() => {
current += increment;
if (current >= targetValue) {
current = targetValue;
clearInterval(counter);
element.textContent = fmtNum(Math.round(current));
if (onComplete) onComplete();
} else {
element.textContent = fmtNum(Math.round(current));
}
}, 30);
}
function gameOver() {
if (!running) return;
running = false;
isPaused = false;
isResumingCountdown = false;
isFrozen = false;
isSlowMo = false;
doubleBonus = false;
overdriveRemainingMs = 0;
pauseCooldownRemainingMs = 0;
updatePauseButtonUI();
clearSavedPausedState();
clearInterval(gameLoopInterval);
timerCircle.classList.remove("timer-panic", "timer-frozen", "timer-slowmo", "timer-max-cap");
game.classList.remove("slowmo-active", "overdrive-active");
while (activeButtons.length > 0) {
const firstBtn = activeButtons.shift();
if (firstBtn && firstBtn.parentNode) firstBtn.remove();
}
finalizeRunStatsAndShowSummary();
}
document.addEventListener("keydown", (event) => {
if (!running || isResumingCountdown) return;
const k = event.key.toLowerCase();
if (k === "d") {
event.preventDefault();
if (isPaused) {
playSynthEffect("click");
resumeGame();
} else if (pauseCooldownRemainingMs <= 0) {
playSynthEffect("click");
pauseGame();
}
}
});
function enterHomeScreen() {
refreshAllProfileAndRankUI();
if (menu) menu.style.display = "flex";
syncPlayerToCloud(playerUsername);
checkAndTriggerRankUpCelebration();
startHomeSymphony();
}
function runStartupSequence() {
if (!playerUsername) {
if (onboardingScreen) onboardingScreen.style.display = "flex";
} else {
if (forceRenameIfProfane()) return;
enterHomeScreen();
}
}
if (saveProfileBtn && usernameInput) {
saveProfileBtn.addEventListener("click", async () => {
if (playerUsername) return;
const chosen = sanitizeUsernameKey(usernameInput.value);
if (chosen.length < 2) {
showErrorBox(onboardingErrorMsg, "USE AT LEAST 2 LETTERS/NUMBERS!");
usernameInput.focus();
return;
}
if (containsProfanity(chosen)) {
playSynthEffect("red");
showErrorBox(onboardingErrorMsg, "OFFENSIVE USERNAME NOT ALLOWED!");
usernameInput.focus();
return;
}
saveProfileBtn.disabled = true;
saveProfileBtn.textContent = "CHECKING...";
const isFree = await checkUsernameAvailable(chosen);
saveProfileBtn.disabled = false;
saveProfileBtn.textContent = "START PLAYING";
if (!isFree) {
playSynthEffect("red");
showErrorBox(onboardingErrorMsg, "USERNAME ALREADY IN USE!");
usernameInput.focus();
return;
}
hideErrorBox(onboardingErrorMsg);
playerUsername = chosen;
localStorage.setItem("timeTapUsername", playerUsername);
initAudio();
playSynthEffect("newrecord");
await syncPlayerToCloud(playerUsername);
if (onboardingScreen) onboardingScreen.style.display = "none";
enterHomeScreen();
});
}
runStartupSequence();
}
if (document.readyState === "loading") {
document.addEventListener("DOMContentLoaded", initTimeTapGame);
} else {
initTimeTapGame();
}
/* ==========================================================================
ESTENSIONE MISSIONI, PREMIO GIORNALIERO, MAESTRO I-V, ESPLOSIONI 180 & RIVALI
========================================================================== */
(function initTimeTapMissionsExtension() {
const SUPABASE_URL = "https://jnhkktvtxbsfbrafsnig.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpuaGtrdHZ0eGJzZmJyYWZzbmlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTU0NTMzNjAsImV4cCI6MjExMTAyOTM2MH0.xRde38jj8K1cBpbXIIDyc14OMSsjRVUMkqTEvwDq2Tw";
const MISSIONS_STORAGE_KEY = "timeTapMissionsState_v1";
const ROMAN_NUMERALS = ["", "I", "II", "III", "IV", "V"];
function getCurrentMonthKey() {
const d = new Date();
return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");
}
function getCurrentWeekKey() {
const d = new Date();
const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
const dayNum = date.getUTCDay() || 7;
date.setUTCDate(date.getUTCDate() + 4 - dayNum);
const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
const weekNo = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
return date.getUTCFullYear() + "-W" + String(weekNo).padStart(2, "0");
}
function getTodayDateKey() {
const d = new Date();
return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
function getPreviousMonthKey(monthKey) {
const [y, m] = monthKey.split("-").map(Number);
if (m === 1) return (y - 1) + "-12";
return y + "-" + String(m - 1).padStart(2, "0");
}
function loadMissionsState() {
const curMonth = getCurrentMonthKey();
const curWeek = getCurrentWeekKey();
let state = {
monthKey: curMonth,
weekKey: curWeek,
lastDailyClaimDate: "",
weeklyGames: 0,
monthlyGames: 0,
monthlyBestCombo: 0,
monthlyBestScore: 0,
monthlyTotalScore: 0,
claimedIds: {},
masterStreak: 0,
lastCompletedMonthKey: "",
activeMaestroRank: 0
};
try {
const raw = localStorage.getItem(MISSIONS_STORAGE_KEY);
if (raw) {
const parsed = JSON.parse(raw);
state = Object.assign(state, parsed);
}
} catch (e) {}
if (state.weekKey !== curWeek) {
state.weekKey = curWeek;
state.weeklyGames = 0;
delete state.claimedIds["w_40_games"];
}
if (state.monthKey !== curMonth) {
const prevMonth = getPreviousMonthKey(curMonth);
if (state.lastCompletedMonthKey !== prevMonth) {
state.masterStreak = 0;
state.activeMaestroRank = 0;
}
state.monthKey = curMonth;
state.monthlyGames = 0;
state.monthlyBestCombo = 0;
state.monthlyBestScore = 0;
state.monthlyTotalScore = 0;
state.claimedIds = {};
}
saveMissionsState(state);
return state;
}
function saveMissionsState(state) {
localStorage.setItem(MISSIONS_STORAGE_KEY, JSON.stringify(state));
}
function getMissionsCatalog(state) {
return [
{
id: "w_40_games",
type: "WEEKLY",
title: "MARATHON RUNNER",
desc: "Play 40 games this week",
progress: state.weeklyGames,
target: 40,
rewardType: "xp",
rewardAmount: 500000,
rewardLabel: "+500,000 XP"
},
{
id: "m_200_games",
type: "MONTHLY",
title: "TRUE DEDICATION",
desc: "Play 200 games this month",
progress: state.monthlyGames,
target: 200,
rewardType: "maestro_base",
rewardAmount: 0,
rewardLabel: "RAINBOW NAME + MAESTRO"
},
{
id: "m_combo_150",
type: "MONTHLY",
title: "COMBO OVERLORD",
desc: "Reach a 150 Combo in a single run",
progress: state.monthlyBestCombo,
target: 150,
rewardType: "xp",
rewardAmount: 250000,
rewardLabel: "+250,000 XP"
},
{
id: "m_combo_360",
type: "MONTHLY",
title: "EXPLOSIVE REFLEXES",
desc: "Reach a 360 Combo (2x Explosion!)",
progress: state.monthlyBestCombo,
target: 360,
rewardType: "xp",
rewardAmount: 600000,
rewardLabel: "+600,000 XP"
},
{
id: "m_score_50k",
type: "MONTHLY",
title: "HIGH SCORER",
desc: "Score 50,000 points in one run",
progress: state.monthlyBestScore,
target: 50000,
rewardType: "xp",
rewardAmount: 300000,
rewardLabel: "+300,000 XP"
},
{
id: "m_total_500k",
type: "MONTHLY",
title: "POINT COLLECTOR",
desc: "Accumulate 500,000 total score this month",
progress: state.monthlyTotalScore,
target: 500000,
rewardType: "xp",
rewardAmount: 400000,
rewardLabel: "+400,000 XP"
}
];
}
function applyMaestroCosmetics(state) {
const homeName = document.getElementById("homeProfileName");
const homeTitle = document.getElementById("homeProfileTitle");
const modalName = document.getElementById("profileModalUsername");
const modalTitle = document.getElementById("equippedTitleLabel");
const hasRainbowName = Boolean(state.claimedIds["m_200_games"]) || state.activeMaestroRank > 0;
const rankNum = state.activeMaestroRank;
if (homeName) homeName.classList.toggle("rainbow-master-text", hasRainbowName);
if (modalName) modalName.classList.toggle("rainbow-master-text", hasRainbowName);
if (rankNum > 0) {
const label = "MAESTRO " + ROMAN_NUMERALS[Math.min(5, rankNum)];
if (homeTitle) {
homeTitle.textContent = label;
homeTitle.classList.add("maestro-title-badge");
}
if (modalTitle) {
modalTitle.textContent = label;
modalTitle.classList.add("maestro-title-badge");
}
} else if (state.claimedIds["m_200_games"]) {
if (homeTitle) {
homeTitle.textContent = "MAESTRO";
homeTitle.classList.add("maestro-title-badge");
}
if (modalTitle) {
modalTitle.textContent = "MAESTRO";
modalTitle.classList.add("maestro-title-badge");
}
}
}
function checkAllMonthlyCompleted(state) {
const catalog = getMissionsCatalog(state).filter(m => m.type === "MONTHLY");
const allClaimed = catalog.every(m => Boolean(state.claimedIds[m.id]));
const curMonth = getCurrentMonthKey();
if (allClaimed && state.lastCompletedMonthKey !== curMonth) {
state.lastCompletedMonthKey = curMonth;
state.masterStreak = Math.min(5, (state.masterStreak || 0) + 1);
state.activeMaestroRank = state.masterStreak;
saveMissionsState(state);
applyMaestroCosmetics(state);
}
}
function updateMissionAlertDot() {
const state = loadMissionsState();
const dot = document.getElementById("missionsAlertDot");
if (!dot) return;
const dailyReady = state.lastDailyClaimDate !== getTodayDateKey();
const anyMissionReady = getMissionsCatalog(state).some(m => m.progress >= m.target && !state.claimedIds[m.id]);
dot.style.display = (dailyReady || anyMissionReady) ? "flex" : "none";
}
function renderMissionsModal() {
const state = loadMissionsState();
const listContainer = document.getElementById("missionsListContainer");
const claimDailyBtn = document.getElementById("claimDailyXpBtn");
const streakBadge = document.getElementById("masterStreakBadge");
const today = getTodayDateKey();
if (claimDailyBtn) {
if (state.lastDailyClaimDate === today) {
claimDailyBtn.textContent = "CLAIMED TODAY";
claimDailyBtn.disabled = true;
claimDailyBtn.classList.add("claimed-disabled");
} else {
claimDailyBtn.textContent = "CLAIM 10K XP";
claimDailyBtn.disabled = false;
claimDailyBtn.classList.remove("claimed-disabled");
}
}
if (streakBadge) {
const rankLabel = state.activeMaestroRank > 0
? "MAESTRO " + ROMAN_NUMERALS[state.activeMaestroRank] + " (" + state.masterStreak + "/5)"
: "MASTER STREAK: " + state.masterStreak + " / 5";
streakBadge.textContent = rankLabel;
}
if (!listContainer) return;
listContainer.innerHTML = "";
const catalog = getMissionsCatalog(state);
catalog.forEach(m => {
const isClaimed = Boolean(state.claimedIds[m.id]);
const isDone = m.progress >= m.target;
const pct = Math.min(100, Math.round((m.progress / m.target) * 100));
const card = document.createElement("div");
card.className = "mission-card" + (isClaimed ? " mission-claimed" : (isDone ? " mission-ready" : ""));
const tag = document.createElement("span");
tag.className = "mission-type-pill " + (m.type === "WEEKLY" ? "pill-weekly" : "pill-monthly");
tag.textContent = m.type;
const header = document.createElement("div");
header.className = "mission-card-top";
const titleEl = document.createElement("span");
titleEl.className = "mission-title";
titleEl.textContent = m.title;
header.appendChild(titleEl);
header.appendChild(tag);
const descEl = document.createElement("div");
descEl.className = "mission-desc";
descEl.textContent = m.desc;
const barWrap = document.createElement("div");
barWrap.className = "mission-bar-wrap";
const barTrack = document.createElement("div");
barTrack.className = "mission-bar-track";
const barFill = document.createElement("div");
barFill.className = "mission-bar-fill";
barFill.style.width = pct + "%";
barTrack.appendChild(barFill);
const barText = document.createElement("span");
barText.className = "mission-bar-text";
barText.textContent = Math.min(m.progress, m.target).toLocaleString("it-IT") + " / " + m.target.toLocaleString("it-IT");
barWrap.appendChild(barTrack);
barWrap.appendChild(barText);
const footer = document.createElement("div");
footer.className = "mission-card-footer";
const rewLabel = document.createElement("span");
rewLabel.className = "mission-reward-label";
rewLabel.textContent = m.rewardLabel;
const actionBtn = document.createElement("button");
actionBtn.className = "mission-claim-btn";
if (isClaimed) {
actionBtn.textContent = "CLAIMED";
actionBtn.disabled = true;
} else if (isDone) {
actionBtn.textContent = "CLAIM!";
actionBtn.classList.add("ready-pulse");
actionBtn.addEventListener("click", () => {
const fresh = loadMissionsState();
if (fresh.claimedIds[m.id]) return;
fresh.claimedIds[m.id] = true;
saveMissionsState(fresh);
checkAllMonthlyCompleted(fresh);
applyMaestroCosmetics(fresh);
updateMissionAlertDot();
if (m.rewardType === "xp" && m.rewardAmount > 0) {
const cur = Number(localStorage.getItem("storedBonusXP")) || 0;
localStorage.setItem("storedBonusXP", cur + m.rewardAmount);
alert("REWARD CLAIMED: +" + m.rewardAmount.toLocaleString("it-IT") + " XP!");
location.reload();
} else {
renderMissionsModal();
}
});
} else {
actionBtn.textContent = pct + "%";
actionBtn.disabled = true;
}
footer.appendChild(rewLabel);
footer.appendChild(actionBtn);
card.appendChild(header);
card.appendChild(descEl);
card.appendChild(barWrap);
card.appendChild(footer);
listContainer.appendChild(card);
});
}
function triggerComboExplosion180(comboValue) {
const gameEl = document.getElementById("game");
if (!gameEl) return;
const tier = Math.floor(comboValue / 180);
const flash = document.createElement("div");
flash.className = "combo-explosion-flash";
gameEl.appendChild(flash);
setTimeout(() => flash.remove(), 650);
gameEl.classList.remove("mega-explosion-shake");
void gameEl.offsetWidth;
gameEl.classList.add("mega-explosion-shake");
setTimeout(() => gameEl.classList.remove("mega-explosion-shake"), 550);
const banner = document.createElement("div");
banner.className = "combo-explosion-banner";
banner.textContent = "BOOM! " + comboValue + " COMBO x" + tier + "!";
gameEl.appendChild(banner);
setTimeout(() => banner.remove(), 1400);
const colors = ["#fde047", "#ef4444", "#fb923c", "#38bdf8", "#a855f7", "#ffffff"];
const particleCount = Math.min(70, 32 + tier * 10);
for (let i = 0; i < particleCount; i++) {
const p = document.createElement("span");
p.className = "explosion-shard";
const sz = (8 + Math.random() * 10).toFixed(0) + "px";
const col = colors[Math.floor(Math.random() * colors.length)];
p.style.width = sz;
p.style.height = sz;
p.style.background = col;
p.style.boxShadow = "0 0 12px " + col;
p.style.left = "50%";
p.style.top = "50%";
const angle = (Math.PI * 2 * i) / particleCount + (Math.random() * 0.2);
const dist = 110 + Math.random() * 230;
p.style.setProperty("--dx", (Math.cos(angle) * dist) + "px");
p.style.setProperty("--dy", (Math.sin(angle) * dist) + "px");
gameEl.appendChild(p);
setTimeout(() => p.remove(), 800);
}
}
let cachedTopRecordPlayers = [];
let cachedTopComboPlayers = [];
let nearRecordToastShown = false;
let nearComboToastShown = false;
async function fetchRivalsLeaderboard() {
const myName = localStorage.getItem("timeTapUsername") || "";
try {
const [resRec, resCom] = await Promise.all([
fetch(SUPABASE_URL + "/rest/v1/players?select=username,record&order=record.desc&limit=60", {
headers: { "apikey": SUPABASE_KEY, "Authorization": "Bearer " + SUPABASE_KEY }
}),
fetch(SUPABASE_URL + "/rest/v1/players?select=username,best_combo&order=best_combo.desc&limit=60", {
headers: { "apikey": SUPABASE_KEY, "Authorization": "Bearer " + SUPABASE_KEY }
})
]);
if (resRec.ok) {
const rows = await resRec.json();
cachedTopRecordPlayers = rows.filter(r => r.username && r.username !== myName && Number(r.record) > 0);
}
if (resCom.ok) {
const rows = await resCom.json();
cachedTopComboPlayers = rows.filter(r => r.username && r.username !== myName && Number(r.best_combo) > 0);
}
} catch (e) {}
}
function showRivalInGameToast(text) {
const gameEl = document.getElementById("game");
if (!gameEl) return;
const existing = document.getElementById("rivalInGameAlert");
if (existing) existing.remove();
const toast = document.createElement("div");
toast.id = "rivalInGameAlert";
toast.className = "rival-ingame-toast";
toast.textContent = text;
gameEl.appendChild(toast);
setTimeout(() => { if (toast.parentNode) toast.remove(); }, 2600);
}
function findNextRivalAbove(list, field, currentVal) {
let candidate = null;
for (let i = list.length - 1; i >= 0; i--) {
const val = Number(list[i][field] || 0);
if (val > currentVal) {
candidate = { username: list[i].username, value: val, diff: val - currentVal };
break;
}
}
return candidate;
}
window.ttMissionEngine = {
refreshCosmetics() {
applyMaestroCosmetics(loadMissionsState());
},
onRunStart() {
nearRecordToastShown = false;
nearComboToastShown = false;
fetchRivalsLeaderboard();
},
onGreenHit(currentScore, currentCombo) {
if (currentCombo > 0 && currentCombo % 180 === 0) {
triggerComboExplosion180(currentCombo);
}
if (!nearComboToastShown && cachedTopComboPlayers.length > 0) {
const nextComboRival = findNextRivalAbove(cachedTopComboPlayers, "best_combo", currentCombo);
if (nextComboRival && nextComboRival.diff <= 35) {
nearComboToastShown = true;
showRivalInGameToast("CLOSE TO " + nextComboRival.username + "! ONLY " + nextComboRival.diff + " COMBO LEFT!");
}
}
if (!nearRecordToastShown && cachedTopRecordPlayers.length > 0) {
const nextRecRival = findNextRivalAbove(cachedTopRecordPlayers, "record", currentScore);
if (nextRecRival && nextRecRival.diff <= 1500) {
nearRecordToastShown = true;
showRivalInGameToast("ALMOST PASSED " + nextRecRival.username + "! -" + nextRecRival.diff.toLocaleString("it-IT") + " PTS!");
}
}
},
onRunEnd(runScore, runMaxCombo) {
const state = loadMissionsState();
state.weeklyGames += 1;
state.monthlyGames += 1;
state.monthlyTotalScore += runScore;
if (runMaxCombo > state.monthlyBestCombo) state.monthlyBestCombo = runMaxCombo;
if (runScore > state.monthlyBestScore) state.monthlyBestScore = runScore;
saveMissionsState(state);
updateMissionAlertDot();
const summaryBox = document.getElementById("rivalSummaryBox");
if (summaryBox) {
const bestRecEver = Math.max(Number(localStorage.getItem("record")) || 0, runScore);
const bestComEver = Math.max(Number(localStorage.getItem("bestCombo")) || 0, runMaxCombo);
const recRival = findNextRivalAbove(cachedTopRecordPlayers, "record", bestRecEver);
const comRival = findNextRivalAbove(cachedTopComboPlayers, "best_combo", bestComEver);
const lines = [];
if (recRival) {
lines.push("NEXT RECORD RIVAL (" + recRival.username + "): -" + recRival.diff.toLocaleString("it-IT") + " PTS");
}
if (comRival) {
lines.push("NEXT COMBO RIVAL (" + comRival.username + "): -" + comRival.diff.toLocaleString("it-IT") + " COMBO");
}
if (lines.length > 0) {
summaryBox.innerText = lines.join("\n");
summaryBox.style.display = "block";
} else {
summaryBox.style.display = "none";
}
}
}
};
const missionsBtn = document.getElementById("missionsBtn");
const missionsModal = document.getElementById("missionsModal");
const closeMissionsBtn = document.getElementById("closeMissionsBtn");
const claimDailyXpBtn = document.getElementById("claimDailyXpBtn");
if (missionsBtn && missionsModal) {
missionsBtn.addEventListener("click", () => {
renderMissionsModal();
missionsModal.style.display = "flex";
});
}
if (closeMissionsBtn && missionsModal) {
closeMissionsBtn.addEventListener("click", () => {
missionsModal.style.display = "none";
});
}
if (claimDailyXpBtn) {
claimDailyXpBtn.addEventListener("click", () => {
const state = loadMissionsState();
const today = getTodayDateKey();
if (state.lastDailyClaimDate === today) return;
state.lastDailyClaimDate = today;
saveMissionsState(state);
const cur = Number(localStorage.getItem("storedBonusXP")) || 0;
localStorage.setItem("storedBonusXP", cur + 10000);
updateMissionAlertDot();
alert("DAILY GIFT CLAIMED: +10,000 XP!");
location.reload();
});
}
const initialState = loadMissionsState();
applyMaestroCosmetics(initialState);
updateMissionAlertDot();
fetchRivalsLeaderboard();
})();