var rootNode = $('.root-node'),
    controller = $('.controller'),
    nodeArray = [],
    timer = null,
    speed = 500;

/* 简化选择器 */
function $(elem) {
    return document.querySelector(elem);
}


EventUtil.addHandler(controller, "click", function (event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    switch (target.id) {
        case "preOrder":
            reset();
            preOrder(rootNode);
            changeColor();
            break;
        case "inOrder":
            reset();
            inOrder(rootNode);
            changeColor();
            break;
        case "postOrder":
            reset();
            postOrder(rootNode);
            changeColor();
            break;
        default:
            break;
    }
});


function preOrder(node) {
    if (node != null) {
        nodeArray.push(node);
        preOrder(node.firstElementChild);
        preOrder(node.lastElementChild);
    }
}

function inOrder(node) {
    if (node != null) {
        inOrder(node.firstElementChild);
        nodeArray.push(node);
        inOrder(node.lastElementChild);
    }
}

function postOrder(node) {
    if (node != null) {
        postOrder(node.firstElementChild);
        postOrder(node.lastElementChild);
        nodeArray.push(node);
    }
}

function changeColor() {
    var len = nodeArray.length, i = 0;
    nodeArray[0].className = "node node-active";
    timer = setInterval(function () {
        i++;
        if (i >= len) {
            clearInterval(timer);
            nodeArray[len - 1].className = "node";
            return;
        }
        nodeArray[i-1].className = "node";
        nodeArray[i].className = "node node-active";
    }, speed);

}

function reset() {
    nodeArray = [];
    clearInterval(timer);
}

