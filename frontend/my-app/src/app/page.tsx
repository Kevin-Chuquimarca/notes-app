import { NotesList } from "@/components/notes-list";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Profile from "@/components/profile";

export default function Home() {
  return (
    <div>
      <Header />
      <NotesList />
      <Profile />
      <Footer />
    </div>
  );
}
