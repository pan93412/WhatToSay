// 壓縮文字用
const lzutf8 = require('lzutf8')

// 目前網址
const currentURL = new URL(location.href)
const toSay = currentURL.searchParams.get('toSay')
const currentPathname = currentURL.pathname

const introTxt = '剛才有個人問我「這世界上最棒的＊＊平台是什麼」，我毫不思索的回答了\
「<span style="color: red"><b>今天你要＊＊誰呢？</b></span>」，而後，\
我就被拖到後門痛毆了……<br>以上故事都是唬爛，\
但是這東西保證安全，內容<b>不會被除了你和被分享者以外的人看見</b>，\
還不趕快用這東西去＊＊？！XD'

// 類 $() 函式
function $$(ele) {
  if (ele.match(/^#/)) {
    return document.querySelector(ele)
  }
  return document.querySelectorAll(ele)
}

// 解決 textarea 所產生的 XSS 漏洞。
function escapeHtml(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
    "!!!": "<br>"
  };

  return text.replace(/([&<>"']|!!!)/g, function(m) { return map[m]; });
}

/* COMPRESSION and DECOMPRESSION */
// 壓縮
function comp(originalTxt) {
  return new Promise((resolve) => {
    lzutf8.compressAsync(originalTxt, {outputEncoding: 'Base64'}, (res) => {
      resolve(res)
    })
  })
}

// 解壓縮
function decomp(originalTxt) {
  return new Promise((resolve) => {
    lzutf8.decompressAsync(originalTxt, {inputEncoding: 'Base64'}, (res) => {
      resolve(res)
    })
  })
}

// 處理連結
async function linkHandler() {
  const toSayElement = $$('#toSay')
  const theText = $$('#theText')

  const usrInput = escapeHtml(toSayElement.value)
  const output = await comp(usrInput)

  history.replaceState({}, '', `${currentPathname}?toSay=${output}`)
  theText.innerHTML = usrInput !== "" ? usrInput : introTxt
}

(async function () {
  const userInput = toSay ? await decomp(toSay) : introTxt

  // 主要顯示區塊
  const theText = $$('#theText')
  const toSayElement = $$('#toSay')

  theText.innerHTML = userInput
  toSayElement.addEventListener('keyup', linkHandler)
})()