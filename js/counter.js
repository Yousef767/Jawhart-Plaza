function animateCounters() {
  const counters = document.querySelectorAll(".counter span");
  const duration = 3000; // Animation duration in milliseconds
  const interval = 30; // Approximate interval for requestAnimationFrame (~60fps)

  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-num");
    const option = counter.getAttribute("data-option") || ""; // Get the data-option or default to empty
    const increment = target / (duration / interval); // Calculate increment based on duration

    let current = 0;

    function updateCounter() {
      current += increment;

      if (current < target) {
        counter.innerHTML = `${Math.ceil(current).toLocaleString()}${getOptionHTML(option)}`;
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerHTML = `${target.toLocaleString()}${getOptionHTML(option)}`;
      }
    }

    counter.innerHTML = `0${getOptionHTML(option)}`; // Initialize with 0
    requestAnimationFrame(updateCounter);
  });
}

function getOptionHTML(option) {
  if (option === "+") {
    return `<div style="color: #fff;">+</div>`;
  } else if (option === "%") {
    return `<div style="color: #fff;">%</div>`;
  } else if (option === "م" || option === "m") {
    const fulloption =
      option === "م" ? `<sup>2</sup>${option}` : `${option}<sup>2</sup>`;
    return `<p style="color: #fff;">${fulloption}</p>`;
  }
  return `<div style="color: #fff;"></div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const countersContainer = document.querySelector(".counters");
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      observer.disconnect();
    }
  });

  observer.observe(countersContainer);
});
