module.exports = exports = function(blessed, menuTitle, menuItems) {

    const menuContainer = blessed.box({
        top: 'center',
        left: 'center',
        height: '100%',
        width: '100%'
    });

    const listTitle = blessed.text({
        parent: menuContainer,
        top: 0,
        left: 0,
        height: '10%',
        width: '100%',
        content: menuTitle 
    });

    const tasklist = blessed.list({
        parent: menuContainer,
        keys: true,
        top: '10%',
        left: 0,
        mouse: true,
        width: '100%',
        height: '90%',
        style: {
            bg: 'white',
            fg: 'black',
            selected: {
                fg: 'green',
                bg: 'black'
            }
        },
        items: menuItems
    });

    menuContainer.focus = function() {
        tasklist.focus();
    }


    menuContainer.append(listTitle);
    menuContainer.append(tasklist);

    return menuContainer;

};
