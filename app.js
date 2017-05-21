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
let { menuTitle, menuItems } = tree.get(menuData, getTitleAndMenuItems);
let menu = MenuWidget(blessed, menuTitle, menuItems);

function getTitleAndMenuItems(node) {
    return {
        menuTitle: node.data,
        menuItems: node.children.map(child => child.data)
    };
}

function nextWindow({ menuTitle, menuItems }) {

    return MenuWidget(blessed, menuTitle, menuItems); 

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

screen.on('element select', function(el) {

    menuData = menuData.children[ el.selected ];
    let { menuTitle, menuItems } = tree.get(menuData, getTitleAndMenuItems);
    let [ titleWidget, listWidget ] = menu.children;
    titleWidget.setContent(menuTitle);
    listWidget.setItems(menuItems);
    screen.render();

});

menu.focus();
screen.render();
