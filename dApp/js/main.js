var App = {};
App.Models = {};
App.Collections = {};
App.Views = {};

//Model and Collection
App.Models.Url = Backbone.Model.extend({
  default: {
    url: '',
    title: '',
    tag: '',
	},
});

App.Collections.Urls = Backbone.Collection.extend({
  model: App.Models.Url
})

//Views
App.Views.Url = Backbone.View.extend({
  template: _.template($('#urlFav').html()),

  events: {
    'click #mrButton': 'clickHandler'
  },

  send: function(){
    var url = $('#url').val();
    var title = $('#title').val();
    var tag = $('#tag').val();

    if (url.trim() === '') {
      alert('Add Your First Name');
      return;
    }

    if (title.trim() === '') {
      alert('Add your last Name');
      return;
    }

    if (tag.trim() === '') {
      alert('Add Your Address');
      return;
    }

    var newPost = new App.Models.Url({
      url: url,
      title: title,
      tag: tag
    });
    newPost.save();
  },

  render: function(){
    var userData = this.collection.toJSON();
    this.$el.html(this.template({
      userData: userData
    }));
    return this;
  },

  clickHandler: function(event){
    event.preventDefault();
    this.send();
    console.log("I've been Clicked");
  }

});

// Router
App.Router = Backbone.Router.extend({
  routes: {
    '': 'blog',
    'blogView': 'blowView'
  },

  blog: function(){
    var collection = new App.Collections.Urls();
    var view = new App.Views.Url({
      collection: collection
    });

    collection.fetch({
      success: function(){
        view.render();
        $('#mainArea').html(view.$el);
      }
    })

  },
});

App.router = new App.Router();
Backbone.history.start();
