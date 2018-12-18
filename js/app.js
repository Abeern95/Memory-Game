   // allCardsList
  let allCardsList = ["bicycle", "bicycle", "leaf","leaf", "cube", "cube", "anchor", "anchor", "paper-plane-o", "paper-plane-o", "bolt", "bolt", "bomb", "bomb", "diamond", "diamond"], 

  // Variables
    seconds = 0,
    moves = 0,
    wait = 500,
	cardsMatch = 0,
    currentTime,
	openCards = [],
    totalCards = allCardsList.length / 2,


    // selectors
    $scorePan = $('.score-panel'),
	$moves = $('.moves'),
    $rate = $('.fa-star'),
    $board = $('.board'),
    $container = $('.container'),
    $restart = $('.restart'),
    $timer = $('.timer'),
    // Scoring system
    stars3 = 15,
    stars2 = 20,
    star1 = 30;

    // Shuffling function
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

   // Start the Game
function init() {


    let cards = shuffle(allCardsList);
    $board.empty();


    cardsMatch = 0;
    moves = 0;
    $moves.text('0');


    for (let i = 0; i < cards.length; i++) {
        $board.append($('<li class="card"><i class="fa fa-' + cards[i] + '"></i></li>'))
    }
    addCardListener();

    resetTimer(currentTime);
    seconds = 0;
    $timer.text(`${seconds}`)
    initTime();
}

// Scoring
function rate(moves) {
    let rate = 3;
    if (moves > stars3 && moves < stars2) {
        $rate.eq(3).removeClass('fa-star').addClass('fa-star-o');
    } else if (moves > stars2 && moves < star1) {
        $rate.eq(2).removeClass('fa-star').addClass('fa-star-o');
		rate = 2;
    } else if (moves > star1) {
        $rate.eq(1).removeClass('fa-star').addClass('fa-star-o');
        rate = 1;
    }
    return { score: rate };
}

function gameOver(moves, score) {
    $('#winnerText').text(`You did a total of ${moves} moves in ${seconds} seconds. Your score is ${score}. Well done!`);
    $('#congratModal').modal('toggle');
}

$restart.bind('click', function (confirmed) {
    if (confirmed) {
        $rate.removeClass('fa-star-o').addClass('fa-star');
        init();
    }
});


let addCardListener = function () {

    $board.find('.card').bind('click', function () {
        let $this = $(this);

        if ($this.hasClass('show') || $this.hasClass('cardsMatch')) { return true; }

        let card = $this.context.innerHTML;
        $this.addClass('open show');
        openCards.push(card);

        if (openCards.length > 1) {
            if (card === openCards[0]) {
                $board.find('.open').addClass('cardsMatch');
                setTimeout(function () {
                    $board.find('open').removeClass('open show');
                }, wait);
                cardsMatch++;

            } else {
                $board.find('.open').addClass('notcardsMatch');
                setTimeout(function () {
                    $board.find('.open').removeClass('open show');
                }, wait / 1);
            }

            openCards = [];

            moves++;

            rate(moves);

            $moves.html(moves);
        }

        if (totalCards === cardsMatch) {
            rate(moves);
            let score = rate(moves).score;
            setTimeout(function () {
                gameOver(moves, score);
            }, 500);
        }
    });
}

function initTime() {
    currentTime = setInterval(function () {
        $timer.text(`${seconds}`)
        seconds = seconds + 1
    }, 1000);
}

function resetTimer(timer) {
    if (timer) {
        clearInterval(timer);
    }
}

init();