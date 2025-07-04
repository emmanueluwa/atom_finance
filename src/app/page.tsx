import CardList from "@/components/CardList/CardList";
import Search from "@/components/Search/Search";

export default function Home() {
  return (
    <div>
      <Search />
      <CardList placeholder={""} />
    </div>
  );
}
