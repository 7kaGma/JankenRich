"use strict";{


/*==========
イベントと実行処理
==========*/
const image =document.getElementById('image');
const janken = document.getElementById("janken");
const hoi = document.getElementById("hoi");
const result = document.getElementById("sho-hai");
const heading = document.getElementById("heading");
const resultp = document.getElementById("result");
const onemore = document.getElementById("onemore");
const humburger = document.getElementById("humburger");
const jokyo = document.getElementById("jokyo");
const meter = document.getElementById("meter");
const rule = document.getElementById("rule");

/*==========
じゃんけん
==========*/
let selection = 0;
let cpu = Math.ceil(Math.random() * 3);
let me = 0;
let jankenjudge;
console.log(cpu);

/ボタンのクリック/ 
const jabtn = document.querySelectorAll('.ja-btn');
const btn = document.getElementById("btn");

/* クリックを取得*/
document.getElementById("gu_btn").addEventListener('click', function () {
  selection = 1;
  console.log(selection);
  jabtn.forEach(function(element,index){
    element.classList.remove('activeja');
    if(index===0){
      element.classList.add('activeja')
    }
  })
});
document.getElementById("cho_btn").addEventListener('click', function () {
  selection = 2;
  console.log(selection);
  jabtn.forEach(function(element,index){
    element.classList.remove('activeja');
    if(index===1){
      element.classList.add('activeja');
    }
  })
});
document.getElementById("par_btn").addEventListener('click', function () {
  selection = 3;
  jabtn.forEach(function(element,index){
    element.classList.remove('activeja');
    if(index===2){
      element.classList.add('activeja');
    }
  })
});

/*勝ち負けの状態での条件分岐*/
function judgeja() {
  if (me === cpu) {
    console.log("あいこ")
    jankenjudge=1;
  } else if ((me === 1 && cpu === 2) || (me === 2 && cpu === 3) || (me === 3 && cpu === 1)) {
    console.log("あなたの勝ち")
    jankenjudge=2;
  } else {
    console.log("あなたの負け")
    jankenjudge=0;
  }
};

/*==========
タイマー
==========*/
let isTiming=false;
let limit = 5;
let passed = 0;
let remaining;

function countup(){
  passed+=0.5;
}

function limitTime(){
  remaining = limit - passed;
}

function calcTime(){
  if(isTiming){
    countup();
    limitTime(); 
    console.log(remaining);
  }
}


/*制限時間の処理*/
function limitjudge(){
  if(remaining === 0 && isTiming === true){
    isTiming = false;
    hoi.style.display='none';
    shohai.style.display='block';
    heading.textContent='勝敗';
    resultp.textContent='あなたの負け！';
    image.setAttribute('src','./assets/img/loose2.png');
    console.log("timeout");
    console.log(cpuArrow);
    console.log(meArrow);
    console.log(VorD);
    // loose.style.display='block';
  }
}

/*==========
ホイ
==========*/
let meArrow = [];
let cpuArrow = [];
const min = 1;
const max = 3;
let cpuDisplay;
const list = document.querySelectorAll('.cpu-arrow');


console.log(btn);
console.log(list);
console.log(cpuDisplay);


function cpuArrowSelect() {
  if (cpuArrow.length < cpuDisplay) {
    for (let i = 0; i < cpuDisplay; i++) {
    cpuArrow.push(Math.ceil(Math.random() * (max - min + 1)));
    }
  }
  console.log(cpuArrow);
}

function appear() {
  for (let i = 0; i < cpuArrow.length; i++) {
      list[i].classList.add('appear');
  }
}

/*正誤判定*/
let VorD;
function judgeArrow() {
  for (let i =0; i<cpuArrow.length;i++){
    if(cpuArrow[i] == meArrow[i]){
      VorD = true;
      console.log("win");
    }else{
      VorD = false;
      console.log("loose");
    }
  }
}

/*勝敗の表示*/
function resultMenu(){
  hoi.style.display='none';
  shohai.style.display='block';
  heading.textContent='勝敗';
  if(VorD===true){
    resultp.textContent='あなたの勝ち！';
    image.setAttribute('src','./assets/img/win2.png');

  }else{
    resultp.textContent='あなたの負け！';
    image.setAttribute('src','./assets/img/loose2.png');
  }
}
/*==========
勝敗と影響
==========*/
function effect(){
  switch(jankenjudge){
    case 0:
      limit=2.5;
      cpuDisplay = 4;
      jokyo.textContent='劣勢';
      jokyo.style.color='blue';
      meter.style.animation='timebar 2.5s steps(60) forwards';
      break;

    case 1:
      limit=3;
      cpuDisplay = 3;
      jokyo.textContent='ガチンコ';
      jokyo.style.color='black';
      meter.style.animation='timebar 3s steps(72) forwards';
      break;

    case 2:
      limit=3.5;
      cpuDisplay = 2;
      jokyo.textContent='優勢';
      jokyo.style.color='red';
      meter.style.animation='timebar 3.5s steps(84) forwards';
      break;
  }
}




/*==========
じゃんけんボタンが決定されたとき
==========*/
btn.addEventListener('click', function () {
  /*じゃんけんの処理*/
  me = selection;
  console.log(me);
  judgeja();
  effect();
  /*表示の処理*/
  janken.style.display='none';
  hoi.style.display='block';
  image.setAttribute('src','./assets/img/midfield2.png');
  heading.textContent='取組';
  cpuArrowSelect();
  appear();
  cpuArrow.forEach((value, index) => {
    let liidentify = document.querySelector(`#cpu${index + 1}`);
    switch (value) {
      case 1:
        liidentify.classList.add("top");
        break;
      case 2:
        liidentify.classList.add("right");
        break;
      case 3:
        liidentify.classList.add("left");
        break;
      case 4:
        liidentify.classList.add("bottom");
        break;
    }
  });
  /*タイマーの処理*/
  if(!isTiming){
    isTiming=true;
  }else{
    isTiming=false
  }
  console.log(isTiming)
});

/*時間制限の処理*/
setInterval(calcTime,500);
setInterval(limitjudge,500);


/*==========
矢印ボタンが決定されたとき
==========*/
let clickCount = 0;
const top = document.getElementById("top");
const left = document.getElementById("left");
const right = document.getElementById("right");
const bottom = document.getElementById("bottom");

top.addEventListener('click', function(){
  if (clickCount<cpuDisplay){
    clickCount++;
    meArrow.push(1);
  }
  if(clickCount===cpuDisplay){
    isTiming = false;
    judgeArrow();
    resultMenu();
    console.log(cpuArrow);
    console.log(meArrow);
    console.log(VorD);
  }
})

left.addEventListener('click', function(){
  if (clickCount<cpuDisplay){
    clickCount++;
    meArrow.push(3);
  }
  if(clickCount===cpuDisplay){
    isTiming = false;
    judgeArrow();
    resultMenu();
    console.log(cpuArrow);
    console.log(meArrow);
    console.log(VorD);
  }
})

right.addEventListener('click', function(){
  if (clickCount<cpuDisplay){
    clickCount++;
    meArrow.push(2);
  }
  if(clickCount===cpuDisplay){
    isTiming = false;
    judgeArrow();
    resultMenu();
    console.log(cpuArrow);
    console.log(meArrow);
    console.log(VorD);
  }
})

bottom.addEventListener('click', function(){
  if (clickCount < cpuDisplay){
    clickCount++;
    meArrow.push(4);
  }
  if(clickCount === cpuDisplay){
    isTiming = false;
    judgeArrow();
    resultMenu();
    console.log(cpuArrow);
    console.log(meArrow);
    console.log(VorD);
  }
})

/*==========
その他
==========*/


onemore.addEventListener('click', function () {
  location.reload();
});
humburger.addEventListener('click', function () {
  humburger.classList.toggle('close');
  rule.classList.toggle('hidden');
});

}
