<script setup lang="ts">
	import { reactive, ref } from 'vue';
	import Header from './components/Header.vue';
	import Form from './components/Form.vue';
	import TodoList from './components/TodoList.vue';
	import type { Tarefa } from '@/types/tarefa';


	const filtro = ref('todas');
	const tarefa = ref('');

	const state = reactive({
		tarefas: [
			{ id: 1, titulo: 'Varrer o chão do quarto', finalizada: false, dataFinalizacao: null, },
			{ id: 2, titulo: 'Treinão de perna', finalizada: true, dataFinalizacao: new Date('06-01-2024 21:21'), }
		] as Tarefa[],
	});

	const getByFilter = (): Tarefa[] => {
		switch (filtro.value) {
			case 'pendentes': return getPendentes();
			case 'finalizadas': return getFinalizadas();
			default: return state.tarefas;
		}
	}

	const getPendentesCount = (): number => {
		return state.tarefas.filter(t => !t.finalizada).length;
	}

	const getPendentes = (): Tarefa[] => {
		return state.tarefas.filter(t => !t.finalizada);
	}

	const getFinalizadas = (): Tarefa[] => {
		return state.tarefas.filter(t => t.finalizada);
	}

	const adicionar = (): void => {
		const newTarefa: Tarefa = {
			id: state.tarefas[state.tarefas.length - 1].id + 1,
			titulo: tarefa.value,
			finalizada: false,
			dataFinalizacao: null
		}

		state.tarefas.push(newTarefa);

		tarefa.value = '';
	}

	const remover = (id: number): void => {
		state.tarefas = state.tarefas.filter(t => t.id != id);	
	}

</script>

<template >
	<div class="container" >
		<Header :pendentes-count="getPendentesCount()" />
		<Form :add-tarefa="adicionar" v-model:filtro="filtro" v-model:tarefa="tarefa"/>
		<TodoList :tarefas="getByFilter()" :remover="remover"/>
	</div>
</template>

<style scoped>
</style>
