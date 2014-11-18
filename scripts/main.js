window.onload = function() {
    var game = new GameOfLife();
    var playBtn = document.getElementsByClassName('play')[0];
    playBtn.onclick = function() {
        game.play();
    };
    var stopBtn = document.getElementsByClassName('stop')[0];
    stopBtn.onclick = function() {
        game.stop();
    };
    var nextBtn = document.getElementsByClassName('next')[0];
    nextBtn.onclick = function() {
        game.next();
    };
};