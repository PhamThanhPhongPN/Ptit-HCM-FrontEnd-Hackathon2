const eventList = [
    {
        name: "Tổ chức sinh nhật cho Mochi",
        date: "2025-04-24",
        place: "Queen Bee Palace",
        organizer: "Bố Cường",
    },
    {
        name: "Chơi game",
        date: "2025-02-24",
        place: "Nhà",
        organizer: "Phong",
    },
    {
        name: "Ăn Mochi",
        date: "2022-02-24",
        place: "Nhà",
        organizer: "Phong",
    },
]

const btnEL = document.getElementById("btn_add_save");
let editIndex = null;

function renderEvent(events = eventList) {
    const bodyEl = document.querySelector("#tbody");
    let dataHTML = '';
    for (let i = 0; i < eventList.length; i++) {
        dataHTML += `
        <tr>
            <th>${events[i].name}</th>
            <th>${events[i].date}</th>
            <th>${events[i].place}</th>
            <th>${events[i].organizer}</th>
            <th>
                <button class="btn btn-primary" onclick="loadEditEvent(${i})">Sửa</button>
                <button class="btn btn-danger" onclick="deleteEvent(${i})">Xóa</button>
            </th>
        </tr>
        `
    }
    bodyEl.innerHTML = dataHTML;
}

function addEvent(event) {
    event.preventDefault();

    let newEvent = {
        name: document.getElementById("name").value,
        place: document.getElementById("place").value,
        date: document.getElementById("date").value,
        organizer: document.getElementById("organizer").value,
    }

    if (editIndex == null) {
        eventList.push(newEvent);
    } else {
        eventList[editIndex] = newEvent;
        editIndex = null;
        btnEL.innerText = "Thêm sự kiện";
    }

    renderEvent();
    event.target.reset();
}

function deleteEvent(index) {
    let confirmation = confirm("Confirm xóa sự kiện?");

    if (confirmation) {
        eventList.splice(index, 1);
        renderEvent();
    } else {
        return;
    }
}

function loadEditEvent(index) {
    let newEvent = eventList[index];
    let formEl = document.querySelector("#form");

    formEl.name.value = newEvent.name;
    formEl.date.value = newEvent.date;
    formEl.place.value = newEvent.place;
    formEl.organizer.value = newEvent.organizer;

    editIndex = index;
    btnEL.innerText = "Sửa sự kiện";
}

function searchEvent() {
    const search = document.getElementById("search").value;
    let searchResult = [];
    for (let i = 0; i < eventList.length; i++) {
        if (eventList[i].name.toLowerCase().includes(search.toLowerCase())) {
            searchResult.push(eventList[i]);
        }
    }
    renderEvent(searchResult);
}

function check() {
    if (document.getElementById("name").value !== ''){
        document.getElementById("check1").style.display = "none";
    } else {
        document.getElementById("check1").style.display = "block";
    }
    if (document.getElementById("place").value !== ''){
        document.getElementById("check2").style.display = "none";
    } else {
        document.getElementById("check2").style.display = "block";
    }
    if (document.getElementById("organizer").value !== ''){
        document.getElementById("check4").style.display = "none";
    } else {
        document.getElementById("check4").style.display = "block";
    }
    if (!Date.parse(document.getElementById("date").value)){
        document.getElementById("check3").style.display = "block";
    } else {
        document.getElementById("check3").style.display = "none";
    }
}

renderEvent();