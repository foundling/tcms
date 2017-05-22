let tree;
let totalCalls = 0; 

function init(data) {

    tree = node({

        parent: null, 
        children: [], 

        // for now, data is a string, the user prompt
        data: data.name

    });

    buildTree(data, tree);
    return tree;

}

function node(parent, children=[], data) {

    return {

        parent,
        children,
        data

    };

}

function buildTree(dataPtr, treePtr) {
    
    if (dataPtr.data) {

        dataPtr.data.forEach(function(item) {
            let newNode = node(treePtr, [], item.name);
            treePtr.children.push(newNode);
            buildTree(item,newNode);
            return totalCalls += 1;

        });

    }

}

function walkTree(tree, cb) {

    if (tree.children.length) {

        tree.children.forEach(function(child) {
            cb(child.data);
            walkTree(child, cb);
        });

    }

}

function get(node, cb) {

    return cb(node);

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
    get

};
