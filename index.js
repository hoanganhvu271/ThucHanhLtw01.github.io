function scrollToQuestion(questionId) {
    // console.log(questionId);
    var element = document.getElementById(questionId);
    element.scrollIntoView({ behavior: 'smooth' });

}

function countDown() {

    var countdownDisplay = document.getElementById('test-time');
    var seconds = 60 * 60;

    countdownDisplay.textContent = "1:00:00";

    var countdownInterval = setInterval(function () {

        var minutes = Math.floor(seconds / 60);
        var remainingSeconds = seconds % 60;


        var timeString = minutes.toString().padStart(2, '0') + ':' + remainingSeconds.toString().padStart(2, '0');


        countdownDisplay.textContent = timeString;

        seconds--;

        if (seconds < 0) {
            clearInterval(countdownInterval);
            countdownDisplay.textContent = '00:00';
        }
    }, 1000);
}

function Choose(element) {
    var answerSelections = document.querySelectorAll('.' + element.classList[1]);
    // console.log(answerSelections.length);
    answerSelections.forEach(function (item) {
        item.classList.remove('selected');


    });
    element.classList.add('selected');
    element.parentNode.parentNode.classList.add('question-picked');
    var tmp = element.classList[1].split('-');
    turnOn('g' + tmp[1]);

}

function MultiChoose(element) {

    if (!element.classList.contains('selected')) {
        element.classList.add('selected');
        element.parentNode.parentNode.classList.add('question-picked');

        element.parentNode.parentNode.classList.add('question-picked');
        var tmp = element.classList[1].split('-');
        turnOn('g' + tmp[1]);
    }
    else {
        element.classList.remove('selected');
        var answerSelections = document.querySelectorAll('.' + element.classList[1]);

        var cnt = 0;
        for (var i = 0; i < answerSelections.length; i++) {
            if (answerSelections[i].classList.contains('selected')) {
                cnt++;
            }
        }
        if (cnt == 0) {
            element.parentNode.parentNode.classList.remove('question-picked');

            element.parentNode.parentNode.classList.add('question-picked');
            var tmp = element.classList[1].split('-');
            turnOff('g' + tmp[1]);
        }
    }


}

function turnOn(id) {
    // console.log(id);
    var tmp = document.getElementById(id);

    tmp.style.backgroundColor = 'green';

}

function turnOff(id) {
    var tmp = document.getElementById(id);
    tmp.style.backgroundColor = '#ad171c';
}

function changeInput(element) {
    var id = 'g' + element.split('-')[1];
    console.log(id);
    console.log(element);
    var input = document.getElementById(element);
    if (input.value.trim() === '') {
        document.getElementById(id).style.backgroundColor = '#ad171c';
    }
    else {
        document.getElementById(id).style.backgroundColor = 'green';
    }
}

function render() {
    document.getElementById('question-information').style.display = 'block';
    document.getElementById('question-container').style.display = 'block';
    document.getElementById('confirm-btn').style.display = 'none';

    //check-answer-box
    countDown();
    var quesInfor = document.getElementById('grid');

    for (var i = 1; i <= 4; i++) {
        var gridDiv = document.createElement('div');
        gridDiv.classList.add('row');
        gridDiv.id = 'row' + i;

        for (var j = 1; j <= 10; j++) {
            var cell = document.createElement('div');
            cell.classList.add('grid-item');

            cell.name = (10 * (i - 1) + (j));
            cell.id = 'g' + cell.name;
            cell.textContent = (10 * (i - 1) + (j));

            cell.onclick = function () {
                // console.log(this.name);
                scrollToQuestion(this.name);
            }
            gridDiv.appendChild(cell);
        }
        quesInfor.appendChild(gridDiv);
    }


    //question-container
    //part1:
    var part1 = document.getElementById('part-1');
    for (var i = 1; i <= 10; i++) {
        var content = document.createElement('div');
        content.classList.add('content');
        content.id = i;

        var question = document.createElement('div');
        question.classList.add('question');
        question.textContent = 'Câu ' + i + ':';

        var answer = document.createElement('div');
        answer.classList.add('answer');

        for (var j = 1; j <= 2; j++) {
            var tmp = document.createElement('div');
            tmp.classList.add('true-or-false');
            tmp.classList.add('c-' + i);
            if (j == 1) {
                tmp.textContent = 'Đúng';
            }
            else {
                tmp.textContent = 'Sai';
            }
            tmp.onclick = function () {
                Choose(this);
            }
            answer.appendChild(tmp);
        }
        content.appendChild(question);
        content.appendChild(answer);
        part1.appendChild(content);
    }

    //part2
    var part2 = document.getElementById('part-2');
    for (var i = 11; i <= 20; i++) {
        var content = document.createElement('div');
        content.classList.add('content');
        content.id = i;

        var question = document.createElement('div');
        question.classList.add('question');
        question.textContent = 'Câu ' + i + ':';

        var answer = document.createElement('div');
        answer.classList.add('answer');

        for (var j = 1; j <= 4; j++) {
            var tmp = document.createElement('div');
            tmp.classList.add('answer-selection');
            tmp.classList.add('c-' + i);

            tmp.textContent = String.fromCharCode(64 + j);

            tmp.onclick = function () {
                Choose(this);
            }
            answer.appendChild(tmp);
        }
        content.appendChild(question);
        content.appendChild(answer);
        part2.appendChild(content);
    }

    //part3

    var part3 = document.getElementById('part-3');
    for (var i = 21; i <= 30; i++) {
        var content = document.createElement('div');
        content.classList.add('content');
        content.id = i;

        var question = document.createElement('div');
        question.classList.add('question');
        question.textContent = 'Câu ' + i + ':';

        var answer = document.createElement('div');
        answer.classList.add('answer');

        for (var j = 1; j <= 4; j++) {
            var tmp = document.createElement('div');
            tmp.classList.add('answer-multi-selection');
            tmp.classList.add('c-' + i);

            tmp.textContent = String.fromCharCode(64 + j);

            tmp.onclick = function () {
                MultiChoose(this);
            }
            answer.appendChild(tmp);
        }
        content.appendChild(question);
        content.appendChild(answer);
        part3.appendChild(content);
    }

    // part4
    var part4 = document.getElementById('part-4');
    for (var i = 31; i <= 40; i++) {
        var content = document.createElement('div');
        content.classList.add('content');
        content.id = i;

        var question = document.createElement('div');
        question.classList.add('question');
        question.textContent = 'Câu ' + i + ':';

        var answer = document.createElement('div');
        answer.classList.add('answer');

        var input = document.createElement('textarea');
        input.cols = 70;
        input.rows = 3;
        input.id = 'c-' + i;
        input.onchange = function () {
            changeInput(this.id);
        }
        answer.appendChild(input);

        content.appendChild(question);
        content.appendChild(answer);
        part4.appendChild(content);
    }
}

function ClosePopUp(){
    document.getElementById('layer').style.display = 'none';
}

function OpenPopUp(){
  
    document.getElementById('layer').style.display = 'block';
    
    var result = document.getElementById('result');
    var popUp = document.getElementById('pop-up');
    result.textContent= "Bạn đã thực hiện " + CountAnswer() + "/40 câu hỏi khảo sát";

}

function CountAnswer() {
    var gridArray = document.querySelectorAll('.grid-item');

    var cnt = 0;
    for (var i = 0; i < gridArray.length; i++) {
        if (gridArray[i].style.backgroundColor === 'green') {
            cnt++;
        }
    }
    return cnt;
}