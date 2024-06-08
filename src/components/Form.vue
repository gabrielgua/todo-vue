<script setup lang="ts">
import { ref } from 'vue';

    const props = defineProps(['addTarefa']);

    const filtro = defineModel('filtro');
    const tarefa = defineModel('tarefa');
</script>

<template>
    <form @submit.prevent="props.addTarefa">
        <div class="row gap-3">
            <div class="col">
                <input v-model="tarefa" required type="text" placeholder="Nova tarefa" class="form-control">
            </div>
            <div class="col-md-2">
                <button type="submit" class="btn btn-primary">Cadastrar</button>
            </div>
            <div class="col-md-2">
                <select v-model="filtro" class="form-control form-select">
                    <option value="todas">Todas</option>
                    <option value="pendentes">Pendentes</option>
                    <option value="finalizadas">Finalizadas</option>
                </select>
            </div>
        </div>
    </form>
</template>