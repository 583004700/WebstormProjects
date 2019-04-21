###复习
	0.   svn
	1.   定位参照于谁块来定位
			没有定位 :包含块
			相对		:   元素本来的位置
			绝对	    :包含块
							如果最近的祖先元素中存在定位元素，则这个定位元素就是包含块
							如果没有，包含块为初始包含块
			固定	: 视口
			
	2.   什么是初始包含块
					是一个视窗大小的矩形，不等于视窗
	
	3.   left top right bottom width height
				默认值为auto
		  margin padding
		  		默认值 0
		  boder-width
		  		如果不存在border-style
		  
	4.   百分比参照于谁
			width margin padding:包含块的width
			height:包含块的height
			
			left:包含块的width
			top :包含块的height
			
	5.浮动
		浮动提升半层
		
	6.三列布局
		两边固定，当中自适应
		中间列要完整的显示
		中间列要优先加载
		
		定位
		浮动
		圣杯
		双飞翼
		
	7.margin为负值（margin不影响元素的位置）
		负值:将元素的边界往里收
		正值:将元素的边界往外扩
		
	8.伪等高布局
	
	9.fixed
		怎么使用绝对定位来模拟固定定位
				1.禁止系统滚动条
				2.将滚动条加给body
				3.让body的尺寸变为视口的尺寸
			
			 