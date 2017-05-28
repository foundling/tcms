const blessed = require('blessed');
const screen = blessed.screen({
    smartCSR: true
});
const frame = blessed.text({

    parent: screen,
    top: 'center',
    left: 'center',
    width: '80%',
    height: '80%',
    cursor: {
        shape: 'line'
    }

}); 
const data = require('./data');
const MenuWidget = require('./widgets/menu');

let tree = require('./tree');

tree.init(data);
let { 

    menuTitle, 
    menuItems 

} = tree.fromNode(getTitleAndMenuItems);
let menuWidget = MenuWidget(blessed, menuTitle, menuItems);

frame.append(menuWidget);
screen.append(frame);


// this catches a user-emitted event from list items
// so the signature seems to be not right with screen.on
screen.key(['q', 'Q', 'escape','C-c'], quit);
screen.on('element select', handleListSelection);
menuWidget.focus();
screen.render();


// hoisted and loaded first

function getTitleAndMenuItems(node) {

    return {

        menuTitle: node.data,
        menuItems: node.children.map(child => child.data)

    };

}

function handleListSelection (el) {

    // resume here. this is a mess
    let index = el.selected;
    let menuData = tree.fromNode(node => {
        return node.children[index];
        treePtr.children[ index ];
    });

    let { menuTitle, menuItems } = tree.get(menuData, getTitleAndMenuItems);
    let [ titleWidget, listWidget ] = menuWidget.children;

    titleWidget.setContent(menuTitle);
    listWidget.setItems(menuItems);

    screen.render();

}

function quit() {
    process.exit(0);
}
