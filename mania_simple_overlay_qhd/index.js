// made by sky(@s2skky)

// no touch
let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");
socket.onopen = () => console.log("Successfully Connected");
socket.onclose = event => {
  console.log("Socket Closed Connection: ", event);
  socket.send("Client Closed!");
};
socket.onerror = error => console.log("Socket Error: ", error);

let contents = {};

fetch("./setting/setting.json" + "?t=" + Date.now().toString())
  .then(response => response.json())
  .then(json => Object.assign(contents, json));

let info_section = document.getElementById("info_section");
let style = document.getElementById("style");
let left_box = document.getElementById("left_box");
let right_box = document.getElementById("right_box");

let l_text = document.getElementById("l_text");
let l_number = document.getElementById("l_number");
let r_text = document.getElementById("r_text");
let r_number = document.getElementById("r_number");

let l_index = 0;
let r_index = 0;
let s_index = 0;
let m_index = 0;

let title = document.getElementById("title");
let title_mask = document.getElementById("title_mask");
let subtitle = document.getElementById("subtitle");
let subtitle_mask = document.getElementById("subtitle_mask");

let h320_shadow = document.getElementById("h320_shadow");
let h300_shadow = document.getElementById("h300_shadow");
let h200_shadow = document.getElementById("h200_shadow");
let h100_shadow = document.getElementById("h100_shadow");
let h50_shadow = document.getElementById("h50_shadow");
let h0_shadow = document.getElementById("h0_shadow");

let h320 = document.getElementById("h320");
let h300 = document.getElementById("h300");
let h200 = document.getElementById("h200");
let h100 = document.getElementById("h100");
let h50 = document.getElementById("h50");
let h0 = document.getElementById("h0");
let ur = document.getElementById("ur");

let t_title;
let t_subtitle;

let t_h320;
let t_h300;
let t_h200;
let t_h100;
let t_h50;
let t_h0;
let t_ur;

let t_left;
let t_right;
let state;

function fade(s, index, hit_value){
    if ((s.opacity -= .05) < 0) {
        s.opacity = 0;
    } else {
        if (index !== hit_value) {
            s.opacity = 1;
        } else {
            setTimeout(fade, 80);
        }
    }
}

function setting(){
    if(contents.left_box == "star"){
        l_text.innerHTML = "STAR RATE";
        l_index = 1;
    }
    else if(contents.left_box == "acc"){
        l_text.innerHTML = "ACCURACY";
        l_index = 2;
    }
    else if(contents.left_box == "combo"){
        l_text.innerHTML = "MAX-COMBO";
        l_index = 3;
    }
    
    if(contents.right_box == "ur"){
        r_text.innerHTML = "UR";
        r_index = 1;
    }
    else if(contents.right_box == "pp"){
        r_text.innerHTML = "PP";
        r_index = 2;
    }
    
    if(contents.background == "black"){
        info_section.style.backgroundColor = 'rgba( 0, 0, 0, 0.8 )';
    }
    else if(contents.background == "white"){
        info_section.style.backgroundColor = 'rgba( 255, 255, 255, 0.12 )';
    }
    else if(contents.background == "gray"){
        info_section.style.backgroundColor = 'rgba( 26, 26, 26, 0.8 )';
    }
    
    if(contents.subtitle == "mapper"){
        s_index = 1;
    }
    else if(contents.subtitle == "difficult"){
        s_index = 2;
    }
    
    if(contents.simple == "on"){
        style.href = './css/style_simple.css';
        m_index = 1;
    }
    else if(contents.simple == "off"){
        style.href = './css/style.css';
        m_index = 2;
    }
    
    left_box.style.backgroundColor = 'rgba( ' + contents.l_r + ', ' + contents.l_g + ', ' + contents.l_b + ', 1)';
    right_box.style.backgroundColor = 'rgba( ' + contents.r_r + ', ' + contents.r_g + ', ' + contents.r_b + ', 1)';
}

setTimeout(function(){
    setting();
    socket.onmessage = event => {
    try {
        let data = JSON.parse(event.data);
        let menu = data.menu;
        let play = data.gameplay;
        api = contents.api_key;
        uid = contents.uid;
        
        if (state !== menu.state){
            state = menu.state;
            if(state == 2){
                setTimeout(function(){
                    info_section.style.opacity = 1;
                }, 1500);
            }
            else{
                h320_shadow.style.opacity = 0;
                h300_shadow.style.opacity = 0;
                h200_shadow.style.opacity = 0;
                h100_shadow.style.opacity = 0;
                h50_shadow.style.opacity = 0;
                h0_shadow.style.opacity = 0;
    
                info_section.style.opacity = 0;
            }
        }
        if(state !== 2){
            info_section.style.opacity = 0;
        }
        
        if(t_title !== menu.bm.metadata.artist + ' - ' + menu.bm.metadata.title){
            t_title = menu.bm.metadata.artist + ' - ' + menu.bm.metadata.title;
            title.innerHTML = t_title;
            title.style.width = 'max-content';
            let titleWidth = title.offsetWidth;
            
            if (contents.simple == "on") {
                if (titleWidth >= 265) {
                    title.classList.add("over");
                } else {
                    title.style.width = '200px';
                    title.classList.remove("over");
                }
            }
            else if (contents.simple == "off") {
                if (titleWidth >= 586) {
                    title.classList.add("over");
                } else {
                    title.style.width = '586px';
                    title.classList.remove("over");
                }
            }

        }
        
        if(s_index == 1){
            if (t_subtitle !== menu.bm.metadata.mapper) {
                t_subtitle = menu.bm.metadata.mapper;
                subtitle.innerHTML = 'mapper : ' + t_subtitle;
                let titleWidth = subtitle.offsetWidth;
                if (titleWidth >= 586) {
                    subtitle.classList.add("over");
                } else {
                    subtitle.style.width = '440px';
                    subtitle.classList.remove("over");
                }
            }
        }
        else if(s_index == 2){
            if (t_subtitle !== menu.bm.metadata.difficulty){
                t_subtitle = menu.bm.metadata.difficulty;
                subtitle.innerHTML = '[' + t_subtitle + ']';
                let titleWidth = subtitle.offsetWidth;
                if (titleWidth >= 586) {
                    subtitle.classList.add("over");
                } else {
                    subtitle.style.width = '440px';
                    subtitle.classList.remove("over");
                }
            }
        }

        
        // left
        if(l_index == 1){
            if(t_left !== menu.bm.stats.fullSR){
                t_left = menu.bm.stats.fullSR;
                l_number.innerHTML = t_left.toFixed(2);
            }
        }
        else if(l_index == 2){
            if(t_left !== play.accuracy){
                t_left = play.accuracy;
                l_number.innerHTML = t_left.toFixed(2);
            }
        }
        else if(l_index == 3){
            if(t_left !== play.combo.max){
                t_left = play.combo.max;
                l_number.innerHTML = t_left;
            }
        }
        
        // right
        if(r_index == 1){
            if (t_right !== play.hits.unstableRate){
                t_right = play.hits.unstableRate;
                r_number.innerHTML = t_right.toFixed(2);
            }
        }
        else if(r_index == 2){
            if (t_right !== play.pp.current){
                t_right = play.pp.current;
                r_number.innerHTML = t_right;
            }
        }
        
        if (t_h320 !== play.hits.geki){
            t_h320 = play.hits.geki;
            h320.innerHTML = t_h320;
            var s = h320_shadow.style;
            s.opacity = 1;
        }
        if (t_h300 !== play.hits[300]){
            t_h300 = play.hits[300];
            h300.innerHTML = t_h300;
            var s = h300_shadow.style;
            s.opacity = 1;
        }
        if (t_h200 !== play.hits.katu){
            t_h200 = play.hits.katu;
            h200.innerHTML = t_h200;
            var s = h200_shadow.style;
            s.opacity = 1;
        }
        if (t_h100 !== play.hits[100]){
            t_h100 = play.hits[100];
            h100.innerHTML = t_h100;
            var s = h100_shadow.style;
            s.opacity = 1;
        }
        if (t_h50 !== play.hits[50]){
            t_h50 = play.hits[50];
            h50.innerHTML = t_h50;
            var s = h50_shadow.style;
            s.opacity = 1;
        }
        if (t_h0 !== play.hits[0]){
            t_h0 = play.hits[0];
            h0.innerHTML = t_h0;
            var s = h0_shadow.style;
            s.opacity = 1;
        }
        if (h320_shadow.style.opacity > 0) {
            setTimeout(function () {
                h320_shadow.style.opacity -= .05;
            }, 80)
        }
        if (h300_shadow.style.opacity > 0) {
            setTimeout(function () {
                h300_shadow.style.opacity -= .05;
            }, 80)
        }
        if (h200_shadow.style.opacity > 0) {
            setTimeout(function () {
                h200_shadow.style.opacity -= .05;
            }, 80)
        }
        if (h100_shadow.style.opacity > 0) {
            setTimeout(function () {
                h100_shadow.style.opacity -= .05;
            }, 80)
        }
        if (h50_shadow.style.opacity > 0) {
            setTimeout(function () {
                h50_shadow.style.opacity -= .05;
            }, 80)
        }
        if (h0_shadow.style.opacity > 0) {
            setTimeout(function () {
                h0_shadow.style.opacity -= .05;
            }, 80)
        }
        
        if(m_index == 1){
            if (t_ur !== play.hits.unstableRate){
                t_ur = play.hits.unstableRate;
                ur.innerHTML = t_ur.toFixed(2);
            }
        }
        	
  } catch (err) { console.log(err); };
};
    
}, 100);
