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