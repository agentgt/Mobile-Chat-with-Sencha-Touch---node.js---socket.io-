#!/bin/bash
O="js/build/app.all.new.js"

#js/lib/socket.io.js

read -r -d '' FILES <<-'EOF' 
js/lib/ext.util.md5.js
js/index.js
js/lib/App.util.Socketio.js
js/conrollers/Controller.Viewport.js
js/conrollers/Controller.Chat.js
js/conrollers/Controller.Config.js
js/models/Model.ChatMessage.js
js/models/Model.Config.js
js/stores/Store.Chat.js
js/stores/Store.Config.js
js/views/View.Viewport.js
js/views/View.Config.js
js/views/View.Chat.js
EOF
#echo $FILES
(echo $FILES | xargs cat) > $O
