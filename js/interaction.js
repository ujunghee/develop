
function firstAnimation() {
    let tl = gsap.timeline({
        ease: "back.out(1.7)",
    })

    tl.to('.content_one', {
        opacity:1,
    })

    tl.to('.title span', {
        opacity:1,
        duration: .5,
        y:0,
        stagger: {
            each:0.05,
        },
    },'<+.3') 

    tl.to('.v_i', {
        opacity:1,
        duration: .8,
        y:0,
        stagger: {
            each:0.2,
        },
    },'<+.3') 
    
    tl.to('.m-sub', {
        opacity:1,
        duration: .8,
        y:0,
        stagger: {
            each:0.02,
        },
    },'<-.6') 

    tl.to('.cloud-right', {
        opacity:1,
        duration: .8,
        x:5,
        y:0,
    },'<+1') 

    tl.to('.cloud-left', {
        opacity:1,
        duration: .5,
        x:0,
        y:0,
    },'<+.2') 

    tl.to('.cloud-right', {
        duration: 1.8,
        x:0,
        y:-1,
        repeat:-1,
        ease: "power1.out",
        yoyo:true,
    },'<') 

    tl.to('.cloud-left', {
        duration: 1.8,
        x:0,
        y:-3,
        repeat:-1,
        ease: "power1.out",
        yoyo:true,
    },'<+.5') 

    tl.to('.content_one .button', {
        opacity:1,
        // duration: 3,
        y:0,
    },'<-1.65') 

}


function seletAnimation() {
    // document.addEventListener('touchstart', function(event) {
    //     if (event.target.classList.contains('button')) {
            
    //     }
    // })
    let tl = gsap.timeline({
        ease: "power1.inOut",
    })

    tl.to('.select', {
        opacity:1,
    })

    tl.to('.m-sub', {
        opacity:1,
        y:0,
        stagger: {
            each:0.03,
        },
    },'<-.3') 
    
    tl.to('.txt-box', {
        y:0,
        duration:1,
        ease: "power4.out",
    },'<+1.5')

    tl.to('.select .swiper', {
        opacity:1,
        y:0,
    },'<+.4')

    tl.to('.select .button', {
        opacity:1,
        y:0,
    },'<-.7') 

}
