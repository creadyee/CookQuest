function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function setCookie(name, value, days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); 
    let expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

var word = ""
var image = ""

function displayFoodItem() {
    const itemNumber = getCookie('foodItemNumber');
    
    if (itemNumber !== null) {
        fetch('food.json')
            .then(response => response.json())
            .then(foodItems => {
                const foodItem = foodItems[itemNumber];
                
                if (foodItem) {
                    word = foodItem.word
                    image = foodItem.image

                    document.getElementById("word").innerHTML = word;
                    document.getElementById("image").src = image;
                } else {
                    document.getElementById('food').innerHTML = "<p>Food item not found!</p>";
                }
            })
            .catch(error => {
                console.error("Error fetching food data: ", error);
                word = "<p>Error loading food data!</p>";
                document.getElementById("word").innerHTML = word;
            });
    } else {
        word = "<p>No food item number in cookie!</p>";
        document.getElementById("word").innerHTML = word;
    }
}

window.onload = displayFoodItem;

function getnumber(){
    number = prompt("Choose a number between 1 and 13", "this is not official!");
    setCookie("foodItemNumber", number, 7);
}