// Sayfa yüklendiğinde her şeyi başlat
document.addEventListener('DOMContentLoaded', () => {

    // --- YENİ: DİL DEĞİŞTİRİCİ KONTROLÜ ---
    const langButtons = document.querySelectorAll('.lang-btn');
    if (langButtons.length > 0) {
        langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const selectedLang = btn.innerText.trim();
    
                if (selectedLang === "EN") {
                    window.location.href = "index-en.html"; // İngilizce sayfaya git
                } else {
                    window.location.href = "index.html"; // Türkçe sayfaya dön
                }
            });
        });
    }

    // FAQ Akordeon Kontrolü
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            item.classList.toggle('active');
            
            // Diğer açık olanları kapat (opsiyonel)
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
        });
    }  
    
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

// --- MODERN SCROLL GALLERY KONTROLLERİ ---
const slider = document.querySelector('.scroll-container-wrapper');
if (slider) {
    let isDown = false;
    let startX;
    let scrollLeft;

    // Fare ile Sürükleme Başlangıcı
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active-grab');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    // Fareyi Bırakma veya Kutu Dışına Çıkma
    slider.addEventListener('mouseleave', () => { isDown = false; slider.classList.remove('active-grab'); });
    slider.addEventListener('mouseup', () => { isDown = false; slider.classList.remove('active-grab'); });

    // Sürükleme Hareketi
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Kaydırma hızı çarpanı
        slider.scrollLeft = scrollLeft - walk;
    });

    // Akıllı Yatay Kaydırma: Galeri bitince dikey kaydırmaya izin verir
slider.addEventListener('wheel', (e) => {
    const isAtEnd = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 1;
    const isAtStart = slider.scrollLeft <= 0;

    // Eğer yatayda gidecek yer varsa yatay kaydır, yoksa normal dikey kaydırmaya izin ver
    if (!((isAtEnd && e.deltaY > 0) || (isAtStart && e.deltaY < 0))) {
        e.preventDefault();
        slider.scrollLeft += e.deltaY * 1.5;
    }
}, { passive: false });
}
