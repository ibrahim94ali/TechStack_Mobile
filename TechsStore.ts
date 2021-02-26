import { TechnologyI } from "./types";

export function createTechsStore(): {
    technologies: TechnologyI[],
    setTechs: (techs: TechnologyI[]) => void
    addTech: (tech: TechnologyI) => void
} {
    return {
      technologies: [],
      setTechs(techs: TechnologyI[]) {
        this.technologies = techs
      },
      addTech(tech: TechnologyI) {
        this.technologies = [...this.technologies, tech].sort((a,b) => a.name > b.name ? 1 : -1);
      }
    };
  }