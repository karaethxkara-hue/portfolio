const header = document.querySelector(".site-header");
const dialog = document.querySelector(".video-dialog");
const dialogVideo = dialog.querySelector("video");
const dialogTitle = document.querySelector("#dialog-title");
const closeDialog = dialog.querySelector(".close-dialog");
const videoTriggers = document.querySelectorAll("[data-video]");

function setHeaderState() {
  header.classList.toggle("is-solid", window.scrollY > 12);
}

function closeVideo() {
  dialogVideo.pause();
  dialogVideo.removeAttribute("src");
  dialogVideo.load();
  if (dialog.open) dialog.close();
}

videoTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const source = trigger.dataset.video;
    const title = trigger.dataset.title || "Video";
    dialogTitle.textContent = title;
    dialogVideo.src = source;
    dialog.showModal();
    dialogVideo.play().catch(() => {});
  });
});

closeDialog.addEventListener("click", closeVideo);
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) closeVideo();
});
dialog.addEventListener("close", () => {
  dialogVideo.pause();
  dialogVideo.removeAttribute("src");
});

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();
