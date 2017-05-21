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

const MenuWidget = require('./widgets/menu');
const data = require('./data');
const tree = require('./tree');

let menuData = tree.init(data);
function getTitleAndMenuItems(node) {

    return {

        menuTitle: node.data,
        menuItems: node.children.map(child => child.data)

    };

}

let { 

    menuTitle, 
    menuItems 

} = tree.get(menuData, getTitleAndMenuItems);

let menu = MenuWidget(blessed, menuTitle, menuItems);

function nextWindow({ newTitle, newItems }) {

    return MenuWidget(blessed, newTitle, newItems); 

}

function prevWindow(data) {

    let parent = data.parent;
    let { menuTitle, menuItems } = tree.get(menuData, getTitleAndMenuItems);

    return MenuWidget(blessed, menuTitle, menuItems);

}

screen.key(['q', 'Q', 'escape','C-c'], function() {
    process.exit(0);
});

frame.append(menu);
screen.append(frame);

// this catches a user-emitted event from list items
// so the signature seems to be not right
screen.on('element select', function(el) {

    let index = el.selected;
    menuData = menuData.children[ index ];

    let { menuTitle, menuItems } = tree.get(menuData, getTitleAndMenuItems);
    let [ titleWidget, listWidget ] = menu.children;

    titleWidget.setContent(menuTitle);
    listWidget.setItems(menuItems);

    screen.render();

});

menu.focus();
screen.render();
