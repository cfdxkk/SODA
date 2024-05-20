<script setup lang="ts">
	const step = ref<'1' | '2' | '3' | '4' | '5' | '6' | '7' >('1');
</script>
<template>
  <div>
    <Soda v-model="step"/>
		<Step v-model="step" />
  </div>
</template>
