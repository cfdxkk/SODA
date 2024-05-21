<script setup lang="ts">
	const model = defineModel<StepId>();

	const steps: Steps = [
		{ id: 1, name: 'Add image bar' },
		{ id: 2, name: 'Add image filter and mask' },
		{ id: 3, name: 'Create soda with wave' },
		{ id: 4, name: 'Create bubbles' },
		{ id: 5, name: 'Mix all' },
	]

	function goToStep(stepId: StepId) {
		model.value = stepId
	}
</script>

<template>
	<Transition>
		<div class="step-list">
			<div v-for="step in steps" :key="step.id" @click="goToStep(step.id)" class="step-item" :class="{ 'is-active': step.id === model }">{{ step.name }}</div>
		</div>
	</Transition>
</template>

<style scoped>
	.step-list {
		display: flex;
		flex-direction: column;
    flex-wrap: nowrap;
    align-items: flex-end;
    justify-content: center;
	}

	.step-item {
		margin: 1.9% 30px 1.9% 0;

		font-size: 25px;
		color: #9f949b;
		cursor: pointer;
		user-select: none; /* Standard syntax */
	}

	/* 响应式布局：当宽度小于或等于 375px 时，修改布局样式 */
	@media (max-width: 375px) {
		.step-item {
			font-size: 20px;
		}
	}

	.is-active {
		color: black;
		font-weight: bold;
	}
</style>