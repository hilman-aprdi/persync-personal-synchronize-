import { NewConversationPage } from "../../../components/new-conversation-page";

export const metadata = {
  title: "New Business Analysis | Persync",
  description: "Mulai analisis arah bisnis baru di Persync.",
  alternates: {
    canonical: "https://persync.vercel.app/new",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function NewPage() {
  return <NewConversationPage />;
}
