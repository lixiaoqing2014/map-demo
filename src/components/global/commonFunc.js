import Moment from "moment"

const CommonFunc = {

  compare (propertyName)  {
	  return function (obj1, obj2) {
	    let value1 = parseInt(obj1[propertyName]);
	    let value2 = parseInt(obj2[propertyName]);
	    if (value1 < value2) {
	      return 1;
	    } else if (value1 > value2) {
	      return -1;
	    } else {
	      return 0;
	    }
	  };
  },

  sortGroup (data, name = null) {
    let temp = data.slice(0);

  	if (name !== null) {
      temp.sort(this.compare(name));
      return temp
    } else {
  		temp.sort();
      return temp
    }
  },

  getMaxValue (data, name = null) {
    let temp = data.slice(0);

  	if (name !== null) {
      temp.sort(this.compare(name));
      return parseInt(temp[0][name])
    } else {
  		temp.sort();
      return temp[0]
    }
  },

  getSumValue (data, name = null) {
	  let temp = data.slice(0);

    if (name !== null) {
      let sum = 0;
      temp.map((item) => {
        sum += parseInt(item[name]);
      });
      return sum;
    } else {
      return temp.reduce((value1, value2) => {
        return (value1 + value2);
      })
    }
  },

  getRandomColor () {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  },

  compareObjKey (obj, keys) {
    let n = keys.length,
      key = [];
    while(n--){
      key.push(obj[keys[n]]);
    }
    return key.join("|");
  },

  uniqeByKeys(array,keys){
    let arr = [];
    let hash = {};
    for (let i = 0, j = array.length; i < j; i++) {
      let k = this.compareObjKey(array[i], keys);
      if (!(k in hash)) {
        hash[k] = true;
        arr .push(array[i]);
      }
    }
    return arr ;
  },

  getRandomId () {
    return "_" + Math.random().toString(36).substr(2, 9)
  },

  dateTimeFormat (value) {
    let temp = value;
    if (parseInt(temp, 10) < 10) {
      temp = "0" + parseInt(temp, 10);
    }
    return temp;
  },

  format (date, format) {
  	if ( date === "" || date === null) return "";
    let o = {
      "M+" : date.getMonth()+1, //month
      "d+" : date.getDate(),    //day
      "H+" : date.getHours(),   //hour
      "m+" : date.getMinutes(), //minute
      "s+" : date.getSeconds(), //second
      "q+" : Math.floor((date.getMonth()+3)/3),  //quarter
      "S" : date.getMilliseconds() //millisecond
    };
    if(/(y+)/.test(format)) {
    	format = format.replace(RegExp.$1,
        (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
    	if(new RegExp("("+ k +")").test(format)) {
        format = format.replace(RegExp.$1,
          RegExp.$1.length === 1 ? o[k] :
            ("00"+ o[k]).substr((""+ o[k]).length));
      }
    }
    return format;
  },

  momentConverter (date, format, defaultValue) {
    return Moment(date).isValid() ? Moment(date).format(format) : defaultValue
  },

  momentCompare (date, name) {
    if (name) {
      let diff = Moment().diff(date, "minutes")
      return diff > 0 ? this.momentConverter(date, "HH:mm", "") : name
    } else {
      let diff = (Moment().startOf("days")).diff(Moment(date).startOf("days"), "days");
      if (diff === 1) return "昨天"
      if (diff === 2) return "前天"
      if (diff > 2) return "3天前"
    }
  },

  numberDecimal (num, point) {
    let targetIndex = (num + "").indexOf(".")
    return targetIndex > 0 ? +(parseFloat(num).toFixed(point)) : num
  },


  transTenThousandData (value) {
    let valueTemp = parseFloat(value);
    let total = valueTemp.toFixed(2);
    if (String(valueTemp.toFixed(0)).length > 4) {
      total = (valueTemp / 10000).toFixed(2) + "万";
    }

    return total;
  },

  dealPieData (pieDataToDeal) {
    let ratioData = [];

    pieDataToDeal.forEach((item) => {
      ratioData.push({
        name: item.name,
        pieData: {
          text: "{big|" + parseFloat(item.data.totalration).toFixed(1) + "}{small| %}",
          data:[
            { value: parseFloat(item.data.totalration).toFixed(1) },
            { value: 100 - parseFloat(item.data.totalration).toFixed(1) }
          ],
        },
        detail: item.data.countys
      })
    });

    return ratioData;
  },


  gradientColor (startColor, endColor, step) {
    let startRGB = this.colorRgb(startColor);//转换为rgb数组模式
    let startR = startRGB[0];
    let startG = startRGB[1];
    let startB = startRGB[2];

    let endRGB = this.colorRgb(endColor);
    let endR = endRGB[0];
    let endG = endRGB[1];
    let endB = endRGB[2];

    let sR = (endR-startR)/step;//总差值
    let sG = (endG-startG)/step;
    let sB = (endB-startB)/step;

    let colorArr = [];
    for(let i = 0; i < step; i++){
      //计算每一步的hex值
      var hex = this.colorHex("rgb("+parseInt((sR*i+startR))+","+parseInt((sG*i+startG))+","+parseInt((sB*i+startB))+")");
      colorArr.push(hex);
    }
    return colorArr;
  },

  // 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
  colorRgb (sColor) {
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    sColor = sColor.toLowerCase();
    if(sColor && reg.test(sColor)){
      if(sColor.length === 4){
        var sColorNew = "#";
        for(let i = 1; i < 4; i++){
          sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
        }
        sColor = sColorNew;
      }
      //处理六位的颜色值
      let sColorChange = [];
      for(let i=1; i<7; i+=2){
        sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));
      }
      return sColorChange;
    }else{
      return sColor;
    }
  },

  colorHex (rgb) {
    let _this = rgb;
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if(/^(rgb|RGB)/.test(_this)){
      let aColor = _this.replace(/(?:(|)|rgb|RGB)*/g,"").split(",");
      let strHex = "#";
      for (let i = 0; i < aColor.length; i++) {
        let hex = Number(aColor[i]).toString(16);
        hex = hex<10 ? 0+""+hex :hex;// 保证每个rgb的值为2位
        if (hex === "0") {
          hex += hex;
        }
        strHex += hex;
      }
      if (strHex.length !== 7) {
        strHex = _this;
      }
      return strHex;
    } else if (reg.test(_this)) {
      let aNum = _this.replace(/#/,"").split("");
      if(aNum.length === 6){
        return _this;
      } else if (aNum.length === 3) {
        let numHex = "#";
        for(let i = 0; i < aNum.length; i++) {
          numHex += (aNum[i]+aNum[i]);
        }
        return numHex;
      }
    } else {
      return _this;
    }
  },

  twoDimenArrayTrans (value) {
    let arr = [...value];
    return arr[0].map(function(col, i) {
      return arr.map(function(row) {
        return row[i];
      })
    });
  },

};


export default CommonFunc;
