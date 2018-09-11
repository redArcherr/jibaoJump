import global from './global'
cc.Class({
    extends: cc.Component,

    properties: {
        bagScroll:{
            default:null,
            type:cc.Node
        },
        bagBtn:{
            default:null,
            type:cc.Node
        },
        bagLinePrefab:{
            default:null,
            type:cc.Prefab
        },
        bagItemPrefab:{
            default:null,
            type:cc.Prefab
        },
        textScroll:{
            default:null,
            type:cc.Node
        }
    },

    onLoad:function(){
        cc.loader.loadRes("./stonConfig",(err,result)=>{
            if(err){
                cc.log("load config:"+err);
            }else{
                this.stonText=result.json; 
                //cc.log(this.stonText.config[0].text);
            }
        });
        cc.director.preloadScene("game");
        this.bagData = global.stones;
        this.bagScroll.position = this.bagBtn.position;
        this.bagScroll.scale=0.01;
        this.bagItemCreat();
        this.closeText();  
    },
    buttonClick:function(){
        cc.director.loadScene("game");
    },
    bagButtonClick:function(){
        let move = cc.moveTo(0.2,cc.v2(0,0));
        let scale = cc.scaleTo(0.2,1);
        let spawn = cc.spawn(move,scale);
        this.bagScroll.runAction(spawn);
    },
    closeButtonClick:function(){
        let move = cc.moveTo(0.2,this.bagBtn.position);
        let scale = cc.scaleTo(0.2,0.01);
        let spawn = cc.spawn(move,scale);
        this.bagScroll.runAction(spawn);
    },
    //背包
    bagItemCreat:function(){
        let contentNode=cc.find("Canvas/indexBg/bagScroll/view/content");
        for(let i=0;i<Math.ceil(this.bagData.length/4);i++){
            let bagline=cc.instantiate(this.bagLinePrefab);
            bagline.parent=contentNode;
            for(let j=0;j<4;j++){ 
                if(this.bagData[i*4+j]){
                    let bagItem=cc.instantiate(this.bagItemPrefab);
                    bagItem.parent=bagline;
                    let ston=cc.instantiate(global.stonePrefab[this.bagData[i*4+j][0]]);
                    ston.parent=bagItem;
                    ston.idx=this.bagData[i*4+j][0];
                    ston.count=this.bagData[i*4+j][1];
                    this.bagStonTouchEvent(ston);
                }
            }
        }
    },
    bagStonTouchEvent:function(node){
        node.on(cc.Node.EventType.TOUCH_START,(event)=>{
            cc.log("种类："+node.idx+" 数量："+node.count);
            this.showText(node.idx);
        });
    },
    showText:function(idx){
        this.textScroll.position=cc.v2(0,0);
        let textNode=cc.find("Canvas/indexBg/textMask/view/content/textLable");
        let text=textNode.getComponent(cc.Label);
        text.string=this.stonText.config[idx].text;
    },
    closeText:function(){
        this.textScroll.position=cc.v2(-1000,-1000);
    }
});
