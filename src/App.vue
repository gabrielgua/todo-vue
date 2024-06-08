<script setup lang="ts">
import { reactive, ref } from 'vue';
import moment from 'moment';
import 'moment/dist/locale/pt-br'

  type Tarefa = {
    titulo: string;
    finalizada: boolean;
    dataFinalizacao?: Date | null; 
  }

  const filtro = ref('todas');
  const tarefa = ref('');

  const state = reactive({
    tarefas: [
      {titulo: 'Varrer o chão do quarto', finalizada: false, dataFinalizacao: null, },
      {titulo: 'Treinão de perna', finalizada: true, dataFinalizacao: new Date('06-01-2024 21:21'), }
    ] as Tarefa[],
  }); 

  const getByFilter = (): Tarefa[] => {
    switch (filtro.value) {
      case 'pendentes': return getPendentes();
      case 'finalizadas': return getFinalizadas(); 
      default: return state.tarefas;
    }
  }

  const setFiltro = (e: Event): void => {
    filtro.value = (e.target as HTMLInputElement).value;
  }

  const getPendentesCount = ():number => {
    return state.tarefas.filter(t => !t.finalizada).length;
  }

  const getPendentes = (): Tarefa[] => {
    return state.tarefas.filter(t => !t.finalizada);
  }

  const getFinalizadas = (): Tarefa[] => {
    return state.tarefas.filter(t => t.finalizada);
  }

  const addTarefa = (): void => {
    const newTarefa: Tarefa = {
      titulo: tarefa.value,
      finalizada: false,
      dataFinalizacao: null,

    }

    state.tarefas.push(newTarefa);

    tarefa.value = '';
  }

  const getFormattedDate = (date: Date): string => {
    return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} às ${date.getHours()}:${date.getMinutes()}.`;
  }

  const finalizar = (tarefa: Tarefa) => {
    if (!tarefa.finalizada) {
      tarefa.dataFinalizacao = null;
      return;
    }

    tarefa.dataFinalizacao = new Date();
  }

  const formatDate = (date: Date): string => {
    return moment(date).fromNow();
  }  

</script>

<template>
  <div class="container">
    <header class="p-5 my-5 mx-auto bg-light rounded-3">
      <h1>Minhas Tarefas</h1>
      <p>Você possui {{ getPendentesCount() }} tarefas pendentes</p>
    </header>
    <form @submit.prevent="addTarefa">
      <div class="row gap-sm-3">
        <div class="col">
          <input v-model="tarefa" required type="text" placeholder="Descrição da tarefa" class="form-control">
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
    <ul class="list-group mt-4">
      <li class="list-group-item d-flex align-center justify-content-between gap-3" v-for="tarefa in getByFilter()">
        <div class="d-flex align-center ">
          <input :id="tarefa.titulo" :checked="tarefa.finalizada" @change="finalizar(tarefa)" v-model="tarefa.finalizada" type="checkbox">
          <label :class="{'tarefa--finalizada': tarefa.finalizada }" :for="tarefa.titulo" class="ms-3">{{ tarefa.titulo }}</label>
        </div>
        <div class="">
          <p v-if="tarefa.dataFinalizacao" class="m-0 text-body-secondary" style="font-size: 14px">finalizada {{ formatDate(tarefa.dataFinalizacao) }}</p>
        </div>
      </li>
    </ul>
  </div>


</template>

<style scoped>
  .tarefa--finalizada {
    text-decoration: line-through;
  }
</style>
