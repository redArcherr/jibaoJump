import global from './global'
cc.Class({
    extends: cc.Component,

    properties: {
        
    },
    onLoad:function(){
        cc.director.preloadScene("game",(err)=>{
            if(err){
                cc.log("load scene: "+err);
            }else{
                cc.log("load scene game");
            }
        });
        global.gameStart="start";
        global.share(20,"天逆");
    },
    buttonClick:function(event,coustomData){
      cc.director.loadScene("game");
    }

});
