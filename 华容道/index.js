$ = {
    extend:function(target,obj){
        for(o in obj){
            target[o] = obj[o];
        }
    },
    clone:function(obj){
        var o = {};
        for(c in obj){
            o[c] = obj[c];
        }
        return o;
    }
};


/**
 * 定义人物属性及行为
 * @param p
 * @constructor
 */
var Persion = function(p){
    //人物的名称
    this.name = p.name;
    //人物占有的宽
    this.width = p.width;
    //人物占有的高
    this.height = p.height;
    //所在的行列，如果宽高不是1，则以左上角方块为准
    this.rc = p.rc;
    //责任链，当前人物无路可走时，下一个对象再尝试
    this.next = p.next;
    //暂时用不同颜色表示不同人物
    this.color = p.color;
    //保存运行轨迹，用来标志是否走过
    this.gjStack = [];
    //this.gjStack.push({"en":"none","zh":"原地","rc":this.rc});
};
Persion.prototype = {
    resetgjStack:function(){
      this.gjStack = [];
    },
    resetRc:function(){
        persions1 = [$.clone(cc), $.clone(hz), $.clone(gy)];
        //persions1 = [$.clone(cc), $.clone(mc), $.clone(zy), $.clone(hz), $.clone(gy), $.clone(zf), $.clone(xb1), $.clone(xb2), $.clone(xb3), $.clone(xb4)];
        //var persions1 = [$.clone(cc),$.clone(mc)];
        persions = persions1.concat([]);
    },
    /**
     * 通过人物的坐标以及宽高，计算该人物会占有哪些方块
     * @returns {Array}
     * @constructor
     */
    getZyrcArr:function(rc){
        if(!rc){
            rc = this.rc;
        }
        var zyrcArr = [];
        if(this.width == 1 && this.height == 1){
            zyrcArr.push(rc);
        }else{
            for(var w=0;w<this.width;w++){
                for(var h=0;h<this.height;h++){
                    zyrcArr.push(rc+10*h+1*w);
                }
            }
        }
        return zyrcArr;
    },
    //判断即将要走的某个方向是否超出了边界
    _isCj:function(direction){
        var rc = this.rc + direction.rc;
        var as = gameBox.as;
        var zyArr = this.getZyrcArr(rc);
        for(var i=0;i<zyArr.length;i++){
            var cjBoolean = true;
            for(var k=0;k<as.length;k++){
                if("rc"+zyArr[i]==as[k].id){
                    cjBoolean = false;
                }
            }
            if(cjBoolean){
                return cjBoolean;
            }
        }
        return false;
    },
    //判断即将要走的某个方向是否被其它人物占用
    _isBzy:function(direction){
        var rc = this.rc + direction.rc;
        var zzyArr = [];
        for(var i=0;i<persions.length;i++){
            if(persions[i].name != this.name){
                zzyArr = zzyArr.concat(persions[i].getZyrcArr());
            }
        }
        var as = zzyArr;
        var zyArr = this.getZyrcArr(rc);
        for(var i=0;i<zyArr.length;i++){
            for(var k=0;k<as.length;k++){
                if(zyArr[i]==as[k]){
                    return true;
                }
            }
        }
        return false;
    },
    //判断即将要走的某个方向是否走过
    _isZg:function(direction){
        var rc = this.rc + direction.rc;
        var gjArr = this.gjStack;
        for(var i=0;i<gjArr.length;i++){
            if(gjArr[i].rc==rc){
                return true;
            }
        }
        return false;
    },
    //判断当前人物能否移动到某个方向
    canMove:function(direction){
        var b = (!this._isCj(direction)) && (!this._isBzy(direction)) && (!this._isZg(direction));
        return b;
    },
    /**
     * 人物根据方向移动
     * @param direction
     */
    move:function(direction){
        /*只要某个对象移动了，其它对象可移动范围没有限制，只限制当前对象不能再回退*/
        for(var i=0;i<persions.length;i++){
            persions[i].resetgjStack();
        }
        this.rc += direction.rc;
        var obj = {};
        $.extend(obj,direction);
        obj.rc = this.rc;
        this.gjStack.push(obj);
    },
    /**
     * 撤销上次的移动
     */
    cxMove:function(){
        this.gjStack.pop();
        this.rc = this.gjStack[this.gjStack.length-1].rc;
    }
};

/**
 * 定义上右下左四个方向
 * @type {[null,null,null,null]}
 */
var directions = [{"en":"top","zh":"向上","rc":-10},{"en":"right","zh":"向右","rc":+1},{"en":"bottom","zh":"向下","rc":10},{"en":"left","zh":"向左","rc":-1}];

var cc = new Persion({
    name:"曹操",
    width:2,
    height:2,
    rc :12,
    color:"red",
    next:null
});
var mc = new Persion({
    name:"马超",
    width:1,
    height:2,
    rc :11,
    color:"green",
    next:cc
});
var zy = new Persion({
    name:"赵云",
    width:1,
    height:2,
    rc :14,
    color:"blue",
    next:mc
});
var hz = new Persion({
    name:"黄忠",
    width:1,
    height:2,
    rc :31,
    color:"pink",
    next:zy
});
var gy = new Persion({
    name:"关羽",
    width:2,
    height:1,
    rc :32,
    color:"yellow",
    next:hz
});
var zf = new Persion({
    name:"张飞",
    width:1,
    height:2,
    rc :34,
    color:"orange",
    next:gy
});
var xb1 = new Persion({
    name:"小兵1",
    width:1,
    height:1,
    rc :51,
    color:"#ccc",
    next:zf
});
var xb2 = new Persion({
    name:"小兵2",
    width:1,
    height:1,
    rc :42,
    color:"#ccc",
    next:xb1
});
var xb3 = new Persion({
    name:"小兵3",
    width:1,
    height:1,
    rc :43,
    color:"#ccc",
    next:xb2
});
var xb4 = new Persion({
    name:"小兵4",
    width:1,
    height:1,
    rc :54,
    color:"#ccc",
    next:xb3
});
var persions1 = [$.clone(cc), $.clone(hz), $.clone(gy)];
//var persions1 = [$.clone(cc), $.clone(mc), $.clone(zy), $.clone(hz), $.clone(gy), $.clone(zf), $.clone(xb1), $.clone(xb2), $.clone(xb3), $.clone(xb4)];
//var persions1 = [$.clone(cc),$.clone(mc)];
var persions = persions1.concat([]);
/**
 * 定义界面
 * @type {{_init: gameBox._init}}
 */
var gameBox = {
    as:document.getElementsByTagName("a"),
    //保存人物状态
    persions:persions,
    _init:function(x,y){
        var row = "";
        for(var k=1;k<=y;k++){
            var col = "";
            for(var i=1;i<=x;i++){
                var a = '<a id="rc'+k+i+'"></a>';
                col += a;
            }
            col += "<br/>";
            row += col;
        }
        document.body.innerHTML = row;
    },
    /**
     * 刷新人物在页面上的状态
     * @param persions
     */
    flush:function(persions){
        if(persions){
           this.persions = persions;
        }
        /**
         * 先清除所有a链接样式
         */
        for(var i=0;i<this.as.length;i++){
            this.as[i].style.backgroundColor = "white";
        }
        for(var i=0;i<this.persions.length;i++){
            var persion = this.persions[i];
            var zyrcArr = persion.getZyrcArr();
            for(var k = 0;k<zyrcArr.length;k++){
                var zyrc = zyrcArr[k];
                document.getElementById("rc"+zyrc).style.backgroundColor = persion.color;
            }
        }
    }
};

var game = {
    /**
     * 队列
     */
    gjQueue:[],
    /**
     * 队列指针，如果直接出列则保存不了完整路线，所以用指针指向表示
     */
    zz:0,
    gjShift:function(){
        var oldZz = this.zz;
        this.zz++;
        return this.gjQueue[oldZz];
    },
    bfs:function(gjObjParam,deep){
        for(var k=0;k<persions.length;k++){
            var persion = persions[k];
            for(var i=0;i<directions.length;i++){
                var direction = directions[i];
                if(persion.canMove(direction)){
                    var gjObj = {"persion":persion,"direction":direction,"parentGj":gjObjParam};
                    this.gjQueue.push(gjObj);
                    if(persion.name == "曹操" && persion.rc == 42){
                        alert("曹操到出口了");
                        return;
                    }
                }
            }
        }

        var gjObj = this.gjShift();
        gjObj.persion.resetRc();

        var sz = [];
        var yb = gjObj;
        while(yb){
            sz.unshift(yb);
            yb = yb.parentGj;
        }
        for(var i = 0;i<persions.length;i++){
            for(var k=0;k<sz.length;k++){
                if(persions[i].name == sz[k].persion.name){
                    persions[i].move(sz[k].direction);
                }
            }
        }
       // gjObj.persion.move(gjObj.direction);
        this.bfs(gjObj,deep+1);
    }
};

window.onload = function(){
    function trampoline(f) {
        while (f && f instanceof Function) {
            f = f();
        }
        return f;
    }
     gameBox._init(4,5);
     gameBox.flush();
    trampoline(game.bfs(null,1));
    console.log(game.gjQueue);
};