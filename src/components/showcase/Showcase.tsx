import React from "react";
import ShowcaseCard from "./ShowcaseCard";

const leftSlides = [
  {
    image: "/showcase/showcase-1.jpg",
    tag: "Food",
    label: "Our work",
    title: "What we give",
    text: "We deliver rice, lentils, oil and other daily food packs to families who struggle to afford meals.",
  },
  {
    image: "/showcase/showcase-2.jpg",
    tag: "Clothing",
    label: "Winter drive",
    title: "Warm clothes",
    text: "Blankets and winter clothes reach people who sleep outside during the cold months.",
  },
  {
    image: "/showcase/showcase-3.jpg",
    tag: "Education",
    label: "Children",
    title: "School kits",
    text: "Books, bags and stationery help children from poor families stay in school.",
  },
  {
    image: "/showcase/showcase-4.jpg",
    tag: "Health",
    label: "Care",
    title: "Medical support",
    text: "Basic medicine and health checkups for people who cannot afford a doctor.",
  },
];

const rightSlides = [
  {
    image: "/showcase/showcase-5.jpg",
    tag: "Volunteers",
    label: "Our people",
    title: "How we help",
    text: "Local volunteers organize events and bring support directly to people in their own area.",
  },
  {
    image: "/showcase/showcase-6.jpg",
    tag: "Events",
    label: "Together",
    title: "Community drives",
    text: "Anyone can create an event, invite neighbors and run a donation drive in minutes.",
  },
  {
    image: "/showcase/showcase-7.jpg",
    tag: "Impact",
    label: "Results",
    title: "Smiles we see",
    text: "Every delivered pack and every helped family shows what a small act of kindness can do.",
  },
];

const Showcase = () => {
  return (
    <section className="bg-background py-20">
      <Container>
        <div className="mx-auto mb-16 max-w-150 text-center">
          <p className="mb-3 font-textFont text-[13px] font-bold uppercase tracking-widest text-brand">
            Gallery
          </p>
          <h2 className="font-headingFont italic text-[48px] leading-tight text-headingColor mb-4">
            Moments of Kindness
          </h2>
           <p className="font-textFont text-[18px] font-medium text-bodyText opacity-80">
          Explore real stories, volunteer efforts, and the meaningful impact we create together in our community.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ShowcaseCard slides={leftSlides} />
          <ShowcaseCard slides={rightSlides} />
        </div>
      </Container>
    </section>
  );
};

import Container from "../container/Container";

export default Showcase;