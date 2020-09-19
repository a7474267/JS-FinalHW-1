let apiPath = "https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json";
let list = document.querySelector('.list');
let data = [];//存放ajax回傳的資料
let realZone = [];
let zoneData = [];//存放各行政區的資料
let zoneName = document.querySelector('.zoneName');
let detail = document.querySelector('.detail');
let pagination = document.querySelector('.pagination');
//let btn = document.querySelectorAll('.btn');
let btnArea = document.querySelector('.btnArea');


//熱門區域的監聽方式2
btnArea.addEventListener('click', hotZone);
function hotZone(e) {
  if (e.target.nodeName === "BUTTON") {
    updateList(e);
  }
};
//熱門區域的監聽方式1
// btn.forEach(function (item) {
//     item.addEventListener('click', updateList, false);
// });
pagination.addEventListener('click', switchPage);
list.addEventListener('change', updateList, false);
axios.get(apiPath)
  .then(function (res) {
    data = res.data.result.records;
    let zone = [];
    data.forEach(function (item) {
      zone.push(item.Zone);
    });
    //利用filter，將重複的資料清除掉
    realZone = zone.filter(function (element, index, arr) {
      return arr.indexOf(element) === index;
    });
    renderSelect(realZone);
    console.log(data);
    openPage();
  });


//利用axios直接把選項帶入選單
function renderSelect(data) {
  data.forEach(function (item) {
    let choose = document.createElement('option');
    choose.setAttribute('value', item);
    choose.style.fontFamily = "PingFangTC-Regular";
    choose.textContent = item;
    list.appendChild(choose);
  });
}
//渲染畫面
function updateList(e) {
  let select = e.target.value;
  let str = '';
  zoneName.textContent = select;
  //把所選擇的區域的資料彙整丟到陣列裡面去
  if (zoneData != []) {
    zoneData = [];
    data.forEach(function (item) {
      if (select === item.Zone) {
        zoneData.push(item);
      };
    });
  } else {
    data.forEach(function (item) {
      if (select === item.Zone) {
        zoneData.push(item);
      };
    });
  }
  console.log(zoneData);
  pageFunction(zoneData, 1);
};

function pageFunction(zoneData, nowPage) {
  const dataCount = zoneData.length;
  const perPage = 5;
  const pageTotal = Math.ceil(dataCount / perPage);
  let currentPage = nowPage;
  const minData = (currentPage * perPage) - perPage + 1;
  const maxData = currentPage * perPage;
  let pageData = [];//用來儲存當前點擊頁面的資料
  zoneData.forEach(function (item, index) {
    const num = index + 1;
    if (num >= minData && num <= maxData) {
      pageData.push(item);
    }
  });
  const page = {
    pageTotal: pageTotal,
    currentPage: currentPage,
    hasPage: currentPage > 1,
    hasNext: currentPage < pageTotal,
  };
  render(pageData);
  pageBtn(page);
};

function pageBtn(page) {
  let str = '';
  const total = page.pageTotal;
  if (page.hasPage) {
    str += `<li class="page-item"><a class="page-link" href="#" data-page="${Number(page.currentPage) - 1}">Previous</a></li>`;
  } else {
    str += '<li class="page-item" disabled><span class="page-link">Previous</span></li>';
  };
  for (let i = 1; i <= total; i++) {
    if (Number(page.currentPage) === i) {
      str += `<li class="page-item" active><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
    } else {
      str += `<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
    };
  };
  if (page.hasNext) {
    str += `<li class="page-item"><a class="page-link" href="#" data-page="${Number(page.currentPage) + 1}">Next</a></li>`;
  } else {
    str += `<li class="page-item disabled"><span class="page-link">Next</span></li>`;
  };
  pagination.innerHTML = str;
};

function switchPage(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'A') { return; } else {
    const page = e.target.dataset.page;
    pageFunction(zoneData, page);
  }
};

function render(pageData) {
  let str = '';
  pageData.forEach(function (item) {
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
            </div>`;
  })
  detail.innerHTML = str;
};
function openPage() {
  let select = '三民區';
  let str = '';
  zoneName.textContent = select;
  data.forEach(function (item) {
    if (select === item.Zone) {
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