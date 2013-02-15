/*
 This file is part of Mibew Messenger project.
 http://mibew.org

 Copyright (c) 2005-2011 Mibew Messenger Community
 License: http://mibew.org/license.php
*/
(function(a){a.Objects.Models.Controls={};a.Objects.Models.Status={};var j=[],k=a.Application,l=k.module("Chat",{startWithParent:!1});l.addInitializer(function(c){var g=a.Objects,d=a.Objects.Models,b=a.Objects.Models.Controls,h=a.Objects.Models.Status,f=new a.Layouts.Chat({model:new Backbone.Model(c.layoutsData.chat||{})});a.Objects.chatLayout=f;k.mainRegion.show(f);d.thread=new a.Models.Thread(c.thread);d.user=new a.Models.ChatUser(c.user);d.page=new a.Models.Page(c.page);var e=new a.Collections.Controls;
d.user.get("isAgent")||(b.userName=new a.Models.UserNameControl({weight:220}),e.add(b.userName),b.sendMail=new a.Models.SendMailControl({weight:200,link:c.links.mailLink}),e.add(b.sendMail));d.user.get("isAgent")&&(b.redirect=new a.Models.RedirectControl({weight:200,link:c.links.redirectLink}),e.add(b.redirect),b.history=new a.Models.HistoryControl({weight:180,link:c.links.historyLink}),e.add(b.history));b.sound=new a.Models.SoundControl({weight:160});e.add(b.sound);b.refresh=new a.Models.RefreshControl({weight:140});
e.add(b.refresh);c.links.sslLink&&(b.secureMode=new a.Models.SecureModeControl({weight:120,link:c.links.sslLink}),e.add(b.secureMode));b.close=new a.Models.CloseControl({weight:100});e.add(b.close);g.Collections.controls=e;f.controlsRegion.show(new a.Views.ControlsCollection({collection:e}));h.message=new a.Models.StatusMessage({hideTimeout:5E3});h.typing=new a.Models.StatusTyping({hideTimeout:5E3});g.Collections.status=new a.Collections.Status([h.message,h.typing]);f.statusRegion.show(new a.Views.StatusCollection({collection:g.Collections.status}));
d.user.get("isAgent")||(d.avatar=new a.Models.Avatar,f.avatarRegion.show(new a.Views.Avatar({model:d.avatar})));g.Collections.messages=new a.Collections.Messages;d.messageForm=new a.Models.MessageForm(c.messageForm);f.messageFormRegion.show(new a.Views.MessageForm({model:d.messageForm}));f.messagesRegion.show(new a.Views.MessagesCollection({collection:g.Collections.messages}));d.sound=new a.Models.Sound;f.soundRegion.show(new a.Views.Sound({model:d.sound}));j.push(g.server.callFunctionsPeriodically(function(){var b=
a.Objects.Models.thread,c=a.Objects.Models.user;return[{"function":"update",arguments:{"return":{typing:"typing",canPost:"canPost"},references:{},threadId:b.get("id"),token:b.get("token"),lastId:b.get("lastId"),typed:c.get("typing"),user:!c.get("isAgent")}}]},function(b){b.errorCode?a.Objects.Models.Status.message.setMessage(b.errorMessage||"refresh failed"):(b.typing&&a.Objects.Models.Status.typing.show(),a.Objects.Models.user.set({canPost:b.canPost||!1}))}))});l.addFinalizer(function(){a.Objects.chatLayout.close();
for(var c=0;c<j.length;c++)a.Objects.server.stopCallFunctionsPeriodically(j[c]);"undefined"!=typeof a.Objects.Models.avatar&&a.Objects.Models.avatar.finalize();a.Objects.Collections.messages.finalize();delete a.Objects.chatLayout;delete a.Objects.Models.thread;delete a.Objects.Models.user;delete a.Objects.Models.page;delete a.Objects.Models.avatar;delete a.Objects.Models.messageForm;delete a.Objects.Models.sound;delete a.Objects.Models.Controls;delete a.Objects.Models.Status;delete a.Objects.Collections.messages;
delete a.Objects.Collections.controls;delete a.Objects.Collections.status})})(Mibew);