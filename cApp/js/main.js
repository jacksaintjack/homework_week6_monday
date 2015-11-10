var App = {};
App.Models = {};
App.Collections = {};
App.Views = {};

//Model and Collection
App.Models.Blog = Backbone.Model.extend({
  url:'http://tiny-starburst.herokuapp.com/collections/posts',
  default: {
    _id: '',
    title: '',
    body: ''
	},
});

App.Collections.Blog = Backbone.Collection.extend({
  url:'http://tiny-starburst.herokuapp.com/collections/posts',
  model: App.Models.Blog
})

//Views
App.Views.Blog = Backbone.View.extend({
  template: _.template($('#blogPost').html()),


  send: function(){
    var title = $('#title').val();
    var body = $('#body').val();
    var newPost = new App.Models.Blog({
      title: title,
      body: body
    });
    newPost.save();
  },

  render: function(){
    var userData = this.collection.toJSON();
    this.$el.html(this.template({
      userData: userData
    }));
    return this;
  }


});

App.Views.BlogView = Backbone.View.extend({
  template: _.template($('#blogView').html()),

  render: function(){
    var blogs = this.collection.toJSON();
    this.$el.html(this.template({
      blogs: blogs
    }));
    return this;
  }

});



// Router
App.Router = Backbone.Router.extend({
  routes: {
    '': 'blog',
    'blogView': 'blogView'
  },

  blog: function(){
    var collection = new App.Collections.Blog();
    var view = new App.Views.Blog({
      collection: collection
    });

    collection.fetch({
      success: function(){
        view.render();
        $('#mainArea').html(view.$el);
      }
    })
  },

  blogView: function(){
    var collection = new App.Collections.Blog();
    var view = new App.Views.BlogView({
      collection: collection
    });

    collection.fetch({
      success: function(){
        view.render();
        $('#mainArea').html(view.$el);
      }
    })
  }

});

App.router = new App.Router();
Backbone.history.start();
