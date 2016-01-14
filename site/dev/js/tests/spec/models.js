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
