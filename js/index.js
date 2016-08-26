(function () {
  'use strict';

  <!--倒计始开始-->
  var daoJiShi = function () {
    var _endTime = 30 * 1000,//倒计时时长
      _curTime,//当前时间
      _gameTimer;//倒计时定时器

    init();

    function init() {
      _curTime = (new Date()).getTime();
      _gameTimer = setInterval(function () {
        startDaoJiShi('time');
      }, 10);
    }

    /**
     * 创建时间
     * @param n
     * @returns {string}
     */
    function createTime(n) {
      var text = (100000 + n + '').substr(-5, 4);
      text = text.substr(0, 2) + "'" + text.substr(2) + "''";
      return text;
    }

    /**
     * 倒计时
     */
    function startDaoJiShi(id) {
      var time = document.getElementById(id),
        nowTime = new Date().getTime(),
        cutTime;
      cutTime = _endTime - (nowTime - _curTime);

      if (cutTime <= 0) {
        time.innerHTML = "00\'00\"";
        clearInterval(_gameTimer);//清除倒计时
      } else {
        time.innerHTML = createTime(cutTime);
      }
    }

  }

  daoJiShi();

  <!--倒计始结束-->


  <!--省市区联动－开始-->
  var provinceList = [
    {
      name: '重庆', cityList: [
      {name: '市辖区', areaList: ['万州区', '涪陵区', '渝中区']},
      {name: '县', areaList: ['綦江县', '潼南县', '铜梁县']},
      {name: '市', areaList: ['江津市', '合川市', '永川市', '南川市']}
    ]
    },
    {
      name: '四川', cityList: [
      {name: '成都市', areaList: ['市辖区', '锦江区']},
      {name: '自贡市', areaList: ['市辖区', '自流井区']},
      {name: '攀枝花市', areaList: ['市辖区', '东区']},
    ]
    }
  ];
  var ssqld = function (_province, _city, _area, defaultProvince, defaultCity, defaultArea) {
    var province = document.getElementById(_province);
    var city = document.getElementById(_city);
    var area = document.getElementById(_area);

    function cmbSelect(cmb, str) {
      for (var i = 0; i < cmb.options.length; i++) {
        if (cmb.options[i].value == str) {
          cmb.selectedIndex = i;
          return;
        }
      }
    }

    function cmbAddOption(cmb, str, obj) {
      var option = document.createElement("OPTION");
      cmb.options.add(option);
      option.innerHTML = str;
      option.value = str;
      option.obj = obj;
    }

    function changeCity() {
      area.options.length = 0;
      if (city.selectedIndex == -1)return;
      var item = city.options[city.selectedIndex].obj;
      for (var i = 0; i < item.areaList.length; i++) {
        cmbAddOption(area, item.areaList[i], null);
      }
      cmbSelect(area, defaultArea);
    }

    function changeProvince() {
      city.options.length = 0;
      city.onchange = null;
      if (province.selectedIndex == -1)return;
      var item = province.options[province.selectedIndex].obj;
      for (var i = 0; i < item.cityList.length; i++) {
        cmbAddOption(city, item.cityList[i].name, item.cityList[i]);
      }
      cmbSelect(city, defaultCity);
      changeCity();
      city.onchange = changeCity;
    }

    for (var i = 0; i < provinceList.length; i++) {
      cmbAddOption(province, provinceList[i].name, provinceList[i]);
    }
    cmbSelect(province, defaultProvince);
    changeProvince();
    province.onchange = changeProvince;


  }
  ssqld('province', 'city', 'area');
  <!--省市区联动－结束-->


  /*依次呈现动画－开始*/
  var yichiFun = function (id) {

    var cssHeight = 0,
      yici = document.getElementById(id)

    yici.style.height = cssHeight + "px";

    var timer = setInterval(function () {
      cssHeight += 5;
      yici.style.height = cssHeight + "px";

      if (cssHeight >= 150) {
        clearInterval(timer);
      }
    }, 25);
  };

  yichiFun('yici')

  /*依次呈现动画－结束*/


}());