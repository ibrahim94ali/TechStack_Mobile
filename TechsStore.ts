import { action, makeObservable, observable } from "mobx";
import { PostsI, TechnologyI } from "./types";

class TechsStoreImpl {
  constructor() {
    makeObservable(this, {
      technologies: observable,
      selectedIndex: observable,
      setTechs: action,
      addTech: action,
      editTech: action,
      deleteTech: action,
      addPost: action,
      editPost: action,
      deletePost: action
    })
  }

  technologies: TechnologyI[] = [];
  selectedIndex: number = -1;

  setTechs(techs: TechnologyI[]) {
    this.technologies = techs;
  };

  selectTechnology(index: number) {
    this.selectedIndex = index;
  }

  addTech(tech: TechnologyI) {
    this.technologies.push(tech);
    this.technologies = this.technologies.sort((a,b) => a.name > b.name ? 1 : -1);
  };
  editTech(id: string, newName: string) {
    const index = this.technologies.findIndex(t => t.id === id);
    this.technologies[index].name = newName;
    this.technologies = this.technologies.sort((a,b) => a.name > b.name ? 1 : -1);
  };
  deleteTech(id: string) {
    const index = this.technologies.findIndex(tech => tech.id === id);
    this.technologies = this.technologies.filter(t => t.id !== id);
  };
  addPost(post: PostsI) {
    this.technologies[this.selectedIndex].posts.unshift(post);
  };
  editPost(post: PostsI) {
    const postIndex = this.technologies[this.selectedIndex].posts.findIndex(p => p.id === post.id);
    const posts = this.technologies[this.selectedIndex].posts;
    this.technologies[this.selectedIndex].posts = [post, ...posts.slice(0, postIndex), ...posts.slice(postIndex + 1)];
  };
  deletePost(id: string) {
    this.technologies[this.selectedIndex].posts = this.technologies[this.selectedIndex].posts.filter(p => p.id !== id);
  };
};

export const TechsStore = new TechsStoreImpl();