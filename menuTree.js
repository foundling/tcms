let data = require('./data');
let tree = node();
buildTree(data,tree);
walkTree(tree, console.log);

function node(parent, children=[], data) {
    return {
        parent,
        children,
        data
    };
}


function buildTree(dataPtr, treePtr) {
    
    if (dataPtr.items) {

        dataPtr.items.forEach(function(item) {
            let newNode = node(treePtr, [], item.name);
            treePtr.children.push(newNode);
            buildTree(item,newNode);
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

