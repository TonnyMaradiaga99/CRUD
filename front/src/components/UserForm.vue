<template>
  <form @submit.prevent="onSubmit">
    <input v-model="user.nombre" placeholder="Nombre" required />
    <input v-model="user.edad" placeholder="Edad" required />
    <button type="submit">{{ user._id ? 'Actualizar' : 'Crear' }}</button>
    <button v-if="user._id" type="button" @click="reset">Cancelar</button>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue';
const props = defineProps(['modelValue']);
const emit = defineEmits(['submit', 'update:modelValue']);

const user = ref({ nombre: '', edad: '' });

watch(() => props.modelValue, (val) => {
  user.value = val ? { ...val } : { nombre: '', edad: '' };
}, { immediate: true });

function onSubmit() {
  emit('submit', { ...user.value });
  reset();
}
function reset() {
  emit('update:modelValue', { nombre: '', edad: '' });
}
</script>