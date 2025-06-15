<template>
  <h1>CRUD Usuarios</h1>
  <UserForm :modelValue="selectedUser" @submit="handleSubmit" @update:modelValue="selectedUser = $event" />
  <UserList :users="users" @edit="editUser" @delete="deleteUser" @deleteAll="deleteAllUsers" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import UserForm from './components/UserForm.vue';
import UserList from './components/UserList.vue';

const API = 'http://localhost:3000/users';

const users = ref([]);
const selectedUser = ref({ nombre: '', edad: '' });

async function fetchUsers() {
  users.value = await fetch(API).then(r => r.json());
}

async function handleSubmit(user) {
  if (user._id) {
    await fetch(`${API}/${user._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
  } else {
    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
  }
  selectedUser.value = { nombre: '', edad: '' };
  fetchUsers();
}

function editUser(user) {
  selectedUser.value = { ...user };
}

async function deleteUser(id) {
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  fetchUsers();
}

async function deleteAllUsers() {
  await fetch(API, { method: 'DELETE' });
  fetchUsers();
}

onMounted(fetchUsers);
</script>