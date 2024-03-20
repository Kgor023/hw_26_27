const btnStart = document.querySelector(".start");
const btnSave = document.querySelector(".save");
const btnReverse = document.querySelector(".reverse");
const btnClear = document.querySelector(".clear");
const btnClearAll = document.querySelector(".clearAll");
const btnReset = document.querySelector(".reset");
const btnHidden = document.querySelectorAll(".hidden");
const hourBlcok = document.querySelector(".time_h");
const minBlcok = document.querySelector(".time_m");
const secBlcok = document.querySelector(".time_s");
const msBlcok = document.querySelector(".time_ms");
const history = document.querySelector(".history");

let hour = 0;
let min = 0;
let sec = 0;
let ms = 0;
let timer;

btnStart.addEventListener("click", () => {
  if (btnStart.textContent == "START") {
    btnStart.textContent = "STOP";
    if (reverseTimerActive) {
      clearInterval(timer);
      reverseTimer = setInterval(() => {
        ms--;
        if (ms == 0 && sec == 0 && min == 0 && hour == 0) {
          clearInterval(reverseTimer);
          msBlcok.textContent = "00";
          for (let i = 0; i < btnHidden.length; i++) {
            btnHidden[i].style.display = "none";
          }
          btnStart.textContent = "START";
          reverseTimerActive = true;
        } else if (ms < 1) {
          ms = 99;
          sec--;
          secBlcok.textContentL = "0" + sec;
          msBlcok.textContent = ms;
        }

        if (ms <= 9) {
          msBlcok.textContent = "0" + ms;
        }
        if (ms <= 99 && ms > 9) {
          msBlcok.textContent = ms;
        }

        if (sec == 0 && min == 0 && hour == 0) {
          secBlcok.textContent = "00";
        } else if (sec < 1) {
          sec = 59;
          min--;
          minBlcok.textContentL = "0" + min;
          secBlcok.textContent = sec;
        }
        if (sec <= 9) {
          secBlcok.textContent = "0" + sec;
        }
        if (sec > 9 && sec < 59) {
          secBlcok.textContent = sec;
        }

        if (min == 0 && hour == 0) {
          minBlcok.textContent = "00";
        } else if (min < 1) {
          min = 59;
          hour--;
          hourBlcok.textContentL = "0" + hour;
          minBlcok.textContent = min;
        }
        if (min <= 9) {
          minBlcok.textContent = "0" + min;
        }
        if (min > 9 && min < 59) {
          minBlcok.textContent = min;
        }
        if (hour <= 9) {
          hourBlcok.textContent = "0" + hour;
        }
        if (hour > 9) {
          hourBlcok.textContent = hour;
        }
      }, 10);
      reverseTimerActive = false;
    } else {
      clearInterval(reverseTimer);
      timer = setInterval(() => {
        ms++;
        if (ms <= 9) {
          msBlcok.textContent = "0" + ms;
        }
        if (ms > 9) {
          msBlcok.textContent = ms;
        }
        if (ms > 99) {
          sec++;
          ms = 0;
          secBlcok.textContentL = "0" + sec;
          msBlcok.textContent = "0" + ms;
        }

        if (sec <= 9) {
          secBlcok.textContent = "0" + sec;
        }
        if (sec > 9) {
          secBlcok.textContent = sec;
        }
        if (sec > 59) {
          sec = 0;
          min++;
          minBlcok.textContent = "0" + min;
        }

        if (min <= 9) {
          minBlcok.textContent = "0" + min;
        }
        if (min > 9) {
          minBlcok.textContent = min;
        }
        if (min > 59) {
          min = 0;
          hour++;
          hourBlcokBlcok.textContent = "0" + hour;
        }

        if (hour <= 9) {
          hourBlcok.textContent = "0" + hour;
        }
        if (hour > 9) {
          hourBlcok.textContent = hour;
        }
      }, 10);
      reverseTimerActive = true;
    }
  } else {
    btnStart.textContent = "START";
    clearInterval(timer);
    clearInterval(reverseTimer);
    if (reverseTimerActive) {
      reverseTimerActive = false;
    } else {
      reverseTimerActive = true;
    }
  }
  for (let i = 0; i < btnHidden.length; i++) {
    btnHidden[i].style.display = "block";
  }
});

btnReset.addEventListener("click", () => {
  btnStart.textContent = "START";
  clearInterval(timer);
  clearInterval(reverseTimer);
  hour = 0;
  min = 0;
  sec = 0;
  ms = 0;
  hourBlcok.textContent = "00";
  minBlcok.textContent = "00";
  secBlcok.textContent = "00";
  msBlcok.textContent = "00";
  reverseTimerActive = false;
});

let ol = document.createElement("ol");
history.prepend(ol);

count = 0;
btnSave.addEventListener("click", () => {
  let li = document.createElement("li");
  li.innerHTML = `${hourBlcok.textContent}:${minBlcok.textContent}:${secBlcok.textContent}:${msBlcok.textContent}`;
  ol.append(li);
  count++;
  localStorage.setItem(
    `${count}`,
    JSON.stringify(
      `${hourBlcok.textContent}:${minBlcok.textContent}:${secBlcok.textContent}:${msBlcok.textContent}`
    )
  );
});

btnClear.addEventListener("click", () => {
  ol.innerHTML = "";
});

btnClearAll.addEventListener("click", () => {
  btnStart.textContent = "START";
  clearInterval(timer);
  clearInterval(reverseTimer);
  hour = 0;
  min = 0;
  sec = 0;
  ms = 0;
  hourBlcok.textContent = "00";
  minBlcok.textContent = "00";
  secBlcok.textContent = "00";
  msBlcok.textContent = "00";
  ol.innerHTML = "";
  reverseTimerActive = false;
});

let reverseTimer;
let reverseTimerActive = false;
btnReverse.addEventListener("click", () => {
  if (hour == 0 && min == 0 && sec == 0 && ms == 0) {
    btnReverse = false;
    reverseTimerActive = false;
  }
  if (btnStart.textContent == "START") {
    if (reverseTimerActive == false) {
      reverseTimerActive = true;
    } else {
      reverseTimerActive = false;
    }
  } else if (reverseTimerActive && btnStart.textContent == "STOP") {
    clearInterval(timer);
    reverseTimer = setInterval(() => {
      ms--;
      if (ms == 0 && sec == 0 && min == 0 && hour == 0) {
        clearInterval(reverseTimer);
        msBlcok.textContent = "00";
        for (let i = 0; i < btnHidden.length; i++) {
          btnHidden[i].style.display = "none";
        }
        btnStart.textContent = "START";
        reverseTimerActive = false;
      } else if (ms < 1) {
        ms = 99;
        sec--;
        secBlcok.textContentL = "0" + sec;
        msBlcok.textContent = ms;
      }
      if (ms <= 9) {
        msBlcok.textContent = "0" + ms;
      }
      if (ms <= 99 && ms > 9) {
        msBlcok.textContent = ms;
      }

      if (sec == 0 && min == 0 && hour == 0) {
        secBlcok.textContent = "00";
      } else if (sec < 1) {
        sec = 59;
        min--;
        minBlcok.textContentL = "0" + min;
        secBlcok.textContent = sec;
      }
      if (sec <= 9) {
        secBlcok.textContent = "0" + sec;
      }
      if (sec > 9 && sec < 59) {
        secBlcok.textContent = sec;
      }

      if (min == 0 && hour == 0) {
        minBlcok.textContent = "00";
      } else if (min < 1) {
        min = 59;
        hour--;
        hourBlcok.textContentL = "0" + hour;
        minBlcok.textContent = min;
      }
      if (min <= 9) {
        minBlcok.textContent = "0" + min;
      }
      if (min > 9 && min < 59) {
        minBlcok.textContent = min;
      }
      if (hour <= 9) {
        hourBlcok.textContent = "0" + hour;
      }
      if (hour > 9) {
        hourBlcok.textContent = hour;
      }
    }, 10);
    reverseTimerActive = false;
  } else {
    clearInterval(reverseTimer);
    timer = setInterval(() => {
      ms++;
      if (ms <= 9) {
        msBlcok.textContent = "0" + ms;
      }
      if (ms > 9) {
        msBlcok.textContent = ms;
      }
      if (ms > 99) {
        sec++;
        ms = 0;
        secBlcok.textContentL = "0" + sec;
        msBlcok.textContent = "0" + ms;
      }

      if (sec <= 9) {
        secBlcok.textContent = "0" + sec;
      }
      if (sec > 9) {
        secBlcok.textContent = sec;
      }
      if (sec > 59) {
        sec = 0;
        min++;
        minBlcok.textContent = "0" + min;
      }

      if (min <= 9) {
        minBlcok.textContent = "0" + min;
      }
      if (min > 9) {
        minBlcok.textContent = min;
      }
      if (min > 59) {
        min = 0;
        hour++;
        hourBlcokBlcok.textContent = "0" + hour;
      }

      if (hour <= 9) {
        hourBlcok.textContent = "0" + hour;
      }
      if (hour > 9) {
        hourBlcok.textContent = hour;
      }
    }, 10);
    reverseTimerActive = true;
  }
});

window.onbeforeunload = () => {
  localStorage.setItem(
    "timeBrowser",
    JSON.stringify(
      `${hourBlcok.textContent}:${minBlcok.textContent}:${secBlcok.textContent}:${msBlcok.textContent}`
    )
  );
  localStorage.setItem(
    "timeCode",
    JSON.stringify(`${hour}:${min}:${sec}:${ms}`)
  );
  return false;
};
window.onload = () => {
  let newTimeBrowser = JSON.parse(localStorage.getItem("timeBrowser"));
  let newTimeCode = JSON.parse(localStorage.getItem("timeCode"));
  let newArrBrowser = newTimeBrowser.split(":");
  let newArrCode = newTimeCode.split(":");
  hourBlcok.textContent = newArrBrowser[0];
  minBlcok.textContent = newArrBrowser[1];
  secBlcok.textContent = newArrBrowser[2];
  msBlcok.textContent = newArrBrowser[3];
  hour = newArrCode[0];
  min = newArrCode[1];
  sec = newArrCode[2];
  ms = newArrCode[3];
};

