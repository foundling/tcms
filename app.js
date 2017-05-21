const blessed = require('blessed');
let MenuWidget = require('./widgets/menu');
const data = require('./data');
let tree = require('./tree');

const screen = blessed.screen({
    smartCSR: true
});

let menuData = tree.init(data);
let { 

    menuTitle, 
    menuItems 

} = tree.get(menuData, getTitleAndMenuItems);
let menuWidget = MenuWidget(blessed, menuTitle, menuItems);

// this catches a user-emitted event from list items
// so the signature seems to be not right
screen.on('element select', function(el) {

    let index = el.selected;
    menuData = menuData.children[ index ];

    let { menuTitle, menuItems } = tree.get(menuData, getTitleAndMenuItems);
    let [ titleWidget, listWidget ] = menuWidget.children;

    titleWidget.setContent(menuTitle);
    listWidget.setItems(menuItems);

    screen.render();

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

frame.append(menuWidget);
screen.append(frame);

screen.key(['q', 'Q', 'escape','C-c'], function() {
    process.exit(0);
});

menuWidget.focus();
screen.render();

function getTitleAndMenuItems(node) {

    return {

        menuTitle: node.data,
        menuItems: node.children.map(child => child.data)

    };

}

