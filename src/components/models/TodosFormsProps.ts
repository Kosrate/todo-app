import { Todo } from "./Todo";

export type TodosFormProps = {
    onFormSubmit: (todo: Todo) => void;
  };