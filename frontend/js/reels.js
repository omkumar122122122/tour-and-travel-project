// ===== REELS DATA =====
const reelsData = [
  {
    id: 1,
    title: "River Ganga",
    location: "River Ganga",
    username: "Alex M.",
    caption: "Nothing beats peace near river Ganga",
    videoSrc: "https://youtube.com/shorts/vlKFn9Hc_A8",
    likes: 1240,
    liked: false,
  },
  {
    id: 2,
    title: "Manali Trip",
    location: "Manali",
    username: "Sara K.",
    caption: "Nothing beats peace near river Ganga 🌾",
    videoSrc: "https://youtube.com/shorts/mh0w_zDx6C8",
    likes: 987,
    liked: false,
  },
  {
    id: 3,
    title: "Shimla Vibes",
    location: "Shimla",
    username: "Om Gupta",
    caption: "Nothing beats peace near river Ganga",
    videoSrc: "https://youtube.com/shorts/_ntN-f4hLkU",
    likes: 2103,
    liked: false,
  },
  {
    id: 4,
    title: "Manali Again",
    location: "Manali",
    username: "Sunny",
    caption: "Nothing beats peace near river Ganga",
    videoSrc: "https://youtube.com/shorts/1Loy8edh9IA",
    likes: 756,
    liked: false,
  },
];

// Extract YouTube video ID from any YT URL
function getYouTubeId(url) {
  const match = url.match(/(?:shorts\/|v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

// Build embed URL
function getEmbedUrl(videoSrc, autoplay = 0) {
  const id = getYouTubeId(videoSrc);
  if (!id) return videoSrc;
  return `https://www.youtube.com/embed/${id}?autoplay=${autoplay}&mute=1&loop=1&playlist=${id}&controls=1&rel=0&playsinline=1`;
}

// Get YouTube thumbnail
function getThumbUrl(videoSrc) {
  const id = getYouTubeId(videoSrc);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
}

const avatarColors = [
  "#6C4DFF", "#6EC6FF", "#FF6B8A", "#FFB347", "#4CAF50", "#FF7043"
];

let currentViewerIndex = 0;
let allReels = [...reelsData];

// ===== INIT =====
function initReels() {
  renderFeed();
  bindUploadModal();
  bindViewerModal();
  bindSearch();
}

// ===== SEARCH =====
function bindSearch() {
  const input = document.getElementById("reelSearch");
  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    const filtered = query
      ? allReels.filter(r =>
          r.location.toLowerCase().includes(query) ||
          r.title.toLowerCase().includes(query)
        )
      : allReels;
    renderFeed(filtered);
  });
}

// ===== RENDER FEED =====
function renderFeed(reels = allReels) {
  const feed = document.getElementById("reelsFeed");
  feed.innerHTML = "";

  if (reels.length === 0) {
    feed.innerHTML = `
      <div class="reels-empty fade-up show">
        <i class="fa-solid fa-film"></i>
        <p>No reels found for that place.</p>
      </div>`;
    return;
  }

  reels.forEach((reel, index) => {
    const card = document.createElement("div");
    card.className = "reel-card fade-up";
    card.dataset.index = index;

    const color = avatarColors[index % avatarColors.length];
    const initials = reel.username.split(" ").map(n => n[0]).join("").toUpperCase();

    card.innerHTML = `
      <img class="reel-thumb" src="${getThumbUrl(reel.videoSrc)}" alt="${reel.title}" />
      <div class="reel-overlay">
        <div class="reel-user">
          <div class="avatar" style="background:${color}">${initials}</div>
          <span class="reel-username">${reel.username}</span>
        </div>
        <p class="reel-title-text">${reel.title}</p>
        <p class="reel-location-tag"><i class="fa-solid fa-location-dot"></i>${reel.location}</p>
      </div>
      <i class="fa-solid fa-circle-play reel-play-icon"></i>
      <div class="reel-likes"><i class="fa-solid fa-heart"></i> ${formatCount(reel.likes)}</div>
    `;

    // Click: open viewer
    card.addEventListener("click", () => openViewer(index));

    feed.appendChild(card);

    // Trigger fade-up
    setTimeout(() => card.classList.add("show"), index * 80);
  });
}

// ===== VIEWER =====
function openViewer(index) {
  currentViewerIndex = index;
  updateViewer();
  document.getElementById("viewerOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeViewer() {
  const overlay = document.getElementById("viewerOverlay");
  overlay.classList.remove("open");
  // Remove iframe to stop video
  const container = document.getElementById("viewerVideoContainer");
  if (container) container.innerHTML = "";
  document.body.style.overflow = "";
}

function updateViewer() {
  const reel = allReels[currentViewerIndex];
  const color = avatarColors[currentViewerIndex % avatarColors.length];
  const initials = reel.username.split(" ").map(n => n[0]).join("").toUpperCase();

  const container = document.getElementById("viewerVideoContainer");
  container.innerHTML = `<iframe src="${getEmbedUrl(reel.videoSrc, 1)}" frameborder="0" allowfullscreen allow="autoplay; encrypted-media"></iframe>`;

  document.getElementById("viewerAvatar").textContent = initials;
  document.getElementById("viewerAvatar").style.background = color;
  document.getElementById("viewerName").textContent = reel.username;
  document.getElementById("viewerLocation").textContent = reel.location;
  document.getElementById("viewerCaption").textContent = reel.caption;
  document.getElementById("viewerLikeCount").textContent = formatCount(reel.likes);

  const likeBtn = document.getElementById("viewerLike");
  likeBtn.classList.toggle("liked", reel.liked);
}

function bindViewerModal() {
  document.getElementById("viewerClose").addEventListener("click", closeViewer);

  document.getElementById("viewerOverlay").addEventListener("click", (e) => {
    if (e.target === document.getElementById("viewerOverlay")) closeViewer();
  });

  document.getElementById("viewerPrev").addEventListener("click", () => {
    currentViewerIndex = (currentViewerIndex - 1 + allReels.length) % allReels.length;
    updateViewer();
  });

  document.getElementById("viewerNext").addEventListener("click", () => {
    currentViewerIndex = (currentViewerIndex + 1) % allReels.length;
    updateViewer();
  });

  document.getElementById("viewerLike").addEventListener("click", () => {
    const reel = allReels[currentViewerIndex];
    reel.liked = !reel.liked;
    reel.likes += reel.liked ? 1 : -1;
    updateViewer();
    updateCardLikes(currentViewerIndex, reel.likes);
  });

  // Keyboard nav
  document.addEventListener("keydown", (e) => {
    if (!document.getElementById("viewerOverlay").classList.contains("open")) return;
    if (e.key === "ArrowRight") document.getElementById("viewerNext").click();
    if (e.key === "ArrowLeft") document.getElementById("viewerPrev").click();
    if (e.key === "Escape") closeViewer();
  });
}

function updateCardLikes(index, count) {
  const card = document.querySelector(`.reel-card[data-index="${index}"] .reel-likes`);
  if (card) card.innerHTML = `<i class="fa-solid fa-heart"></i> ${formatCount(count)}`;
}

// ===== UPLOAD MODAL =====
function bindUploadModal() {
  const overlay = document.getElementById("modalOverlay");
  const videoInput = document.getElementById("videoInput");
  const previewVideo = document.getElementById("previewVideo");
  let selectedFile = null;

  document.getElementById("uploadBtn").addEventListener("click", () => {
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  });

  document.getElementById("modalClose").addEventListener("click", closeUploadModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeUploadModal();
  });

  videoInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    selectedFile = file;
    previewVideo.src = URL.createObjectURL(file);
    previewVideo.style.display = "block";
  });

  document.getElementById("submitReel").addEventListener("click", () => {
    const title = document.getElementById("reelTitle").value.trim();
    const location = document.getElementById("reelLocation").value.trim();
    const caption = document.getElementById("reelCaption").value.trim();

    if (!selectedFile) return showToast("Please select a video first.");
    if (!title) return showToast("Please add a title.");
    if (!location) return showToast("Please add a location.");

    const newReel = {
      id: Date.now(),
      title,
      location,
      username: "You",
      caption: caption || "Just posted a new travel reel!",
      videoSrc: URL.createObjectURL(selectedFile),
      likes: 0,
      liked: false,
    };

    allReels.unshift(newReel);
    renderFeed();
    closeUploadModal();
    showToast("Reel posted successfully! 🎉");
  });
}

function closeUploadModal() {
  document.getElementById("modalOverlay").classList.remove("open");
  document.body.style.overflow = "";
  document.getElementById("reelTitle").value = "";
  document.getElementById("reelLocation").value = "";
  document.getElementById("reelCaption").value = "";
  document.getElementById("previewVideo").src = "";
  document.getElementById("previewVideo").style.display = "none";
  document.getElementById("videoInput").value = "";
}

// ===== TOAST =====
function showToast(msg) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = msg;
  toast.style.cssText = `
    position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
    background: var(--gradient-primary); color: white;
    padding: 12px 24px; border-radius: 999px;
    font-size: 0.875rem; font-weight: 500;
    box-shadow: var(--shadow-soft); z-index: 9999;
    animation: fadeUp 0.3s ease forwards;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ===== UTILS =====
function formatCount(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return n;
}

// ===== START =====
document.addEventListener("DOMContentLoaded", initReels);
