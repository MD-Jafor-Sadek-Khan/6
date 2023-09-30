const loadData = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/ai/tools")
    const data = await res.json();
    const models = data?.data?.tools;

    load(models)
}

const load = (data) => {
    const parentDiv = document.getElementById("cards-container");
    parentDiv.innerText =""
    data.forEach(async (element) => {
        const id = element.id
        const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
        const data = await res.json();
        const model = data?.data;
        card(model)


    });
}

const card = (data) => {
    const parentDiv = document.getElementById("cards-container");
    const div = document.createElement("div");
    div.classList = "col-4 p-5"
    div.innerHTML = `
            <div class="card" style="width: 18rem;">
            <img src="${data?.image_link[0]}" onerror="this.src='https://th.bing.com/th/id/OIP.1_ceod8DjeoFC6ZlNePvVwAAAA?pid=ImgDet&rs=1'" class="card-img-top" alt="...">


            <div class="card-body">
            <h5 class="card-title">Features</h5>
            <ul id="feature-list${data.id}">
         
            </ul>
            <hr>
            <div class="d-flex justify-content-between align-items-end">
                <div>
                    <h3>${data.tool_name}</h3>
                    <p>data / / /</p>

                </div>
                <div class="text-danger">
                    &RightTriangleBar;
                </div>
            </div>
            </div>
        </div>
    `

    parentDiv.appendChild(div)
    features(data, data.id)

}


const features = (data, id) => {

    const featuresUl = document.getElementById(`feature-list${id}`)
    const featureList = data?.features
    featuresUl.innerText = ""
    for (const i in featureList) {
        const feature = featureList[i];
        const li = document.createElement("li");
        li.innerHTML = feature?.feature_name;
        featuresUl.appendChild(li)

    }
}