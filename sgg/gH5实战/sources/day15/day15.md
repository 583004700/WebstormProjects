###day15
	3D无缝自动轮播 + 3D手动轮播
	布局：
		小圆点的居中
			1.容器(宽度必须是一屏的宽度,text-algin:center)
			2.子项(必须inline-block)
		四个动画状态的确定
			四个关键帧！！！		
	逻辑：
		---手动轮播（事件驱动）
			小圆点的切换
				class不能完全覆盖，classlist的形式A区操作它
				for循环内部添加事件
					将所有小圆点的active remove掉
					给当前触发点击事件的小圆点add active(this)
					判断方向(在最外层循环时,将i绑给每个小圆点的index属性;点击事件逻辑的最后将this.index赋给oldindex)
						从左往右（this.index > oldindex）
							对动画的切换
						从右向左（this.index < oldindex）
							对动画的切换
		
		---自动轮播（定时器驱动）
			函数包裹循环定时器(方便重新开启);在函数的第一行清除定时器
			自动轮播只有一个方向;无缝
				this.index替换成一个会自动加1的变量 autoindex;逻辑的最后将autoindex赋给oldindex
				无缝的实现就是一个if判断，判断 autoindex的取值范围
				从左往右（this.index > oldindex）
					对动画的切换
		
		
		---自动轮播和手动轮播 冲突与联系
			1.每一次自动轮播 都得告诉 手动轮播我当前的位置(自动轮播进行中可能会触发 手动轮播)
				联系：在自动轮播的定时器内 oldindex = autoindex(全局变量)
				冲突：自动轮播应该停止 清除定时器（变量提升的问题）
			2.手动轮播 得告诉 自动轮播 ，下一次自动轮播时 你应该从哪一屏开始（手动点的那一屏）
				在手动轮播的回调函数内 autoindex=this.index(全局变量)
				重新开启定时器








