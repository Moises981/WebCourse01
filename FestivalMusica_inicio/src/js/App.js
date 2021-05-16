document.addEventListener('DOMContentLoaded', () => {
    scrollNav()
    navFixed()
})

function scrollNav() {
    const links = document.querySelectorAll('.main-nav a')
    links.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault()
            const section = document.querySelector(e.target.attributes.href.value)
            section.scrollIntoView({
                behavior: 'smooth'
            })
        })
    })
}

function navFixed(){

    const bar = document.querySelector('.header')

    const observer = new IntersectionObserver((entries)=>{
        if(entries[0].isIntersecting){
            bar.classList.remove('fixed')
        } else{
            bar.classList.add('fixed')
        }
    })

    observer.observe(document.querySelector('.about-festival'))
}