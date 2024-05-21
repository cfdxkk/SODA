<template>
  <NuxtPage />
</template>

<style>
	body {
		padding: 0;
		margin: 0;
	}

	/* 响应式布局：当宽度小于或等于 880px 时，修改布局 */
	@media (max-width: 880px) {
		body {
			overflow-x: hidden;
		}
	}
</style>
