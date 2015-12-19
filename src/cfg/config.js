module.exports = {
    
    sections: [{
        name: 'meta',
        roles: ['sa']
    }],

    scripts: [{
        name: 'admin-app',
        items: [
            '/admin/js/meta/app/main.js',
            '/admin/js/meta/app/controllers/MetaController.js'
        ]
    }]

};