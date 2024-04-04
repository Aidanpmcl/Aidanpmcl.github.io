const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const fileNameArray = ["pic1.jpeg","pic2.jpeg","pic3.jpeg","pic4.jpeg","pic5.jpeg"];

/* Declaring the alternative text for each image file */
const altTextArray = ["1","2","3","4","5"];

/* Looping through images */
for (let i = 0; i < fileNameArray.length; i++) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', "images/" + fileNameArray[i]);
    newImage.setAttribute('alt', altTextArray[i]);
    thumbBar.appendChild(newImage);

    newImage.addEventListener("click", e => {
        displayedImage.src = e.target.src;
        displayedImage.alt = e.target.alt;
    });
}

/* Wiring up the Darken/Lighten button */
btn.addEventListener("click", () => {
    const whatClass = btn.getAttribute("class");
    
    if (whatClass === "dark") {
        btn.setAttribute("class", "light");
        btn.textContent = "lighten";
        overlay.style.backgroundColor = "rgb(0 0 0 / 50%)";
    } else {
        btn.setAttribute("class", "dark");
        btn.textContent = "darken";
        overlay.style.backgroundColor = "rgb(0 0 0 / 0%)";  
    }
});


