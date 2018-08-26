
var actions = [
  {
    "element_id": "wx_button_daijinquan",
    "data": {
      "args": {
        "url": "../daijinquan/daijinquan",
        "a_ids": [],
        "e_ids": [],
        "open_type": "navigate",
        "st": 1
      },
      "type": 0,
      "exec": 5
    },
    "id": "M_daijinquan",
    "isNew": true
  },
  {
    "element_id": "wx_button_65bbe39e", 
    "data": {
      "args": {
        "url": "../page3/page3", 
        "a_ids": [], 
        "e_ids": [], 
        "open_type": "navigate", 
        "st": 1
      }, 
      "type": 0, 
      "exec": 5
    }, 
    "id": "M_cc60ea071aa8a00f", 
    "isNew": true
  }, 
  {
    "element_id": "wx_button_e647f148", 
    "data": {
      "args": {
        "showCancel": "checked", 
        "e_ids": [], 
        "st": 1, 
        "a_ids": []
      }, 
      "type": 0, 
      "exec": 102
    }, 
    "id": "M_b284227e44890e65", 
    "isNew": true
  }, 
  {
    "element_id": "wx_button_b3368368", 
    "data": {
      "args": {
        "url": "../page5/page5", 
        "a_ids": [], 
        "e_ids": [], 
        "open_type": "navigate", 
        "st": 1
      }, 
      "type": 0, 
      "exec": 5
    }, 
    "id": "M_1db3f491e7e640b8", 
    "isNew": true
  }, 
  {
    "element_id": "wx_button_61fe830e", 
    "data": {
      "args": {
        "url": "../page4/page4", 
        "a_ids": [], 
        "e_ids": [], 
        "open_type": "navigate", 
        "st": 1
      }, 
      "type": 0, 
      "exec": 5
    }, 
    "id": "M_369d6e37d67eab19", 
    "isNew": true
  }
];

var animations = [];

var timelines = [
  {
    "iType": 0, 
    "isNew": true, 
    "animations": [], 
    "element_id": "body_912719df7741db9f", 
    "data": {
      "type": 0, 
      "t": {
        "rv": 0, 
        "rp": 0, 
        "wa": 0, 
        "de": 0, 
        "st": 1, 
        "du": 1, 
        "es": 0
      }, 
      "d": {}
    }, 
    "id": "M_7d86fcde3e4ff672"
  }
];

getApp().coolsite360.DATA[__wxRoute] = {
   animations:animations,
   actions:actions,
   timelines:timelines
};

