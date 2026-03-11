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