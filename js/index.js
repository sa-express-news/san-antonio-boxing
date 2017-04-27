(function (App) {
	function VideoPlayer (videos) {
		this.videos = videos;
		this.fraction = 0.8;
		this.iterateOverVideos = this.iterateOverVideos.bind(this);
		this.addVisibleFlag();
		this.init();
	}

	VideoPlayer.prototype = {
		addVisibleFlag: function () {
			for (var i = 0; i < this.videos.length; i++) {
				this.videos[i].isVisible = false;
			}
		},

		init: function () {
			window.addEventListener('scroll', this.iterateOverVideos, false);
			window.addEventListener('resize', this.iterateOverVideos, false);
		},
 
		iterateOverVideos: function () {
			for (var i = 0; i < this.videos.length; i++) {
				this.checkScroll(this.videos[i]);
			}
		},

		checkScroll: function (video) {
			var x 		 = video.offsetLeft,
					y 		 = video.offsetTop,
					width  = video.offsetWidth,
					height = video.offsetHeight,
					right  = x + width,
					bottom = y + height,
					visibleX, visibleY, amountVisible;

			visibleX = Math.max(0, Math.min(width, window.pageXOffset + window.innerWidth - x, right - window.pageXOffset));
			visibleY = Math.max(0, Math.min(height, window.pageYOffset + window.innerHeight - y, bottom - window.pageYOffset));

			amountVisible = visibleX * visibleY / (width * height);

			if (!video.isVisible && amountVisible > this.fraction) {
				this.play(video);
			} else if (amountVisible === 0) {
				this.stop(video);
			}
		},

		play: function (video) {
			video.play();
			video.isVisible = true;
		},

		stop: function (video) {
			video.pause();
			video.currentTime = 0;
			video.isVisible = false;
		},
	};

	function SplashAudio(header, audio) {
		this.header 				 = header;
		this.audio 					 = audio;
		this.audio.isVisible = false;
		this.fraction 	 		 = 0.8;
		this.checkScroll 		 = this.checkScroll.bind(this);
		this.init();
	}

	SplashAudio.prototype = {
		init: function () {
			this.checkScroll();
			window.addEventListener('scroll', this.checkScroll, false);
			window.addEventListener('resize', this.checkScroll, false);
		},

		checkScroll: function () {
			var x 		 = this.header.offsetLeft,
					y 		 = this.header.offsetTop,
					width  = this.header.offsetWidth,
					height = this.header.offsetHeight,
					right  = x + width,
					bottom = y + height,
					visibleX, visibleY, amountVisible;

			visibleX = Math.max(0, Math.min(width, window.pageXOffset + window.innerWidth - x, right - window.pageXOffset));
			visibleY = Math.max(0, Math.min(height, window.pageYOffset + window.innerHeight - y, bottom - window.pageYOffset));

			amountVisible = visibleX * visibleY / (width * height);

			if (!this.header.isVisible && amountVisible > this.fraction) {
				this.play();
			} else if (amountVisible === 0) {
				this.stop();
			}
		},

		play: function () {
			this.audio.play();
			this.audio.isVisible = true;
		},

		stop: function () {
			this.audio.pause();
			this.audio.currentTime = 0;
			this.audio.isVisible = false;
		},
	};

	function SetNavBg(nav) {
		this.nav = nav;
		this.checkScroll = this.checkScroll.bind(this);
		this.init();
	}

	SetNavBg.prototype = {
		isAtZero: function () {
			return window.pageYOffset === 0;
		},

		init: function () {
			this.initialCheck();
			window.addEventListener('scroll', this.checkScroll, false);
		},

		initialCheck: function () {
			this.wasAtZero = this.isAtZero();
			if (!this.wasAtZero) {
				this.nav.classList.remove('top');
			}
		},

		checkScroll: function () {
			var addOrRemove = this.getAddOrRemove(),
					isAtZero		= this.isAtZero();
			if (isAtZero !== this.wasAtZero) {
				this.nav.classList[addOrRemove]('top');
				this.wasAtZero = isAtZero;
			}
		},

		getAddOrRemove: function () {
			return this.wasAtZero ? 'remove' : 'add';
		}
	};

	// App.videoPlayer = new VideoPlayer(document.querySelectorAll(".play-on-scroll"));
	App.splashAudio = new SplashAudio(document.querySelector("header"), document.querySelector("audio#splash-audio"));
	App.setNavBg = new SetNavBg(document.getElementById('nav'))

	return App;
}({}));