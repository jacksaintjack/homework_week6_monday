var App = {};
App.Models = {};
App.Collections = {};
App.Views = {};

//Model and Collection
App.Models.Blog = Backbone.Model.extend({
  url:'http://tiny-starburst.herokuapp.com/collections/posts',
  schema: {
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

  events: {
    'click #mrButton': 'clickHandler'
  },

  send: function(){
    // var title = this.$('.title').val();
    // var body = this.$('.body').val();
    var title = $('#title').val();
    var body = $('#body').val();
    var newPost = new App.Models.Blog({
      title: title,
      body: body
    });
    console.log(newPost);
    newPost.save();
  },

  render: function(){
    this.$el.html(this.template());
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
  },

  blog: function(){
    var view = new App.Views.Blog();
    view.render();
    $('#mainArea').html(view.$el);
  }
})

App.router = new App.Router();
Backbone.history.start();
