import { PersyncProvider } from "../../components/persync-provider";
import { PersyncShell } from "../../components/persync-shell";

export default function WorkspaceLayout({ children }) {
  return (
    <PersyncProvider>
      <PersyncShell>{children}</PersyncShell>
    </PersyncProvider>
  );
}
