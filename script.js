// Sayfa yüklendiğinde her şeyi başlat
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MAİL GÖNDERME BÖLÜMÜ (Hata korumalı)
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) { // Sadece form varsa çalıştır
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            
            formStatus.style.display = 'block';
            formStatus.textContent = 'Gönderiliyor...';
            formStatus.style.color = '#e67e22';

            try {
                const response = await fetch('https://formspree.io/f/xreyljzz', {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    formStatus.textContent = 'Mesajınız iletildi. Teşekkürler!';
                    formStatus.style.color = '#2ecc71';
                    this.reset();
                    setTimeout(() => { formStatus.style.display = 'none'; }, 5000);
                } else {
                    formStatus.textContent = 'Bir hata oluştu.';
                    formStatus.style.color = '#e74c3c';
                }
            } catch (error) {
                formStatus.textContent = 'Bağlantı hatası.';
                formStatus.style.color = '#e74c3c';
            }
        });
    }

    // 2. NAVBAR GÖLGESİ
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '15px 10%';
        } else {
            navbar.style.padding = '20px 10%';
        }
    });

    // 3. REVEAL (ANİMASYON) MOTORU
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach((el) => {
        observer.observe(el);
    });
});
