<template>
<div class="hello_page">
	<div id="mydiv" style="height:500px;"></div>
  <h1>hello word</h1>
</div>
</template>

<script>
import CanvasParticle from '../public/canvas-particle'

export default {
  name: 'Hello',
  mounted() {
    // console.log(CanvasParticle)
    	window.onload = function() {
		    //配置
		    var config = {
		        vx: 4,	//小球x轴速度,正为右，负为左
		        vy: 4,	//小球y轴速度
		        height: 2,	//小球高宽，其实为正方形，所以不宜太大
		        width: 2,
		        count: 200,		//点个数
		        color: "121, 162, 185", 	//点颜色
		        stroke: "130,255,255", 		//线条颜色
		        dist: 6000, 	//点吸附距离
		        e_dist: 20000, 	//鼠标吸附加速距离
		        max_conn: 10 	//点到点最大连接数
		    }

		    //调用
		    CanvasParticle(config);
		}
  }
}
</script>
<style>
		/* body{background-color: #c9cc26} */

</style>
