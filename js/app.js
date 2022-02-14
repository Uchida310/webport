const app = () => {
  
    const play = document.querySelector('.play'); //playクラスを取得

    const outline = document.querySelector('.moving-outline circle') //svgに設定したクラス
    const sounds = document.querySelectorAll('.sound-picker button');
    const studyDisplay = document.querySelector('.study-display');
    const intervalDisplay = document.querySelector('.interval-display');

    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');
    //円の長さを取得・・・約1359
    const outlineLength = outline.getTotalLength();

    //曲の再生間隔
    let fakeDuration = 600;

    //勉強時間


    //
    //合計時間
    let sumTime = 0;
    

    //strokeDasharray・・・svgのプロパティ　間隔を指定
    outline.style.strokeDasharray = outlineLength;

    //strokeDashoffset・・・svgのプロパティ 開始位置を指定
    outline.style.strokeDashoffset = outlineLength;

    //クリックされたら関数を実行
    play.addEventListener('click', () => {
        play.src = './svg/pause.svg';
    });

    //再生サウンドを変更


    timeSelect.forEach( Option => {
        Option.addEventListener('click', function() {
            fakeDuration = this.getAttribute('data-time');
            sumTime += this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:
                                        ${Math.floor(fakeDuration % 60)}`;
            console.log(sumTime);
        });
    });
    


    
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