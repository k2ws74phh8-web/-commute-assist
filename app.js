// ================================
// 通勤アシスト Ver.1.5
// Part3-1
// ================================

// 天気コード
const weatherText = {
    0: "快晴",
    1: "晴れ",
    2: "晴れ時々曇り",
    3: "曇り",
    45: "霧",
    48: "霧",
    51: "弱い霧雨",
    53: "霧雨",
    55: "強い霧雨",
    61: "小雨",
    63: "雨",
    65: "大雨",
    71: "雪",
    80: "にわか雨",
    95: "雷雨"
};

// 今日の日付
function today(){

    const week=["日","月","火","水","木","金","土"];

    const d=new Date();

    document.getElementById("today").textContent =
        `${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日（${week[d.getDay()]}）`;

}

// 保存した設定を読み込む
function loadSettings(){

    const from =
        localStorage.getItem("fromStation") || "下総中山";

    const to =
        localStorage.getItem("toStation") || "高輪ゲートウェイ";

    const departure =
        localStorage.getItem("departure") || "08:18";

    const arrival =
        localStorage.getItem("arrival") || "09:00";

    const route =
        localStorage.getItem("route") || "市川乗換（快速）";

    document.getElementById("settingFrom").value = from;
    document.getElementById("settingTo").value = to;
    document.getElementById("settingDeparture").value = departure;
    document.getElementById("settingArrival").value = arrival;
    document.getElementById("settingRoute").value = route;

    document.getElementById("fromStation").textContent = from;
    document.getElementById("toStation").textContent = to;
    document.getElementById("departure").textContent = departure;
    document.getElementById("arrival").textContent = arrival;
    document.getElementById("route").textContent = route;

}

// 設定を保存
document.getElementById("saveButton").addEventListener("click",()=>{

    const from=document.getElementById("settingFrom").value;
    const to=document.getElementById("settingTo").value;
    const departure=document.getElementById("settingDeparture").value;
    const arrival=document.getElementById("settingArrival").value;
    const route=document.getElementById("settingRoute").value;

    localStorage.setItem("fromStation",from);
    localStorage.setItem("toStation",to);
    localStorage.setItem("departure",departure);
    localStorage.setItem("arrival",arrival);
    localStorage.setItem("route",route);

    loadSettings();

    alert("設定を保存しました！");
});

// 更新ボタン
document.getElementById("refreshButton").addEventListener("click",()=>{
    loadWeather();
});

// 天気取得
async function loadWeather(){

    const lat=35.721;
    const lon=139.931;

    const url=`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=precipitation_probability_max&timezone=Asia%2FTokyo`;

    try{

        const res=await fetch(url);
        const data=await res.json();

        const temp=data.current.temperature_2m;
        const code=data.current.weather_code;
        const rain=data.daily.precipitation_probability_max[0];

        document.getElementById("weather").textContent="🌤️ "+(weatherText[code]||"不明");
        document.getElementById("temp").textContent="🌡️ 気温："+temp+"℃";
        document.getElementById("rain").textContent="☔ 降水確率："+rain+"%";

        let umbrella="";
        if(rain>=50){
            umbrella="🌂 雨傘がおすすめ";
        }else if(rain>=20){
            umbrella="🌂 折りたたみ傘があると安心";
        }else{
            umbrella="🌂 傘は不要";
        }

        document.getElementById("umbrella").textContent=umbrella;

        let clothes="";
        if(temp>=28){
            clothes="👕 半袖がおすすめ";
        }else if(temp>=22){
            clothes="👕 半袖＋薄手の羽織";
        }else{
            clothes="🧥 長袖がおすすめ";
        }

        document.getElementById("clothes").textContent=clothes;

        document.getElementById("advice").innerHTML=
        `今日は${temp}℃です。<br>${clothes}<br>${umbrella}`;

        // Ver.1.5では固定表示
        document.getElementById("sobu").textContent="🟢 総武線：平常運転";
        document.getElementById("rapid").textContent="🟢 総武快速線：平常運転";
        document.getElementById("yamanote").textContent="🟢 山手線：確認中";
        document.getElementById("keihin").textContent="🟢 京浜東北線：平常運転";

    }catch(e){

        document.getElementById("weather").textContent="天気を取得できませんでした";

    }

}

// 初期表示
today();
loadSettings();
loadWeather();
