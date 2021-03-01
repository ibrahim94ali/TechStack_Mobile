import { gql } from "@apollo/client";

export const ADD_TECH = gql`
  mutation addTechnology($name: String!) {
    addTechnology(name: $name) {
      id
      name
    }
}`;

export const EDIT_TECH = gql`
mutation updateTechnology($id: ID! $name: String!) {
    updateTechnology(id: $id name: $name) {
      id
      name
    }
  }`;

export const DELETE_TECH = gql`
mutation deleteTechnology($id: ID!) {
  deleteTechnology(id: $id) {
    id
  }
}`;

export const ADD_POST = gql`
  mutation addPost($title: String! $owner: String! $link: String! $date: String! $techId: ID!) {
    addPost(title: $title owner: $owner link: $link date: $date techId: $techId) {
      id
      title
      owner
      link
      date
      techId
    }
  }`;

export const EDIT_POST = gql`
mutation updatePost($title: String! $owner: String! $link: String! $date: String! $id: ID!) {
  updatePost(title: $title owner: $owner link: $link date: $date id: $id) {
    id
    title
    owner
    link
    date
  }
}`;

export const DELETE_POST = gql`
mutation deletePost($id: ID!) {
  deletePost(id: $id) {
    id
    techId
  }
}`;