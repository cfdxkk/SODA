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
	}

	.soda-page {
		background-color: #F8F8F8;

		transform: translate3d(0, 0, 0);
	}
</style>
