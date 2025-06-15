<template>
  <div>
    <ul>
      <li v-for="u in users" :key="u._id">
        {{ u.nombre }} ({{ u.edad }})
        <button @click="$emit('edit', u)">Editar</button>
        <button @click="$emit('delete', u._id)">Eliminar</button>
      </li>
    </ul>
    <button @click="$emit('deleteAll')">Eliminar todos</button>
  </div>
</template>

<script setup>
defineProps(['users']);
defineEmits(['edit', 'delete', 'deleteAll']);
</script>