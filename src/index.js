console.log('%c HI', 'color: firebrick')


document.addEventListener("DOMContentLoaded", () => {
  getDog();
  getBreed();
  document.getElementsByName("select-breed")[0].addEventListener('change', GetSelectedValue)
});


const getDog = async () => {
  let response = await fetch(
    "https://dog.ceo/api/breeds/image/random/4"
  );
  let dogData = await response.json();
  dogData.message.forEach((url) => renderDog(url));
};

function renderDog(url) {
  let container = document.querySelector("#dog-image-container");
  let newImg = document.createElement('img');
  newImg.src = url;
  container.appendChild(newImg);
}

const getBreed = async () => {
  let response = await fetch("https://dog.ceo/api/breeds/list/all");
  let dogbreedData = await response.json();
  Object.keys(dogbreedData.message).forEach((breed) => renderDogBreed(breed));
};


function renderDogBreed(breed) {
  let ul_tag = document.querySelector("#dog-breeds");
  let newBreed = document.createElement("li");

  newBreed.innerText = breed;
  newBreed.id = breed.charAt(0);
  newBreed.addEventListener('click', create_color)
  
  ul_tag.appendChild(newBreed);
}

function create_color(event) {
  event.target.style.color = "blue"
}

 function GetSelectedValue() {
   Object.values(document.querySelector("#dog-breeds").children).forEach(child => child.style.visibility = "hidden");
   let e = document.getElementById("breed-dropdown");
   let result = e.options[e.selectedIndex].value;
   Object.values(document.querySelector("#dog-breeds").children).forEach(child => checking(child, result));
 }

function checking(child, result) {
    if (child.id == result) {
        child.parentNode.prepend(child);
        child.style.visibility = "visible";
    }
}