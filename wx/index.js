$$ = {
    extend: function (target, obj) {
        for (o in obj) {
            target[o] = obj[o];
        }
    },
    clone: function (obj) {
        var newObj = {};
        $.extend(true,newObj,obj);
        return newObj;
    }
};

/*所有点的坐标*/
var dcd1Rc1 = [11,12,21,22,31,32,41,42,51,52];
var dcd1Rc2 = [14,13,24,23,34,33,44,43,54,53];
var syds = dcd1Rc1.concat(dcd1Rc2);

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
    this.gjStack.push({"en":"none","zh":"原地","rc":this.rc});
};
Persion.prototype = {
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
        if(gjArr.length > 1 && gjArr[gjArr.length-2].rc == rc){
            return true;
        }
        return false;
    },
    //判断当前人物能否移动到某个方向
    canMove:function(direction){
        var b = (!this._isCj(direction)) && (!this._isBzy(direction))/* && (!this._isZg(direction))*/;
        return b;
    },
    /**
     * 人物根据方向移动
     * @param direction
     */
    move:function(direction){
        this.rc += direction.rc;
        var obj = {};
        $$.extend(obj,direction);
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
    width:2,
    height:1,
    rc :31,
    color:"green",
    next:cc
});
var zy = new Persion({
    name:"赵云",
    width:2,
    height:1,
    rc :43,
    color:"blue",
    next:mc
});
var hz = new Persion({
    name:"黄忠",
    width:2,
    height:1,
    rc :33,
    color:"pink",
    next:zy
});
var gy = new Persion({
    name:"关羽",
    width:2,
    height:1,
    rc :52,
    color:"yellow",
    next:hz
});
var zf = new Persion({
    name:"张飞",
    width:2,
    height:1,
    rc :41,
    color:"orange",
    next:gy
});
var xb1 = new Persion({
    name:"小兵1",
    width:1,
    height:1,
    rc :11,
    color:"#ccc",
    next:zf
});
var xb2 = new Persion({
    name:"小兵2",
    width:1,
    height:1,
    rc :14,
    color:"#ccc",
    next:xb1
});
var xb3 = new Persion({
    name:"小兵3",
    width:1,
    height:1,
    rc :21,
    color:"#ccc",
    next:xb2
});
var xb4 = new Persion({
    name:"小兵4",
    width:1,
    height:1,
    rc :24,
    color:"#ccc",
    next:xb3
});
 var persions = [$$.clone(cc), $$.clone(mc), $$.clone(zy), $$.clone(hz), $$.clone(gy), $$.clone(zf), $$.clone(xb1), $$.clone(xb2), $$.clone(xb3), $$.clone(xb4)];
//var persions = [$$.clone(cc), $$.clone(mc), $$.clone(gy)];
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
            this.as[i].innerText = "";
        }
        for(var i=0;i<this.persions.length;i++){
            var persion = this.persions[i];
            var zyrcArr = persion.getZyrcArr();
            for(var k = 0;k<zyrcArr.length;k++){
                var zyrc = zyrcArr[k];
                document.getElementById("rc"+zyrc).style.backgroundColor = persion.color;
                document.getElementById("rc"+zyrc).innerText = persion.name;
            }
        }
    }
};

var game = {
    //使人物回到初始状态
    resetPersions:function(){
        persions = [$$.clone(cc), $$.clone(mc), $$.clone(zy), $$.clone(hz), $$.clone(gy), $$.clone(zf), $$.clone(xb1), $$.clone(xb2), $$.clone(xb3), $$.clone(xb4)];
        //persions = [$$.clone(cc), $$.clone(hz), $$.clone(gy)];
        gameBox.persions = persions;
    },
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
    getGjChain:function(gjObj){
        var gjChain = [];
        var parentGj = gjObj;
        while(parentGj){
            gjChain.unshift(parentGj);
            parentGj = parentGj.parentGj;
        }
        //如果是根节点，也加入
        gjChain.unshift(parentGj);
        return gjChain;
    },
    //判断两个数组元素的值是否一样
    gjEquals:function(gjArr1,gjArr2){
        if(gjArr1.length != gjArr2.length){
            return false;
        }
        var b = true;
        for(var i = 0;i<gjArr1.length;i++){
            var gj1 = gjArr1[i];
            var gj2 = gjArr2[i];
            if(gj1 && gj2){
                if(gj1.persion.name != gj2.persion.name || gj1.direction.rc != gj2.direction.rc){
                    b = false;
                    return b;
                }
            }
        }
        return b;
    },
    /**
     * 判断轨迹是否已经存在
     */
    gjExists:function(gjObj){
        var gjObjChain = this.getGjChain(gjObj);
        for(var i=0;i<this.gjQueue.length;i++){
            var allOneGjchain = this.getGjChain(this.gjQueue[i]);
            if(this.gjEquals(gjObjChain,allOneGjchain)){
                return true;
            }
        }
        return false;
    },
    /**
     * 加入一个轨迹，不能有相同轨迹
     * @param gjObj
     */
    gjPush:function(gjObj){
        //如果轨迹不存在，和状态都不相同则添加
        if(/*!this.gjExists(gjObj) && */!this.ztExists(gjObj)){
            this.gjQueue.push(gjObj);
        }
    },
	/*得到某个坐标上的人*/
	dsr:function(persionsp,d){
		for(var i=0;i<persionsp.length;i++){
			if(persionsp[i].rc == d){
				return persionsp[i];
			}
		}
    },
    /**
     * 判断两个轨迹是否为同一种状态
     * @param gjObj1
     * @param gjObj2
     */
    ztEquals:function(gjObj1,gjObj2){
        var gj1persions = this.gjGo(gjObj1);
        var gj2persions = this.gjGo(gjObj2);
		/**
        for(var i=0;i<gj1persions.length;i++){
            if(gj1persions[i].rc != gj2persions[i].rc){
                return false;
            }
        }**/
		for(var d=0;d<syds.length;d++){
			var p1 = this.dsr(gj1persions,syds[d]);
			var p2 = this.dsr(gj2persions,syds[d]);
			if(p1 && p2){
				if(p1.width != p2.width || p1.height != p2.height){
					return false;
				}
			}else{
				if(p1 != p2){
					return false;
				}
			}
		}
        return true;
    },
    /**
     * 按某个轨迹走，返回persions
     * @param gjObj
     */
    gjGo:function(gjObj){
        var zzgjChain = game.getGjChain(gjObj);
        var persions = [$$.clone(cc), $$.clone(mc), $$.clone(zy), $$.clone(hz), $$.clone(gy), $$.clone(zf), $$.clone(xb1), $$.clone(xb2), $$.clone(xb3), $$.clone(xb4)];
        for(var i=0;i<zzgjChain.length;i++){
            for(var k=0;k<persions.length;k++){
                if(zzgjChain[i] && persions[k].name == zzgjChain[i].persion.name){
                    persions[k].move(zzgjChain[i].direction);
                }
            }
        }
        return persions;
    },
    gjSlowGo:function(gjObj){
        var zzgjChain = game.getGjChain(gjObj);
        var i = 0;
        game.resetPersions();
        window.dg = function(){
            if(i==zzgjChain.length){
                return;
            }

            for(var k=0;k<persions.length;k++){
                if(zzgjChain[i] && persions[k].name == zzgjChain[i].persion.name){
                    persions[k].move(zzgjChain[i].direction);
                    gameBox.flush();
                }
            }

            i++;
            setTimeout("dg()",500);
        };
        window.dg();
    },
    /**
     * 判断状态是否存在
     * @param gjObj
     */
    ztExists:function(gjObj){
        for(var i=0;i<this.gjQueue.length;i++){
            if(this.ztEquals(gjObj,this.gjQueue[i])){
                return true;
            }
        }
        return false;
    },
    /**
     * 判断两个图案是否对称，如果对称也当作是重复
     * @param persions1
     * @param persions2
     */
    dcEquals:function(persions1,persions2){

    },
    bfs:function(){
        var gjObjParam;
		
        do {
            for (var k = 0; k < persions.length; k++) {
                var persion = persions[k];
                for (var i = 0; i < directions.length; i++) {
                    var direction = directions[i];
                    if (persion.canMove(direction)) {
                        var gjObj = {"persion": $$.clone(persion), "direction": direction, "parentGj": gjObjParam};
                        //添加无重复的记录到队列中
						if(!gjObjParam && (persion.name == "关羽" && direction.zh=="向右")){
							continue;
						}
                        this.gjPush(gjObj);
						
						
                        if (gjObj.persion.name == "曹操") {
                            var persionsZd = this.gjGo(gjObj);
                            if(this.dsr(persionsZd,42) && this.dsr(persionsZd,42).name == "曹操"){
                                alert("曹操到出口了");
                                console.log(game.getGjChain(gjObj));
                                game.gjSlowGo(gjObj);
                                return;
                            }
                        }
                    }
                }
            }

                    //队列中指针所指的对象,不可变
                    var zzgjObj = this.gjShift();
                    //当前取出来的作为下一个的parentGj
                    gjObjParam = zzgjObj;
                    game.resetPersions();
                    //gameBox.flush();
					
					
                    var zzgjChain = game.getGjChain(zzgjObj);
                    for(var i=0;i<zzgjChain.length;i++){
                        for(var k=0;k<persions.length;k++){
                            if(zzgjChain[i] && persions[k].name == zzgjChain[i].persion.name){
                                persions[k].move(zzgjChain[i].direction);
                            }
                        }
                    }
                    gameBox.flush();


        }while(gjObjParam);

    }
};

window.onload = function(){
     gameBox._init(4,5);
     gameBox.flush();
    game.bfs();
};