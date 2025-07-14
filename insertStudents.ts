import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import dbConnect from "./src/lib/db.ts";
import Student from "./src/models/Student.ts";


async function insertStudents() {
  await dbConnect();

  const students = [
    {
      name: "Tawanda Trust Muchenu",
      email: "muchenutawanda4@gmail.com",
      specialization: "Software Development",
      employed: false,
      employer: "",
      bio: "Passionate software developer centered on solving problems.",
      avatarUrl: "/students/mchenu.jpg",
      projects: [],
    },
    {
      name: "Precious K Mutema",
      email: "preciouskukumutema@gmail.com",
      specialization: "Software Development",
      employed: false,
      employer: "",
      bio: "I'm a passionate web developer focused on building tech solutions.",
      avatarUrl: "/students/precious.jpg",
      projects: [],
    },
    {
      name: "Decent Kupakwashe Gwavava",
      email: "decentgwavava@gmail.com",
      specialization: "Software Development",
      employed: false,
      employer: "",
      bio: "Driving innovation through scalable software solutions, fueled by a passion for development.",
      avatarUrl: "/students/descent.jpg",
      projects: [],
    },
    {
      name: "Tadiwa Mangate",
      email: "tadiwamangate9@gmail.com",
      specialization: "Software Development",
      employed: false,
      employer: "",
      bio: "Passionate software developer building interactive websites.",
      avatarUrl: "/students/tadiwamangate.jpg",
      projects: [],
    },
    {
      name: "Ernest Tafadzwa Maenda",
      email: "ernesttafadzwamaenda284@gmail.com",
      specialization: "Software Development",
      employed: false,
      employer: "",
      bio: "Passionate software developer building scalable solutions.",
      avatarUrl: "/students/tafadzwa.jpg",
      projects: [],
    },
    {
      name: "Peviorgents Pimbirimano",
      email: "peviorgentspimbirimano@gmail.com",
      specialization: "Software Development",
      employed: false,
      employer: "",
      bio: "Results-driven software developer specializing in scalable and robust application development.",
      avatarUrl: "/students/perviogents.jpg",
      projects: [],
    },
    {
      name: "Weston N Sululu",
      email: "sululuweston@gmail.com",
      specialization: "Software Development",
      employed: false,
      employer: "",
      bio: "Passionate sometimes.",
      avatarUrl: "/students/wstonboy.jpg",
      projects: [],
    },
    {
      name: "Blessings Kusiwani",
      email: "blessingkusiwani@gmail.com",
      specialization: "Software Development",
      employed: false,
      employer: "",
      bio: "Passionate about problem solving, innovation and leveling up every step of the way. Currently building projects and growing every day.",
      avatarUrl: "/students/blessing.jpg",
      projects: [],
    },
    {
      name: "Tinotenda Hove",
      email: "hovetinotenda50@gmail.com",
      specialization: "Software Development",
      employed: false,
      employer: "",
      bio: "Passionate and willing to learn more.",
      avatarUrl: "/students/tinoboy.jpg",
      projects: [],
    },
    {
      name: "Lyncia Chiguri",
      email: "chigurilyncia@gmail.com",
      specialization: "Software Development",
      employed: false,
      employer: "",
      bio: "Aspiring software developer passionate about building clean, user-friendly applications. Currently exploring front-end development with React and Next.js. Always learning, always coding.",
      avatarUrl: "/students/lyncia.jpg",
      projects: [],
    },
    {
      name: "Mcdonald Chirumezani",
      email: "chirumezanimcdonald@gmail.com",
      specialization: "Software Development",
      employed: false,
      employer: "",
      bio: "Passionate about problem solving, innovation and leveling up every step of the way. Currently building projects and growing every day.",
      avatarUrl: "/students/macdonald.jpg",
      projects: [],
    },
    {
      name: "Kudzaishe Chikowore",
      email: "chikoworekudzaishe9@gmail.com",
      specialization: "Software Development",
      employed: false,
      employer: "",
      bio: "Building systems that scale.",
      avatarUrl: "/students/kudzi.jpg",
      projects: [],
    },
    {
      name: "Mejury Zvarevashe",
      email: "mejuryzvarevashe7@gmail.com",
      specialization: "Software Development",
      employed: false,
      employer: "",
      bio: "Passionate software developer building scalable solutions.",
      avatarUrl: "/students/mejury.jpg",
      projects: [],
    },
  ];

  try {
    await Student.insertMany(students);
    console.log("✅ Students inserted successfully!");
  } catch (error) {
    console.error("❌ Error inserting students:", error);
  }
}

insertStudents().then(() => process.exit());
