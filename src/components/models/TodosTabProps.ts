export type TodosTabProps = {
    todos: {
        id: number;
        title: string;
        completed: boolean;
    }[];
    onTodoToggle: (todo: { id: number; title: string; completed: boolean; }) => void;
    onTodoRemoval: (todo: { id: number; title: string; completed: boolean; }) => void;

};