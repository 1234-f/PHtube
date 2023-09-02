// fetch categories api
fetch(`https://openapi.programming-hero.com/api/videos/categories`)
    .then((response) => response.json())
    .then((data) => {
        const apiInnerData = data.data;
        setCategoryId(apiInnerData);
    });

// fetch videos api
const apiData = (id) => {
    fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
        .then((response) => response.json())
        .then((data) => {
            const apiInnerData = data.data;
            createVideoCard(apiInnerData);
            // getCategoriesDivId(apiInnerData);
            getVideosByCategory(apiInnerData)
        });
};
apiData(1000);

const createBtn = (buttonName) => {
    const button = document.createElement("button");
    button.innerText = buttonName;
    button.classList =
        "btn btn-active mx-3 text-[#252525b3] font-bold bg-[#25252533] rounded-md";
    return button;
};

// code for category section
const setCategoryId = (apiDivId) => {
    const categoryDiv = document.getElementById("categoriesDiv");
    apiDivId.forEach((element) => {
        const createButton = createBtn(element.category);
        const btnId = (createButton.id = `${element.category_id}`);
        categoryDiv.appendChild(createButton);
        getVideosByCategory(btnId);
    });
};

// code for video section api
const createVideoCard = (videoCardApi) => {
    // const videoCardContainer = document.getElementById('cards-container');
    videoCardApi.forEach((element) => {
        const cardViews = element.others.views;
        // sortByView(cardViews);
        // code for upload time for minutes
        const uploadTime = element.others.posted_date;
        const initialTimeInMinutes = uploadTime / 60;
        const roundedTime = Math.floor(initialTimeInMinutes);

        let finalTimeInMinutes = Math.trunc(
            (initialTimeInMinutes - roundedTime) * 100
        );
        // code for upload time for hours

        let initialTimeInHours = Math.trunc(initialTimeInMinutes / 60);
        if (finalTimeInMinutes === 60) {
            initialTimeInHours = initialTimeInHours + 1;
            finalTimeInMinutes = 0;
        } else if (finalTimeInMinutes > 60) {
            initialTimeInHours = initialTimeInHours + 1;
            finalTimeInMinutes = finalTimeInMinutes - 60;
        }
        const videoCardContainer = document.getElementById("cards-container");
        const div = document.createElement("div");
        div.classList = "card w-80 md:w-96 bg-base-100 py-4";
        div.innerHTML = `
            <figure>
            <img class="h-40 md:h-52 w-60 md:w-80" src="${element.thumbnail
            }" alt="Shoes" />
            <div class="bg-[#171717] flex justify-end rounded-lg text-white w-fit p-1 text-xs absolute right-[37px] bottom-[124px] z-10">
            ${element.others.posted_date
                ? `<span id="time-in-hours">${initialTimeInHours}&nbsp;hrs&nbsp;</span>`
                : ""
            }
            ${element.others.posted_date && finalTimeInMinutes
                ? `<span id="time-in-minutes">${finalTimeInMinutes}&nbsp;min ago</span>`
                : ""
            }
        </div>
        

        
        </figure>
        <div class="card-body md:px-8 px-10 py-2">
            <div class="flex justify-start my-2 gap-4">
                <div class="">
                    <img class="w-10 h-10 rounded-full" src="${element.authors[0].profile_picture
            }" alt="">
                </div>
                <div>
                    <h2 class="card-title font-bold text-base">${element.title
            }</h2>
            <p class="flex gap-2">
            ${element.authors[0].profile_name}
            ${element.authors[0].verified
                ? '<img src="images/fi_10629607.svg" alt="Verified">'
                : ""
            }
        </p>
        
                    <p><span>${element.others.views}</span> views</p>
                </div>
            </div>
        </div>
        `;
        return videoCardContainer.appendChild(div);
    });
};

// const getCategoriesDivId = (apiData) => {
//     apiData.forEach((api) => {
//         const divCategoryId = api.category_id;
//         console.log(divCategoryId);
//     });
// };

const getVideosByCategory = (categoryId,getCategoriesDivId) => {
    document.getElementById(categoryId).addEventListener("click", function () {
        document.getElementById("cards-container").innerHTML = "";
        const noContentContainer = document.getElementById("no-content");
        console.log(object);
        // console.log(getCategoriesDivId);
        // if (categoryId === "") {
        //     const div = document.createElement("div");
        //     div.innerHTML = `
        //     <div>
        //         <img src="images/Icon.png" alt="">
        //     </div>
        //     <div>
        //         <h1 class="text-3xl mx-4 font-bold">Oops!! Sorry, There is no content here</h1>
        //     </div>
        //     `
        //     noContentContainer.appendChild(div)
        // } else {
        //     console.log("moira jah");
        // }
    });
};

// sort by view section code
// const sortByView = (viewsString) => {
//     const viewsInNumbers = viewsString.slice(0, -1);
//     console.log(viewsInNumbers);
//     viewsInNumbers.sort((x, y) => y - x);

//     console.log(viewsInNumbers);
// };
