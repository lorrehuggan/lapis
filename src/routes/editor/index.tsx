import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import Editor from "../../components/editor";

const queryClient = new QueryClient()
export default function EditorPage() {

  return (
    <QueryClientProvider client={queryClient}>
      <Editor />
    </QueryClientProvider>
  );
}
