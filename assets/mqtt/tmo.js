(function() {
	window.Main = {};
	Main.Page = (function() {
		var mosq = null;
		function Page() {
			var _this = this;
			mosq = new Mosquitto();

			$('#connect-button').click(function() {
				return _this.connect();
			});
			$('#disconnect-button').click(function() {
				return _this.disconnect();
			});
			$('#subscribe-button').click(function() {
				return _this.subscribe();
			});
			$('#unsubscribe-button').click(function() {
				return _this.unsubscribe();
			});
			$('#publish-button').click(function() {
				return _this.publish();
			});

			mosq.onconnect = function(rc){
				var p = document.createElement("p");
				p.innerHTML = "CONNACK " + rc;
				$("#traff").append(p);
			};
			mosq.ondisconnect = function(rc){
				var p = document.createElement("p");
				p.innerHTML = "Lost connection";
				$("#traff").append(p);
			};
			mosq.onmessage = function(topic, payload, qos){
				var p = document.createElement("p");
				p.innerHTML = "PUBLISH " + topic + " " + payload;
				$("#traff").append(p);
			};
		}
		Page.prototype.connect = function(){
			var url = "ws://mqtt.flyhub.org:9001";
			mosq.connect(url);
		};
		Page.prototype.disconnect = function(){
			mosq.disconnect();
		};
		Page.prototype.subscribe = function(){
			var topic = $('#sub-topic-text')[0].value;
			mosq.subscribe(topic, 0);
		};
		Page.prototype.unsubscribe = function(){
			var topic = $('#sub-topic-text')[0].value;
			mosq.unsubscribe(topic);
		};
		Page.prototype.publish = function(){
			var topic = $('#pub-topic-text')[0].value;
			var payload = $('#payload-text')[0].value;
			mosq.publish(topic, payload, 0);
		};
		return Page;
	})();
	$(function(){
		return Main.controller = new Main.Page;
	});
}).call(this);

