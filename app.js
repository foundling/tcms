const blessed = require('blessed');
const data = require('./data');
const MenuWidget = require('./widgets/menu');
const logger = require('./logger')('log.txt');
const screen = blessed.screen({
    smartCSR: true
});
const frame = blessed.text({

    parent: screen,
    top: 'center',
    left: 'center',
    width: '80%',
    height: '80%',

}); 

let menu = MenuWidget(blessed, data.lists[0].name, data.toItems(0));

screen.key(['q', 'Q', 'escape','C-c'], function() {
    process.exit(0);
});

frame.append(menu);
screen.append(frame);

screen.on('element press', function(el, { index }) {
    menu.destroy();
    menu = MenuWidget(blessed, 'test', ['one','two','three']);
    frame.append(menu);
    screen.render();
});

menu.focus();
screen.render();
