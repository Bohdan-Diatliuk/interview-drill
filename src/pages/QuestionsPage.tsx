import Card from "../components/Card";
import { Header } from "../components/Header";

export default function QuestionsPage() {
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-white">Questions Page</h1>
        <Card />
      </div>
    </>
  );
}
