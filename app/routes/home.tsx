import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Car Tracker - SMOC Oil Change Outreach" },
    { name: "description", content: "Track cars through the oil change process during our church outreach ministry event." },
  ];
}

export default function Home() {
  return <Welcome />;
}
