export interface Tarefa {
    id: number,
    titulo: string;
    finalizada: boolean;
    dataFinalizacao?: Date | null;
}