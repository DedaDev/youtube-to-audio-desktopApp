let {ipcRenderer} = require('electron')
var app = new Vue({
    el: '#app',
    data: {src:"", 
        textbox: "",
        found: false,
        title: "asd"},
    methods : {
        updateURL : function (newSRC){
            this.src = newSRC
        },
        submit : function (){
            ipcRenderer.send('processURL',this.textbox)
        },
        frameControl : function(command){
            ipcRenderer.send('frameControl',command)
        }
    }
  })
ipcRenderer.on('stream', (event,args)=>{
    app.found = true;
    app.title = args.title
    app.updateURL(args.url)
})
