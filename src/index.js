import axios from 'axios'
import Notiflix from 'notiflix';

const galleryBox =document.querySelector('.gallery')
const btnMore =document.querySelector('.load-more')
const formRef = document.querySelector('.search-form')

axios.defaults.baseURL='https://pixabay.com/api/'
axios.defaults.params={
    key : '29658795-5ff645c73258641797d361c47',
    orientation:'horizontal',
    safesearch :true,
    image_type:'photo',
    per_page:40,
}
let pageValue = 1


async function conectToBase(seach){
   const {data} = await axios.get('/',{
        params:{
            q:seach,
            page:pageValue
        }
    })
    const {hits,totalHits} = data
        addImg(totalHits)
        buttonMore(data)
        setMurcup({hits,totalHits})
}


formRef.addEventListener('click',getImg)

async function getImg(event){
    event.preventDefault()
    if (event.target.tagName!=='BUTTON') {
        return
       }

   if (event.currentTarget.elements.searchQuery.value.length === 0) {
    Notiflix.Notify.info('Enter text on seach!')
    return
   }
   btnMore.classList.remove('is-hidden')
   event.preventDefault()
   galleryBox.innerHTML = ''
    conectToBase(event.currentTarget.elements.searchQuery.value.trim())
   
}

async function addImg(totalHits){
try{
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)
}
catch{console.log('error');}
}

function setMurcup({hits,totalHits}){
    console.log(hits)
    const boxMarkup = hits.map(({largeImageURL ,tags,likes,views,comments,downloads})=>{
        return  `<div class="photo-card">
        <img src="${largeImageURL }" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes : ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views : ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments : ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads : ${downloads}</b>
          </p>
        </div>
      </div>`
    }).join("")

    galleryBox.insertAdjacentHTML('afterbegin',boxMarkup)
 }

 btnMore.addEventListener('click',buttonMore)

 async function buttonMore(data){
if(pageValue >= Math.ceil(data.hits.length/axios.defaults.params.per_page)){
    btnMore.classList.add('.is-hidden')
    Notiflix.Notify.success(`We're sorry, but you've reached the end of search results.`)
  }
 }