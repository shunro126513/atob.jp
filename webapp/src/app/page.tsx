import { getTrendingProjects } from "@/lib/projects";
import SceneHero from "@/components/home/SceneHero";
import SceneDiscover from "@/components/home/SceneDiscover";
import SceneHeat from "@/components/home/SceneHeat";
import SceneCompare from "@/components/home/SceneCompare";
import SceneFlow from "@/components/home/SceneFlow";
import SceneCTA from "@/components/home/SceneCTA";
import SceneNav from "@/components/home/SceneNav";

export const revalidate = 3600;

const SCENES = [
  { id: "hero",     label: "Intro"     },
  { id: "discover", label: "Discover"  },
  { id: "heat",     label: "Heat"      },
  { id: "compare",  label: "Compare"   },
  { id: "flow",     label: "Action"    },
  { id: "cta",      label: "Participate" },
];

export default async function HomePage() {
  const trending = await getTrendingProjects();

  return (
    <>
      <SceneNav scenes={SCENES} />
      <SceneHero />
      <SceneDiscover />
      <SceneHeat trending={trending} />
      <SceneCompare />
      <SceneFlow />
      <SceneCTA />
    </>
  );
}
