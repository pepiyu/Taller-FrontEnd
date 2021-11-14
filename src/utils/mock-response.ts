import { AboutMe } from "../model/aboutme";
import { Project } from "../model/project";


export const mockLogin = (userName: string, password: string) => new Promise<TokenResponse>(function (resolve, rejected) {
    setTimeout(() => {
        if (userName === "yessica@threepoints.com" && password === "wakawaka") {
            resolve(JSON.parse(
                `{
                 "access_token" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOnsidXNlcklkIjo2NjYsInJvbGUiOiJhZG1pbiIsInVzZXJOYW1lIjoiYWRtaW4iLCJkaXNwbGF5TmFtZSI6ImFkbWluIn0sImlhdCI6MTYwMTAyNzU1MywibmJmIjoxNjAxMDI3NTUzLCJleHAiOjE2MDExMTM5NTN9.vHgVtxKGmwDDLLVuT63UBkP8xe4a9hH0B3kkCsAh7K8",
                 "expires_in": 3600,
                 "token_type": "bearer"
                 }`
            ));
        } else {
            rejected(new Unauthorized());
        }
    }, 2000);
    
})
export interface TokenResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
}
export interface ApiError {
    description?: string;
}
export class Unauthorized implements ApiError { }



export const mockAboutme = () => new Promise<AboutMe>(function (resolve, rejected) {
    setTimeout(() => {
        resolve(JSON.parse(
            `{
            "id":"12389asdfasf8",
            "name":"Yessica Bao Ye",
            "birthday":627874534000,
            "nationality":"Spain",
            "job":"Lumisa",
            "github":"https://github.com/pepiyu"
            }`
        ));
    }, 500);

});

export const projects: Array<Project> = [
    {
    "id":"7890asdf890",
    "title":"Taller-FrontEnd",
    "description":"Portofio personal",
    "version":"5.2.0",
    "link":"https://github.com/pepiyu/Taller-FrontEnd",
    "tag":"React, JavaScript, Typescript",
    "timestamp": new Date(765817712005)
    },
    {
    "id":"7890asdf890",
    "title":"Typescript Weather",
    "description":"Primera aproximación a TypeScript",
    "version":"3.0.2",
    "link":"https://github.com/pepiyu/TypescriptWeatherExample",
    "tag":"React, JavaScript, Typescript",
    "timestamp":new Date(765817712006)
    },
    {
    "id":"7890asdf890",
    "title":"Pug Memory",
    "description":"Proyecto personal que consiste en un juego de memoria con Fotos de Chip, un carlino muy cariñoso y querido",
    "version":"-",
    "link":"https://github.com/pepiyu/pugmemory",
    "tag":"React, JavaScript, Typescript",
    "timestamp":new Date(765817712007)
    },
    {
    "id":"7890asdf890",
    "title":"CRUD-http",
    "description":"Actividad realizado en clase de Arquitectura de sistemas",
    "version":"-",
    "link":"https://github.com/pepiyu/crud-http",
    "tag":"Api, Crud",
    "timestamp":new Date(765817712007)
    }
]

export const mockProjects = () => new Promise<Project[]>(function (resolve, rejected) {
    setTimeout(() => {
        resolve(
            projects
        );
    }, 500);

});

export const mockAddProject = (project: Project) => new Promise<Project>(function (resolve, rejected) {
    projects.push(project);


})