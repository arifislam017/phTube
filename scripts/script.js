
//Create show fetch and load categories 

//Create LoadCategories

const loadCategories = () => {
    fetch ('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error))
}

// Display LoadCategories

const displayCategories = (categories) => {
   
    const btnSection = document.getElementById("buttonContainer");
    categories.forEach((item) => { //For Getting each category We use forEach এটা array-এর প্রতিটি element এর উপর দিয়ে ঘুরে যায় এবং আপনার দেওয়া callback function চালায়।
        // console.log(item)
        const button = document.createElement("button");
        button.classList = "btn";
        button.innerText = item.category;

        btnSection.append(button);
    });

}



loadCategories()