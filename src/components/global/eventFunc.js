const Event = {

  readyEvent : function  (fn) {
    if (fn == null) {
      fn = document;
    }
    let oldonload = window.onload;
    if (typeof window.onload !== "function") {
      window.onload = fn ;
    }else{
      window.onload = function  () {
        oldonload();
        fn();
      }
    }
  },

  addEvent : function(element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    }else if(element.attachEvent){
      element.attachEvent("on" + type,function  () {
        handler.call(element);
      })
    }else{
      element["on" +type] = handler;
    }
  },

  removeEvent : function  (element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type,handler, false)
    }else if (element.attachEvent) {
      element.detachEvent("on" + type, handler);
    }else{
      element["on" + type] = null;
    }
  },

  stopPropagation : function  (event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    }else{
      event.canceBubble = true;
    }
  },

  preventDefault : function (event) {
    if (event.preventDefault) {
      event.preventDefault();
    }
  },

  getTarget : function (event) {
    return event.target || event.srcElement;
  },

  getEvent : function (event) {
    event = event || window.event;
    if (!event) {
      let c = this.getEvent.caller;
      while(!c){
        event = c.arguments[0];
        if (event && Event === ev.constructor) {
          break;
        }
        c = c.caller;
      }
    }
    return event;
  }
};

export default Event;