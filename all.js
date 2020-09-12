let apiPath = "https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json";
let list = document.querySelector('.list');
let data = [];
let realZone = [];
let zoneName = document.querySelector('.zoneName');
let detail = document.querySelector('.detail');
let btn = document.querySelectorAll('.btn');

btn.forEach(function (item) {
    item.addEventListener('click', updateList, false);
})

list.addEventListener('change', updateList, false);
axios.get(apiPath)
    .then(function (res) {
        data = res.data.result.records;
        let zone = [];
        data.forEach(function (item) {
            zone.push(item.Zone);
        });
        realZone = zone.filter(function (element, index, arr) {
            return arr.indexOf(element) === index;
        });
        renderSelect(realZone);
        console.log(data);
    });

//利用axios直接把選項帶入選單
function renderSelect(data) {
    data.forEach(function (item, index) {
        let choose = document.createElement('option');
        choose.setAttribute('value', item);
        choose.style.fontFamily = "PingFangTC-Regular";
        choose.textContent = item;
        list.appendChild(choose);
    });
}

function updateList(e) {
    let select = e.target.value;
    let str = '';
    zoneName.textContent = select;
    data.forEach(function (item) {
        if (select == item.Zone) {
            str += `
            <div class="col-6 colDistance">
              <div class="boxShadow">
                <div class="img d-flex justify-content-between align-items-end mb-3" style="background-image:url(${item.Picture1});height:155px;">
                  <p style="color:#FFFFFF" class="text-white Name h4">${item.Name}</p>
                  <p style="color:#FFFFFF" class="text-white Zone">${item.Zone}</p>
                </div>
                <div class="content mb-3 ml-4">
                  <img src="../images/icons_clock.png" alt=""/><span class="ml-2">${item.Opentime}</span>
                </div>
                <div class="content mb-3 ml-4">
                  <img src="../images/icons_pin.png" alt=""/><span class="ml-2">${item.Add}</span>
                </div>
                <div class="content ml-4 pb-4 d-flex">
                  <img src="../images/icons_phone.png" alt=""/><span class="mr-auto ml-3">${item.Tel}</span>
                  <img class="mr-2" src="../images/icons_tag.png" alt=""/><span class="mr-4">${item.Ticketinfo}</span>
                </div>
              </div>    
            </div>
            `;
        }
        detail.innerHTML = str;
    })
};