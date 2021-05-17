import axios from "axios";
import { apiUrl } from "./apiUrl";
// import Swal from "sweetalert2";

//upload media
export function uploadMediaFile(file, ref, refId, field) {
  let formData = new FormData();
  formData.append("files", file.originFileObj);
  formData.append("ref", ref); //
  formData.append("refId", refId);
  formData.append("field", field);
  return axios.post(`${apiUrl}/upload`, formData);
}

// SEASON
//get all Seasons
export function getAllSeason() {
  return axios.get(`${apiUrl}/seasons`);
}

//get Season
export function getSeason(id) {
  return axios.get(`${apiUrl}/seasons/${id}`);
}

//post Season
export function postSeason(data) {
  return axios.post(`${apiUrl}/seasons`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

//put season
export function putSeason(season_id, data) {
  return axios.put(`${apiUrl}/seasons/${season_id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

//delete season
export function deleteSeason(season_id) {
  return axios.delete(`${apiUrl}/seasons/${season_id}`);
}

//LESSONS
//get all lessons
export function getAllLesson() {
  return axios.get(`${apiUrl}/lessons`);
}

//get lessons
export function getLesson(id) {
  return axios.get(`${apiUrl}/lessons/${id}`);
}

//post lessons
export function postLesson(data) {
  return axios.post(`${apiUrl}/lessons`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

//put lessons
export function putLesson(lesson_id, data) {
  return axios.put(`${apiUrl}/lessons/${lesson_id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

//delete lessons
export function deleteLesson(lesson_id) {
  return axios.delete(`${apiUrl}/lessons/${lesson_id}`);
}

//PAGE
//get all pages
export function getAllPage() {
  return axios.get(`${apiUrl}/pages`);
}

//get pages
export function getPage(id) {
  return axios.get(`${apiUrl}/pages/${id}`);
}

//post pages
export function postPage(data) {
  return axios.post(`${apiUrl}/pages`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

//put pages
export function putPage(page_id, data) {
  return axios.put(`${apiUrl}/pages/${page_id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

//delete pages
export function deletePage(page_id) {
  return axios.delete(`${apiUrl}/pages/${page_id}`);
}
