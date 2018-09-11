import global from './global'
cc.Class({
    extends: cc.Component,

    properties: {
        playerNode:{
            default:null,
            type:cc.Node
        },
        thornPrefab:{
            default:null,
            type:cc.Prefab
        },
        jumpSound:{
            default:null,
            type:cc.AudioClip
        },
        deadSound:{
            default:null,
            type:cc.AudioClip
        },
        coinSound:{
            default:null,
            type:cc.AudioClip
        },
        stonPrefabs:{
            default:[],
            type:cc.Prefab
        },
        wallWidth:80, //墙厚度
        thorn_duration:140,//障碍间隔
        thornCount:0 //障碍数量
    },

    onLoad:function(){
        cc.audioEngine.setEffectsVolume(0.2);
        this.thornCount=0;
        global.stones=[];//初始化获得宝石
        global.stonePrefab=this.stonPrefabs;//把宝石预制体给global
        this.node.width=this.node.parent.width;
        this.onTouchEvent(this.node);
        this.playerNode.position=cc.v2(-this.node.width/2+this.wallWidth,this.node.height/2-175);
        for(let i=0;i<8;i++){
            this.spanThorn();
        }
        global.event.on("bump",this.bump.bind(this));
        global.event.on("coin",this.getCoin.bind(this));
    },
    
    //注册点击事件
    onTouchEvent:function(node){
        node.on(cc.Node.EventType.TOUCH_START,(event)=>{
            let touchPosX=event.getLocation().x;
            touchPosX > node.width/2 ? this.playerGo("right") : this.playerGo("left");
            global.event.fire("moveGo");
            this.spanThorn();
        });
    },
    //主角动作
    playerGo:function(direct){
        let moveJump,moveGo,sequence;
        cc.audioEngine.playEffect(this.jumpSound,false);
        if(direct==="left"){
            moveGo=cc.moveTo(0.1,cc.v2(-this.node.width/2+this.wallWidth+30,this.playerNode.y));
            moveJump=cc.moveTo(0.2,cc.v2(-this.node.width/2+this.wallWidth,this.playerNode.y));
            sequence=cc.sequence(moveGo,moveJump);
            this.playerNode.scaleX===1?this.playerNode.runAction(sequence):this.playerNode.runAction(moveJump);
            this.playerNode.scaleX=1;
           
        }
        if(direct==="right"){
            moveGo=cc.moveTo(0.1,cc.v2(this.node.width/2-this.wallWidth-30,this.playerNode.y));
            moveJump=cc.moveTo(0.2,cc.v2(this.node.width/2-this.wallWidth,this.playerNode.y));
            sequence=cc.sequence(moveGo,moveJump);
            this.playerNode.scaleX===-1?this.playerNode.runAction(sequence):this.playerNode.runAction(moveJump);
            this.playerNode.scaleX=-1;
        }   
    },
    //障碍及宝石
    spanThorn:function(){
        this.thornCount++;
        let randomSton=Math.random(),thorn;
        if(randomSton>0.1){
            thorn=cc.instantiate(this.thornPrefab);
        }else{
            thorn=cc.instantiate(this.stonPrefabs[Math.floor(Math.random()*3)]);
        }
        thorn.parent=this.node;
        let rand=Math.random();
        rand > 0.5 ? thorn.scaleX = 1 : thorn.scaleX = -1;
        thorn.position=this.spanThornPos(rand);
        
    },
    spanThornPos:function(rand){
        let thornX,thornY;
        rand > 0.5 ? thornX=this.node.width/2-this.wallWidth : thornX=-this.node.width/2+this.wallWidth; 
        this.thornCount <= 8 ? thornY=(this.node.height/2)-(this.thorn_duration*this.thornCount)-this.thorn_duration:
        thornY=(this.node.height/2)-(this.thorn_duration*8)-this.thorn_duration;
        return cc.v2(thornX,thornY);
    },
    //刺穿
    bump:function(){
        cc.audioEngine.playEffect(this.deadSound,false);
        cc.director.loadScene("over");
    },
    //获得宝石
    getCoin:function(){
        cc.audioEngine.playEffect(this.coinSound,false);
    }

});
