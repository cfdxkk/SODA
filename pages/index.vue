<script setup lang="ts">
	const step = ref<StepId>(1);
</script>
<template>
  <div class="main-app">
		<Step v-model="step" class="step-page" />
    <Soda v-model="step" class="soda-page" />
  </div>
</template>

<style scoped>
	.main-app {
		width: 100vw;
		height: 100vh;

		display: grid;
		grid-template-columns: 3fr 7fr; /* 左边占3，右边占7 */
	}



	.step-page {
		background-color: pink;

		min-width: 380px;
		min-height: 300px;
	}

	.soda-page {
		background-color: #F8F8F8;
		
		min-width: 500px;
		min-height: 600px;

		transform: translate3d(0, 0, 0);
	}

	/* 响应式布局：当宽度小于或等于 880px 时，修改布局 */
	@media (max-width: 880px) {

		.main-app {
			overflow-x: hidden;
		}

		.main-app {
			grid-template-columns: none; /* 清除原有列布局 */
			grid-template-rows: 3fr 7fr; /* 改为行布局 */
		}

		.step-page {
			min-width: 300px;
		}

		.soda-page {
			min-width: 300px;
		}
	}
</style>
