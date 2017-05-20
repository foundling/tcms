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
const menu = MenuWidget(blessed, data.lists[0].name, data.toItems(0));

screen.key(['q', 'Q', 'escape','C-c'], function() {
    process.exit(0);
});



frame.append(menu);
screen.append(frame);

screen.on('element press', function(el, {index, value}) {
    console.log(index,value);
});

menu.focus();

screen.render();
