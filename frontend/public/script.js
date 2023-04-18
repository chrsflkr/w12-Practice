const rootElement = document.querySelector("#root");
const imagesComponent = (title, url) => `
  <div class="swiper-slide">
    <div class="firstSlide">
      <h3 class="title">${title}</h3>
      <img src="public/img${url}"/>
    </div>
  </div>
  `;
const swiperWrapElement = document.querySelector(".swiper-wrapper");

const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,


  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

});

fetch(`/images`)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((element) => {
      swiperWrapElement.insertAdjacentHTML(
        "beforeend",
        imagesComponent(element.title, element.url)
      );
    });
  });

  const uploadButton = document.querySelector(".upload-button")

  uploadButton.addEventListener("click", () => {
    console.log("upload")
    
    const formData = new FormData() 

    formData.append("image", document.querySelector(`input[type="file"]`).files[0])
    formData.append("title", document.querySelector(`input[name="title"]`).value)
    formData.append("phname", document.querySelector(`input[name="phname"]`).value)
    
    fetch("/upload", {
      method:"POST",
      body: formData
    })
    .then(res => {
      return res.json()
    })

    .then(resData => { 
      console.log(resData)
      swiperWrapElement.insertAdjacentHTML(
        "beforeend",
        imagesComponent(resData.title, resData.url)
      );
    })


  })
