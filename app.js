// 通勤アシスト Ver.1.3A

const weatherText = {
    0:"快晴",
    1:"晴れ",
    2:"晴れ時々曇り",
    3:"曇り",
    45:"霧",
    48:"霧",
    51:"弱い霧雨",
    53:"霧雨",
    55:"強い霧雨",
    61:"小雨",
    63:"雨",
    65:"大雨",
    71:"雪",
    80:"にわか雨",
    95:"雷雨"
};

function today(){

    const week=["日","月","火","水","木","金","土"];

    const d=new Date();

    document.getElementById("today").textContent=
    `${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日（${week[d.getDay()]}）`;
}

async function loadWeather(){

    // 市川市付近
    const lat=35.721;
    const lon=139.931;

    const url=
`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=precipitation_probability_max&timezone=Asia%2FTokyo`;

    try{

        const res=await fetch(url);

        const data=await res.json();

        const temp=data.current.temperature_2m;

        const code=data.current.weather_code;

        const rain=data.daily.precipitation_probability_max[0];

        document.getElementById("weather").textContent=
        "☀️ 天気：" + (weatherText[code] || "確認中");

        document.getElementById("temp").textContent=
        "🌡️ 気温：" + temp + "℃";

        document.getElementById("rain").textContent=
        "☔ 降水確率：" + rain + "%";

        if(rain>=50){

            document.getElementById("umbrella").textContent=
            "🌂 傘：雨傘がおすすめ";

        }else if(rain>=20){

            document.getElementById("umbrella").textContent=
            "🌂 傘：折りたたみ傘があると安心";

        }else{

            document.getElementById("umbrella").textContent=
            "🌂 傘：不要";
        }

        if(temp>=28){

            document.getElementById("clothes").textContent=
            "👕 半袖がおすすめ";

        }else if(temp>=22){

            document.getElementById("clothes").textContent=
            "👕 半袖＋薄手の羽織";

        }else{

            document.getElementById("clothes").textContent=
            "🧥 長袖がおすすめ";
        }

    }catch(e){

        document.getElementById("weather").textContent=
        "天気を取得できませんでした";
    }

}

today();
loadWeather();
// 通勤情報
document.getElementById("departure").textContent = "8:18";
document.getElementById("route").textContent = "市川乗換（快速）";
document.getElementById("arrival").textContent = "8:56";

// 運行情報（Ver.1.4では固定表示）
document.getElementById("sobu").textContent = "🟢 総武線：平常運転";
document.getElementById("rapid").textContent = "🟢 総武快速線：平常運転";
document.getElementById("yamanote").textContent = "🟢 山手線：確認中";
document.getElementById("keihin").textContent = "🟢 京浜東北線：平常運転";

// AIアドバイス
document.getElementById("advice").innerHTML =
"現在の天気と気温を参考に服装を選びましょう。<br>" +
"出発予定は8:18、市川乗換（快速）がおすすめです。";
