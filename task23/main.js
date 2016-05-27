var rootNode = $('.container').childNodes[1],
    controller = $('.controller'),
    search = $('#search'),
    nodes = [],
    timer = null,
    speed = 200;

function $(elem) {
    return document.querySelector(elem);
}

EventUtil.addHandler(controller, "click", function (event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    switch (target.id) {
        case "traverseDF":
            reset();
            traverseDF(rootNode);
            changeColor(getInputText(search));
            break;
        case "traverseBF":
            reset();
            traverseBF(rootNode);
            changeColor(getInputText(search));
            break;
        default:
            break;
    }
});

function traverseDF(node) {
    nodes.push(node);
    for (var i = 0, len = node.children.length; i < len; i++) {
        traverseDF(node.children[i]);
    }
}

function traverseBF(node) {
    var queue = [],
        currentNode = node;
    nodes.push(currentNode);
    while (currentNode) {
        for (var i = 0, len = currentNode.children.length; i < len; i++) {
            queue.push(currentNode.children[i]);
        }
        currentNode = queue.shift();
        if (currentNode) {
            nodes.push(currentNode);
        }
    }
}

function changeColor(keyword) {
    var keyword = keyword || null;
    var len = nodes.length, i = 0;

    timer = setInterval(function () {
        if (i >= len) {
            if (!(nodes[i - 1].firstChild.nodeValue.trim() == keyword)) {
                nodes[i - 1].className = "node";
            }
            clearInterval(timer);
            return;
        }
        var currentStr = nodes[i].firstChild.nodeValue.trim();
        if (!(currentStr == keyword)) {
            nodes[i].className = "node node-active";
            if (i > 0 && !(nodes[i - 1].firstChild.nodeValue.trim() == keyword)) {
                nodes[i - 1].className = "node";
            }
        } else {
            nodes[i].className = "node node-matching";
            if (i > 0  && !(nodes[i - 1].firstChild.nodeValue.trim() == keyword)) {
                nodes[i - 1].className = "node";
            }
        }
        i++;
    }, speed);

}

function reset() {
    nodes.forEach(function (ele) {
        ele.className = "node";
    })
    nodes = [];
    clearInterval(timer);
}

function getInputText(ele) {
    var inputText = ele.value.trim();
    return inputText;
}