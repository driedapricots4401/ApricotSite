document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Mesajınız başarıyla iletildi! En kısa sürede size dönüş yapacağız.');
    this.reset();
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

// Mail gönderme bölümü
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    
    formStatus.style.display = 'block';
    formStatus.textContent = 'Gönderiliyor...';
    formStatus.style.color = '#e67e22';

    const response = await fetch('https://formspree.io/f/BURAYA_FORMSPREE_LINKINI_YAZ', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
        formStatus.textContent = 'Mesajınız şirket mailimize iletildi. Teşekkürler!';
        formStatus.style.color = '#2ecc71';
        this.reset();
    } else {
        formStatus.textContent = 'Bir hata oluştu, lütfen tekrar deneyin.';
        formStatus.style.color = '#e74c3c';
    }
});
