document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".section");
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove("hidden");
            } else {
                entry.target.classList.add("hidden");
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.classList.add("hidden");
        observer.observe(section);
    });
});
