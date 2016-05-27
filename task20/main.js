var queue = [],
    container = $('.container'),
    controller = $("form"),
    initElementAmount = 18;

/* 简化选择器 */
function $(elem) {
    return document.querySelector(elem);
}


EventUtil.addHandler(controller, "click", function (event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    switch (target.id) {
        case "randomBox":
            randomBox();
            break;
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
        case "searchButton":
            search(queue);
            break;
        default:
            break;
    }
});

function randomBox() {
    queue = [];
    for (var i = 0; i < initElementAmount; i++) {
        var text = "" + Math.random().toString(16).substring(2);
        queue.push(text);
    }
    draw();
}

function draw() {
    container.innerHTML =
        queue.map(function (text) {
            return "<div class='elem'>" + text + "</div>";
        }).join('');
}

function lefIn() {
    getInputText().map(function (elems) {
        queue.unshift(elems);
    }).join('');
    draw();
}

function rightIn() {
    getInputText().map(function (elems) {
        queue.push(elems);
    }).join('');
    draw();
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
    var text = $("#textArea").value;
    if (text != null && text != "") {
        return text.replace(/[\n\r\s\,\.\、\，]+/g, " ").split(" ");
    } else {
        alert("请输入内容！");
        return false;
    }
}

function search(queue) {
    var searchText = $("#searchText").value;
    if (searchText != null && searchText != "") {
        container.innerHTML =
            queue.map(function (text) {
                text = text.replace(new RegExp(searchText,'g'),"<span class='selected'>" + searchText + "</span>");
                return "<div class='elem'>" + text + "</div>";
            }).join('');
    } else {
        alert("请输入内容！");
        return false;
    }

}









