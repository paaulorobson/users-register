import { Form } from "./components/Form";
import { FormHeader } from "./components/FormHeader";
import { UserList } from "./components/UserList";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <main className="flex min-h-svh items-center justify-center bg-zinc-50 px-4 py-10">
        <section className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
          <FormHeader />
          <Form />
          <UserList />
        </section>
      </main>
    </Provider>
  );
}

export default App;
