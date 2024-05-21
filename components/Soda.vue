<script setup lang="ts">
	const model = defineModel<StepId>();
	let bubbleInterval: ReturnType<typeof setTimeout>[] = []; // 生成泡泡的循环

	/**
	 * 在给定的容器底部随机位置生成一个随机尺寸、随机摇摆幅度、随机不透明度的气泡
	 */
	function createBubble(containerElementId: string) {
		const container = document.getElementById(containerElementId)

		if (container) {
			const bubble = document.createElement('div')

			// 设置气泡样式
			bubble.style.position = 'absolute'
			bubble.style.bottom = '0px' // 起始点为底部
			const randomX = Math.random() * container.clientWidth // 气泡球在生成时随机的 X 轴位置
			bubble.style.left = `${randomX}px`
			const size = Math.random() * 2 + 1 // 气泡随机大小，最大 3px 最小 1px
			bubble.style.width = `${size}px`
			bubble.style.height = `${size}px`
			const opacity = Math.floor(Math.random() * 25) + 60 // 气泡的随机不透明度，最大 85% 最小 60%
			bubble.style.backgroundColor = `rgb(255 255 255 / ${opacity}%)`
			bubble.style.borderRadius = '50%' // 圆球形状气泡
			
			container.appendChild(bubble) // 生成气泡球

			// 随机摇晃幅度
			const swayAmplitude = 5
			const swayFrequency = 0.003

			const duration = 1000 / (size / 10) // 计算上升速度，小球越大上升的越快

			const startTime = performance.now()

			const animate = (time: number) => {
				const elapsedTime = time - startTime
				const progress = elapsedTime / duration
				const newY = progress * container.clientHeight

				bubble.style.bottom = `${newY}px` // 小球上升动画

				const sway = swayAmplitude * Math.sin(swayFrequency * elapsedTime) // 计算小球摇晃幅度
				bubble.style.transform = `translateX(${sway}px)` // 小球摇晃动画

				// 在小球上浮进度超过 95% 之后，渐变隐藏
				if (progress > 0.95) {
					bubble.style.opacity = `${(1 - progress) * 10}`
				}

				if (progress < 1) {
					requestAnimationFrame(animate)
				} else {
					container.removeChild(bubble)
				}
			}

			requestAnimationFrame(animate)
		}
	}

	/**
	 * 间隔随机时间后，生成随机个泡泡
	 */
	function createRandomBubbles(containerElementId: string) {
		const bubblesCount = Math.floor(Math.random() * 3) + 2 // 随机生成的气泡数量

		for (let i = 0; i < bubblesCount; i++) {
			createBubble(containerElementId)
		}

		// 随机时间间隔
		const randomInterval = Math.random() * 900 + 100 // 最大间隔 1 秒，最小间隔 0.1 秒
		const interval = setTimeout(() => createRandomBubbles(containerElementId), randomInterval)
		bubbleInterval.push(interval)
	}

	/**
	 * 停止生成泡泡
	 */
	function stopBubbles() {
		if (bubbleInterval && bubbleInterval.length > 0) {
			bubbleInterval.forEach(bubble => clearInterval(bubble))
			bubbleInterval = [];
		}
	}
	
	watch(model, step => {
		if (step === 4) {
			stopBubbles()
			createRandomBubbles('bubble-container-1')
			createRandomBubbles('bubble-container-2')
		} else if (step === 5) {
			stopBubbles()
			createRandomBubbles('bubble-container-3')
			createRandomBubbles('bubble-container-4')
		} else {
			stopBubbles()
		}
	})

</script>

<template>
		<div class="soda-display">
			<Transition name="fade" mode="out-in">
				<div v-if="model === 1" :key="1" class="soda-box">
					<div class="soda-container">
						<div class="soda-text">Origin Image</div>
						<div class="bottle">
							<div class="image-box" />
						</div>
					</div>
				</div>


				<div v-else-if="model === 2" :key="2" class="soda-box">
					<div class="soda-container" >
						<div class="soda-text">Add Image FIlter</div>
						<div class="bottle">
							<div class="image-box-filtered" />
						</div>
					</div>

					<div class="soda-container" >
						<div class="soda-text">Add Mask</div>
						<div class="bottle">
							<div class="image-box-filtered" />
							<div class="bottle-mask" />
						</div>
					</div>
				</div>


				<div v-else-if="model === 3" :key="3" class="soda-box" >
					<div class="soda-container">
						<div class="soda-text">Add Gradient Mask</div>
						<div class="bottle">
							<div class="image-box-filtered" />
							<div class="bottle-mask" />
							<div class="soda" />
						</div>
					</div>

					<div class="soda-container" >
						<div class="soda-text">Add Wave</div>
						<div class="bottle">
							<div class="image-box-filtered" />
							<div class="bottle-mask" />
							<div class="soda" />
							<div class="wave-1" />
						</div>
					</div>
				</div>


				<div v-else-if="model === 4" :key="4" class="soda-box" >
					<div class="soda-container">
						<div class="soda-text">Add Bubbles</div>
						<div class="bottle">
							<div id="bubble-container-1" class="bubble-container-black-background" />
						</div>
					</div>

					<div class="soda-container" >
						<div class="soda-text">And With Background</div>
						<div class="bottle">
							<div class="image-box-filtered" />
							<div class="bottle-mask" />
							<div class="soda" />
							<div id="bubble-container-2" class="bubble-container-1" />
						</div>
					</div>
				</div>


				<div v-else-if="model === 5" :key="5" class="soda-box" >
					<div class="soda-container">
						<div class="soda-text">Mix All</div>
						<div class="bottle">
							<div class="image-box-filtered" />
							<div class="bottle-mask" />
							<div class="soda" />
							<div class="wave-2" />
							<div id="bubble-container-3" class="bubble-container-2" />
						</div>
					</div>

					<div class="soda-container" >
						<div class="soda-text">Play!</div>
						<div class="bottle">
							<div class="image-box-filtered" />
							<div class="bottle-mask" />
							<div class="soda" />
							<div class="wave-3" />
							<div id="bubble-container-4" class="bubble-container-3" />
						</div>
					</div>
				</div>
			</Transition>
			<div class="banner-box">
				<div class="banner">By cfdxkk<a href="https://github.com/cfdxkk/SODA" target="_blank">Check Source Code</a>Origin image is from <a href="https://www.pixiv.net/users/10109777" target="_blank">@紺屋鴉江</a></div>
			</div>
		</div>
</template>

<style scoped>
	.soda-display {
		width: 100%;
		height: 100%;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	.soda-box {
		display: flex;
	}

	.soda-container {
		width: auto;
		height: 600px;

		display: flex;
		justify-content: center;
    align-items: center;
    flex-direction: column;
	}

	.soda-text {
		color: gray;
	}

	.bottle {
		position: relative;
		display: inline-block;

		width: 50px;
		height: 300px;

		margin: 30px 60px 30px 60px;

		box-shadow: 0 2px 12px rgba(134, 0, 134, 0.274);
		border-radius: 5px;

		overflow: hidden;
	}

	.image-box {
		width: 100%;
		height: 100%;

		background-image: url('../public/image2.jpg');
		background-size: cover;
		background-position: -80px;
	}

	.image-box-filtered {
		width: 100%;
		height: 100%;

		background-image: url('../public/image2.jpg');
		background-size: cover;
		background-position: -80px;

		filter: hue-rotate(350deg) saturate(200%);
	}

	.bottle-mask {
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;

		background-color: rgba(255, 192, 203, 0.6);
		pointer-events: none;
	}

	.soda {
		position: absolute;
		bottom: 0;
		left: 0;

		width: 100%;
		height: 100%;

		background: linear-gradient(#3a46d2f4, 10%, #ee88aaf4);

		opacity: 0.5;
	}

	.wave-1 {
		opacity: 0.4;
		position: absolute;
		top: 3%;
		left: 50%;
		background-color: #00AAFF;
		width: 500px;
		height: 500px;
		margin-left: -250px;
		margin-top: -290px;
		transform-origin: 50% 48%;
		border-radius: 42% 38%;
		animation: wave-anime 10000ms infinite linear;
	}

	@keyframes wave-anime {
		from { transform: rotate(0deg); }
		from { transform: rotate(360deg); }
	}

	.bubble-container-black-background {
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;

		background-color: black;
	}

	.bubble-container-1 {
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;
	}

	.wave-2 {
		opacity: 0.4;
		position: absolute;
		top: 3%;
		left: 50%;
		background-color: #00AAFF;
		width: 500px;
		height: 500px;
		margin-left: -250px;
		margin-top: -440px;
		transform-origin: 50% 48%;
		border-radius: 42% 38%;
		animation: wave-anime 10000ms infinite linear;
	}

	.bubble-container-2 {
		position: absolute;
		top: 80px;
		left: 0;

		width: 100%;
		height: calc(100% - 80px);
	}

	
	.wave-3 {
		opacity: 0.4;
		position: absolute;
		top: 3%;
		left: 50%;
		background-color: #00AAFF;
		width: 500px;
		height: 500px;
		margin-left: -250px;
		margin-top: -440px;
		transform-origin: 50% 48%;
		border-radius: 42% 38%;
		animation: wave-anime 10000ms infinite linear, wave-tide-to-high 15000ms infinite linear alternate;
	}

	@keyframes wave-tide-to-high {
		from { margin-top: -200px; }
		to { margin-top: -530px; }
	}

	.bubble-container-3 {
		position: absolute;
		top: 80px;
		left: 0;

		width: 100%;
		height: calc(100% - 80px);
		animation: bubble-anime 15000ms infinite linear alternate;
	}

	@keyframes bubble-anime {
		from { top: 320px; height: calc(100% - 200px) }
		to { top: 0; height: 100% }
	}

	.banner-box {
		position: absolute;
		bottom: 0;
		right: 0;

		width: 100%;
		height: 25px;

		
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.banner {
		width: 100%;
		height: 25px;

		color: rgb(162, 162, 162);

		display: flex;
		justify-content: center;
		align-items: center;
	}

	/* 响应式布局：当宽度小于或等于 880px 时，修改布局样式 */
	@media (max-width: 880px) {
		.banner-box {
			height: 50px;
		}

		.banner {
			width: 300px;
			height: 50px;

			color: rgb(162, 162, 162);

			display: flex;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;
			flex-direction: row;
		}
	}

	.banner a {
		text-decoration: none;
    color: rgb(162, 162, 162);
		margin: 0 8px;
	}

	.banner a:link, .banner a:visited, .banner a:active {
    text-decoration: none;
    color: inherit;
	}

	.banner a:hover {
		color: #00AAFF;
		cursor: pointer;
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.5s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}
</style>
