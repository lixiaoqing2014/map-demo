export default {
  checkIsChEnNum: /^[A-Za-z0-9\u4e00-\u9fa5]+$/,
  mobileReg: /^1(3[0-9]|4[57]|5[^4]|7[0-8]|8[0-9])\d{8}$/,
  validPhoneVlideCodeCheck: /^\d{6}$/,
  pwdReg: /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))^.{6,10}$/,
  deviceReg: /(iphone|ipad|android)/i,
  hkMobile: /^([5|6|9])\d{7}$/,
  chineseReg: /^[\u0391-\uFFE5]+$/,
  numberReg: /^[0-9]+$/,
  enNumReg:/^[a-zA-Z0-9]+$/,
  telReg: /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/ //固话
}
