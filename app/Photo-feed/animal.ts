import { StaticImageData } from "next/image"
import photo1 from "./Photos/photo1.jpg"
import photo2 from "./Photos/photo2.jpg"
import photo3 from "./Photos/photo3.jpg"
import photo4 from "./Photos/photo4.jpg"
import photo5 from "./Photos/photo5.jpg"
import photo6 from "./Photos/photo6.jpg"
import photo7 from "./Photos/photo7.jpg"
import photo8 from "./Photos/photo8.jpg"




export type AnimalImage= {
    id:string;
    src:StaticImageData;
    description:string;
}
export const animalImages: AnimalImage[] = [
    {
        id : "1",
        src:photo1,
        description:"Black dog"
    },
     {
        id : "2",
        src:photo2,
        description:"Tiger"
    }, {
        id : "3",
        src:photo3,
        description:"Panda"
    }, {
        id : "4",
        src:photo4,
        description:"parrot"
    }, {
        id : "5",
        src:photo5,
        description:"Programmer cat"
    }, {
        id : "6",
        src:photo6,
        description:"bamboo bears"
    }, {
       id : "7",
       src : photo7,
       description : "Cute pig"
    }, {
       id : "8",
       src : photo8,
       description : "om"
    },

]