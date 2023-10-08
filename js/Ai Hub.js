
const loadData = async (fullload = false, isSort) => {
    const res = await fetch("https://openapi.programming-hero.com/api/ai/tools")
    const data = await res.json();
    const models = data?.data?.tools;
    if(isSort)
    {
        const models2 = models.sort( (a, b) => {
            const dateA = new Date(a?.published_in);
            const dateB = new Date( b?.published_in);
            return dateA - dateB;
        });
        console.log(models2)
        load(models2, fullload)

    }
    else
    {

        load(models, fullload)
    }
}

const load = (models, fullload) => {
    const parentDiv = document.getElementById("cards-container");
    parentDiv.innerText = ""
    // console.log(fullload)
        
        if (fullload) {
            let i = 0
            const totalmodels = models.length;
            // console.log(models.length)
    
            models.forEach(async (element) => {
                // console.log(element.id)
                const id = element.id
                try {
                    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
                    const data = await res.json();
                    const model = data?.data;
                    card(model, models)
                    i++
                    const percentage = (i / totalmodels) * 100
                    toggleSpinner(true, percentage)
                    if (i === totalmodels) {
                        toggleSpinner(false, 0);
                    }
                }
                catch (error) {
                    console.error(error);
                }
            })
    
        }
        else {
            // let count = 0
    
            // models.forEach(async (element) => {
            //     if (count >= 6) {
            //         return;
            //     }
            //     const id = element.id
            //     const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
            //     const data = await res.json();
            //     const model = data?.data;
            //     card(model, models)
            //     count++
            // });
            for (let i = 0; i < 6; i++) {
                const id = models[i].id
    
                // fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
                // .then((res) => res.json())
                // .then((data) => {
                //     const model = data?.data;
                //     card(model, models);
                // })
                // .catch((error) => {
                //     console.error(error);
                // });
                fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
                    .then(res => res.json())
                    .then(data => {
                        const model = data?.data;
                        card(model, models)
                    })
                    .catch(error => {
                        console.log(error)
                    });
            }
        }
    
}

const card = async (data, models) => {
    const parentDiv = document.getElementById("cards-container");
    const div = document.createElement("div");
    div.classList = "col-lg-4 col-md-2 col-sm-1 mt-5"
    div.innerHTML = `
            <div class="card p-4 individual-card" style="width: 21rem; id="card-of-${data?.id}">
            <img id="img-of-${data?.id}" 
            src="${data?.image_link[0]}" 
            onerror="handleError(this, 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png')"
            onload="handleLoad(this)"
            class="individual-card-img" 
            style="object-fit:cover;height:150px"
            alt="...">
         
            <div class="card-body">
            <h5 class="card-title">Features</h5>
            <ul id="feature-list${data?.id}">
         
            </ul>
            <hr class="my-hr">
            <div class="d-flex justify-content-between align-items-end">
                <div>
                    <h5>${data?.tool_name}</h5>
                    <div class="d-flex justify-content-start align-items-center gap-2">
                        <div>
                             <i class="fa-solid fa-calendar-days text-danger"></i>
                        </div>
                        <div class="date-text" id="date${data?.id}">
                            
                        </div>
                    </div>

                </div> 



                
                <!-- Button trigger modal -->
                <button type="button" class="text-white btn btn-danger btn-sm px-1 py-0" data-bs-toggle="modal" data-bs-target="#staticBackdrop${data?.id}" onclick="modalload(${data,data.id})">
                    &#10132;
                </button> 
                


                <!-- Modal -->
                <div class="modal fade" id="staticBackdrop${data?.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog custom-modal-dialog bg-secondary-subtle rounded-3">
                    <div class="modal-content">
                        <div class="text-end">
                            <h5 class="modal-title" id="staticBackdropLabel${data?.id}"></h5>
                            <button type="button" class="btn rounded-circle" data-bs-dismiss="modal" aria-label="Close"><i class=" fa-solid fa-circle-xmark" style="color: #cf1717;"></i></button>
                        </div>
                        <div class="modal-body d-flex justify-content-center align-items-center gap-2">
                            <div class="bg-danger-subtle border border-1 p-3 border-danger rounded-3">
                              <div class="fw-bold fs-4 pb-2">
                                ${data?.description}
                              </div>
                              <div class="d-flex justify-content-center align-items-center gap-2">
                                   <div class="bg-white rounded-3 p-2 text-success fw-bold">${data.pricing[0]?.plan}
                                   ${data.pricing[0]?.price}</div>
                                  <div class="bg-white rounded-3 p-2 text-warning fw-bold">${data.pricing[1]?.plan}
                                  ${data.pricing[1]?.price}</div>
                                  <div class="bg-white rounded-3 p-2 text-danger fw-bold">${data.pricing[2]?.plan}
                                  ${data.pricing[2]?.price}</div>

                              </div>
                              <div class="d-flex justify-content-between align-items-center gap-2 fw-bold p-2">
                                <div class="d-flex flex-column justify-content-between align-items-start ">
                                <h5 class="fw-bold">Features</h5>
                                  <ul id="modal-feature-list${data?.id}">
                                    
                                  </ul>
                                  </div>
                                <div class="d-flex flex-column ">
                                <h5 class="fw-bold">Integrations</h5>

                                   <ul id="modal-integrations-list${data?.id}">
                                   </ul>
                                   </div>
                              </div>

                            </div>
                            <div class="border border-light-subtle rounded-3">


                            <div class="card" style="width: 18rem;">

                                <div class="position-relative">
                                    <img id="modal-image${data?.id}" src="${data?.image_link[0]}" onerror='this.src="https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png"' class="border-info object-fit-scale img-fluid border rounded" alt="">
                                    <div class="text-center text-white bg-danger rounded-2 position-absolute mt-2 top-0 end-0">
                                        <p class="accuracy-text">${data?.accuracy?.score !== null ? `${data.accuracy.score * 100}% Accuracy` : ''}</p>
                                    </div>
                                </div>


                            <div class="card-body">
                                <h5 class="text-center">${data?.input_output_examples[0].input ? data?.input_output_examples[0].input: "Can you give an example?" }</h5>
                                <p class="text-center">${data?.input_output_examples[0].output ? data?.input_output_examples[0].output: "No! Not Yet! Take A Break!!!" }</p>
                            </div>
                            </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
        
    `

    parentDiv.appendChild(div)
    features(data, data.id, models)
    featuresOfmodals(data, data.id, models)


}


const features = (data, id, models) => {
    const featuresUl = document.getElementById(`feature-list${id}`)
    const date = document.getElementById(`date${id}`);

    const featureList = data?.features
    featuresUl.innerText = ""
    for (const i in featureList) {
        const feature = featureList[i];
        const li = document.createElement("li");
        li.classList.add("small-text");
        li.innerHTML = feature?.feature_name;
        featuresUl.appendChild(li)


    }

    for (const i in models) {
        if (models[i].id === id) {
            date.innerText = models[i]?.published_in
        }
    }

}

const showAll = () => {
    toggleSpinner(true, 1)
    const fullload = true
    loadData(fullload)
}




const featuresOfmodals = (data, id, models) => {
    const featuresUl = document.getElementById(`modal-feature-list${data?.id}`)
    const integrationUl = document.getElementById(`modal-integrations-list${data?.id}`)
    const date = document.getElementById(`date${id}`);

    const featureList = data?.features
    featuresUl.innerText = ""
    for (const i in featureList) {
        const feature = featureList[i];
        const li = document.createElement("li");
        li.classList.add("small-text");
        li.innerHTML = feature?.feature_name;
        featuresUl.appendChild(li)


    }
    const integrationList = data?.integrations
    integrationUl.innerText = ""
    for (const i in integrationList) {
        const li = document.createElement("li");
        li.classList.add("small-text");
        li.innerHTML = integrationList[i]
        integrationUl.appendChild(li)


    }

    for (const i in models) {
        if (models[i].id === id) {
            date.innerText = models[i]?.published_in
        }
    }

}



function handleError(img, notFoundImage) {
    img.src = notFoundImage;
}

function handleLoad(img) {
    setTimeout(function () {
        if (img.complete === false) {
            img.src = 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png';
        }
    }, 10000);
}

const toggleSpinner = (state, percentage) => {
    if (state === true) {
        document.getElementById("spinner-container").classList.remove("d-none")
        document.getElementById("spinner-container").style.width = `${percentage}%`
        document.getElementById("spinner-container").setAttribute("aria-valuenow", `${percentage}`);
        document.getElementById("spinner-percentage").innerText = `${percentage.toFixed(0)}`


    }
    else if (state === false) {
        document.getElementById("spinner-container").classList.add("d-none")
    }
}

const sortByDate = () =>
{

        loadData(true, true)

}


loadData()