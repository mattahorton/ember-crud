window.App = Ember.Application.create({
    LOG_TRANSITIONS: true 
});

App.ApplicationAdapter = DS.FixtureAdapter;

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
  actions: {
    edit: function(){
      this.transitionToRoute('user.edit');
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