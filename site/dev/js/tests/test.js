(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';



var spec = {
        models: require('./models.js'),
        views:  require('./views.js')
    };



document.addEventListener("DOMContentLoaded", function() {

    describe('Servers', function() {
        spec.models();

        spec.views();
    });

});
},{"./models.js":5,"./views.js":6}],2:[function(require,module,exports){
'use strict';



var Server = Backbone.Model.extend({
        defaults: {
            title: 'Server name',
            cpu:   'CPU',
            mem:   'Memory',
            state: 'State (started / stopped)'
        }
    });



module.exports = {
    Server: Server,


    Servers: Backbone.Collection.extend({
        model: Server,

        url:   '/servers',

        add_server: function(data) {
            var new_server = new Server(data);

            // adding the new model
            this.add(new_server);

            // saving it to the server which responds with an id
            new_server.save();
        }
    })
};
},{}],3:[function(require,module,exports){
this.JST = {"item_server": function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<td>' +
((__t = ( title  )) == null ? '' : __t) +
'</td>\r\n<td>' +
((__t = ( cpu   )) == null ? '' : __t) +
'</td>\r\n<td>' +
((__t = ( mem   )) == null ? '' : __t) +
'</td>\r\n<td>' +
((__t = ( state )) == null ? '' : __t) +
'</td>\r\n\r\n<td>\r\n    <button class="js_edit btn btn-info"><i class="fa fa-gears"></i> Edit</button>\r\n    <button class="js_delete btn btn-danger"><i class="fa fa-close"></i> Delete</button>\r\n</td>\r\n';

}
return __p
},
"no_servers": function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<td><h2>There are no servers in our list !</h2></td>\r\n<td></td>\r\n<td></td>\r\n<td></td>\r\n<td></td>';

}
return __p
},
"servers": function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h1>Servers</h1>\r\n\r\n<table>\r\n    <thead>\r\n        <tr>\r\n            <th>Name</th>\r\n            <th>CPU</th>\r\n            <th>MEM</th>\r\n            <th>state</th>\r\n            <th>action</th>\r\n        </tr>\r\n    </thead>\r\n\r\n    <tbody><!-- inserting collection children, here --></tbody>\r\n</table>\r\n\r\n<button class="js_create btn btn-success"><i class="fa fa-edit"></i> Create</button>\r\n\r\n<div class="popup">\r\n    <div class="content">\r\n        <button class="btn close"><i class="fa fa-close"></i></button>\r\n        <h3>Server info</h3>\r\n\r\n        <input type="hidden" class="id" value="0" />\r\n        <input type="text" class="title" placeholder="Name" required />\r\n        <input type="text" class="cpu" placeholder="CPU" required />\r\n        <input type="text" class="mem" placeholder="mem" required />\r\n        <label>\r\n            Started\r\n            <input type="radio" name="state" checked value="started" />\r\n        </label>\r\n        <label>\r\n            Stopped\r\n            <input type="radio" name="state" value="stopped" />\r\n        </label>\r\n\r\n        <button class="js_save btn btn-success">Save</button>\r\n    </div>\r\n</div>';

}
return __p
}};
},{}],4:[function(require,module,exports){
'use strict';



var template = require('./templates.js')['JST'],

    Server = Backbone.Marionette.ItemView.extend({
        tagName:  'tr',
        template: template.item_server,

        modelEvents: {
            'change': 'render'
        },

        triggers: {
            'click .js_edit':   'editing',
            'click .js_delete': 'deleted'
        }
    }),

    NoServers = Backbone.Marionette.ItemView.extend({
        tagName:  'tr',
        template: template.no_servers
    });



module.exports = {
    Servers: Backbone.Marionette.CompositeView.extend({
        childView:          Server,
        childViewContainer: 'tbody',
        emptyView:          NoServers,

        template: template.servers,

        ui: {
            popup:       '.popup',
            popup_close: '.popup .close',
            popup_id:    '.popup .id',
            popup_title: '.popup .title',
            popup_cpu:   '.popup .cpu',
            popup_mem:   '.popup .mem'
        },

        events: {
            'click @ui.popup_close': 'close_popup',
            'click .js_save':        'save_server_info',
            'click .js_create':      'open_popup'
        },

        childEvents: {
            'editing': 'edit_child',
            'deleted': 'delete_child'
        },


        edit_child: function(item_view) {
            this.ui.popup_id.val(item_view.model.get('id'));
            this.ui.popup_title.val(item_view.model.get('title'));
            this.ui.popup_cpu.val(item_view.model.get('cpu'));
            this.ui.popup_mem.val(item_view.model.get('mem'));
            this.ui.popup.find('input[type="radio"][value="' + item_view.model.get('state') + '"]').prop('checked', true);

            this.open_popup();
        },

        delete_child: function(item_view) {
                // waiting for the server to respond\
            item_view.model.destroy();
        },

        save_server_info: function() {
            var id         = this.ui.popup_id.val(),
                data       = {
                    title: this.ui.popup_title.val(),
                    cpu:   this.ui.popup_cpu.val(),
                    mem:   this.ui.popup_mem.val(),
                    state: this.ui.popup.find('input[name="state"]:checked').val()
                };

            if(id !== '0') { // updating a server
                this.collection.get(id).save(data);
                this.close_popup();
            } else {         // adding a new server
                this.collection.add_server(data);
                this.close_popup();
            }
        },


        open_popup: function() {
            this.ui.popup.show();
        },

        close_popup: function() {
            // clearing old data
            this.ui.popup_id.val(0);
            this.ui.popup_title.val('');
            this.ui.popup_cpu.val('');
            this.ui.popup_mem.val('');
            this.ui.popup.find('input[type="radio"][value="started"]').prop('checked', true);

            this.ui.popup.hide();
        },
    })
};
},{"./templates.js":3}],5:[function(require,module,exports){
'use strict';


var models = require('../../inc/models.js');


module.exports = function() {

    describe('modeling', function() {

        beforeEach(function () {
            // preventing ajax call on model manipulation (destroy, save, etc)
            Backbone.sync = function(method, model) {
                return false;
            }
        });

        it("should be able to create a collection", function() {
            var collection   = new models.Servers([
                    { id: 1,title: 'Server 1',cpu: '2 GHz',mem: '2 Gb', state: 'started' },
                    { id: 2, title: 'Server 2', cpu: '3 GHz', mem: '4 Gb', state: 'stopped'}
                ]);


            expect(collection.models.length).toEqual(2);
        });


        it("should be able to add a model to the collection", function() {
            var collection   = new models.Servers([
                    { id: 1,title: 'Server 1',cpu: '2 GHz',mem: '2 Gb', state: 'started' },
                    { id: 2, title: 'Server 2', cpu: '3 GHz', mem: '4 Gb', state: 'stopped'}
                ]);

            collection.add_server({ id: 3, title: 'Server 3', cpu: '3 GHz', mem: '6 Gb', state: 'started'});


            expect(collection.models.length).toEqual(3);
        });
    });
}

},{"../../inc/models.js":2}],6:[function(require,module,exports){
'use strict';


var models = require('../../inc/models.js'),
    views  = require('../../inc/views.js');


module.exports = function() {
    describe('rendering', function() {

        describe('when there is a collection', function() {
            it('should have children', function() {
                var collection   = new models.Servers([
                        { id: 1,title: 'Server 1',cpu: '2 GHz',mem: '2 Gb', state: 'started' },
                        { id: 2, title: 'Server 2', cpu: '3 GHz', mem: '4 Gb', state: 'stopped'}
                    ]),

                    servers_view = new views.Servers({collection: collection}),

                    rendered_view = servers_view.render().el;


                expect(rendered_view.querySelectorAll('tbody tr').length).toEqual(2);
            });
        });


        describe('when there is no collection', function() {
            beforeEach(function () {
                var collection   = new models.Servers(),

                    servers_view = new views.Servers({collection: collection});

                this.rendered_view = servers_view.render().el;
            });

            it('shouldn not have any children', function() {
                expect(this.rendered_view.querySelectorAll('tbody tr').length).toEqual(1);
            });

            it('should show empty template', function() {
                expect(this.rendered_view.querySelector('tbody tr h2').innerHTML).toEqual('There are no servers in our list !');
            });
        });
    });
}
},{"../../inc/models.js":2,"../../inc/views.js":4}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiZGV2XFxqc1xcdGVzdHNcXHNwZWNcXHNwZWMuanMiLCJkZXZcXGpzXFxpbmNcXG1vZGVscy5qcyIsImRldlxcanNcXGluY1xcdGVtcGxhdGVzLmpzIiwiZGV2XFxqc1xcaW5jXFx2aWV3cy5qcyIsImRldlxcanNcXHRlc3RzXFxzcGVjXFxtb2RlbHMuanMiLCJkZXZcXGpzXFx0ZXN0c1xcc3BlY1xcdmlld3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XHJcblxyXG5cclxuXHJcbnZhciBzcGVjID0ge1xyXG4gICAgICAgIG1vZGVsczogcmVxdWlyZSgnLi9tb2RlbHMuanMnKSxcclxuICAgICAgICB2aWV3czogIHJlcXVpcmUoJy4vdmlld3MuanMnKVxyXG4gICAgfTtcclxuXHJcblxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgZGVzY3JpYmUoJ1NlcnZlcnMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBzcGVjLm1vZGVscygpO1xyXG5cclxuICAgICAgICBzcGVjLnZpZXdzKCk7XHJcbiAgICB9KTtcclxuXHJcbn0pOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcblxyXG5cclxudmFyIFNlcnZlciA9IEJhY2tib25lLk1vZGVsLmV4dGVuZCh7XHJcbiAgICAgICAgZGVmYXVsdHM6IHtcclxuICAgICAgICAgICAgdGl0bGU6ICdTZXJ2ZXIgbmFtZScsXHJcbiAgICAgICAgICAgIGNwdTogICAnQ1BVJyxcclxuICAgICAgICAgICAgbWVtOiAgICdNZW1vcnknLFxyXG4gICAgICAgICAgICBzdGF0ZTogJ1N0YXRlIChzdGFydGVkIC8gc3RvcHBlZCknXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgU2VydmVyOiBTZXJ2ZXIsXHJcblxyXG5cclxuICAgIFNlcnZlcnM6IEJhY2tib25lLkNvbGxlY3Rpb24uZXh0ZW5kKHtcclxuICAgICAgICBtb2RlbDogU2VydmVyLFxyXG5cclxuICAgICAgICB1cmw6ICAgJy9zZXJ2ZXJzJyxcclxuXHJcbiAgICAgICAgYWRkX3NlcnZlcjogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgbmV3X3NlcnZlciA9IG5ldyBTZXJ2ZXIoZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAvLyBhZGRpbmcgdGhlIG5ldyBtb2RlbFxyXG4gICAgICAgICAgICB0aGlzLmFkZChuZXdfc2VydmVyKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNhdmluZyBpdCB0byB0aGUgc2VydmVyIHdoaWNoIHJlc3BvbmRzIHdpdGggYW4gaWRcclxuICAgICAgICAgICAgbmV3X3NlcnZlci5zYXZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufTsiLCJ0aGlzLkpTVCA9IHtcIml0ZW1fc2VydmVyXCI6IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJywgX19lID0gXy5lc2NhcGU7XG53aXRoIChvYmopIHtcbl9fcCArPSAnPHRkPicgK1xuKChfX3QgPSAoIHRpdGxlICApKSA9PSBudWxsID8gJycgOiBfX3QpICtcbic8L3RkPlxcclxcbjx0ZD4nICtcbigoX190ID0gKCBjcHUgICApKSA9PSBudWxsID8gJycgOiBfX3QpICtcbic8L3RkPlxcclxcbjx0ZD4nICtcbigoX190ID0gKCBtZW0gICApKSA9PSBudWxsID8gJycgOiBfX3QpICtcbic8L3RkPlxcclxcbjx0ZD4nICtcbigoX190ID0gKCBzdGF0ZSApKSA9PSBudWxsID8gJycgOiBfX3QpICtcbic8L3RkPlxcclxcblxcclxcbjx0ZD5cXHJcXG4gICAgPGJ1dHRvbiBjbGFzcz1cImpzX2VkaXQgYnRuIGJ0bi1pbmZvXCI+PGkgY2xhc3M9XCJmYSBmYS1nZWFyc1wiPjwvaT4gRWRpdDwvYnV0dG9uPlxcclxcbiAgICA8YnV0dG9uIGNsYXNzPVwianNfZGVsZXRlIGJ0biBidG4tZGFuZ2VyXCI+PGkgY2xhc3M9XCJmYSBmYS1jbG9zZVwiPjwvaT4gRGVsZXRlPC9idXR0b24+XFxyXFxuPC90ZD5cXHJcXG4nO1xuXG59XG5yZXR1cm4gX19wXG59LFxuXCJub19zZXJ2ZXJzXCI6IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJywgX19lID0gXy5lc2NhcGU7XG53aXRoIChvYmopIHtcbl9fcCArPSAnPHRkPjxoMj5UaGVyZSBhcmUgbm8gc2VydmVycyBpbiBvdXIgbGlzdCAhPC9oMj48L3RkPlxcclxcbjx0ZD48L3RkPlxcclxcbjx0ZD48L3RkPlxcclxcbjx0ZD48L3RkPlxcclxcbjx0ZD48L3RkPic7XG5cbn1cbnJldHVybiBfX3Bcbn0sXG5cInNlcnZlcnNcIjogZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICc8aDE+U2VydmVyczwvaDE+XFxyXFxuXFxyXFxuPHRhYmxlPlxcclxcbiAgICA8dGhlYWQ+XFxyXFxuICAgICAgICA8dHI+XFxyXFxuICAgICAgICAgICAgPHRoPk5hbWU8L3RoPlxcclxcbiAgICAgICAgICAgIDx0aD5DUFU8L3RoPlxcclxcbiAgICAgICAgICAgIDx0aD5NRU08L3RoPlxcclxcbiAgICAgICAgICAgIDx0aD5zdGF0ZTwvdGg+XFxyXFxuICAgICAgICAgICAgPHRoPmFjdGlvbjwvdGg+XFxyXFxuICAgICAgICA8L3RyPlxcclxcbiAgICA8L3RoZWFkPlxcclxcblxcclxcbiAgICA8dGJvZHk+PCEtLSBpbnNlcnRpbmcgY29sbGVjdGlvbiBjaGlsZHJlbiwgaGVyZSAtLT48L3Rib2R5PlxcclxcbjwvdGFibGU+XFxyXFxuXFxyXFxuPGJ1dHRvbiBjbGFzcz1cImpzX2NyZWF0ZSBidG4gYnRuLXN1Y2Nlc3NcIj48aSBjbGFzcz1cImZhIGZhLWVkaXRcIj48L2k+IENyZWF0ZTwvYnV0dG9uPlxcclxcblxcclxcbjxkaXYgY2xhc3M9XCJwb3B1cFwiPlxcclxcbiAgICA8ZGl2IGNsYXNzPVwiY29udGVudFwiPlxcclxcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBjbG9zZVwiPjxpIGNsYXNzPVwiZmEgZmEtY2xvc2VcIj48L2k+PC9idXR0b24+XFxyXFxuICAgICAgICA8aDM+U2VydmVyIGluZm88L2gzPlxcclxcblxcclxcbiAgICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBjbGFzcz1cImlkXCIgdmFsdWU9XCIwXCIgLz5cXHJcXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwidGl0bGVcIiBwbGFjZWhvbGRlcj1cIk5hbWVcIiByZXF1aXJlZCAvPlxcclxcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJjcHVcIiBwbGFjZWhvbGRlcj1cIkNQVVwiIHJlcXVpcmVkIC8+XFxyXFxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cIm1lbVwiIHBsYWNlaG9sZGVyPVwibWVtXCIgcmVxdWlyZWQgLz5cXHJcXG4gICAgICAgIDxsYWJlbD5cXHJcXG4gICAgICAgICAgICBTdGFydGVkXFxyXFxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJzdGF0ZVwiIGNoZWNrZWQgdmFsdWU9XCJzdGFydGVkXCIgLz5cXHJcXG4gICAgICAgIDwvbGFiZWw+XFxyXFxuICAgICAgICA8bGFiZWw+XFxyXFxuICAgICAgICAgICAgU3RvcHBlZFxcclxcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBuYW1lPVwic3RhdGVcIiB2YWx1ZT1cInN0b3BwZWRcIiAvPlxcclxcbiAgICAgICAgPC9sYWJlbD5cXHJcXG5cXHJcXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJqc19zYXZlIGJ0biBidG4tc3VjY2Vzc1wiPlNhdmU8L2J1dHRvbj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuPC9kaXY+JztcblxufVxucmV0dXJuIF9fcFxufX07IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHJcblxyXG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlcy5qcycpWydKU1QnXSxcclxuXHJcbiAgICBTZXJ2ZXIgPSBCYWNrYm9uZS5NYXJpb25ldHRlLkl0ZW1WaWV3LmV4dGVuZCh7XHJcbiAgICAgICAgdGFnTmFtZTogICd0cicsXHJcbiAgICAgICAgdGVtcGxhdGU6IHRlbXBsYXRlLml0ZW1fc2VydmVyLFxyXG5cclxuICAgICAgICBtb2RlbEV2ZW50czoge1xyXG4gICAgICAgICAgICAnY2hhbmdlJzogJ3JlbmRlcidcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB0cmlnZ2Vyczoge1xyXG4gICAgICAgICAgICAnY2xpY2sgLmpzX2VkaXQnOiAgICdlZGl0aW5nJyxcclxuICAgICAgICAgICAgJ2NsaWNrIC5qc19kZWxldGUnOiAnZGVsZXRlZCdcclxuICAgICAgICB9XHJcbiAgICB9KSxcclxuXHJcbiAgICBOb1NlcnZlcnMgPSBCYWNrYm9uZS5NYXJpb25ldHRlLkl0ZW1WaWV3LmV4dGVuZCh7XHJcbiAgICAgICAgdGFnTmFtZTogICd0cicsXHJcbiAgICAgICAgdGVtcGxhdGU6IHRlbXBsYXRlLm5vX3NlcnZlcnNcclxuICAgIH0pO1xyXG5cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIFNlcnZlcnM6IEJhY2tib25lLk1hcmlvbmV0dGUuQ29tcG9zaXRlVmlldy5leHRlbmQoe1xyXG4gICAgICAgIGNoaWxkVmlldzogICAgICAgICAgU2VydmVyLFxyXG4gICAgICAgIGNoaWxkVmlld0NvbnRhaW5lcjogJ3Rib2R5JyxcclxuICAgICAgICBlbXB0eVZpZXc6ICAgICAgICAgIE5vU2VydmVycyxcclxuXHJcbiAgICAgICAgdGVtcGxhdGU6IHRlbXBsYXRlLnNlcnZlcnMsXHJcblxyXG4gICAgICAgIHVpOiB7XHJcbiAgICAgICAgICAgIHBvcHVwOiAgICAgICAnLnBvcHVwJyxcclxuICAgICAgICAgICAgcG9wdXBfY2xvc2U6ICcucG9wdXAgLmNsb3NlJyxcclxuICAgICAgICAgICAgcG9wdXBfaWQ6ICAgICcucG9wdXAgLmlkJyxcclxuICAgICAgICAgICAgcG9wdXBfdGl0bGU6ICcucG9wdXAgLnRpdGxlJyxcclxuICAgICAgICAgICAgcG9wdXBfY3B1OiAgICcucG9wdXAgLmNwdScsXHJcbiAgICAgICAgICAgIHBvcHVwX21lbTogICAnLnBvcHVwIC5tZW0nXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZXZlbnRzOiB7XHJcbiAgICAgICAgICAgICdjbGljayBAdWkucG9wdXBfY2xvc2UnOiAnY2xvc2VfcG9wdXAnLFxyXG4gICAgICAgICAgICAnY2xpY2sgLmpzX3NhdmUnOiAgICAgICAgJ3NhdmVfc2VydmVyX2luZm8nLFxyXG4gICAgICAgICAgICAnY2xpY2sgLmpzX2NyZWF0ZSc6ICAgICAgJ29wZW5fcG9wdXAnXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY2hpbGRFdmVudHM6IHtcclxuICAgICAgICAgICAgJ2VkaXRpbmcnOiAnZWRpdF9jaGlsZCcsXHJcbiAgICAgICAgICAgICdkZWxldGVkJzogJ2RlbGV0ZV9jaGlsZCdcclxuICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgZWRpdF9jaGlsZDogZnVuY3Rpb24oaXRlbV92aWV3KSB7XHJcbiAgICAgICAgICAgIHRoaXMudWkucG9wdXBfaWQudmFsKGl0ZW1fdmlldy5tb2RlbC5nZXQoJ2lkJykpO1xyXG4gICAgICAgICAgICB0aGlzLnVpLnBvcHVwX3RpdGxlLnZhbChpdGVtX3ZpZXcubW9kZWwuZ2V0KCd0aXRsZScpKTtcclxuICAgICAgICAgICAgdGhpcy51aS5wb3B1cF9jcHUudmFsKGl0ZW1fdmlldy5tb2RlbC5nZXQoJ2NwdScpKTtcclxuICAgICAgICAgICAgdGhpcy51aS5wb3B1cF9tZW0udmFsKGl0ZW1fdmlldy5tb2RlbC5nZXQoJ21lbScpKTtcclxuICAgICAgICAgICAgdGhpcy51aS5wb3B1cC5maW5kKCdpbnB1dFt0eXBlPVwicmFkaW9cIl1bdmFsdWU9XCInICsgaXRlbV92aWV3Lm1vZGVsLmdldCgnc3RhdGUnKSArICdcIl0nKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm9wZW5fcG9wdXAoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkZWxldGVfY2hpbGQ6IGZ1bmN0aW9uKGl0ZW1fdmlldykge1xyXG4gICAgICAgICAgICAgICAgLy8gd2FpdGluZyBmb3IgdGhlIHNlcnZlciB0byByZXNwb25kXFxcclxuICAgICAgICAgICAgaXRlbV92aWV3Lm1vZGVsLmRlc3Ryb3koKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzYXZlX3NlcnZlcl9pbmZvOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGlkICAgICAgICAgPSB0aGlzLnVpLnBvcHVwX2lkLnZhbCgpLFxyXG4gICAgICAgICAgICAgICAgZGF0YSAgICAgICA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy51aS5wb3B1cF90aXRsZS52YWwoKSxcclxuICAgICAgICAgICAgICAgICAgICBjcHU6ICAgdGhpcy51aS5wb3B1cF9jcHUudmFsKCksXHJcbiAgICAgICAgICAgICAgICAgICAgbWVtOiAgIHRoaXMudWkucG9wdXBfbWVtLnZhbCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlOiB0aGlzLnVpLnBvcHVwLmZpbmQoJ2lucHV0W25hbWU9XCJzdGF0ZVwiXTpjaGVja2VkJykudmFsKClcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpZihpZCAhPT0gJzAnKSB7IC8vIHVwZGF0aW5nIGEgc2VydmVyXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxlY3Rpb24uZ2V0KGlkKS5zYXZlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZV9wb3B1cCgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgeyAgICAgICAgIC8vIGFkZGluZyBhIG5ldyBzZXJ2ZXJcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sbGVjdGlvbi5hZGRfc2VydmVyKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZV9wb3B1cCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIG9wZW5fcG9wdXA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLnVpLnBvcHVwLnNob3coKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjbG9zZV9wb3B1cDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIGNsZWFyaW5nIG9sZCBkYXRhXHJcbiAgICAgICAgICAgIHRoaXMudWkucG9wdXBfaWQudmFsKDApO1xyXG4gICAgICAgICAgICB0aGlzLnVpLnBvcHVwX3RpdGxlLnZhbCgnJyk7XHJcbiAgICAgICAgICAgIHRoaXMudWkucG9wdXBfY3B1LnZhbCgnJyk7XHJcbiAgICAgICAgICAgIHRoaXMudWkucG9wdXBfbWVtLnZhbCgnJyk7XHJcbiAgICAgICAgICAgIHRoaXMudWkucG9wdXAuZmluZCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdW3ZhbHVlPVwic3RhcnRlZFwiXScpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudWkucG9wdXAuaGlkZSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICB9KVxyXG59OyIsIid1c2Ugc3RyaWN0JztcblxuXG52YXIgbW9kZWxzID0gcmVxdWlyZSgnLi4vLi4vaW5jL21vZGVscy5qcycpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgICBkZXNjcmliZSgnbW9kZWxpbmcnLCBmdW5jdGlvbigpIHtcblxuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIHByZXZlbnRpbmcgYWpheCBjYWxsIG9uIG1vZGVsIG1hbmlwdWxhdGlvbiAoZGVzdHJveSwgc2F2ZSwgZXRjKVxuICAgICAgICAgICAgQmFja2JvbmUuc3luYyA9IGZ1bmN0aW9uKG1ldGhvZCwgbW9kZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KFwic2hvdWxkIGJlIGFibGUgdG8gY3JlYXRlIGEgY29sbGVjdGlvblwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBjb2xsZWN0aW9uICAgPSBuZXcgbW9kZWxzLlNlcnZlcnMoW1xuICAgICAgICAgICAgICAgICAgICB7IGlkOiAxLHRpdGxlOiAnU2VydmVyIDEnLGNwdTogJzIgR0h6JyxtZW06ICcyIEdiJywgc3RhdGU6ICdzdGFydGVkJyB9LFxuICAgICAgICAgICAgICAgICAgICB7IGlkOiAyLCB0aXRsZTogJ1NlcnZlciAyJywgY3B1OiAnMyBHSHonLCBtZW06ICc0IEdiJywgc3RhdGU6ICdzdG9wcGVkJ31cbiAgICAgICAgICAgICAgICBdKTtcblxuXG4gICAgICAgICAgICBleHBlY3QoY29sbGVjdGlvbi5tb2RlbHMubGVuZ3RoKS50b0VxdWFsKDIpO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIGl0KFwic2hvdWxkIGJlIGFibGUgdG8gYWRkIGEgbW9kZWwgdG8gdGhlIGNvbGxlY3Rpb25cIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgY29sbGVjdGlvbiAgID0gbmV3IG1vZGVscy5TZXJ2ZXJzKFtcbiAgICAgICAgICAgICAgICAgICAgeyBpZDogMSx0aXRsZTogJ1NlcnZlciAxJyxjcHU6ICcyIEdIeicsbWVtOiAnMiBHYicsIHN0YXRlOiAnc3RhcnRlZCcgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBpZDogMiwgdGl0bGU6ICdTZXJ2ZXIgMicsIGNwdTogJzMgR0h6JywgbWVtOiAnNCBHYicsIHN0YXRlOiAnc3RvcHBlZCd9XG4gICAgICAgICAgICAgICAgXSk7XG5cbiAgICAgICAgICAgIGNvbGxlY3Rpb24uYWRkX3NlcnZlcih7IGlkOiAzLCB0aXRsZTogJ1NlcnZlciAzJywgY3B1OiAnMyBHSHonLCBtZW06ICc2IEdiJywgc3RhdGU6ICdzdGFydGVkJ30pO1xuXG5cbiAgICAgICAgICAgIGV4cGVjdChjb2xsZWN0aW9uLm1vZGVscy5sZW5ndGgpLnRvRXF1YWwoMyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHJcbnZhciBtb2RlbHMgPSByZXF1aXJlKCcuLi8uLi9pbmMvbW9kZWxzLmpzJyksXHJcbiAgICB2aWV3cyAgPSByZXF1aXJlKCcuLi8uLi9pbmMvdmlld3MuanMnKTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgZGVzY3JpYmUoJ3JlbmRlcmluZycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBkZXNjcmliZSgnd2hlbiB0aGVyZSBpcyBhIGNvbGxlY3Rpb24nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaXQoJ3Nob3VsZCBoYXZlIGNoaWxkcmVuJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29sbGVjdGlvbiAgID0gbmV3IG1vZGVscy5TZXJ2ZXJzKFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogMSx0aXRsZTogJ1NlcnZlciAxJyxjcHU6ICcyIEdIeicsbWVtOiAnMiBHYicsIHN0YXRlOiAnc3RhcnRlZCcgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogMiwgdGl0bGU6ICdTZXJ2ZXIgMicsIGNwdTogJzMgR0h6JywgbWVtOiAnNCBHYicsIHN0YXRlOiAnc3RvcHBlZCd9XHJcbiAgICAgICAgICAgICAgICAgICAgXSksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlcnNfdmlldyA9IG5ldyB2aWV3cy5TZXJ2ZXJzKHtjb2xsZWN0aW9uOiBjb2xsZWN0aW9ufSksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcmVkX3ZpZXcgPSBzZXJ2ZXJzX3ZpZXcucmVuZGVyKCkuZWw7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGV4cGVjdChyZW5kZXJlZF92aWV3LnF1ZXJ5U2VsZWN0b3JBbGwoJ3Rib2R5IHRyJykubGVuZ3RoKS50b0VxdWFsKDIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIGRlc2NyaWJlKCd3aGVuIHRoZXJlIGlzIG5vIGNvbGxlY3Rpb24nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29sbGVjdGlvbiAgID0gbmV3IG1vZGVscy5TZXJ2ZXJzKCksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlcnNfdmlldyA9IG5ldyB2aWV3cy5TZXJ2ZXJzKHtjb2xsZWN0aW9uOiBjb2xsZWN0aW9ufSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlZF92aWV3ID0gc2VydmVyc192aWV3LnJlbmRlcigpLmVsO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdzaG91bGRuIG5vdCBoYXZlIGFueSBjaGlsZHJlbicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHRoaXMucmVuZGVyZWRfdmlldy5xdWVyeVNlbGVjdG9yQWxsKCd0Ym9keSB0cicpLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnc2hvdWxkIHNob3cgZW1wdHkgdGVtcGxhdGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGV4cGVjdCh0aGlzLnJlbmRlcmVkX3ZpZXcucXVlcnlTZWxlY3RvcigndGJvZHkgdHIgaDInKS5pbm5lckhUTUwpLnRvRXF1YWwoJ1RoZXJlIGFyZSBubyBzZXJ2ZXJzIGluIG91ciBsaXN0ICEnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSJdfQ==
