let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
fetch(`http://localhost:3000/toys`).then(res => res.json()).then(data => {
  for(let toy of data){
    toyCard(toy)
  }
})
function toyCard(toy){
  const div = document.createElement(`div`)
    div.classList.add(`card`)
  const img = document.createElement(`img`)
    img.classList.add(`toy-avatar`)
    img.src = toy.image
  const name = document.createElement(`h2`)
    name.textContent = toy.name
  const favBtn = document.createElement(`button`)
    favBtn.classList.add(`like-btn`)
    favBtn.id = toy.id
    favBtn.addEventListener(`click`, e=>{
      e.target.likes = likes++
      e.target.textContent = `${likes} likes`
    })
  div.append(img, name, likes)
  console.log(div.append(img,name,likes))
}
const form = document.querySelector(`.add-toy-form`)
  form.addEventListener(`submit`, (e) =>{
    e.preventDefault()
    let toyName = document.getElementById(`input.name`)
    let toyURL = document.getElementById(`input.image`)
    let newToy = {
      name: toyName.value,
      image: toyURL.value,
      likes: 0
    }
    toyCard(newToy)
  })

const likes = (e) =>{
  const likeCount = parseInt(e.target.previousSibling.innerText) + 1
  fetch(`http://localhost:3000/toys/${e.target.id}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body:JSON.stringify({
      "likes" : likeCount
    })
  })
}
})
