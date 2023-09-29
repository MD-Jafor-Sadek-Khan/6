const loadData = async()=>
{
    const res = await fetch("https://openapi.programming-hero.com/api/ai/tools")
    const data = await res.json();
    const models = data.data.tools;

    load(models)
}

const load = async(data)=>
{
    data.forEach(element => {
        const id = element.id
        const model = fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`).then(res => res.json()).then(data => console.log(data.data))
        
        
    });
}

const card = (data) =>
{
    const parentDiv = document.getElementById("cards-container");
    
}