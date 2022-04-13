var hours;
var minutes;

var ChangeTime = false;

var TopColors = ["rgba(0,0,12,0)", "rgba(2,1,17,0)", "rgba(2,1,17,0)", "rgba(2,1,17,0)", "rgba(32,32,44,0.5)", "rgba(64,64,92,.8)", "rgb(74,73,105)", "rgb(117,122,191)", "rgb(130,173,219)", "rgb(148,197,248)", "rgb(138, 215, 247)", "rgb(144,223,254)", "rgb(87,193,235)", "rgb(45,145,194)", "rgb(36,115,171)", "rgb(30,82,142)", "rgb(30,82,142)", "rgb(21,66,119)", "rgba(22,60,82,0.8)", "rgba(7,27,38,.5)", "rgba(1,10,16,.3)", "rgba(9,4,1,0)", "rgba(0,0,12,0)", "rgba(0,0,12,0)"];
var BottomColors = ["rgba(0,0,12,0)", "rgba(25,22,33,.3)", "rgba(32,32,44,.8)", "rgb(58,58,82)", "rgb(81,81,117)", "rgb(138,118,171)", "rgb(205,130,160)", "rgb(234,176,209)", "rgb(235,178,177)", "rgb(177,181,234)", "rgb(23, 151, 209)", "rgb(103,209,251)", "rgb(56,163,209)", "rgb(36,111,168)", "rgb(30,82,142)", "rgb(91,121,131)", "rgb(157,166,113)", "rgb(233,206,93)", "rgb(178,99,57)", "rgb(47,17,7)", "rgb(36,14,3)", "rgb(47,17,7)", "rgba(75,29,6,.4)", "rgba(21,8,0,0)", "rgba(0,0,12,0)"];

//const TimeSlider = document.getElementById("TimeRange");

window.onresize = function() { location.reload(); }

//document.getElementById("TimeRange").oninput = function() {
//  CustomTime();
//};


document.getElementById("TimePlus").addEventListener("click", function() {
    if (hours <= 23) {
        hours += 1;
        ChangeTime = true;
        minutes = 0;
    }
});

document.getElementById("TimeMin").addEventListener("click", function() {
    if (hours >= 1) {
        hours -= 1;
        ChangeTime = true;
        minutes = 0;
    }

});



function updateTime() {



    if (!ChangeTime) {
        hours = (new Date()).getHours();
        minutes = (new Date()).getMinutes();
    }

    if (minutes == 0) {
        document.getElementById("TimeTxt").textContent = (hours + ":" + minutes + minutes)
    } else if (minutes < 10) {
        document.getElementById("TimeTxt").textContent = (hours + ":" + "0" + minutes)
    } else {
        document.getElementById("TimeTxt").textContent = (hours + ":" + minutes)
    }

    document.getElementById("scene").style.background = " linear-gradient(to bottom," + TopColors[hours] + "," + BottomColors[hours] + ")";


    var bright = 100;
    if (hours > 18 || hours < 4) {
        bright = 20
    } else if (hours == 4 || hours == 18) {
        bright = 50
    }


    document.querySelectorAll(".imgs").forEach(el => {
        el.style.filter = "brightness(" + bright + "%)";
    });

    setTimeout(updateTime, 100);

}
//circle
/*
var div = 30;
var radius = 100;
var parentdiv = document.getElementById('parentdiv');
var offsetToParentCenter = parseInt(parentdiv.offsetWidth / 2); //assumes parent is square
var offsetToChildCenter = 20;
var totalOffset = offsetToParentCenter - offsetToChildCenter;
for (var i = 1; i <= 5; ++i) {
    var childdiv = document.createElement('div');
    childdiv.className = 'div2';
    childdiv.style.position = 'absolute';
    var y = Math.sin((div * i) * (Math.PI / 180)) * radius;
    var x = Math.cos((div * i) * (Math.PI / 180)) * radius;
    childdiv.style.top = (y + totalOffset).toString() + "px";
    childdiv.style.left = (x + totalOffset).toString() + "px";
    parentdiv.appendChild(childdiv);
    console.log("y", y, "x", x);
}


*/

//preloader
var loader = document.getElementById("preloader");

window.addEventListener("load", function() {
    loader.style.display = "none";
});


updateTime();
//add the color to the element you want:
console.log('time', hours, ":", minutes);
gsap.registerPlugin(ScrollTrigger);

// --- main ---


const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".main",
        scrub: true,
        pin: true,

        start: "center center",
        end: "+=100%"
    }
})


.to(".main", {
    scale: 4,
    opacity: 0,
})

.to(".test", {
    opacity: 1,
})


let tlnew = gsap.timeline({
    scrollTrigger: {
        trigger: '.section2',
        start: "center center",
        // makes the height of the scrolling (while pinning) match the width, thus the speed remains constant (vertical/horizontal)
        toggleActions: "restart none none reset",
        scrub: true,
        pin: true,
        // end: "bottom -100%",
        end: "+=100%",
        onLeave: loadProjects
    },
    defaults: { ease: "yes" }
});



//tl.fromTo(".cover", { opacity: 0 }, { opacity: 1 }, 0);
tlnew.from(".section2", { opacity: 0, stagger: 0.05, duration: 2 }, 0)
    //tlnew.from(".frontImg", { xPercent: -150, yPercent: 50, stagger: 0.2, duration: 500, ease: "power4.out" })
tlnew.from(".frontImg", { scale: 0, stagger: 0.2, duration: 7, ease: "back" })
tlnew.to(".Aboutheader", { xPercent: 40, autoAlpha: 1, duration: 5 })

var divs = document.querySelectorAll('.socials');

[].forEach.call(divs, function(div) {
    // do whatever
    tlnew.from(div, { xPercent: -850, yPercent: 750, opacity: 0, stagger: 0.2, duration: 2 })
});

tlnew.from(".continue", { xPercent: 0, yPercent: 750, opacity: 0, stagger: 0.2, duration: 2 })
    //tlnew.to({}, { duration: 20 })

function loadProjects() {
    //  window.location.replace("./projects.html");
}



//TimeNumbers ####################################################################################



