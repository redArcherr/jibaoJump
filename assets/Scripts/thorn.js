import global from './global'
cc.Class({
    extends: cc.Component,

    properties: {
        
    },
    onLoad:function(){
        global.event.on("moveGo",this.moveGo.bind(this));
        this.fatherNode=this.node.parent;
    },  
    moveGo:function(){
        if(this.node){
            let move=cc.moveBy(0.2,cc.v2(0,140));
            this.node.runAction(move);
            if(this.node.y>this.fatherNode.height/2){
                this.node.destroy();
            }
        } 
    }
});
