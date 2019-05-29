###day09
	1.注意点
		---canvas图像的渲染有别于html图像的渲染，
				canvas的渲染极快，不会出现代码覆盖后延迟渲染的问题
				写canvas代码一定要具有同步思想
		---在获取上下文时，一定要先判断
		---画布高宽的问题
			画布默认高宽300*150
			切记一定要使用html的attribute的形式来定义画布的宽高
			通过css形式定义会缩放画布内的图像
		---绘制矩形的问题
			a.边框宽度的问题，边框宽度是在偏移量上下分别渲染一半，可能会出现小数边框，
				一旦出现小数边框都会向上取整
			b.canvas的api只支持一种图像的直接渲染：矩形
		---我们没法使用选择器来选到canvas中的图像
	2.画布api
		oc.getContext("2d"):获取画布的2d上下文
		oc.width:画布在横向上css像素的个数
		oc.height:画布在纵向上css像素的个数
		oc.toDataUrl():拿到画布的图片地址
	3.上下文api
		ctx.fillRect(x,y,w,h):填充矩形
		ctx.strokeRect(x,ymwmh):带边框的矩形
		ctx.clearRect(0,0,oc.width,oc.height):清除整个画布
			注意原点的位置
		ctx.fillStyle:
			填充颜色
			背景fillStyle的值可以是createPattern(image, repetition)返回的对象
			线性渐变fillStyle的值可以是createLinearGradient(x1, y1, x2, y2))返回的对象
				addColorStop(position, color)
			径向渐变fillStyle的值可以是createRadialGradient(x1, y1, r1, x2, y2, r2)返回的对象
				addColorStop(position, color)
		ctx.strokeStyle:线条颜色
		ctx.lineWidth：线条宽度
		ctx.lineCap：线条两端的展现形式
		ctx.lineJoin：线条连接处的展现形式
		ctx.moveTo(x,y):将画笔抬起点到x，y处
		ctx.lineTo(x,y):将画笔移到x，y处
		ctx.rect(x,y,w,h)
		ctx.arc(x,y,r,degS,degE,dir)
		ctx.arcTo(x1,y1,x2,y2,r):2个坐标，一个半径
				结合moveTo(x,y)方法使用，
				x,y:起始点
				x1,y1：控制点
				x2,y2：结束点
		ctx.quadraticCurveTo(x1,y1,x2,y2)
				结合moveTo(x,y)方法使用，
				x,y:起始点
				x1,y1：控制点
				x2,y2：结束点
				必须经过起点和终点
		ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3)
				结合moveTo(x,y)方法使用，
				x,y:起始点
				x1,y1：控制点
				x2,y2：控制点
				x3，y3：结束点
				必须经过起点和终点
		ctx.fill()
		ctx.stroke()
		
		ctx.beginpath():清除路径容器
		ctx.closepath():闭合路径
			fill自动闭合
			stroke需要手动闭合
		ctx.save()
			将画布当前状态(样式相关 变换相关)压入到样式栈中
		ctx.restore()
			将样式栈中栈顶的元素弹到样式容器中
			图像最终渲染依赖于样式容器
			
		ctx.translate(x,y):将原点按当前坐标轴位移x，y个单位
		ctx.rotate(弧度):将坐标轴按顺时针方向进行旋转
		ctx.scale(因子):
			放大：放大画布，画布中的一个css像素所占据的物理面积变大，画布中包含的css像素的个数变少
					画布中图像所包含的css像素的个数不变
			缩小：缩小画布，画布中的一个css像素所占据的物理面积变小，画布中包含的css像素的个数变多
					画布中图像所包含的css像素的个数不变
		
		ctx.drawImage(img,x,y,w,h)
			:在canvas中引入图片一定在图片加载完成之后再去操作
		ctx.measureText("文本")
			:返回一个持有文本渲染宽度的对象
		ctx.fillText()
		ctx.strokeText()
		ctx.font
		ctx.textAlign
		ctx.textBaseline
		shadowOffsetX = float
		shadowOffsetY = float
		shadowBlur = float
		shadowColor = color(必需项)
		ctx.getImageData(x,y,w,h)
			ImageData对象
				width：选中区域在横向上css像素的个数
				height：选中区域在纵向上css像素的个数
				data:数组
						选中区域所有像素点的rgba信息，rgba的取值从0到255
		ctx.putImageData(imgdata,x,y)
		ctx.createImageData(w,h)
			返回的是imgdata对象 默认像素点的信息是rgba(0,0,0,0)
		ctx.globalAlpha
			取值为0到1
		ctx.globalCompositeOperation
			source-over(默认值):源在上面,新的图像层级比较高
			source-in  :只留下源与目标的重叠部分(源的那一部分)
			source-out :只留下源超过目标的部分
			source-atop:砍掉源溢出的部分
			
			destination-over:目标在上面,旧的图像层级比较高
			destination-in:只留下源与目标的重叠部分(目标的那一部分)
			destination-out:只留下目标超过源的部分
			destination-atop:砍掉目标溢出的部分
		ctx.ispointinpath(x,y)
			x,y这个点是否在路径上
	4.实例
		时钟动画：结合了所有基础api
		飞鸟动画：结合图片创建动画
		马赛克：像素操作
		刮刮卡：合成+像素操作
		
		
		
		
