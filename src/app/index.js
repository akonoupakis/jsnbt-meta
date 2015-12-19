var app = null;

module.exports = {

    domain: 'meta',

    init: function (application) {
        app = application;
    },

    getName: function () {
        return require('../../package.json').name;
    },

    getVersion: function () {
        return require('../../package.json').version;
    },

    getConfig: function () {
        return require('../cfg/config.js');
    },

    view: {

        preparse: function (server, ctx, preparsingContext, next) {

            ctx.db.settings.getCached({
                domain: 'meta'
            }, function (err, results) {
                if (err) {
                    next(preparsingContext);
                }
                else {
                    var settings = results.length > 0 ? results[0] : undefined;

                    var title = preparsingContext.model.meta.title;
                    if (!title || title === '')
                        title = settings && settings.data && settings.data.defaults && settings.data.defaults.title && settings.data.defaults.title[preparsingContext.model.language];

                    if (title) {

                        var allowed = true;

                        for (var i = 0; i < preparsingContext.model.params.length; i++) {
                            var parameter = preparsingContext.model.params[i];
                            if (parameter.name === 'page') {
                                var nodeId = parameter.content;

                                var restrictedNodeIds = settings && settings.data && settings.data.title && settings.data.title.restrictedNodes;
                                if (typeof (restrictedNodeIds) === 'object' && typeof (restrictedNodeIds.indexOf) === 'function') {
                                    if (restrictedNodeIds.indexOf(nodeId) !== -1)
                                        allowed = false;
                                }
                            }
                        }

                        if (allowed) {
                            var separator = settings && settings.data && settings.data.title && settings.data.title.separator || '';

                            if (separator === '')
                                separator = ' ';
                            else
                                separator = ' ' + separator + ' ';

                            var prefix = settings && settings.data && settings.data.title && settings.data.title.prefix && settings.data.title.prefix[preparsingContext.model.language];
                            var suffix = settings && settings.data && settings.data.title && settings.data.title.suffix && settings.data.title.suffix[preparsingContext.model.language];

                            if (prefix) {
                                title = prefix + separator + title;
                            }
                            if (suffix) {
                                title = title + separator + suffix;
                            }
                        }
                    }

                    preparsingContext.model.meta.title = title;

                    if (!preparsingContext.model.meta.description || preparsingContext.model.meta.description === '') {
                        preparsingContext.model.meta.description = settings && settings.data && settings.data.defaults && settings.data.defaults.description && settings.data.defaults.description[preparsingContext.model.language];
                    }

                    if (!preparsingContext.model.meta.keywords || typeof (preparsingContext.model.meta.keywords) !== 'object' || (typeof (preparsingContext.model.meta.keywords) === 'object' && preparsingContext.model.meta.keywords.length === 0)) {
                        preparsingContext.model.meta.keywords = settings && settings.data && settings.data.defaults && settings.data.defaults.keywords && settings.data.defaults.keywords[preparsingContext.model.language];
                    }
                    
                    next(preparsingContext);
                }
            });


        },

        postparse: function (server, ctx, postparsingContext, next) {
            next(postparsingContext);
        }

    }

};