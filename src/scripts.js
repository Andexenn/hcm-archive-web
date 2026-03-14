document.addEventListener("DOMContentLoaded", () => {
    // 1. Fetch Header and Footer (Giải pháp cho việc tái sử dụng code)
    Promise.all([
        fetch('header.html').then(res => res.text()),
        fetch('footer.html').then(res => res.text())
    ]).then(([headerHtml, footerHtml]) => {
        document.getElementById('header-placeholder').innerHTML = headerHtml;
        document.getElementById('footer-placeholder').innerHTML = footerHtml;
        
        // Setup features AFTER injecting the header
        setupHamburger();
        setupImageModals();
    });

    // 2. Hamburger Menu Logic
    function setupHamburger() {
        const hamburger = document.getElementById('hamburger-menu');
        const navLinks = document.getElementById('nav-links');
        
        if(hamburger) {
            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }
    }

    // 3. Image Popup (Modal) Logic
    function setupImageModals() {
        const modal = document.getElementById("image-modal");
        const modalImg = document.getElementById("expanded-img");
        const closeBtn = document.querySelector(".close-modal");
        
        // Select all images with class 'zoomable-img'
        document.querySelectorAll('.zoomable-img').forEach(img => {
            img.addEventListener('click', function() {
                modal.style.display = "block";
                modalImg.src = this.src;
            });
        });

        // Close modal
        if(closeBtn) {
            closeBtn.onclick = function() { modal.style.display = "none"; }
        }
        window.onclick = function(event) {
            if (event.target == modal) { modal.style.display = "none"; }
        }
    }
    
    // Setup modals for images already in index.html before fetch
    setupImageModals(); 
});