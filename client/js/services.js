document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('https://nabdserver.acmeflare.in');
    const services = await response.json();
    console.log("services-",services);

    const dailyClinicalCareContainer = document.getElementById('daily-clinical-care-services');
    const corporateCompaniesContainer = document.getElementById('corporate-companies-services');
    const homeHealthcareContainer = document.getElementById('home-healthcare-services');

    const createServiceHTML = (service) => `
      <div class="col-lg-4 col-md-6">
          <div
            class="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
            <div class="service-icon mb-4">
            ${service.category === 'DAILY CLINICAL CARE' ?'<i class="fa fa-2x fa-heartbeat text-white"></i>' : (service.category === 'CORPORATE COMPANIES'?'<i class="fa fa-2x fa-hospital text-white"></i>':'<i class="fa fa-2x fa-user-nurse text-white"></i>')}
            </div>
            <div style="width:100%">
            <h4 class="mb-3" style="word-wrap: break-word;">${service.heading}</h4>
            <p class="m-0" style="word-wrap: break-word;">
            ${service.description}
            </p>
            </div>
            <a class="btn btn-lg btn-primary rounded-pill" href="tel:+966 531970077">
              <i class="bi bi-telephone"></i>
            </a>
          </div>
        </div>
    `;
    const dailyClinical  = services.filter(ser=>(
        ser.category === 'DAILY CLINICAL CARE'
    ))
    const corporate  = services.filter(ser=>(
        ser.category === 'CORPORATE COMPANIES'
    ))
    const Healthcare  = services.filter(ser=>(
        ser.category === 'HOME HEALTHCARE'
    ))

    dailyClinical.forEach(service => {
      dailyClinicalCareContainer.innerHTML += createServiceHTML(service);
    });

    corporate.forEach(service => {
      corporateCompaniesContainer.innerHTML += createServiceHTML(service);
    });

    Healthcare.forEach(service => {
      homeHealthcareContainer.innerHTML += createServiceHTML(service);
    });
  });
