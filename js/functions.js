'use strict';

let question_word = "the how when where who whom i he she it them am is are can do does doesn't no not work should will make download down load upload up shut down shutdown reboot what";

var _dataArray = {
    "sections": [{
        "question": "dhcp Dynamic Host Configuration Protocol ip address local",
        "title": "Dynamic Host Configuration Protocol",
        "vid": "https://www.youtube.com/embed/e6-TaH5bkjo",
        "id": "q0",
    },
    {
        "question": "dns Domain Name System ip server",
        "title": "Domain Name System",
        "vid": "https://www.youtube.com/embed/uOfonONtIuk",
        "id": "q1",
    },
    {
        "question": "linux unix inode structure block blocks super",
        "title": "Inode structure",
        "vid": "https://www.youtube.com/embed/qXVbNlMG28I",
        "id": "q2",
    },
    {
        "question": "asymmetric key keys encryption public private rsa",
        "title": "Asymmetric encryption",
        "vid": "https://www.youtube.com/embed/GSIDS_lvRv4",
        "id": "q3",
    },
    {
        "question": "Diffie Hellman exchange keys secret man in the middle",
        "title": "Diffie Hellman exchange",
        "vid": "https://www.youtube.com/embed/Yjrfm_oRO0w",
        "id": "q4",
    },
    {
        "question": "Disk Defragmentation Defrag Hard Drive Speed Up PC computer",
        "title": "Disk efragmentation",
        "vid": "https://www.youtube.com/embed/AtRIOUZuI2c",
        "id": "q5",
    },
    {
        "question": "Windows Registry reg",
        "title": "Windows Registry",
        "vid": "https://www.youtube.com/embed/E6ROLfd8RFo",
        "id": "q6",
    },
    {
        "question": "raid 0 1 10 hard disk drive hdd ssd nvme",
        "title": "Raid 0, 1 & 10",
        "vid": "https://www.youtube.com/embed/eE7Bfw9lFfs",
        "id": "q7",
    },
    {
        "question": "raid 5 6 hard disk drive hdd ssd nvme",
        "title": "Raid 5 & 6",
        "vid": "https://www.youtube.com/embed/1P8ZecG9iOI",
        "id": "q8",
    },
    {
        "question": "dark deep web surf browse browser",
        "title": "Deep & dark web",
        "vid": "https://www.youtube.com/embed/nKrODPtVinw",
        "id": "q9",
    }]
};

let result_title = null;
let result_video = null;
let min_words_input = 1;
let user_input_list = "";
let db_result_li_element = null;
let max_result_shown_on_screen = 3;
let list = document.getElementById("list");

function update_live_text() {
    show_input_on_screen_live();
    turn_input_to_list();
    clean_ul_result_list();
    if (user_input_list.length >= min_words_input) {
        for (let i = 0, amount_of_result_shown = 0, input_index = 0; condition_4_checking_input(i, amount_of_result_shown); i++, input_index = 0) {
            for (let j = 0; j < user_input_list.length; j++)
                input_index += check_word_from_input_in_db(i, j);
            if (input_index == user_input_list.length) {
                amount_of_result_shown++;
                add_to_result(i);
            }
        }
    }  
} // O(N**2)

function show_input_on_screen_live() {
    user_input_list = document.getElementById("my-input").value;
    if (user_input_list == "")
        document.getElementById("show_input").innerHTML = "Search";
    else
        document.getElementById("show_input").innerHTML = user_input_list;
} // O(1)

function turn_input_to_list() {
    if (user_input_list != "") {
        user_input_list = user_input_list.trim().toLowerCase().replace(/\?/g,'').split(" ");
        for (let i = 0; i < user_input_list.length; i++) {
            if (question_word.toLowerCase().includes(user_input_list[i])) {
                user_input_list.splice(i, 1);
                i--;
            }
        }
    }
} // O(N)

function clean_ul_result_list() {
    while (list.getElementsByTagName("li").length != 0)
        list.removeChild(list.getElementsByTagName("li")[0]);
} // O(N)

function condition_4_checking_input(index, amount_of_result_shown) {
    return index < _dataArray.sections.length && amount_of_result_shown < max_result_shown_on_screen;
} // O(1)

function check_word_from_input_in_db(db_index, word_from_input_index) {
    if (_dataArray.sections[db_index].question.toLowerCase().includes(user_input_list[word_from_input_index]))
        return 1;
    return 0;
} // O(1)

function add_to_result(index) {
    create_title_for_result(index);
    create_video_for_result(index);
    db_result_li_element = document.createElement("li");
    db_result_li_element.setAttribute("id", _dataArray.sections[index].id);
    db_result_li_element.appendChild(result_title);
    db_result_li_element.appendChild(result_video);
    if (list.getElementsByTagName("li").length == 0)
        list.appendChild(db_result_li_element);
    else
        sort_short_to_long();
} // O(1)

function create_title_for_result(index) {
    result_title = document.createElement("H2");
    result_title.appendChild(document.createTextNode(_dataArray.sections[index].title));
} // O(1)

function create_video_for_result(index) {
    result_video = document.createElement("iframe");
    result_video.setAttribute("src", _dataArray.sections[index].vid);
    result_video.setAttribute("allow", "accelerometer; encrypted-media; gyroscope; picture-in-picture");
} // O(1)

function sort_short_to_long() {
    for (let sort = 0; sort < list.getElementsByTagName("li").length; sort++) {
        if (db_result_li_element.innerHTML.trim().split(" ").length < list.getElementsByTagName("li")[sort].innerHTML.trim().split(" ").length) {
            list.insertBefore(db_result_li_element, list.getElementsByTagName("li")[sort]);
            return;
        }
    }
    list.appendChild(db_result_li_element);
} // O(N)
