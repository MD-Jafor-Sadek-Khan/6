const loadData = async (fullload = false) => {
    const res = await fetch("https://openapi.programming-hero.com/api/ai/tools")
    const data = await res.json();
    const models = data?.data?.tools;
    load(models, fullload)
}

const load = (models, fullload) => {
    const parentDiv = document.getElementById("cards-container");
    parentDiv.innerText = ""
    console.log(fullload)

    if (fullload) {
        models.forEach(async (element) => {
            const id = element.id
            const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
            const data = await res.json();
            const model = data?.data;
            card(model, models)


        });
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
    div.classList = "col-4 mt-5"
    div.innerHTML = `
            <div class="card p-4 rounded-3" style="width: 21rem;">
            <img src="${data?.image_link[0]}" onerror="this.src='https://th.bing.com/th/id/OIP.1_ceod8DjeoFC6ZlNePvVwAAAA?pid=ImgDet&rs=1'" class="card-img-top rounded-3 equal-size-image" alt="...">


            <div class="card-body">
            <h5 class="card-title">Features</h5>
            <ul id="feature-list${data?.id}">
         
            </ul>
            <hr>
            <div class="d-flex justify-content-between align-items-end">
                <div>
                    <h3>${data?.tool_name}</h3>
                    <div class="d-flex justify-content-start align-items-center gap-2">
                        <div>
                             <i class="fa-solid fa-calendar-days"></i>
                        </div>
                        <div id="date${data?.id}">
                            
                        </div>
                    </div>

                </div>
                <button class="text-white btn btn-danger">
                    &#10132;
                </button>
            </div>
            </div>
        </div>
    `

    parentDiv.appendChild(div)
    features(data, data.id, models)

}


const features = (data, id, models) => {
    const featuresUl = document.getElementById(`feature-list${id}`)
    const date = document.getElementById(`date${id}`);

    const featureList = data?.features
    featuresUl.innerText = ""
    for (const i in featureList) {
        const feature = featureList[i];
        const li = document.createElement("li");
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
    const fullload = true
    loadData(fullload)
}

const sort = ()=>
{
    
}

loadData()

