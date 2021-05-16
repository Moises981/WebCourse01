document.addEventListener('DOMContentLoaded',()=>{
    createGallery();
})

function createGallery(){
    const gallery = document.querySelector('.gallery-images')

    for(let i=1; i<= 12;i++){
        const img = document.createElement('img')
        img.src = `build/img/thumb/${i}.webp`
        img.dataset.imgId = i;
        img.onclick = showImg;
        const list = document.createElement('li')
        list.appendChild(img)
        gallery.appendChild(list)
    }
}

function showImg(e){
    const id = parseInt(e.target.dataset.imgId)
    const img = document.createElement('img')
    img.src = `build/img/grande/${id}.webp`

    const overlay = document.createElement('div')
    overlay.appendChild(img)
    overlay.classList.add('overlay')
    overlay.onclick = () =>{
        overlay.remove()
    }

    const closeImg = document.createElement('p')
    closeImg.textContent = 'X'
    closeImg.classList.add('btn-close')

    closeImg.onclick = () =>{
        overlay.remove()
    }

    overlay.appendChild(closeImg)

    const body = document.querySelector('body')
    body.appendChild(overlay)
    body.classList.add('fix-body')
}