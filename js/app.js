//http://www.openspc2.org/kouza_js/083/index.html
//https://qiita.com/nntsugu/items/640762a7ba8fd7cc50dd
//このサイトを参考にiframeのDOMを操作する
const app = () => {
  
    const play = document.querySelector('.play'); //playクラスを取得

    // const outline = document.querySelector('.moving-outline circle') //svgに設定したクラス
    // const sounds = document.querySelectorAll('.sound-picker button');


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

    //円の長さを取得・・・約1359
    // const outlineLength = outline.getTotalLength();

    //時間計算用の変数
    let sumInterval = 0;
    let sumStudy = 0;
    let sumTime = 0;    //合計の時間を足す
    let sumCount = 0;

    //インターバル中か勉強時間中か判定する
    let isInterval = false;
    let isStudy = false;


    const intervalTime = 60000; 
    const studyTime = intervalTime * 5;
    const podomoroStudyTime = intervalTime * 25;
    const podomoroIntervalTime = intervalTime * 5;

    //勉強時間をセット
    intervalTimeButton.addEventListener('click', ()=>{
        sumTime += intervalTime;
        sumInterval += intervalTime;
        intervalDisplay.textContent = `${Math.floor(sumInterval / 60000)}`;
        if(sumCount == 0){
            sumCount = 1;
            setCountDisplay.textContent = `${sumCount}`;
        }
    });

    studyTimeButton.addEventListener('click', ()=>{
        sumTime += studyTime;
        sumStudy += studyTime;
        studyDisplay.textContent = `${Math.floor(sumStudy / 60000)}`;
        if(sumCount == 0){
            sumCount = 1;
            setCountDisplay.textContent = `${sumCount}`;
        }
    });

    defaultTimeButton.addEventListener('click', ()=>{
        sumTime += podomoroStudyTime + podomoroIntervalTime;
        sumInterval += podomoroIntervalTime;
        sumStudy += podomoroStudyTime;
        intervalDisplay.textContent = `${Math.floor(sumInterval / 60000)}`;
        studyDisplay.textContent = `${Math.floor(sumStudy / 60000)}`;
        if(sumCount == 0){
            sumCount = 1;
            setCountDisplay.textContent = `${sumCount}`;
        }
    });

    //テスト用ボタン:合計時間を出力する
    setTimeButton.addEventListener('click', ()=>{
        sumCount++;
        setCountDisplay.textContent = `${sumCount}`;
    });

    play.addEventListener('click', ()=>{
        sumTime *= sumCount;
        timeDisplay.textContent = `${Math.floor(sumTime / 60000)}:
                                  ${Math.floor(sumTime % 60000)}`;

        this.removeEventListener;
    }, {once: true});
    
    /*
    //strokeDasharray・・・svgのプロパティ　間隔を指定
    outline.style.strokeDasharray = outlineLength;

    //strokeDashoffset・・・svgのプロパティ 開始位置を指定
    outline.style.strokeDashoffset = outlineLength;

    */
    //クリックされたら関数を実行
    play.addEventListener('click', () => {
        play.src = './svg/pause.svg';
        isStudy = true;
        calcStudy = sumStudy;
        calcInterval = sumInterval;
        //sumTimeがゼロになるまで実行
            let calcTimer = setInterval(() => {
                sumTime -= 1000;
                let seconds = Math.floor(sumTime % 60000 / 1000);
                let minutes = Math.floor(sumTime / 60000);
                timeDisplay.textContent = `${minutes}:${seconds}`;


                //isStudyがアクティブなら
                if(isStudy && sumCount >= 0){
                    calcStudy -= 1000;
                    let studySeconds = Math.floor(calcStudy % 60000 / 1000);
                    let studyMinutes = Math.floor(calcStudy / 60000);
                    countStudyDisplay.textContent = `${studyMinutes}:${studySeconds}`;
                    
                    if(calcStudy <= 0){
                        calcStudy = sumStudy;
                        isInterval = true;
                        isStudy = false;
                        calcInterval += 1000;
                    }
                }
                //isIntervalがアクティブなら
                if(isInterval && sumCount > 0){
                    calcInterval -= 1000;
                    let intervalSeconds = Math.floor(calcInterval % 60000 / 1000);
                    let intervalMinutes = Math.floor(calcInterval / 60000);
                    countIntervalDisplay.textContent = `${intervalMinutes}:${intervalSeconds}`;
                    
                    if(calcInterval <= 0){
                        calcInterval = sumInterval;
                        isInterval = false;
                        isStudy = true;
                        sumCount--;
                    }
                }

                if(sumTime <= 0){   //再生時間がゼロになったら
                    clearInterval(calcTimer);
                    play.src = './svg/play.svg';
                    timeDisplay.textContent = `00:00`;
                }
            }, 1000);
        
    },{once: true});

    //音声ボタン毎の値をセットしていく
    

    


    
    // song.ontimeupdate = () => { //曲が再生されている間だけ実行される
    //     let currentTime = sumTime;
    //     let elapsed = fakeDuration - currentTime;
    //     let seconds = Math.floor(elapsed % 60);
    //     let minutes = Math.floor(elapsed / 60);
    
    //     //円のアニメーション
    //     let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    //     outline.style.strokeDashoffset = progress;

    //     timeDisplay.textContent = `${minutes}:${seconds}`;

    //     if(currentTime >= fakeDuration) {
    //         song.currentTime = 0;
    //         play.src = './svg/play.svg';
    //     }

    // }
    

}

app();