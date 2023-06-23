const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const input = $("input");
const resetButton = $("button");
const wrong_section = $(".wrong_section");
const spellingList = $$(".spelling");
const hangmanImg = $("img");

const successList = [];
const wrongList = [];
let levelCount = 0;

function checkGameSuccess() {
  let isSuccess = true;

  spellingList.forEach((item) => {
    const { classList } = item;
    if (classList.contains("hidden")) {
      isSuccess = false;
      return;
    }
  });
  if (isSuccess) {
    setTimeout(() => {
      alert("축하합니다! 성공입니다 ☺✨");
    }, 400);
  }
}

function checkInput(e) {
  let isIncluded = false;
  if (e.keyCode == 13) {
    if (successList.includes(input.value) || wrongList.includes(input.value)) {
      alert("이미 입력한 알파벳입니다.");
    } else {
      spellingList.forEach((item) => {
        if (item.innerHTML === input.value) {
          item.classList.toggle("hidden");
          isIncluded = true;
          successList.push(input.value);
        }
      });
      if (!isIncluded) {
        wrongList.push(input.value);
        wrong_section.innerHTML += `<span class="wrong">${input.value}</span>`;
        hangmanImg.src = `./img/level${++levelCount}.png`;
      } else {
        checkGameSuccess();
      }
    }
    if (levelCount === 4) {
      setTimeout(() => {
        alert("Game Over...");
        resetAll();
      }, 300);
    }

    input.value = "";
  }
}

function resetAll() {
  successList.length = 0;
  spellingList.forEach((item) => {
    const { classList } = item;
    classList.add("hidden");
  });
  wrong_section.innerHTML = "";
  levelCount = 0;
  hangmanImg.src = "";
}

function addEvent() {
  input.addEventListener("keyup", (e) => checkInput(e));
  resetButton.addEventListener("click", resetAll);
}

addEvent();
