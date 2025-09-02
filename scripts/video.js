
function getTime (time){
    const hour = parseInt(time/3600) ;
    let remainingSec = parseInt(time % 3600);
    const Minute = parseInt(remainingSec / 60);
    const remainingSecond = parseInt(remainingSec % 60);
    return `${hour} hour ${Minute} Minute ${remainingSecond} second ago`
}


// LoadCategories For Video Fetch 

const videoCategories = (searchText = "") => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then((res) => res.json())
        .then((data) => displayVideo(data.videos))
        .catch((err) => console.log(err));
}

// Display Videos Categories 

const displayVideo = (video) => {
    const videoSection = document.getElementById("videoContainer");
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
                    <button class="btn btn-soft btn-info mt-2">Details</button>    
                <div>                
            </div>           
        </div>
        `
        videoSection.append(card);
    });
}

document.getElementById("inputId").addEventListener("keyup", (e)=>{ // It won't work here 
   videoCategories(e.target.value);
})
videoCategories();

