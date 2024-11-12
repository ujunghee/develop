function animation() {
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
        duration: .5,
        y:0,
        stagger: {
            each:0.08,
        },
    },'<+.3') 
    
    tl.to('.cloud-right', {
        opacity:.8,
        duration: .5,
        x:0,
        y:0,
    },'<+.3') 

    tl.to('.cloud-left', {
        opacity:.8,
        duration: .5,
        x:0,
        y:0,
    },'<+.3') 

    tl.to('.cloud-right', {
        opacity:1,
        duration: 1.5,
        x:0,
        y:-5,
        repeat:-1,
        yoyo:true,
        ease: "power1.out",
    },'<') 

    tl.to('.cloud-left', {
        opacity:1,
        duration: 1.5,
        x:0,
        y:-5,
        repeat:-1,
        yoyo:true,
        ease: "power1.out",
    },'<+.3') 


}