var hours;
var minutes;

var ChangeTime = false;

var TopColors = ["rgba(0,0,12,0)","rgba(2,1,17,0)","rgba(2,1,17,0)","rgba(2,1,17,0)","rgba(32,32,44,0.5)","rgba(64,64,92,.8)","rgb(74,73,105)","rgb(117,122,191)","rgb(130,173,219)","rgb(148,197,248)","rgb(138, 215, 247)","rgb(144,223,254)","rgb(87,193,235)","rgb(45,145,194)","rgb(36,115,171)","rgb(30,82,142)","rgb(30,82,142)","rgb(21,66,119)","rgba(22,60,82,0.8)","rgba(7,27,38,.5)","rgba(1,10,16,.3)","rgba(9,4,1,0)","rgba(0,0,12,0)","rgba(0,0,12,0)"];
var BottomColors = ["rgba(0,0,12,0)","rgba(25,22,33,.3)","rgba(32,32,44,.8)","rgb(58,58,82)","rgb(81,81,117)","rgb(138,118,171)","rgb(205,130,160)","rgb(234,176,209)","rgb(235,178,177)","rgb(177,181,234)","rgb(23, 151, 209)","rgb(103,209,251)","rgb(56,163,209)","rgb(36,111,168)","rgb(30,82,142)","rgb(91,121,131)","rgb(157,166,113)","rgb(233,206,93)","rgb(178,99,57)","rgb(47,17,7)","rgb(36,14,3)","rgb(47,17,7)","rgba(75,29,6,.4)","rgba(21,8,0,0)","rgba(0,0,12,0)"];

const TimeSlider = document.getElementById("TimeRange");


var oldVar = hours;
document.getElementById("TimeRange").oninput = function() {
    CustomTime()
};





function CustomTime() {
   
    var val = document.getElementById("TimeRange").value; //gets the oninput value
   //displays this value to the html page
    
    hours = val;
    minutes = 0;
    
    ChangeTime =     true;
}






function updateTime(){

    console.log(ChangeTime);
    if(!ChangeTime){
        hours = (new Date()).getHours();
        minutes = (new Date()).getMinutes();
    }

    
    if(minutes == 0){
        document.getElementById("TimeTxt").textContent = (hours + ":" + minutes + minutes)
    }else(
        document.getElementById("TimeTxt").textContent = (hours + ":" + minutes)
    )
    
    document.getElementById("scene").style.background = " linear-gradient(to bottom," + TopColors[hours] +"," + BottomColors[hours] + ")";


    var bright = 100;
    if(hours > 18 || hours < 4){
        bright = 20
    }else if(hours == 4 || hours == 18){
      bright = 50
    }
 

    document.querySelectorAll(".imgs").forEach(el => {
        el.style.filter = "brightness("+bright+"%)";
    });
    
    setTimeout(updateTime, 100);

}


updateTime();
//add the color to the element you want:
console.log('time', hours, ":",minutes);

gsap.registerPlugin(ScrollTrigger);

// --- main ---

const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".main",
        scrub: true,
        pin: true,

        start: "50% 50%",
        end: "+=100%"
    }
})


.to(".main", {
    scale: 4,
    opacity: 0
})

.to(".test", {
    opacity: 1
})


let tlnew = gsap.timeline({
    scrollTrigger: {
        trigger: '.section2',
        start: "center center",
        // makes the height of the scrolling (while pinning) match the width, thus the speed remains constant (vertical/horizontal)
        end: () => "+=" + 'section2'.offsetWidth,
        scrub: true,
        pin: true,
        end: "+=200%"
            //anticipatePin: 1
    },
    defaults: { ease: "yes" }
});

tlnew.fromTo(".section2", { opacity: 0 }, { opacity: 1 }, 0);


/*
gsap.utils.toArray(".section").forEach(section => {
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "center center",
            // makes the height of the scrolling (while pinning) match the width, thus the speed remains constant (vertical/horizontal)
            end: () => "+=" + section.offsetWidth,
            scrub: true,
            pin: true,
            end: "+=100%"
                //anticipatePin: 1
        },
        defaults: { ease: "yes" }
    });




    //section.querySelectorAll(".cover").forEach(el => {
    //  tl.fromTo(el, { xPercent: 1050, x: 0 }, { xPercent: 0, ease: Power4.easeOut }, 0);
    //});

    // ...and the image the opposite way (at the same time)
    //tl.fromTo(section.querySelectorAll(".cover"), { xPercent: 1050, x: 0 }, { xPercent: 0, ease: Power4.easeOut }, 0);

    //tl.fromTo(".cover", { opacity: 0 }, { opacity: 1 }, 0);

    tl.from(section.querySelector(".img"), { xPercent: -150, x: 0 }, { xPercent: 0 }, 0);
    tl.to({}, { duration: 0.5 })


});

function animateFrom(elem, direction) {
    direction = direction || 1;
    var x = 0,
        y = direction * 300;
    if (elem.classList.contains("gs_reveal_fromLeft")) {
        x = -200;
        y = 0;
    } else if (elem.classList.contains("gs_reveal_fromRight")) {
        x = 200;
        y = 0;
    }
    elem.style.transform = "translate(" + x + "px, " + y + "px)";
    elem.style.opacity = "0";
    gsap.fromTo(elem, { x: x, y: y, autoAlpha: 0 }, {
        duration: 1.25,
        x: 0,
        y: 0,
        autoAlpha: 1,
        ease: "expo",
        overwrite: "auto"
    });
}

function hide(elem) {
    gsap.set(elem, { autoAlpha: 0 });
}

document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".gs_reveal").forEach(function(elem) {
        hide(elem); // assure that the element is hidden when scrolled into view

        ScrollTrigger.create({
            trigger: elem,
            onEnter: function() { animateFrom(elem) },
            onEnterBack: function() { animateFrom(elem, -1) },
            onLeave: function() { hide(elem) } // assure that the element is hidden when scrolled into view
        });
    });
});




//cards 

function atvImg() {
    var d = document,
        de = d.documentElement,
        bd = d.getElementsByTagName('body')[0],
        htm = d.getElementsByTagName('html')[0],
        win = window,
        imgs = d.querySelectorAll('.atvImg'),
        totalImgs = imgs.length,
        supportsTouch = 'ontouchstart' in win || navigator.msMaxTouchPoints;

    if (totalImgs <= 0) {
        return;
    }

    for (var l = 0; l < totalImgs; l++) {

        var thisImg = imgs[l],
            layerElems = thisImg.querySelectorAll('.atvImg-layer'),
            totalLayerElems = layerElems.length;

        if (totalLayerElems <= 0) {
            continue;
        }

        while (thisImg.firstChild) {
            thisImg.removeChild(thisImg.firstChild);
        }

        var containerHTML = d.createElement('div'),
            shineHTML = d.createElement('div'),
            shadowHTML = d.createElement('div'),
            layersHTML = d.createElement('div'),
            layers = [];

        thisImg.id = 'atvImg__' + l;
        containerHTML.className = 'atvImg-container';
        shineHTML.className = 'atvImg-shine';
        shadowHTML.className = 'atvImg-shadow';
        layersHTML.className = 'atvImg-layers';

        for (var i = 0; i < totalLayerElems; i++) {
            var layer = d.createElement('div'),
                imgSrc = layerElems[i].getAttribute('data-img');

            layer.className = 'atvImg-rendered-layer';
            layer.setAttribute('data-layer', i);
            layer.style.backgroundImage = 'url(' + imgSrc + ')';
            layersHTML.appendChild(layer);

            layers.push(layer);
        }

        containerHTML.appendChild(shadowHTML);
        containerHTML.appendChild(layersHTML);
        containerHTML.appendChild(shineHTML);
        thisImg.appendChild(containerHTML);

        var w = thisImg.clientWidth || thisImg.offsetWidth || thisImg.scrollWidth;
        thisImg.style.transform = 'perspective(' + w * 3 + 'px)';

        if (supportsTouch) {
            win.preventScroll = false;

            (function(_thisImg, _layers, _totalLayers, _shine) {
                thisImg.addEventListener('touchmove', function(e) {
                    if (win.preventScroll) {
                        e.preventDefault();
                    }
                    processMovement(e, true, _thisImg, _layers, _totalLayers, _shine);
                });
                thisImg.addEventListener('touchstart', function(e) {
                    win.preventScroll = true;
                    processEnter(e, _thisImg);
                });
                thisImg.addEventListener('touchend', function(e) {
                    win.preventScroll = false;
                    processExit(e, _thisImg, _layers, _totalLayers, _shine);
                });
            })(thisImg, layers, totalLayerElems, shineHTML);
        } else {
            (function(_thisImg, _layers, _totalLayers, _shine) {
                thisImg.addEventListener('mousemove', function(e) {
                    processMovement(e, false, _thisImg, _layers, _totalLayers, _shine);
                });
                thisImg.addEventListener('mouseenter', function(e) {
                    processEnter(e, _thisImg);
                });
                thisImg.addEventListener('mouseleave', function(e) {
                    processExit(e, _thisImg, _layers, _totalLayers, _shine);
                });
            })(thisImg, layers, totalLayerElems, shineHTML);
        }
    }

    function processMovement(e, touchEnabled, elem, layers, totalLayers, shine) {

        var bdst = bd.scrollTop || htm.scrollTop,
            bdsl = bd.scrollLeft,
            pageX = (touchEnabled) ? e.touches[0].pageX : e.pageX,
            pageY = (touchEnabled) ? e.touches[0].pageY : e.pageY,
            offsets = elem.getBoundingClientRect(),
            w = elem.clientWidth || elem.offsetWidth || elem.scrollWidth,
            h = elem.clientHeight || elem.offsetHeight || elem.scrollHeight,
            wMultiple = 320 / w,
            offsetX = 0.52 - (pageX - offsets.left - bdsl) / w,
            offsetY = 0.52 - (pageY - offsets.top - bdst) / h,
            dy = (pageY - offsets.top - bdst) - h / 2,
            dx = (pageX - offsets.left - bdsl) - w / 2,
            yRotate = (offsetX - dx) * (0.07 * wMultiple),
            xRotate = (dy - offsetY) * (0.1 * wMultiple),
            imgCSS = 'rotateX(' + xRotate + 'deg) rotateY(' + yRotate + 'deg)',
            arad = Math.atan2(dy, dx),
            angle = arad * 180 / Math.PI - 90;

        if (angle < 0) {
            angle = angle + 360;
        }

        if (elem.firstChild.className.indexOf(' over') != -1) {
            imgCSS += ' scale3d(1.07,1.07,1.07)';
        }
        elem.firstChild.style.transform = imgCSS;

        shine.style.background = 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + (pageY - offsets.top - bdst) / h * 0.4 + ') 0%,rgba(255,255,255,0) 80%)';
        shine.style.transform = 'translateX(' + (offsetX * totalLayers) - 0.1 + 'px) translateY(' + (offsetY * totalLayers) - 0.1 + 'px)';

        var revNum = totalLayers;
        for (var ly = 0; ly < totalLayers; ly++) {
            layers[ly].style.transform = 'translateX(' + (offsetX * revNum) * ((ly * 2.5) / wMultiple) + 'px) translateY(' + (offsetY * totalLayers) * ((ly * 2.5) / wMultiple) + 'px)';
            revNum--;
        }
    }

    function processEnter(e, elem) {
        elem.firstChild.className += ' over';
    }

    function processExit(e, elem, layers, totalLayers, shine) {

        var container = elem.firstChild;

        container.className = container.className.replace(' over', '');
        container.style.transform = '';
        shine.style.cssText = '';

        for (var ly = 0; ly < totalLayers; ly++) {
            layers[ly].style.transform = '';
        }

    }

}

atvImg();




/* function update(e){
  var x = e.clientX || e.touches[0].clientX
  var y = e.clientY || e.touches[0].clientY

  document.documentElement.style.setProperty('--cursorX', x + 'px')
  document.documentElement.style.setProperty('--cursorY', y + 'px')
}

document.addEventListener('mousemove',update)
document.addEventListener('touchmove',update) */

//scrolltrigger