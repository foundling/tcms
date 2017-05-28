let tree;

function init(data) {

    this.tree = new Node({

        parent: null, 
        children: [], 

        // for now, data is a string, the user prompt
        data: data.name

    });

    // store current pointer
    this.nodePtr = this.tree;

    buildTree(data, this.tree);

}

function Node(parent, children=[], data) {

    this.parent = parent;
    this.children = children;
    this.data = data;

}

function buildTree(dataPtr, treePtr) {
    
    if (dataPtr.data) {

        dataPtr.data.forEach(function(item) {

            let newNode = new Node(treePtr, [], item.name);
            treePtr.children.push(newNode);
            buildTree(item,newNode);

        });

    }

}

function walkTree(cb) {

    let treePtr = this.tree;
    if (treePtr.children.length) {

        treePtr.children.forEach(function(child) {
            cb(child.data);
            walkTree(child, cb);
        });

    }

}

function fromNode(cb) {

    return cb(this.nodePtr);

}

function toMenuData(node) {

    let menuTitle = node.data;
    let menuItems = node.children.map(child => child.data);

    return {
        menuTitle,
        menuItems
    };

}

module.exports = {

    init,
    walkTree,
    fromNode

};
