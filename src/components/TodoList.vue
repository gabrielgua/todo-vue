<script setup lang="ts">
	import type { Tarefa } from '@/types/tarefa';
	import moment from 'moment';
	import 'moment/dist/locale/pt-br';

	const props = defineProps<{
		tarefas: Tarefa[],
		remover: (id: number) => void
	}>();

	const finalizar = (tarefa: Tarefa) => {
		if (!tarefa.finalizada) {
			tarefa.dataFinalizacao = null;
			return;
		}

		tarefa.dataFinalizacao = new Date();
	}



	const formatDate = (date: Date): string => {
		return `${moment(date).fromNow()} (${moment(date).format('HH:mm')})`;
	}
</script>

<template>
	<p v-if="!props.tarefas.length" class="text-body-secondary mb-0 mt-3"><small>Sem tarefas cadastradas ainda.</small></p>
 
	<ul v-else class="list-group mt-4">
		<li class="list-group-item d-flex align-items-center justify-content-between gap-3" v-for="tarefa in props.tarefas">
			<div class="d-flex align-items-center gap-3">
				<button @click="props.remover(tarefa.id)" class="btn-delete border-0 bg-transparent p-0 m-0">
					<i class="bi bi-trash"></i>
				</button>
				<input :id="tarefa.titulo" :checked="tarefa.finalizada" @change="finalizar(tarefa)" v-model="tarefa.finalizada" type="checkbox">
				<label :class="{ 'tarefa--finalizada': tarefa.finalizada }" :for="tarefa.titulo" >
					{{ tarefa.titulo }}
				</label>
			</div>
			<div class="d-flex align-items-center">
				<small v-if="tarefa.dataFinalizacao" class="text-body-secondary" style="font-size: 14px">finalizada 
					{{ formatDate(tarefa.dataFinalizacao) }}
				</small>
			</div>
		</li>
	</ul>
</template>

<style scoped>
	.tarefa--finalizada {
		text-decoration: line-through;
	}

	.btn-delete:hover {
		color: var(--bs-danger);
	}
</style>