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
        case "quickSort":
            quickSort(queue, 0, queue.length - 1);
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

//冒泡排序
function bubbleSort(array) {

    //1、一般写法
    //var len = array.length, temp;
    //for (var i = 0; i < len; i++) {
    //    for (var j = i + 1; j <= len; j++) {
    //        if (array[i] > array[j]) {
    //            temp = array[j];
    //            array[j] = array[i];
    //            array[i] = temp;
    //        }
    //    }
    //}

    //2、适配本需求的写法
    if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
        var len = array.length, temp, i = 0;
        var runSorting = setInterval(function () {
            if (i >= len) {
                clearInterval(runSorting);
                return;
            }
            for (var j = i + 1; j < len; j++) {
                if (array[j] < array[i]) {
                    temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }
            }

            draw();
            i++;
        }, speed);

        return array;
    } else {
        return '数组出现错误！';
    }

}


//快速排序
function quickSort(array, left, right) {

    //1、一般写法
    if (left < right) {
        var x = array[right], i = left - 1, temp;
        //for循环使左半数组所有元素小于右半数组
        for (var j = left; j <= right; j++) {
            if (array[j] <= x) {
                i++;
                temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
        quickSort(array, left, i - 1);      //左半数组继续递归调用，继续排序
        quickSort(array, i + 1, right);     //右半数组继续递归调用，继续排序
    }
    draw();

}









