const data = {

    name: 'vsts stories',
    callbacks: [],
    data: [
        {
            name: 'make video page mobile-accessible',
            callbacks: [],
            data: [
                {
                    name: 'options',
                    callbacks: [],
                    data: [
                        {
                            // should be able to toggle incomplete
                            name: 'mark complete',

                            // of course, this is the user space. in the application space, 
                            // there will be default callbacks that do general things such as
                            // edit, update, delete, etc 
                            callbacks: [],
                            data: null,
                        },
                        {
                            name: 'edit',
                            callbacks: [],
                            data: null 
                        },
                        {
                            name: 'delete',
                            callbacks: [],
                            data: null,
                        },
                    ]
                }
            ]
        }, 
        {
            name: 'fix video navigation bug',
            data: [
                {
                    name: 'leaf',
                    data: null
                }
            ]
        }, 
        {
            name: 'make motivations page editable',
            data: [
                {
                    name: 'leaf',
                    data: null
                }
            ]
        } 
    ]

};

module.exports = exports = data;
