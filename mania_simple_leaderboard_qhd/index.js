// made by sky(@s2skky)

// no touch
let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");
socket.onopen = () => console.log("Successfully Connected");
socket.onclose = event => {
  console.log("Socket Closed Connection: ", event);
  socket.send("Client Closed!");
};
socket.onerror = error => console.log("Socket Error: ", error);

let api = "";
let axios = window.axios;
let uid = "";
let contents = {};

fetch("./setting/setting.json" + "?t=" + Date.now().toString())
  .then(response => response.json())
  .then(json => Object.assign(contents, json));

let t_player;
let t_score = 0;
let t_total;

let bg_value = '';
let p_index;
let s_index;

let state;
let beatmap_score = {};
let beatmap_data = {};
let slots = {};

let rank_container = document.getElementById("rank_container");
let leaderboard_section = document.getElementById("leaderboard_section");
let rank_box_now;
let rank_score_now;
let rank_percent_now;
let rank_now;

let isCompleteRank = false;
let position = 0;
let temp = true;
let ranked_check = 0;

var v2 = 0x20000000;

function setting(){
    if(contents.profile == "hide"){
        p_index = 1;
    }
    else if(contents.profile == "reveal"){
        p_index = 2;
    }
    
    if(contents.sub == "acc"){
        s_index = 1;
    }
    else if(contents.sub == "combo"){
        s_index = 2;
    }
    
    if(contents.background == "black"){
        bg_value = 'rgba( 0, 0, 0, 0.35 )';
    }
    else if(contents.background == "white"){
        bg_value = 'rgba( 255, 255, 255, 0.1 )';
    }
    if(contents.opacity == "100%"){
        leaderboard_section.style.background = "black";
    }
    else if(contents.opacity == "0%"){
        leaderboard_section.style.background = "";
    }
}

function isEmptyObject(param) {
  return Object.keys(param).length === 0 && param.constructor === Object;
}

function create_ranking_panel(){
    if (isEmptyObject(beatmap_score) !== true) {
        /*for(var i = 0; i < 49; i++){
            beatmap_score[i] = beatmap_score[i+1];
        }
        delete beatmap_score[49];
        console.log(beatmap_score);*/
        
        for (var i = 0; i < Object.keys(beatmap_score).length; i++) {
            if(p_index == 2){
                rank_container.innerHTML += '<div id="rank_' + i + '" class="rank_box"> \n';
            }
            else if(p_index == 1){
                rank_container.innerHTML += '<div id="rank_' + i + '" class="rank_box_hide"> \n';
            }
            let rank_temp = document.getElementById(`rank_${i}`);
            rank_temp.style.backgroundColor = bg_value;
            rank_temp.style.top = 15 + (135 * i) + 'px';
            
            if(p_index == 2){
                rank_temp.innerHTML = '<div id="rank_pic_' + i + '" class="rank_pic"></div> \n <div id="rank_pic_opa"></div> \n <div id="rank_id_' + i + '" class="rank_id"></div> \n <div id="rank_score_' + i + '" class="rank_score">0</div> \n <div id="rank_percent_' + i + '" class="rank_percent">00.00%</div> \n <div id="rank_number_' + i + '" class="rank">#' + (i + 1) + '</div>';
                let rank_pic = document.getElementById(`rank_pic_${i}`);
                rank_pic.style.backgroundImage = `url('https://a.ppy.sh/${beatmap_score[i].user_id}')`;
            }
            else if(p_index == 1){
                rank_temp.innerHTML = '<div id="rank_id_' + i + '" class="rank_id_hide"></div> \n <div id="rank_score_' + i + '" class="rank_score_hide">0</div> \n <div id="rank_percent_' + i + '" class="rank_percent">00.00%</div> \n <div id="rank_number_' + i + '" class="rank_hide">#' + (i + 1) + '</div>';                
            }
            
            let rank_id = document.getElementById(`rank_id_${i}`);
            let rank_score = document.getElementById(`rank_score_${i}`);
            let rank_percent = document.getElementById(`rank_percent_${i}`);
            
            rank_id.innerHTML = beatmap_score[i].username;
            rank_score.innerHTML = beatmap_score[i].score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

            rank_id.style.color = '#949D9D';
            rank_score.style.color = '#949D9D';
            rank_percent.style.color = '#5A8D8F';
            
            if (s_index == 1) {
                let acc_1 = (50 * parseInt(beatmap_score[i].count50) + 100 * parseInt(beatmap_score[i].count100) + 200 * parseInt(beatmap_score[i].countkatu) + 300 * (parseInt(beatmap_score[i].count300) + parseInt(beatmap_score[i].countgeki)));
                let acc_2 = 300 * (parseInt(beatmap_score[i].countmiss) + parseInt(beatmap_score[i].count50) + parseInt(beatmap_score[i].count100) + parseInt(beatmap_score[i].countkatu) + parseInt(beatmap_score[i].count300) + parseInt(beatmap_score[i].countgeki));
                rank_percent.innerHTML = (acc_1 / acc_2 * 100).toFixed(2) + '%';
            }
            else if(s_index == 2){
                rank_percent.innerHTML = beatmap_score[i].maxcombo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'x';
            }

        }
        if(p_index == 2){
            rank_container.innerHTML += '<div id="rank_box_now" class="rank_box"> \n';
        }
        else if(p_index == 1){
            rank_container.innerHTML += '<div id="rank_box_now" class="rank_box_hide"> \n';
        }
        let rank_temp = document.getElementById(`rank_box_now`);
        rank_temp.style.backgroundColor = bg_value;
        rank_temp.style.top = (Object.keys(beatmap_score).length * 135 + 15) +'px';
        
        if(p_index == 2){
            rank_temp.innerHTML = '<div id="rank_pic_now" class="rank_pic"></div> \n <div id="rank_id_now" class="rank_id"></div> \n <div id="rank_score_now" class="rank_score">0</div> \n <div id="rank_percent_now" class="rank_percent">00.00%</div> \n <div id="rank_now" class="rank">#?</div>';
            let rank_pic = document.getElementById("rank_pic_now");
            rank_pic.style.backgroundImage = `url('https://a.ppy.sh/${uid}')`;
        }
        else if(p_index == 1){
            rank_temp.innerHTML = '<div id="rank_id_now" class="rank_id_hide"></div> \n <div id="rank_score_now" class="rank_score_hide">0</div> \n <div id="rank_percent_now" class="rank_percent">00.00%</div> \n <div id="rank_now" class="rank_hide">#?</div>';            
        }

        let rank_id = document.getElementById("rank_id_now");
        //rank_pic.style.backgroundImage = "url('parts/profile.png')";
        rank_id.innerHTML = t_player;
        
        rank_score_now = document.getElementById("rank_score_now");
        rank_percent_now = document.getElementById("rank_percent_now");
        rank_now = document.getElementById("rank_now");
        rank_box_now = document.getElementById("rank_box_now");
        
        isCompleteRank = true;
        position = Object.keys(beatmap_score).length;
        
        
        if (Object.keys(beatmap_score).length <= 4) {
            rank_container.style.top = '0px';
        }
        else if (position == 0 || position == 1 || position == 2) {
            rank_container.style.top = '0px';
        }
        else if (position == Object.keys(beatmap_score).length || position == (Object.keys(beatmap_score).length - 1) || position == (Object.keys(beatmap_score).length) - 2) {
            rank_container.style.top = (0 - (Object.keys(beatmap_score).length - 4) * 135) + 'px';
        } else {
            rank_container.style.top = (0 - (position - 2) * 135) + 'px';
        }
        leaderboard_section.style.opacity = 1;

    }
}    

setTimeout(function () {
    setting();
    socket.onmessage = event => {
        try {
            let data = JSON.parse(event.data);
            let menu = data.menu;
            let play = data.gameplay;
            api = contents.api;
            uid = contents.uid;

            if (t_player !== play.name) {
                if (play.name == '') {
                    t_player = 'unknown';
                } else {
                    t_player = play.name;
                }
            }
            if (slots !== play.leaderboard.slots && state == 2) {
                slots = play.leaderboard.slots;
            }
            if (t_total !== play.hits.geki + play.hits[300] + play.hits.katu + play.hits[100] + play.hits[50] + play.hits[0]) {
                t_total = play.hits.geki + play.hits[300] + play.hits.katu + play.hits[100] + play.hits[50] + play.hits[0];
            }

            if (state !== menu.state) {
                state = menu.state;

                if (state == 2) {
                    console.log(menu.bm.rankedStatus);
                    if ((menu.mods.num & v2) !== v2) {
                        axios.all([axios.get("/get_beatmaps", {
                            baseURL: "https://osu.ppy.sh/api",
                            params: {
                                k: `${api}`,
                                b: `${menu.bm.id}`,
                            },
                        }), axios.get("/get_scores", {
                            baseURL: "https://osu.ppy.sh/api",
                            params: {
                                k: `${api}`,
                                b: `${menu.bm.id}`,
                                m: `3`,
                            },
                        })]).then(axios.spread((firstResp, secondResp) => {
                            Promise.resolve(firstResp.data[0]).then((data) => Object.assign(beatmap_data, data));
                            Promise.resolve(secondResp.data).then((data) => Object.assign(beatmap_score, data));
                        })).catch((error) => {
                            console.error(error);
                        });
                        if(menu.bm.rankedStatus == 0){
                            setTimeout(function(){
                                if(isEmptyObject(beatmap_data) !== true){
                                    var s = beatmap_data.approved;
                                    if(s == 4 || s == 3 || s == 2 || s == 1){
                                        create_ranking_panel();
                                    }
                                    else if (s == 0 || s == -1 || s == -2) {
                                        if (slots !== null) {
                                            for (var i = 0; i < slots.length - 1; i++) {
                                                if (p_index == 2) {
                                                    rank_container.innerHTML += '<div id="rank_' + i + '" class="rank_box"> \n';
                                                } else if (p_index == 1) {
                                                    rank_container.innerHTML += '<div id="rank_' + i + '" class="rank_box_hide"> \n';
                                                }
                                                let rank_temp = document.getElementById(`rank_${i}`);
                                                rank_temp.style.top = 15 + (135 * i) + 'px';

                                                if (p_index == 2) {
                                                    rank_temp.innerHTML = '<div id="rank_pic_' + i + '" class="rank_pic"></div> \n <div id="rank_pic_opa"></div> \n <div id="rank_id_' + i + '" class="rank_id"></div> \n <div id="rank_score_' + i + '" class="rank_score">0</div> \n <div id="rank_percent_' + i + '" class="rank_percent">00.00%</div> \n <div id="rank_number_' + i + '" class="rank">#' + (i + 1) + '</div>';
                                                    let rank_pic = document.getElementById(`rank_pic_${i}`);
                                                    rank_pic.style.backgroundImage = `url('https://a.ppy.sh/')`;
                                                } else if (p_index == 1) {
                                                    rank_temp.innerHTML = '<div id="rank_id_' + i + '" class="rank_id_hide"></div> \n <div id="rank_score_' + i + '" class="rank_score_hide">0</div> \n <div id="rank_percent_' + i + '" class="rank_percent">00.00%</div> \n <div id="rank_number_' + i + '" class="rank_hide">#' + (i + 1) + '</div>';
                                                }

                                                let rank_id = document.getElementById(`rank_id_${i}`);
                                                let rank_score = document.getElementById(`rank_score_${i}`);
                                                let rank_percent = document.getElementById(`rank_percent_${i}`);
                                                rank_id.innerHTML = slots[i].name;
                                                rank_score.innerHTML = slots[i].score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                                                rank_percent.innerHTML = slots[i].maxCombo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'x';

                                                rank_id.style.color = '#949D9D';
                                                rank_score.style.color = '#949D9D';
                                                rank_percent.style.color = '#5A8D8F';
                                            }
                                            if (p_index == 2) {
                                                rank_container.innerHTML += '<div id="rank_box_now" class="rank_box"> \n';
                                            } else if (p_index == 1) {
                                                rank_container.innerHTML += '<div id="rank_box_now" class="rank_box_hide"> \n';
                                            }
                                            let rank_temp = document.getElementById(`rank_box_now`);
                                            rank_temp.style.top = ((slots.length - 1) * 135 + 15) + 'px';

                                            if (p_index == 2) {
                                                rank_temp.innerHTML = '<div id="rank_pic_now" class="rank_pic"></div> \n <div id="rank_id_now" class="rank_id"></div> \n <div id="rank_score_now" class="rank_score">0</div> \n <div id="rank_percent_now" class="rank_percent">00.00%</div> \n <div id="rank_now" class="rank">#?</div>';
                                                let rank_pic = document.getElementById("rank_pic_now");
                                                rank_pic.style.backgroundImage = `url('https://a.ppy.sh/${uid}')`;
                                            } else if (p_index == 1) {
                                                rank_temp.innerHTML = '<div id="rank_id_now" class="rank_id_hide"></div> \n <div id="rank_score_now" class="rank_score_hide">0</div> \n <div id="rank_percent_now" class="rank_percent">00.00%</div> \n <div id="rank_now" class="rank_hide">#?</div>';
                                            }

                                            let rank_id = document.getElementById("rank_id_now");
                                            //rank_pic.style.backgroundImage = "url('parts/profile.png')";
                                            rank_id.innerHTML = t_player;

                                            rank_score_now = document.getElementById("rank_score_now");
                                            rank_percent_now = document.getElementById("rank_percent_now");
                                            rank_now = document.getElementById("rank_now");
                                            rank_box_now = document.getElementById("rank_box_now");

                                            isCompleteRank = true;
                                            position = slots.length - 1;

                                            if (slots.length - 1 <= 4) {
                                                rank_container.style.top = '0px';
                                            }
                                            //#1, #2, #3
                                            else if (position == 0 || position == 1 || position == 2) {
                                                rank_container.style.top = '0px';
                                            } //#51, #50, #49
                                            else if (position == slots.length - 1 || position == (slots.length - 2) || position == (slots.length - 3)) {
                                                rank_container.style.top = ((0 - (slots.length - 5)) * 135) + 'px';
                                            } else {
                                                rank_container.style.top = (0 - (position - 2) * 135) + 'px';
                                            }
                                            leaderboard_section.style.opacity = 1;
                                        }
                                    }
                                }
                            }, 1000);
                        }
                        else if (menu.bm.rankedStatus == 4 || menu.bm.rankedStatus == 6 || menu.bm.rankedStatus == 7) {
                            setTimeout(create_ranking_panel, 1000);
                        } else if (menu.bm.rankedStatus == 2) { //pending(no ranking)
                            setTimeout(function () {
                                if (slots !== null) {
                                    for (var i = 0; i < slots.length - 1; i++) {
                                        if (p_index == 2) {
                                            rank_container.innerHTML += '<div id="rank_' + i + '" class="rank_box"> \n';
                                        } else if (p_index == 1) {
                                            rank_container.innerHTML += '<div id="rank_' + i + '" class="rank_box_hide"> \n';
                                        }
                                        let rank_temp = document.getElementById(`rank_${i}`);
                                        rank_temp.style.top = 15 + (135 * i) + 'px';

                                        if (p_index == 2) {
                                            rank_temp.innerHTML = '<div id="rank_pic_' + i + '" class="rank_pic"></div> \n <div id="rank_pic_opa"></div> \n <div id="rank_id_' + i + '" class="rank_id"></div> \n <div id="rank_score_' + i + '" class="rank_score">0</div> \n <div id="rank_percent_' + i + '" class="rank_percent">00.00%</div> \n <div id="rank_number_' + i + '" class="rank">#' + (i + 1) + '</div>';
                                            let rank_pic = document.getElementById(`rank_pic_${i}`);
                                            rank_pic.style.backgroundImage = `url('https://a.ppy.sh/')`;
                                        } else if (p_index == 1) {
                                            rank_temp.innerHTML = '<div id="rank_id_' + i + '" class="rank_id_hide"></div> \n <div id="rank_score_' + i + '" class="rank_score_hide">0</div> \n <div id="rank_percent_' + i + '" class="rank_percent">00.00%</div> \n <div id="rank_number_' + i + '" class="rank_hide">#' + (i + 1) + '</div>';
                                        }

                                        let rank_id = document.getElementById(`rank_id_${i}`);
                                        let rank_score = document.getElementById(`rank_score_${i}`);
                                        let rank_percent = document.getElementById(`rank_percent_${i}`);
                                        rank_id.innerHTML = slots[i].name;
                                        rank_score.innerHTML = slots[i].score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                                        rank_percent.innerHTML = slots[i].maxCombo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'x';

                                        rank_id.style.color = '#949D9D';
                                        rank_score.style.color = '#949D9D';
                                        rank_percent.style.color = '#5A8D8F';
                                    }
                                    if (p_index == 2) {
                                        rank_container.innerHTML += '<div id="rank_box_now" class="rank_box"> \n';
                                    } else if (p_index == 1) {
                                        rank_container.innerHTML += '<div id="rank_box_now" class="rank_box_hide"> \n';
                                    }
                                    let rank_temp = document.getElementById(`rank_box_now`);
                                    rank_temp.style.top = ((slots.length - 1) * 135 + 15) + 'px';

                                    if (p_index == 2) {
                                        rank_temp.innerHTML = '<div id="rank_pic_now" class="rank_pic"></div> \n <div id="rank_id_now" class="rank_id"></div> \n <div id="rank_score_now" class="rank_score">0</div> \n <div id="rank_percent_now" class="rank_percent">00.00%</div> \n <div id="rank_now" class="rank">#?</div>';
                                        let rank_pic = document.getElementById("rank_pic_now");
                                        rank_pic.style.backgroundImage = `url('https://a.ppy.sh/${uid}')`;
                                    } else if (p_index == 1) {
                                        rank_temp.innerHTML = '<div id="rank_id_now" class="rank_id_hide"></div> \n <div id="rank_score_now" class="rank_score_hide">0</div> \n <div id="rank_percent_now" class="rank_percent">00.00%</div> \n <div id="rank_now" class="rank_hide">#?</div>';
                                    }

                                    let rank_id = document.getElementById("rank_id_now");
                                    //rank_pic.style.backgroundImage = "url('parts/profile.png')";
                                    rank_id.innerHTML = t_player;

                                    rank_score_now = document.getElementById("rank_score_now");
                                    rank_percent_now = document.getElementById("rank_percent_now");
                                    rank_now = document.getElementById("rank_now");
                                    rank_box_now = document.getElementById("rank_box_now");

                                    isCompleteRank = true;
                                    position = slots.length - 1;

                                    if (slots.length - 1 <= 4) {
                                        rank_container.style.top = '0px';
                                    }
                                    //#1, #2, #3
                                    else if (position == 0 || position == 1 || position == 2) {
                                        rank_container.style.top = '0px';
                                    } //#51, #50, #49
                                    else if (position == slots.length - 1 || position == (slots.length - 2) || position == (slots.length - 3)) {
                                        rank_container.style.top = ((0 - (slots.length - 5)) * 135) + 'px';
                                    } else {
                                        rank_container.style.top = (0 - (position - 2) * 135) + 'px';
                                    }
                                    leaderboard_section.style.opacity = 1;
                                }
                            }, 1000);
                        }
                    }
                } else {
                    beatmap_data = {};
                    beatmap_score = {};

                    isCompleteRank = false;
                    leaderboard_section.style.opacity = 0;

                    ranked_check = 0;
                    
                    setTimeout(function () {
                        rank_container.innerHTML = '';
                        position = 0;
                        rank_container.style.top = '-6900px';
                        temp = true;
                        slots = {};
                    }, 500);
                }
            }
            
            if (state !== 2) {
                
                beatmap_data = {};
                beatmap_score = {};
                
                leaderboard_section.style.opacity = 0;
            }

            if (t_score !== play.score) {
                t_score = play.score;
                
                if( (menu.mods.num & v2) !== v2){
                if (isCompleteRank == true) {
                    
                    if(menu.bm.rankedStatus == 0){
                        if(isEmptyObject(beatmap_data) !== true){
                            var s = beatmap_data.approved;
                            if(s == 4 || s == 3 || s == 2 || s == 1){
                                ranked_check = 1;
                            }
                            else if (s == 0 || s == -1 || s == -2) {
                                ranked_check = 2;
                            }
                        }
                    }
                    let expected_temp = 0;
                    if (t_total == 0) {
                        expected_temp = 0;
                    } else if (play.hits[300] + play.hits.katu + play.hits[100] + play.hits[50] + play.hits[0] == 0) {
                        expected_temp = 1000000;
                    } else {
                        expected_temp = (t_score / (1000000 / (parseInt(beatmap_data.count_normal) + parseInt(beatmap_data.count_slider)) * (t_total)) * 1000000).toFixed(0);
                    }
                    rank_score_now.innerHTML = expected_temp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

                    if (t_total !== 0) {
                        if (menu.bm.rankedStatus == 4 || menu.bm.rankedStatus == 6 || menu.bm.rankedStatus == 7 || ranked_check == 1) {
                            if (s_index == 1) {
                                let acc_1 = 50 * play.hits[50] + 100 * play.hits[100] + 200 * play.hits.katu + 300 * (play.hits[300] + play.hits.geki);
                                let acc_2 = 300 * (play.hits[300] + play.hits.katu + play.hits[100] + play.hits[50] + play.hits[0] + play.hits.geki);
                                rank_percent_now.innerHTML = (acc_1 / acc_2 * 100).toFixed(2) + '%';
                            }
                            else if(s_index == 2){
                                rank_percent_now.innerHTML = play.combo.max.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'x';
                            }
                        } else if (menu.bm.rankedStatus == 2 || ranked_check == 2) {
                            rank_percent_now.innerHTML = play.combo.max.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'x';
                        }
                    }

                    temp = true;
                    if (menu.bm.rankedStatus == 4 || menu.bm.rankedStatus == 6 || menu.bm.rankedStatus == 7 || ranked_check == 1) {
                        while (temp == true) {
                            if (position == 0) {
                                if (expected_temp <= beatmap_score[position].score) {
                                    let rank_down_box = document.getElementById(`rank_${position}`);
                                    let rank_down_box_number = document.getElementById(`rank_number_${position}`);
                                    rank_down_box.style.top = (position * 135 + 15) + 'px';
                                    rank_box_now.style.top = ((position + 1) * 135 + 15) + 'px';
                                    position = position + 1;
                                    rank_now.innerHTML = '#' + (position + 1);
                                    rank_down_box_number.innerHTML = '#' + (position);
                                } else {
                                    temp = false;
                                    break;
                                }
                            } else {
                                if (expected_temp > parseInt(beatmap_score[position - 1].score)) {
                                    let rank_up_box = document.getElementById(`rank_${position-1}`);
                                    let rank_up_box_number = document.getElementById(`rank_number_${position-1}`);
                                    rank_up_box.style.top = (position * 135 + 15) + 'px';
                                    rank_box_now.style.top = ((position - 1) * 135 + 15) + 'px';
                                    position = position - 1;
                                    rank_up_box_number.innerHTML = '#' + (position + 2);
                                    rank_now.innerHTML = '#' + (position + 1);
                                    if (Object.keys(beatmap_score).length <= 4) {
                                        rank_container.style.top = '0px';
                                    } else if (position == 0 || position == 1 || position == 2) {
                                        rank_container.style.top = '0px';
                                    } else if (position == Object.keys(beatmap_score).length || position == (Object.keys(beatmap_score).length - 1) || position == (Object.keys(beatmap_score).length) - 2) {
                                        rank_container.style.top = (0 - (Object.keys(beatmap_score).length - 4) * 135) + 'px';
                                    } else {
                                        rank_container.style.top = (0 - (position - 2) * 135) + 'px';
                                    }
                                } else {
                                    if (position == Object.keys(beatmap_score).length) {
                                        if (Object.keys(beatmap_score).length >= 50) {
                                            rank_now.innerHTML = '#??';
                                        } else {
                                            rank_now.innerHTML = '#' + Object.keys(beatmap_score).length;
                                        }
                                        temp = false;
                                        break;
                                    } else {
                                        if (expected_temp <= beatmap_score[position].score) {
                                            let rank_down_box = document.getElementById(`rank_${position}`);
                                            let rank_down_box_number = document.getElementById(`rank_number_${position}`);
                                            rank_down_box.style.top = ((position) * 135 + 15) + 'px';
                                            rank_box_now.style.top = ((position + 1) * 135 + 15) + 'px';
                                            position = position + 1;
                                            rank_now.innerHTML = '#' + (position + 1);
                                            rank_down_box_number.innerHTML = '#' + (position);


                                            if (Object.keys(beatmap_score).length <= 4) {
                                                rank_container.style.top = '0px';
                                            } else if (position == 0 || position == 1 || position == 2) {
                                                rank_container.style.top = '0px';
                                            } else if (position == Object.keys(beatmap_score).length || position == (Object.keys(beatmap_score).length - 1) || position == (Object.keys(beatmap_score).length) - 2) {
                                                rank_container.style.top = (0 - (Object.keys(beatmap_score).length - 4) * 135) + 'px';
                                            } else {
                                                rank_container.style.top = (0 - (position - 2) * 135) + 'px';
                                            }
                                        } else {
                                            temp = false;
                                            break;
                                        }

                                    }
                                }
                            }
                        }
                    } else if (menu.bm.rankedStatus == 2 || ranked_check == 2) {
                        while (temp == true) {
                            if (position == 0) {
                                // 포지션이 최상단 일 떄
                                if (expected_temp <= slots[position].score) {
                                    let rank_down_box = document.getElementById(`rank_${position}`);
                                    let rank_down_box_number = document.getElementById(`rank_number_${position}`);
                                    rank_down_box.style.top = (position * 135 + 15) + 'px';
                                    rank_box_now.style.top = ((position + 1) * 135 + 15) + 'px';
                                    position = position + 1;
                                    rank_now.innerHTML = '#' + (position + 1);
                                    rank_down_box_number.innerHTML = '#' + (position);
                                } else {
                                    temp = false;
                                    break;
                                }
                            } else {
                                if (expected_temp > slots[position - 1].score) {
                                    let rank_up_box = document.getElementById(`rank_${position-1}`);
                                    let rank_up_box_number = document.getElementById(`rank_number_${position-1}`);
                                    rank_up_box.style.top = (position * 135 + 15) + 'px';
                                    rank_box_now.style.top = ((position - 1) * 135 + 15) + 'px';
                                    position = position - 1;
                                    rank_now.innerHTML = '#' + (position + 1);
                                    rank_up_box_number.innerHTML = '#' + (position + 2);

                                    if (slots.length - 1 <= 4) {
                                        rank_container.style.top = '0px';
                                    } else if (position == 0 || position == 1 || position == 2) {
                                        rank_container.style.top = '0px';
                                    } else if (position == slots.length - 1 || position == (slots.length - 2) || position == (slots.length - 3)) {
                                        rank_container.style.top = ((0 - (slots.length - 5)) * 135) + 'px';
                                    } else {
                                        rank_container.style.top = (0 - (position - 2) * 135) + 'px';
                                    }
                                } else {
                                    if (position == slots.length - 1) {
                                        if (slots.length - 1 >= 50) {
                                            rank_now.innerHTML = '#Out';
                                        } else {
                                            rank_now.innerHTML = '#' + (slots.length);
                                        }
                                        temp = false;
                                        break;
                                    } else {
                                        if (expected_temp <= slots[position].score) {
                                            let rank_down_box = document.getElementById(`rank_${position}`);
                                            let rank_down_box_number = document.getElementById(`rank_number_${position}`);
                                            rank_down_box.style.top = ((position) * 135 + 15) + 'px';
                                            rank_box_now.style.top = ((position + 1) * 135 + 15) + 'px';
                                            position = position + 1;
                                            rank_now.innerHTML = '#' + (position + 1);
                                            rank_down_box_number.innerHTML = '#' + (position);

                                            if (slots.length - 1 <= 4) {
                                                rank_container.style.top = '0px';
                                            } else if (position == 0 || position == 1 || position == 2) {
                                                rank_container.style.top = '0px';
                                            } else if (position == slots.length - 1 || position == (slots.length - 2) || position == (slots.length - 3)) {
                                                rank_container.style.top = ((0 - (slots.length - 5)) * 135) + 'px';
                                            } else {
                                                rank_container.style.top = (0 - (position - 2) * 135) + 'px';
                                            }
                                        } else {
                                            temp = false;
                                            break;
                                        }

                                    }
                                }
                            }
                        }
                    }
                }
            }
            }
        } catch (err) {
            console.log(err);
        };
    };
}, 100);