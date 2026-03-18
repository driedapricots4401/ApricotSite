// Mail gönderme bölümü
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    
    // İşlem başladığında mesajı göster
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
            formStatus.textContent = 'Mesajınız şirket mailimize iletildi. Teşekkürler!';
            formStatus.style.color = '#2ecc71';
            this.reset();
            
            // 5 saniye sonra mesajı otomatik gizle (Senin istediğin o temizlik burada yapılıyor)
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
            
        } else {
            formStatus.textContent = 'Bir hata oluştu, lütfen tekrar deneyin.';
            formStatus.style.color = '#e74c3c';
        }
    } catch (error) {
        formStatus.textContent = 'Bağlantı hatası oluştu.';
        formStatus.style.color = '#e74c3c';
    }
});

// Kaydırma sırasında navbar gölgesini değiştirme
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '15px 10%';
    } else {
        navbar.style.padding = '20px 10%';
    }
});

// Reveal Animasyonu Tetikleyici
const observerOptions = {
    threshold: 0.1 // Öğenin %10'u göründüğünde çalışır
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach((el) => {
    observer.observe(el);
});

// Sayfa yüklendiğinde çalışacak animasyon tetikleyici
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1, // Öğenin %10'u göründüğünde çalışır
        rootMargin: "0px 0px -50px 0px" // Biraz erken tetiklenmesi için
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Bir kez göründükten sonra takibi bırak (performans için)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Tüm reveal sınıflarını bul ve izlemeye al
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => {
        observer.observe(el);
    });
});
