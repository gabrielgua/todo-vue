<script setup lang="ts">
    const props = defineProps(['pendentesCount']);
</script>

<template>
    <header class="p-5 my-5 mx-auto bg-dark-subtle rounded-3">
        <h1>Minhas Tarefas</h1>
        <p>Você possui <span class="badge rouded-pill bg-info-subtle shadow" 
            :class="{
                'text-danger': props.pendentesCount >= 1,
                'text-success': props.pendentesCount === 0
            }">{{ props.pendentesCount }}</span> tarefas pendentes</p>
    </header>
</template>

