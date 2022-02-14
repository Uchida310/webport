const app = () => {
  
    const play = document.querySelector('.play'); //playクラスを取得

    const outline = document.querySelector('.moving-outline circle') //svgに設定したクラス
    const video = document.querySelector('.video-container video');

    const sounds = document.querySelectorAll('.sound-picker button');
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');
    //円の長さを取得・・・約1359
    const outlineLength = outline.getTotalLength();
    //console.log(outlineLength);

    //曲の再生間隔
    let fakeDuration = 600;

    //strokeDasharray・・・svgのプロパティ　間隔を指定
    outline.style.strokeDasharray = outlineLength;

    //strokeDashoffset・・・svgのプロパティ 開始位置を指定
    outline.style.strokeDashoffset = outlineLength;

    //クリックされたら関数を実行
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    //再生サウンドを変更
    sounds.forEach(sound => {
        sound.addEventListener('click', function(){
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        });
    });

    timeSelect.forEach( Option => {
        Option.addEventListener('click', function() {
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:
                                        ${Math.floor(fakeDuration % 60)}`;
        });
    });
    

    //音楽が再生されいるか否かで判定する
    const checkPlaying = song => {
        if(song.paused){
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        }else{
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    }

    
    song.ontimeupdate = () => { //曲が再生されている間だけ実行される
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);
    
        //円のアニメーション
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        timeDisplay.textContent = `${minutes}:${seconds}`;

        if(currentTime >= fakeDuration) {
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg';
            video.pause();
        }

    }
    

}

app();