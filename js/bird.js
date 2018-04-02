$(function() {
	var startPage = $(".startPage");
	var gamePage = $(".gamePage");
	var mainScore = $(".mainScore");
	var bird = $(".bird");
	var endPage = $(".endPage");
	var endScore = $(".endScore");
	var regame = $(".regame");
	var onclickMusic = $('.onclickMusic')[0];
	var passMusic = $('.passMusic')[0];
	var gameoverMusic = $('.gameoverMusic')[0];
	var score = 0;
	var wallSpeed = 150;
	var birdSpeed = 30;
	var wallWidth = 100;
	var wallTimer;
	var birdTimer;
	startPage.click(function() {
		$(this).css('display', 'none');
		clearInterval(wallTimer);
		clearInterval(birdTimer);
		startGame();
	});
	regame.click(function() {
		clearInterval(wallTimer);
		clearInterval(birdTimer);
		endPage.css('display', 'none');
		score = 0;
		mainScore.text(score);
		startGame();
	});
	gamePage.click(function() {
		onclickMusic.play();
		var birdTop = $(bird).offset().top - birdSpeed * 4;
		bird.css({
			"top": birdTop + "px"
		});
	});

	function startGame() {
		wallTimer = setInterval(function() {
			createWall();
			wallMove();
		}, 1700);
		bird.css({
			"top": 200 + "px"
		});
		birdTimer = setInterval(function() {
			var birdTop = $(bird).offset().top + birdSpeed;
			bird.css({
				"top": birdTop + "px"
			});
			if(bird.offset().top > 840 || bird.offset().top < 0) {
				gameoverMusic.play();
				console.log("小鸟掉下去了")
				$('.wall').remove();
				endPage.css({
					"display": "block"
				});
				score = Math.floor(score);
				endScore.text(score);
				clearInterval(wallTimer);
				clearInterval(birdTimer);
				score = 0;
			};
			if($('.wall').index() > 0) {
				if($('.wall').eq(0).offset().left < bird.offset().left + bird.width() && $('.wall').eq(0).offset().left > bird.offset().left) {
					if(bird.offset().top < $('.wallTop').eq(0).height()) {
						gameoverMusic.play();
						console.log("小鸟撞上墙了");
						$('.wall').remove();
						endPage.css({
							"display": "block"
						});
						score = Math.floor(score);
						endScore.text(score);
						clearInterval(wallTimer);
						clearInterval(birdTimer);
						score = 0;

					} else if(bird.offset().top > gamePage.height()-$('.wallBottom').eq(0).height()){
						gameoverMusic.play();
						console.log("小鸟撞下墙了");
						$('.wall').remove();
						endPage.css({
							"display": "block"
						});
						score = Math.floor(score);
						endScore.text(score);
						clearInterval(wallTimer);
						clearInterval(birdTimer);
						score = 0;

					} else {
						passMusic.play();
						console.log("过去一个")
						score += 0.25;
						mainScore.text(Math.floor(score));

					}
				}
			}

		}, 100);

	}

	function createWall() {
		var wallTopHeight = Math.floor(Math.random() * (startPage.height() - 350));
		var wallBottomHeight = (startPage.height() - 350) - wallTopHeight;
		var wallTop = document.createElement('div');
		var wallBottom = document.createElement("div");
		$(wallTop).addClass('wall wallTop');
		$(wallBottom).addClass('wall wallBottom');
		$(wallTop).css({
			"width": wallWidth + "px",
			"height": wallTopHeight + "px",
			"background-color": "green",
			"position": "absolute",
			"left": '85%',
			"top": "0"
		});
		$(wallBottom).css({
			"width": wallWidth + "px",
			"height": wallBottomHeight + "px",
			"background-color": "green",
			"position": "absolute",
			"left": '85%',
			"bottom": "0"
		});
		gamePage.append(wallTop);
		gamePage.append(wallBottom);
	};

	function wallMove() {
		$('.wall').animate({
			"left": -100 + "px"
		}, 3000, 'linear', function() {
			$(this).remove();
		})
	};
})
