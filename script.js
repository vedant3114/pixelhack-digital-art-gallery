const counter = document.getElementById("counter");
let current = 0;

const interval = setInterval(() => {
  if (current <= 100) {
    counter.textContent = `${current}%`;
    current++;
  } else {
    clearInterval(interval);
    // Redirect after loading completes
    setTimeout(() => {
      window.location.href = "home.html";
    }, 1000);
  }
}, 30);

// Test image loading
const img = new Image();
img.src = "./img/image1.jpg";
img.onload = function() {
  console.log("Image loaded successfully");
};
img.onerror = function() {
  console.error("Failed to load image");
};