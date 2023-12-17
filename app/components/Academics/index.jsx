"use client";
import styles from "./style.module.scss";
import { useState, useEffect, useRef } from "react";
import Project from "./components/project";
import { motion } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import Rounded from "../../common/RoundedButton";

const projects = [
  {
    title: "Programming and Software Development",
    text: "Algorithms Programming (Golang), Data Structures (C++), Software Engineering (Documetations, PHP, Laravel), Object Oriented Programming (Java)",
  },
  {
    title: "Artificial Intelligence",
    text: "I understand the basic concepts of Artificial Intelligence and Machine Learning. I've built Decision Trees and k-NN models for classifying plants. I've also developed a Support Vector Machine (SVM) for regression on a dataset related to power consumption in a city in Morocco.",
  },
  {
    title: "Database",
    text: "I've been learning fundamental database concepts such as ER modeling, logical design, normalization, and implementation of databases, as well as delving into database system concepts like storage management, indexing, query processing, and transaction systems using MySQL and Oracle.",
  },
  {
    title: "Computer Systems",
    text: "I've gained knowledge in digital systems, covering aspects like number systems, digital logic, and various circuits including counters, registers, and digital memory. In Computer Organization and Architecture (COA), I've delved into computer organization, instruction types, memory, processor design, and concepts like input/output systems, parallel processing, and computer networks. Operating System fundamentals included processes, threads, memory management, scheduling, and practical usage on Linux Ubuntu. In Parallel and Distributed Systems, I've learned about distributed system architecture, interprocess communication, parallel programming design, and services like Microservices and Service-Oriented Architecture (SOA).",
  },
  {
    title: "Network",
    text: "In Computer Network, I'm learning about the OSI model's 7 layers, understanding their functions and interactions in computer networks. In Cyber Security, I'm gaining insights into fundamental cybersecurity aspects, covering the threat landscape, risk management, human behavior-based cybersecurity types, and exploring topics like cryptography, authentication, malware, digital forensics, and network security.",
  },
  {
    title: "Others",
    text: "In the Algorithmic Strategy course, I learn techniques like Divide and Conquer, Dynamic Programming, Greedy Algorithms, Backtracking, and Branch and Bound. And  i learn  Human-Computer Interaction principles such as interface design, ergonomics, UX, user testing, responsive design, and the integration of new technologies to create effective and inclusive user experiences.",
  },
];

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
};

export default function Academics() {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const [expandedProjects, setExpandedProjects] = useState([]);
  const { active, index } = modal;
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  let xMoveContainer = useRef(null);
  let yMoveContainer = useRef(null);
  let xMoveCursor = useRef(null);
  let yMoveCursor = useRef(null);
  let xMoveCursorLabel = useRef(null);
  let yMoveCursorLabel = useRef(null);

  useEffect(() => {
    //Move Container
    xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });
    //Move cursor
    xMoveCursor.current = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    yMoveCursor.current = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });
    //Move cursor label
    xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });
  }, []);

  const moveItems = (x, y) => {
    xMoveContainer.current(x);
    yMoveContainer.current(y);
    xMoveCursor.current(x);
    yMoveCursor.current(y);
    xMoveCursorLabel.current(x);
    yMoveCursorLabel.current(y);
  };
  const manageModal = (active, index, x, y) => {
    moveItems(x, y);
    setModal({ active, index });
  };

  const toggleProject = (index) => {
    console.log("Toggle project", index);
    setExpandedProjects((prevExpandedProjects) => {
      const newExpandedProjects = prevExpandedProjects.includes(index)
        ? prevExpandedProjects.filter((item) => item !== index)
        : [...prevExpandedProjects, index];

      console.log("New expanded projects", newExpandedProjects);

      return newExpandedProjects;
    });
  };

  return (
    <main
      className={styles.projects}
      id="academics"
      onMouseMove={(e) => {
        moveItems(e.clientX, e.clientY);
      }}
    >
      <div className={styles.body}>
        {projects.map((project, index) => {
          const isExpanded = expandedProjects.includes(index);
          return (
            <>
              <Project
                index={index}
                title={project.title}
                key={index}
                onClick={() => toggleProject(index)}
                manageModal={manageModal}
              />
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={
                    isExpanded
                      ? { opacity: 1, height: "auto" }
                      : { opacity: 0, height: 0 }
                  }
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5 }}
                  className={styles.projectDetails}
                >
                  <p>{project.text}</p>
                  {/* Add other details as needed */}
                </motion.div>
              )}
            </>
          );
        })}
      </div>
      <motion.div
        ref={cursor}
        className={styles.cursor}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
      ></motion.div>
      <motion.div
        ref={cursorLabel}
        className={styles.cursorLabel}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
      >
        Academics
      </motion.div>
    </main>
  );
}
