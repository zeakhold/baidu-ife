var queue = [],
    speed = 500,
    container = $('.container'),
    controller = $("form"),
    elementAmount = 0,
    initElementAmount = 30;

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
        case "selectionSort":
            selectionSort(queue);
            break;
        case "quickSort":
            quickSort(queue, 0, queue.length - 1);
            break;
        case "insertionSort":
            insertionSort(queue);
            break;
        case "mergeSort":
            queue = mergeSort(queue);
            draw();
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

function draw(elemActive) {
    $('.container').innerHTML =
        queue.map(function (num, index) {
            if (index == elemActive) {
                return "<div class='elem elem-active' style='height:" + 3 * num + "px'>" + num + "</div>";
            } else {
                return "<div class='elem' style='height:" + 3 * num + "px'>" + num + "</div>";
            }
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
    //for (var i = 0; i < len - 1; i++) {
    //    for (var j = len - 1; j >= i; j--) {
    //        if (array[j - 1] > array[j]) {
    //            temp = array[j];
    //            array[j] = array[j - 1];
    //            array[j - 1] = temp;
    //        }
    //    }
    //}
    //draw();

    //2、适配本需求的写法
    if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
        var len = array.length, temp, i = 0;
        var timer = setInterval(function () {
            if (i >= len) {
                clearInterval(timer);
                return;
            }
            for (var j = len - 1; j >= i; j--) {
                if (array[j - 1] > array[j]) {
                    temp = array[j];
                    array[j] = array[j - 1];
                    array[j - 1] = temp;
                }
            }

            draw(i);
            i++;
        }, speed);

        return array;
    } else {
        return '数组出现错误！';
    }

}


//选择排序
function selectionSort(array) {

    //1、一般写法
    //var len = array.length, temp,minIndex;
    //for (var i = 0; i < len - 1; i++) {
    //    minIndex = i;
    //    for (var j = i +1;j < len;j++) {
    //        if(array[minIndex] > array[j]) {
    //            minIndex = j;
    //        }
    //    }
    //    if(minIndex != i) {
    //        temp = array[i];
    //        array[i] = array[minIndex];
    //        array[minIndex] = temp;
    //    }
    //}
    //draw();

    //2、适配本需求的写法
    if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
        var len = array.length, temp, minIndex, i = 0;
        var timer = setInterval(function () {
            if (i >= len) {
                draw();
                clearInterval(timer);
                return;
            }
            minIndex = i;
            for (var j = i + 1; j < len; j++) {
                if (array[minIndex] > array[j]) {
                    minIndex = j;
                }
            }

            draw(minIndex);

            if (minIndex != i) {
                temp = array[i];
                array[i] = array[minIndex];
                array[minIndex] = temp;
            }
            i++;
        }, speed);
    } else {
        return 'array is not an Array!';
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

    //2、适配本需求的写法——有bug!!
    //if (left < right) {
    //    var x = array[right], i = left - 1, temp, timer, j = left;
    //    timer = setInterval(function () {
    //        if (j > right) {
    //            clearInterval(timer);
    //            return;
    //        }
    //        if (array[j] <= x) {
    //            i++;
    //            temp = array[i];
    //            array[i] = array[j];
    //            array[j] = temp;
    //        }
    //        j++;
    //        draw();
    //    }, 500)
    //
    //    quickSort(array, left, i - 1);      //左半数组继续递归调用，继续排序
    //    quickSort(array, i + 1, right);     //右半数组继续递归调用，继续排序
    //}
    //draw();


}


// 插入排序(直接插入排序)
function insertionSort(array) {

    //1、一般写法
    //var len = array.length;
    //for (var i = 1; i < len; i++) {
    //    var key = array[i];
    //    var j = i - 1;
    //    while (j >= 0 && array[j] > key) {
    //        array[j + 1] = array[j];
    //        j--;
    //    }
    //    array[j + 1] = key;
    //}
    //draw();

    //2、适配本需求的写法
    if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
        var i = 1, len = array.length;
        var timer = setInterval(function () {
            if (i >= len) {
                draw();
                clearInterval(timer);
                return;
            }
            var key = array[i];
            draw(i);
            var j = i - 1;
            while (j >= 0 && array[j] > key) {
                array[j + 1] = array[j];
                j--;
            }
            array[j + 1] = key;
            i++;
        }, speed);
    } else {
        return 'array is not an Array!';
    }

}

//归并排序
function mergeSort(array)
{
    if (array.length == 1)
    {
        return array;
    }
    var middle = Math.floor(array.length / 2),
        left = array.slice(0, middle),
        right = array.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right)
{
    var result = [];
    while (left.length > 0 && right.length > 0)
    {
        if (left[0] < right[0])
        {
            result.push(left.shift());
        }
        else
        {
            result.push(right.shift());
        }
    }
    return result.concat(left).concat(right);
}













