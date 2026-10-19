import { ChatSessionPage } from "../../../../components/chat-session-page";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;

  return {
    title: "Business Direction Result | Persync",
    description: "Baca kembali hasil analisis arah bisnis Persync.",
    alternates: {
      canonical: `https://persync.vercel.app/chat/${encodeURIComponent(resolvedParams.id)}`,
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function ChatPage({ params }) {
  const resolvedParams = await params;

  return <ChatSessionPage id={resolvedParams.id} />;
}
