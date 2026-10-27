import SectionHeading from "./SectionHeading";
import TechGraph from "./TechGraph";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        eyebrow="Skills"
        title="The tech stack I use"
        align="center"
        description="Languages, frameworks, and infrastructure I use to take products from idea to production."
      />

      <div className="mt-16 overflow-x-hidden">
        <TechGraph />
      </div>
    </section>
  );
}
