// Аудиоплеер функциональность
document.addEventListener('DOMContentLoaded', function() {
    const audioElement = document.getElementById('audioElement');
    const playBtn = document.getElementById('playBtn');
    const playIcon = document.getElementById('playIcon');
    const progress = document.getElementById('progress');
    const progressBar = document.getElementById('progressBar');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    const volumeBtn = document.getElementById('volumeBtn');
    const volumeIcon = document.getElementById('volumeIcon');
    const volumeSlider = document.getElementById('volumeSlider');

    // Проверяем, находимся ли мы на странице аудиоплеера
    if (audioElement && playBtn) {
        // Время обновления
        function updateTime() {
            const currentTime = audioElement.currentTime;
            const duration = audioElement.duration;
            
            // Обновление прогресс-бара
            const progressPercent = (currentTime / duration) * 100;
            progress.style.width = `${progressPercent}%`;
            
            // Форматирование времени
            currentTimeEl.textContent = formatTime(currentTime);
            
            if (duration) {
                durationEl.textContent = formatTime(duration);
            }
        }

        // Форматирование времени в мм:сс
        function formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        }

        // Переключение воспроизведения
        function togglePlay() {
            if (audioElement.paused) {
                audioElement.play();
                playIcon.className = 'fas fa-pause';
                playBtn.setAttribute('aria-label', 'Пауза');
            } else {
                audioElement.pause();
                playIcon.className = 'fas fa-play';
                playBtn.setAttribute('aria-label', 'Воспроизведение');
            }
        }

        // Установка позиции воспроизведения
        function setProgress(e) {
            const width = this.clientWidth;
            const clickX = e.offsetX;
            const duration = audioElement.duration;
            
            audioElement.currentTime = (clickX / width) * duration;
        }

        // Управление громкостью
        function setVolume() {
            const volume = volumeSlider.value / 100;
            audioElement.volume = volume;
            
            // Обновление иконки громкости
            if (volume === 0) {
                volumeIcon.className = 'fas fa-volume-mute';
            } else if (volume < 0.5) {
                volumeIcon.className = 'fas fa-volume-down';
            } else {
                volumeIcon.className = 'fas fa-volume-up';
            }
        }

        // Переключение mute/unmute
        function toggleMute() {
            audioElement.muted = !audioElement.muted;
            
            if (audioElement.muted) {
                volumeIcon.className = 'fas fa-volume-mute';
                volumeSlider.value = 0;
            } else {
                setVolume();
                volumeSlider.value = audioElement.volume * 100;
            }
        }

        // События
        audioElement.addEventListener('loadedmetadata', updateTime);
        audioElement.addEventListener('timeupdate', updateTime);
        audioElement.addEventListener('ended', function() {
            playIcon.className = 'fas fa-play';
        });

        playBtn.addEventListener('click', togglePlay);
        progressBar.addEventListener('click', setProgress);
        volumeSlider.addEventListener('input', setVolume);
        volumeBtn.addEventListener('click', toggleMute);

        // Инициализация громкости
        setVolume();
    }

    // Анимации для карточек
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    console.log('🎵 Сайт "Мама-главное слово" загружен! 2025 год - время современных технологий! 🚀');
});