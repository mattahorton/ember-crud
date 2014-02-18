window.App = Ember.Application.create({
    LOG_TRANSITIONS: true 
});

App.ApplicationAdapter = DS.LSAdapter;

// router initialization
App.Router.map(function(){
    this.resource('users', function(){
        this.resource('user', { path:'/:user_id' }, function(){
            this.route('edit');
        });
        this.route('create');
    });
});

// users route
App.UsersRoute = Em.Route.extend({
    model: function(){
        return this.store.find('user');
    }
});

// users create route
App.UsersCreateRoute = Ember.Route.extend({
    model: function(){
        // the model for this router is a new empty Ember.Object
        return Em.Object.create({});
    },
    
    // in this case (the create route), we can reuse the user/edit template
    // associated with the usersCreateController
    renderTemplate: function(){
        this.render('user.edit', {
            controller: 'usersCreate'
        });
    }
});

// index route
App.IndexRoute = Ember.Route.extend({
    redirect: function(){
        this.transitionTo('users');
    }
});

// user route
App.UserRoute = Ember.Route.extend({
  model: function(params) { 
    return this.store.find('user', params.user_id);
  }
});

App.UserEditRoute = Ember.Route.extend({
  model: function(){ 
    return this.modelFor('user');
  }
});

App.UsersController = Em.ArrayController.extend({
    sortProperties: ['name'],
    sortAscending: true, // false = descending
    
    usersCount: function(){
        return this.get('model.length');
    }.property('@each')
});

App.UserController = Ember.ObjectController.extend({
    deleteMode: false, 
    actions: {
        edit: function(){
            this.transitionToRoute('user.edit');
        },
      
        delete: function(){
            // our delete method now only toggles deleteMode's value
            this.toggleProperty('deleteMode');
        },
        
        cancelDelete: function(){
            // set deleteMode back to false
            this.set('deleteMode', false);
        },
    
        confirmDelete: function(){
            // this tells Ember-Data to delete the current user
            this.get('model').deleteRecord();
            this.get('model').save();
            // and then go to the users route
            this.transitionToRoute('users');
            // set deleteMode back to false
            this.set('deleteMode', false);
        }
    }
});

App.UserEditController = Ember.ObjectController.extend({
  actions: {
    save: function(){
      var user = this.get('model');
      // this will tell Ember-Data to save/persist the new record
      user.save();
      // then transition to the current user
      this.transitionToRoute('user', user);
    }
  }
});

App.UsersCreateController = Ember.ObjectController.extend({
  actions: {
    save: function(){
      // just before saving, we set the creationDate
      this.get('model').set('creationDate', new Date());

      // create a record and save it to the store
      var newUser = this.store.createRecord('user', this.get('model'));
      newUser.save();

      // redirects to the user itself
      this.transitionToRoute('user', newUser);
    }
  }
});

// the model for a user
App.User = DS.Model.extend({
    name         : DS.attr(),
    email        : DS.attr(),
    bio          : DS.attr(),
    avatarUrl    : DS.attr(),
    creationDate : DS.attr()
});
        
// FIXTURE data
App.User.FIXTURES = [{
    id: 1,
    name: 'Sponge Bob',
    email: 'bob@sponge.com',
    bio: 'Lorem ispum dolor sit amet in voluptate fugiat nulla pariatur.',
    avatarUrl: '../assets/images/avatars/sb.jpg',
    creationDate: '2013-08-26'
}, {
    id: 2,
    name: 'John David',
    email: 'john@david.com',
    bio: 'Lorem ispum dolor sit amet in voluptate fugiat nulla pariatur.',
    avatarUrl: '../assets/images/avatars/jk.jpg',
    creationDate: '2013-08-07'
}];

Ember.Handlebars.helper('formatDate', function(date) {
    return moment(date).fromNow();
});