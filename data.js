const data = {
    lists: [
        {
            name: 'vsts stories',
            items: [
                {
                    name: 'make video page mobile accessible',
                    complete: false
                }, 
                {
                    name: 'fix video navigation bug',
                    complete: false
                }, 
                {
                    name: 'make motivations page editable',
                    complete: false
                } 
            ]
        }
    ],
    toItems: function(index) {
        return data.lists[index].items.map(item =>  item.name);
    }
}; 

module.exports = exports = data;
