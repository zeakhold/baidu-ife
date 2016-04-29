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
    //
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

//插入排序
function insertionSort(array) {

}

//选择排序
function selectionSort(array) {

}
//快速排序
function quickSort(array) {

}
//希尔排序
function shellSort(array,p,r) {

}
//堆排序
function heapSort(array) {

}
//归并排序
function mergeSort(array,p,r) {

}






//这个可以用来设置休眠时间，有bug慎用~
function sleep(numberMillis) {
    var now = new Date(),
        exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return this;
    }
}