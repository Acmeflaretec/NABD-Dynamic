document.addEventListener('DOMContentLoaded', async () => {
    const carouselInner = document.getElementById('carousel-inner');

    try {
        const response = await fetch('http://localhost:5000/Frontendbanners'); // Adjust URL as needed
        const banner = await response.json();

        const bannerContent = `
            <div class="banner-content-container1">
                <div class="container py-5">
                    <div class="row justify-content-start">
                        <div class="col-lg-8 text-center text-lg-start">
                            <h5 class="d-inline-block text-primary text-uppercase border-bottom border-5" style="border-color: rgba(256, 256, 256, 0.3) !important; color: #21d1c8;">
                                Welcome To Family Nabd Medical Center
                            </h5>
                            <h1 class="display-1 text-white mb-md-4">
                                Quality Healthcare Services for Your Family
                            </h1>
                            <div class="pt-2">
                                <a href="tel:+966 531970077" class="btn btn-light rounded-pill py-md-3 px-md-5 mx-2">Call Us</a>
                                <a href="appointment.html" class="btn btn-outline-light rounded-pill py-md-3 px-md-5 mx-2">Send Enquiry</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        if (!banner.bannerImageUrls || banner.bannerImageUrls.length === 0) {
            // If no banner images, show a default image
            carouselInner.innerHTML = `
                <div class="carousel-item active">
                    <div class="container-fluid bg-primary py-5 mb-5 hero-header">
                        <div class="banner-content-container1">
                <div class="container py-5">
                    <div class="row justify-content-start">
                        <div class="col-lg-8 text-center text-lg-start">
                            <h5 class="d-inline-block text-primary text-uppercase border-bottom border-5" style="border-color: rgba(256, 256, 256, 0.3) !important; color: #21d1c8;">
                                Welcome To Family Nabd Medical Center
                            </h5>
                            <h1 class="display-1 text-white mb-md-4">
                                Quality Healthcare Services for Your Family
                            </h1>
                            <div class="pt-2">
                                <a href="tel:+966 531970077" class="btn btn-light rounded-pill py-md-3 px-md-5 mx-2">Call Us</a>
                                <a href="appointment.html" class="btn btn-outline-light rounded-pill py-md-3 px-md-5 mx-2">Send Enquiry</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                    </div>
                </div>
            `;
        } else {
            const images = banner.bannerImageUrls.map((url, idx) => `
            <div class="carousel-item ${idx === 0 ? 'active' : ''}" style="background: url('${url}') top right no-repeat; background-size: cover;">
                ${bannerContent}
            </div>
        `).join('');
        carouselInner.innerHTML = images;
        }
    } catch (error) {
        console.error('Error fetching active banner:', error);
    }
});

