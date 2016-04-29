var queue = [];
var speed = 100;
var container = $('.container');
var controller = $("form");
var elementAmount = 0;
var initElementAmount = 50;

/* 简化选择器 */
function $(elem) {
    return document.querySelector(elem);
}

init();

EventUtil.addHandler(controller, "click", function (event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    switch (target.id) {
        case "leftInButton":
            lefIn();
            break;
        case "rightInButton":
            rightIn();
            break;
        case "leftOutButton":
            leftOut();
            break;
        case "rightOutButton":
            rightOut();
            break;
        case "bubbleSort":
            bubbleSort(queue);
            break;
        case "insertionSort":
            insertionSort(queue);
            break;
        case "selectionSort":
            selectionSort(queue);
            break;
        case "quickSort":
            quickSort(queue);
            break;
        case "shellSort":
            shellSort(queue,p,r);
            break;
        default:
            break;
    }
});

function init() {
    queue = [];
    for (var i = 0; i < initElementAmount; i++) {
        queue.push(Math.floor(10 + Math.random() * 90));
    }
    elementAmount = initElementAmount;
    draw();
}

function draw() {
    $('.container').innerHTML =
        queue.map(function (num) {
            return "<div class='elem' style='height:" + 3 * num + "px'>" + num + "</div>";
        }).join('');
}

function lefIn() {
    if (getInputText()) {
        queue.unshift(getInputText());
        draw();
    }
}

function rightIn() {
    if (getInputText()) {
        queue.push(getInputText());
        draw();
    }
}

function leftOut() {
    if (container.childNodes.length) {
        alert("你删除的元素是：" + queue.shift());
    } else {
        alert("已经没有元素可供删除！");
    }
    draw();
}

function rightOut() {
    if (container.childNodes.length) {
        alert("你删除的元素是：" + queue.pop());
    } else {
        alert("已经没有元素可供删除！");
    }
    draw();
}

function getInputText() {
    var text = document.getElementsByClassName("textArea")[0].value;
    if (text != null && text != "") {
        if (isNaN(text) || text < 10 || text > 100) {
            alert("请输入在10-100之间的数字！");
        } else {
            if (elementAmount > 59) {
                alert("数量限制，添加失败。\r\r 您试图添加的数字是: " + text);
            } else {
                return text;
            }
        }

    } else {
        alert("请输入一个数字！");
        return false;
    }
}

