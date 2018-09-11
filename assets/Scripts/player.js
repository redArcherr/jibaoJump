import global from './global'
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad:function(){
        cc.director.getCollisionManager().enabled = true;
    },
    onCollisionEnter: function (other,self){
        //障碍
        if(other.tag===0){
            //cc.log("碰到障碍");
            global.event.fire("bump");
        }else{
            //cc.log("角色碰到:"+other.tag);
            global.event.fire("coin");
            if(this.cheakStones(other.tag-1)!=true){
                global.stones.push([other.tag-1,+1]);
            }  
        }
    },
    cheakStones:function(idx){
        let stones=global.stones;  
        for(let i=0;i<stones.length;i++){
            if(stones[i][0]==idx){
                stones[i][1]=stones[i][1]+1;
                return true;
            }
        }
        return false;
    }

});
