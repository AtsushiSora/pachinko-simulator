let count = 0;          // 通常時回転数
let hitSpins = 0;       // 初当たり回転数
let balls = 0;          // 投資玉
let renchan = 0;        // 連チャン数
let payoutBalls = 0;    // 獲得出玉

let isKakuhen = false;

const kakuhenRate = 0.65;   // 確変突入率
const renchanRate = 0.8;    // 確変継続率
const yenPerBall = 4;

// テスト用（本番は319）
const hitProbability = 319;

// 250玉で15〜20回転
let spinsPer250 = Math.floor(Math.random() * 6) + 15;
let ballsPerSpin = 250 / spinsPer250;


// 🎁 出玉 1400 ±50
function getPayout() {
  let variation = Math.floor(Math.random() * 101) - 50;
  return 1400 + variation;
}


// 🌈 リザルト表示関数
function showResult(hitSpins, renchan, ballsUsed, payoutBalls) {

  let resultPanel = document.getElementById("result");

  let profit = payoutBalls - ballsUsed;
  let yen = profit * yenPerBall;

  document.body.classList.remove("kakuhen");
  resultPanel.classList.remove("flash"); // ← 一旦消す

  let isKakuhen = renchan > 1;
  let typeClass = isKakuhen ? "kakuhen-hit" : "normal-hit";
  let typeText = isKakuhen ? "確変突入！" : "通常当たり";

  // 🔥 確変のときだけフラッシュ
  if (isKakuhen) {
    resultPanel.classList.add("flash");
  }

  resultPanel.innerHTML =
    "<div class='hit-type " + typeClass + "'>" + typeText + 
    "初当たり回転数: " + hitSpins + "回転<br>" +
    "連チャン数: " + renchan + "連<br>" +
    "投資: " + Math.floor(ballsUsed) + "玉<br>" +
    "獲得: " + Math.floor(payoutBalls) + "玉<br>" +
    "収支: " + Math.floor(profit) + "玉 (" +
    Math.floor(yen) + "円)";
}


// 初期ネオン
window.onload = function () {
  document.getElementById("result").classList.add("glow");
};


function draw() {

  let resultPanel = document.getElementById("result");

  // 🔥 確変中
  if (isKakuhen) {

    if (Math.random() < renchanRate) {

      renchan++;

      let payout = getPayout();
      payoutBalls += payout;

      resultPanel.textContent =
        "🌈 確変継続！ " + renchan + "連中\n" +
        "現在出玉: " + Math.floor(payoutBalls) + "玉";

      // 光強化
      resultPanel.style.boxShadow =
        "0 0 " + (10 + renchan * 5) + "px #00f0ff";

      // フラッシュ
      resultPanel.classList.add("flash");
      setTimeout(() => {
        resultPanel.classList.remove("flash");
      }, 900);

    } else {

      // 🎯 確変終了 → リザルト表示
      showResult(hitSpins, renchan, balls, payoutBalls);

      isKakuhen = false;
      renchan = 0;
      payoutBalls = 0;
      balls = 0;
    }

    return;
  }

  // 🎯 通常時 → 当たるまで回す
  while (true) {

    count++;
    balls += ballsPerSpin;

    let r = Math.floor(Math.random() * hitProbability);

    if (r === 0) {

      hitSpins = count;
      renchan = 1;

      let payout = getPayout();
      payoutBalls += payout;

      resultPanel.classList.add("flash");
      setTimeout(() => {
        resultPanel.classList.remove("flash");
      }, 900);

      if (Math.random() < kakuhenRate) {

        // 🌈 確変突入
        isKakuhen = true;
        document.body.classList.add("kakuhen");

        resultPanel.textContent =
          "🎉 初当たり！確変突入！\n" +
          "通常時: " + hitSpins + "回転\n" +
          "投資: " + Math.floor(balls) + "玉 (" +
          Math.floor(balls * yenPerBall) + "円)";

      } else {

        // 🎯 通常単発終了 → リザルト
        showResult(hitSpins, renchan, balls, payoutBalls);

        payoutBalls = 0;
        balls = 0;
        renchan = 0;
      }

      count = 0;
      break;
    }
  }
}

function shareScreen() {

  html2canvas(document.body).then(canvas => {

    canvas.toBlob(blob => {

      const file = new File([blob], "pachinko-result.png", {
        type: "image/png"
      });

      // 📱 スマホ用（画像付きシェア）
      if (navigator.share && navigator.canShare({ files: [file] })) {

        navigator.share({
          title: "パチンコシミュレーター結果",
          text: "結果をシェア！",
          files: [file]
        }).catch(() => {});

      } else {

        // PCはダウンロード
        const link = document.createElement("a");
        link.href = canvas.toDataURL();
        link.download = "pachinko-result.png";
        link.click();

        alert("画像を保存しました。SNSにアップしてください！");
      }

    });

  });

}