/*
  Component for an invidual comment
*/

const moment = require('moment');
const PlayerUIComponent = require('./../lib/player_ui_component');
const Utils = require('./../lib/utils');

const templateName = 'comment';

module.exports = class Comment extends PlayerUIComponent {
  constructor(data, player) {
    super(player);
    this.commentList = data.commentList;
    this.id = data.id || this.componentId;
    this.meta = data.meta;
    this.body = data.body;
    this.reply = data.reply;
    this.timestamp = moment(data.meta.datetime).unix();
    this.timeSince = this.timeSince();

    this.$el = $(this.render());
  }

  // Serialize data
  get data() {
    return {
      id: this.id,
      meta: this.meta,
      body: this.body,
      reply: this.reply
    };
  }

  get HTML() {
    return this.$el[0].outerHTML;
  }

  render() {
    return this.renderTemplate(templateName, {
      id: this.id,
      body: this.body,
      meta: this.meta,
      reply: this.reply,
      timeSince: this.timeSince
    });
  }

  // Return time since comment timestamp
  timeSince() {
     moment().locale('ar');
     
     const number = moment(this.meta.datetime).fromNow().replace(/\D/g, '');
     const text = moment(this.meta.datetime).fromNow().replace(/[0-9]/g, '').replace("years ago", " سنوات")
     .replace('months ago',"أشهر").replace('a few seconds ago',"ثواني").replace('a day ago',"يوم").replace('days ago',"يوم").replace('in minutes',"ثانيه")
     const final = `منذ ${number} ${text}`;
    
    return final
    // return moment(this.meta.datetime).fromNow()
  }

  teardown(destroy = false) {
    super.teardown(destroy);
  }

  // Return a Comment obj given body content and plugin reference
  static newFromData(body, commentList, plugin) {
    const data = this.dataObj(body, plugin);
    data.commentList = commentList;
    return new Comment(data, plugin.player);
  }

  // Return an object with plugin data, timestamp, unique id, and body content
  static dataObj(body, plugin) {
    return {
      meta: { datetime: moment().toISOString(), ...plugin.meta },
      id: Utils.guid(),
      body
    };
  }

  
};
