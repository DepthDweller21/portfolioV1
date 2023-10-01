document.querySelector('.forexLaw').addEventListener('click',potato)

function potato(){
    window.location.replace("https://forexlaw.netlify.app");
}

let intro = document.querySelector('.intro');
let logo = document.querySelector('.logoHeader');
let logoSpan = document.querySelectorAll('.introLogo');

window.addEventListener('DOMContentLoaded', ()=>{

    setTimeout(()=>{
        logoSpan.forEach((span, idx)=>{ setTimeout(()=>{
        span.classList.add('active');
        }, (idx + 1) * 300)
        })
    })
});

setTimeout(()=>{
    logoSpan.forEach((span, idx)=>{
    setTimeout(()=>{
    span.classList.remove('active');
    span.classList.add('fade');
}, (idx + 1)*50)
})
}, 2000);

setTimeout(()=>{
intro.style.top = '-100vh'},2500);