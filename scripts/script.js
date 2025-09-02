
//Create show fetch and load categories 

//Create LoadCategories

const loadCategories = () => {
    fetch ('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error))
}

const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("category-btn")
    // console.log(buttons);
    for (let btn of buttons){
        // console.log(btn);
        btn.classList.remove("active")
    }
}

const categoryVideos = (id) => {
   fetch (`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
        const activeBtn = document.getElementById(`btn-${id}`)
        // Remove All Class
        removeActiveClass();
        //Do All Class Active
       activeBtn.classList.add("active")
        displayVideos(data.category)
    })
    .catch((error) => console.log(error))
}

//Details behaviour

const detailsLoader = async(videoId) => {
  const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(uri);
    // console.log(res);
    const data = await res.json();
   displayDetails(data.video);
}

// Show Details 

const displayDetails = (video) => {
        console.log(video);
        const modal = document.getElementById("modalContainer");

        modal.innerHTML = `
            <div >
                <img  class = "h-full w-full object-cover"  src= ${video.thumbnail} />
                <p> ${video.title} </p>
            </div>
        `
        // document.getElementById("showModal").click();
        document.getElementById("myModal").showModal();
}


// Display LoadCategories

const displayCategories = (categories) => {
   
    const btnSection = document.getElementById("buttonContainer");
    categories.forEach((item) => { //For Getting each category We use forEach এটা array-এর প্রতিটি element এর উপর দিয়ে ঘুরে যায় এবং আপনার দেওয়া callback function চালায়।
        // console.log(item)
        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML = `
            <button id="btn-${item.category_id}" class="btn category-btn" onclick = "categoryVideos(${item.category_id})" >
                ${item.category}
            </button>                      
        `

        btnSection.append(buttonContainer);
    });

}

// start
const displayVideos = (video) => {
    const videoSection = document.getElementById("videoContainer");
    videoSection.innerHTML = "";
    if(video.length == 0){
        videoSection.classList.remove("grid");
        videoSection.innerHTML = `
                <div class="min-h-[450px] gap-2 mx-auto flex flex-col items-center  justify-center">
                    <img src="asstes/Icon.png" alt="Loading">
                     <h1 class="font-bold text-2xl pt-2"> Opps!! Sorry There <br>Is No  Content Here </h1>
                </div>
        `;
        return;
    }else{
         videoSection.classList.add("grid");

    }
    video.forEach((item) => {
        const card = document.createElement("div");
        card.classList = "card shadow-sm"
        card.innerHTML = `
        <figure class="h-[200px]">
            <img class="h-full w-full object-cover"
            src="${item.thumbnail}"
            alt="Shoes" />

            ${
                item.others.posted_date?.length == 0 ? "" : 
               ` <span class = "text-sm absolute right-2 bottom-44 bg-black text-white rounded-lg p-2">
                    ${getTime(item.others.posted_date)}
                </span>`
            }
         </figure>

        <div class="card-body flex flex-row">
            <div>
                <img class="h-[30px] w-[30px] object-cover rounded-full "
                src="${item.authors[0].profile_picture}"
                alt="image" />
            </div>

            <div class="ml-5">
                <h2 class="card-title">
                ${item.title}
                </h2>
                <div class="gap-2 items-center flex flex-row ">
                        <p>${item.authors[0].profile_name}</p>
                        <div class="h-[15px] w-[15px]">
                            ${
                                item.authors[0].verified == true ? '<img src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png">' : ""
                            }
                        </div>
                </div>
                <div class="flex flex-col">
                    <p class="flex flex-col">${item.others.views}</p>
                    
                    <button class="btn btn-soft btn-info mt-2" onclick = "detailsLoader('${item.video_id}')" >Details</button>

                <div>                   
            </div>

        </div>
        `
        videoSection.append(card);
    });
} 
// End 


loadCategories()
