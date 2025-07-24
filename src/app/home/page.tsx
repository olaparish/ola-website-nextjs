import { Welcome } from "../../components/welcome/welcome";

export function meta() {
  return [
    { title: "OLA Parish Bolga" },
    {
      name: "description",
      content: "Welcome to Our Lady Queen of Africa Parish (OLA)",
    },
  ];
}

export default function Home() {
  return <Welcome />;
}
