
const app = () => {

    const play = document.querySelector('.play'); //playクラスを取得

    // const outline = document.querySelector('.moving-outline circle') //svgに設定したクラス
    // const sounds = document.querySelectorAll('.sound-picker button');
    //チェック用s
    let check = 0;

    //それぞれの時間を表示するDOMを取得
    const studyDisplay = document.querySelector('.study-display');
    const intervalDisplay = document.querySelector('.interval-display');
    const setCountDisplay = document.querySelector('.set-display');
    const timeDisplay = document.querySelector('.time-display');
    const countStudyDisplay = document.querySelector('.count-study-display');
    const countIntervalDisplay = document.querySelector('.count-interval-display');


    //時間を設定するボタンのDOMを取得
    const intervalTimeButton = document.querySelector('.interval-button');
    const studyTimeButton = document.querySelector('.study-button');
    const defaultTimeButton = document.querySelector('.default-button');
    const setTimeButton = document.querySelector('.set-button');
    const clearTimeButton = document.querySelector('.clear-button');

    //円の長さを取得・・・約1359
    // const outlineLength = outline.getTotalLength();

    const setStudyVideo = document.querySelector('.set-study-bgm');
    const setIntervalVideo = document.querySelector('.set-interval-bgm');

    //ユーザー入力URL
    const studyURLBox = document.querySelector('.study-bgm');
    const intervalURLBox = document.querySelector('.interval-bgm');


    //時間計算用の変数
    let sumInterval = 0;
    let sumStudy = 0;
    let sumTime = 0;    //合計の時間を足す
    let sumCount = 0;

    //インターバル中か勉強時間中か判定する
    let isInterval = false;
    let isStudy = false;

    //動画がセットされているかチェックする
    let checkSetStudyVideo = false;
    let checkSetIntervalVideo = false;


    const intervalTime = 60000;
    const studyTime = intervalTime * 5;
    const podomoroStudyTime = intervalTime * 25;
    const podomoroIntervalTime = intervalTime * 5;


    ////////////////////////API操作用//////////////////////////////

    const botan = play;
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";

    const firstScriptTag = document.getElementsByTagName('script')[0];
    console.log(firstScriptTag);

    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    let player;
    let player2;

    ////////////////////////////////////////////////////

    //勉強時間をセット
    intervalTimeButton.addEventListener('click', () => {
        sumTime += intervalTime;
        sumInterval += intervalTime;
        intervalDisplay.textContent = `${Math.floor(sumInterval / 60000)}`;
        if (sumCount == 0) {
            sumCount = 1;
            setCountDisplay.textContent = `${sumCount}`;
        }
    });

    studyTimeButton.addEventListener('click', () => {
        sumTime += studyTime;
        sumStudy += studyTime;
        studyDisplay.textContent = `${Math.floor(sumStudy / 60000)}`;
        if (sumCount == 0) {
            sumCount = 1;
            setCountDisplay.textContent = `${sumCount}`;
        }
    });

    defaultTimeButton.addEventListener('click', () => {
        sumTime += podomoroStudyTime + podomoroIntervalTime;
        sumInterval += podomoroIntervalTime;
        sumStudy += podomoroStudyTime;
        intervalDisplay.textContent = `${Math.floor(sumInterval / 60000)}`;
        studyDisplay.textContent = `${Math.floor(sumStudy / 60000)}`;
        if (sumCount == 0) {
            sumCount = 1;
            setCountDisplay.textContent = `${sumCount}`;
        }
    });

    clearTimeButton.addEventListener('click', ()=>{
        sumTime = 0;
        sumCount = 0;
        sumStudy = 0;
        sumInterval = 0;
        intervalDisplay.textContent = `${Math.floor(sumInterval / 60000)}`;
        studyDisplay.textContent = `${Math.floor(sumStudy / 60000)}`;
        setCountDisplay.textContent = `${sumCount}`;
    })

    //再生動画のロジック
    //iframeを削除させたい
    setStudyVideo.addEventListener('click', () => {
        if(player){
            player.destroy();
        }
        checkSetStudyVideo = true;
        let studyValue = studyURLBox.value;
        studyValue = iframeFormat(studyValue);
        player = new YT.Player('iframe1', {
   
            videoId: studyValue,
            playerVars: {
                'loop': 1,
                'playlist': studyValue
            }
        });
        check++;
        console.log(check);
    });

    setIntervalVideo.addEventListener('click', () => {
        if(player2){
            player2.destroy();
        }
        checkSetIntervalVideo = true;
        let intervalValue = intervalURLBox.value;
        intervalValue = iframeFormat(intervalValue);
        player2 = new YT.Player('iframe2', {

            videoId: intervalValue,
            playerVars: {
                'loop': 1,
                'playlist': intervalValue
            }
        });
    });


    //テスト用ボタン:合計時間を出力する
    setTimeButton.addEventListener('click', () => {
        sumCount++;
        setCountDisplay.textContent = `${sumCount}`;
    });


    play.addEventListener('click', () => {

        if (checkSetIntervalVideo && checkSetStudyVideo &&  sumCount > 0 && sumStudy > 0 && sumInterval > 0) {
            play.classList.add("noClick");
            play.src = './svg/pause.svg';
            isStudy = true;
            calcStudy = sumStudy;
            calcInterval = sumInterval;
            player.playVideo();
            //もし再生中であれば実行したい //再生中でなければ不実行(余裕があれば)
            //sumTimeがゼロになるまで実行
            let calcTimer = setInterval(() => {
                sumTime -= 1000;
                let seconds = Math.floor(sumTime % 60000 / 1000);
                let minutes = Math.floor(sumTime / 60000);
                timeDisplay.textContent = `${minutes}:${seconds}`;


                //isStudyがアクティブなら
                if (isStudy && sumCount >= 0) {
                    calcStudy -= 1000;
                    let studySeconds = Math.floor(calcStudy % 60000 / 1000);
                    let studyMinutes = Math.floor(calcStudy / 60000);
                    countStudyDisplay.textContent = `${studyMinutes}:${studySeconds}`;

                    if (calcStudy <= 0) {
                        calcStudy = sumStudy;
                        isInterval = true;
                        isStudy = false;
                        calcInterval += 1000;
                        player.pauseVideo();
                        player2.playVideo();
                    }
                }
                //isIntervalがアクティブなら
                if (isInterval && sumCount > 0) {
                    calcInterval -= 1000;
                    let intervalSeconds = Math.floor(calcInterval % 60000 / 1000);
                    let intervalMinutes = Math.floor(calcInterval / 60000);
                    countIntervalDisplay.textContent = `${intervalMinutes}:${intervalSeconds}`;

                    if (calcInterval <= 0) {
                        calcInterval = sumInterval;
                        isInterval = false;
                        isStudy = true;
                        sumCount--;
                        setCountDisplay.textContent = `${sumCount}`;
                        player2.pauseVideo();
                        player.playVideo();

                    }
                }

                if (sumTime <= 0) {   //再生時間がゼロになったら
                    clearInterval(calcTimer);
                    play.src = './svg/play.svg';
                    timeDisplay.textContent = `00:00`;
                    player.stopVideo();
                    player2.stopVideo();
                }
            }, 1000);
        }
    });


    play.addEventListener('click', () => {
        if (checkSetIntervalVideo && checkSetStudyVideo &&  sumCount > 0 && sumStudy > 0 && sumInterval > 0) {
            sumTime *= sumCount;
            timeDisplay.textContent = `${Math.floor(sumTime / 60000)}:
                                                  ${Math.floor(sumTime % 60000)}`;
            this.removeEventListener;
        }
    });


    //押すたびに再生中のクラスを付ける
    // play.addEventListener('click',)






    //ユーザーからの入力をIDのみに切り取り、ループ再生オプションを追加
    function iframeFormat(Value) {

        Value = Value.split('v=')[1];
        Value = Value.split('&')[0];
        return Value;
    }
}

app();