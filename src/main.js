// 載入個人 logo XD
const logo = require('./img/father.jpg')

// base64 函數
const base64 = require('js-base64').Base64

// 圖示主題：Font Awesome
require('@fortawesome/fontawesome-free/js/all.min.js')

// 目前網址
const currentURL = new URL(location.href)
const toSay = currentURL.searchParams.get('toSay')
const userInput = base64.decode(toSay ? toSay : '54i26Kaq56+A5b+r5qiC77yB')
const currentPathname = currentURL.pathname

// 類 $() 函式
function $$(ele) {
  if (ele.match(/^#/)) {
    return document.querySelector(ele)
  }
  return document.querySelectorAll(ele)
}

// 主函式
function main() {
  // 設定個人 logo
  const personalLogo = $$('#fatherImg')
  personalLogo.setAttribute('src', 'assets/' + logo)

  // 設定主要顯示區塊
  const theText = $$('#theText')
  const toSay = $$('#toSay')

  theText.innerHTML = userInput

  toSay.addEventListener('keyup', () => {
    history.replaceState({text: toSay.value}, '', currentPathname + '?toSay=' + base64.encodeURI(toSay.value))
    theText.innerHTML = toSay.value
  })
}

main() // 執行！