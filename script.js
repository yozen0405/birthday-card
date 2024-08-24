document.addEventListener('DOMContentLoaded', function () {
    const birthdayCard = document.querySelector('.birthdayCard');
    const backgroundMusic = document.getElementById('backgroundMusic');
    let isCardOpened = false; // 用於跟踪卡片狀態
    let confettiInterval;

    birthdayCard.addEventListener('click', function () {
        birthdayCard.classList.toggle('active');
        isCardOpened = !isCardOpened;

        if (isCardOpened) {
            backgroundMusic.play();
            startConfetti();
        } else {
            backgroundMusic.pause();
            clearConfetti();
        }
    });

    function startConfetti() {
        confettiInterval = setInterval(createConfetti, 300); // 每 300 毫秒生成一個亮片
    }

    function createConfetti() {
        if (!isCardOpened) return; // 如果卡片已關閉，則不生成亮片

        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        document.body.appendChild(confetti);

        const colors = ['#f15bb5', '#00f5d4', '#9b5de5', '#f4d35e', '#fb5607', '#00bbf9'];

        // 隨機位置與顏色
        const size = Math.random() * 10 + 10 + 'px';
        confetti.style.width = size;
        confetti.style.height = size;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.opacity = 0.5;
        confetti.style.left = Math.random() * 100 + 'vw';

        // 動畫效果
        const fallDuration = Math.random() * 3000 + 3000;
        const animation = confetti.animate([
            { transform: `translateY(-100vh) rotate(${Math.random() * 360}deg)` },
            { transform: `translateY(100vh) rotate(${Math.random() * 360}deg)` }
        ], {
            duration: fallDuration, // 隨機掉落速度
            easing: 'ease-in',
            iterations: 1,
            fill: 'forwards'
        });

        // 動畫結束後立即移除亮片
        animation.onfinish = () => confetti.remove();
    }

    function clearConfetti() {
        clearInterval(confettiInterval);
        const confettis = document.querySelectorAll('.confetti');
        confettis.forEach(confetti => confetti.remove());
    }

    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            backgroundMusic.pause(); // 當標籤頁不可見時暫停音樂
        } else if (isCardOpened) {
            backgroundMusic.play(); // 當標籤頁重新可見時，如果卡片是開啟的狀態，則繼續播放音樂
        }
    });
});