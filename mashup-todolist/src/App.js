import { createGlobalStyle } from "styled-components";
import { TodoProvider } from "./TodoContext";
import TodoCreate from "./TodoCreate";
import TodoHead from "./TodoHead";
import TodoList from "./TodoList";
import TodoTemplate from "./TodoTemplate";

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

const App = () => {
  return (
    <TodoProvider>
      <GlobalStyle />
      <TodoTemplate>
        <TodoHead />
        <TodoList />
        <TodoCreate />
      </TodoTemplate>
    </TodoProvider>
  );
};

export default App;
